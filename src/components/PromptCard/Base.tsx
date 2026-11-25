import React, { ReactNode } from "react";
import { Card, Flex } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";
import clsx from "clsx";
import styles from "./styles.module.css";

/**
 * antd 多行省略靠 `display:-webkit-box` + `-webkit-line-clamp`，而 flex 子项的 display
 * 会被 blockify（Chrome 算成 flow-root）——clamp 失效，只剩 overflow:hidden 把最后一行
 * 拦腰切断。所以放进 flex 容器的 Typography 都垫这层普通块盒：flex 属性由盒子承担。
 */
export const ClampBox: React.FC<{ children: ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ flex: 1, minWidth: 0, minHeight: 0, ...style }}>{children}</div>
);

export const PromptSourceLink: React.FC<{ href?: string }> = ({ href }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={translate({ id: "prompt.source", message: "来源" })}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 26, minHeight: 26, borderRadius: 6 }}>
      <LinkOutlined style={{ fontSize: 12, color: "var(--site-color-text-tertiary)" }} />
    </a>
  ) : null;

interface BasePromptCardProps {
  title?: ReactNode;
  titleExtra?: ReactNode;
  actions?: ReactNode[];
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  id?: string;
  onCardClick?: () => void;
}

export const BasePromptCard = React.forwardRef<HTMLDivElement, BasePromptCardProps>(
  ({ title, titleExtra, actions, footer, children, className, style, loading, id, onCardClick, ...rest }, ref) => {
    const handleCardKeyDown = onCardClick
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onCardClick();
          }
        }
      : undefined;

    const handlePreload = onCardClick
      ? () => {
          import("@site/src/components/PromptDetailModal");
        }
      : undefined;

    return (
      <Card
        ref={ref}
        id={id}
        hoverable
        loading={loading}
        className={clsx(styles.showcaseCard, className)}
        role={onCardClick ? "button" : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        onKeyDown={handleCardKeyDown}
        onPointerEnter={handlePreload}
        onTouchStart={handlePreload}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderColor: "var(--site-color-hairline)",
          cursor: onCardClick ? "pointer" : undefined,
          ...style,
        }}
        styles={{
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 0,
          },
          actions: {
            borderTop: "1px solid var(--site-color-hairline)",
            backgroundColor: "transparent",
            padding: "8px 12px",
          },
        }}
        actions={actions}
        onClick={onCardClick}
        {...rest}>
        <div className={styles.cardContent}>
          {(title || titleExtra) && (
            <Flex justify="space-between" align="start" style={{ marginBottom: 0, minHeight: 24 }}>
              <div style={{ flex: 1, overflow: "hidden", marginInlineEnd: 8 }}>{title}</div>
              {titleExtra && <Flex align="center" gap={8} style={{ flexShrink: 0 }}>{titleExtra}</Flex>}
            </Flex>
          )}
          {children}
        </div>
        {footer && (
          <div className={styles.cardFooter} onClick={(e) => e.stopPropagation()}>
            {footer}
          </div>
        )}
      </Card>
    );
  },
);

BasePromptCard.displayName = "BasePromptCard";
