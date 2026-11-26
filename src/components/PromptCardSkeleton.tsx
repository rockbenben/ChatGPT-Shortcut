import React, { useMemo } from "react";
import { Card, Skeleton, Row, Col } from "antd";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

interface PromptCardSkeletonProps {
  count?: number;
  /** 固定渲染 count 个骨架卡片，避免桌面端“加载更多”撑出多行引发大跳变 CLS */
  fixedCount?: boolean;
}

const calculateVisibleCount = (fallbackCount: number): number => {
  if (!ExecutionEnvironment.canUseDOM) return fallbackCount;

  const cardHeight = 250;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  let columns = 4;
  if (viewportWidth < 576) columns = 1;
  else if (viewportWidth < 768) columns = 2;
  else if (viewportWidth < 992) columns = 3;
  else columns = 4;

  const visibleRows = Math.ceil(viewportHeight / cardHeight) + 1;
  return Math.min(Math.max(columns * visibleRows, fallbackCount), 12);
};

export const PromptCardSkeleton: React.FC<PromptCardSkeletonProps> = ({ count = 4, fixedCount = false }) => {
  const visibleCount = useMemo(() => (fixedCount ? Math.max(1, count) : calculateVisibleCount(count)), [count, fixedCount]);

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
            minHeight: 250,
          }}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 12,
              border: "1px solid var(--site-color-hairline)",
              backgroundColor: "var(--ifm-background-surface-color)",
              boxShadow: "var(--site-shadow-xs)",
              height: "100%",
            }}
            styles={{
              body: {
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: 0,
              },
            }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 16px 14px", gap: 10 }}>
              <Skeleton.Input active size="small" style={{ width: "68%" }} />
              <Skeleton.Input active size="small" style={{ width: "88%", height: 14 }} />
              <div style={{ flex: 1 }}>
                <Skeleton active paragraph={{ rows: 3, width: ["100%", "92%", "64%"] }} title={false} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", minHeight: 44, borderTop: "1px solid var(--site-color-hairline)" }}>
              <Skeleton.Button active size="small" style={{ width: 52, minWidth: 52 }} />
              <Skeleton.Avatar active size="small" />
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PromptCardSkeleton;
