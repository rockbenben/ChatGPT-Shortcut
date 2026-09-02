/**
 * sitemap 里的社区提示词条目。每个 locale 单独构建、单独调用一次。
 *
 * 两种形态，由 docusaurus.config.js 顶部的 COMMUNITY_STATIC_PAGES 决定：
 *
 *  A. 开关打开 + 默认 locale —— 该 locale 的每条 UGC 都有构建期直出的
 *     /community-prompt/<id> 静态路由（plugin-community-pages.js），默认实现已经
 *     把它们全部产出，这里只做**质量过滤**，并把 lastmod 换成条目真实的 updatedAt。
 *
 *  B. 其余情况（非默认 locale，或开关关闭 = main/offline）—— 没有静态路由，
 *     沿用既有做法：从 communitySnapshot.json 精选 ≤24 条，注入 ?id= 形态。
 *     UGC 正文虽不随 locale 翻译，但 UI 框架是翻译的，只注入根 sitemap 会让 Google
 *     只收录中文界面版，英文搜索用户落地满屏中文导航。
 *
 * ── 为什么 A 不再沿用「只放 24 条」──
 * 那条取舍立在「?id= 是要靠 Googlebot 跑 JS 才有内容的空壳，批量喂 4409 条参差不齐的
 * UGC 会拉低站点质量分」。静态化之后前提变了：它们是有独立标题、独立正文的预渲染页。
 * 实测 4409 条里**完全重复的正文只有 2 组共 4 条**，净踩的只有 16 条 —— 重复内容这条
 * 轴上根本不成立。所以改为「全量提交，剔掉真正的次品」：
 *   - upvoteDifference < 0：社区投票否掉的
 *   - 正文完全重复：同一份正文只留 id 最小的那条
 * 没有再设正文长度门槛：p10 都有 96 字符，且每页还带标题/说明/作者/评论区，
 * 凭空定一个字数线只是把判断权从 Google 手里抢过来自己拍脑袋。
 *
 * 合并后的 sitemap 上限见 scripts/buildPhased.mjs（50000 URL）。当前 18 个 locale
 * 合计约 9300 条，有余量。
 */
import fs from "node:fs";
import crypto from "node:crypto";
import { defaultLocale, locales } from "./i18nLocales.mjs";

const LIST_PATH = "/community-prompts";
const DATA_DIR = "./src/data/community";

function loadSnapshotEntries() {
  try {
    const snap = JSON.parse(fs.readFileSync("./src/data/communitySnapshot.json", "utf8"));
    const ids = [...new Set([...(snap.byNewest?.ids || []), ...(snap.byUpvoted?.ids || [])])];
    return ids.map((id) => ({
      id,
      // lastmod 用条目真实 updatedAt（YYYY-MM-DD），缺失时由调用方回退
      lastmod: snap.byId?.[id]?.updatedAt?.split("T")[0] || null,
    }));
  } catch {
    return [];
  }
}

/**
 * 读一遍 src/data/community/，返回 { keep: Set<id>, lastmod: Map<id, YYYY-MM-DD> }。
 * 只有默认 locale 的那一次构建会走到这里，4409 次小文件读约 0.3s，不值得再造一份索引。
 */
function loadQualifying() {
  const keep = new Set();
  const lastmod = new Map();
  const seenBody = new Map(); // descriptionHash -> 最先出现（id 最小）的那条
  let files;
  try {
    files = fs.readdirSync(DATA_DIR).filter((f) => /^\d+\.json$/.test(f));
  } catch {
    return { keep, lastmod };
  }
  // 按 id 升序，保证重复正文里留下的是最早那条（先发布的更可能是原创）
  files.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  for (const file of files) {
    let item;
    try {
      item = JSON.parse(fs.readFileSync(`${DATA_DIR}/${file}`, "utf8"));
    } catch {
      continue;
    }
    const id = item?.id;
    if (!Number.isInteger(id)) continue;
    if ((item.upvoteDifference || 0) < 0) continue;
    const hash = crypto.createHash("md5").update((item.description || "").trim()).digest("hex");
    if (seenBody.has(hash)) continue;
    seenBody.set(hash, id);
    keep.add(id);
    if (item.updatedAt) lastmod.set(id, String(item.updatedAt).split("T")[0]);
  }
  return { keep, lastmod };
}

/**
 * @param {{url: string, lastmod?: string}[]} items 默认实现产出的 sitemap items（已补过 lastmod 回退）
 * @param {string} fallbackLastmod YYYY-MM-DD
 * @param {boolean} staticPagesEnabled docusaurus.config.js 的 COMMUNITY_STATIC_PAGES。
 *   默认 false —— 这样即使本文件被单独同步到没有静态路由的分支，行为也退回安全的 B 形态。
 * @returns {{url: string, lastmod?: string}[]} 最终的完整 items
 */
export function communitySitemapItems(items, fallbackLastmod, staticPagesEnabled = false) {
  const listUrl = items.find((it) => it.url.endsWith(LIST_PATH))?.url;
  if (!listUrl) return items;

  // 前缀 = origin + baseUrl + 可选的 /<locale>。不解析 pathname，baseUrl 不是 "/" 时也成立。
  const prefix = listUrl.slice(0, -LIST_PATH.length);
  const isDefaultLocale = !locales.some((l) => l !== defaultLocale && prefix.endsWith(`/${l}`));

  // ── A：默认 locale 的静态路由，过滤 + 换真实 lastmod ──
  if (staticPagesEnabled && isDefaultLocale) {
    const { keep, lastmod } = loadQualifying();
    return items.flatMap((it) => {
      const m = /\/community-prompt\/(\d+)$/.exec(it.url);
      if (!m) return [it];
      const id = Number(m[1]);
      if (!keep.has(id)) return [];
      return [{ ...it, lastmod: lastmod.get(id) || it.lastmod || fallbackLastmod }];
    });
  }

  // ── B：没有静态路由，注入精选 ≤24 条 ?id= ──
  return [
    ...items,
    ...loadSnapshotEntries().map(({ id, lastmod }) => ({
      url: `${prefix}/community-prompt?id=${id}`,
      lastmod: lastmod || fallbackLastmod,
    })),
  ];
}
