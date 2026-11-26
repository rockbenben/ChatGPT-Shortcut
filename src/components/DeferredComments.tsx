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
 * 视口懒挂载评论区：等用户滚动接近讨论区（300px）再加载与挂载 react-markdown/Form/Pagination，
 * 避免详情页首屏水合阶段触发长帧阻塞移动端 INP。
 */
export const DeferredComments: React.FC<DeferredCommentsProps> = ({ pageId, type, onCountChange }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
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
      { rootMargin: "300px" },
    );

    if (hostRef.current) {
      observer.observe(hostRef.current);
    }

    return () => observer.disconnect();
  }, [visible]);

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
