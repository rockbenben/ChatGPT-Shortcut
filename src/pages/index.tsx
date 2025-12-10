import React, { useContext, useState, useMemo, useEffect, useCallback, Suspense } from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import { App, Button, Typography, Space, theme, Flex, Row, Col, Tooltip } from "antd";

import { EditOutlined, HeartOutlined, ArrowDownOutlined, MenuOutlined } from "@ant-design/icons";

import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import ShowcaseTagSelect from "@site/src/components/ShowcaseTagSelect";
import ShowcaseFilterToggle from "@site/src/components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/components/ShowcaseTooltip";
import UserStatus from "@site/src/components/user/UserStatus";
import UserPrompts from "@site/src/components/user/UserPrompts";
import UserFavorite from "@site/src/components/user/UserFavorite";
import SearchBar, { useFilteredPrompts, type UserState } from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";

import styles from "@site/src/pages/styles.module.css";
import { getWeight } from "@site/src/utils/formatters";

import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import { getPrompts, voteOnUserPrompt } from "@site/src/api";

import { Tags, TagList } from "@site/src/data/tags";
import { SLOGAN, TITLE, DESCRIPTION, DEFAULT_FAVORITE_IDS, DEFAULT_IDS, ALL_IDS } from "@site/src/data/constants";
import PromptCard from "@site/src/components/PromptCard";
import { useFavorite } from "@site/src/hooks/useFavorite";

const PromptDetailModal = React.lazy(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));

