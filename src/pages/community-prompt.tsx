import React from "react";
import CommunityPromptDetail from "@site/src/components/CommunityPromptDetail";

// 动态入口：URL 形如 /community-prompt?id=123
// 故意只做最薄的包装：URL 解析 + snapshot 查找放在 CommunityPromptDetail 的 useEffect 里
// 客户端完成，避免 SSR (location.search="") 与 CSR (location.search="?id=...") 的初始值差异
// 引发 hydration mismatch（React 18+ 会丢弃 SSR HTML 整树重渲染，LCP 反而变差）。
export default function CommunityPromptDetailPage() {
  return <CommunityPromptDetail />;
}
