import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "@docusaurus/Link";
import { Form, Input, Button, message, Modal, Typography } from "antd";
import LoginComponent from "./login";
import Translate, { translate } from "@docusaurus/Translate";
import { submitPrompt } from "@site/src/api";

const UserStatus = () => {
  const [username, setUsername] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookieUsername = Cookies.get("username");
    setUsername(cookieUsername || null);
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    Cookies.remove("auth_token");
    Cookies.remove("username");
    setUsername(null);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await submitPrompt(values);
      message.success(<Translate id="message.success">词条提交成功！</Translate>);
      setOpen(false);
    } catch (err) {
      console.error(err);
      message.error(<Translate id="message.error">词条提交失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  if (username) {
    return (
      <div>
        <Link to="/user" style={{ marginRight: "10px" }}>
          <Translate id="link.user">用户界面</Translate>
        </Link>
        <Button onClick={handleLogout} style={{ marginRight: "10px" }}>
          <Translate id="button.logout">注销</Translate>
        </Button>
        <Link className="button button--primary" onClick={() => setOpen(true)}>
          <Translate id="link.add">添加自定义提示词</Translate>
        </Link>
        <Modal
          title={translate({id: "modal.title", message: "提交 Prompt"})}
          open={open}
          footer={null}
          onCancel={() => setOpen(false)}
        >
          <Form onFinish={onFinish}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: translate({id: "message.requiredTitle", message: "请输入提示词标题！"}) }]}
            >
              <Input placeholder={translate({id: "input.title", message: "提示词名称"})} />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: translate({id: "message.requiredDescription", message: "请输入提示词内容！"}) }]}
            >
              <Input.TextArea placeholder={translate({id: "input.description", message: "提示词内容"})} rows={4} />
            </Form.Item>
            <Form.Item
              name="remark"
            >
              <Input placeholder={translate({id: "input.remark", message: "提示词作用（非必填）"})} />
            </Form.Item>
            <Form.Item
              name="notes"
            >
              <Input.TextArea placeholder={translate({id: "input.notes", message: "备注（非必填）：您可以在此提供提示词的来源说明，以及该提示词的其他语言版本。此外，如果您有任何关于该提示词的拓展想法和需求，请在此进行说明。"})} rows={2} />
            </Form.Item>
            <Typography.Text type="secondary">
            <Translate id="message.submission">
            我们可能会对您提交的提示词进行适当的修改和翻译，并分享到公开页面，同时在词条上备注您的用户名。感谢您的分享与理解。
            </Translate>
            </Typography.Text>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                style={{ marginTop: "16px" }}
              >
                <Translate id="button.addPrompt">添加 Prompt</Translate>
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={() => setOpen(true)} style={{ marginRight: "10px" }}>
          <Translate id="button.login">登录</Translate>
        </Button>
        <Link
          className="button button--primary"
          to="https://github.com/rockbenben/ChatGPT-Shortcut/discussions/11"
        >
          <Translate id="showcase.header.button">🙏 请添加你的提示词</Translate>
        </Link>
        <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
          <LoginComponent />
        </Modal>
      </div>
    );
  }
};

export default UserStatus;
