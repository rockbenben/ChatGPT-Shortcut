import React, { useContext, useEffect, useState, useCallback, useMemo, useRef, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { voteAlreadyVotedText, voteSuccessText, voteFailedText } from "@site/src/utils/voteMessages";
import { useFavorite } from "@site/src/hooks/useFavorite";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";
import { getCommPrompts, voteOnUserPrompt } from "@site/src/api";
import { AuthContext } from "@site/src/components/AuthContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import { Modal, Pagination, App, Flex, Segmented, FloatButton, Row, Col, Breadcrumb, Skeleton, Button } from "antd";
import { HomeOutlined, WarningOutlined } from "@ant-design/icons";
import { COMMU_TITLE, COMMU_DESCRIPTION, SITE_NAME } from "@site/src/data/constants";
import { toBcp47 } from "@site/src/utils/i18n";
import { toJsonLd } from "@site/src/utils/jsonLd";
import { EmptyState } from "@site/src/components/EmptyState";
import PromptCard from "@site/src/components/PromptCard";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";
import styles from "@site/src/pages/styles.module.css";
import { primeCacheFromSnapshot, communitySnapshot, COMMUNITY_PAGE_SIZE, type CommunitySortField, type CommunityPrompt } from "@site/src/utils/snapshotPrime";
import { lazyWithRetry, lazyOptional } from "@site/src/utils/lazyRetry";
const PromptDetailModal = lazyWithRetry(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));

const ShareButtons = lazyOptional(() => import("@site/src/components/ShareButtons"));
const AdComponent = lazyOptional(() => import("@site/src/components/AdComponent"));
// LoginComponent (520 行 + antd Form/Card/Input) 仅当未登录用户打开登录 Modal 才渲染
const LoginComponent = lazyWithRetry(() => import("@site/src/components/user/login"));

interface SnapshotView {
  items: CommunityPrompt[];
  total: number;
}

// snapshot 文件里 byNewest/byUpvoted 只存 ids；items 从 byId 拼出，避免 JSON 里同一条 prompt 被存两遍
// 快照只覆盖首页 + 默认排序，避免分页/搜索/异常排序的旧数据污染
// 空 stub 兜底：fresh clone 时 ensure-only 写出 ids=[] 的占位 JSON，此时返回 null
// 让初始渲染走 skeleton + API 兜底，避免闪一下「无结果」
function getSnapshotView(page: number, sortField: CommunitySortField, searchTerm: string): SnapshotView | null {
  if (page !== 1 || searchTerm) return null;
  const index = sortField === "id" ? communitySnapshot.byNewest : sortField === "upvoteDifference" ? communitySnapshot.byUpvoted : null;
  if (!index || index.ids.length === 0) return null;

  const items = index.ids.map((id) => communitySnapshot.byId[String(id)]).filter(Boolean);
  if (items.length === 0) return null;
  return { items, total: index.total };
}

