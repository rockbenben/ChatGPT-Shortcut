import React, { useContext, useEffect, useState, useCallback, Suspense } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import styles from "@site/src/pages/styles.module.css";
import Link from "@docusaurus/Link";
import { getCommPrompts, voteOnUserPrompt, createFavorite, updateFavorite } from "@site/src/api";
import LoginComponent from "@site/src/pages/_components/user/login";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";
import Layout from "@theme/Layout";
import { Modal, Typography, Tooltip, Pagination, Dropdown, Space, Button, Input, Skeleton, App } from "antd";
import { UpOutlined, DownOutlined, HomeOutlined, CopyOutlined, CheckOutlined, StarOutlined, StarFilled, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { COMMU_TITLE, COMMU_DESCRIPTION } from "@site/src/data/constants";
import { CommuPagePrompt, styles as cardStyles } from "@site/src/pages/_components/ShowcaseCard/unifyPrompt";

const ShareButtons = React.lazy(() => import("@site/src/pages/_components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/pages/_components/AdComponent"));

const { Search } = Input;
const { Text } = Typography;

const pageSize = 12;
const SkeletonCard = React.memo(() => (
  <li className="card shadow--md">
    <div
      className={clsx("card__body")}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        minHeight: "300px",
      }}>
      <div>
        <Skeleton.Input active style={{ width: "75%", height: "20px", marginBottom: "8px" }} />
        <Skeleton.Input active style={{ width: "30%", height: "14px", marginBottom: "12px" }} />
        <Skeleton active title={false} paragraph={{ rows: 3, width: ["100%", "90%", "70%"] }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="small" />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="small" />
        </div>
      </div>
    </div>
  </li>
));

// 性能优化的骨架屏列表 - 使用预生成的静态数组
const SkeletonList = React.memo(({ count = pageSize }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
});

// 预生成常用数量的骨架屏，避免运行时计算
const SKELETON_12 = Array.from({ length: 12 }, (_, index) => <SkeletonCard key={index} />);

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
    <li className="card shadow--md">
      <div className={clsx("card__body")} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <div>
          <div className={clsx(cardStyles.showcaseCardHeader)}>
            <div className={`${cardStyles.showcaseCardTitle} ${cardStyles.shortEllipsis}`}>
              <span className={cardStyles.showcaseCardLink}>{commuPrompt.title}</span>
            </div>
            <Space.Compact>
              <Tooltip title={<Translate id="theme.CodeBlock.copy">复制</Translate>}>
                <Button
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => {
                    copyText(commuPrompt.description);
                  }}
                />
              </Tooltip>
              <Tooltip title={isBookmarked ? <Translate>点击移除收藏</Translate> : translate({ message: "收藏" })}>
                <Button
                  icon={isBookmarked ? <StarFilled style={{ color: "#ffc107" }} /> : <StarOutlined />}
                  onClick={() => {
                    if (!userAuth) {
                      messageApi.warning("Please log in to bookmark.");
                      return;
                    }
                    onBookmark(commuPrompt.id);
                  }}
                />
              </Tooltip>
            </Space.Compact>
          </div>
          <CommuPagePrompt commuPrompt={commuPrompt} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ifm-color-emphasis-600)", fontSize: "0.9rem" }}>
            <UserOutlined />
            <span>{commuPrompt.owner}</span>
          </div>
          <Space.Compact>
            <Tooltip title={translate({ id: "upvote", message: "赞" })}>
              <Button
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
        </div>
      </div>
    </li>
  );
});

