import React, { useContext, useState, useCallback, useMemo } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Link from "@docusaurus/Link";
import { Button, Modal, App, Dropdown, Space, Spin } from "antd";
import { UserOutlined, HeartOutlined, EditOutlined, LogoutOutlined, ClearOutlined, LikeFilled, DownloadOutlined, SettingOutlined, LoginOutlined } from "@ant-design/icons";
import LoginComponent from "./login";
import Translate from "@docusaurus/Translate";
import { clearUserAllInfoCache, getPrompts } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import AddPromptModal from "./modal/AddPromptModal";

const UserStatus = ({ hideLinks = { userCenter: false, myFavorite: false } }) => {
  const { userAuth, setUserAuth, refreshUserAuth, isLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { message: messageApi, modal } = App.useApp();
  const { addPrompt, loading } = useUserPrompt();

  const handleClearCache = useCallback(async () => {
    await clearUserAllInfoCache();
    refreshUserAuth();
    messageApi.success(<Translate id="message.cache.cleared">缓存已清除</Translate>);
  }, [refreshUserAuth, messageApi]);

  const onFinish = useCallback(
    async (values) => {
      const success = await addPrompt(values);
      if (success) {
        setOpen(false);
      }
    },
    [addPrompt]
  );

  const handleExportPrompts = useCallback(async () => {
    try {
      if (!userAuth?.data?.userprompts || userAuth.data.userprompts.length === 0) {
        messageApi.warning(<Translate id="message.export.noPrompts">暂无提示词可导出，请稍后重试</Translate>);
        return;
      }

      // 获取完整的用户提示词数据
      const userPromptsData = await getPrompts("userprompts", userAuth.data.userprompts);

      // 准备导出数据
      const exportData = {
        exportTime: new Date().toISOString(),
        totalCount: userPromptsData.length,
        prompts: userPromptsData.map((prompt) => ({
          id: prompt.id,
          title: prompt.title,
          description: prompt.description,
          remark: prompt.remark || "",
          notes: prompt.notes || "",
          createdAt: prompt.createdAt,
          updatedAt: prompt.updatedAt,
          share: prompt.share,
        })),
      };

      // 创建并下载 JSON 文件
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `my-prompts-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      messageApi.success(<Translate id="message.export.success">提示词导出成功！</Translate>);
    } catch (error) {
      console.error("Export error:", error);
      messageApi.error(<Translate id="message.export.error">导出失败，请稍后重试</Translate>);
    }
  }, [userAuth, messageApi]);

  const handleLogout = useCallback(async () => {
    if (ExecutionEnvironment.canUseDOM) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userAllInfo");
      localStorage.removeItem("userAllInfoCacheExpiration");
    }
    setUserAuth(null);
    window.location.reload();
  }, [setUserAuth]);

  const menuItems = [
    {
      key: "account",
      label: (
        <Link to="/user">
          <Translate id="link.myaccount">账号设置</Translate>
        </Link>
      ),
      icon: <UserOutlined />,
    },
    !hideLinks.userCenter && {
      key: "export",
      label: <Translate id="button.exportPrompts">导出提示词</Translate>,
      icon: <DownloadOutlined />,
      onClick: handleExportPrompts,
    },
    {
      key: "clearCache",
      label: <Translate id="button.clearCache">清除缓存</Translate>,
      icon: <ClearOutlined />,
      onClick: handleClearCache,
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
        {!hideLinks.myFavorite && (
          <Link to="/user/favorite">
            <Button icon={<HeartOutlined />}>
              <span className="hideOnSmallScreen">
                <Translate id="link.myFavorites">我的收藏</Translate>
              </span>
            </Button>
          </Link>
        )}
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
    [hideLinks, handleClearCache, handleLogout, handleExportPrompts, menuItems]
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

  // 使用 AuthContext 的 isLoading 状态，而不是检查 userAuth === undefined
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
        <Spin size="small" />
      </div>
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

export default React.memo(UserStatus);
