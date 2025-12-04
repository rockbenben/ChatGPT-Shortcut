import React, { useContext, useEffect, useState, useCallback, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import styles from "@site/src/pages/styles.module.css";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@site/src/pages/_components/SearchBar";
import { NoResults } from "@site/src/pages/_components/SearchBar/NoResults";
import { getCommPrompts, voteOnUserPrompt, createFavorite, updateFavorite } from "@site/src/api";
import LoginComponent from "@site/src/pages/_components/user/login";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";
import Layout from "@theme/Layout";
import { Modal, Typography, Tooltip, Pagination, Space, Button, App, Card, Flex, Segmented, FloatButton } from "antd";
import { UpOutlined, DownOutlined, HomeOutlined, CopyOutlined, CheckOutlined, StarOutlined, StarFilled, LoginOutlined, UserOutlined, FireOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { COMMU_TITLE, COMMU_DESCRIPTION } from "@site/src/data/constants";
import { CommuPagePrompt } from "@site/src/pages/_components/ShowcaseCard/unifyPrompt";

const ShareButtons = React.lazy(() => import("@site/src/pages/_components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/pages/_components/AdComponent"));

const { Text, Title } = Typography;

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
  onVote: (promptId: number, action: string) => void;
  onBookmark: (promptId: number) => void;
  votedUpPromptIds: number[];
  votedDownPromptIds: number[];
  userAuth: any;
  messageApi: any;
}

const PromptCard: React.FC<PromptCardProps> = React.memo(({ commuPrompt, onVote, onBookmark, votedUpPromptIds, votedDownPromptIds, userAuth, messageApi }) => {
  const { copied, copyText } = useCopyToClipboard();
  const isBookmarked = userAuth?.data?.favorites?.commLoves?.includes(commuPrompt.id);

  return (
    <Card hoverable className={styles.promptCard}>
      <Flex vertical justify="space-between" style={{ height: "100%" }}>
        <Flex vertical gap="small" style={{ flex: 1 }}>
          <Flex justify="space-between" align="start">
            <Title level={5} ellipsis={{ rows: 1 }} style={{ margin: 0, flex: 1, paddingRight: 8 }}>
              {commuPrompt.title}
            </Title>
            <Space size="small">
              <Tooltip title={<Translate id="theme.CodeBlock.copy">复制</Translate>}>
                <Button
                  type="text"
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => {
                    copyText(commuPrompt.description);
                  }}
                />
              </Tooltip>
              <Tooltip title={isBookmarked ? <Translate>点击移除收藏</Translate> : translate({ message: "收藏" })}>
                <Button
                  type="text"
                  icon={isBookmarked ? <StarFilled style={{ color: "#faad14" }} /> : <StarOutlined />}
                  onClick={() => {
                    if (!userAuth) {
                      messageApi.warning("Please log in to bookmark.");
                      return;
                    }
                    onBookmark(commuPrompt.id);
                  }}
                />
              </Tooltip>
            </Space>
          </Flex>

          <CommuPagePrompt commuPrompt={commuPrompt} />
        </Flex>

        <Flex justify="space-between" align="center" style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--ifm-color-emphasis-200)" }}>
          <Space size={4} style={{ color: "var(--ifm-color-emphasis-600)", fontSize: "0.85rem" }}>
            <UserOutlined />
            <Text type="secondary" style={{ maxWidth: 80 }} ellipsis>
              {commuPrompt.owner}
            </Text>
          </Space>
          <Space.Compact size="small">
            <Tooltip title={translate({ id: "upvote", message: "赞" })}>
              <Button
                type={votedUpPromptIds.includes(commuPrompt.id) ? "primary" : "default"}
                ghost={votedUpPromptIds.includes(commuPrompt.id)}
                onClick={() => {
                  if (!userAuth) {
                    messageApi.warning("Please log in to vote.");
                    return;
                  }
                  onVote(commuPrompt.id, "upvote");
                }}>
                <UpOutlined />
                {votedUpPromptIds.includes(commuPrompt.id) ? (commuPrompt.upvotes || 0) + 1 : commuPrompt.upvotes || 0}
              </Button>
            </Tooltip>
            <Tooltip title={translate({ id: "downvote", message: "踩" })}>
              <Button
                onClick={() => {
                  if (!userAuth) {
                    messageApi.warning("Please log in to vote.");
                    return;
                  }
                  onVote(commuPrompt.id, "downvote");
                }}>
                <DownOutlined />
                {votedDownPromptIds.includes(commuPrompt.id) ? (commuPrompt.downvotes || 0) + 1 : commuPrompt.downvotes || 0}
              </Button>
            </Tooltip>
          </Space.Compact>
        </Flex>
      </Flex>
    </Card>
  );
});

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
                      <Translate id="link.myfavorite">我的收藏</Translate>
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
                {userprompts.map((commuPrompt) => (
                  <PromptCard
                    key={commuPrompt.id}
                    commuPrompt={commuPrompt}
                    onVote={vote}
                    onBookmark={bookmark}
                    votedUpPromptIds={votedUpPromptIds}
                    votedDownPromptIds={votedDownPromptIds}
                    userAuth={userAuth}
                    messageApi={messageApi}
                  />
                ))}
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
                  message:
                    "本页面展示的提示词均由网友分享和上传，我们无法保证内容的准确性、质量或完整性，同时也不对因内容引发的任何法律责任承担责任。如果发现有侵权或者其他问题，可以联系我们进行处理。我们将在收到通知后尽快处理。",
                })}
              </Text>
            </div>

            <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
              <LoginComponent />
            </Modal>
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
