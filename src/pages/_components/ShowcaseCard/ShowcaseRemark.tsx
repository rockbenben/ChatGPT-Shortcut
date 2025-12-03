import React, { useRef, useState, useLayoutEffect } from "react";
import { Tooltip } from "antd";
import styles from "./styles.module.css";

export const ShowcaseRemark = ({ remark, ...props }: { remark: string } & React.HTMLAttributes<HTMLParagraphElement>) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkTruncation = () => {
      // Use requestAnimationFrame to ensure layout is settled
      requestAnimationFrame(() => {
        if (element) {
          // Check if scrollHeight is significantly larger than clientHeight
          const isOverflowing = element.scrollHeight > element.clientHeight + 1;
          setIsTruncated(isOverflowing);
        }
      });
    };

    checkTruncation();

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [remark]);

  const content = (
    <p ref={ref} className={styles.showcaseCardRemark} {...props}>
      {remark}
    </p>
  );

  return isTruncated ? <Tooltip title={remark}>{content}</Tooltip> : content;
};
