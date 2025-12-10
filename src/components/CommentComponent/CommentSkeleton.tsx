import React from "react";
import { Skeleton, Flex, theme } from "antd";

interface CommentSkeletonProps {
  count?: number;
}

/**
 * 评论骨架屏组件
 * 模拟评论列表的加载状态
 */
export const CommentSkeleton: React.FC<CommentSkeletonProps> = ({ count = 3 }) => {
  const { token } = theme.useToken();

  return (
    <Flex vertical gap={token.margin}>
      {Array.from({ length: count }).map((_, index) => (
        <Flex key={index} gap={token.marginSM} style={{ padding: `${token.paddingXS}px 0` }}>
          {/* Avatar */}
          <Skeleton.Avatar active size={40} shape="circle" />

          {/* Content */}
          <Flex vertical style={{ flex: 1 }} gap={4}>
            {/* Author & Time row */}
            <Flex justify="space-between" align="center">
              <Skeleton.Input active size="small" style={{ width: 100, height: 18 }} />
              <Skeleton.Input active size="small" style={{ width: 70, height: 14 }} />
            </Flex>

            {/* Comment content */}
            <Skeleton active title={false} paragraph={{ rows: 2, width: ["100%", "60%"] }} />

            {/* Action button */}
            <Skeleton.Button active size="small" style={{ width: 50, height: 22 }} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CommentSkeleton;
