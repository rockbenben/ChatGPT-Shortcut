import React, { useContext } from "react";
import classNames from "classnames";
import { ConfigProvider, theme, Typography } from "antd";
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
  const { token } = theme.useToken();

  const prefixCls = getPrefixCls("comment");

  const contentDom = (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: token.marginXS }}>
        <Text strong>{author || "AI Short"}</Text>
        <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
          {datetime}
        </Text>
      </div>
      <div style={{ marginBottom: token.marginXS }}>
        <Paragraph style={{ margin: 0, wordWrap: "break-word" }}>{content}</Paragraph>
      </div>
      <div style={{ display: "flex", gap: token.marginSM, alignItems: "center" }}>
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
            marginTop: token.marginSM,
            paddingLeft: token.paddingSM,
            borderLeft: `2px solid ${token.colorSplit}`,
            marginLeft: token.marginXS,
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
        marginBottom: token.margin,
        padding: token.paddingSM,
        borderRadius: token.borderRadiusSM,
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = token.colorFillQuaternary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}>
      <div className={`${prefixCls}-inner`} style={{ display: "flex", gap: token.marginSM }}>
        {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
        {contentDom}
      </div>
    </div>
  );
};

export default CommentComponent;
