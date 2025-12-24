import React from "react";
import { Typography } from "antd";

export const PromptRemark = ({ remark, ...props }: { remark?: string } & React.HTMLAttributes<HTMLElement>) => {
  if (!remark) {
    return null;
  }

  return (
    <Typography.Paragraph
      {...props}
      style={{
        fontSize: "0.85rem",
        lineHeight: 1.5,
        padding: "2px 12px",
        borderRadius: 6,
        borderLeft: "3px solid var(--ifm-color-emphasis-200)", // SSG 兼容
        marginBottom: 12,
        ...props.style,
      }}
      ellipsis={{
        rows: 2,
        expandable: false,
      }}>
      {remark}
    </Typography.Paragraph>
  );
};
