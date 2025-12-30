import React, { useContext, useState, useMemo, useEffect, useCallback, useRef, Suspense } from "react";
import { ViewModeContext, useViewMode, type ViewMode } from "@site/src/contexts/ViewModeContext";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import Layout from "@theme/Layout";

import { App, Button, Typography, Flex, Row, Col, Card } from "antd";
import { green, red, blue, cyan, grey } from "@ant-design/colors";
import { MenuOutlined, AppstoreOutlined, HeartOutlined, EditOutlined, TagOutlined } from "@ant-design/icons";

import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import ShowcaseTagSelect from "@site/src/components/ShowcaseTagSelect";
import ShowcaseFilterToggle from "@site/src/components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/components/ShowcaseTooltip";

import UserStatus from "@site/src/components/user/UserStatus";
import MySpace from "@site/src/components/user/MySpace";
import SearchBar, { useFilteredPrompts } from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";

import styles from "@site/src/pages/styles.module.css";
import { getWeight } from "@site/src/utils/formatters";
import { cleanupLegacyCache } from "@site/src/utils/cache";
import { getLevelInfo, LevelName } from "@site/src/components/LevelSystem";

import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import { voteOnUserPrompt } from "@site/src/api";

import { Tags, TagList } from "@site/src/data/tags";
import { SLOGAN, TITLE, DESCRIPTION, DEFAULT_FAVORITE_IDS, DEFAULT_IDS } from "@site/src/data/constants";
import PromptCard from "@site/src/components/PromptCard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";

// SSG: 静态导入默认数据，构建时嵌入，避免客户端加载 CLS
import defaultFavorData from "@site/src/data/default/favor_ko.json";
import defaultOtherData from "@site/src/data/default/other_ko.json";

