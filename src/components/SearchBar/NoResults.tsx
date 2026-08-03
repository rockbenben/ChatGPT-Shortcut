import React, { useState, useEffect } from "react";
import { Spin, Button } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";
import { EmptyState } from "@site/src/components/EmptyState";
import { useClearFilters } from "./index";

// NoResults 组件：先显示 "Searching..." 150ms，再显示真正的"无结果"提示，防止瞬间搜索完成时的闪烁
export const NoResults: React.FC = () => {
  const [showNoResult, setShowNoResult] = useState(false);
  // 空状态是行动的邀请：描述里写了"清除标签筛选试试"，就得真给一个能点的出口
  const { activeFilterCount, clearFilters } = useClearFilters();

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
      action={
        activeFilterCount > 0 && (
          <Button icon={<CloseOutlined />} onClick={clearFilters}>
            <Translate id="action.clearFilters" values={{ count: activeFilterCount }}>
              {"清除筛选 ({count})"}
            </Translate>
          </Button>
        )
      }
    />
  );
};
