import React from "react";
import { theme, Typography } from "antd";

export const PromptRemark = ({ remark, ...props }: { remark?: string } & React.HTMLAttributes<HTMLElement>) => {
  const { token } = theme.useToken();

  if (!remark) {
    return null;
  }

  return (
    <Typography.Paragraph
      {...props}
      style={{
        marginBottom: token.marginSM,
        fontSize: "0.85rem",
        lineHeight: 1.5,
        color: token.colorTextSecondary,
        padding: `${token.paddingXXS}px ${token.paddingXS}px`,
        borderRadius: token.borderRadiusSM,
        borderLeft: `3px solid ${token.colorFillTertiary}`,
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
