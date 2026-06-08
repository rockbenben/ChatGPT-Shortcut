import React from "react";
import CommunityPromptDetail from "@site/src/components/CommunityPromptDetail";

// 动态入口：URL 形如 /community-prompt?id=123
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
