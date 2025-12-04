import React, { useContext, useEffect, useState, useCallback, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import styles from "@site/src/pages/styles.module.css";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@site/src/pages/_components/SearchBar";
import { NoResults } from "@site/src/pages/_components/SearchBar/NoResults";
import { getCommPrompts, voteOnUserPrompt } from "@site/src/api";
import LoginComponent from "@site/src/pages/_components/user/login";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";
import Layout from "@theme/Layout";
import { Modal, Typography, Tooltip, Pagination, Space, Button, App, Card, Flex, Segmented, FloatButton } from "antd";
import { UpOutlined, DownOutlined, HomeOutlined, CopyOutlined, CheckOutlined, StarOutlined, StarFilled, LoginOutlined, UserOutlined, FireOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { COMMU_TITLE, COMMU_DESCRIPTION } from "@site/src/data/constants";
import PromptCard from "@site/src/pages/_components/PromptCard";
import { PromptDetailModal } from "@site/src/pages/_components/PromptDetailModal";

const ShareButtons = React.lazy(() => import("@site/src/pages/_components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/pages/_components/AdComponent"));

const { Text } = Typography;

const pageSize = 12;

// 性能优化的骨架屏列表 - 使用预生成的静态数组
const SkeletonList = React.memo(({ count = pageSize }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Card key={index} className={styles.promptCard} loading />
      ))}
    </>
  );
});

// 预生成常用数量的骨架屏，避免运行时计算
const SKELETON_12 = Array.from({ length: 12 }, (_, index) => <Card key={index} className={styles.promptCard} loading />);

interface PromptCardProps {
  commuPrompt: {
    id: number;
    title: string;
    owner: string;
    remark?: string;
    notes?: string;
    description: string;
    upvotes?: number;
    downvotes?: number;
  };
}