const PromptDetailModal = React.lazy(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));
const ShareButtons = React.lazy(() => import("@site/src/components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));

const { Title, Paragraph } = Typography;

// ==================== 页面头部组件 ====================
const ShowcaseHeader: React.FC = () => (
  <section className={clsx("text--center", styles.heroSection)}>
    <div className="hideOnSmallScreen">
      <Title level={1} className={styles.heroTitle} style={{ color: "transparent" }}>
        AI Short
      </Title>
      <Paragraph type="secondary" className={styles.heroSubtitle}>
        {SLOGAN}
      </Paragraph>
    </div>
    <UserStatus />
  </section>
);

// ==================== 筛选组件 ====================
const ShowcaseFilters: React.FC = React.memo(() => {
  const [showTagsOnMobile, setShowTagsOnMobile] = useState(false);
  const toggleTagsOnMobile = useCallback(() => {
    setShowTagsOnMobile((prev) => !prev);
  }, []);

  const modifiedTagList = useMemo(() => {
    return TagList.filter((tag) => tag !== "contribute");
  }, []);

  return (
    <section className={`container ${styles.filterContainer}`} style={{ backgroundColor: "var(--site-color-tags-background)" }}>
      <Flex justify="space-between" align="center" className={styles.filterCheckbox}>
        <Title level={3} className="hideOnSmallScreen" style={{ margin: 0 }}>
          <Translate id="showcase.filters.title">Filters</Translate>
        </Title>
        <Button onClick={toggleTagsOnMobile} className="showOnSmallScreen" icon={<MenuOutlined />} style={{ display: "inline-flex", alignItems: "center" }}>
          {showTagsOnMobile ? <Translate id="action.hideTags">隐藏标签</Translate> : <Translate id="action.showTags">显示标签</Translate>}
        </Button>
        <Flex gap="small" align="center">
          <ShowcaseFilterToggle />
        </Flex>
      </Flex>
      <Flex wrap="wrap" gap="small" style={{ marginTop: "0.5rem" }}>
        {modifiedTagList.map((tag, i) => {
          const { label, description, color } = Tags[tag];
          const id = `showcase_checkbox_id_${tag}`;

          return (
            <div key={i} className={`${styles.checkboxListItem} ${!showTagsOnMobile ? "hideOnSmallScreen" : ""}`}>
              <ShowcaseTooltip id={id} text={description} anchorEl="#__docusaurus">
                <ShowcaseTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    <span
                      style={{
                        backgroundColor: color,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        marginLeft: 8,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                  }
                />
              </ShowcaseTooltip>
            </div>
          );
        })}
      </Flex>
    </section>
  );
});

// ==================== 卡片列表组件 ====================
interface ShowcaseCardsProps {
  onOpenModal: (data: any) => void;
}

const ShowcaseCards: React.FC<ShowcaseCardsProps> = React.memo(({ onOpenModal }) => {
  const { userAuth, authLoading } = useContext(AuthContext);
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const { message: messageApi } = App.useApp();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  // SSG: 使用静态导入的数据作为初始值，避免首屏 CLS
  const [favoritePrompts, setFavoritePrompts] = useState<any[]>(defaultFavorData);
  const [otherPrompts, setOtherPrompts] = useState<any[]>(defaultOtherData);

  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const BATCH_SIZE = 12;

  const sessionVotedIdsRef = React.useRef<Set<string>>(new Set());
  const [voteDeltas, setVoteDeltas] = useState<Record<string | number, { upvoteDelta: number; downvoteDelta: number }>>({});

  const vote = useCallback(
    async (promptId: number | string, action: "upvote" | "downvote") => {
      if (!userAuth) {
        messageApi.warning("Please log in to vote.");
        return;
      }

      const voteKey = `${promptId}_${action}`;
      if (sessionVotedIdsRef.current.has(voteKey)) {
        messageApi.info(`You have already ${action}d this prompt in this session.`);
        return;
      }
      sessionVotedIdsRef.current.add(voteKey);

      const delta = { upvoteDelta: action === "upvote" ? 1 : 0, downvoteDelta: action === "downvote" ? 1 : 0 };
      setVoteDeltas((prev) => ({
        ...prev,
        [promptId]: {
          upvoteDelta: (prev[promptId]?.upvoteDelta || 0) + delta.upvoteDelta,
          downvoteDelta: (prev[promptId]?.downvoteDelta || 0) + delta.downvoteDelta,
        },
      }));

      try {
        await voteOnUserPrompt(Number(promptId), action);
        messageApi.success(`Successfully ${action}d!`);
      } catch (err) {
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

  // 使用 ref 跟踪已初始化的用户 ID，避免收藏操作后重复加载
  const initializedUserIdRef = useRef<number | null>(null);

  // 初始化数据加载 - 已登录用户立即加载个性化数据
  // prompt_*.json 有缓存机制，首次加载后不会重复请求
  const initializeData = useCallback(async () => {
    // 未登录或正在加载认证状态时，使用 SSG 默认数据
    if (authLoading || !userAuth) {
      return;
    }

    // 如果已为当前用户初始化过，跳过（避免收藏操作后重复加载）
    const currentUserId = userAuth?.data?.id;
    if (initializedUserIdRef.current === currentUserId) {
      return;
    }
    initializedUserIdRef.current = currentUserId;

    // 已登录用户：立即加载个性化收藏数据
    // 注意：prompt_*.json 有缓存机制（promptDataCache），首次加载后后续操作直接使用缓存
    try {
      const favorIds = userAuth?.data?.favorites?.loves || DEFAULT_FAVORITE_IDS;

      const { fetchCardsByIds } = await import("@site/src/api/homepage");
      const favorData = await fetchCardsByIds(favorIds, currentLanguage);

      // 加载默认的 other 卡片（从 DEFAULT_IDS 中排除收藏）
      const defaultIds = DEFAULT_IDS.filter((id) => !favorIds.includes(id));
      const otherData = await fetchCardsByIds(defaultIds, currentLanguage);

      setFavoritePrompts(favorData as any);
      setOtherPrompts(otherData as any);
      setHasMoreData(true);
    } catch (error) {
      console.error("Error loading user prompts:", error);
      // 加载失败时保持 SSG 默认数据
    }
  }, [userAuth, authLoading, currentLanguage]);

  // 加载更多数据（滚动触发）
  const loadMoreData = useCallback(async () => {
    if (isLoadingMore || !hasMoreData) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const { fetchNextCards } = await import("@site/src/api/homepage");

      // 收集所有已显示的 ID（收藏 + 其他）
      const displayedIds = [...favoritePrompts.map((p: any) => p.id), ...otherPrompts.map((p: any) => p.id)];

      // 获取下一批卡片（使用缓存的 prompt_*.json 数据）
      const nextCards = await fetchNextCards(displayedIds, BATCH_SIZE, currentLanguage);

      if (nextCards.length === 0) {
        setHasMoreData(false);
      } else {
        // 去重：防止并发加载导致重复
        setOtherPrompts((prev) => {
          const existingIds = new Set(prev.map((p: any) => p.id));
          const uniqueNewCards = nextCards.filter((card: any) => !existingIds.has(card.id));
          return [...prev, ...uniqueNewCards];
        });
      }
    } catch (error) {
      console.error("Error loading more prompts:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [favoritePrompts, otherPrompts, isLoadingMore, hasMoreData, currentLanguage]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Intersection Observer for auto-loading more cards
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreTriggerRef.current || !hasMoreData || isLoadingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && hasMoreData) {
          loadMoreData();
        }
      },
      {
        root: null,
        rootMargin: "0px", // 负值：用户需滚动超过触发器 100px 才加载
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreTriggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreData, isLoadingMore, loadMoreData]);

  // 使用 useMemo 缓存卡片数据和权重计算，避免每次渲染都重新计算 getWeight
  const favoriteUsers = useMemo(() => {
    return favoritePrompts.map((user: any) => ({
      ...user,
      _cachedWeight: getWeight(user),
    }));
  }, [favoritePrompts]);

  const otherUsers = useMemo(() => {
    return otherPrompts.map((user: any) => ({
      ...user,
      _cachedWeight: getWeight(user),
    }));
  }, [otherPrompts]);

  const { filteredCommus, filteredCards, isFiltered } = useFilteredPrompts();

  if (isFiltered && filteredCards.length === 0 && filteredCommus.length === 0) {
    return (
      <section className="margin-top--sm margin-bottom--sm">
        <div className="container padding-vert--md text--center">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <NoResults />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--sm margin-bottom--sm">
      {!isFiltered ? (
        <>
          {/* Favorites Section - 仅当有收藏时显示 */}
          {favoriteUsers.length > 0 ? (
            <div id="favorites-section" className={styles.showcaseFavorite}>
              <div className="container">
                <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                  <Title level={3} className="hideOnSmallScreen">
                    <Translate id="showcase.favoritesList.title">Favorites</Translate>
                  </Title>
                  <FavoriteIcon svgClass={styles.svgIconFavorite} />
                  <SearchBar />
                </div>
                <Row gutter={[16, 16]} className={styles.cardRowContainer}>
                  {favoriteUsers.map((user) => (
                    <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6} className={styles.cardColumn}>
                      <PromptCard type="data" data={user} copyCount={user._cachedWeight} onOpenModal={onOpenModal} />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                <SearchBar />
              </div>
            </div>
          )}
          <div className="container margin-top--md">
            <Title level={3} className="hideOnSmallScreen">
              <Translate id="showcase.usersList.allUsers">All prompts</Translate>
            </Title>
            <Row gutter={[16, 16]} className={styles.cardRowContainer}>
              {otherUsers.map((user, index) => (
                <React.Fragment key={user.id}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} className={styles.cardColumn}>
                    <PromptCard type="data" data={user} copyCount={user._cachedWeight} onOpenModal={onOpenModal} />
                  </Col>
                  {(index + 1) % 12 === 0 && (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} className={styles.cardColumn}>
                      <Suspense fallback={null}>
                        <AdComponent />
                      </Suspense>
                    </Col>
                  )}
                </React.Fragment>
              ))}
            </Row>
            {/* Intersection Observer 触发器 - 所有用户滚动自动加载 */}
            {hasMoreData && (
              <div
                ref={loadMoreTriggerRef}
                style={{
                  height: 1,
                  marginTop: 24,
                }}
              />
            )}
            {/* 加载指示器 */}
            {isLoadingMore && (
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <PromptCardSkeleton count={4} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="container">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <Row gutter={[16, 16]} className={styles.cardRowContainer}>
            {filteredCommus.map((user, index) => {
              const isUserPrompt = userAuth?.data?.userprompts?.some((p) => p.id === user.id);
              const isFavorite = userAuth?.data?.favorites?.commLoves?.includes(user.id);

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
                <React.Fragment key={user.id}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} className={styles.cardColumn}>
                    <PromptCard
                      type={isUserPrompt ? "user" : "community"}
                      data={modifiedData}
                      isFavorite={isFavorite}
                      onToggleFavorite={isUserPrompt ? undefined : (id, isComm) => (isFavorite ? confirmRemoveFavorite(Number(id), isComm) : addFavorite(Number(id), isComm))}
                      onVote={isUserPrompt ? undefined : (id, action) => vote(id, action)}
                      onOpenModal={onOpenModal}
                    />
                  </Col>
                  {(index + 1) % 12 === 0 && (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} className={styles.cardColumn}>
                      <Suspense fallback={null}>
                        <AdComponent />
                      </Suspense>
                    </Col>
                  )}
                </React.Fragment>
              );
            })}
            {filteredCards.map((user, index) => (
              <React.Fragment key={user.id}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} className={styles.cardColumn}>
                  <PromptCard type="data" data={user} copyCount={getWeight(user)} onOpenModal={onOpenModal} />
                </Col>
                {(filteredCommus.length + index + 1) % 12 === 0 && (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} className={styles.cardColumn}>
                    <Suspense fallback={null}>
                      <AdComponent />
                    </Suspense>
                  </Col>
                )}
              </React.Fragment>
            ))}
          </Row>
        </div>
      )}
    </section>
  );
});

// ==================== 公共提示词浏览视图 ====================
const ExploreView: React.FC<{ onOpenModal: (data: any) => void }> = ({ onOpenModal }) => {
  return (
    <>
      <ShowcaseHeader />
      <ShowcaseFilters />
      <ShowcaseCards onOpenModal={onOpenModal} />
    </>
  );
};

// ==================== 个人收藏视图 ====================
const PageHeader: React.FC<{
  userAuth: any;
  totalItems: number;
  totalPrompts: number;
  totalFavorites: number;
  totalTags: number;
}> = ({ userAuth, totalItems, totalPrompts, totalFavorites, totalTags }) => {
  // Level system based on shared prompts count
  const sharedCount = userAuth?.data?.userprompts?.filter((p: any) => p.share)?.length || 0;
  const levelInfo = getLevelInfo(sharedCount);

  return (
    <div style={{ marginBottom: 24 }} className="hideOnSmallScreen">
      {/* Title and Level Badge Row */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>
            <Translate id="myCollection.header.title">我的收藏</Translate>
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 14, marginBottom: 0 }}>
            <Translate id="myCollection.header.subtitle">管理您创建的提示词、收藏的内容和自定义标签</Translate>
          </Paragraph>
        </div>

        {/* Level Badge - Only show when logged in */}
        {userAuth && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 14px",
              background: levelInfo.color,
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#fff",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}>
              <LevelName level={levelInfo.level} emoji={levelInfo.emoji} />
            </span>
          </div>
        )}
      </Flex>

      {userAuth && (
        <Card
          style={{
            borderRadius: 12,
            border: "1px solid var(--ifm-color-emphasis-200)",
            background: "var(--ifm-card-background-color)",
          }}
          styles={{ body: { padding: "16px 24px" } }}>
          <Flex justify="space-around" align="center" wrap="wrap" gap={16}>
            {/* Total */}
            <div style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontSize: 11, color: grey[0], marginBottom: 4 }}>
                <AppstoreOutlined style={{ marginRight: 4, color: cyan[4] }} />
                <Translate id="myCollection.stats.total">总计</Translate>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: cyan[4] }}>{totalItems}</div>
            </div>

            <div style={{ width: 1, height: 40, background: "var(--ifm-color-emphasis-200)" }} />

            {/* My Prompts */}
            <div style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontSize: 11, color: grey[0], marginBottom: 4 }}>
                <EditOutlined style={{ marginRight: 4, color: green[4] }} />
                <Translate id="myCollection.stats.prompts">我的提示词</Translate>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: green[4] }}>{totalPrompts}</div>
            </div>

            <div style={{ width: 1, height: 40, background: "var(--ifm-color-emphasis-200)" }} />

            {/* Favorites */}
            <div style={{ textAlign: "center", minWidth: 60 }}>
              <div style={{ fontSize: 11, color: grey[0], marginBottom: 4 }}>
                <HeartOutlined style={{ marginRight: 4, color: red[4] }} />
                <Translate id="myCollection.stats.favorites">收藏</Translate>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: red[4] }}>{totalFavorites}</div>
            </div>

            <div style={{ width: 1, height: 40, background: "var(--ifm-color-emphasis-200)" }} />

            {/* Custom Tags */}
            <div style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontSize: 11, color: grey[0], marginBottom: 4 }}>
                <TagOutlined style={{ marginRight: 4, color: blue[4] }} />
                <Translate id="myCollection.stats.tags">自定义标签</Translate>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: blue[4] }}>{totalTags}</div>
            </div>
          </Flex>
        </Card>
      )}
    </div>
  );
};

