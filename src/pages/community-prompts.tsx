import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import Link from "@docusaurus/Link";
import { getCommPrompts, voteOnUserPrompt, createFavorite, updateFavorite } from "@site/src/api";
import LoginComponent from "@site/src/pages/_components/user/login";
import ShareButtons from "@site/src/pages/_components/ShareButtons";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";
import Layout from "@theme/Layout";
import { Modal, Typography, Tooltip, message, Pagination, Dropdown, Space, Button, Input } from "antd";
import { UpOutlined, DownOutlined, HomeOutlined, CopyOutlined, HeartOutlined, LoginOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Text } = Typography;

const placeholderData = Array.from({ length: 12 }, (_, index) => ({
  id: `placeholder-${index}`,
  title: "Loading...",
  description:
    "You are an expert in scientific writing,  please use the rules and principles stated in the books Writing Science: How to Write Papers That Get Cited and Proposals That Get FundedYou are an expert in scientific writing,  please use the rules and principles stated in the books Writing Science: How to Write Papers That Get Cited and Proposals That Get FundedYou are an expert in scientific writing,  please use the rules and principles stated in the books Writing Science",
  remark: null,
  notes: null,
  owner: "Loading...",
  upvotes: 0,
  downvotes: 0,
}));
function CommunityPrompts() {
  const TITLE = "AiShort Community Prompts - Share and find interesting prompts";
  const DESCRIPTION = translate({
    id: "description.communityPrompts",
    message:
      "探索由 AiShort 用户分享的创新提示词集合，这些独特且有趣的提示词可以激发你在创作短视频、小说、游戏等内容时的灵感。投票支持你最爱的提示，将它们复制并与你的朋友分享。让 AiShort 帮助你打开创造力的大门，一起创作出色的作品吧。",
  });
  const { userAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [userprompts, setUserPrompts] = useState(placeholderData);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [Shareurl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const pageSize = 12;

  useEffect(() => {
    fetchData(currentPage, pageSize, sortField, sortOrder, searchTerm);
  }, [currentPage, sortField, sortOrder, searchTerm]);

  const fetchData = async (currentPage, pageSize, sortField, sortOrder, searchTerm) => {
    try {
      const result = await getCommPrompts(currentPage, pageSize, sortField, sortOrder, searchTerm);
      console.log("Loaded data:", result);
      if (result && result[0].length > 0) {
        setUserPrompts(result[0]);
        setTotal(result[1].data.meta.pagination.total);
        const fetchedTotal = result[1].data.meta.pagination.total;
        setTotal(Math.min(fetchedTotal, 1000));
      } else {
        console.log("No data returned from the server");
      }
    } catch (error) {
      console.error("Failed to fetch community prompts:", error);
    }
  };

  const onSearch = (value) => {
    if (!userAuth) {
      setOpen(true);
      message.warning("Please log in to search.");
      return;
    }
    setSearchTerm(value);
    setCurrentPage(1); // 重置页数到第一页
  };
  const [votedUpPromptIds, setVotedUpPromptIds] = useState<number[]>([]);
  const [votedDownPromptIds, setVotedDownPromptIds] = useState<number[]>([]);
  const vote = async (promptId, action) => {
    try {
      await voteOnUserPrompt(promptId, action);
      message.success(`Successfully ${action}d!`);
      const updateVotedIds = action === "upvote" ? setVotedUpPromptIds : setVotedDownPromptIds;
      updateVotedIds((prevIds) => [...prevIds, promptId]);
    } catch (err) {
      message.error(`Error: ${err}`);
    }
  };
  const bookmark = async (promptId) => {
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
          message.success("Added to favorites successfully!");
        }
      }
      await updateFavorite(favoriteId, userLoves, true);
    } catch (err) {
      message.error(`Error: ${err}`);
    }
  };

  const handleCopyClick = (index) => {
    const UserPrompt = userprompts[index];
    if (UserPrompt) {
      copy(UserPrompt.description);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    }
  };
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleFieldClick = (e) => {
    setCurrentPage(1);
    setSortField(e.key);
  };

  const handleOrderClick = (e) => {
    setCurrentPage(1);
    setSortOrder(e.key);
  };

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

  // 截取字符串的函数
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg" style={{ maxWidth: "1200px", margin: "auto" }}>
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
          {userprompts.map((UserPrompt, index) => (
            <li key={UserPrompt.id} className="card shadow--md">
              <div
                className={clsx("card__body")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}>
                <div>
                  <div className={clsx(styles.showcaseCardHeader)}>
                    <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`}>
                      <span className={styles.showcaseCardLink} style={{ color: "var(--ifm-color-primary)" }}>
                        {UserPrompt.title}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#999",
                          marginLeft: "10px",
                        }}>
                        @{UserPrompt.owner}
                      </span>
                    </div>
                  </div>
                  {UserPrompt.remark && <p className={styles.showcaseCardBody}>👉 {UserPrompt.remark}</p>}
                  <p className={styles.showcaseCardBody}>
                    {UserPrompt.notes ? (
                      <Tooltip placement="bottom" title={truncate(UserPrompt.notes, 300)} overlayStyle={{ maxWidth: 450 }}>
                        {UserPrompt.description}
                      </Tooltip>
                    ) : (
                      UserPrompt.description
                    )}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button.Group>
                    <Tooltip
                      title={translate({
                        id: "theme.CodeBlock.copy",
                        message: "复制",
                      })}>
                      <Button type="default" onClick={() => handleCopyClick(index)}>
                        <CopyOutlined />
                        {copiedIndex === index && <Translate id="theme.CodeBlock.copied">已复制</Translate>}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={translate({
                        message: "收藏",
                      })}>
                      <Button
                        type="default"
                        onClick={() => {
                          if (!userAuth) {
                            message.error("Please log in to vote and bookmark.");
                            return;
                          }
                          vote(UserPrompt.id, "upvote");
                          bookmark(UserPrompt.id);
                        }}>
                        <HeartOutlined />
                      </Button>
                    </Tooltip>
                  </Button.Group>
                  <Button.Group>
                    <Tooltip
                      title={translate({
                        id: "upvote",
                        message: "赞",
                      })}>
                      <Button
                        type="default"
                        onClick={() => {
                          if (!userAuth) {
                            message.error("Please log in to vote and bookmark.");
                            return;
                          }
                          vote(UserPrompt.id, "upvote");
                        }}>
                        <UpOutlined />
                        {votedUpPromptIds.includes(UserPrompt.id) ? (UserPrompt.upvotes || 0) + 1 : UserPrompt.upvotes || 0}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={translate({
                        id: "downvote",
                        message: "踩",
                      })}>
                      <Button
                        type="default"
                        onClick={() => {
                          if (!userAuth) {
                            message.error("Please log in to vote and bookmark.");
                            return;
                          }
                          vote(UserPrompt.id, "downvote");
                        }}>
                        <DownOutlined />
                        {votedDownPromptIds.includes(UserPrompt.id) ? (UserPrompt.downvotes || 0) + 1 : UserPrompt.downvotes || 0}
                      </Button>
                    </Tooltip>
                  </Button.Group>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination current={currentPage} total={total} showQuickJumper showSizeChanger={false} onChange={onChangePage} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}>
          <Text type="secondary" style={{ color: "var(--ifm-color-secondary)", fontSize: "10px" }}>
            {translate({
              message:
                "本页面展示的提示词均由网友分享和上传，我们无法保证内容的准确性、质量或完整性，同时也不对因内容引发的任何法律责任承担责任。如果发现有侵权或者其他问题，可以联系我们进行处理。我们将在收到通知后尽快处理。",
            })}
          </Text>
        </div>

        <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
          <LoginComponent />
        </Modal>
        <ShareButtons shareUrl={Shareurl} title={TITLE} popOver={false} />
      </main>
    </Layout>
  );
}

export default function WrappedCommunityPrompts() {
  return (
    <AuthProvider>
      <CommunityPrompts />
    </AuthProvider>
  );
}
