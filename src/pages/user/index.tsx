import React, { useContext, useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Card, Form, Input, Button, message, Tabs, Spin, Space } from "antd";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { changePassword, forgotPassword } from "@site/src/api";
import { HomeOutlined, StarOutlined } from "@ant-design/icons";
import { AuthContext, AuthProvider } from "../_components/AuthContext";

const UserProfile = () => {
  const { userAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userAuth) {
        window.location.replace("/");
      }
    }, 1000);
    // 清除计时器以防止内存泄漏
    return () => clearTimeout(timer);
  }, [userAuth]);

  const onFinishChangePassword = async (values) => {
    setLoading(true);
    try {
      await changePassword(values);
      message.success(
        <Translate id='message.changePassword.success'>
          密码修改成功！
        </Translate>
      );
    } catch (error) {
      console.error(
        translate({
          id: "error.changePassword",
          message: "Error changing password:",
        }),
        error
      );
      message.error(
        <Translate id='message.changePassword.error'>
          密码修改失败，请稍后重试
        </Translate>
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      message.success(
        <Translate id='message.forgotPassword.success'>
          密码重置邮件已发送！
        </Translate>
      );
    } catch (error) {
      console.error(
        translate({
          id: "error.forgotPassword",
          message: "Error sending forgot password email:",
        }),
        error
      );
      message.error(
        <Translate id='message.forgotPassword.error'>
          发送密码重置邮件失败，请稍后重试
        </Translate>
      );
    } finally {
      setLoading(false);
    }
  };

  if (!userAuth) {
    return (
      <Spin tip={<Translate id='message.loading'>Loading...</Translate>} />
    );
  }

  const items = [
    {
      key: "1",
      label: translate({ id: "label.changePassword", message: "修改密码" }),
      children: (
        <Form onFinish={onFinishChangePassword}>
          <Form.Item
            name='currentPassword'
            rules={[
              {
                required: true,
                message: translate({
                  id: "input.currentPassword",
                  message: "请输入当前密码！",
                }),
              },
            ]}>
            <Input.Password
              placeholder={translate({
                id: "placeholder.currentPassword",
                message: "当前密码",
              })}
            />
          </Form.Item>
          <Form.Item
            name='newPassword'
            rules={[
              {
                required: true,
                message: translate({
                  id: "input.newPassword",
                  message: "请输入新密码！",
                }),
              },
            ]}>
            <Input.Password
              placeholder={translate({
                id: "placeholder.newPassword",
                message: "新密码",
              })}
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            rules={[
              {
                required: true,
                message: translate({
                  id: "input.confirmPassword",
                  message: "请确认新密码！",
                }),
              },
            ]}>
            <Input.Password
              placeholder={translate({
                id: "placeholder.confirmPassword",
                message: "确认新密码",
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' loading={loading}>
              <Translate id='button.changePassword'>修改密码</Translate>
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: translate({ id: "label.forgotPassword", message: "忘记密码" }),
      children: (
        <Form onFinish={onFinishForgotPassword}>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: translate({
                  id: "input.email",
                  message: "请输入您的邮箱！",
                }),
              },
            ]}>
            <Input
              placeholder={translate({
                id: "placeholder.email",
                message: "邮箱",
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' loading={loading}>
              <Translate id='button.sendResetEmail'>发送重置邮件</Translate>
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ width: 600, margin: "auto", padding: "50px 0" }}>
      <Space>
        <Link to='/'>
          <HomeOutlined /> <Translate id='link.home'>返回首页</Translate>
        </Link>
        <Link to='/user/favorite'>
          <StarOutlined /> <Translate id='link.myfavorite'>我的收藏</Translate>
        </Link>
        </Space>
        <Card title={translate({ id: "title.userInfo", message: "用户信息" })}>
          <p>
            <Translate id='userInfo.username'>用户名：</Translate>{" "}
            {userAuth.data.username}
          </p>
          <p>
            <Translate id='userInfo.email'>邮箱：</Translate>{" "}
            {userAuth.data.email}
          </p>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Tabs type='card' items={items} />
        </Card>
      </div>
    </Layout>
  );
};

export default function UserPapge() {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  );
}

