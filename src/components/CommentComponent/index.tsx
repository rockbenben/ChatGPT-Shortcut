import React, { useContext, memo } from "react";
import classNames from "classnames";
import { ConfigProvider, theme, Typography } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
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
        {/* author 为空 = 官方账号回复（内容可能是 AI 也可能是站长人工，所以用"认证对勾"而非 AI 字样——
            语言中立、18 locale 零 i18n 负担，且不误标人工回复 */}
        {/* 间距用图标 marginLeft 而非 flex gap：Text strong 内部会再包一层 <strong>，
            名字和图标在同一 flex 子项里，外层 gap 不生效 */}
        <Text strong style={{ fontSize: 14, fontWeight: 500 }}>
          {author || (
            <>
              AI Short
              <CheckCircleFilled aria-label="official" style={{ fontSize: 13, color: "var(--site-color-tag-selected-text)", marginLeft: 8 }} />
            </>
          )}
        </Text>
        <Text type="secondary" style={{ fontSize: 11.5, fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>
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
            borderLeft: "2px solid var(--site-color-hairline)",
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
        borderRadius: 6,
        transition: "background-color 0.12s var(--site-motion-emphasized)",
      }}
      onMouseEnter={(e) => {
        // family: sage hover wake-up（与卡片 hover 同语言）
        e.currentTarget.style.backgroundColor = "rgba(var(--ifm-color-primary-rgb), 0.04)";
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

export default memo(CommentComponent);
