import React from "react";
import { Card, Skeleton, Row, Col, theme } from "antd";

interface PromptCardSkeletonProps {
  count?: number;
}

/**
 * 提示词卡片骨架屏组件
 * 用于在数据加载期间显示占位内容，避免布局抖动
 */
export const PromptCardSkeleton: React.FC<PromptCardSkeletonProps> = ({ count = 4 }) => {
  const { token } = theme.useToken();

  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: count }).map((_, i) => (
        <Col key={i} xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 12,
              border: `1px solid ${token.colorBorderSecondary}`,
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
