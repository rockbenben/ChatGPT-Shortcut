import React, { useContext, useState, useMemo, useEffect, useCallback, useRef, Suspense } from "react";
import { ViewModeContext, useViewMode, type ViewMode } from "@site/src/contexts/ViewModeContext";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useHistory, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

import { App, Button, Typography, Flex, Row, Col, Card } from "antd";
import { cyan, green, red, blue } from "@ant-design/colors";
import { FilterOutlined, CaretDownOutlined, CaretUpOutlined, AppstoreOutlined, HeartOutlined, HeartFilled, EditOutlined, TagOutlined, CloseOutlined } from "@ant-design/icons";

import ShowcaseTagSelect from "@site/src/components/ShowcaseTagSelect";
import ShowcaseFilterToggle from "@site/src/components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/components/ShowcaseTooltip";

import UserStatus from "@site/src/components/user/UserStatus";
import SearchBar, { useFilteredPrompts } from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";

import styles from "@site/src/pages/styles.module.css";
import { getWeight } from "@site/src/utils/formatters";
import { getCache, setCache, CACHE_TTL, cleanupLegacyCache } from "@site/src/utils/cache";
import { getLevelInfo, LevelName, LevelIcon } from "@site/src/components/LevelSystem";

import { AuthContext } from "@site/src/components/AuthContext";
import { voteOnUserPrompt } from "@site/src/api";
import { fetchCardsByIds, fetchNextCards } from "@site/src/api/homepage";

import { Tags, TagList } from "@site/src/data/tags";
import { SLOGAN, SUPPORTED_AI_TOOLS, TITLE, DESCRIPTION, DEFAULT_FAVORITE_IDS, DEFAULT_IDS, SITE_NAME } from "@site/src/data/constants";
import { toBcp47 } from "@site/src/utils/i18n";
import { toJsonLd } from "@site/src/utils/jsonLd";
import PromptCard from "@site/src/components/PromptCard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";

// SSG: 静态导入默认数据，构建时嵌入，避免客户端加载 CLS
import defaultFavorData from "@site/src/data/default/favor_zh-Hant.json";
import defaultOtherData from "@site/src/data/default/other_zh-Hant.json";

