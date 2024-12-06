import React, { useState, useCallback } from "react";
import Layout from "@theme/Layout";
import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import { AuthProvider } from "../_components/AuthContext";
import { HeartOutlined, EditOutlined } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";
import { ConfigProvider, theme } from "antd";

const tabStyles = {
  container: {
    margin: "18px",
    display: "flex",
  },
  tab: {
    marginRight: "10px",
    cursor: "pointer",
  },
  activeTab: {
    color: "var(--ifm-color-primary)",
  },
};

const Tabs = ({ activeTab, onTabChange }) => (
  <div style={tabStyles.container}>
    <span
      style={{
        ...tabStyles.tab,
        ...(activeTab === "favorites" ? tabStyles.activeTab : {}),
      }}
      onClick={() => onTabChange("favorites")}>
      <HeartOutlined style={{ marginRight: "5px" }} />
      {translate({ message: "收藏" })}
    </span>
    <span
      style={{
        ...tabStyles.tab,
        ...(activeTab === "prompts" ? tabStyles.activeTab : {}),
      }}
      onClick={() => onTabChange("prompts")}>
      <EditOutlined style={{ marginRight: "5px" }} />
      {translate({ id: "myprompt", message: "我的提示词" })}
    </span>
  </div>
);

const UserBookmark = () => {
  const [activeTab, setActiveTab] = useState("favorites");

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const isDarkMode = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <Layout>
      <main className="margin-vert--lg" style={{ maxWidth: "1200px", margin: "auto" }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#397e6a",
            },
            cssVar: true,
            hashed: false,
            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}>
          <div className="text--center">
            <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
          </div>
          <div style={{ margin: "0 auto", maxWidth: "90%" }}>
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === "favorites" && <UserFavorite />}
            {activeTab === "prompts" && <UserPrompts />}
          </div>
        </ConfigProvider>
      </main>
    </Layout>
  );
};

const FavoritePage = () => (
  <AuthProvider>
    <UserBookmark />
  </AuthProvider>
);

export default FavoritePage;
