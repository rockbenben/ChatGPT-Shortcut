import React, { useContext, useState, useCallback, useMemo, useEffect, useLayoutEffect, Suspense } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Button, Modal, App, Dropdown, Space, Skeleton } from "antd";
import { useViewMode } from "@site/src/contexts/ViewModeContext";
import { UserOutlined, EditOutlined, LogoutOutlined, ShareAltOutlined, SettingOutlined, LoginOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
// LoginComponent (520 行 + antd Form/Card/Input) 仅在未登录用户点登录按钮时打开 Modal 才渲染
const LoginComponent = React.lazy(() => import("./login"));
import Translate, { translate } from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { persistAuthToken } from "@site/src/api";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import PromptFormModal from "./modal/PromptFormModal";
import Link from "@docusaurus/Link";

// data-auth-ready 必须在 paint 前置位：SPA 从非首页跳进首页时，useEffect（paint 后）会先闪一帧
// boot 骨架再换按钮。useLayoutEffect 在 commit 后、paint 前跑，首帧即正确。SSR 上退化为 useEffect 避免告警。
const useIsoLayoutEffect = ExecutionEnvironment.canUseDOM ? useLayoutEffect : useEffect;

const UserStatus = () => {
  const { userAuth, clearAuth, refreshUserAuth, authLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { modal } = App.useApp();
  const { addPrompt, loading } = useUserPrompt();

  // 使用视图模式上下文
  const { viewMode, setViewMode } = useViewMode();

  // 水合/挂载后给 <html> 加 data-auth-ready：撤掉内联脚本（auth-boot-flag）设的 boot 占位，
  // 露出 React 渲染的真实按钮。此后 data-auth-boot 残留也无害（CSS 仅在 :not([data-auth-ready]) 时生效）。
  useIsoLayoutEffect(() => {
    document.documentElement.setAttribute("data-auth-ready", "");
  }, []);

  const onFinish = useCallback(
    async (values) => {
      const success = await addPrompt(values, () => {
        // 成功后自动切换到"我的收藏"视图
        setViewMode("collection");
      });
      if (success) {
        setOpen(false);
      }
    },
    [addPrompt, setViewMode]
  );

  // 全同步：这些模块（api barrel、utils/cache）已随 useUserPrompt / AuthContext 静态入图，
  // 曾经的 await import() 省不下任何字节，却让清 token 落在 await 之后 ——
  // chunk 加载失败会中断整个函数，导致点了退出却仍是登录态。
  const handleLogout = useCallback(() => {
    if (ExecutionEnvironment.canUseDOM) {
      persistAuthToken(null);
    }
    // 走 clearAuth 而非 setUserAuth(null)：它会递增 auth 世代号作废在飞的 GET /myspace，
    // 否则那份已授权的响应回来还会把登录态连同 30 天 TTL 的缓存写回去。清缓存也由它负责。
    clearAuth();
    window.location.reload();
  }, [clearAuth]);

  const menuItems = useMemo(
    () =>
      [
        {
          key: "account",
          label: (
            <Link to="/user">
              <Translate id="link.myAccount">我的账户</Translate>
            </Link>
          ),
          icon: <UserOutlined />,
        },
        {
          type: "divider" as const,
        },
        {
          key: "logout",
          label: <Translate id="button.logout">退出登录</Translate>,
          icon: <LogoutOutlined />,
          danger: true,
          onClick: () => {
            modal.confirm({
              title: <Translate id="message.logout.confirm.title">确认退出</Translate>,
              content: <Translate id="message.logout.confirm.content">确定要退出登录吗？</Translate>,
              onOk: handleLogout,
              okText: <Translate id="button.confirm">确认</Translate>,
              cancelText: <Translate id="action.cancel">取消</Translate>,
              centered: true,
            });
          },
        },
      ],
    [modal, handleLogout],
  );

  const loggedInButtons = useMemo(
    () => (
      <Space wrap size="middle">
        <Button icon={viewMode === "collection" ? <BookOutlined /> : <HeartOutlined />} onClick={() => setViewMode(viewMode === "collection" ? "explore" : "collection")}>
          <span className="hideOnSmallScreen">{viewMode === "collection" ? <Translate id="nav.explore">提示词库</Translate> : <Translate id="nav.myCollection">我的收藏</Translate>}</span>
        </Button>
        <Button icon={<EditOutlined />} onClick={() => setOpen(true)}>
          <span className="hideOnSmallScreen">
            <Translate id="link.addprompt">创建提示词</Translate>
          </span>
        </Button>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button icon={<SettingOutlined />} aria-label="Settings" />
        </Dropdown>
      </Space>
    ),
    [menuItems, viewMode, setViewMode]
  );

  const loggedOutButtons = useMemo(
    () => (
      <>
        {/* Desktop: large CTA, balance hero 40px text。class 挂 wrapper div，避免 display:block !important 干扰 Space 的 inline-flex */}
        <div className="hideOnSmallScreen">
          <Space wrap size="middle">
            <Button type="primary" size="large" icon={<LoginOutlined />} onClick={() => setOpen(true)}>
              <Translate id="button.signInFree">免费登录</Translate>
            </Button>
            <Link to="/community-prompts">
              <Button size="large" icon={<ShareAltOutlined />}>
                <Translate id="showcase.header.button">浏览社区分享</Translate>
              </Button>
            </Link>
          </Space>
        </div>
        {/* Mobile: default size, share 仅 icon 节省空间 */}
        <div className="showOnSmallScreen">
          <Space wrap size="middle">
            <Button type="primary" icon={<LoginOutlined />} onClick={() => setOpen(true)}>
              <Translate id="button.signInFree">免费登录</Translate>
            </Button>
            <Link to="/community-prompts">
              <Button icon={<ShareAltOutlined />} aria-label={translate({ id: "showcase.header.button", message: "浏览社区分享" })} />
            </Link>
          </Space>
        </div>
      </>
    ),
    []
  );

  const authSkeleton = (
    <>
      <div className="hideOnSmallScreen">
        <Space wrap size="middle">
          <Skeleton.Button active size="large" style={{ width: 96 }} />
          <Skeleton.Button active size="large" style={{ width: 144 }} />
        </Space>
      </div>
      <div className="showOnSmallScreen">
        <Space wrap size="middle">
          {/* antd 6 弃用 size="default"（v7 将移除），等价值为 "medium" */}
          <Skeleton.Button active size="medium" style={{ width: 80 }} />
          <Skeleton.Button active size="medium" style={{ width: 32 }} />
        </Space>
      </div>
    </>
  );

  if (authLoading) {
    return authSkeleton;
  }

  return (
    <>
      {/* boot 占位：仅「已登录且尚未水合」时由 CSS 显示（见 custom.css + auth-boot-flag 内联脚本），
          避免发版冷缓存下已登录用户首屏几秒看到 SSR 静态 HTML 里的「免费登录」CTA。
          display:contents 包装，不产生布局盒子（零 CLS）。 */}
      <div className="userstatus-boot" aria-hidden>
        {authSkeleton}
      </div>
      <div className="userstatus-live">
        {userAuth ? (
          <>
            {loggedInButtons}
            <PromptFormModal
              open={open}
              mode="add"
              loading={loading}
              onSubmit={onFinish}
              onClose={() => {
                if (!loading) setOpen(false);
              }}
            />
          </>
        ) : (
          <>
            {loggedOutButtons}
            <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
              <Suspense fallback={null}>
                <LoginComponent />
              </Suspense>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default UserStatus;