const CommunityPrompts = () => {
  const { userAuth, getUserAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { toggleFavorite } = useFavorite();
  const location = useLocation();
  const { siteConfig, i18n } = useDocusaurusContext();
  // 页面级静态信息（locale + siteConfig.url 在组件生命周期内稳定），合并到一个 useMemo
  // 避免每次 vote/copy/翻页 re-render 都重建对象 + JSON.stringify
  const { pageUrl, collectionSchemaJson, localePrefix } = useMemo(() => {
    const pfx = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
    const url = `${siteConfig.url}${pfx}/community-prompts`;
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": url,
          url,
          name: COMMU_TITLE,
          description: COMMU_DESCRIPTION,
          inLanguage: toBcp47(i18n.currentLocale, i18n.localeConfigs),
          isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}/#website` },
          // 社区搜索现在公开，加 SearchAction 让 LLM/搜索引擎能引导用户搜社区内容
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: `${url}?name={search_term_string}` },
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${siteConfig.url}${pfx}/` },
            { "@type": "ListItem", position: 2, name: COMMU_TITLE, item: url },
          ],
        },
      ],
    };
    return { pageUrl: url, collectionSchemaJson: toJsonLd(schema), localePrefix: pfx };
  }, [i18n.currentLocale, i18n.defaultLocale, i18n.localeConfigs, siteConfig.url]);
  // 默认视图（page=1, sort=id, 无搜索）从构建期快照初始化，让 SSG HTML 里就含真实卡片，
  // 把 LCP 元素从「等 API 后渲染的 PromptCard」前移到 HTML 解析阶段
  // useMemo 保证仅初始计算一次：仅 useState 默认值用，subsequent render 不重建 12 项数组
  // 空闲期预加载详情弹窗组件，大幅消除用户点击卡片时的网络延迟与 INP 交互卡顿
  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const preload = () => {
        import("@site/src/components/PromptDetailModal");
      };
      if ("requestIdleCallback" in window) {
        const handle = (window as any).requestIdleCallback(preload, { timeout: 3000 });
        return () => (window as any).cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(preload, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const initialSnapshot = useMemo(() => getSnapshotView(1, "id", ""), []);
  const [open, setOpen] = useState(false);
  const [userprompts, setUserPrompts] = useState<CommunityPrompt[]>(initialSnapshot?.items ?? []);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(initialSnapshot?.total ?? 0);
  const [sortField, setSortField] = useState<CommunitySortField>("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  // 手动重试：改这个计数器触发上面的数据 effect 重跑
  const [retryNonce, setRetryNonce] = useState(0);
  // 重试是否在飞：重试期间禁用按钮，避免连点发出多次绕过节流的请求
  const [retrying, setRetrying] = useState(false);
  // 显式重试标记：用户点「重试」后置 true，让这一轮请求绕过 api 层的失败抑制窗口
  // （失败后 60 分钟内的调用直接吃缓存、不重发请求 —— 那不叫重试）。
  const retryForceRef = useRef(false);
  // 本次请求对应的查询键
  const queryKey = `${currentPage}|${sortField}|${searchTerm}`;
  // 当前屏幕上的卡片属于哪一次查询（页码|排序|搜索词）。
  // 换了搜索词/排序/页码之后请求失败时，旧卡片属于上一次查询 —— 留着展示等于
  // 拿不相干的内容冒充本次结果（与谎报「没有找到」同一类问题）。
  // ref 给 async 回调读（闭包里的 state 可能是上一轮的旧值），state 给渲染读。
  // 初始值用同一个 queryKey 模板算，不要手写 "1|id|"：模板一改，手写那份就会静默对不上，
  // 快照内容会被当成「别的查询」清掉。
  const [contentQueryKey, setContentQueryKey] = useState<string>(() => (initialSnapshot ? `${currentPage}|${sortField}|${searchTerm}` : ""));
  const contentQueryKeyRef = useRef<string>(contentQueryKey);
  // 请求失败归属的查询键：失败的是哪一次查询，就只对那一次查询成立。
  // 记键而不是记布尔：换了查询之后，上一次查询的失败不能再让新查询显示错误面板。
  const [failedQueryKey, setFailedQueryKey] = useState<string | null>(null);

  // 渲染期推导，不靠 effect 里写旗标：passive effect 跑在 paint 之后，
  // 只在 effect 里武装/清除的话，新查询的首帧会拿上一次查询的卡片或失败态冒充本次结果。
  const contentBelongsToQuery = contentQueryKey === queryKey;
  const isCurrentQueryFailed = failedQueryKey === queryKey;
  // 失败态的两条出路共用：重试必须带 force（绕过 api 层 60 分钟失败抑制窗），
  // 并在飞期间禁用按钮，避免连点把请求放大。
  const retry = useCallback(() => {
    retryForceRef.current = true;
    setRetrying(true);
    setRetryNonce((n) => n + 1);
  }, []);
  // 直接读 window.location.href，随路由变化自然更新；避免旧方案的 useMemo 空依赖导致 share link 停留在初次 URL
  const ShareUrl = typeof window !== "undefined" ? window.location.href : "";

  // useState 已经直接用 initialSnapshot seed 进 state；数据 useEffect 第一次跑时
  // state 跟 snapshot 完全一致，重复 setUserPrompts 只会触发一次无意义的 parent re-render
  // （byId items refs 稳定 → PromptCard 全 bail，但 reconciliation 仍跑一次）
  const skipNextSnapshotFill = useRef<boolean>(!!initialSnapshot);

  // 本次会话的投票记录（防止 API 请求期间重复点击）
  const sessionVotedIdsRef = useRef<Set<string>>(new Set());

  // userAuth 读 context 的 getUserAuth()（权威当前值，且不会因渲染期快照而滞后）；
  // userprompts 是本页局部 state，继续用 ref 让 vote 保持稳定引用，
  // 避免每次投票后 PromptCard 全量 re-render
  const userpromptsRef = useRef(userprompts);
  userpromptsRef.current = userprompts;

  // 把 snapshot 当上次 fetch 的结果塞进 lscache：列表层带 ETag、详情层带真 updatedAt。
  // 让数据 useEffect 的 getCommPrompts 首次访问就命中（throttle/304），
  // 同时让用户后续点详情卡片也免一次 bulk POST。
  // 务必排在数据 useEffect 之前（React 按声明顺序执行）。
  useEffect(() => {
    primeCacheFromSnapshot();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name !== searchTerm) {
      setSearchTerm(name || "");
      setCurrentPage(1);
    }
  }, [location.search]);

  // cancelled flag 防止过期请求在新 effect 触发后覆盖 state。
  // 失败按 queryKey 归属：屏幕上没有本次查询的内容 → 错误面板（带重试，强制绕过 api 层的失败抑制窗口）；
  // 已有本次查询的内容（同查询的后台刷新失败）→ 保留内容 + 一条 key 去重的 toast。
  // 快照命中时（首页 + 默认排序 + 无搜索词）走 SWR：立即用快照填充，后台静默刷新。
  useEffect(() => {
    let cancelled = false;
    // 本轮是否由「重试」触发：显式重试要真发一次请求，绕过 api 层的失败抑制窗口。
    const force = retryForceRef.current;
    retryForceRef.current = false;
    // 首次 mount：useState 已用 initialSnapshot seed 同样数据，跳过重复 set 减少一次 parent reconciliation
    const wasSeeded = skipNextSnapshotFill.current;
    skipNextSnapshotFill.current = false;

    const snapshotView = wasSeeded ? null : getSnapshotView(currentPage, sortField, searchTerm);
    // 快照只在「屏幕上还没有本次查询的内容」时填：同一次查询的后台刷新（重试、切语言）
    // 再填一遍快照，会拿构建期的旧数据盖掉刚拉到的活数据。
    if (!wasSeeded && snapshotView && contentQueryKeyRef.current !== queryKey) {
      setUserPrompts(snapshotView.items);
      setTotal(snapshotView.total);
      // 快照只覆盖第 1 页 + 默认排序 + 无搜索，记录它对应的查询键
      setContentQueryKey(queryKey);
      contentQueryKeyRef.current = queryKey;
    }
    // 换了查询（页码/排序/搜索词）就清掉上一轮的内容：留着旧卡片会让用户以为
    // 这些就是本次查询的结果。失败时下方据 contentQueryKey 判定并显示错误态。
    if (contentQueryKeyRef.current !== queryKey) {
      setUserPrompts([]);
      setContentQueryKey("");
      contentQueryKeyRef.current = "";
      setFailedQueryKey(null);
    }

    (async () => {
      try {
        const result = await getCommPrompts(currentPage, COMMUNITY_PAGE_SIZE, sortField, "desc", searchTerm, { force });
        if (cancelled) return;
        // total 一律取服务端 pagination.total，不要因为本页 0 条就写成 0：
        // 越界页（如第 9999 页）服务端仍返回真实总数，客户端写成 0 会把分页器
        // 整个压扁成 1 页，用户再也回不去。搜索无结果时服务端返回的也是 0，两者一致。
        setTotal(result?.[1]?.pagination?.total ?? 0);
        setUserPrompts(result?.[0] ?? []);
        setContentQueryKey(queryKey);
        contentQueryKeyRef.current = queryKey;
        setFailedQueryKey(null);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to fetch community prompts:", error);
        // 失败归属本次查询：换了查询之后，这次失败就不再让新查询显示错误面板。
        setFailedQueryKey(queryKey);
        // 失败信号二选一，不重复也不静默：
        // 屏幕上没有本次查询的内容 → 下方的错误面板接管，toast 会重复；
        // 屏幕上还有本次查询的内容（同一次查询的后台刷新失败）→ 错误面板不渲染，
        // 只有 toast 能告诉用户这次刷新没成功，否则用户会静默看到过期数据。
        if (contentQueryKeyRef.current === queryKey) {
          // key 去重：快速连续失败不会堆叠多个 toast
          messageApi.error({ content: translate({ id: "community.fetchError", message: "获取数据失败" }), key: "comm-fetch-error" });
        }
      } finally {
        // 重试一旦落地（成功/失败）就解除按钮的 loading
        if (!cancelled) setRetrying(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentPage, sortField, searchTerm, messageApi, retryNonce, queryKey]);

  // 公开搜索：community prompts 是用户主动分享的公开内容，搜索无需登录
  // 投票/收藏仍需登录（在 vote / addFavorite 内部检查）
  const handleBeforeSearch = useCallback(() => true, []);

  const vote = useCallback(
    async (promptId: number, action: "upvote" | "downvote") => {
      // 未登录时直接弹登录框，与社区详情页同一套反馈。之前这里在框之外还叠一句
      // 3 秒即散的「请先登录后再投票」toast —— 框已经开了，再报一句是重复反馈。
      if (!getUserAuth()) {
        setOpen(true);
        return;
      }

      // 防止 API 请求期间重复点击（后端会处理实际的重复投票逻辑）
      const voteKey = `${promptId}_${action}`;
      if (sessionVotedIdsRef.current.has(voteKey)) {
        messageApi.info(voteAlreadyVotedText(action));
        return;
      }
      sessionVotedIdsRef.current.add(voteKey);

      // 保存原始数据用于回滚
      const originalPrompt = userpromptsRef.current.find((p) => p.id === promptId);

      // Optimistic UI: 立即更新
      setUserPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === promptId
            ? {
                ...prompt,
                upvotes: action === "upvote" ? (prompt.upvotes || 0) + 1 : prompt.upvotes,
                downvotes: action === "downvote" ? (prompt.downvotes || 0) + 1 : prompt.downvotes,
                upvoteDifference: (prompt.upvoteDifference || 0) + (action === "upvote" ? 1 : -1),
              }
            : prompt,
        ),
      );

      try {
        const response = await voteOnUserPrompt(promptId, action);

        // 使用后端返回的实际数据更新 UI
        if (response?.data?.counts) {
          const { upvotes, downvotes } = response.data.counts;
          setUserPrompts((prev) => prev.map((prompt) => (prompt.id === promptId ? { ...prompt, upvotes, downvotes, upvoteDifference: upvotes - downvotes } : prompt)));
        }

        messageApi.success(voteSuccessText(action));
      } catch (err: any) {
        // 回滚到原始数据并移除会话标记
        sessionVotedIdsRef.current.delete(voteKey);
        if (originalPrompt) {
          setUserPrompts((prev) =>
            prev.map((prompt) =>
              prompt.id === promptId
                ? {
                    ...prompt,
                    upvotes: originalPrompt.upvotes,
                    downvotes: originalPrompt.downvotes,
                    upvoteDifference: originalPrompt.upvoteDifference,
                  }
                : prompt,
            ),
          );
        }
        const errorMessage = err?.strapiMessage || voteFailedText(action);
        messageApi.error(errorMessage);
      }
    },
    [messageApi],
  );

  // add/remove 的判定在 useFavorite 内部用权威值完成，调用点不再自行分支
  const bookmark = useCallback(async (promptId) => toggleFavorite(promptId, true), [toggleFavorite]);

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const onOpenModal = useCallback((data: any) => {
    setModalData(data);
    setModalOpen(true);
  }, []);

  // PromptCard 透传给 onToggleFavorite 的 callback：用 useCallback 锁住引用，
  // 避免 inline lambda 让 12 张 React.memo 卡片每次父级 re-render 都失效
  const onToggleFavorite = useCallback((id: string | number) => bookmark(Number(id)), [bookmark]);

  // 收藏 ID Set：12 张卡的 isFavorite 查询从 O(n) Array.includes 改 O(1) Set.has
  const commLovesSet = useMemo(() => new Set<number>(userAuth?.data?.favorites?.commLoves ?? []), [userAuth?.data?.favorites?.commLoves]);

  return (
    <Layout title={COMMU_TITLE} description={COMMU_DESCRIPTION}>
      <Head>
        {/* X 官方建议 twitter: 与 og: 同时提供（fallback 不完全等价） */}
        <meta name="twitter:title" content={COMMU_TITLE} />
        <meta name="twitter:description" content={COMMU_DESCRIPTION} />
        <script type="application/ld+json">{collectionSchemaJson}</script>
      </Head>
      <main className="margin-vert--md">
        <section className="margin-top--sm margin-bottom--sm">
          <div className="container padding-vert--md">
            {/* Breadcrumb — plain, matches community-prompt detail page style */}
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to="/" style={{ color: "var(--site-color-tag-selected-text)" }}>
                      <HomeOutlined style={{ marginRight: 4 }} />
                      <Translate id="link.home">首页</Translate>
                    </Link>
                  ),
                },
                {
                  title: <Translate id="link.communityPrompts">社区提示词</Translate>,
                },
              ]}
              style={{ marginBottom: 12, paddingLeft: 8, paddingRight: 8 }}
            />

            {/* H1 + tagline — 给 AI 引擎主标题 chunk 入口；视觉上简洁不抢主体 */}
            <div style={{ marginBottom: 24, paddingLeft: 8, paddingRight: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, color: "var(--ifm-color-content)" }}>
                <Translate id="community.heading">AI 提示词社区</Translate>
              </h1>
              <h2 style={{ marginTop: 6, marginBottom: 0, fontSize: 14, fontWeight: 500, color: "var(--site-color-text-tertiary)", lineHeight: 1.55 }}>
                <Translate id="community.tagline">由用户投稿与分享的 AI 提示词。按最新发布或最多赞排序，支持搜索筛选，登录后可点赞与收藏。</Translate>
              </h2>
            </div>

            {/* H2 — Sort + Search 区段标题，给 AI 引擎第二个 chunk 入口 */}

            {/* Sort + Search — same row; search fills remaining space via flex: 1 */}
            <Flex wrap="wrap" gap="middle" align="center" style={{ marginBottom: 24 }}>
              <Segmented
                options={[
                  { value: "id", label: translate({ id: "sort.newest", message: "最新发布" }) },
                  { value: "upvoteDifference", label: translate({ id: "sort.mostUpvoted", message: "最多赞" }) },
                ]}
                value={sortField}
                onChange={(value) => {
                  setSortField(value as CommunitySortField);
                  setCurrentPage(1);
                }}
              />
              <div style={{ flex: 1, minWidth: 240 }}>
                <SearchBar beforeSearch={handleBeforeSearch} />
              </div>
            </Flex>

            {/* 三态按「归属的查询键」在渲染期判定，不用 effect 里写的旗标：
                ① 本次查询失败、且屏幕上没有本次查询的内容 → 错误面板
                ② 屏幕上没有本次查询的内容 → 骨架屏（正在拉本次查询）
                ③ 有本次查询的内容 → 按内容渲染（空则 NoResults）
                ② 这一支是关键：passive effect 跑在 paint 之后，只在 effect 里清旧卡片，
                新查询的首帧会拿上一次查询的卡片冒充本次结果。 */}
            {/* 同查询的后台刷新失败：内容保留（把好数据换成错误面板更糟），
                但必须给一条能真正重发请求的出路 —— 普通请求会被 api 层的
                60 分钟失败抑制窗吞掉，只有「重试」带 force。 */}
            {isCurrentQueryFailed && contentBelongsToQuery && (
              <Flex align="center" justify="space-between" gap={12} style={{ marginBottom: 12, padding: "8px 12px", border: "1px solid var(--site-color-hairline)", borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: "var(--ifm-color-content-secondary)" }}>
                  <Translate id="message.loadFailed">加载数据失败，请稍后重试</Translate>
                </span>
                <Button size="small" onClick={retry} loading={retrying}>
                  <Translate id="action.retry">重试</Translate>
                </Button>
              </Flex>
            )}
            {isCurrentQueryFailed && !contentBelongsToQuery ? (
              // 请求失败 ≠ 没有匹配项：分开渲染，别让 NoResults 的「没找到」顶替失败。
              <Flex justify="center" align="center" style={{ minHeight: 300, width: "100%" }}>
                <EmptyState
                  icon={<WarningOutlined />}
                  title={<Translate id="community.fetchError">获取数据失败</Translate>}
                  description={<Translate id="community.fetchErrorDesc">网络或服务暂时不可用，请稍后重试</Translate>}
                  action={
                    <Button type="primary" onClick={retry} loading={retrying}>
                      <Translate id="action.retry">重试</Translate>
                    </Button>
                  }
                />
              </Flex>
            ) : !contentBelongsToQuery ? (
              <PromptCardSkeleton count={COMMUNITY_PAGE_SIZE} />
            ) : userprompts.length === 0 ? (
              <Flex justify="center" align="center" style={{ minHeight: 300, width: "100%" }}>
                <NoResults />
              </Flex>
            ) : (
              <Row gutter={[16, 16]}>
                {userprompts.map((commuPrompt, index) => (
                  <Col key={commuPrompt.id} xs={24} sm={12} md={8} lg={6} xl={6} className={index >= 4 ? styles.cardDeferred : undefined}>
                    <PromptCard
                      type="community"
                      data={commuPrompt}
                      onVote={vote}
                      isFavorite={commLovesSet.has(commuPrompt.id)}
                      isLoggedIn={!!userAuth}
                      onToggleFavorite={onToggleFavorite}
                      onOpenModal={onOpenModal}
                    />
                  </Col>
                ))}
              </Row>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
              <Pagination current={currentPage} pageSize={COMMUNITY_PAGE_SIZE} total={total} showQuickJumper align="center" showSizeChanger={false} onChange={onChangePage} />
            </div>

            {/* 广告 — speedup 分支专属（disclaimer 已挪到 site footer） */}
            <Suspense fallback={null}>
              <AdComponent type="transverse" />
            </Suspense>

            {open && (
              <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
                <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
                  <LoginComponent />
                </Suspense>
              </Modal>
            )}
            {modalOpen && (
              <Suspense fallback={null}>
                <PromptDetailModal open={modalOpen} onCancel={() => setModalOpen(false)} data={modalData} />
              </Suspense>
            )}
            <Suspense fallback={null}>
              <ShareButtons shareUrl={ShareUrl} title={COMMU_TITLE} popOver={false} />
            </Suspense>
            {/* BackTop 上推 60px，避免与 ShareButtons FloatButton.Group（默认 bottom=40）重叠 */}
            <FloatButton.BackTop style={{ bottom: 100 }} />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default function WrappedCommunityPrompts() {
  return <CommunityPrompts />;
}
