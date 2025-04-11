import React, { useContext, useEffect, useState, useCallback, Suspense } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import Link from "@docusaurus/Link";
import { getCommPrompts, voteOnUserPrompt, createFavorite, updateFavorite } from "@site/src/api";
import LoginComponent from "@site/src/pages/_components/user/login";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";
import Layout from "@theme/Layout";
import { Modal, Typography, Tooltip, message, Pagination, Dropdown, Space, Button, Input, ConfigProvider, theme, Skeleton } from "antd";
import { UpOutlined, DownOutlined, HomeOutlined, CopyOutlined, HeartOutlined, LoginOutlined } from "@ant-design/icons";
import themeConfig from "@site/src/pages/_components/themeConfig";
import { COMMU_TITLE, COMMU_DESCRIPTION } from "@site/src/data/constants";
import { MAX_LENGTH, truncate } from "@site/src/utils/formatters";

const ShareButtons = React.lazy(() => import("@site/src/pages/_components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/pages/_components/AdComponent"));

const { Search } = Input;
const { Text } = Typography;

const pageSize = 12;

const SKELETON_ITEMS = Array.from({ length: pageSize }, (_, index) => (
  <li key={`skeleton-${index}`} className="card shadow--md">
    <div className={clsx("card__body")} style={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div className={styles.showcaseCardHeader}>
          <Skeleton.Input active style={{ width: "60%" }} />
          <Skeleton.Input active style={{ width: "20%", marginLeft: "10px" }} />
        </div>
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Space.Compact>
          <Skeleton.Button active />
          <Skeleton.Button active />
        </Space.Compact>
        <Space.Compact>
          <Skeleton.Button active />
          <Skeleton.Button active />
        </Space.Compact>
      </div>
    </div>
  </li>
));

interface PromptCardProps {
  prompt: {
    id: number;
    title: string;
    owner: string;
    remark?: string;
    notes?: string;
    description: string;
    upvotes?: number;
    downvotes?: number;
  };
  onCopy: (index: number) => void;
  copiedIndex: number | null;
  index: number;
  onVote: (promptId: number, action: string) => void;
  onBookmark: (promptId: number) => void;
  votedUpPromptIds: number[];
  votedDownPromptIds: number[];
  userAuth: any;
  messageApi: any;
}

const PromptCard: React.FC<PromptCardProps> = React.memo(({ prompt, onCopy, copiedIndex, index, onVote, onBookmark, votedUpPromptIds, votedDownPromptIds, userAuth, messageApi }) => {
  return (
    <li className="card shadow--md">
      <div className={clsx("card__body")} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <div>
          <div className={clsx(styles.showcaseCardHeader)}>
            <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`}>
              <span className={styles.showcaseCardLink} style={{ color: "var(--ifm-color-primary)" }}>
                {prompt.title}
              </span>
              <span style={{ fontSize: "12px", color: "#999", marginLeft: "10px" }}>@{prompt.owner}</span>
            </div>
          </div>
          {prompt.remark && <p className={styles.showcaseCardBody}>👉 {prompt.remark}</p>}
          <p className={styles.showcaseCardBody}>
            {prompt.notes ? (
              <Tooltip placement="right" title={truncate(prompt.notes, 300)} style={{ maxWidth: 450 }}>
                {prompt.description}
              </Tooltip>
            ) : (
              prompt.description
            )}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Space.Compact>
            <Tooltip title={translate({ id: "theme.CodeBlock.copy", message: "复制" })}>
              <Button type="default" onClick={() => onCopy(index)}>
                <CopyOutlined />
                {copiedIndex === index && <Translate id="theme.CodeBlock.copied">已复制</Translate>}
              </Button>
            </Tooltip>
            <Tooltip title={translate({ message: "收藏" })}>
              <Button
                type="default"
                onClick={() => {
                  if (!userAuth) {
                    messageApi.warning("Please log in to bookmark.");
                    return;
                  }
                  onVote(prompt.id, "upvote");
                  onBookmark(prompt.id);
                }}>
                <HeartOutlined />
              </Button>
            </Tooltip>
          </Space.Compact>
          <Space.Compact>
            <Tooltip title={translate({ id: "upvote", message: "赞" })}>
              <Button
                type="default"
                onClick={() => {
                  if (!userAuth) {
                    messageApi.warning("Please log in to vote.");
                    return;
                  }
                  onVote(prompt.id, "upvote");
                }}>
                <UpOutlined />
                {votedUpPromptIds.includes(prompt.id) ? (prompt.upvotes || 0) + 1 : prompt.upvotes || 0}
              </Button>
            </Tooltip>
            <Tooltip title={translate({ id: "downvote", message: "踩" })}>
              <Button
                type="default"
                onClick={() => {
                  if (!userAuth) {
                    messageApi.warning("Please log in to vote.");
                    return;
                  }
                  onVote(prompt.id, "downvote");
                }}>
                <DownOutlined />
                {votedDownPromptIds.includes(prompt.id) ? (prompt.downvotes || 0) + 1 : prompt.downvotes || 0}
              </Button>
            </Tooltip>
          </Space.Compact>
        </div>
      </div>
    </li>
  );
});

const CommunityPrompts = () => {
  const { userAuth } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userprompts, setUserPrompts] = useState<PromptCardProps["prompt"][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [copiedIndex, setCopiedIndex] = useState(null);
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

  const fetchData = useCallback(async (currentPage, pageSize, sortField, sortOrder, searchTerm) => {
    try {
      const result = await getCommPrompts(currentPage, pageSize, sortField, sortOrder, searchTerm);
      if (result && result[0].length > 0) {
        setUserPrompts(result[0]);
        setTotal(result[1].data.meta.pagination.total);
      } else if (result && result[0].length === 0) {
        messageApi.warning("No data found.");
        setUserPrompts([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("Failed to fetch community prompts:", error);
      messageApi.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

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
    [userAuth]
  );

  const vote = useCallback(async (promptId, action) => {
    try {
      await voteOnUserPrompt(promptId, action);
      messageApi.success(`Successfully ${action}d!`);
      const updateVotedIds = action === "upvote" ? setVotedUpPromptIds : setVotedDownPromptIds;
      updateVotedIds((prevIds) => [...prevIds, promptId]);
    } catch (err) {
      messageApi.error(`Failed to ${action}. Error: ${err}`);
    }
  }, []);

  const bookmark = useCallback(
    async (promptId) => {
      try {
        let userLoves;
        let favoriteId;

        if (!userAuth.data.favorites) {
          const createFavoriteResponse = await createFavorite([promptId], true);
          userLoves = [promptId];
          favoriteId = createFavoriteResponse.data.id;
        } else {
          userLoves = userAuth.data.favorites.commLoves || [];
          favoriteId = userAuth.data.favorites.id;

          if (!userLoves.includes(promptId)) {
            userLoves.push(promptId);
            messageApi.open({
              type: "success",
              content: "Added to favorites successfully!",
            });
          }
        }
        await updateFavorite(favoriteId, userLoves, true);
      } catch (err) {
        messageApi.open({
          type: "error",
          content: `Failed to add to favorites. Error: ${err}`,
        });
      }
    },
    [userAuth]
  );

  const handleCopyClick = useCallback(
    (index) => {
      const UserPrompt = userprompts[index];
      if (UserPrompt) {
        copy(UserPrompt.description);
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      }
    },
    [userprompts]
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
        <ConfigProvider
          theme={{
            ...themeConfig,
            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}>
          {contextHolder}
          <section className="margin-top--sm margin-bottom--sm">
            <div className="container padding-vert--md">
              <Space wrap style={{ marginBottom: "20px" }}>
                <Link to="/">
                  <HomeOutlined /> <Translate id="link.home">返回首页</Translate>
                </Link>
                {userAuth ? (
                  <Link to="/user/favorite">
                    <HeartOutlined /> <Translate id="link.myfavorite">我的收藏</Translate>
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
              <ul className="clean-list showcaseList_Cwj2">
                {loading
                  ? SKELETON_ITEMS
                  : userprompts.map((prompt, index) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        index={index}
                        copiedIndex={copiedIndex}
                        onCopy={handleCopyClick}
                        onVote={vote}
                        onBookmark={bookmark}
                        votedUpPromptIds={votedUpPromptIds}
                        votedDownPromptIds={votedDownPromptIds}
                        userAuth={userAuth}
                        messageApi={messageApi}
                      />
                    ))}
              </ul>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination current={currentPage} pageSize={pageSize} total={total} showQuickJumper showSizeChanger={false} onChange={onChangePage} />
              </div>
              <Suspense fallback={null}>
                <AdComponent type="transverse" />
              </Suspense>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Text type="secondary" style={{ color: "var(--ifm-color-secondary)", fontSize: "10px" }}>
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
        </ConfigProvider>
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
