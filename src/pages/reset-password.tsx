import React from "react";
import OnlineOnlyNotice from "@site/src/components/OnlineOnlyNotice";

// offline 分支：这条路由需要后端，本构建没有。不再自动跳转，理由见 OnlineOnlyNotice。
export default function ResetPasswordPage() {
  return (
    <OnlineOnlyNotice
      pageTitle="Reset password"
      title="Password reset is online only"
      description="Accounts live on the main site. This build has no accounts — your prompts and favorites are stored in this browser."
      path="/reset-password"
      keepQuery
    />
  );
}
