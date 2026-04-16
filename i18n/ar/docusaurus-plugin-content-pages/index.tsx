import React, { useContext, useState, useMemo, useEffect, useCallback, useRef, Suspense } from "react";
import { ViewModeContext, useViewMode, type ViewMode } from "@site/src/contexts/ViewModeContext";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useHistory } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

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
import { getCache, setCache, CACHE_TTL, cleanupLegacyCache } from "@site/src/utils/cache";
import { getLevelInfo, LevelName } from "@site/src/components/LevelSystem";

import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import { fetchCardsByIds, fetchNextCards } from "@site/src/api/homepage";

import { Tags, TagList } from "@site/src/data/tags";
import { SLOGAN, TITLE, DESCRIPTION, DEFAULT_FAVORITE_IDS, DEFAULT_IDS, SITE_NAME } from "@site/src/data/constants";
import PromptCard from "@site/src/components/PromptCard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";

// SSG: 静态导入默认数据，构建时嵌入，避免客户端加载 CLS
import defaultFavorData from "@site/src/data/default/favor_ar.json";
import defaultOtherData from "@site/src/data/default/other_ar.json";

const PromptDetailModal = React.lazy(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));
const ShareButtons = React.lazy(() => import("@site/src/components/ShareButtons"));

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
    <section className="container" style={{ backgroundColor: "var(--site-color-tags-background)" }}>
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
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;

  // 用 ref 保存 userAuth，使回调稳定化（不因后台 SWR 刷新而重建）
  const userAuthRef = useRef(userAuth);
  userAuthRef.current = userAuth;
  const isLoggedIn = true; // 本地模式：收藏始终可用

  // SSG: 使用静态导入的数据作为初始值，避免首屏 CLS
  const [favoritePrompts, setFavoritePrompts] = useState<any[]>(defaultFavorData);
  const [otherPrompts, setOtherPrompts] = useState<any[]>(defaultOtherData);

  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const BATCH_SIZE = 12;

  // Refs 用于稳定 loadMoreData 回调（避免 IntersectionObserver 反复重建）
  const favoritePromptsRef = useRef(favoritePrompts);
  favoritePromptsRef.current = favoritePrompts;
  const otherPromptsRef = useRef(otherPrompts);
  otherPromptsRef.current = otherPrompts;
  const hasMoreDataRef = useRef(hasMoreData);
  const isLoadingMoreRef = useRef(isLoadingMore);

  // 稳定的收藏切换回调
  const handleToggleFavorite = useCallback(
    (id: number, isComm: boolean) => {
      const loves = userAuthRef.current?.data?.favorites?.loves || [];
      if (loves.includes(id)) {
        confirmRemoveFavorite(id, isComm);
      } else {
        addFavorite(id, isComm);
      }
    },
    [confirmRemoveFavorite, addFavorite],
  );


  // 使用 ref 跟踪已初始化的用户 ID，避免收藏操作后重复加载
  const initializedUserIdRef = useRef<number | null>(null);

  // 初始化数据加载 - 已登录用户立即加载个性化数据
  // prompt_*.json 有缓存机制，首次加载后不会重复请求
  const initializeData = useCallback(async () => {
    if (authLoading || !userAuth) return;

    // 本地模式：没有自定义收藏时保持 SSG 默认数据（更完整）
    const favorIds = userAuth?.data?.favorites?.loves || [];
    if (favorIds.length === 0) return;

    // 如果已为当前用户初始化过，跳过（避免收藏操作后重复加载）
    const currentUserId = userAuth?.data?.id;
    if (initializedUserIdRef.current === currentUserId) return;
    initializedUserIdRef.current = currentUserId;

    try {

      const favorData = await fetchCardsByIds(favorIds, currentLanguage);

      // 加载默认的 other 卡片（从 DEFAULT_IDS 中排除收藏）
      const defaultIds = DEFAULT_IDS.filter((id) => !favorIds.includes(id));
      const otherData = await fetchCardsByIds(defaultIds, currentLanguage);

      setFavoritePrompts(favorData as any);
      setOtherPrompts(otherData as any);
      setHasMoreData(true);
      hasMoreDataRef.current = true;
    } catch (error) {
      console.error("Error loading user prompts:", error);
      // 加载失败时保持 SSG 默认数据
    }
  }, [userAuth, authLoading, currentLanguage]);

  // 加载更多数据（滚动触发）- 使用 ref 读取数据，依赖数组仅 [currentLanguage]
  const loadMoreData = useCallback(async () => {
    if (isLoadingMoreRef.current || !hasMoreDataRef.current) {
      return;
    }

    setIsLoadingMore(true);
    isLoadingMoreRef.current = true;

    try {
      // 从 ref 读取最新数据，避免回调因 state 变化而重建
      const displayedIds = [...favoritePromptsRef.current.map((p: any) => p.id), ...otherPromptsRef.current.map((p: any) => p.id)];

      const nextCards = await fetchNextCards(displayedIds, BATCH_SIZE, currentLanguage);

      if (nextCards.length === 0) {
        setHasMoreData(false);
        hasMoreDataRef.current = false;
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
      isLoadingMoreRef.current = false;
    }
  }, [currentLanguage]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Intersection Observer for auto-loading more cards
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreTriggerRef.current || !hasMoreDataRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          loadMoreData();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    observer.observe(loadMoreTriggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreData, loadMoreData]);

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

  // 预计算收藏 ID 集合，O(1) 查找代替 O(n) includes
  const favoriteIdSet = useMemo(() => new Set<number>(userAuth?.data?.favorites?.loves || []), [userAuth?.data?.favorites?.loves]);
  const { filteredCards, isFiltered } = useFilteredPrompts();

  // Phase 5: 追踪已加载卡片数量，用于入场动画
  const prevOtherCountRef = useRef(otherUsers.length);
  useEffect(() => {
    prevOtherCountRef.current = otherUsers.length;
  }, [otherUsers.length]);

  if (isFiltered && filteredCards.length === 0) {
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
                <Row gutter={[16, 16]}>
                  {favoriteUsers.map((user) => (
                    <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                      <PromptCard
                        type="data"
                        data={user}
                        copyCount={user._cachedWeight}
                        isFavorite={favoriteIdSet.has(user.id)}
                        isLoggedIn={isLoggedIn}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenModal={onOpenModal}
                      />
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
            <Row gutter={[16, 16]}>
              {otherUsers.map((user, index) => {
                const isNew = index >= prevOtherCountRef.current;
                return (
                  <React.Fragment key={user.id}>
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={6}
                      className={isNew ? styles.cardEnter : undefined}
                      style={isNew ? { animationDelay: `${(index - prevOtherCountRef.current) * 0.05}s` } : undefined}>
                      <PromptCard
                        type="data"
                        data={user}
                        copyCount={user._cachedWeight}
                        isFavorite={favoriteIdSet.has(user.id)}
                        isLoggedIn={isLoggedIn}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenModal={onOpenModal}
                      />
                    </Col>
                  </React.Fragment>
                );
              })}
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
          <Row gutter={[16, 16]}>
            {filteredCards.map((user) => (
              <React.Fragment key={user.id}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <PromptCard
                    type="data"
                    data={user}
                    copyCount={getWeight(user)}
                    isFavorite={favoriteIdSet.has(user.id)}
                    isLoggedIn={isLoggedIn}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenModal={onOpenModal}
                  />
                </Col>
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
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: grey[0], marginBottom: 4 }}>
                <AppstoreOutlined style={{ marginRight: 4, color: cyan[4] }} />
                <Translate id="myCollection.stats.total">总计</Translate>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: cyan[4] }}>{totalItems}</div>
            </div>

            <div style={{ width: 1, height: 40, background: "var(--ifm-color-emphasis-200)" }} />

            {/* My Prompts */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: grey[0], marginBottom: 4 }}>
                <EditOutlined style={{ marginRight: 4, color: green[4] }} />
                <Translate id="myCollection.stats.prompts">我的提示词</Translate>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: green[4] }}>{totalPrompts}</div>
            </div>

            <div style={{ width: 1, height: 40, background: "var(--ifm-color-emphasis-200)" }} />

            {/* Favorites */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: grey[0], marginBottom: 4 }}>
                <HeartOutlined style={{ marginRight: 4, color: red[4] }} />
                <Translate id="myCollection.stats.favorites">收藏</Translate>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: red[4] }}>{totalFavorites}</div>
            </div>

            <div style={{ width: 1, height: 40, background: "var(--ifm-color-emphasis-200)" }} />

            {/* Custom Tags */}
            <div style={{ textAlign: "center" }}>
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

  // 从缓存初始化 stats，避免刷新时显示 0
  const cachedStats =
    typeof window !== "undefined"
      ? (() => {
          return getCache("myspace_stats");
        })()
      : null;
  const [stats, setStats] = React.useState(cachedStats || { totalItems: 0, totalPrompts: 0, totalFavorites: 0, totalTags: 0 });

  // 从 MySpace 组件接收数据更新（避免重复请求）
  const handleDataLoaded = React.useCallback((newStats: { totalItems: number; totalPrompts: number; totalFavorites: number; totalTags: number }) => {
    setStats(newStats);
    // 缓存 stats
    setCache("myspace_stats", newStats, CACHE_TTL.MYSPACE);
  }, []);

  // 如果切换到浏览模式，显示公共浏览
  if (viewMode === "explore") {
    return <ExploreView onOpenModal={onOpenModal} />;
  }

  return (
    <div className="container margin-top--md">
      <PageHeader userAuth={userAuth} {...stats} />
      <MySpace onOpenModal={onOpenModal} onDataLoaded={handleDataLoaded} />
    </div>
  );
};

