/**
 * 首页共享实现 —— 由 src/pages/index.tsx 与 i18n/<locale>/docusaurus-plugin-content-pages/index.tsx
 * 共 18 个薄壳页面复用，模式与 PromptPage（prompt 详情页薄壳）一致。
 *
 * locale 数据必须由页面薄壳静态导入后经 props 传入：Docusaurus 每个 locale 独立构建，
 * 静态导入留在各自页面文件里，才能保证每个语言只打包自己的 favor/other JSON（首页按
 * locale 拆页的初衷）。切勿在本文件 import 任何 locale 数据，也不要用模板路径动态
 * require（会把 18 份 JSON 全部打进 bundle）。
 */
import React, { useContext, useState, useMemo, useEffect, useCallback, useRef, Suspense, startTransition } from "react";
import { ViewModeContext, useViewMode, type ViewMode } from "@site/src/contexts/ViewModeContext";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useHistory, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";
import { voteLoginRequiredText, voteAlreadyVotedText, voteSuccessText, voteFailedText } from "@site/src/utils/voteMessages";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

import { Button, Typography, Flex, Row, Col, Card, Tooltip } from "antd";
import { useAppFeedback } from "@site/src/contexts/AppFeedbackContext";
import { DownOutlined, UpOutlined, AppstoreOutlined, HeartOutlined, HeartFilled, EditOutlined, TagOutlined, CloseOutlined, WarningOutlined, StarFilled } from "@ant-design/icons";

import ShowcaseTagSelect from "@site/src/components/ShowcaseTagSelect";
import ShowcaseFilterToggle from "@site/src/components/ShowcaseFilterToggle";
import { EmptyState } from "@site/src/components/EmptyState";

import UserStatus from "@site/src/components/user/UserStatus";
import type { MySpaceStats } from "@site/src/components/user/myspace/types";
import SearchBar, { useFilteredPrompts, useClearFilters, prepareUserState } from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";

import styles from "@site/src/pages/styles.module.css";
import { getWeight } from "@site/src/utils/formatters";
import { getCache, setCache, CACHE_TTL, cleanupLegacyCache } from "@site/src/utils/cache";
import { getLevelInfo, LevelName, LevelIcon } from "@site/src/components/LevelSystem";

import { AuthContext } from "@site/src/components/AuthContext";
import { fetchCardsByIds, fetchNextCards, type CardData } from "@site/src/api/homepage";

import { Tags, TagList, type TagType } from "@site/src/data/tags";
import { SLOGAN, SUPPORTED_AI_TOOLS, TITLE, DESCRIPTION, DEFAULT_FAVORITE_IDS, ALL_IDS, SITE_NAME } from "@site/src/data/constants";
import { toBcp47 } from "@site/src/utils/i18n";
import { toJsonLd } from "@site/src/utils/jsonLd";
import PromptCard from "@site/src/components/PromptCard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";
import { DeferredFloatingShare } from "@site/src/components/DeferredFloatingShare";

const PromptDetailModal = lazyWithRetry(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));
// MySpace 仅在 collection 视图 + 登录态下渲染，未登录访客（占大多数流量）不需要
const MySpace = lazyWithRetry(() => import("@site/src/components/user/MySpace"));

const { Title, Paragraph } = Typography;

// ==================== 页面头部组件 ====================
const ShowcaseHeader = () => (
  <section className={clsx("text--center", styles.heroSection)}>
    <div className="hideOnSmallScreen">
      <Title
        level={1}
        style={{
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginBottom: 6,
          color: "var(--ifm-color-content)",
        }}>
        AI Short
      </Title>
      <p style={{ fontSize: 16, maxWidth: 560, margin: "0 auto 4px", lineHeight: 1.5, color: "var(--ifm-color-content-secondary)" }}>{SLOGAN}</p>
      <div
        aria-label="Supported AI tools"
        style={{
          fontSize: 12.5,
          color: "var(--site-color-text-tertiary)",
          letterSpacing: "0.02em",
          marginBottom: 14,
        }}>
        <Translate id="hero.supportedAiTools" values={{ tools: SUPPORTED_AI_TOOLS.join(" · ") }}>
          {"{tools} 等"}
        </Translate>
      </div>
    </div>
    <p className="showOnSmallScreen mobile-hero-slogan" style={{ fontSize: 13, maxWidth: 320, margin: "0 auto 8px", lineHeight: 1.45, color: "var(--ifm-color-content-secondary)" }}>
      {SLOGAN}
    </p>
    <Flex align="center" justify="center" wrap gap={8} className={styles.heroActions}>
      <UserStatus />
    </Flex>
  </section>
);

