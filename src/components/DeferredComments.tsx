import React, { Suspense, useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";

const Comments = lazyWithRetry(() => import("@site/src/components/Comments"));

interface DeferredCommentsProps {
  pageId: number | string;
  type: string;
  onCountChange?: (count: number) => void;
}

/**
 * 视口懒挂载评论区：等首次交互或短暂空闲后再激活 IntersectionObserver，
 * 使短详情页（如 /community-prompt/10017）不会在首屏水合阶段抢跑下载 react-markdown/Pagination chunk。
 */
export const DeferredComments: React.FC<DeferredCommentsProps> = ({ pageId, type, onCountChange }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (armed || typeof window === "undefined") return;
    let done = false;
    const arm = () => {
      if (done) return;
      done = true;
      setArmed(true);
    };

    const events: Array<keyof WindowEventMap> = ["scroll", "pointerdown", "touchstart", "keydown"];
    events.forEach((ev) => window.addEventListener(ev, arm, { passive: true, once: true }));

    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(arm, { timeout: 1200 });
    } else {
      timerId = setTimeout(arm, 900);
    }

    return () => {
      done = true;
      events.forEach((ev) => window.removeEventListener(ev, arm));
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [armed]);

  useEffect(() => {
    if (!armed || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" },
    );

    if (hostRef.current) {
      observer.observe(hostRef.current);
    }

    return () => observer.disconnect();
  }, [armed, visible]);

  return (
    <div ref={hostRef} style={{ minHeight: 220 }}>
      {visible ? (
        <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
          <Comments pageId={pageId} type={type} onCountChange={onCountChange} />
        </Suspense>
      ) : (
        <Skeleton active paragraph={{ rows: 4 }} />
      )}
    </div>
  );
};
