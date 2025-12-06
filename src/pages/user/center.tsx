import React, { useState, useCallback, useMemo } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

import { theme, Flex, Button, Space, Segmented } from "antd";
import { HeartOutlined, EditOutlined, HomeOutlined, UserOutlined, AppstoreOutlined } from "@ant-design/icons";

import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import SearchBar, { useFilteredPrompts } from "@site/src/pages/_components/SearchBar";
import { NoResults } from "@site/src/pages/_components/SearchBar/NoResults";
import { AuthProvider } from "../_components/AuthContext";
import { PromptDetailModal } from "../_components/PromptDetailModal";

const UserBookmark = () => {
  const [activeTab, setActiveTab] = useState<"default" | "myfavor" | "myprompts">("myprompts");
  const { filteredCommus, filteredCards, isFiltered } = useFilteredPrompts(activeTab);
  const { token } = theme.useToken();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  const handleOpenModal = useCallback((data: any) => {
    setModalData(data);
    setModalOpen(true);
  }, []);

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
        children: !showNoResults && <UserFavorite filteredCommus={filteredCommus} filteredCards={filteredCards} isFiltered={isFiltered} onOpenModal={handleOpenModal} />,
      },
      {
        key: "myprompts",
        label: translate({ id: "common.myPrompts", message: "我的提示词" }),
        icon: <EditOutlined />,
        children: !showNoResults && <UserPrompts filteredCommus={filteredCommus} isFiltered={isFiltered} onOpenModal={handleOpenModal} />,
      },
    ],
    [filteredCommus, filteredCards, isFiltered, showNoResults, handleOpenModal]
  );

  return (
    <Layout title={translate({ id: "link.myCenter", message: "个人中心" })}>
      <div style={{ minHeight: "calc(100vh - 60px)", padding: "24px 0" }}>
        <div className="container">
          <Flex vertical gap="middle">
            {/* Consolidated Header */}
            <div
              style={{
                marginBottom: 0,
                padding: "16px 24px",
                background: token.colorBgContainer,
                borderRadius: token.borderRadiusLG,
                border: `1px solid ${token.colorBorderSecondary}`,
                boxShadow: token.boxShadowTertiary,
              }}>
              <Flex wrap="wrap" gap="middle" justify="space-between" align="center">
                <Space>
                  <Link to="/" style={{ display: "flex", alignItems: "center", color: token.colorTextSecondary }}>
                    <Button type="text" icon={<HomeOutlined />} style={{ paddingLeft: 0 }}>
                      <Translate id="link.home">返回首页</Translate>
                    </Button>
                  </Link>
                  <Link to="/user" style={{ display: "flex", alignItems: "center", color: token.colorTextSecondary }}>
                    <Button type="text" icon={<UserOutlined />}>
                      <Translate id="link.myAccount">我的账户</Translate>
                    </Button>
                  </Link>
                </Space>

                <Flex gap="small" align="center" wrap="wrap">
                  <Segmented
                    value={activeTab}
                    onChange={(val) => handleTabChange(val as string)}
                    options={[
                      {
                        label: translate({ id: "common.myPrompts", message: "我的提示词" }),
                        value: "myprompts",
                        icon: <EditOutlined />,
                      },
                      {
                        label: translate({ id: "common.favorites", message: "收藏" }),
                        value: "myfavor",
                        icon: <HeartOutlined />,
                      },
                    ]}
                  />
                  <div style={{ width: 250 }}>
                    <SearchBar />
                  </div>
                </Flex>
              </Flex>
            </div>

            {/* Content Area */}
            <div style={{ minHeight: 400 }}>
              {items.find((item) => item.key === activeTab)?.children}
              {showNoResults && <NoResults />}
            </div>
          </Flex>
        </div>
      </div>
      <PromptDetailModal open={modalOpen} onCancel={() => setModalOpen(false)} data={modalData} />
    </Layout>
  );
};

const UserCenterPage = () => (
  <AuthProvider>
    <UserBookmark />
  </AuthProvider>
);

export default UserCenterPage;
