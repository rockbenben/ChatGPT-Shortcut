import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";

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
    <div style={{ textAlign: "center", padding: "64px 24px", maxWidth: 420, margin: "0 auto" }}>
      <SearchOutlined style={{ fontSize: 40, color: "var(--site-color-text-tertiary)", marginBottom: 20 }} />
      <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ifm-color-content)", letterSpacing: "-0.01em", margin: "0 0 8px" }}>
        <Translate id="noResults.title" description="No results title">没有找到匹配的提示词</Translate>
      </h3>
      <p style={{ fontSize: 14, color: "var(--ifm-color-content-secondary)", lineHeight: 1.6, margin: 0 }}>
        <Translate id="noResults.description" description="No results helpful guidance">
          换个关键词，或清除标签筛选试试
        </Translate>
      </p>
    </div>
  );
};
