/**
 * sitemap 注入：社区提示词详情页 /community-prompt?id=N
 *
 * 数据源：src/data/communitySnapshot.json（gen:snapshot 产物，12 最新 + 12 最高赞去重 ≤24 条）。
 * 全量 4050+ 条 UGC 不进 sitemap：质量参差，批量喂会拉低站点质量分；
 * 精选 24 条（高赞=质量过滤、最新=freshness 轮换）是更优信号。
 *
 * 每个 locale 的 sitemap 都注入（≤24 × 18 locale）：UGC 正文虽不随 locale 翻译，
 * 但 UI 框架是翻译的——只注入根 sitemap 会让 Google 只收录中文界面版，英文搜索
 * 用户落地满屏中文导航。与 CommunityPromptPage 的 per-locale 自指 canonical 一致；
 * 跨 locale 正文重复由 Google 自行聚类，权衡取本地化落地体验。
 *
 * 页面本身是 SPA 壳，真实 meta 由 CommunityPromptPage 按 ?id= CSR 注入，
 * Googlebot 渲染后可收录。快照缺失/空 stub（本地 fresh clone）时优雅降级为不注入。
 */
import fs from "node:fs";

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
 * 生成待追加的 sitemap items。每个 locale 单独构建、单独调用本函数：
 * 从该 locale 的列表页 URL（…/community-prompts）推导前缀，天然适配 locale 路径。
 * @param {{url: string}[]} items 默认实现产出的 sitemap items
 * @param {string} fallbackLastmod YYYY-MM-DD
 */
export function communityPromptSitemapItems(items, fallbackLastmod) {
  const listUrl = items.find((it) => it.url.endsWith("/community-prompts"))?.url;
  if (!listUrl) return [];
  return loadSnapshotEntries().map(({ id, lastmod }) => ({
    url: `${listUrl.slice(0, -1)}?id=${id}`, // …/community-prompts → …/community-prompt?id=N
    lastmod: lastmod || fallbackLastmod,
  }));
}