const PromptDetailModal = React.lazy(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));
const ShareButtons = React.lazy(() => import("@site/src/components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));
// MySpace 仅在 collection 视图 + 登录态下渲染，未登录访客（占大多数流量）不需要
const MySpace = React.lazy(() => import("@site/src/components/user/MySpace"));

const { Title, Paragraph } = Typography;

// ==================== 页面头部组件 ====================
const ShowcaseHeader: React.FC = () => (
  <section className={clsx("text--center", styles.heroSection)}>
    <div className="hideOnSmallScreen">
      {/* inline style 必须，因为 antd 的 h1.ant-typography 选择器特异性 0,1,1 会赢过纯类 */}
      <Title
        level={1}
        style={{
          fontSize: 40,
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          marginBottom: 8,
          color: "var(--ifm-color-content)",
        }}>
        AI Short
      </Title>
      <p style={{ fontSize: 18, maxWidth: 560, margin: "0 auto 4px", lineHeight: 1.55, color: "var(--ifm-color-content-secondary)" }}>{SLOGAN}</p>
      <div
        aria-label="Supported AI tools"
        style={{
          fontSize: 13,
          color: "var(--site-color-text-tertiary)",
          letterSpacing: "0.04em",
          marginBottom: 20,
          fontFamily: "var(--site-font-mono)",
        }}>
        {/* All locales follow the minimal '{tools} <native etc>' pattern — no 'Works with' prefix */}
        <Translate id="hero.supportedAiTools" values={{ tools: SUPPORTED_AI_TOOLS.join(" · ") }}>
          {"{tools} 等"}
        </Translate>
      </div>
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
  const location = useLocation();
  const history = useHistory();

  const modifiedTagList = useMemo(() => {
    return TagList.filter((tag) => tag !== "contribute");
  }, []);

  const selectedTagCount = useMemo(() => new URLSearchParams(location.search).getAll("tags").length, [location.search]);

  const handleClearTags = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete("tags");
    history.push({ ...location, search: params.toString() });
  }, [location, history]);

  return (
    <section className="container">
      <Flex justify="space-between" align="center" className={styles.filterCheckbox}>
        <Button type="text" onClick={toggleTagsOnMobile} className="showOnSmallScreen" icon={<FilterOutlined />}>
          {showTagsOnMobile ? <Translate id="action.hideTags">隐藏标签</Translate> : <Translate id="action.showTags">显示标签</Translate>}
          {showTagsOnMobile ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </Button>
        <Flex align="center" gap="small">
          <span
            className="hideOnSmallScreen"
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--site-color-text-tertiary)",
              margin: 0,
            }}>
            Filters
          </span>
          {selectedTagCount > 0 && (
            <Button type="link" size="small" icon={<CloseOutlined />} onClick={handleClearTags} style={{ padding: 0, height: "auto", fontSize: 11, color: "var(--site-color-tag-selected-text)" }}>
              <Translate id="action.clearFilters" values={{ count: selectedTagCount }}>
                {"清除筛选 ({count})"}
              </Translate>
            </Button>
          )}
        </Flex>
        <Flex gap="small" align="center">
          <ShowcaseFilterToggle />
        </Flex>
      </Flex>
      <div className={clsx(styles.checkboxList, !showTagsOnMobile && "hideOnSmallScreen")} style={{ marginTop: "1rem" }}>
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
      </div>
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
  const currentLanguage = i18n.currentLocale;

  // 用 ref 保存 userAuth，使回调稳定化（不因后台 SWR 刷新而重建）
  const userAuthRef = useRef(userAuth);
  userAuthRef.current = userAuth;
  const isLoggedIn = !!userAuth;

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

  const sessionVotedIdsRef = React.useRef<Set<string>>(new Set());
  const [voteDeltas, setVoteDeltas] = useState<Record<string | number, { upvoteDelta: number; downvoteDelta: number }>>({});

  // 稳定的投票回调（使用 ref 避免因 userAuth 变化而重建）
  const vote = useCallback(
    async (promptId: number | string, action: "upvote" | "downvote") => {
      if (!userAuthRef.current) {
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
    [messageApi],
  );

  // 稳定的收藏切换回调（DataCard 用，isComm=false）
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

  // 稳定的社区收藏切换回调（CommunityCard 用，isComm=true）
  const handleCommToggleFavorite = useCallback(
    (id: string | number, isComm: boolean) => {
      const commLoves = userAuthRef.current?.data?.favorites?.commLoves || [];
      if (commLoves.includes(Number(id))) {
        confirmRemoveFavorite(Number(id), isComm);
      } else {
        addFavorite(Number(id), isComm);
      }
    },
    [confirmRemoveFavorite, addFavorite],
  );

  // 组件卸载时清除投票记录，防止内存泄漏
  useEffect(() => {
    return () => {
      sessionVotedIdsRef.current.clear();
    };
  }, []);

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

  // 注意：不要把卡片 map 成 {...user, _cachedWeight} 新对象——无限滚动每追加一批，
  // useMemo 会为数组中【全部】元素（含已渲染卡片）生成新引用，使 PromptCard 的 React.memo
  // 整体失效，每批次重渲染整张网格（O(N)）。getWeight 仅 `count ?? weight ?? 0`，O(1)，
  // 直接在渲染处内联即可（与下方 filteredCards 分支一致），data 沿用原始稳定引用以保住 memo。

  // 预计算收藏 ID 集合，O(1) 查找代替 O(n) includes
  const favoriteIdSet = useMemo(() => new Set<number>(userAuth?.data?.favorites?.loves || []), [userAuth?.data?.favorites?.loves]);
  const userPromptIdSet = useMemo(() => new Set<number>(userAuth?.data?.userprompts?.map((p: any) => p.id) || []), [userAuth?.data?.userprompts]);
  const commFavoriteIdSet = useMemo(() => new Set<number>(userAuth?.data?.favorites?.commLoves || []), [userAuth?.data?.favorites?.commLoves]);

  const { filteredCommus, filteredCards, isFiltered } = useFilteredPrompts();

  // 预计算投票数据，避免渲染时重复创建对象
  const filteredCommusWithDeltas = useMemo(() => {
    return filteredCommus.map((user: any) => {
      const delta = voteDeltas[user.id];
      if (!delta) return user;
      return {
        ...user,
        upvotes: (user.upvotes || 0) + delta.upvoteDelta,
        downvotes: (user.downvotes || 0) + delta.downvoteDelta,
        upvoteDifference: (user.upvoteDifference || 0) + delta.upvoteDelta - delta.downvoteDelta,
      };
    });
  }, [filteredCommus, voteDeltas]);

  // 已加载卡片数量，用于入场动画
  const prevOtherCountRef = useRef(otherPrompts.length);
  useEffect(() => {
    prevOtherCountRef.current = otherPrompts.length;
  }, [otherPrompts.length]);

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
          {favoritePrompts.length > 0 ? (
            <div id="favorites-section" className={styles.showcaseFavorite}>
              <div className="container">
                <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                  <Title level={3} className="hideOnSmallScreen" style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <HeartFilled aria-hidden style={{ color: "var(--site-color-svg-icon-favorite)", fontSize: 18 }} />
                    Favorites
                  </Title>
                  <SearchBar />
                </div>
                <Row gutter={[16, 16]}>
                  {favoritePrompts.map((user) => (
                    <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
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
            <div className="hideOnSmallScreen" style={{ paddingBottom: 12, marginBottom: 16, borderBottom: "1px solid var(--site-color-hairline)" }}>
              <Title level={2} style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
                All Prompts
              </Title>
            </div>
            <Row gutter={[16, 16]}>
              {otherPrompts.map((user, index) => {
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
                        copyCount={getWeight(user)}
                        isFavorite={favoriteIdSet.has(user.id)}
                        isLoggedIn={isLoggedIn}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenModal={onOpenModal}
                      />
                    </Col>
                    {(index + 1) % 12 === 0 && (
                      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Suspense fallback={null}>
                          <AdComponent />
                        </Suspense>
                      </Col>
                    )}
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
            {filteredCommusWithDeltas.map((user, index) => {
              const isUserPrompt = userPromptIdSet.has(user.id);
              const isFavorite = commFavoriteIdSet.has(user.id);

              return (
                <React.Fragment key={user.id}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <PromptCard
                      type={isUserPrompt ? "user" : "community"}
                      data={user}
                      isFavorite={isFavorite}
                      isLoggedIn={isLoggedIn}
                      onToggleFavorite={isUserPrompt ? undefined : handleCommToggleFavorite}
                      onVote={isUserPrompt ? undefined : vote}
                      onOpenModal={onOpenModal}
                    />
                  </Col>
                  {(index + 1) % 12 === 0 && (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
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
                {(filteredCommus.length + index + 1) % 12 === 0 && (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6}>
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
      <ShowcaseFilters />
      <ShowcaseCards onOpenModal={onOpenModal} />
    </>
  );
};

// ==================== 个人收藏视图 ====================
// Stat bar — each stat carries its own hue (4-color scheme: cyan/green/red/blue is intentional visual signature).
const StatItem: React.FC<{ icon: React.ReactNode; label: React.ReactNode; value: number; color: string }> = ({ icon, label, value, color }) => (
  <div style={{ textAlign: "center", minWidth: 72 }}>
    <div
      style={{
        fontSize: 10,
        color: "var(--site-color-text-tertiary)",
        marginBottom: 6,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}>
      <span aria-hidden style={{ fontSize: 11, color }}>
        {icon}
      </span>
      <span>{label}</span>
    </div>
    <div
      style={{
        fontSize: 28,
        fontWeight: 600,
        lineHeight: 1,
        fontFamily: "var(--site-font-mono)",
        fontVariantNumeric: "tabular-nums",
        color,
      }}>
      {value}
    </div>
  </div>
);

const StatDivider: React.FC = () => <div style={{ width: 1, height: 40, background: "var(--site-color-hairline)" }} />;

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
          <Title level={2} style={{ marginBottom: 4, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            <Translate id="myCollection.header.title">我的收藏</Translate>
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 14, marginBottom: 0 }}>
            <Translate id="myCollection.header.subtitle">管理您创建的提示词、收藏的内容和自定义标签</Translate>
          </Paragraph>
        </div>

        {/* Level Badge - Only show when logged in
            mini spec chip — 和 /user 的 spec card 一脉相承：accent 色 tinted bg + hairline border
            + SVG geometric icon + mono "L04" 编号 + level name。
            放弃原 gradient 满色填充（loud），改为 calm editorial 系统统一语言 */}
        {userAuth && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px",
              borderRadius: 12,
              background: `${levelInfo.accentColor}14`,
              border: `1px solid ${levelInfo.accentColor}40`,
            }}>
            <LevelIcon level={levelInfo.level} size={13} color={levelInfo.accentColor} strokeWidth={1.5} />
            <span
              style={{
                fontSize: 11,
                color: levelInfo.accentColor,
                letterSpacing: "0.12em",
                fontWeight: 600,
                fontFamily: "var(--site-font-mono)",
                fontVariantNumeric: "tabular-nums",
              }}>
              L{String(levelInfo.level).padStart(2, "0")}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--ifm-color-content)",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}>
              <LevelName level={levelInfo.level} />
            </span>
          </div>
        )}
      </Flex>

      {userAuth && (
        <Card
          style={{
            borderRadius: 12,
            border: "1px solid var(--site-color-hairline)",
            background: "var(--ifm-background-surface-color)",
          }}
          styles={{ body: { padding: "16px 24px" } }}>
          <Flex justify="space-around" align="center" wrap="wrap" gap={16}>
            <StatItem icon={<AppstoreOutlined />} label={<Translate id="myCollection.stats.total">总计</Translate>} value={totalItems} color={cyan[4]} />
            <StatDivider />
            <StatItem icon={<EditOutlined />} label={<Translate id="myCollection.stats.prompts">我的提示词</Translate>} value={totalPrompts} color={green[4]} />
            <StatDivider />
            <StatItem icon={<HeartOutlined />} label={<Translate id="myCollection.stats.favorites">收藏</Translate>} value={totalFavorites} color={red[4]} />
            <StatDivider />
            <StatItem icon={<TagOutlined />} label={<Translate id="myCollection.stats.tags">自定义标签</Translate>} value={totalTags} color={blue[4]} />
          </Flex>
        </Card>
      )}
    </div>
  );
};

const MyCollectionView: React.FC<{ onOpenModal: (data: any) => void }> = ({ onOpenModal }) => {
  const { userAuth } = useContext(AuthContext);
  const { viewMode } = useViewMode();

  // 从缓存初始化 stats，避免刷新时显示 0；用 lazy initializer 让 getCache 只在 mount 时调用一次
  const [stats, setStats] = React.useState(() => {
    const cached = typeof window !== "undefined" ? getCache("myspace_stats") : null;
    return cached || { totalItems: 0, totalPrompts: 0, totalFavorites: 0, totalTags: 0 };
  });

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

  // 仅在 collection 模式才显示 MySpace（避免不必要的 API 调用）
  return (
    <div className="container margin-top--md">
      <PageHeader userAuth={userAuth} {...stats} />
      <Suspense fallback={null}>
        <MySpace onOpenModal={onOpenModal} onDataLoaded={handleDataLoaded} />
      </Suspense>
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
      cleanupLegacyCache();
    }
  }, []);

  // SSR 安全的站点级 schema.org
  // - WebSite + SearchAction：让 ChatGPT/Perplexity/Google 在 SERP 直接激活站内搜索框
  // - Organization + sameAs：建立知识图谱实体关联（GitHub repo）
  // - SoftwareApplication：让 LLM 在"工具推荐"答案中考虑 AiShort
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
  // schema.org 要 BCP-47：读 docusaurus.config.js localeConfigs[locale].htmlLang（覆盖 ind→id 这种历史命名）
  const bcp47Locale = toBcp47(i18n.currentLocale, i18n.localeConfigs);
  const homeUrl = `${siteConfig.url}${localePrefix}/`;
  const orgId = `${siteConfig.url}/#organization`;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: homeUrl,
        name: SITE_NAME,
        description: DESCRIPTION,
        inLanguage: bcp47Locale,
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
        alternateName: ["ChatGPT Shortcut", "AI Short"],
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
        inLanguage: bcp47Locale,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        {/* X 官方文档（2026 仍生效）说 twitter: 标签与 og: 「类似但不完全相同」，建议同时提供；fallback 到 og: 不应作唯一方案 */}
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title={SITE_NAME} />
        <link rel="llms-txt" href="/llms.txt" />
        <script type="application/ld+json">{toJsonLd(websiteSchema)}</script>
      </Head>
      <main className="margin-vert--md">
        <ShowcaseContent />
        <Suspense fallback={null}>
          <ShareButtons shareUrl={shareUrl} title={TITLE} popOver={false} />
        </Suspense>
      </main>
    </Layout>
  );
}
