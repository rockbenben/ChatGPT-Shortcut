import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "@docusaurus/router";
import CommunityPromptPage from "@site/src/components/CommunityPromptPage";
import { loadPrompts } from "@site/src/api";

// offline 分支：只读本地存储渲染自建提示词的详情页；没有登录，也不需要 AuthProvider 包装。
export default function LocalPromptDetail() {
  const location = useLocation();

  const promptId = useMemo(() => {
    const idParam = new URLSearchParams(location.search).get("id");
    if (!idParam) return null;
    const id = parseInt(idParam, 10);
    return Number.isNaN(id) ? null : id;
  }, [location.search]);

  // 读取放在 effect 里，不放渲染期：
  //  1. localStorage 在 SSR 期不存在，渲染期读必然算出 null，预渲染出来的就是「未找到」，
  //     而客户端首帧渲染出真内容 —— hydration mismatch，实际表现是详情页先闪一下未找到；
  //  2. 走 loadPrompts() 而不是自己写 localStorage.getItem("local_user_prompts")：
  //     那个 key 名在 localStore.ts 里是不能漂移的约定，重复一份字面量迟早对不上。
  const [prompt, setPrompt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPrompt(promptId === null ? null : (loadPrompts().find((p) => p.id === promptId) ?? null));
    setLoading(false);
  }, [promptId]);

  return <CommunityPromptPage prompt={prompt} loading={loading} error={loading || prompt ? null : new Error("Not found")} />;
}
