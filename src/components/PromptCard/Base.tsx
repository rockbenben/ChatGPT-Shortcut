import React, { ReactNode } from "react";
import { Card, Flex, theme } from "antd";
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

interface BasePromptCardProps {
  title?: ReactNode;
  titleExtra?: ReactNode;
  actions?: ReactNode[];
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  id?: string;
  onCardClick?: () => void;
}

export const BasePromptCard = React.forwardRef<HTMLDivElement, BasePromptCardProps>(
  ({ title, titleExtra, actions, children, className, style, loading, id, onCardClick, ...rest }, ref) => {
    const { token } = theme.useToken();

    // 整卡可点开详情弹窗，但 antd Card 渲染的是裸 <div>：不给 role/tabIndex/键盘处理，
    // 键盘与读屏用户就完全够不到这个入口（styles 里的 :focus-visible 规则也永远不触发）。
    // 卡内还有标题链接与操作按钮，所以只在事件源就是卡片本身时响应，避免 Enter 双触发。
    const handleCardKeyDown = onCardClick
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onCardClick();
          }
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
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: onCardClick ? "pointer" : undefined,
          ...style,
        }}
        styles={{
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: token.paddingMD,
            gap: token.marginXS,
          },
          actions: {
            // 使用 CSS 变量替代 JS token，确保 SSG 主题兼容
            borderTop: "1px solid var(--ifm-color-emphasis-200)",
            backgroundColor: "var(--ifm-background-surface-color)",
            padding: `${token.paddingXS}px ${token.paddingSM}px`,
          },
        }}
        actions={actions}
        onClick={onCardClick}
        {...rest}>
        {(title || titleExtra) && (
          <Flex justify="space-between" align="start" style={{ marginBottom: token.marginSM, minHeight: 32 }}>
            <div style={{ flex: 1, overflow: "hidden", marginRight: token.marginXS }}>{title}</div>
            {/* flexShrink:0：角标是定宽信息，标题再长也不该压扁它 */}
            {titleExtra && (
              <Flex align="center" gap={token.marginXS} style={{ flexShrink: 0 }}>
                {titleExtra}
              </Flex>
            )}
          </Flex>
        )}
        {children}
      </Card>
    );
  }
);

BasePromptCard.displayName = "BasePromptCard";