// ==================== 主内容组件 ====================
const ShowcaseContent: React.FC = () => {
  const { userAuth, authLoading } = useContext(AuthContext);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  // 同步初始化视图模式（URL > localStorage > 默认值），避免闪烁
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (!ExecutionEnvironment.canUseDOM) return "collection";

    const params = new URLSearchParams(window.location.search);
    const urlView = params.get("view");
    if (urlView === "explore" || urlView === "collection") return urlView as ViewMode;

    try {
      const savedView = localStorage.getItem("preferredViewMode");
      if (savedView === "explore" || savedView === "collection") return savedView as ViewMode;
    } catch {}

    // 无显式偏好时，根据缓存的用户数据判断：有内容则 collection，否则 explore
    const cachedAuth = getCache("user_auth");
    if (cachedAuth?.data?.items?.length > 0) return "collection";

    return "explore";
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // 用户数据加载后，根据最新数据修正视图模式（处理缓存与实际数据不一致的情况）
  useEffect(() => {
    if (!userAuth || authLoading) return;
    if (!ExecutionEnvironment.canUseDOM) return;

    // 有显式偏好（URL 或 localStorage）时不覆盖
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "explore" || params.get("view") === "collection") return;
    try {
      const savedView = localStorage.getItem("preferredViewMode");
      if (savedView === "explore" || savedView === "collection") return;
    } catch {}

    // 无偏好时：有内容显示 collection，无内容显示 explore
    const items = userAuth?.data?.items;
    setViewMode(items && items.length > 0 ? "collection" : "explore");
  }, [userAuth, authLoading]);

  // 切换视图模式的处理函数
  const handleViewModeChange = useCallback(
    (newMode: ViewMode) => {
      setIsAnimating(true);

      // 通过 React Router 更新 URL，确保 useLocation 感知变化并清除筛选状态
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("tags");
      searchParams.delete("name");
      searchParams.delete("operator");
      if (newMode === "explore") {
        searchParams.set("view", "explore");
      } else {
        searchParams.delete("view");
      }
      history.replace({ search: searchParams.toString() });

      // 保存到 localStorage
      try {
        localStorage.setItem("preferredViewMode", newMode);
      } catch (error) {
        console.error("Failed to save view preference:", error);
      }

      // 延迟切换以配合动画
      setTimeout(() => {
        setViewMode(newMode);
        setIsAnimating(false);
      }, 150);
    },
    [history],
  );

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
      <ShowcaseHeader />
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
  const [shareUrl, setShareUrl] = useState("");
  const { siteConfig, i18n } = useDocusaurusContext();

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setShareUrl(window.location.href);
      cleanupLegacyCache(); // 清理遗留缓存数据
    }
  }, []);

  // SSR 安全的站点级 schema.org
  // - WebSite + SearchAction：让 ChatGPT/Perplexity/Google 在 SERP 直接激活站内搜索框
  // - Organization + sameAs：建立知识图谱实体关联（GitHub repo）
  // - SoftwareApplication：让 LLM 在"工具推荐"答案中考虑 AiShort
  // - FAQPage：让 LLM 直接抓取常见问答
  const localePrefix = i18n.currentLocale && i18n.currentLocale !== i18n.defaultLocale ? `/${i18n.currentLocale}` : "";
  const homeUrl = `${siteConfig.url}${localePrefix}/`;
  const orgId = `${siteConfig.url}/#organization`;

  // FAQ 内容均基于项目自身 README / docs 中的事实信息（非营销卖点、非推测）
  // 通过 translate() 在 build 时按 locale 渲染
  const faqs = [
    {
      q: translate({ id: "faq.q1", message: 'AiShort 是什么？为什么叫 "ChatGPT Shortcut"？' }),
      a: translate({
        id: "faq.a1",
        message:
          "AiShort（项目原名 ChatGPT Shortcut）是一个开源的 AI 提示词管理工具，提供精选的提示词列表帮你快速找到适用于不同场景的指令。项目最初聚焦 ChatGPT，所以代码仓库名沿用 ChatGPT-Shortcut；目前已支持所有主流大语言模型（含 Claude、Gemini、DeepSeek、Kimi 等），名字保留是出于历史延续。",
      }),
    },
    {
      q: translate({ id: "faq.q2", message: "怎么用 AiShort？" }),
      a: translate({
        id: "faq.a2",
        message:
          "三步完成：(1) 在首页搜索或按标签浏览所需提示词；(2) 点击卡片「复制」按钮；(3) 粘贴到任意 AI 对话工具，按提示词指引补充你的具体问题。",
      }),
    },
    {
      q: translate({ id: "faq.q3", message: "只能用于 ChatGPT 吗？支持其他 AI 模型吗？" }),
      a: translate({
        id: "faq.a3",
        message:
          "提示词与模型无关，可用于所有主流大语言模型。国际模型：ChatGPT、Claude、Gemini、Grok。中国模型：DeepSeek、通义千问、文心一言、豆包、Kimi、智谱清言、讯飞星火、腾讯元宝。API 平台：OpenRouter、硅基流动、Groq。",
      }),
    },
    {
      q: translate({ id: "faq.q4", message: "AiShort 跟 Awesome ChatGPT Prompts 等开源提示词集有什么区别？" }),
      a: translate({
        id: "faq.a4",
        message:
          "Awesome ChatGPT Prompts 是 AiShort 的内容来源之一，但 AiShort 在其基础上提供了：图形化浏览界面与标签筛选、18 种语言翻译、个人提示词管理（收藏/排序/标签）、社区分享与投票、Chrome/Edge/Firefox 浏览器扩展（Alt+Shift+S 唤出侧边栏）、JSON 数据导出备份、企业内网离线部署版。",
      }),
    },
    {
      q: translate({ id: "faq.q5", message: "AiShort 免费吗？需要注册吗？" }),
      a: translate({
        id: "faq.a5",
        message:
          "完全免费且开源（代码托管在 GitHub）。浏览、搜索、复制提示词无需注册。注册后可解锁：收藏与拖拽排序、自定义标签、创建并管理个人提示词、社区分享与投票、JSON 导出备份、跨设备同步。",
      }),
    },
    {
      q: translate({ id: "faq.q6", message: "AiShort 可以在企业内网或离线环境使用吗？" }),
      a: translate({
        id: "faq.a6",
        message:
          "提供独立的离线部署版，专为企业内网、政务网络等无法访问外网的环境设计。无需后端服务器和用户账号，部署后开箱即用，保留浏览、搜索、收藏、自定义提示词等核心功能，数据格式与在线版互通。",
      }),
    },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: homeUrl,
        name: SITE_NAME,
        description: DESCRIPTION,
        inLanguage: i18n.currentLocale,
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}${localePrefix}/?name={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": orgId,
        url: siteConfig.url,
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${siteConfig.url}/img/logo.png`, width: 200, height: 200 },
        sameAs: ["https://github.com/rockbenben/ChatGPT-Shortcut"],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#softwareapplication`,
        name: SITE_NAME,
        url: homeUrl,
        description: DESCRIPTION,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web, Chrome, Edge, Firefox",
        inLanguage: i18n.currentLocale,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": orgId },
      },
      {
        "@type": "FAQPage",
        inLanguage: i18n.currentLocale,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title={SITE_NAME} />
        <link rel="llms-txt" href="/llms.txt" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Head>
      <main className="margin-vert--md">
        <AuthProvider>
          <ShowcaseContent />
        </AuthProvider>
        <Suspense fallback={null}>
          <ShareButtons shareUrl={shareUrl} title={TITLE} popOver={false} />
        </Suspense>
      </main>
    </Layout>
  );
}
