import React, { useRef, useState, useLayoutEffect } from "react";
import { Tooltip } from "antd";
import styles from "./styles.module.css";

export const ShowcaseRemark = ({ remark, ...props }: { remark: string } & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <Tooltip title={remark}>
      <p className={styles.showcaseCardRemark} {...props}>
        {remark}
      </p>
    </Tooltip>
  );
};
