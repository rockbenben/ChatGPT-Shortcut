import React from "react";

/**
 * 站内所有空/错误状态的唯一出口。不用 antd 的 <Empty>/<Result>：它们自带浅色卡通插画，
 * 在这套暗色排版里是整页最响的一块。新增空状态走这里，别再另起一套。
 * 文案约定：description 说清"接下来能做什么"。
 */
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 下一步动作。空状态是行动的邀请，能给就给一个出口 */
  action?: React.ReactNode;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, compact }) => (
  <div
    style={{
      textAlign: "center",
      padding: compact ? "32px 24px" : "64px 24px",
      maxWidth: 420,
      margin: "0 auto",
    }}>
    {icon && <div style={{ fontSize: compact ? 28 : 40, color: "var(--site-color-text-tertiary)", marginBottom: compact ? 14 : 20, lineHeight: 1 }}>{icon}</div>}
    <h3
      style={{
        fontSize: compact ? 15 : 18,
        fontWeight: 600,
        color: "var(--ifm-color-content)",
        letterSpacing: "-0.01em",
        margin: "0 0 8px",
      }}>
      {title}
    </h3>
    {description && <p style={{ fontSize: compact ? 13 : 14, color: "var(--ifm-color-content-secondary)", lineHeight: 1.6, margin: 0 }}>{description}</p>}
    {action && <div style={{ marginTop: 20 }}>{action}</div>}
  </div>
);

export default EmptyState;
