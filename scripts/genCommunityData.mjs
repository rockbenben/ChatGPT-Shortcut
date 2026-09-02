/**
 * 全量社区提示词数据的**增量**抓取器 —— 仅 speedup/data-retrieval 分支有此文件。
 *
 * 产物：
 *   src/data/community/<id>.json       每条提示词一个文件（入库，见下）
 *   src/data/community/_manifest.json  { generatedAt, items: { "<id>": "<updatedAt>" } }
 *
 * 为什么每条一个文件：src/pages/community-prompt/<id>.tsx 各自静态 import 自己那份，
 * webpack 按页拆包；合成一个大 JSON 会让每个详情页都拖上 6MB 全量数据。
 * 与 src/data/cards/ 同一套理由（那边是 5022 个 (id × locale) 文件）。
 *
 * 为什么入库而不是 gitignore：文件里的 updatedAt 就是增量比对的输入，和 src/data/cards/
 * 一样是**带状态的输入**，不是纯派生物。gitignore 掉的话每次 CI fresh clone 都要
 * 全量拉 4409 条（~6.4MB / 90 个请求）；入库后稳态只拉 list 清单（45 个请求 / 233KB，
 * 每条只有 {id, updatedAt}）+ 变更条目的正文。
 *
 * 失败时降级：保留已有数据，warn 后正常退出——构建绝不能因为后端抖动而中断。
 *
 * ⚠️ 只在 src/data/community/ 已存在时才联网。该目录入库，speed 分支的 clone 天然有它；
 * main / offline 不带这份数据，于是**即便本脚本被合并过去也只会打一行日志退出，不会去抓 UGC**。
 * 首次建库（或换后端）用 `node scripts/genCommunityData.mjs --init` 显式开口子。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_URL = process.env.SNAPSHOT_API_URL || "https://api.newzone.top/api";
const LIST_PAGE_SIZE = 100; // 后端硬上限，传更大也只回 100
const BULK_CHUNK = 100;
const LIST_CONCURRENCY = 4;
const BULK_CONCURRENCY = 3;
const FETCH_TIMEOUT_MS = 30_000;
// 清单条数相对上次跌破这个比例就不做删除：后端抖动/分页残缺时，
// 宁可留下少量陈旧文件，也不要一次误删几千条正文。
const PRUNE_FLOOR_RATIO = 0.8;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(PROJECT_ROOT, "src/data/community");
const MANIFEST_PATH = path.join(DATA_DIR, "_manifest.json");

// 与 src/utils/snapshotPrime.ts 的 CommunityPromptSnapshot 对齐；
// 与 genCommunitySnapshot.mjs 共用同一份字段表，两者产出的对象形状必须可互换
const PROMPT_DATA_FIELDS = ["id", "title", "description", "remark", "notes", "owner", "upvotes", "downvotes", "upvoteDifference", "updatedAt"];

async function fetchJson(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/** 固定并发跑一批任务，保序返回。不引入 p-limit：全项目就这一处需要。 */
async function mapLimit(items, limit, worker) {
  const out = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        out[i] = await worker(items[i], i);
      }
    }),
  );
  return out;
}

const listUrl = (page) => `${API_URL}/userprompts?pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${LIST_PAGE_SIZE}&sort=id:asc`;

/**
 * 拉全量 {id, updatedAt} 清单。list 端点只回这两个字段，53 B/条。
 * 按 id:asc 排：新条目落在最后一页，翻页期间不会把已翻过的行往后挤（id:desc 会）。
 */
async function fetchManifestFromApi() {
  const first = await fetchJson(listUrl(1));
  const pageCount = first?.meta?.pagination?.pageCount ?? 1;
  const total = first?.meta?.pagination?.total ?? 0;

  const rest = await mapLimit(
    Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => i + 2),
    LIST_CONCURRENCY,
    (page) => fetchJson(listUrl(page)),
  );

  const items = new Map();
  for (const payload of [first, ...rest]) {
    for (const row of payload?.data ?? []) {
      if (Number.isInteger(row?.id) && row.id > 0) items.set(row.id, row.updatedAt ?? "");
    }
  }
  return { items, total, pageCount };
}

