import React, { useContext, useEffect, useState, useCallback, useMemo, useRef, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { useFavorite } from "@site/src/hooks/useFavorite";

import { useLocation } from "@docusaurus/router";
import SearchBar from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";
import { getCommPrompts, voteOnUserPrompt } from "@site/src/api";
import { AuthContext } from "@site/src/components/AuthContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import { Modal, Typography, Pagination, App, Flex, Segmented, FloatButton, Row, Col, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { COMMU_TITLE, COMMU_DESCRIPTION, SITE_NAME } from "@site/src/data/constants";
import { toBcp47 } from "@site/src/utils/i18n";
import PromptCard from "@site/src/components/PromptCard";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";
import { primeCacheFromSnapshot, communitySnapshot, COMMUNITY_PAGE_SIZE, type CommunitySortField, type CommunityPrompt } from "@site/src/utils/snapshotPrime";
const PromptDetailModal = React.lazy(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));

const ShareButtons = React.lazy(() => import("@site/src/components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));
// LoginComponent (520 行 + antd Form/Card/Input) 仅当未登录用户打开登录 Modal 才渲染
const LoginComponent = React.lazy(() => import("@site/src/components/user/login"));

const { Text } = Typography;

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
  const { userAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
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
    return { pageUrl: url, collectionSchemaJson: JSON.stringify(schema), localePrefix: pfx };
  }, [i18n.currentLocale, i18n.defaultLocale, i18n.localeConfigs, siteConfig.url]);
  // 默认视图（page=1, sort=id, 无搜索）从构建期快照初始化，让 SSG HTML 里就含真实卡片，
  // 把 LCP 元素从「等 API 后渲染的 PromptCard」前移到 HTML 解析阶段
  // useMemo 保证仅初始计算一次：仅 useState 默认值用，subsequent render 不重建 12 项数组
  const initialSnapshot = useMemo(() => getSnapshotView(1, "id", ""), []);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(!initialSnapshot);
  const [userprompts, setUserPrompts] = useState<CommunityPrompt[]>(initialSnapshot?.items ?? []);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(initialSnapshot?.total ?? 0);
  const [sortField, setSortField] = useState<CommunitySortField>("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  // 直接读 window.location.href，随路由变化自然更新；避免旧方案的 useMemo 空依赖导致 share link 停留在初次 URL
  const ShareUrl = typeof window !== "undefined" ? window.location.href : "";

  // useState 已经直接用 initialSnapshot seed 进 state；数据 useEffect 第一次跑时
  // state 跟 snapshot 完全一致，重复 setUserPrompts 只会触发一次无意义的 parent re-render
  // （byId items refs 稳定 → PromptCard 全 bail，但 reconciliation 仍跑一次）
  const skipNextSnapshotFill = useRef<boolean>(!!initialSnapshot);

  // 本次会话的投票记录（防止 API 请求期间重复点击）
  const sessionVotedIdsRef = useRef<Set<string>>(new Set());

  // 用 ref 持有最新 userAuth / userprompts，让 vote 保持稳定引用（不因每次投票后 userprompts 变化而重建，避免 PromptCard 跟着 re-render）
  const userAuthRef = useRef(userAuth);
  userAuthRef.current = userAuth;
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

  // cancelled flag 防止过期请求在新 effect 触发后覆盖 state；错误直接 surface，用户通过翻页/排序/搜索自己触发重试
  // 快照命中时（首页 + 默认排序）走 SWR：立即用快照填充，后台静默刷新；命中失败则保留原 skeleton 体验
  useEffect(() => {
    let cancelled = false;
    // 首次 mount：useState 已用 initialSnapshot seed 同样数据，跳过重复 set 减少一次 parent reconciliation
    const wasSeeded = skipNextSnapshotFill.current;
    skipNextSnapshotFill.current = false;

    const snapshotView = wasSeeded ? null : getSnapshotView(currentPage, sortField, searchTerm);
    if (!wasSeeded) {
      if (snapshotView) {
        setUserPrompts(snapshotView.items);
        setTotal(snapshotView.total);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    // 错误兜底用：seed/snapshot 任一命中都视为已有可见内容，避免 toast 遮挡卡片
    const hasVisibleContent = wasSeeded || !!snapshotView;

    (async () => {
      try {
        const result = await getCommPrompts(currentPage, COMMUNITY_PAGE_SIZE, sortField, "desc", searchTerm);
        if (cancelled) return;
        if (result && result[0].length > 0) {
          setUserPrompts(result[0]);
          setTotal(result[1].pagination.total);
        } else if (result && result[0].length === 0) {
          setUserPrompts([]);
          setTotal(0);
        }
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to fetch community prompts:", error);
        if (!hasVisibleContent) {
          // key 去重：快速连续失败不会堆叠多个 toast
          messageApi.error({ content: "Failed to fetch data", key: "comm-fetch-error" });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentPage, sortField, searchTerm, messageApi]);

  // 公开搜索：community prompts 是用户主动分享的公开内容，搜索无需登录
  // 投票/收藏仍需登录（在 vote / addFavorite 内部检查）
  const handleBeforeSearch = useCallback(() => true, []);

  const vote = useCallback(
    async (promptId: number, action: "upvote" | "downvote") => {
      // 未登录时引导登录
      if (!userAuthRef.current) {
        messageApi.warning("Please log in to vote.");
        setOpen(true);
        return;
      }

      // 防止 API 请求期间重复点击（后端会处理实际的重复投票逻辑）
      const voteKey = `${promptId}_${action}`;
      if (sessionVotedIdsRef.current.has(voteKey)) {
        messageApi.info(`You have already ${action}d this prompt in this session.`);
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

        messageApi.success(`Successfully ${action}d!`);
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
        const errorMessage = err?.strapiMessage || `Failed to ${action}. Please try again.`;
        messageApi.error(errorMessage);
      }
    },
    [messageApi],
  );

  const bookmark = useCallback(
    async (promptId) => {
      if (userAuth?.data?.favorites?.commLoves?.includes(promptId)) {
        confirmRemoveFavorite(promptId, true);
      } else {
        addFavorite(promptId, true);
      }
    },
    [userAuth?.data?.favorites?.commLoves, confirmRemoveFavorite, addFavorite],
  );

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

            {loading ? (
              <PromptCardSkeleton count={COMMUNITY_PAGE_SIZE} />
            ) : userprompts.length === 0 ? (
              <Flex justify="center" align="center" style={{ minHeight: 300, width: "100%" }}>
                <NoResults />
              </Flex>
            ) : (
              <Row gutter={[16, 16]}>
                {userprompts.map((commuPrompt) => (
                  <Col key={commuPrompt.id} xs={24} sm={12} md={8} lg={6} xl={6}>
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
              <Pagination current={currentPage} pageSize={COMMUNITY_PAGE_SIZE} total={total} showQuickJumper showSizeChanger={false} onChange={onChangePage} />
            </div>

            {/* 广告 — speedup 分支专属（disclaimer 已挪到 site footer） */}
            <Suspense fallback={null}>
              <AdComponent type="transverse" />
            </Suspense>

            {open && (
              <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
                <Suspense fallback={null}>
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
