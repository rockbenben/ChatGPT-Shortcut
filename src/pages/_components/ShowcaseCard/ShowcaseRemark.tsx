import React from "react";
import { Tooltip } from "antd";
import styles from "./styles.module.css";

export const ShowcaseRemark = ({ remark, ...props }: { remark: string } & React.HTMLAttributes<HTMLParagraphElement>) => {
  const isLongRemark = remark.length > 72;
  const content = (
    <p className={styles.showcaseCardRemark} {...props}>
      {remark}
    </p>
  );
  return isLongRemark ? <Tooltip title={remark}>{content}</Tooltip> : content;
};
