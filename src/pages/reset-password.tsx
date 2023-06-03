import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Form, Input, Button, message } from "antd";
import Translate, { translate } from "@docusaurus/Translate";
import { resetPassword } from "@site/src/api";

const ResetPassword = () => {
  const [form] = Form.useForm();  // get the Form instance
  const [resetCode, setResetCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      setResetCode(code);
      form.setFieldsValue({ code: code });  // set the value of the "code" field
    }
  }, []);

  const onFinishResetPassword = async (values) => {
    try {
      await resetPassword(values);
      message.success(<Translate id="message.resetPassword.success">密码重置成功！</Translate>);
    } catch (error) {
      console.error(translate({ id: 'error.resetPassword', message: 'Error resetting password:'}), error);
      message.error(<Translate id="message.resetPassword.error">密码重置失败，请稍后重试</Translate>);
    }
  };

  return (
    <Layout>
      <div style={{ width: 600, margin: "auto", padding: "50px 0" }}>
        <Form form={form} onFinish={onFinishResetPassword}>
          <Form.Item
            name="code"
            initialValue={resetCode}
            rules={[{ required: true, message: translate({ id: 'input.resetPassword.code', message: '请输入您的重置代码！'}) }]}
          >
            <Input placeholder={translate({ id: 'placeholder.resetPassword.code', message: '重置代码'})} />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: translate({ id: 'input.newPassword', message: '请输入新密码！'}) }]}
          >
            <Input.Password placeholder={translate({ id: 'placeholder.newPassword', message: '新密码'})} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: translate({ id: 'input.confirmPassword', message: '请确认新密码！'}) }]}
          >
            <Input.Password placeholder={translate({ id: 'placeholder.confirmPassword', message: '确认新密码'})} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">
              <Translate id="button.resetPassword">重置密码</Translate>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
