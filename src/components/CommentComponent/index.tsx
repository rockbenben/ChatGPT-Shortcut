import React, { useContext, memo } from "react";
import classNames from "classnames";
import { ConfigProvider, Typography } from "antd";
import type { ReactNode } from "react";

const { Text, Paragraph } = Typography;

export interface CommentComponentProps {
  actions?: ReactNode[];
  author?: ReactNode;
  avatar?: ReactNode;
  content: ReactNode;
  children?: ReactNode;
  style?: React.CSSProperties;
  datetime?: ReactNode;
  className?: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ actions, author, avatar, children, className, content, datetime, style }) => {
  const { getPrefixCls, direction } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = getPrefixCls("comment");

  const contentDom = (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Text strong>{author || "AI Short"}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {datetime}
        </Text>
      </div>
      <div style={{ marginBottom: 8 }}>
        <Paragraph style={{ margin: 0, wordWrap: "break-word" }}>{content}</Paragraph>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {actions &&
          actions.map((action, index) => (
            <span key={index} style={{ display: "inline-flex", alignItems: "center" }}>
              {action}
            </span>
          ))}
      </div>
      {children && (
        <div
          style={{
            marginTop: 12,
            paddingLeft: 12,
            borderLeft: "2px solid var(--ifm-color-emphasis-200)",
            marginLeft: 8,
          }}>
          {children}
        </div>
      )}
    </div>
  );

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === "rtl",
    },
    className
  );

  return (
    <div
      className={cls}
      style={{
        ...style,
        marginBottom: 16,
        padding: 12,
        borderRadius: 4,
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--ifm-color-emphasis-100)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}>
      <div className={`${prefixCls}-inner`} style={{ display: "flex", gap: 12 }}>
        {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
        {contentDom}
      </div>
    </div>
  );
};

export default memo(CommentComponent);
