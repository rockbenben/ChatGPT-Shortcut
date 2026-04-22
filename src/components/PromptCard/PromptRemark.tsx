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
        padding: "4px 12px",
        borderRadius: "0 6px 6px 0",
        borderLeft: "3px solid rgba(var(--ifm-color-primary-rgb), 0.45)",
        background: "linear-gradient(90deg, rgba(var(--ifm-color-primary-rgb), 0.06) 0%, transparent 100%)",
        fontStyle: "italic",
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
