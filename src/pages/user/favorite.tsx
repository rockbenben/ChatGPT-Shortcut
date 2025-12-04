import React, { useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";

import { Tabs, theme, Flex } from "antd";
import { HeartOutlined, EditOutlined } from "@ant-design/icons";
import styles from "@site/src/pages/styles.module.css";

import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import SearchBar, { useFilteredPrompts } from "@site/src/pages/_components/SearchBar";
import { NoResults } from "@site/src/pages/_components/SearchBar/NoResults";
import { AuthProvider } from "../_components/AuthContext";

const UserBookmark = () => {
  const [activeTab, setActiveTab] = useState<"default" | "myfavor" | "myprompts">("myprompts");
  const { filteredCommus, filteredCards, isFiltered } = useFilteredPrompts(activeTab);
  const { token } = theme.useToken();

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as "default" | "myfavor" | "myprompts");
  }, []);

  const showNoResults = isFiltered && filteredCards.length === 0 && filteredCommus.length === 0;

  const items = useMemo(
    () => [
      {
        key: "myfavor",
        label: translate({ id: "common.favorites", message: "收藏" }),
        icon: <HeartOutlined />,
        children: !showNoResults && <UserFavorite filteredCommus={filteredCommus} filteredCards={filteredCards} isFiltered={isFiltered} />,
      },
      {
        key: "myprompts",
        label: translate({ id: "common.myPrompts", message: "我的提示词" }),
        icon: <EditOutlined />,
        children: !showNoResults && <UserPrompts filteredCommus={filteredCommus} isFiltered={isFiltered} />,
      },
    ],
    [filteredCommus, filteredCards, isFiltered, showNoResults]
  );

  return (
    <Layout>
      <div style={{ minHeight: "calc(100vh - 60px)", padding: "24px 0" }}>
        <div className="container">
          <Flex vertical gap="middle">
            {/* Top Actions */}
            <div className={clsx("text--center", styles.heroSection)}>
              <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
            </div>

            {/* Tabs and Search */}
            <Flex justify="space-between" align="center" wrap="wrap" gap="middle" style={{ marginBottom: 16 }}>
              <Tabs
                activeKey={activeTab}
                items={items.map((item) => ({ ...item, children: null }))} // Only render tab headers here
                onChange={handleTabChange}
                style={{ marginBottom: 0 }}
                tabBarStyle={{ marginBottom: 0 }}
              />
              <div style={{ width: "100%", maxWidth: 300 }}>
                <SearchBar />
              </div>
            </Flex>

            {/* Content Area */}
            <div style={{ minHeight: 400 }}>
              {items.find((item) => item.key === activeTab)?.children}
              {showNoResults && <NoResults />}
            </div>
          </Flex>
        </div>
      </div>
    </Layout>
  );
};

const FavoritePage = () => (
  <AuthProvider>
    <UserBookmark />
  </AuthProvider>
);

export default FavoritePage;
