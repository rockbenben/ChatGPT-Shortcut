import React, { useMemo } from "react";
import { Card, Skeleton, Row, Col } from "antd";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

interface PromptCardSkeletonProps {
  count?: number;
}

/**
 * 计算基于视口的可见骨架屏数量
 * 这避免渲染屏幕外的骨架屏，减少 DOM 节点和 TBT
 */
const calculateVisibleCount = (fallbackCount: number): number => {
  if (!ExecutionEnvironment.canUseDOM) return fallbackCount;

  const cardHeight = 280; // 预估卡片高度
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // 根据断点计算列数
  let columns = 4;
  if (viewportWidth < 576) columns = 1;
  else if (viewportWidth < 768) columns = 2;
  else if (viewportWidth < 992) columns = 3;
  else columns = 4;

  // 计算可见行数 (向上取整 + 1 行缓冲)
  const visibleRows = Math.ceil(viewportHeight / cardHeight) + 1;

  // 返回可见数量，最少 fallbackCount，最多 12
  return Math.min(Math.max(columns * visibleRows, fallbackCount), 12);
};

/**
 * 提示词卡片骨架屏组件
 * 用于在数据加载期间显示占位内容，避免布局抖动
 */
export const PromptCardSkeleton: React.FC<PromptCardSkeletonProps> = ({ count = 4 }) => {
  // 使用 useMemo 避免每次渲染都重新计算
  const visibleCount = useMemo(() => calculateVisibleCount(count), [count]);

  return (
    <Row gutter={[16, 16]} style={{ contain: "layout style" }}>
      {Array.from({ length: visibleCount }).map((_, i) => (
        <Col
          key={i}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          style={{
            minHeight: 280,
          }}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 12,
              border: "1px solid var(--ifm-color-emphasis-200)",
              boxShadow: "none",
              height: "100%",
            }}>
            {/* 标题区域 */}
            <Skeleton.Input active size="small" style={{ width: "70%", marginBottom: 12 }} />
            {/* 标签区域 */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <Skeleton.Button active size="small" style={{ width: 50, minWidth: 50 }} />
              <Skeleton.Button active size="small" style={{ width: 40, minWidth: 40 }} />
            </div>
            {/* 内容区域 */}
            <Skeleton active paragraph={{ rows: 3, width: ["100%", "90%", "60%"] }} title={false} />
            {/* 底部操作区域 */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              <Skeleton.Button active size="small" style={{ width: 60, minWidth: 60 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <Skeleton.Avatar active size="small" />
                <Skeleton.Avatar active size="small" />
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PromptCardSkeleton;
