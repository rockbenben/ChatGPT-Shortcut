import React, { useContext, useState, useCallback, useMemo } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Link from "@docusaurus/Link";
import { Form, Input, Button, Modal, Typography, Switch, Spin, Tooltip, Space, App } from "antd";
import { UserOutlined, HeartOutlined, EditOutlined, LogoutOutlined, ClearOutlined, LikeFilled, DownloadOutlined } from "@ant-design/icons";
import LoginComponent from "./login";
import Translate, { translate } from "@docusaurus/Translate";
import { submitPrompt, clearUserAllInfoCache, getPrompts } from "@site/src/api";
import { AuthContext } from "../AuthContext";

const AddPromptModal = ({ open, setOpen, onFinish, loading }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = React.useCallback(
    (values) => {
      onFinish(values, form);
    },
    [onFinish, form]
  );

  return (
    <Modal
      title={translate({
        id: "modal.addprompt.title",
        message: "添加 Prompt（本内容将出现在「我的提示词」标签中）",
      })}
      open={open}
      footer={null}
      maskClosable={false}
      closable={!loading}
      destroyOnHidden
      onCancel={() => !loading && setOpen(false)}>
      <Form form={form} onFinish={handleFormSubmit} initialValues={{ share: true }}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: translate({
                id: "message.addprompt.requiredTitle",
                message: "请输入提示词标题！",
              }),
            },
          ]}>
          <Input
            placeholder={translate({
              id: "input.addprompt.title",
              message: "提示词名称",
            })}
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: translate({
                id: "message.addprompt.requiredDescription",
                message: "请输入提示词内容！",
              }),
            },
          ]}>
          <Input.TextArea
            placeholder={translate({
              id: "input.addprompt.description",
              message: "提示词内容",
            })}
            rows={6}
            maxLength={2000}
            showCount
          />
        </Form.Item>
        <Form.Item name="remark">
          <Input
            placeholder={translate({
              id: "input.addprompt.remark",
              message: "提示词作用（非必填）",
            })}
          />
        </Form.Item>
        <Form.Item name="notes">
          <Input.TextArea
            placeholder={translate({
              id: "input.addprompt.notes",
              message: "备注（非必填）：您可以在此提供提示词的来源说明，以及该提示词的其他语言版本。此外，如果您有任何关于该提示词的拓展想法和需求，请在此进行说明。",
            })}
            rows={4}
          />
        </Form.Item>
        <Form.Item name="share" valuePropName="checked">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              defaultChecked
              onChange={(checked) => {
                form.setFieldsValue({ share: checked });
              }}
              checkedChildren={translate({
                id: "input.addprompt.share.checked",
                message: "是",
              })}
              unCheckedChildren={translate({
                id: "input.addprompt.share.unchecked",
                message: "否",
              })}
            />
            <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
              <Translate id="message.addprompt.submission">您是否愿意将该提示词分享到公开页面？</Translate>
            </Typography.Text>
          </div>
        </Form.Item>
        <Button htmlType="submit" type="primary" loading={loading} block>
          <Translate id="button.addPrompt">添加 Prompt</Translate>
        </Button>
      </Form>
    </Modal>
  );
};

const UserStatus = ({ hideLinks = { userCenter: false, myFavorite: false } }) => {
  const { userAuth, setUserAuth, refreshUserAuth, isLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { message: messageApi, modal } = App.useApp();

  const handleClearCache = useCallback(async () => {
    await clearUserAllInfoCache();
    refreshUserAuth();
    messageApi.success(<Translate id="message.cache.cleared">缓存已清除</Translate>);
  }, [refreshUserAuth, messageApi]);

  const onFinish = useCallback(
    async (values, form) => {
      setLoading(true);
      try {
        await submitPrompt(values);
        refreshUserAuth();
        messageApi.success(<Translate id="message.success">词条提交成功！</Translate>);
        messageApi.success(<Translate id="message.success1">点击标签「我的提示词」查看已添加的自定义提示词。</Translate>);
        form.resetFields();
        setOpen(false);
      } catch (err) {
        console.error(err);
        messageApi.error(<Translate id="message.error">词条提交失败，请稍后重试</Translate>);
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, messageApi]
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

  const loggedInButtons = useMemo(
    () => (
      <Space wrap size="small">
        {!hideLinks.userCenter && (
          <Link to="/user">
            <Button icon={<UserOutlined />}>
              <Translate id="link.myaccount">账号设置</Translate>
            </Button>
          </Link>
        )}
        {!hideLinks.myFavorite && (
          <Link to="/user/favorite">
            <Button icon={<HeartOutlined />} className="hideOnSmallScreen">
              <Translate id="link.user">个人中心</Translate>
            </Button>
          </Link>
        )}
        <Button icon={<EditOutlined />} onClick={() => setOpen(true)}>
          <Translate id="link.addprompt">添加提示词</Translate>
        </Button>
        {!hideLinks.userCenter && (
          <Tooltip title={<Translate id="tooltip.exportPrompts">导出您创建的所有提示词到 JSON 文件</Translate>}>
            <Button icon={<DownloadOutlined />} onClick={handleExportPrompts}>
              <span className="hideOnSmallScreen">
                <Translate id="button.exportPrompts">导出提示词</Translate>
              </span>
            </Button>
          </Tooltip>
        )}
        <Tooltip title={<Translate id="tooltip.clearCache">若您在其他设备更新了收藏或提示词，点击清除缓存以同步最新内容。</Translate>}>
          <Button icon={<ClearOutlined />} onClick={handleClearCache}>
            <span className="hideOnSmallScreen">
              <Translate id="button.clearCache">清除缓存</Translate>
            </span>
          </Button>
        </Tooltip>
        <Button
          icon={<LogoutOutlined />}
          onClick={() => {
            modal.confirm({
              title: "Confirm Logout",
              content: "Click OK to log out.",
              onOk: handleLogout,
            });
          }}>
          <span className="hideOnSmallScreen">
            <Translate id="button.logout">退出登录</Translate>
          </span>
        </Button>
      </Space>
    ),
    [hideLinks, handleClearCache, handleLogout]
  );

  const loggedOutButtons = useMemo(
    () => (
      <Space wrap size="small">
        <Button type="primary" onClick={() => setOpen(true)}>
          <Translate id="button.login">登录</Translate>
        </Button>
        <Link to="/community-prompts">
          <Button icon={<LikeFilled />}>
            <Translate id="showcase.header.button">分享你的提示词</Translate>
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
