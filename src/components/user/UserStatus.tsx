import React, { useContext, useState, useMemo, useEffect, useLayoutEffect, Suspense } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Button, Space, Skeleton } from "antd";
import { UserOutlined, CompassOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { ActionLink } from "@site/src/components/ActionLink";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";
import styles from "./UserStatus.module.css";

const LoginModal = lazyWithRetry(() => import("./LoginModal").then((m) => ({ default: m.LoginModal })));
const LoggedInUserStatus = lazyWithRetry(() => import("./LoggedInUserStatus"));

// data-auth-ready 必须在 paint 前置位：SPA 从非首页跳进首页时，useEffect（paint 后）会先闪一帧
// boot 骨架再换按钮。useLayoutEffect 在 commit 后、paint 前跑，首帧即正确。SSR 上退化为 useEffect 避免告警。
const useIsoLayoutEffect = ExecutionEnvironment.canUseDOM ? useLayoutEffect : useEffect;

const UserStatus = () => {
  const { userAuth, authLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // 水合/挂载后给 <html> 加 data-auth-ready：撤掉内联脚本（auth-boot-flag）设的 boot 占位，
  // 露出 React 渲染的真实按钮。此后 data-auth-boot 残留也无害（CSS 仅在 :not([data-auth-ready]) 时生效）。
  useIsoLayoutEffect(() => {
    document.documentElement.setAttribute("data-auth-state", userAuth ? "in" : "out");
    document.documentElement.setAttribute("data-auth-ready", "");
  }, [userAuth]);

  const loggedOutButtons = useMemo(
    () => (
      <div className={styles.loggedOutBar}>
        <ActionLink to="/community-prompts" icon={<CompassOutlined />}>
          <Translate id="link.communityPrompts">社区提示词</Translate>
        </ActionLink>
        <Button type="primary" size="middle" icon={<UserOutlined />} onClick={() => setOpen(true)}>
          <Translate id="button.login">登录</Translate>
        </Button>
      </div>
    ),
    [],
  );

  const authSkeleton = (
    <Space wrap size="small" align="center">
      <Skeleton.Button active size="medium" style={{ width: 112 }} />
      <Skeleton.Button active size="medium" style={{ width: 80 }} />
    </Space>
  );

  if (authLoading) {
    return authSkeleton;
  }

  return (
    <>
      {/* boot 占位：仅「已登录且尚未水合」时由 CSS 显示（见 custom.css + auth-boot-flag 内联脚本），
          避免发版冷缓存下已登录用户首屏几秒看到 SSR 静态 HTML 里的「登录」CTA。
          display:contents 包装，不产生布局盒子（零 CLS）。 */}
      <div className="userstatus-boot" aria-hidden>
        {authSkeleton}
      </div>
      <div className="userstatus-live">
        {userAuth ? (
          <Suspense fallback={authSkeleton}>
            <LoggedInUserStatus />
          </Suspense>
        ) : (
          <>
            {loggedOutButtons}
            {open && (
              <Suspense fallback={null}>
                <LoginModal open={open} onCancel={() => setOpen(false)} />
              </Suspense>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserStatus;
