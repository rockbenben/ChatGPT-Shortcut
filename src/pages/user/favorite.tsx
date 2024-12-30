import React, { useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";

import { Tabs, ConfigProvider, theme } from "antd";
import { HeartOutlined, EditOutlined } from "@ant-design/icons";
import styles from "@site/src/pages/styles.module.css";

import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import SearchBar, { NoResults, useFilteredPrompts } from "@site/src/pages/_components/SearchBar";
import { AuthProvider } from "../_components/AuthContext";

const UserBookmark = () => {
  const [activeTab, setActiveTab] = useState("myprompts");
  const { filteredCommus, filteredCards, isFiltered } = useFilteredPrompts(activeTab);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const isDarkMode = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";
  const showNoResults = isFiltered && filteredCards.length === 0 && filteredCommus.length === 0;

  const items = useMemo(
    () => [
      {
        key: "myfavor",
        label: translate({ message: "收藏" }),
        icon: <HeartOutlined />,
        children: !showNoResults && <UserFavorite filteredCommus={filteredCommus} filteredCards={filteredCards} isFiltered={isFiltered} />,
      },
      {
        key: "myprompts",
        label: translate({ id: "myprompt", message: "我的提示词" }),
        icon: <EditOutlined />,
        children: !showNoResults && <UserPrompts filteredCommus={filteredCommus} isFiltered={isFiltered} />,
      },
    ],
    [filteredCommus, filteredCards, isFiltered, showNoResults]
  );

  return (
    <Layout>
      <main className="margin-vert--md">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#397e6a",
            },
            cssVar: true,
            hashed: false,
            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}>
          <section className="margin-top--sm margin-bottom--sm">
            <div className="container padding-vert--md">
              <div className="text--center">
                <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
              </div>
              <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                <SearchBar />
              </div>
              <Tabs activeKey={activeTab} items={items} onChange={handleTabChange} />
              {showNoResults && <NoResults />}
            </div>
          </section>
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