// 高频核心分类（默认单行显示，其余可点击展开）
const PRIMARY_TAGS: TagType[] = ["write", "article", "code", "ai", "language", "tool", "pedagogy", "company"];

// ==================== 筛选组件 ====================
const ShowcaseFilters: React.FC = React.memo(() => {
  const [showAllTags, setShowAllTags] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const toggleAllTags = useCallback(() => {
    setShowAllTags((prev) => !prev);
  }, []);

  const modifiedTagList = useMemo(() => {
    return TagList.filter((tag) => tag !== "contribute");
  }, []);

  const modifiedTagSet = useMemo(() => new Set<string>(modifiedTagList), [modifiedTagList]);

  const selectedTags = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.getAll("tags").filter((tag) => modifiedTagSet.has(tag)) as TagType[];
  }, [location.search, modifiedTagSet]);

  const visibleTags = useMemo(() => {
    if (showAllTags) return modifiedTagList;
    const primarySet = new Set<TagType>(PRIMARY_TAGS);
    const primary = PRIMARY_TAGS.filter((t) => modifiedTagSet.has(t));
    const activeExtras = selectedTags.filter((t) => !primarySet.has(t));
    return [...primary, ...activeExtras];
  }, [showAllTags, modifiedTagList, modifiedTagSet, selectedTags]);

  const extraCount = modifiedTagList.length - visibleTags.length;

  const handleSelectAllTags = useCallback(() => {
    const params = new URLSearchParams(location.search);
    if (!params.has("tags")) return;
    params.delete("tags");
    params.delete("operator");
    history.push({
      ...location,
      search: params.toString(),
      state: prepareUserState(),
    });
  }, [location, history]);

  // 与无结果空状态共用同一份定义：同屏两个「清除筛选」必须清同样的东西、显示同样的数字
  const { activeFilterCount, clearFilters } = useClearFilters();

  return (
    <section className={clsx("container", styles.filterSection)}>
      <div className={styles.filterBar}>
        <div className={clsx(styles.filterRow, showAllTags && styles.filterRowExpanded)}>
          <div className={clsx(styles.checkboxList, showAllTags && styles.checkboxListExpanded)}>
            <div className={styles.checkboxListItem}>
              <button
                type="button"
                className={clsx(styles.allTagPill, selectedTags.length === 0 && styles.allTagPillActive)}
                aria-pressed={selectedTags.length === 0}
                onClick={handleSelectAllTags}>
                <Translate id="myspace.filter.all">全部</Translate>
              </button>
            </div>
            {visibleTags.map((tag) => {
              const { label, description } = Tags[tag];
              const id = `showcase_checkbox_id_${tag}`;

              return (
                <div key={tag} className={styles.checkboxListItem}>
                  <Tooltip title={description} mouseEnterDelay={0.4}>
                    <ShowcaseTagSelect tag={tag} id={id} label={label} />
                  </Tooltip>
                </div>
              );
            })}
          </div>
          {(extraCount > 0 || showAllTags) && (
            <div className={styles.moreTagsWrap}>
              <Button
                type="text"
                size="small"
                onClick={toggleAllTags}
                icon={showAllTags ? <UpOutlined /> : <DownOutlined />}
                className={styles.moreTagsBtn}>
                {showAllTags ? (
                  <Translate id="filter.lessTags">收起</Translate>
                ) : (
                  <Translate id="filter.moreTags" values={{ count: extraCount }}>
                    {"更多分类 ({count})"}
                  </Translate>
                )}
              </Button>
            </div>
          )}
        </div>

        {(selectedTags.length >= 2 || activeFilterCount > 0) && (
          <div className={styles.filterMetaRow}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {activeFilterCount > 0 && (
                <Button
                  type="link"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={clearFilters}
                  style={{ padding: 0, height: "auto", fontSize: 12, color: "var(--site-color-tag-selected-text)" }}>
                  <Translate id="action.clearFilters" values={{ count: activeFilterCount }}>
                    {"清除筛选 ({count})"}
                  </Translate>
                </Button>
              )}
            </div>
            {selectedTags.length >= 2 && <ShowcaseFilterToggle />}
          </div>
        )}
      </div>
    </section>
  );
});

