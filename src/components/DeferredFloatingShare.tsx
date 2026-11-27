import React, { Suspense, useEffect, useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useLocation } from "@docusaurus/router";
import { lazyOptional } from "@site/src/utils/lazyRetry";

const ShareButtons = lazyOptional(() => import("@site/src/components/ShareButtons"));

/**
 * 悬浮分享按钮延迟容器：把 mount 推迟到空闲期，且将状态隔离在叶节点内部，
 * 避免父级页面（HomePage / CommunityPrompts）在 mount 时为了读取 window.location.href 触发整树 re-render。
 */
export const DeferredFloatingShare: React.FC<{ title: string }> = ({ title }) => {
  const [ready, setReady] = useState(false);
  useLocation(); // URL 变更时刷新传给 ShareButtons 的当前链接

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    const mount = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(mount, { timeout: 1500 });
      return () => (window as any).cancelIdleCallback(id);
    }
    const timer = setTimeout(mount, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!ready || typeof window === "undefined") return null;

  return (
    <Suspense fallback={null}>
      <ShareButtons shareUrl={window.location.href} title={title} />
    </Suspense>
  );
};
