import React from "react";
import { Typography } from "antd";

export const PromptRemark = ({ remark, ...props }: { remark?: string } & React.HTMLAttributes<HTMLElement>) => {
  if (!remark?.trim()) {
    return null;
  }

  return (
    <Typography.Paragraph
      {...props}
      style={{
        fontSize: 13,
        lineHeight: 1.55,
        color: "var(--site-color-remark-text)",
        marginBottom: 0,
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