const ShareButtons = React.lazy(() => import("@site/src/components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));

import favorDefault from "@site/src/data/default/favor_zh.json";
import otherDefault from "@site/src/data/default/other_zh.json";

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const { Title, Paragraph } = Typography;

const ShowcaseHeader = () => (
  <section className={clsx("text--center", styles.heroSection)}>
    <div className="hideOnSmallScreen">
      <Title level={1} className={styles.heroTitle} style={{ color: "transparent" }}>
        AI Short
      </Title>
      <Paragraph type="secondary" className={styles.heroSubtitle}>
        {SLOGAN}
      </Paragraph>
    </div>
    <UserStatus hideLinks={{ userCenter: true, myFavorite: false }} />
  </section>
);

interface ShowcaseFiltersProps {
  onToggleDescription: () => void;
  showUserPrompts: boolean;
  setShowUserPrompts: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenModal: (data: any) => void;
}

const ShowcaseFilters: React.FC<ShowcaseFiltersProps> = React.memo(({ onToggleDescription, showUserPrompts, setShowUserPrompts, onOpenModal }) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const { token } = theme.useToken();
  const history = useHistory();
  const location = useLocation();

  const handleUserPrompts = useCallback(() => {
    // Determine the new state
    const newShowUserPrompts = !showUserPrompts;
    setShowUserPrompts(newShowUserPrompts);

    // If we are activating My Prompts, clear other tags
    if (newShowUserPrompts) {
      history.push({
        ...location,
        search: "",
        state: prepareUserState(),
      });
    }
  }, [showUserPrompts, history, location]);

  const handleUserFavs = useCallback(() => {
    setShowUserPrompts(false);

    // Clear all states
    history.push({
      ...location,
      search: "",
      state: prepareUserState(),
    });
  }, [history, location]);

  const [showTagsOnMobile, setShowTagsOnMobile] = useState(false);
  const toggleTagsOnMobile = useCallback(() => {
    setShowTagsOnMobile((prev) => !prev);
  }, []);

  const modifiedTagList = useMemo(() => {
    const tags = TagList.filter((tag) => tag !== "contribute");
    return userAuth ? tags.filter((tag) => tag !== "favorite") : tags;
  }, [userAuth]);

  const handleTagClick = useCallback(() => {
    if (!userAuth) {
      return;
    }
    setShowUserPrompts(false);
  }, [userAuth]);

  const togglePromptLanguage = <Translate id="toggle_prompt_language">切换 Prompt 语言</Translate>;

  return (
    <>
      <section className="container" style={{ backgroundColor: "var(--site-color-tags-background)" }}>
        <Flex justify="space-between" align="center" className={styles.filterCheckbox}>
          <Title level={3} className="hideOnSmallScreen" style={{ margin: 0 }}>
            <Translate id="showcase.filters.title">Filters</Translate>
          </Title>
          <Button onClick={toggleTagsOnMobile} className="showOnSmallScreen" icon={<MenuOutlined />} style={{ display: "inline-flex", alignItems: "center" }}>
            {showTagsOnMobile ? <Translate id="action.hideTags">隐藏标签</Translate> : <Translate id="action.showTags">显示标签</Translate>}
          </Button>
          <Space>
            {currentLanguage !== "en" && (
              <Tooltip
                title={translate({
                  id: "toggle_prompt_language_description",
                  message: "更改提示词的显示语言，可以在英语和当前页面语言之间进行切换。",
                })}>
                <Button onClick={onToggleDescription} size="small" style={{ display: "inline-flex", alignItems: "center" }}>
                  {togglePromptLanguage}
                </Button>
              </Tooltip>
            )}
            <ShowcaseFilterToggle />
          </Space>
        </Flex>
        <Flex wrap="wrap" gap="small" style={{ marginTop: "0.5rem" }}>
          {userAuth && (
            <>
              <div className={`${styles.checkboxListItem}`} onClick={handleUserPrompts}>
                <ShowcaseTooltip
                  id="myprompt"
                  text={translate({
                    id: "myprompt.tooltip",
                    message: "添加或制作过的个人提示词，可用于存放AiShort之外的提示词。",
                  })}
                  anchorEl="#__docusaurus">
                  <ShowcaseTagSelect
                    tag="myprompt"
                    label={translate({
                      id: "myprompt",
                      message: "我的提示词",
                    })}
                    icon={<EditOutlined style={{ marginLeft: "5px" }} />}
                    checked={showUserPrompts}
                  />
                </ShowcaseTooltip>
              </div>
              <div className={`${styles.checkboxListItem}`} onClick={handleUserFavs}>
                <ShowcaseTooltip
                  id="myfavorite"
                  text={translate({
                    id: "myfavorite.tooltip",
                    message: "我收藏的提示词，包括社区提示词。",
                  })}
                  anchorEl="#__docusaurus">
                  <ShowcaseTagSelect
                    tag="myfavorite"
                    label={translate({
                      id: "link.myFavorites",
                      message: "我的收藏",
                    })}
                    icon={<HeartOutlined style={{ marginLeft: "5px" }} />}
                  />
                </ShowcaseTooltip>
              </div>
            </>
          )}
          {userAuth && <div style={{ width: 1, backgroundColor: token.colorSplit }} />}
          {modifiedTagList.map((tag, i) => {
            const { label, description, color } = Tags[tag];
            const id = `showcase_checkbox_id_${tag}`;

            return (
              <div key={i} className={`${styles.checkboxListItem} ${!showTagsOnMobile ? "hideOnSmallScreen" : ""}`} onClick={handleTagClick}>
                <ShowcaseTooltip id={id} text={description} anchorEl="#__docusaurus">
                  <ShowcaseTagSelect
                    tag={tag}
                    id={id}
                    label={label}
                    icon={
                      tag === "favorite" ? (
                        <FavoriteIcon svgClass={styles.svgIconFavoriteXs} />
                      ) : (
                        <span
                          style={{
                            backgroundColor: color,
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            marginLeft: 8,
                          }}
                        />
                      )
                    }
                  />
                </ShowcaseTooltip>
              </div>
            );
          })}
          <div key="community.tag.tooltip" className={styles.checkboxListItem}>
            <ShowcaseTooltip
              id="community.tag.tooltip"
              text={translate({
                id: "community.tag.tooltip",
                message: "社区分享的精选提示词",
              })}
              anchorEl="#__docusaurus">
              <Link to="/community-prompts" className="fontLink">
                <ShowcaseTagSelect
                  id="community.tag.tooltip"
                  tag="communityprompt"
                  label={translate({
                    id: "community.tag",
                    message: "社区精选",
                  })}
                  icon={
                    <span
                      style={{
                        backgroundColor: "#a2222a",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        marginLeft: 8,
                      }}
                    />
                  }
                />
              </Link>
            </ShowcaseTooltip>
          </div>
        </Flex>
      </section>
    </>
  );
});

interface ShowcaseCardsProps {
  isDescription: boolean;
  showUserPrompts: boolean;
  onOpenModal: (data: any) => void;
}

const ShowcaseCards: React.FC<ShowcaseCardsProps> = React.memo(({ isDescription, showUserPrompts, onOpenModal }) => {
  const { userAuth, authLoading } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const { message: messageApi } = App.useApp();

  const [favoritePrompts, setFavoritePrompts] = useState(favorDefault || []);
  const [otherPrompts, setOtherPrompts] = useState(otherDefault || []);
  const [showAllOtherUsers, setShowAllOtherUsers] = useState(false);

  // 本次会话的投票记录（防止 API 请求期间重复点击）
  const sessionVotedIdsRef = React.useRef<Set<string>>(new Set());
  // 本地投票增量（用于 optimistic UI，存储 delta 而非绝对值）
  const [voteDeltas, setVoteDeltas] = useState<Record<string | number, { upvoteDelta: number; downvoteDelta: number }>>({});

  const vote = useCallback(
    async (promptId: number | string, action: "upvote" | "downvote") => {
      if (!userAuth) {
        messageApi.warning("Please log in to vote.");
        return;
      }

      // 防止 API 请求期间重复点击
      const voteKey = `${promptId}_${action}`;
      if (sessionVotedIdsRef.current.has(voteKey)) {
        messageApi.info(`You have already ${action}d this prompt in this session.`);
        return;
      }
      sessionVotedIdsRef.current.add(voteKey);

      // Optimistic UI: 存储增量变化
      const delta = { upvoteDelta: action === "upvote" ? 1 : 0, downvoteDelta: action === "downvote" ? 1 : 0 };
      setVoteDeltas((prev) => ({
        ...prev,
        [promptId]: {
          upvoteDelta: (prev[promptId]?.upvoteDelta || 0) + delta.upvoteDelta,
          downvoteDelta: (prev[promptId]?.downvoteDelta || 0) + delta.downvoteDelta,
        },
      }));

      try {
        await voteOnUserPrompt(promptId, action);
        messageApi.success(`Successfully ${action}d!`);
      } catch (err) {
        // 回滚增量
        sessionVotedIdsRef.current.delete(voteKey);
        setVoteDeltas((prev) => ({
          ...prev,
          [promptId]: {
            upvoteDelta: (prev[promptId]?.upvoteDelta || 0) - delta.upvoteDelta,
            downvoteDelta: (prev[promptId]?.downvoteDelta || 0) - delta.downvoteDelta,
          },
        }));
        const errorMessage = err?.strapiMessage || `Failed to ${action}. Please try again.`;
        messageApi.error(errorMessage);
      }
    },
    [userAuth, messageApi]
  );

  const fetchData = useCallback(async () => {
    // 等待认证加载完成后再决定是否获取数据
    if (authLoading) {
      return;
    }
    if (!userAuth && !showAllOtherUsers) {
      return;
    }

    try {
      const defaultFavorIds = DEFAULT_FAVORITE_IDS;
      const defaultIds = DEFAULT_IDS;
      const allIds = ALL_IDS;
      const favorIds = userAuth?.data?.favorites?.loves || defaultFavorIds;

      const idsToShow = !userAuth
        ? allIds.filter((id) => !defaultFavorIds.includes(id))
        : showAllOtherUsers
        ? allIds.filter((id) => !favorIds.includes(id))
        : defaultIds.filter((id) => !favorIds.includes(id));

      const [favorData, otherData] = await Promise.all([getPrompts("cards", userAuth ? favorIds : [], currentLanguage), getPrompts("cards", idsToShow, currentLanguage)]);

      if (userAuth) {
        setFavoritePrompts(favorData);
      }
      setOtherPrompts(otherData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [userAuth, showAllOtherUsers, currentLanguage, authLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [favoriteUsers, otherUsers] = useMemo(() => {
    return [favoritePrompts, otherPrompts];
  }, [favoritePrompts, otherPrompts]);

  const { filteredCommus, filteredCards, isFiltered } = useFilteredPrompts();

  if (isFiltered && filteredCards.length === 0 && filteredCommus.length === 0) {
    return (
      <section className="margin-top--sm margin-bottom--sm">
        <div className="container padding-vert--md text--center">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <NoResults />
          <Suspense fallback={null}>
            <AdComponent type="transverse" />
          </Suspense>
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--sm margin-bottom--sm">
      {!isFiltered ? (
        <>
          <div id="favorites-section" className={styles.showcaseFavorite}>
            <div className="container">
              <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                <Title level={3} className="hideOnSmallScreen">
                  <Translate id="showcase.favoritesList.title">Favorites</Translate>
                </Title>
                <FavoriteIcon svgClass={styles.svgIconFavorite} />
                {!showUserPrompts && <SearchBar />}
              </div>
              {authLoading || userAuth ? (
                <UserFavorite filteredCommus={[]} filteredCards={[]} isFiltered={false} isDescription={isDescription} onOpenModal={onOpenModal} />
              ) : (
                <Row gutter={[16, 16]}>
                  {favoriteUsers.map((user) => (
                    <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                      <PromptCard type="data" data={user} isDescription={isDescription} copyCount={getWeight(user)} onOpenModal={onOpenModal} />
                    </Col>
                  ))}
                  <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Suspense fallback={null}>
                      <AdComponent />
                    </Suspense>
                  </Col>
                </Row>
              )}
            </div>
          </div>
          <div className="container margin-top--md">
            <Title level={3} className="hideOnSmallScreen">
              <Translate id="showcase.usersList.allUsers">All prompts</Translate>
            </Title>
            <Row gutter={[16, 16]}>
              {otherUsers.map((user) => (
                <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <PromptCard type="data" data={user} isDescription={isDescription} copyCount={getWeight(user)} onOpenModal={onOpenModal} />
                </Col>
              ))}
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Suspense fallback={null}>
                  <AdComponent />
                </Suspense>
              </Col>
            </Row>
            {!showAllOtherUsers && (
              <Button size="large" block onClick={() => setShowAllOtherUsers(true)} style={{ marginTop: 24, fontSize: "0.95rem" }}>
                <ArrowDownOutlined /> <Translate id="action.loadMore">加载更多</Translate>
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="container">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <Row gutter={[16, 16]}>
            {filteredCommus.map((user) => {
              const isUserPrompt = userAuth?.data?.userprompts?.some((p) => p.id === user.id);
              const isFavorite = userAuth?.data?.favorites?.commLoves?.includes(user.id);

              // 应用本地投票增量（optimistic UI）
              const delta = voteDeltas[user.id];
              const modifiedData = delta
                ? {
                    ...user,
                    upvotes: (user.upvotes || 0) + delta.upvoteDelta,
                    downvotes: (user.downvotes || 0) + delta.downvoteDelta,
                    upvoteDifference: (user.upvoteDifference || 0) + delta.upvoteDelta - delta.downvoteDelta,
                  }
                : user;

              return (
                <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <PromptCard
                    type={isUserPrompt ? "user" : "community"}
                    data={modifiedData}
                    isFavorite={isFavorite}
                    onToggleFavorite={isUserPrompt ? undefined : (id, isComm) => (isFavorite ? confirmRemoveFavorite(Number(id), isComm) : addFavorite(Number(id), isComm))}
                    onVote={isUserPrompt ? undefined : (id, action) => vote(id, action)}
                    onOpenModal={onOpenModal}
                  />
                </Col>
              );
            })}
            {filteredCards.map((user) => (
              <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <PromptCard type="data" data={user} isDescription={isDescription} copyCount={getWeight(user)} onOpenModal={onOpenModal} />
              </Col>
            ))}
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Suspense fallback={null}>
                <AdComponent />
              </Suspense>
            </Col>
          </Row>
        </div>
      )}
    </section>
  );
});

export default function Showcase(): React.ReactElement {
  const [Shareurl, setShareUrl] = useState("");
  const [isDescription, setIsDescription] = useState(true);
  const [showUserPrompts, setShowUserPrompts] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({});

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setShareUrl(window.location.href);
    }
  }, []);

  const toggleDescription = useCallback(() => {
    setIsDescription((prevIsDescription) => !prevIsDescription);
  }, []);

  const handleOpenModal = useCallback((data: any) => {
    setModalData(data);
    setModalOpen(true);
  }, []);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--md">
        <AuthProvider>
          <ShowcaseHeader />
          <ShowcaseFilters onToggleDescription={toggleDescription} showUserPrompts={showUserPrompts} setShowUserPrompts={setShowUserPrompts} onOpenModal={handleOpenModal} />
          {showUserPrompts ? (
            <div className="container margin-top--sm">
              <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                <SearchBar setShowUserPrompts={setShowUserPrompts} />
              </div>
              <UserPrompts filteredCommus={[]} isFiltered={false} onOpenModal={handleOpenModal} />
            </div>
          ) : (
            <ShowcaseCards isDescription={isDescription} showUserPrompts={showUserPrompts} onOpenModal={handleOpenModal} />
          )}
          {modalOpen && (
            <Suspense fallback={null}>
              <PromptDetailModal open={modalOpen} onCancel={() => setModalOpen(false)} data={modalData} />
            </Suspense>
          )}
        </AuthProvider>
        <Suspense fallback={null}>
          <ShareButtons shareUrl={Shareurl} title={TITLE} popOver={false} />
        </Suspense>
      </main>
    </Layout>
  );
}
