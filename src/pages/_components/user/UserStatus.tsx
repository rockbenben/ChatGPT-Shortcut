import React, { useContext, useState, useCallback, useMemo } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Link from "@docusaurus/Link";
import { Form, Input, Button, message, Modal, Typography, Switch, ConfigProvider, Spin, Tooltip, Space } from "antd";
import { UserOutlined, HeartOutlined, EditOutlined, LogoutOutlined, ClearOutlined } from "@ant-design/icons";
import LoginComponent from "./login";
import Translate, { translate } from "@docusaurus/Translate";
import { submitPrompt, clearUserAllInfoCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";

const AddPromptModal = ({ open, setOpen, onFinish, loading }) => {
  const [form] = Form.useForm();

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 12,
          },
        },
      }}>
      <Modal
        title={translate({
          id: "modal.addprompt.title",
          message: "添加 Prompt（本内容将出现在「我的提示词」标签中）",
        })}
        open={open}
        footer={null}
        maskClosable={false}
        closable={!loading}
        onCancel={() => !loading && setOpen(false)}>
        <Form
          form={form}
          onFinish={(values) => {
            onFinish(values, form);
          }}
          initialValues={{ share: true }}>
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
    </ConfigProvider>
  );
};

const UserStatus = ({ hideLinks = { userCenter: false, myFavorite: false } }) => {
  const { userAuth, setUserAuth, refreshUserAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClearCache = useCallback(async () => {
    await clearUserAllInfoCache();
    refreshUserAuth();
    messageApi.success(<Translate id="message.cache.cleared">缓存已清除</Translate>);
  }, [refreshUserAuth]);

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
    [refreshUserAuth]
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
    [hideLinks, handleLogout]
  );

  const loggedOutButtons = useMemo(
    () => (
      <>
        <button className="button button--primary" onClick={() => setOpen(true)} style={{ marginRight: "10px" }}>
          <Translate id="button.login">登录</Translate>
        </button>
        <Link className="button button--primary" to="/community-prompts">
          <Translate id="showcase.header.button">🙏 分享你的提示词</Translate>
        </Link>
      </>
    ),
    []
  );

  if (userAuth === undefined) {
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
