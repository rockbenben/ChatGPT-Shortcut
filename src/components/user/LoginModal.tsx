import React, { Suspense, useState } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Modal, Skeleton, Typography } from "antd";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";

const LoginForm = lazyWithRetry(() => import("./login"));

export type LoginView = "login" | "register" | "forgot-password";

const titles = {
  login: <Translate id="login.title.welcome">欢迎回来</Translate>,
  register: <Translate id="login.title.register">加入社区</Translate>,
  "forgot-password": <Translate id="login.title.forgotPassword">找回密码</Translate>,
};

export function LoginModal({ open, onCancel }: { open: boolean; onCancel: () => void }) {
  const [view, setView] = useState<LoginView>("login");

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={440}
      footer={null}
      closable={{ "aria-label": translate({ id: "action.close", message: "关闭" }) }}
      styles={{ header: { marginBottom: 6, paddingTop: 8, paddingInline: 20 } }}
      title={
        <Typography.Title level={3} style={{ textAlign: "center", margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
          {titles[view]}
        </Typography.Title>
      }>
      <Suspense fallback={<Skeleton active title={false} paragraph={{ rows: 4 }} />}>
        <LoginForm viewState={view} setViewState={setView} />
      </Suspense>
    </Modal>
  );
}
