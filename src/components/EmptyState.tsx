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
  /**
   * 整页就是这个空状态时打开（/user/auth、/user 未登录、404）。
   * 不开的话内容只靠 64px 顶部内边距贴在页首，下面整屏空白——/user/auth 还带 noFooter，
   * 900px 视口里 88% 是空的，像页面没加载完。这里只加一层垂直居中的外壳，
   * 420px 的正文宽度约束留在内层，避免描述在宽屏上拉成一整行。
   */
  fullPage?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, compact, fullPage }) => {
  const content = (
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

  if (!fullPage) {
    return content;
  }

  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>{content}</div>;
};

export default EmptyState;
