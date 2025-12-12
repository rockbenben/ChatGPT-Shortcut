import React, { useContext, useState, useCallback, useMemo } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Button, Modal, App, Dropdown, Space, Skeleton } from "antd";
import { useViewMode } from "@site/src/contexts/ViewModeContext";
import { UserOutlined, EditOutlined, LogoutOutlined, LikeFilled, SettingOutlined, LoginOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
import LoginComponent from "./login";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import AddPromptModal from "./modal/AddPromptModal";
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
      clearUserProfileCache();
      clearMySpaceCache();
    }
    setUserAuth(null);
    window.location.reload();
  }, [setUserAuth]);

  const menuItems = [
    {
      key: "account",
      label: (
        <Link to="/user">
          <Translate id="link.myaccount">我的账户</Translate>
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
      <Space wrap size="small">
        <Button icon={viewMode === "collection" ? <BookOutlined /> : <HeartOutlined />} onClick={() => setViewMode(viewMode === "collection" ? "explore" : "collection")}>
          <span className="hideOnSmallScreen">{viewMode === "collection" ? <Translate id="nav.explore">提示词库</Translate> : <Translate id="nav.myCollection">我的收藏</Translate>}</span>
        </Button>
        <Button icon={<EditOutlined />} onClick={() => setOpen(true)}>
          <span className="hideOnSmallScreen">
            <Translate id="link.addprompt">添加提示词</Translate>
          </span>
        </Button>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button icon={<SettingOutlined />}>
            <span className="hideOnSmallScreen">
              <Translate id="button.settings">设置</Translate>
            </span>
          </Button>
        </Dropdown>
      </Space>
    ),
    [menuItems, viewMode, setViewMode]
  );

  const loggedOutButtons = useMemo(
    () => (
      <Space wrap size="middle">
        <Button type="primary" icon={<LoginOutlined />} onClick={() => setOpen(true)}>
          <Translate id="button.login">登录</Translate>
        </Button>
        <Link to="/community-prompts">
          <Button icon={<LikeFilled />}>
            <span className="hideOnSmallScreen">
              <Translate id="showcase.header.button">分享你的提示词</Translate>
            </span>
          </Button>
        </Link>
      </Space>
    ),
    []
  );

  if (authLoading) {
    return (
      <Space wrap size="small">
        <Skeleton.Button active size="default" style={{ width: 80 }} />
        <Skeleton.Button active size="default" style={{ width: 120 }} />
      </Space>
    );
  }

  return (
    <>
      {userAuth ? (
        <>
          {loggedInButtons}
          <AddPromptModal open={open} setOpen={setOpen} onFinish={onFinish} loading={loading} />
        </>
      ) : (
        <>
          {loggedOutButtons}
          <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
            <LoginComponent />
          </Modal>
        </>
      )}
    </>
  );
};

export default UserStatus;
