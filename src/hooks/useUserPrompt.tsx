import React, { useState, useCallback, useContext } from "react";
import { App } from "antd";
import Translate, { translate } from "@docusaurus/Translate";
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
        messageApi.success(<Translate id="message.success">词条提交成功！</Translate>);
        messageApi.success(<Translate id="message.success1">点击标签「我的提示词」查看已添加的自定义提示词。</Translate>);
        return true;
      } catch (err) {
        console.error(err);
        messageApi.error(<Translate id="message.error">词条提交失败，请稍后重试</Translate>);
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
        messageApi.success(
          translate({
            id: "message.success",
            message: "词条提交成功！",
          })
        );
        return true;
      } catch (err) {
        console.error(err);
        clearUserAllInfoCache();
        refreshUserAuth();
        messageApi.error(
          translate({
            id: "message.error",
            message: "词条提交失败，请稍后重试",
          })
        );
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
        messageApi.success(
          translate({
            id: "message.deletePrompt.success",
            message: "Prompt successfully deleted!",
          })
        );
      } catch (err) {
        console.error(err);
        clearUserAllInfoCache();
        refreshUserAuth();
        messageApi.error(
          translate({
            id: "message.deletePrompt.error",
            message: "Failed to delete prompt, please try again later.",
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, messageApi]
  );

  const confirmRemovePrompt = useCallback(
    (id: number) => {
      modal.confirm({
        title: <Translate id="message.deletePrompt.confirm.title">Confirm Delete</Translate>,
        content: <Translate id="message.deletePrompt.confirm.content">Are you sure you want to delete this prompt?</Translate>,
        onOk: async () => {
          await removePrompt(id);
        },
      });
    },
    [modal, removePrompt]
  );

  return { loading, addPrompt, updatePrompt, removePrompt, confirmRemovePrompt };
};
