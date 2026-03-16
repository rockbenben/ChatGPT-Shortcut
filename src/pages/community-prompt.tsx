import React, { useMemo } from "react";
import { useLocation } from "@docusaurus/router";
import { App } from "antd";
import { AuthProvider } from "@site/src/components/AuthContext";
import CommunityPromptPage from "@site/src/components/CommunityPromptPage";

const LOCAL_PROMPTS_KEY = "local_user_prompts";

function LocalPromptDetail() {
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

export default function WrappedLocalPromptDetail() {
  return (
    <AuthProvider>
      <App>
        <LocalPromptDetail />
      </App>
    </AuthProvider>
  );
}