// ==================== 卡片列表组件 ====================
// SSG 数据经 props 注入：各 locale 页面静态导入自己的默认数据后传入（构建时嵌入，避免首屏 CLS）
type HomepageCard = Pick<CardData, "id" | "count" | "weight">;

interface HomeData {
  defaultFavorData: HomepageCard[];
  defaultOtherData: HomepageCard[];
}

const cardOrder = new Map(ALL_IDS.map((id, index) => [id, index]));

interface ShowcaseCardsProps extends HomeData {
  onOpenModal: (data: any) => void;
}

const ShowcaseCards: React.FC<ShowcaseCardsProps> = React.memo(({ onOpenModal, defaultFavorData, defaultOtherData }) => {
  const { userAuth, getUserAuth, authLoading } = useContext(AuthContext);
  const { toggleFavorite } = useFavorite();
  const { message: messageApi } = useAppFeedback();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;

  // 读 userAuth 走 context 的 getUserAuth()：回调保持稳定引用（不因后台 SWR 刷新而重建），
  // 且拿到的一定是权威当前值。自持 useRef(userAuth) 是渲染期快照——收藏走 startTransition
  // 发布新 state，快照要等 commit 才更新，这段窗口内再点一次会误判 add/remove，
  // 直接多打一发 PATCH /favorites/me 和一次投票请求。
  const isLoggedIn = !!userAuth;

  // SSG 卡片、续载和收藏详情共用一份数据，分组始终从当前收藏状态推导。
  const [loadedCards, setLoadedCards] = useState(() => new Map(
    [...defaultFavorData, ...defaultOtherData].map((card) => [card.id, card]),
  ));
  const loadedCardsRef = useRef(loadedCards);
  const addLoadedCards = useCallback((cards: HomepageCard[]) => {
    const current = loadedCardsRef.current;
    const missing = cards.filter((card) => !current.has(card.id));
    if (missing.length === 0) return;
    const next = new Map(current);
    for (const card of missing) next.set(card.id, card);
    loadedCardsRef.current = next;
    setLoadedCards(next);
  }, []);

  const signedInFavoriteIds: number[] | undefined = userAuth?.data?.favorites?.loves;
  const showcaseFavoriteIds = signedInFavoriteIds ?? DEFAULT_FAVORITE_IDS;
  const favoriteIdSet = useMemo(() => new Set(signedInFavoriteIds), [signedInFavoriteIds]);
  const { favoritePrompts, otherPrompts } = useMemo(() => {
    const favoritePrompts = showcaseFavoriteIds.map((id) => loadedCards.get(id)).filter((card) => card !== undefined);
    const favoriteIds = new Set(showcaseFavoriteIds);
    const otherPrompts = [...loadedCards.values()].filter((card) => !favoriteIds.has(card.id));
    otherPrompts.sort((a, b) => (cardOrder.get(a.id) ?? ALL_IDS.length) - (cardOrder.get(b.id) ?? ALL_IDS.length));
    return { favoritePrompts, otherPrompts };
  }, [loadedCards, showcaseFavoriteIds]);

  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreFailed, setLoadMoreFailed] = useState(false);
  const BATCH_SIZE = 12;

  const hasMoreDataRef = useRef(hasMoreData);
  const isLoadingMoreRef = useRef(isLoadingMore);

  const sessionVotedIdsRef = React.useRef<Set<string>>(new Set());
  const [voteDeltas, setVoteDeltas] = useState<Record<string | number, { upvoteDelta: number; downvoteDelta: number }>>({});

  // 稳定的投票回调（使用 ref 避免因 userAuth 变化而重建）
  const vote = useCallback(
    async (promptId: number | string, action: "upvote" | "downvote") => {
      if (!getUserAuth()) {
        messageApi.warning(voteLoginRequiredText());
        return;
      }

      const voteKey = `${promptId}_${action}`;
      if (sessionVotedIdsRef.current.has(voteKey)) {
        messageApi.info(voteAlreadyVotedText(action));
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
        const { voteOnUserPrompt } = await import("@site/src/api/prompts");
        await voteOnUserPrompt(Number(promptId), action);
        messageApi.success(voteSuccessText(action));
      } catch (err) {
        sessionVotedIdsRef.current.delete(voteKey);
        setVoteDeltas((prev) => ({
          ...prev,
          [promptId]: {
            upvoteDelta: (prev[promptId]?.upvoteDelta || 0) - delta.upvoteDelta,
            downvoteDelta: (prev[promptId]?.downvoteDelta || 0) - delta.downvoteDelta,
          },
        }));
        const errorMessage = err?.strapiMessage || voteFailedText(action);
        messageApi.error(errorMessage);
      }
    },
    [messageApi],
  );

  // 收藏切换：add/remove 的判定在 useFavorite 内部完成（读权威值），这里只透传
  const handleToggleFavorite = toggleFavorite;
  const handleCommToggleFavorite = useCallback((id: string | number, isComm: boolean) => toggleFavorite(Number(id), isComm), [toggleFavorite]);

  // 组件卸载时清除投票记录，防止内存泄漏
  useEffect(() => {
    return () => {
      sessionVotedIdsRef.current.clear();
    };
  }, []);

  const loadFavoriteCards = useCallback(async () => {
    const user = getUserAuth()?.data;
    const favoriteIds: number[] = user?.favorites?.loves ?? [];
    const missing = favoriteIds.filter((id) => !loadedCardsRef.current.has(id));
    if (missing.length === 0) return;

    const cards = await fetchCardsByIds(missing, currentLanguage);
    const currentUser = getUserAuth()?.data;
    if (currentUser?.id !== user?.id) return;
    const currentFavorites = new Set<number>(currentUser?.favorites?.loves);
    addLoadedCards(cards.filter((card) => currentFavorites.has(card.id)));
  }, [addLoadedCards, currentLanguage, getUserAuth]);

  // 加载更多数据（滚动触发），也用于失败后的页尾重试。
  const loadMoreData = useCallback(async () => {
    if (isLoadingMoreRef.current) {
      return;
    }

    setIsLoadingMore(true);
    isLoadingMoreRef.current = true;
    setLoadMoreFailed(false);

    try {
      await loadFavoriteCards();
      if (!hasMoreDataRef.current) return;

      const nextCards = await fetchNextCards([...loadedCardsRef.current.keys()], BATCH_SIZE, currentLanguage);

      if (nextCards.length === 0) {
        setHasMoreData(false);
        hasMoreDataRef.current = false;
      } else {
        addLoadedCards(nextCards);
      }
    } catch (error) {
      console.error("Error loading more prompts:", error);
      setLoadMoreFailed(true);
    } finally {
      setIsLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  }, [addLoadedCards, currentLanguage, loadFavoriteCards]);

  useEffect(() => {
    if (authLoading || !signedInFavoriteIds?.length) return;
    let active = true;
    void loadFavoriteCards().catch((error) => {
      if (!active) return;
      console.error("Error loading user prompts:", error);
      setLoadMoreFailed(true);
    });
    return () => { active = false; };
  }, [authLoading, signedInFavoriteIds, loadFavoriteCards]);

  const { filteredCommus, filteredCards, isFiltered, isSearching, searchFailed, retry: retrySearch } = useFilteredPrompts();

  const FILTERED_BATCH_SIZE = 24;
  const [filteredVisibleCount, setFilteredVisibleCount] = useState(FILTERED_BATCH_SIZE);
  const filteredMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredVisibleCount(FILTERED_BATCH_SIZE);
  }, [filteredCards, filteredCommus]);

  const visibleFilteredCards = useMemo(() => filteredCards.slice(0, filteredVisibleCount), [filteredCards, filteredVisibleCount]);
  const hasMoreFiltered = filteredVisibleCount < filteredCards.length;

  useEffect(() => {
    if (!isFiltered || isSearching || !hasMoreFiltered || !filteredMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.at(-1)?.isIntersecting) {
          startTransition(() => setFilteredVisibleCount((n) => n + FILTERED_BATCH_SIZE));
        }
      },
      { root: null, rootMargin: "400px", threshold: 0.1 },
    );

    observer.observe(filteredMoreRef.current);
    return () => observer.disconnect();
  }, [isFiltered, isSearching, hasMoreFiltered, filteredVisibleCount]);

  // Intersection Observer for auto-loading more cards
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // 每批提交或个性化数据替换后重新观察：触发器若一直在预加载范围内，不会产生第二次相交事件。
  // 切回未筛选视图也要重新观察新节点。加载失败时等待用户重试，避免连续请求同一个失败的 chunk。
  useEffect(() => {
    if (isFiltered || isLoadingMore || loadMoreFailed || !hasMoreData || !loadMoreTriggerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Chrome may deliver the initial and post-scroll entries for this target together.
        if (entries.at(-1)?.isIntersecting && !isLoadingMoreRef.current) {
          loadMoreData();
        }
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0.1,
      },
    );

    observer.observe(loadMoreTriggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [favoritePrompts, otherPrompts, hasMoreData, isLoadingMore, loadMoreFailed, loadMoreData, isFiltered]);

  // 注意：不要把卡片 map 成 {...user, _cachedWeight} 新对象——无限滚动每追加一批，
  // useMemo 会为数组中【全部】元素（含已渲染卡片）生成新引用，使 PromptCard 的 React.memo
  // 整体失效，每批次重渲染整张网格（O(N)）。getWeight 仅 `count ?? weight ?? 0`，O(1)，
  // 直接在渲染处内联即可（与下方 filteredCards 分支一致），data 沿用原始稳定引用以保住 memo。

  // 预计算收藏 ID 集合，O(1) 查找代替 O(n) includes
  const userPromptIdSet = useMemo(() => new Set<number>(userAuth?.data?.userprompts?.map((p: any) => p.id) || []), [userAuth?.data?.userprompts]);
  const commFavoriteIdSet = useMemo(() => new Set<number>(userAuth?.data?.favorites?.commLoves || []), [userAuth?.data?.favorites?.commLoves]);

  // filteredCommus 被新一轮搜索/筛选拉取替换后，其计数已含投票后的服务端真值（voteOnUserPrompt 已写 pm_ 缓存）。
  // 此时若保留 voteDeltas 再叠加，会把同一票算两次（投票→改筛选使该卡重现→显示 +2）。
  // 投票本身不改 filteredCommus 引用，故此 reset 不会清掉刚做的乐观更新。
  useEffect(() => {
    // 已经空的时候不要再写一个新对象：Object.is 对 {} 恒不成立，每次都写都会强推一次渲染。
    // 这条 effect 只应在 filteredCommus 真正换引用时触发——SearchBar 侧已改为非筛选态
    // 保持引用，所以"点一次收藏"不会再无谓地走到这里；剩下的都是筛选结果真的变了。
    setVoteDeltas((prev) => (Object.keys(prev).length === 0 ? prev : {}));
  }, [filteredCommus]);

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
        <div className="container padding-vert--md">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          {isSearching ? (
            <PromptCardSkeleton count={8} />
          ) : searchFailed ? (
            // 搜索失败 ≠ 没有匹配项：分开渲染，别让「没找到」顶替失败。
            // 必须给一条出路：重新提交同一个搜索词是 no-op（SearchBar 不 push 历史），
            // 没有重试按钮的话，失败态就是死路，用户只能刷新整页。
            <EmptyState
              icon={<WarningOutlined />}
              title={<Translate id="message.loadFailed">加载数据失败，请稍后重试</Translate>}
              action={
                <Button type="primary" onClick={retrySearch}>
                  <Translate id="action.retry">重试</Translate>
                </Button>
              }
            />
          ) : (
            <NoResults />
          )}
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
                  {/* 未登录时这里是编辑精选（DEFAULT_FAVORITE_IDS），不是用户的收藏；英文区块标题沿用品牌样式。 */}
                  <Title
                    level={2}
                    className="hideOnSmallScreen"
                    style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    {isLoggedIn ? (
                      <HeartFilled aria-hidden style={{ color: "var(--site-color-svg-icon-favorite)", fontSize: 16 }} />
                    ) : (
                      <StarFilled aria-hidden style={{ color: "var(--ifm-color-primary)", fontSize: 16 }} />
                    )}
                    {isLoggedIn ? "Favorites" : "Featured"}
                  </Title>
                  <SearchBar />
                </div>
                <Row gutter={[16, 16]}>
                  {favoritePrompts.map((user, index) => (
                    <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6} className={index >= 4 ? styles.cardDeferred : undefined}>
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
            <div style={{ paddingBottom: 10, marginBottom: 16, borderBottom: "1px solid var(--site-color-hairline)" }}>
              {/* 「All Prompts」同 Favorites，英文区块标题，刻意不译 */}
              <Title level={2} style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>
                All Prompts
              </Title>
            </div>
            <Row gutter={[16, 16]}>
              {otherPrompts.map((user, index) => {
                const isNew = index >= prevOtherCountRef.current;
                const isBelowFold = index >= 4;
                return (
                  <React.Fragment key={user.id}>
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={6}
                      className={clsx(isNew && styles.cardEnter, isBelowFold && styles.cardDeferred)}
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
            {loadMoreFailed && !isLoadingMore && (
              <div role="status">
                <EmptyState
                  compact
                  title={<Translate id="message.loadFailed">加载数据失败，请稍后重试</Translate>}
                  action={
                    <Button onClick={() => void loadMoreData()}>
                      <Translate id="action.retry">重试</Translate>
                    </Button>
                  }
                />
              </div>
            )}
            {isLoadingMore && (
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <PromptCardSkeleton count={4} fixedCount />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="container">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          {isSearching ? (
            // 搜索中：上一轮的结果还留在 filteredCards/filteredCommus 里，直接渲染就是
            // 把上一次查询的卡片摆到新查询下面（与 community-prompts 的 contentQueryKey
            // 同一原则）。用骨架屏占位，等新一轮结果到了再换回卡片。
            <PromptCardSkeleton count={8} />
          ) : (
            <>
              <Row gutter={[16, 16]}>
              {filteredCommusWithDeltas.map((user, index) => {
                const isUserPrompt = userPromptIdSet.has(user.id);
                const isFavorite = commFavoriteIdSet.has(user.id);

                return (
                  <React.Fragment key={user.id}>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} className={index >= 4 ? styles.cardDeferred : undefined}>
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
                  </React.Fragment>
                );
              })}
              {visibleFilteredCards.map((user, index) => (
                <React.Fragment key={user.id}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} className={(filteredCommus.length + index) >= 4 ? styles.cardDeferred : undefined}>
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
              {hasMoreFiltered && <div ref={filteredMoreRef} style={{ height: 1, marginTop: 24 }} />}
            </>
          )}
        </div>
      )}
    </section>
  );
});

// ==================== 公共提示词浏览视图 ====================
const ExploreView: React.FC<HomeData & { onOpenModal: (data: any) => void }> = ({ onOpenModal, defaultFavorData, defaultOtherData }) => {
  return (
    <>
      <ShowcaseFilters />
      <ShowcaseCards onOpenModal={onOpenModal} defaultFavorData={defaultFavorData} defaultOtherData={defaultOtherData} />
    </>
  );
};

// ==================== 个人收藏视图 ====================
// Stat bar — 单 accent 体系：图标/数字全中性（原 cyan/green/red/blue 四色已收敛），
// 数字用 content 主色 + mono，和卡片统计同语言；区分靠图标形状 + label。
const StatItem: React.FC<{ icon: React.ReactNode; label: React.ReactNode; value: number }> = ({ icon, label, value }) => (
  <div style={{ textAlign: "center", minWidth: 80 }}>
    <div
      style={{
        fontSize: 12,
        color: "var(--site-color-text-tertiary)",
        marginBottom: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}>
      <span aria-hidden style={{ fontSize: 12 }}>
        {icon}
      </span>
      <span>{label}</span>
    </div>
    <div
      style={{
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 1.1,
        fontFamily: "var(--site-font-mono)",
        fontVariantNumeric: "tabular-nums",
        color: "var(--ifm-color-content)",
      }}>
      {value}
    </div>
  </div>
);

const StatDivider: React.FC = () => <div style={{ width: 1, height: 40, background: "var(--site-color-hairline)" }} />;

const PageHeader: React.FC<MySpaceStats & {
  userAuth: any;
}> = ({ userAuth, totalItems, totalPrompts, totalFavorites }) => {
  // 标签定义直接取会话状态，保存定义时无需重新加载卡片即可更新统计。
  const totalTags = userAuth?.data?.customTags?.length ?? 0;
  // Level system based on shared prompts count
  const sharedCount = userAuth?.data?.userprompts?.filter((p: any) => p.share)?.length || 0;
  const levelInfo = getLevelInfo(sharedCount);

  return (
    /* 移动端整块隐藏：标题 + 副标题 + 等级徽章 + 4 项统计在窄屏会占掉大半首屏，
       列表本身才是内容。此前 87c9d753 把这个 class 拿掉、只留标题、把徽章和统计
       重新藏起来 —— 移动端就只剩一个没有任何信息的空标题。现已改回整块隐藏。 */
    <div style={{ marginBottom: 24 }} className="hideOnSmallScreen">
      {/* Title and Level Badge Row */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <div>
          <Title level={2} style={{ marginBottom: 4, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            <Translate id="myCollection.header.title">我的收藏</Translate>
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 14, marginBottom: 0 }}>
            <Translate id="myCollection.header.subtitle">管理你创建的提示词、收藏的内容和自定义标签</Translate>
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
              // accentColor 现在是 var(--site-level-N)，不能再用 `${hex}14` 拼透明度
              background: `color-mix(in srgb, ${levelInfo.accentColor} 8%, transparent)`,
              border: `1px solid color-mix(in srgb, ${levelInfo.accentColor} 25%, transparent)`,
              // LevelIcon 内部把颜色写在 SVG 的 stroke/fill 属性上，presentation attribute 不解析
              // var()，所以这里给父级设 color，图标走默认的 currentColor 继承下去
              color: levelInfo.accentColor,
            }}>
            <LevelIcon level={levelInfo.level} size={13} strokeWidth={1.5} />
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
            boxShadow: "var(--site-shadow-xs)",
          }}
          styles={{ body: { padding: "16px 24px" } }}>
          <Flex justify="space-around" align="center" wrap="wrap" gap={16}>
            <StatItem icon={<AppstoreOutlined />} label={<Translate id="myCollection.stats.total">总计</Translate>} value={totalItems} />
            <StatDivider />
            <StatItem icon={<EditOutlined />} label={<Translate id="myCollection.stats.prompts">我的提示词</Translate>} value={totalPrompts} />
            <StatDivider />
            <StatItem icon={<HeartOutlined />} label={<Translate id="myCollection.stats.favorites">收藏</Translate>} value={totalFavorites} />
            <StatDivider />
            <StatItem icon={<TagOutlined />} label={<Translate id="myCollection.stats.tags">自定义标签</Translate>} value={totalTags} />
          </Flex>
        </Card>
      )}
    </div>
  );
};

const MyCollectionView: React.FC<HomeData & { onOpenModal: (data: any) => void }> = ({ onOpenModal, defaultFavorData, defaultOtherData }) => {
  const { userAuth } = useContext(AuthContext);
  const { viewMode } = useViewMode();

  // 从缓存初始化 stats，避免刷新时显示 0；用 lazy initializer 让 getCache 只在 mount 时调用一次
  const [stats, setStats] = React.useState<MySpaceStats>(() => {
    const cached = typeof window !== "undefined" ? getCache("myspace_stats") : null;
    return cached || { totalItems: 0, totalPrompts: 0, totalFavorites: 0 };
  });

  // 从 MySpace 组件接收数据更新（避免重复请求）
  const handleDataLoaded = React.useCallback((newStats: MySpaceStats) => {
    setStats(newStats);
    // 缓存 stats
    setCache("myspace_stats", newStats, CACHE_TTL.MYSPACE);
  }, []);

  // 如果切换到浏览模式，显示公共浏览
  if (viewMode === "explore") {
    return <ExploreView onOpenModal={onOpenModal} defaultFavorData={defaultFavorData} defaultOtherData={defaultOtherData} />;
  }

  // 仅在 collection 模式才显示 MySpace（避免不必要的 API 调用）
  return (
    <div className={clsx("container", styles.collectionSection)}>
      <PageHeader userAuth={userAuth} {...stats} />
      <Suspense fallback={<PromptCardSkeleton count={8} />}>
        <MySpace onOpenModal={onOpenModal} onDataLoaded={handleDataLoaded} />
      </Suspense>
    </div>
  );
};

// ==================== 主内容组件 ====================
const ShowcaseContent: React.FC<HomeData> = ({ defaultFavorData, defaultOtherData }) => {
  const { userAuth, authLoading } = useContext(AuthContext);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
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

      // 走 startTransition 低优调度，避免 setTimeout 人为延迟拖慢交互响应（INP）
      startTransition(() => {
        setViewMode(newMode);
      });
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
      <div>
        {userAuth ? (
          <MyCollectionView onOpenModal={handleOpenModal} defaultFavorData={defaultFavorData} defaultOtherData={defaultOtherData} />
        ) : (
          <ExploreView onOpenModal={handleOpenModal} defaultFavorData={defaultFavorData} defaultOtherData={defaultOtherData} />
        )}
      </div>
      {modalData && (
        <Suspense fallback={null}>
          <PromptDetailModal open={modalOpen} onCancel={() => setModalOpen(false)} afterClose={() => setModalData(null)} data={modalData} />
        </Suspense>
      )}
    </ViewModeContext.Provider>
  );
};