const CommunityPrompts = () => {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userprompts, setUserPrompts] = useState<PromptCardProps["commuPrompt"][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [Shareurl, setShareUrl] = useState("");
  const [votedUpPromptIds, setVotedUpPromptIds] = useState<number[]>([]);
  const [votedDownPromptIds, setVotedDownPromptIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name !== searchTerm) {
      setSearchTerm(name || "");
      setCurrentPage(1);
    }
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage, pageSize, sortField, sortOrder, searchTerm);
  }, [currentPage, sortField, sortOrder, searchTerm]);

  const fetchData = useCallback(
    async (currentPage, pageSize, sortField, sortOrder, searchTerm) => {
      try {
        const result = await getCommPrompts(currentPage, pageSize, sortField, sortOrder, searchTerm);
        if (result && result[0].length > 0) {
          setUserPrompts(result[0]);
          setTotal(result[1].data.meta.pagination.total);
        } else if (result && result[0].length === 0) {
          setUserPrompts([]);
          setTotal(0);
        }
      } catch (error) {
        console.error("Failed to fetch community prompts:", error);
        messageApi.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [messageApi]
  );

  const handleBeforeSearch = useCallback(() => {
    if (!userAuth) {
      setOpen(true);
      messageApi.warning("Please log in to search.");
      return false;
    }
    return true;
  }, [userAuth, messageApi]);

  const vote = useCallback(
    async (promptId, action) => {
      // 防重复点击优化
      if (action === "upvote" && votedUpPromptIds.includes(promptId)) return;
      if (action === "downvote" && votedDownPromptIds.includes(promptId)) return;

      try {
        await voteOnUserPrompt(promptId, action);
        messageApi.success(`Successfully ${action}d!`);
        const updateVotedIds = action === "upvote" ? setVotedUpPromptIds : setVotedDownPromptIds;
        updateVotedIds((prevIds) => [...prevIds, promptId]);
      } catch (err) {
        messageApi.error(`Failed to ${action}. Error: ${err}`);
      }
    },
    [votedUpPromptIds, votedDownPromptIds, messageApi]
  );

  const bookmark = useCallback(
    async (promptId) => {
      if (userAuth?.data?.favorites?.commLoves?.includes(promptId)) {
        confirmRemoveFavorite(promptId, true);
      } else {
        addFavorite(promptId, true);
      }
    },
    [userAuth, confirmRemoveFavorite, addFavorite]
  );

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const onOpenModal = useCallback((data: any) => {
    setModalData(data);
    setModalOpen(true);
  }, []);

  return (
    <Layout title={COMMU_TITLE} description={COMMU_DESCRIPTION}>
      <main className="margin-vert--md">
        <section className="margin-top--sm margin-bottom--sm">
          <div className="container padding-vert--md">
            <Flex wrap="wrap" gap="middle" justify="space-between" align="center" style={{ marginBottom: 16 }}>
              <Space>
                <Link to="/" className="interLink">
                  <Button icon={<HomeOutlined />}>
                    <Translate id="link.home">返回首页</Translate>
                  </Button>
                </Link>
                {userAuth ? (
                  <Link to="/user/favorite" className="interLink">
                    <Button icon={<StarOutlined />}>
                      <Translate id="link.myFavorites">我的收藏</Translate>
                    </Button>
                  </Link>
                ) : (
                  <Button icon={<LoginOutlined />} onClick={() => setOpen(true)}>
                    <Translate id="button.login">登录</Translate>
                  </Button>
                )}
              </Space>

              <Flex gap="small" align="center" wrap="wrap">
                <Segmented
                  options={[
                    { label: translate({ id: "field.id", message: "发布时间" }), value: "id", icon: <ClockCircleOutlined /> },
                    { label: translate({ id: "field.upvoteDifference", message: "支持度" }), value: "upvoteDifference", icon: <FireOutlined /> },
                  ]}
                  value={sortField}
                  onChange={(value) => {
                    setSortField(value as string);
                    setCurrentPage(1);
                  }}
                />
                <Segmented
                  options={[
                    { label: translate({ id: "order.descending", message: "降序" }), value: "desc", icon: <DownOutlined /> },
                    { label: translate({ id: "order.ascending", message: "升序" }), value: "asc", icon: <UpOutlined /> },
                  ]}
                  value={sortOrder}
                  onChange={(value) => {
                    setSortOrder(value as string);
                    setCurrentPage(1);
                  }}
                />
                <SearchBar beforeSearch={handleBeforeSearch} />
              </Flex>
            </Flex>

            {loading ? (
              <div className={styles.showcaseList}>{pageSize === 12 ? SKELETON_12 : <SkeletonList count={pageSize} />}</div>
            ) : userprompts.length === 0 ? (
              <Flex justify="center" align="center" style={{ minHeight: 300, width: "100%" }}>
                <NoResults />
              </Flex>
            ) : (
              <div className={styles.showcaseList}>
                {userprompts.map((commuPrompt) => {
                  const isBookmarked = userAuth?.data?.favorites?.commLoves?.includes(commuPrompt.id);
                  const optimisticUpvotes = votedUpPromptIds.includes(commuPrompt.id) ? (commuPrompt.upvotes || 0) + 1 : commuPrompt.upvotes || 0;
                  const optimisticDownvotes = votedDownPromptIds.includes(commuPrompt.id) ? (commuPrompt.downvotes || 0) + 1 : commuPrompt.downvotes || 0;

                  const modifiedData = {
                    ...commuPrompt,
                    upvotes: optimisticUpvotes,
                    downvotes: optimisticDownvotes,
                  };

                  return (
                    <PromptCard
                      key={commuPrompt.id}
                      type="community"
                      data={modifiedData}
                      onVote={vote}
                      isFavorite={isBookmarked}
                      onToggleFavorite={(id) => bookmark(Number(id))}
                      onOpenModal={onOpenModal}
                    />
                  );
                })}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
              <Pagination current={currentPage} pageSize={pageSize} total={total} showQuickJumper showSizeChanger={false} onChange={onChangePage} />
            </div>

            <Suspense fallback={null}>
              <AdComponent type="transverse" />
            </Suspense>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 16, marginBottom: -24 }}>
              <Text type="secondary" style={{ fontSize: "12px", textAlign: "center", maxWidth: 800 }}>
                {translate({
                  id: "info.communityPrompts",
                  message: "本页面提示词由网友分享上传。我们不对内容的准确性、质量或完整性做出保证，也不承担因内容引发的法律责任。如发现侵权或其他问题，请联系我们处理。",
                })}
              </Text>
            </div>

            <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
              <LoginComponent />
            </Modal>
            <PromptDetailModal open={modalOpen} onCancel={() => setModalOpen(false)} data={modalData} />
            <Suspense fallback={null}>
              <ShareButtons shareUrl={Shareurl} title={COMMU_TITLE} popOver={false} />
            </Suspense>
            <FloatButton.BackTop />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default function WrappedCommunityPrompts() {
  return (
    <AuthProvider>
      <CommunityPrompts />
    </AuthProvider>
  );
}
