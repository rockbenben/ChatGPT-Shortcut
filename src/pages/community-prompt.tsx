import React from "react";
import CommunityPromptDetail from "@site/src/components/CommunityPromptDetail";

// 动态入口（?id= 的 CSR 壳）。静态化之后它的职责收窄为两个：
//   1) 非默认 locale 的详情页（/en/community-prompt?id=N …）——UGC 正文不随 locale
//      翻译，为界面语言复制 4409 × 17 个静态页不划算，见 plugin-community-pages.js
//   2) 站内卡片链接（列表页/收藏/我的）—— 故意仍指 ?id=，最新条目还没静态页，见
//      CommunityPromptPage 里 canonical 那段注释
// 默认 locale 的搜索着陆走 plugin-community-pages.js 注册的 /community-prompt/<id>
// （构建期直出正文），本壳的 canonical 指向它。
//
// URL 形如 /community-prompt?id=123
// 故意只做最薄的包装：URL 解析 + snapshot 查找放在 CommunityPromptDetail 的 useEffect 里
// 客户端完成，避免 SSR (location.search="") 与 CSR (location.search="?id=...") 的初始值差异
// 引发 hydration mismatch（React 18+ 会丢弃 SSR HTML 整树重渲染，LCP 反而变差）。
//
// ⚠️ 这里不能加 noindex：?id=123 与裸路径共享这同一份静态壳 HTML，
// Google 在原始 HTML 见到 noindex 会直接跳过 JS 渲染，CommunityPromptPage
// 里 CSR 注入的 per-id canonical/og/title 永远不生效 → 所有 ?id= 页被排除收录。
// 裸路径（无 id / 无效 id）的 noindex 由 CommunityPromptPage 的错误分支客户端注入。
export default function CommunityPromptDetailPage() {
  return <CommunityPromptDetail />;
}
