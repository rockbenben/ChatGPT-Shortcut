import React, { useContext, useEffect, useState, useCallback, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { useFavorite } from "@site/src/hooks/useFavorite";

import { useLocation } from "@docusaurus/router";
import SearchBar from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";
import { getCommPrompts, voteOnUserPrompt } from "@site/src/api";
import LoginComponent from "@site/src/components/user/login";
import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import { Modal, Typography, Pagination, App, Flex, Segmented, FloatButton, Row, Col, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { COMMU_TITLE, COMMU_DESCRIPTION, SITE_NAME } from "@site/src/data/constants";
import PromptCard from "@site/src/components/PromptCard";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";
const PromptDetailModal = React.lazy(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));

const ShareButtons = React.lazy(() => import("@site/src/components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));

const { Text } = Typography;

const pageSize = 12;

interface CommunityPromptItem {
  id: number;
  title: string;
  owner: string;
  remark?: string;
  notes?: string;
  description: string;
  upvotes?: number;
  downvotes?: number;
  upvoteDifference?: number;
}

const CommunityPrompts = () => {
  const { userAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const location = useLocation();
  const { siteConfig, i18n } = useDocusaurusContext();
  // SSR 安全的 CollectionPage schema（仅框架，items 是客户端 fetch 的，故省略）
  const localePrefix = i18n.currentLocale && i18n.currentLocale !== i18n.defaultLocale ? `/${i18n.currentLocale}` : "";
  const pageUrl = `${siteConfig.url}${localePrefix}/community-prompts`;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: COMMU_TITLE,
        description: COMMU_DESCRIPTION,
        inLanguage: i18n.currentLocale,
        isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}/#website` },
        // 社区搜索现在公开，加 SearchAction 让 LLM/搜索引擎能引导用户搜社区内容
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${pageUrl}?name={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${siteConfig.url}${localePrefix}/` },
          { "@type": "ListItem", position: 2, name: COMMU_TITLE, item: pageUrl },
        ],
      },
    ],
  };
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userprompts, setUserPrompts] = useState<CommunityPromptItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  // 直接读 window.location.href，随路由变化自然更新；避免旧方案的 useMemo 空依赖导致 share link 停留在初次 URL
  const ShareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name !== searchTerm) {
      setSearchTerm(name || "");
      setCurrentPage(1);
    }
  }, [location.search]);

  // cancelled flag 防止过期请求在新 effect 触发后覆盖 state；错误直接 surface，用户通过翻页/排序/搜索自己触发重试
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const result = await getCommPrompts(currentPage, pageSize, sortField, "desc", searchTerm);
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
        // key 去重：快速连续失败不会堆叠多个 toast
        messageApi.error({ content: "Failed to fetch data", key: "comm-fetch-error" });
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

  // 本次会话的投票记录（防止 API 请求期间重复点击）
  const sessionVotedIdsRef = React.useRef<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  // 用 ref 持有最新 userAuth / userprompts，让 vote 保持稳定引用（不因每次投票后 userprompts 变化而重建，避免 PromptCard 跟着 re-render）
  const userAuthRef = React.useRef(userAuth);
  userAuthRef.current = userAuth;
  const userpromptsRef = React.useRef(userprompts);
  userpromptsRef.current = userprompts;

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
          setUserPrompts((prev) =>
            prev.map((prompt) =>
              prompt.id === promptId
                ? { ...prompt, upvotes, downvotes, upvoteDifference: upvotes - downvotes }
                : prompt,
            ),
          );
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

  return (
    <Layout title={COMMU_TITLE} description={COMMU_DESCRIPTION}>
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Head>
      <main className="margin-vert--md">
        <section className="margin-top--sm margin-bottom--sm">
          <div className="container padding-vert--md">
            {/* Breadcrumb — plain, matches community-prompt detail page style */}
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to="/" style={{ color: "var(--ifm-color-primary)" }}>
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

            {/* Sort + Search — same row; search fills remaining space via flex: 1 */}
            <Flex wrap="wrap" gap="middle" align="center" style={{ marginBottom: 24 }}>
              <Segmented
                options={[
                  { value: "id", label: translate({ id: "sort.newest", message: "最新发布" }) },
                  { value: "upvoteDifference", label: translate({ id: "sort.mostUpvoted", message: "最多赞" }) },
                ]}
                value={sortField}
                onChange={(value) => {
                  setSortField(value as string);
                  setCurrentPage(1);
                }}
              />
              <div style={{ flex: 1, minWidth: 240 }}>
                <SearchBar beforeSearch={handleBeforeSearch} />
              </div>
            </Flex>

            {loading ? (
              <PromptCardSkeleton count={pageSize} />
            ) : userprompts.length === 0 ? (
              <Flex justify="center" align="center" style={{ minHeight: 300, width: "100%" }}>
                <NoResults />
              </Flex>
            ) : (
              <Row gutter={[16, 16]}>
                {userprompts.map((commuPrompt) => {
                  const isBookmarked = userAuth?.data?.favorites?.commLoves?.includes(commuPrompt.id);
                  return (
                    <Col key={commuPrompt.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                      <PromptCard type="community" data={commuPrompt} onVote={vote} isFavorite={isBookmarked} onToggleFavorite={(id) => bookmark(Number(id))} onOpenModal={onOpenModal} />
                    </Col>
                  );
                })}
              </Row>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
              <Pagination current={currentPage} pageSize={pageSize} total={total} showQuickJumper showSizeChanger={false} onChange={onChangePage} />
            </div>

            <Suspense fallback={null}>
              <AdComponent type="transverse" />
            </Suspense>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 16, marginBottom: -24 }}>
              <Text type="secondary" style={{ fontSize: "12px", textAlign: "center", maxWidth: 800 }}>
                <Translate id="communityPrompts.disclaimer">社区成员分享 · 观点不代表本项目</Translate>
              </Text>
            </div>

            {open && (
              <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
                <LoginComponent />
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
            <FloatButton.BackTop />
          </div>
        </section>
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
