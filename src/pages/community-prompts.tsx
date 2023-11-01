import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import Link from "@docusaurus/Link";
import {
  getCommPrompts,
  voteOnUserPrompt,
  createFavorite,
  updateFavorite,
} from "@site/src/api";
import LoginComponent from "@site/src/pages/_components/user/login";
import ShareButtons from "@site/src/pages/_components/ShareButtons";
import {
  AuthContext,
  AuthProvider,
} from "@site/src/pages/_components/AuthContext";
import Layout from "@theme/Layout";
import {
  Modal,
  Typography,
  Tooltip,
  message,
  Pagination,
  Dropdown,
  Space,
  Button,
  Input,
} from "antd";
import {
  UpOutlined,
  DownOutlined,
  HomeOutlined,
  CopyOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Text } = Typography;

function CommunityPrompts() {
  const TITLE =
    "AiShort Community Prompts - Share and find interesting prompts";
  const DESCRIPTION = translate({
    id: "description.communityPrompts",
    message:
      "探索由 AiShort 用户分享的创新提示词集合，这些独特且有趣的提示词可以激发你在创作短视频、小说、游戏等内容时的灵感。投票支持你最爱的提示，将它们复制并与你的朋友分享。让 AiShort 帮助你打开创造力的大门，一起创作出色的作品吧。",
  });
  const { userAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [userprompts, setUserPrompts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [copiedIndex, setCopiedIndex] = useState(null);
  // 新增一个用于保存搜索关键字的 state
  const [searchTerm, setSearchTerm] = useState("");
  const [Shareurl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const pageSize = 12;

  useEffect(() => {
    fetchData(currentPage, pageSize, sortField, sortOrder, searchTerm);
  }, [currentPage, sortField, sortOrder, searchTerm]); // 添加 searchTerm 到依赖数组中

  const fetchData = async (
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    searchTerm
  ) => {
    const response = await getCommPrompts(
      currentPage,
      pageSize,
      sortField,
      sortOrder,
      searchTerm
    );
    setUserPrompts(response.data.data);
    setTotal(response.data.meta.pagination.total);
  };

  const onSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // 重置页数到第一页
    fetchData(currentPage, pageSize, sortField, sortOrder, value);
  };
  const [votedUpPromptIds, setVotedUpPromptIds] = useState([]);
  const [votedDownPromptIds, setVotedDownPromptIds] = useState([]);
  const vote = async (promptId, action) => {
    try {
      const response = await voteOnUserPrompt(promptId, action);
      console.log(response);
      if (response.data) {
        message.success(`Successfully ${action}d!`);
        if (action === "upvote") {
          setVotedUpPromptIds([...votedUpPromptIds, promptId]);
        } else if (action === "downvote") {
          setVotedDownPromptIds([...votedDownPromptIds, promptId]);
        }
      } else {
        message.error("Something went wrong with your vote.");
      }
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
      copy(UserPrompt.attributes.description);
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
      <main
        className='margin-vert--lg'
        style={{ maxWidth: "1200px", margin: "auto" }}>
        <Space wrap style={{ marginBottom: "20px" }}>
          <Link to='/'>
            <HomeOutlined /> <Translate id='link.home'>返回首页</Translate>
          </Link>
          {userAuth ? (
            <Link to='/user/favorite'>
              <HeartOutlined />{" "}
              <Translate id='link.myfavorite'>我的收藏</Translate>
            </Link>
          ) : (
            <Link onClick={() => setOpen(true)}>
              <Translate id='button.login'>登录</Translate>
            </Link>
          )}

          <Dropdown.Button icon={<DownOutlined />} menu={fieldMenuProps}>
            {sortField === "id" ? (
              <Translate id='field.id'>发布时间</Translate>
            ) : (
              <Translate id='field.upvoteDifference'>支持度</Translate>
            )}
          </Dropdown.Button>
          <Dropdown.Button icon={<DownOutlined />} menu={orderMenuProps}>
            {sortOrder === "asc" ? (
              <Translate id='order.ascending'>升序</Translate>
            ) : (
              <Translate id='order.descending'>降序</Translate>
            )}
          </Dropdown.Button>
          <Search
            placeholder='Search'
            onSearch={onSearch}
            style={{ width: 200 }}
            allowClear
          />
        </Space>
        <ul className='clean-list showcaseList_Cwj2'>
          {userprompts.map((UserPrompt, index) => (
            <li key={UserPrompt.id} className='card shadow--md'>
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
                    <h4 className={styles.showcaseCardTitle}>
                      <Link className={styles.showcaseCardLink}>
                        {UserPrompt.attributes.title}
                      </Link>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#999",
                          marginLeft: "10px",
                        }}>
                        @{UserPrompt.owner}
                      </span>
                    </h4>
                  </div>
                  {UserPrompt.attributes.remark && (
                    <p className={styles.showcaseCardBody}>
                      👉 {UserPrompt.attributes.remark}
                    </p>
                  )}
                  <p className={styles.showcaseCardBody}>
                    {UserPrompt.attributes.notes ? (
                      <Tooltip
                        placement='bottom'
                        title={truncate(UserPrompt.attributes.notes, 300)}
                        overlayStyle={{ maxWidth: 450 }}>
                        {UserPrompt.attributes.description}
                      </Tooltip>
                    ) : (
                      UserPrompt.attributes.description
                    )}
                  </p>
                </div>
                <div className={clsx(styles.showcaseCardBodyActions)}>
                  <Button.Group>
                    <Tooltip
                      title={translate({
                        id: "copy.button",
                        message: "复制",
                      })}>
                      <Button
                        type='default'
                        onClick={() => handleCopyClick(index)}>
                        <CopyOutlined />
                        {copiedIndex === index && (
                          <Translate id='theme.CodeBlock.copied'>已复制</Translate>
                        )}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={translate({
                        message: "收藏",
                      })}>
                      <Button
                        type='default'
                        onClick={() => {
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
                        type='default'
                        onClick={() => vote(UserPrompt.id, "upvote")}>
                        <UpOutlined />
                        {votedUpPromptIds.includes(UserPrompt.id)
                          ? (UserPrompt.upvotes || 0) + 1
                          : UserPrompt.upvotes || 0}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={translate({
                        id: "downvote",
                        message: "踩",
                      })}>
                      <Button
                        type='default'
                        onClick={() => vote(UserPrompt.id, "downvote")}>
                        <DownOutlined />
                        {votedDownPromptIds.includes(UserPrompt.id)
                          ? (UserPrompt.downvotes || 0) + 1
                          : UserPrompt.downvotes || 0}
                      </Button>
                    </Tooltip>
                  </Button.Group>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            current={currentPage}
            total={total}
            showQuickJumper
            showSizeChanger={false}
            onChange={onChangePage}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}>
          <Text
            type='secondary'
            style={{ color: "var(--ifm-color-secondary)", fontSize: "10px" }}>
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
