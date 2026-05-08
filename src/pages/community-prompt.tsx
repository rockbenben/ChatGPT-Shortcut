import React, { useMemo } from "react";
import { useLocation } from "@docusaurus/router";
import CommunityPromptPage from "@site/src/components/CommunityPromptPage";

const LOCAL_PROMPTS_KEY = "local_user_prompts";

// offline 分支：只读 localStorage 渲染本地 prompt detail；不需要 AuthProvider 包装（无登录）
export default function LocalPromptDetail() {
  const location = useLocation();

  const promptId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");
    if (idParam) {
      const id = parseInt(idParam, 10);
      return !isNaN(id) ? id : null;
    }
    return null;
  }, [location.search]);

  const prompt = useMemo(() => {
    if (!promptId) return null;
    try {
      const prompts: any[] = JSON.parse(localStorage.getItem(LOCAL_PROMPTS_KEY) || "[]");
      return prompts.find((p) => p.id === promptId) || null;
    } catch {
      return null;
    }
  }, [promptId]);

  return <CommunityPromptPage prompt={prompt} loading={false} error={prompt ? null : new Error("Not found")} />;
}