export default function HomePage({ defaultFavorData, defaultOtherData }: HomeData): React.ReactElement {
  const { siteConfig, i18n } = useDocusaurusContext();

  // 空闲期预加载详情弹窗组件并清理过期缓存，避免 mount 阶段阻塞主线程
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    const idleTask = () => {
      cleanupLegacyCache();
      import("@site/src/components/PromptDetailModal");
    };
    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(idleTask, { timeout: 3000 });
      return () => (window as any).cancelIdleCallback(handle);
    }
    const timer = setTimeout(idleTask, 1500);
    return () => clearTimeout(timer);
  }, []);

  // SSR 安全的站点级 schema.org
  // - WebSite + SearchAction：让 ChatGPT/Perplexity/Google 在 SERP 直接激活站内搜索框
  // - Organization + sameAs：建立知识图谱实体关联（GitHub repo）
  // - SoftwareApplication：让 LLM 在"工具推荐"答案中考虑 AiShort
  const websiteSchemaJson = useMemo(() => {
    const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
    // schema.org 要 BCP-47：读 docusaurus.config.js localeConfigs[locale].htmlLang（覆盖 ind→id 这种历史命名）
    const bcp47Locale = toBcp47(i18n.currentLocale, i18n.localeConfigs);
    const homeUrl = `${siteConfig.url}${localePrefix}/`;
    const orgId = `${siteConfig.url}/#organization`;

    return toJsonLd({
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
    });
  }, [i18n.currentLocale, i18n.defaultLocale, i18n.localeConfigs, siteConfig.url]);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        {/* X 官方文档（2026 仍生效）说 twitter: 标签与 og: 「类似但不完全相同」，建议同时提供；fallback 到 og: 不应作唯一方案 */}
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title={SITE_NAME} />
        <link rel="llms-txt" href="/llms.txt" />
        <script type="application/ld+json">{websiteSchemaJson}</script>
      </Head>
      <main className={clsx("margin-vert--md", styles.homeMain)}>
        <ShowcaseContent defaultFavorData={defaultFavorData} defaultOtherData={defaultOtherData} />
      </main>
      <DeferredFloatingShare title={TITLE} />
    </Layout>
  );
}
