import React from "react";
import OnlineOnlyNotice from "@site/src/components/OnlineOnlyNotice";

// offline 分支：这条路由需要后端，本构建没有。不再自动跳转，理由见 OnlineOnlyNotice。
export default function AuthCallbackPage() {
  return (
    <OnlineOnlyNotice
      pageTitle="Sign in"
      title="Signing in is online only"
      description="This build has no accounts — your prompts and favorites are stored in this browser. Sign-in belongs to the main site."
      path="/user/auth"
      keepQuery
    />
  );
}
