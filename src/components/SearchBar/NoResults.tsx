import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";
import { EmptyState } from "@site/src/components/EmptyState";

// NoResults 组件：先显示 "Searching..." 150ms，再显示真正的"无结果"提示，防止瞬间搜索完成时的闪烁
export const NoResults: React.FC = () => {
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNoResult(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!showNoResult) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Spin />
      </div>
    );
  }

  return (
    <EmptyState
      icon={<SearchOutlined />}
      title={<Translate id="noResults.title">没有找到匹配的提示词</Translate>}
      description={<Translate id="noResults.description">换个关键词，或清除标签筛选试试</Translate>}
    />
  );
};
