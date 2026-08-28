import React from "react";
import OnlineOnlyNotice from "@site/src/components/OnlineOnlyNotice";

// offline 分支：这条路由需要后端，本构建没有。不再自动跳转，理由见 OnlineOnlyNotice。
export default function FeedbackPage() {
  return (
    <OnlineOnlyNotice
      pageTitle="Feedback"
      title="Feedback is online only"
      description="There is no backend here to receive it. Send your feedback on the main site instead."
      path="/feedback"
    />
  );
}
