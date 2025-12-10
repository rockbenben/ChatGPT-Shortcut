import React, { useContext, useEffect, useState, useCallback, Suspense, useMemo } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { useFavorite } from "@site/src/hooks/useFavorite";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@site/src/components/SearchBar";
import { NoResults } from "@site/src/components/SearchBar/NoResults";
import { getCommPrompts, voteOnUserPrompt } from "@site/src/api";
import LoginComponent from "@site/src/components/user/login";
import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import Layout from "@theme/Layout";
import { Modal, Typography, Pagination, Space, Button, App, Flex, Segmented, FloatButton, theme, Row, Col, Skeleton } from "antd";
import { UpOutlined, DownOutlined, HomeOutlined, LoginOutlined, FireOutlined, ClockCircleOutlined, AppstoreOutlined } from "@ant-design/icons";
import { COMMU_TITLE, COMMU_DESCRIPTION } from "@site/src/data/constants";
import PromptCard from "@site/src/components/PromptCard";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";
const PromptDetailModal = React.lazy(() => import("@site/src/components/PromptDetailModal").then((m) => ({ default: m.PromptDetailModal })));

const ShareButtons = React.lazy(() => import("@site/src/components/ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));

const { Text } = Typography;

const pageSize = 12;

interface PromptCardProps {
  commuPrompt: {
    id: number;
    title: string;
    owner: string;
    remark?: string;
    notes?: string;
    description: string;
    upvotes?: number;
    downvotes?: number;
    upvoteDifference?: number;
  };
}

const CommunityPrompts = () => {
  const { token } = theme.useToken();
  const { userAuth, authLoading } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userprompts, setUserPrompts] = useState<PromptCardProps["commuPrompt"][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  // Shareurl 使用 useMemo 避免额外的渲染周期
  const Shareurl = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name !== searchTerm) {
      setSearchTerm(name || "");
      setCurrentPage(1);
    }
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage, pageSize, sortField, sortOrder, searchTerm);
  }, [currentPage, sortField, sortOrder, searchTerm]);

  const fetchData = useCallback(
    async (currentPage, pageSize, sortField, sortOrder, searchTerm) => {
      try {
        const result = await getCommPrompts(currentPage, pageSize, sortField, sortOrder, searchTerm);
        if (result && result[0].length > 0) {
          setUserPrompts(result[0]);
          setTotal(result[1].pagination.total);
        } else if (result && result[0].length === 0) {
          setUserPrompts([]);
          setTotal(0);
        }
      } catch (error) {
        console.error("Failed to fetch community prompts:", error);
        messageApi.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [messageApi]
  );

  const handleBeforeSearch = useCallback(() => {
    if (!userAuth) {
      setOpen(true);
      messageApi.warning("Please log in to search.");
      return false;
    }
    return true;
  }, [userAuth, messageApi]);

  // 本次会话的投票记录（防止 API 请求期间重复点击）
  const sessionVotedIdsRef = React.useRef<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  const vote = useCallback(
    async (promptId: number, action: "upvote" | "downvote") => {
      // 未登录时引导登录
      if (!userAuth) {
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
      const originalPrompt = userprompts.find((p) => p.id === promptId);

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
            : prompt
        )
      );

      try {
        const response = await voteOnUserPrompt(promptId, action);

        // 使用后端返回的实际数据更新 UI
        if (response?.data?.counts) {
          const { upvotes, downvotes } = response.data.counts;
          setUserPrompts((prev) =>
            prev.map((prompt) =>
              prompt.id === promptId
                ? {
                    ...prompt,
                    upvotes,
                    downvotes,
                    upvoteDifference: upvotes - downvotes,
                  }
                : prompt
            )
          );
        }

        messageApi.success(`Successfully ${action}d!`);
      } catch (err) {
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
                : prompt
            )
          );
        }
        const errorMessage = err?.strapiMessage || `Failed to ${action}. Please try again.`;
        messageApi.error(errorMessage);
      }
    },
    [userAuth, messageApi, userprompts]
  );

  const bookmark = useCallback(
    async (promptId) => {
      if (userAuth?.data?.favorites?.commLoves?.includes(promptId)) {
        confirmRemoveFavorite(promptId, true);
      } else {
        addFavorite(promptId, true);
      }
    },
    [userAuth?.data?.favorites?.commLoves, confirmRemoveFavorite, addFavorite]
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
      <main className="margin-vert--md">
        <section className="margin-top--sm margin-bottom--sm">
          <div className="container padding-vert--md">
            <div
              style={{
                marginBottom: 24,
                padding: "16px 24px",
                background: token.colorBgContainer,
                borderRadius: token.borderRadiusLG,
                border: `1px solid ${token.colorBorderSecondary}`,
                boxShadow: token.boxShadowTertiary,
              }}>
              <Flex wrap="wrap" gap="middle" justify="space-between" align="center">
                <Space>
                  <Link to="/" style={{ display: "flex", alignItems: "center", color: token.colorTextSecondary }}>
                    <Button type="text" icon={<HomeOutlined />} style={{ paddingLeft: 0 }}>
                      <Translate id="link.home">返回首页</Translate>
                    </Button>
                  </Link>
                  {authLoading ? (
                    <Skeleton.Button active size="default" style={{ width: 100 }} />
                  ) : userAuth ? (
                    <Link to="/user/center" style={{ display: "flex", alignItems: "center", color: token.colorTextSecondary }}>
                      <Button type="text" icon={<AppstoreOutlined />}>
                        <Translate id="link.myCenter">个人中心</Translate>
                      </Button>
                    </Link>
                  ) : (
                    <Button type="primary" icon={<LoginOutlined />} onClick={() => setOpen(true)}>
                      <Translate id="button.login">登录</Translate>
                    </Button>
                  )}
                </Space>

                <Flex gap="small" align="center" wrap="wrap">
                  <Segmented
                    options={[
                      { label: translate({ id: "field.id", message: "发布时间" }), value: "id", icon: <ClockCircleOutlined /> },
                      { label: translate({ id: "field.upvoteDifference", message: "支持度" }), value: "upvoteDifference", icon: <FireOutlined /> },
                    ]}
                    value={sortField}
                    onChange={(value) => {
                      setSortField(value as string);
                      setCurrentPage(1);
                    }}
                  />
                  <Segmented
                    options={[
                      { label: translate({ id: "order.descending", message: "降序" }), value: "desc", icon: <DownOutlined /> },
                      { label: translate({ id: "order.ascending", message: "升序" }), value: "asc", icon: <UpOutlined /> },
                    ]}
                    value={sortOrder}
                    onChange={(value) => {
                      setSortOrder(value as string);
                      setCurrentPage(1);
                    }}
                  />
                  <SearchBar beforeSearch={handleBeforeSearch} />
                </Flex>
              </Flex>
            </div>

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
                {translate({
                  id: "info.communityPrompts",
                  message: "本页面提示词由网友分享上传。我们不对内容的准确性、质量或完整性做出保证，也不承担因内容引发的法律责任。如发现侵权或其他问题，请联系我们处理。",
                })}
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
              <ShareButtons shareUrl={Shareurl} title={COMMU_TITLE} popOver={false} />
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
