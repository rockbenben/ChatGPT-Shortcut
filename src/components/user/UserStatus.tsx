import React, { useContext, useState, useCallback, useMemo, Suspense } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Button, Modal, App, Dropdown, Space, Skeleton } from "antd";
import { useViewMode } from "@site/src/contexts/ViewModeContext";
import { UserOutlined, EditOutlined, LogoutOutlined, ShareAltOutlined, SettingOutlined, LoginOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
// LoginComponent (520 行 + antd Form/Card/Input) 仅在未登录用户点登录按钮时打开 Modal 才渲染
const LoginComponent = React.lazy(() => import("./login"));
import Translate, { translate } from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import PromptFormModal from "./modal/PromptFormModal";
import Link from "@docusaurus/Link";

const UserStatus = () => {
  const { userAuth, setUserAuth, refreshUserAuth, authLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { modal } = App.useApp();
  const { addPrompt, loading } = useUserPrompt();

  // 使用视图模式上下文
  const { viewMode, setViewMode } = useViewMode();

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

  const handleLogout = useCallback(async () => {
    if (ExecutionEnvironment.canUseDOM) {
      localStorage.removeItem("auth_token");

      // 清除所有用户相关缓存
      const { clearUserProfileCache } = await import("@site/src/api/client");
      const { clearMySpaceCache } = await import("@site/src/api");
      const { removeCache } = await import("@site/src/utils/cache");
      clearUserProfileCache();
      clearMySpaceCache();
      removeCache("user_auth");
      removeCache("myspace_stats");
    }
    setUserAuth(null);
    window.location.reload();
  }, [setUserAuth]);

  const menuItems = [
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
  ].filter(Boolean);

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

  if (authLoading) {
    return (
      <>
        <div className="hideOnSmallScreen">
          <Space wrap size="middle">
            <Skeleton.Button active size="large" style={{ width: 96 }} />
            <Skeleton.Button active size="large" style={{ width: 144 }} />
          </Space>
        </div>
        <div className="showOnSmallScreen">
          <Space wrap size="middle">
            <Skeleton.Button active size="default" style={{ width: 80 }} />
            <Skeleton.Button active size="default" style={{ width: 32 }} />
          </Space>
        </div>
      </>
    );
  }

  return (
    <>
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
    </>
  );
};

export default UserStatus;
