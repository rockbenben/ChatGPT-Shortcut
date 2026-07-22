import React, { useCallback, useContext } from "react";
import { App } from "antd";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../components/AuthContext";

const LOCAL_FAVORITES_KEY = "local_favorites";

function getLocalFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

interface UseFavoriteReturn {
  addFavorite: (id: number, isComm?: boolean) => Promise<void>;
  removeFavorite: (id: number, isComm?: boolean) => Promise<void>;
  confirmRemoveFavorite: (id: number, isComm?: boolean) => void;
}

export const useFavorite = (): UseFavoriteReturn => {
  const { refreshUserAuth } = useContext(AuthContext);
  const { message, modal } = App.useApp();

  const addFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      const favorites = getLocalFavorites();
      // 已在收藏里就静默返回：不重复写、也不弹「已添加」的误导提示（双击时会命中）
      if (favorites.includes(id)) return;
      favorites.unshift(id);
      localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(favorites));
      refreshUserAuth();
      message.success(<Translate id="message.addFavorite.success">已添加到收藏</Translate>);
    },
    [message, refreshUserAuth],
  );

  const removeFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      const favorites = getLocalFavorites();
      const index = favorites.indexOf(id);
      if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(favorites));
        refreshUserAuth();
        message.success(<Translate id="message.removeFavorite.success">已取消收藏</Translate>);
      }
    },
    [message, refreshUserAuth],
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
    [modal, removeFavorite],
  );

  return { addFavorite, removeFavorite, confirmRemoveFavorite };
};
