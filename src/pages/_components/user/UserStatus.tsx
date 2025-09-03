import React, { useContext, useState, useCallback, useMemo } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Link from "@docusaurus/Link";
import { Form, Input, Button, message, Modal, Typography, Switch, Spin, Tooltip, Space } from "antd";
import { UserOutlined, HeartOutlined, EditOutlined, LogoutOutlined, ClearOutlined, LikeFilled } from "@ant-design/icons";
import LoginComponent from "./login";
import Translate, { translate } from "@docusaurus/Translate";
import { submitPrompt, clearUserAllInfoCache } from "@site/src/api";
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
  const [messageApi, contextHolder] = message.useMessage();

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
      <Space wrap size="middle">
        {!hideLinks.userCenter && (
          <Link to="/user" className="button button--primary">
            <UserOutlined /> <Translate id="link.myaccount">账号设置</Translate>
          </Link>
        )}
        {!hideLinks.myFavorite && (
          <Link to="/user/favorite" className="button button--primary hideOnSmallScreen">
            <HeartOutlined /> <Translate id="link.user">个人中心</Translate>
          </Link>
        )}
        <a className="button button--primary" onClick={() => setOpen(true)}>
          <EditOutlined /> <Translate id="link.addprompt">添加提示词</Translate>
        </a>
        <Tooltip title={<Translate id="tooltip.clearCache">若您在其他设备更新了收藏或提示词，点击清除缓存以同步最新内容。</Translate>}>
          <Button icon={<ClearOutlined />} onClick={handleClearCache} style={{ color: "gray" }}>
            <span className="hideOnSmallScreen">
              <Translate id="button.clearCache">清除缓存</Translate>
            </span>
          </Button>
        </Tooltip>
        <Button
          icon={<LogoutOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "Confirm Logout",
              content: "Click OK to log out.",
              onOk: handleLogout,
            });
          }}
          style={{ color: "gray" }}>
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
      <Space wrap size="middle">
        <button className="button button--primary" onClick={() => setOpen(true)}>
          <Translate id="button.login">登录</Translate>
        </button>
        <Link to="/community-prompts" className="button button--primary">
          <LikeFilled /> <Translate id="showcase.header.button">分享你的提示词</Translate>
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
      {contextHolder}
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
