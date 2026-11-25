import React, { useContext, memo } from "react";
import clsx from "clsx";
import { ConfigProvider, Typography } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import type { ReactNode } from "react";

const { Text, Paragraph } = Typography;

interface CommentComponentProps {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <Text strong dir="auto" style={{ fontSize: 14, fontWeight: 600, overflowWrap: "anywhere" }}>
          {author || (
            <>
              AI Short
              <CheckCircleFilled aria-label="official" style={{ fontSize: 13, color: "var(--site-color-tag-selected-text)", marginInlineStart: 6 }} />
            </>
          )}
        </Text>
        <Text type="secondary" style={{ fontSize: 11.5, fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
          {datetime}
        </Text>
      </div>
      {/* dir="auto"：评论是任意语言的 UGC，不声明方向时阿语混入网址/英文会让行内顺序错乱 */}
      <div style={{ marginBottom: 6 }}>
        <Paragraph dir="auto" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, overflowWrap: "anywhere" }}>
          {content}
        </Paragraph>
      </div>
      {actions && actions.length > 0 && (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {actions.map((action, index) => (
            <span key={index} style={{ display: "inline-flex", alignItems: "center" }}>
              {action}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const cls = clsx(prefixCls, "comment-item", { [`${prefixCls}-rtl`]: direction === "rtl" }, className);

  return (
    <div className={cls} style={style}>
      <div className={`${prefixCls}-inner`} style={{ display: "flex", gap: 12 }}>
        {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
        {contentDom}
      </div>
      {children && <div className={clsx("comment-replies", avatar && "comment-replies-with-avatar")}>{children}</div>}
    </div>
  );
};

export default memo(CommentComponent);
