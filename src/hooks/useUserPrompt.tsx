import React, { useState, useCallback, useContext } from "react";
import { App } from "antd";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../components/AuthContext";

const LOCAL_PROMPTS_KEY = "local_user_prompts";

function getLocalPrompts(): any[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_PROMPTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalPrompts(prompts: any[]) {
  localStorage.setItem(LOCAL_PROMPTS_KEY, JSON.stringify(prompts));
}

interface UseUserPromptReturn {
  loading: boolean;
  addPrompt: (values: any, onSuccess?: () => void) => Promise<boolean>;
  updatePrompt: (id: number, values: any) => Promise<boolean>;
  removePrompt: (id: number) => Promise<void>;
  confirmRemovePrompt: (id: number) => void;
}

export const useUserPrompt = (): UseUserPromptReturn => {
  const { refreshUserAuth } = useContext(AuthContext);
  const { message, modal } = App.useApp();
  const [loading, setLoading] = useState(false);

  const addPrompt = useCallback(
    async (values: any, onSuccess?: () => void) => {
      setLoading(true);
      try {
        const prompts = getLocalPrompts();
        prompts.unshift({
          ...values,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        saveLocalPrompts(prompts);

        // 强制刷新，确保获取最新数据
        refreshUserAuth();

        message.success(<Translate id="message.addPrompt.success">提示词提交成功！</Translate>);

        // 调用成功回调（用于导航）
        if (onSuccess) {
          onSuccess();
        }

        return true;
      } catch (err) {
        console.error(err);
        message.error(<Translate id="message.addPrompt.error">提示词提交失败，请稍后重试</Translate>);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, message],
  );

  const updatePrompt = useCallback(
    async (id: number, values: any) => {
      setLoading(true);
      try {
        const prompts = getLocalPrompts();
        const idx = prompts.findIndex((p) => p.id === id);
        if (idx > -1) {
          prompts[idx] = { ...prompts[idx], ...values, updatedAt: new Date().toISOString() };
          saveLocalPrompts(prompts);
        }
        refreshUserAuth();

        message.success(<Translate id="message.updatePrompt.success">提示词更新成功！</Translate>);
        return true;
      } catch (err) {
        console.error(err);
        message.error(<Translate id="message.updatePrompt.error">提示词更新失败，请稍后重试</Translate>);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, message],
  );

  const removePrompt = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        saveLocalPrompts(getLocalPrompts().filter((p) => p.id !== id));
        refreshUserAuth();
        message.success(<Translate id="message.deletePrompt.success">提示词删除成功！</Translate>);
      } catch (err) {
        console.error(err);
        message.error(<Translate id="message.deletePrompt.error">提示词删除失败，请稍后重试</Translate>);
      } finally {
        setLoading(false);
      }
    },
    [refreshUserAuth, message],
  );

  const confirmRemovePrompt = useCallback(
    (id: number) => {
      modal.confirm({
        title: <Translate id="message.deletePrompt.confirm.title">确认删除</Translate>,
        content: <Translate id="message.deletePrompt.confirm.content">您确定要删除该提示词吗？</Translate>,
        onOk: async () => {
          await removePrompt(id);
        },
        okText: <Translate id="button.confirm">确认</Translate>,
        cancelText: <Translate id="action.cancel">取消</Translate>,
        centered: true,
      });
    },
    [modal, removePrompt],
  );

  return { loading, addPrompt, updatePrompt, removePrompt, confirmRemovePrompt };
};
