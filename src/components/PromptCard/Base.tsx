import React, { ReactNode } from "react";
import { Card, Flex, theme } from "antd";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface BasePromptCardProps {
  title?: ReactNode;
  titleExtra?: ReactNode;
  actions?: ReactNode[];
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  loading?: boolean;
  hoverable?: boolean;
  id?: string;
  onCardClick?: () => void;
}

export const BasePromptCard = React.forwardRef<HTMLDivElement, BasePromptCardProps>(
  ({ title, titleExtra, actions, children, className, style, bodyStyle, loading, hoverable = true, id, onCardClick, ...rest }, ref) => {
    const { token } = theme.useToken();

    return (
      <Card
        ref={ref}
        id={id}
        hoverable={hoverable}
        loading={loading}
        className={clsx(styles.showcaseCard, className)}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderColor: token.colorBorderSecondary,
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
            ...bodyStyle,
          },
          actions: {
            borderTop: `1px solid ${token.colorBorder}`,
            backgroundColor: token.colorBgLayout,
            padding: `${token.paddingXS}px ${token.paddingSM}px`,
          },
        }}
        actions={actions}
        onClick={onCardClick}
        {...rest}>
        {(title || titleExtra) && (
          <Flex justify="space-between" align="start" style={{ marginBottom: token.marginSM, minHeight: 32 }}>
            <div style={{ flex: 1, overflow: "hidden", marginRight: token.marginXS }}>{title}</div>
            {titleExtra && <div>{titleExtra}</div>}
          </Flex>
        )}
        {children}
      </Card>
    );
  }
);

BasePromptCard.displayName = "BasePromptCard";
