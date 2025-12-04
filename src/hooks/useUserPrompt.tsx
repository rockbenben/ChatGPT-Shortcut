import React, { useState, useCallback, useContext } from "react";
import { App } from "antd";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../pages/_components/AuthContext";
import { submitPrompt, updatePrompt as apiUpdatePrompt, deletePrompt as apiDeletePrompt, clearUserAllInfoCache } from "../api";

interface UseUserPromptReturn {
  loading: boolean;
  addPrompt: (values: any) => Promise<boolean>;
  updatePrompt: (id: number, values: any) => Promise<boolean>;
  removePrompt: (id: number) => Promise<void>;
  confirmRemovePrompt: (id: number) => void;
}

export const useUserPrompt = (): UseUserPromptReturn => {
  const { refreshUserAuth } = useContext(AuthContext);
  const { message: messageApi, modal } = App.useApp();
  const [loading, setLoading] = useState(false);

  const addPrompt = useCallback(
    async (values: any) => {
      setLoading(true);
      try {
        await submitPrompt(values);
        refreshUserAuth();
        messageApi.success(<Translate id="message.addPrompt.success">提示词提交成功！</Translate>);
        messageApi.success(<Translate id="message.addPrompt.success.view">可在「我的提示词」中查看</Translate>);
        return true;
      } catch (err) {
        console.error(err);
        messageApi.error(<Translate id="message.addPrompt.error">提示词提交失败，请稍后重试</Translate>);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, messageApi]
  );

  const updatePrompt = useCallback(
    async (id: number, values: any) => {
      setLoading(true);
      try {
        await apiUpdatePrompt(id, values);
        refreshUserAuth();
        messageApi.success(<Translate id="message.updatePrompt.success">提示词更新成功！</Translate>);
        return true;
      } catch (err) {
        console.error(err);
        clearUserAllInfoCache();
        refreshUserAuth();
        messageApi.error(<Translate id="message.updatePrompt.error">提示词更新失败，请稍后重试</Translate>);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, messageApi]
  );

  const removePrompt = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await apiDeletePrompt(id);
        refreshUserAuth();
        messageApi.success(<Translate id="message.deletePrompt.success">提示词删除成功！</Translate>);
      } catch (err) {
        console.error(err);
        clearUserAllInfoCache();
        refreshUserAuth();
        messageApi.error(<Translate id="message.deletePrompt.error">提示词删除失败，请稍后重试</Translate>);
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, messageApi]
  );

  const confirmRemovePrompt = useCallback(
    (id: number) => {
      modal.confirm({
        title: <Translate id="message.deletePrompt.confirm.title">确认删除</Translate>,
        content: <Translate id="message.deletePrompt.confirm.content">您确定要删除该提示词吗？</Translate>,
        onOk: async () => {
          await removePrompt(id);
        },
      });
    },
    [modal, removePrompt]
  );

  return { loading, addPrompt, updatePrompt, removePrompt, confirmRemovePrompt };
};