const MyCollectionView: React.FC<{ onOpenModal: (data: any) => void }> = ({ onOpenModal }) => {
  const { userAuth } = useContext(AuthContext);
  const { viewMode } = useViewMode();
  const [stats, setStats] = React.useState({ totalItems: 0, totalPrompts: 0, totalFavorites: 0, totalTags: 0 });

  // 从 MySpace 组件接收数据更新（避免重复请求）
  const handleDataLoaded = React.useCallback((newStats: { totalItems: number; totalPrompts: number; totalFavorites: number; totalTags: number }) => {
    setStats(newStats);
  }, []);

  // 如果切换到浏览模式，显示公共浏览
  if (viewMode === "explore") {
    return <ExploreView onOpenModal={onOpenModal} />;
  }

  // 仅在 collection 模式才显示 MySpace（避免不必要的 API 调用）
  return (
    <>
      <ShowcaseHeader />
      <div className="container margin-top--md">
        <PageHeader userAuth={userAuth} {...stats} />
        <MySpace onOpenModal={onOpenModal} onDataLoaded={handleDataLoaded} />
      </div>
    </>
  );
};

// ==================== 主内容组件 ====================
const ShowcaseContent: React.FC = () => {
  const { userAuth, authLoading } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const [viewMode, setViewMode] = useState<ViewMode>("collection");
  const [isAnimating, setIsAnimating] = useState(false);

  // 初始化视图模式（优先级：URL > localStorage > 默认值）
  useEffect(() => {
    if (!userAuth || authLoading) return;

    // 从 URL 读取视图参数
    if (ExecutionEnvironment.canUseDOM) {
      const params = new URLSearchParams(window.location.search);
      const urlView = params.get("view");

      if (urlView === "explore" || urlView === "collection") {
        setViewMode(urlView as ViewMode);
        return;
      }

      // 从 localStorage 读取用户偏好
      try {
        const savedView = localStorage.getItem("preferredViewMode");
        if (savedView === "explore" || savedView === "collection") {
          setViewMode(savedView as ViewMode);
        }
      } catch (error) {
        console.error("Failed to read view preference:", error);
      }
    }
  }, [userAuth, authLoading]);

  // 切换视图模式的处理函数
  const handleViewModeChange = useCallback((newMode: ViewMode) => {
    setIsAnimating(true);

    // 更新 URL
    if (ExecutionEnvironment.canUseDOM) {
      const url = new URL(window.location.href);
      if (newMode === "explore") {
        url.searchParams.set("view", "explore");
      } else {
        url.searchParams.delete("view");
      }
      window.history.replaceState({}, "", url.toString());

      // 保存到 localStorage
      try {
        localStorage.setItem("preferredViewMode", newMode);
      } catch (error) {
        console.error("Failed to save view preference:", error);
      }
    }

    // 延迟切换以配合动画
    setTimeout(() => {
      setViewMode(newMode);
      setIsAnimating(false);
    }, 150);
  }, []);

  const handleOpenModal = useCallback((data: any) => {
    setModalData(data);
    setModalOpen(true);
  }, []);

  // 加载状态
  if (authLoading) {
    return (
      <>
        <ShowcaseHeader />
        <div className="container margin-top--md">
          <PromptCardSkeleton count={8} />
        </div>
      </>
    );
  }

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode: handleViewModeChange }}>
      <div
        style={{
          opacity: isAnimating ? 0 : 1,
          transition: "opacity 0.15s ease-in-out",
        }}>
        {userAuth ? <MyCollectionView onOpenModal={handleOpenModal} /> : <ExploreView onOpenModal={handleOpenModal} />}
      </div>
      {modalOpen && (
        <Suspense fallback={null}>
          <PromptDetailModal open={modalOpen} onCancel={() => setModalOpen(false)} data={modalData} />
        </Suspense>
      )}
    </ViewModeContext.Provider>
  );
};

export default function Showcase(): React.ReactElement {
  const [Shareurl, setShareUrl] = useState("");

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setShareUrl(window.location.href);
      cleanupLegacyCache(); // 清理遗留缓存数据
    }
  }, []);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--md">
        <AuthProvider>
          <ShowcaseContent />
        </AuthProvider>
        <Suspense fallback={null}>
          <ShareButtons shareUrl={Shareurl} title={TITLE} popOver={false} />
        </Suspense>
      </main>
    </Layout>
  );
}
