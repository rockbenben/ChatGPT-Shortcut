import React, { useState, useEffect } from "react";
import { Empty, Spin } from "antd";
import { translate } from "@docusaurus/Translate";

// NoResults 组件：先显示 "Searching..." 150ms，再显示真正的“无结果”提示，防止瞬间搜索完成时的闪烁
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

  return <Empty description={translate({ id: "showcase.usersList.noResult", message: "找不到相关结果，请尝试缩短搜索词" })} />;
};
