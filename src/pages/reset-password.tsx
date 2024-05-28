import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Form, Input, Button, message, Typography } from "antd";
import Translate, { translate } from "@docusaurus/Translate";
import { resetPassword } from "@site/src/api";

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [resetCode, setResetCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      setResetCode(code);
      form.setFieldsValue({ code: code }); // set the value of the "code" field
    }
  }, [form]);

  const onFinishResetPassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("New password and confirmation password do not match. 新密码和确认密码不一致。");
      return;
    }
    try {
      await resetPassword(values);
      message.success(<Translate id="message.resetPassword.success">密码重置成功！</Translate>);
      form.resetFields();
      window.location.replace("/");
    } catch (error) {
      console.error(translate({ id: "error.resetPassword", message: "Error resetting password:" }), error);
      message.error(<Translate id="message.resetPassword.error">密码重置失败，请稍后重试</Translate>);
    }
  };

  return (
    <Layout>
      <div style={{ width: 600, margin: "50px auto", padding: "50px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Reset Password
        </Title>
        <Form form={form} onFinish={onFinishResetPassword}>
          <Form.Item name="code" initialValue={resetCode} rules={[{ required: true, message: translate({ id: "input.resetPassword.code", message: "请输入您的重置代码！" }) }]}>
            <Input placeholder={translate({ id: "placeholder.resetPassword.code", message: "重置代码" })} />
          </Form.Item>
          <Form.Item name="newPassword" rules={[{ required: true, message: translate({ id: "input.newPassword", message: "请输入新密码！" }) }]}>
            <Input.Password placeholder={translate({ id: "placeholder.newPassword", message: "新密码" })} />
          </Form.Item>
          <Form.Item name="confirmPassword" rules={[{ required: true, message: translate({ id: "input.confirmPassword", message: "请确认新密码！" }) }]}>
            <Input.Password placeholder={translate({ id: "placeholder.confirmPassword", message: "确认新密码" })} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              <Translate id="button.resetPassword">重置密码</Translate>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