const CommunityPrompts = () => {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
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
          if (searchTerm) {
            messageApi.info("No results found for your search.");
          }
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

  const onSearch = useCallback(
    (value) => {
      if (!userAuth) {
        setOpen(true);
        messageApi.warning("Please log in to search.");
        return;
      }
      setSearchTerm(value);
      setCurrentPage(1);
    },
    [userAuth, messageApi]
  );

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
      try {
        let userLoves;
        let favoriteId;

        if (!userAuth.data.favorites) {
          const createFavoriteResponse = await createFavorite([promptId], true);
          userLoves = [promptId];
          favoriteId = createFavoriteResponse.data.id;
          messageApi.success("Added to favorites successfully!");
        } else {
          userLoves = [...(userAuth.data.favorites.commLoves || [])];
          favoriteId = userAuth.data.favorites.id;

          if (userLoves.includes(promptId)) {
            userLoves = userLoves.filter((id) => id !== promptId);
            messageApi.success("Removed from favorites successfully!");
          } else {
            userLoves.push(promptId);
            messageApi.success("Added to favorites successfully!");
          }
        }
        await updateFavorite(favoriteId, userLoves, true);
        refreshUserAuth();
      } catch (err) {
        messageApi.open({
          type: "error",
          content: `Failed to update favorites. Error: ${err}`,
        });
      }
    },
    [userAuth, messageApi, refreshUserAuth]
  );

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleFieldClick = useCallback((e) => {
    setCurrentPage(1);
    setSortField(e.key);
  }, []);

  const handleOrderClick = useCallback((e) => {
    setCurrentPage(1);
    setSortOrder(e.key);
  }, []);

  const fieldMenuProps = {
    items: [
      {
        label: translate({ id: "field.id", message: "发布时间" }),
        key: "id",
      },
      {
        label: translate({ id: "field.upvoteDifference", message: "投票支持" }),
        key: "upvoteDifference",
      },
    ],
    onClick: handleFieldClick,
  };

  const orderMenuProps = {
    items: [
      {
        label: translate({ id: "order.ascending", message: "升序" }),
        key: "asc",
      },
      {
        label: translate({ id: "order.descending", message: "降序" }),
        key: "desc",
      },
    ],
    onClick: handleOrderClick,
  };

  const isDarkMode = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <Layout title={COMMU_TITLE} description={COMMU_DESCRIPTION}>
      <main className="margin-vert--md">
        <section className="margin-top--sm margin-bottom--sm">
          <div className="container padding-vert--md">
            <Space wrap style={{ marginBottom: "20px" }}>
              <Link to="/" className="interLink">
                <HomeOutlined /> <Translate id="link.home">返回首页</Translate>
              </Link>
              {userAuth ? (
                <Link to="/user/favorite" className="interLink">
                  <StarOutlined /> <Translate id="link.myfavorite">我的收藏</Translate>
                </Link>
              ) : (
                <Button onClick={() => setOpen(true)}>
                  <LoginOutlined /> <Translate id="button.login">登录</Translate>
                </Button>
              )}
              <Dropdown.Button icon={<DownOutlined />} menu={fieldMenuProps}>
                {sortField === "id" ? <Translate id="field.id">发布时间</Translate> : <Translate id="field.upvoteDifference">支持度</Translate>}
              </Dropdown.Button>
              <Dropdown.Button icon={<DownOutlined />} menu={orderMenuProps}>
                {sortOrder === "asc" ? <Translate id="order.ascending">升序</Translate> : <Translate id="order.descending">降序</Translate>}
              </Dropdown.Button>
              <Search placeholder="Search" onSearch={onSearch} style={{ width: 200 }} allowClear />
            </Space>
            <ul className={clsx("clean-list", styles.showcaseList)}>
              {loading ? (
                // 使用预生成的骨架屏，性能最优
                pageSize === 12 ? (
                  SKELETON_12
                ) : (
                  <SkeletonList count={pageSize} />
                )
              ) : (
                userprompts.map((commuPrompt) => (
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
                ))
              )}
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination current={currentPage} pageSize={pageSize} total={total} showQuickJumper showSizeChanger={false} onChange={onChangePage} />
            </div>
            <Suspense fallback={null}>
              <AdComponent type="transverse" />
            </Suspense>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16, marginBottom: -24 }}>
              <Text style={{ color: "var(--ifm-color-secondary-darker)", fontSize: "10px" }}>
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