async function fetchBulk(ids) {
  const data = await fetchJson(`${API_URL}/userprompts/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  // /userprompts/bulk 回的是裸数组（与 genCommunitySnapshot.mjs 同）
  return Array.isArray(data) ? data : (data?.data ?? []);
}

// UGC 里混着 C0/C1 控制字符（历史投稿从各种编辑器粘贴而来）。它们在 HTML 文本里
// 是非法的：SSG 期 html-minifier 会对每一处报 "Control character in input stream"，
// 浏览器解析行为也各不相同。保留 \t \n \r，其余一律剔除。
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

function projectPromptData(item) {
  const out = {};
  for (const field of PROMPT_DATA_FIELDS) {
    const value = item[field];
    if (value === null || value === undefined) continue;
    out[field] = typeof value === "string" ? value.replace(CONTROL_CHARS, "") : value;
  }
  return out;
}

function readManifest() {
  try {
    const raw = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
    return raw?.items && typeof raw.items === "object" ? raw : { generatedAt: null, items: {} };
  } catch {
    return { generatedAt: null, items: {} };
  }
}

function writeManifest(items) {
  // key 按数值升序落盘：否则 JSON.stringify 跟插入序走，每次构建 diff 都整片炸开
  const sorted = {};
  for (const id of Object.keys(items)
    .map(Number)
    .sort((a, b) => a - b)) {
    sorted[id] = items[id];
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), items: sorted }, null, 2) + "\n", "utf-8");
}

/** --ensure-only：不发网络请求，只保证 manifest 存在，让 tsc/webpack 的静态解析不炸。 */
function ensureOnlyMode() {
  if (!fs.existsSync(DATA_DIR)) {
    console.log("[community-data] --ensure-only: src/data/community/ 不在本分支，跳过");
    return;
  }
  if (fs.existsSync(MANIFEST_PATH)) {
    console.log("[community-data] --ensure-only: manifest present, skip");
  } else {
    writeManifest({});
    console.log("[community-data] --ensure-only: wrote empty manifest; run `yarn gen:community` for real data");
  }
}

async function main() {
  if (process.argv.includes("--ensure-only")) return ensureOnlyMode();

  // 数据目录的存在与否 = 本分支要不要这套东西。见文件头。
  if (!fs.existsSync(DATA_DIR) && !process.argv.includes("--init")) {
    console.log("[community-data] skip — src/data/community/ 不在本分支（要新建用 --init）");
    return;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const local = readManifest();
  const localItems = { ...local.items };

  let remote;
  try {
    console.log("[community-data] Fetching id/updatedAt manifest...");
    remote = await fetchManifestFromApi();
  } catch (err) {
    console.warn(`[community-data] manifest fetch failed: ${err?.message || err}; keeping ${Object.keys(localItems).length} existing entries`);
    if (!fs.existsSync(MANIFEST_PATH)) writeManifest(localItems);
    return;
  }

  console.log(`[community-data] remote=${remote.items.size} (total=${remote.total}, pages=${remote.pageCount}), local=${Object.keys(localItems).length}`);

  // 正文缺失也要重拉：manifest 说有、文件却不在（被手工删过 / 上次写盘中断）
  const onDisk = new Set(fs.readdirSync(DATA_DIR).filter((f) => /^\d+\.json$/.test(f)));
  const stale = [];
  for (const [id, updatedAt] of remote.items) {
    if (localItems[id] !== updatedAt || !onDisk.has(`${id}.json`)) stale.push(id);
  }

  if (stale.length) {
    console.log(`[community-data] Fetching ${stale.length} new/changed prompt bodies...`);
    const chunks = [];
    for (let i = 0; i < stale.length; i += BULK_CHUNK) chunks.push(stale.slice(i, i + BULK_CHUNK));

    let failed = 0;
    await mapLimit(chunks, BULK_CONCURRENCY, async (ids) => {
      try {
        for (const item of await fetchBulk(ids)) {
          if (!Number.isInteger(item?.id)) continue;
          fs.writeFileSync(path.join(DATA_DIR, `${item.id}.json`), JSON.stringify(projectPromptData(item), null, 2) + "\n", "utf-8");
          localItems[item.id] = item.updatedAt ?? remote.items.get(item.id) ?? "";
        }
      } catch (err) {
        // 单块失败不影响其他块：这些 id 的 manifest 不更新，下次构建自然重试
        failed += ids.length;
        console.warn(`[community-data] bulk chunk failed (${ids.length} ids): ${err?.message || err}`);
      }
    });
    if (failed) console.warn(`[community-data] ${failed} ids left stale, will retry next run`);
  }

  // 删除远端已消失（删除/转私有）的条目。清单异常缩水时跳过，避免一次误删几千条。
  const prevCount = Object.keys(local.items).length;
  const gone = Object.keys(localItems)
    .map(Number)
    .filter((id) => !remote.items.has(id));
  if (gone.length) {
    if (prevCount && remote.items.size < prevCount * PRUNE_FLOOR_RATIO) {
      console.warn(`[community-data] remote list shrank ${prevCount} → ${remote.items.size} (<${PRUNE_FLOOR_RATIO * 100}%); skipping prune of ${gone.length} entries`);
    } else {
      for (const id of gone) {
        fs.rmSync(path.join(DATA_DIR, `${id}.json`), { force: true });
        delete localItems[id];
      }
      console.log(`[community-data] pruned ${gone.length} removed prompts`);
    }
  }

  // 只在内容真有变化时落盘：否则每次 build 都会产生一个只改 generatedAt 的 diff，
  // 让 `git status` 永远不干净。
  const changed = JSON.stringify(localItems) !== JSON.stringify(local.items) || !fs.existsSync(MANIFEST_PATH);
  if (changed) writeManifest(localItems);
  console.log(`[community-data] OK: ${Object.keys(localItems).length} prompts in src/data/community/${changed ? "" : " (no change)"}`);
}

main();
