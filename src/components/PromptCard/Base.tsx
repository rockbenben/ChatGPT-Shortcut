import React, { ReactNode } from "react";
import { Card, Flex } from "antd";
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
          borderColor: "var(--ifm-color-emphasis-200)",
          cursor: onCardClick ? "pointer" : undefined,
          ...style,
        }}
        styles={{
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 20,
            gap: 8,
            ...bodyStyle,
          },
          actions: {
            borderTop: "1px solid var(--ifm-color-emphasis-200)",
            backgroundColor: "var(--ifm-background-surface-color)",
            padding: "8px 12px",
          },
        }}
        actions={actions}
        onClick={onCardClick}
        {...rest}>
        {(title || titleExtra) && (
          <Flex justify="space-between" align="start" style={{ marginBottom: 12, minHeight: 32 }}>
            <div style={{ flex: 1, overflow: "hidden", marginRight: 8 }}>{title}</div>
            {titleExtra && <div>{titleExtra}</div>}
          </Flex>
        )}
        {children}
      </Card>
    );
  }
);

BasePromptCard.displayName = "BasePromptCard";
