import React, { useCallback, useContext } from "react";
import { App } from "antd";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../components/AuthContext";
import { createFavorite, updateFavorite, voteOnUserPrompt } from "../api";

interface UseFavoriteReturn {
  addFavorite: (id: number, isComm?: boolean) => Promise<void>;
  removeFavorite: (id: number, isComm?: boolean) => Promise<void>;
  confirmRemoveFavorite: (id: number, isComm?: boolean) => void;
}

export const useFavorite = (): UseFavoriteReturn => {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { message, modal } = App.useApp();

  // 更新收藏列表（内部函数）- 静默刷新，不触发全屏 loading
  const updateFavorites = useCallback(
    async (userLoves: number[], favoriteId: number, isComm: boolean) => {
      await updateFavorite(favoriteId, userLoves, isComm);
      // 使用 false 进行静默刷新，不触发 authLoading 骨架屏
      await refreshUserAuth();
    },
    [refreshUserAuth]
  );

  const addFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      try {
        if (!userAuth?.data?.favorites) {
          // 新用户：创建收藏记录
          await createFavorite([id], isComm);
          // 静默刷新，不触发全屏 loading
          await refreshUserAuth();
        } else {
          const currentLoves = isComm ? [...(userAuth.data.favorites.commLoves || [])] : [...(userAuth.data.favorites.loves || [])];
          const favoriteId = userAuth.data.favorites.id;

          if (!currentLoves.includes(id)) {
            currentLoves.unshift(id);
          }

          await updateFavorites(currentLoves, favoriteId, isComm);
        }

        // 社区提示词：异步投赞成票（不阻塞）
        if (isComm) {
          voteOnUserPrompt(id, "upvote").catch(() => {});
        }

        message.success(<Translate id="message.addFavorite.success">已添加到收藏</Translate>);
      } catch (err) {
        console.error(err);
        const errorMessage = (err as any)?.strapiMessage;
        if (errorMessage) {
          message.error(errorMessage);
        } else {
          message.error(<Translate id="message.addFavorite.error">收藏失败，请稍后重试</Translate>);
        }
      }
    },
    [userAuth, message, updateFavorites, refreshUserAuth]
  );

  const removeFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      try {
        const favoriteId = userAuth?.data?.favorites?.id;
        if (!favoriteId) {
          message.error(<Translate id="message.removeFavorite.error">移除收藏失败，请稍后重试</Translate>);
          return;
        }

        const currentLoves = isComm ? [...(userAuth?.data?.favorites?.commLoves || [])] : [...(userAuth?.data?.favorites?.loves || [])];

        const index = currentLoves.indexOf(id);
        if (index > -1) {
          currentLoves.splice(index, 1);

          if (isComm) {
            localStorage.removeItem(`commus_${id}`);
          }

          await updateFavorites(currentLoves, favoriteId, isComm);
          message.success(<Translate id="message.removeFavorite.success">已取消收藏</Translate>);
        }
      } catch (err) {
        console.error(err);
        message.error(<Translate id="message.removeFavorite.error">移除收藏失败，请稍后重试</Translate>);
      }
    },
    [userAuth, message, updateFavorites]
  );

  const confirmRemoveFavorite = useCallback(
    (id: number, isComm: boolean = false) => {
      modal.confirm({
        title: <Translate id="message.removeFavorite.confirm.title">取消收藏</Translate>,
        content: <Translate id="message.removeFavorite.confirm.content">确定要取消收藏这个提示词吗？</Translate>,
        onOk: async () => {
          await removeFavorite(id, isComm);
        },
        okText: <Translate id="button.confirm">确认</Translate>,
        cancelText: <Translate id="action.cancel">取消</Translate>,
        centered: true,
      });
    },
    [modal, removeFavorite]
  );

  return { addFavorite, removeFavorite, confirmRemoveFavorite };
};
