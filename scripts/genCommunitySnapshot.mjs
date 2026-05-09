/**
 * 构建期社区提示词快照生成器
 *
 * 产物：src/data/communitySnapshot.json
 *   - 列表页 (/community-prompts) 首屏快照：byNewest/byUpvoted 各存 12 个 ids（含 list
 *     端点 ETag 用于 lscache prime 的 If-None-Match）+ byId 详情（最多 24 条，带真实
 *     updatedAt 用于列表流的 cache 校验）
 *   - 列表页 useState 初始值直接读 → SSG HTML 直出真实卡片，LCP 元素到位
 *   - snapshotPrime.ts 从中拼出 lscache：cl_..._desc_noTerm（列表层）+ pc_commus_<id>
 *     （详情层），让用户点卡片进 detail 页时直接 cache 命中，无网络往返
 *
 * 失败时降级：保留旧 snapshot；不存在则写空 stub。永远不让 build 中断。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_URL = process.env.SNAPSHOT_API_URL || "https://api.newzone.top/api";
const PAGE_SIZE = 12;
const FETCH_TIMEOUT_MS = 20_000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SNAPSHOT_PATH = path.join(PROJECT_ROOT, "src/data/communitySnapshot.json");

// 与 src/utils/snapshotPrime.ts 的 CommunityPromptSnapshot interface 对齐
// 只保留 UI 实际消费的字段 + updatedAt（来自 /userprompts/bulk 真实响应，
// runtime prime 时让 pc_commus_<id> 能被列表流的 updatedAt 对比自动校验）
const PROMPT_DATA_FIELDS = [
  "id",
  "title",
  "description",
  "remark",
  "notes",
  "owner",
  "upvotes",
  "downvotes",
  "upvoteDifference",
  "updatedAt",
];

const EMPTY_SNAPSHOT = {
  generatedAt: null,
  byNewest: { ids: [], total: 0, etag: null },
  byUpvoted: { ids: [], total: 0, etag: null },
  byId: {},
};

// 返回 { data, headers }；list 端点需要 ETag 写进 snapshot 给 lscache prime 用
async function fetchJson(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
    }
    const data = await res.json();
    return { data, headers: res.headers };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchListIds(sortField) {
  const url =
    `${API_URL}/userprompts?pagination[withCount]=true` +
    `&pagination[page]=1&pagination[pageSize]=${PAGE_SIZE}` +
    `&sort=${sortField}:desc`;
  const { data, headers } = await fetchJson(url);
  const items = Array.isArray(data?.data) ? data.data : [];
  return {
    ids: items
      .map((item) => item.id)
      .filter((id) => Number.isInteger(id) && id > 0),
    total: data?.meta?.pagination?.total ?? items.length,
    // ETag 透传到 snapshot；runtime prime 时配合 If-None-Match 让首次 SWR 走 304 无 body
    etag: headers.get("etag") ?? null,
  };
}

async function fetchBulk(ids) {
  if (!ids.length) return [];
  const { data } = await fetchJson(`${API_URL}/userprompts/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return Array.isArray(data) ? data : [];
}

// 投影到 PromptData 形状；剔除 null/undefined（让 ?: 可选字段保持「不存在」语义）
function projectPromptData(item) {
  const out = {};
  for (const field of PROMPT_DATA_FIELDS) {
    const value = item[field];
    if (value !== null && value !== undefined) {
      out[field] = value;
    }
  }
  return out;
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function ensureFallback(reason) {
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    console.warn(`[snapshot] ${reason}; writing empty snapshot stub`);
    writeJson(SNAPSHOT_PATH, EMPTY_SNAPSHOT);
  } else {
    console.warn(`[snapshot] ${reason}; keeping existing snapshot`);
  }
}

// --ensure-only：仅在文件缺失时写空 stub，不发网络请求。
// 用途：本地 fresh clone 跑 yarn start / typecheck / build 时，先保证 webpack/tsc 的
//      静态 import 能解析；真实数据由 prebuild-phased 触发完整生成。
function ensureOnlyMode() {
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    writeJson(SNAPSHOT_PATH, EMPTY_SNAPSHOT);
    console.log(`[snapshot] --ensure-only: wrote empty stub; run \`yarn gen:snapshot\` for real data`);
  } else {
    console.log("[snapshot] --ensure-only: snapshot present, skip");
  }
}

async function main() {
  if (process.argv.includes("--ensure-only")) {
    ensureOnlyMode();
    return;
  }
  try {
    console.log(`[snapshot] Fetching newest ${PAGE_SIZE} + most-upvoted ${PAGE_SIZE} in parallel...`);
    const [newest, upvoted] = await Promise.all([
      fetchListIds("id"),
      fetchListIds("upvoteDifference"),
    ]);

    const allIds = Array.from(new Set([...newest.ids, ...upvoted.ids]));
    console.log(`[snapshot] Fetching ${allIds.length} prompt details...`);
    const detailsRaw = await fetchBulk(allIds);

    const byId = {};
    detailsRaw.forEach((item) => {
      if (item && Number.isInteger(item.id)) {
        byId[item.id] = projectPromptData(item);
      }
    });

    // byNewest/byUpvoted 只存 ID，items 由消费方按需从 byId 拼出
    const snapshot = {
      generatedAt: new Date().toISOString(),
      byNewest: {
        ids: newest.ids.filter((id) => byId[id]),
        total: newest.total,
        etag: newest.etag,
      },
      byUpvoted: {
        ids: upvoted.ids.filter((id) => byId[id]),
        total: upvoted.total,
        etag: upvoted.etag,
      },
      byId,
    };

    writeJson(SNAPSHOT_PATH, snapshot);

    console.log(
      `[snapshot] OK: ${path.relative(PROJECT_ROOT, SNAPSHOT_PATH)} ` +
        `(byNewest=${snapshot.byNewest.ids.length}, byUpvoted=${snapshot.byUpvoted.ids.length}, byId=${Object.keys(byId).length})`,
    );
  } catch (err) {
    ensureFallback(`Failed to refresh community snapshot: ${err?.message || err}`);
  }
}

main();
