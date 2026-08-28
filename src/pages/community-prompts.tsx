import React from "react";
import OnlineOnlyNotice from "@site/src/components/OnlineOnlyNotice";

// offline 分支：这条路由需要后端，本构建没有。不再自动跳转，理由见 OnlineOnlyNotice。
export default function CommunityPromptsPage() {
  return (
    <OnlineOnlyNotice
      pageTitle="Community prompts"
      title="Community prompts are online only"
      description="This build keeps everything in your browser and has no backend, so the shared community lives on the main site."
      path="/community-prompts"
    />
  );
}
