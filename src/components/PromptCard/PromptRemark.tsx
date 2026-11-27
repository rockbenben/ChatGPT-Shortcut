import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export const PromptRemark = ({ remark, className, ...props }: { remark?: string } & React.HTMLAttributes<HTMLParagraphElement>) => {
  if (!remark?.trim()) {
    return null;
  }

  return (
    <div className={styles.remarkWrap}>
      <p {...props} className={clsx(styles.cardRemark, styles.clampLines, styles.clamp2, className)}>
        {remark}
      </p>
    </div>
  );
};
