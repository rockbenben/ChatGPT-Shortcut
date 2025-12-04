import React, { useCallback, useContext } from "react";
// Hook for managing favorites
import { App } from "antd";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../pages/_components/AuthContext";
import { createFavorite, updateFavorite, getPrompts } from "../api";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface UseFavoriteReturn {
  addFavorite: (id: number, isComm?: boolean) => Promise<void>;
  removeFavorite: (id: number, isComm?: boolean) => Promise<void>;
  confirmRemoveFavorite: (id: number, isComm?: boolean) => void;
}

export const useFavorite = (): UseFavoriteReturn => {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { message, modal } = App.useApp();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  const updateFavorites = useCallback(
    async (userLoves: number[], favoriteId: number, isComm: boolean) => {
      await updateFavorite(favoriteId, userLoves, isComm);
      if (!isComm) {
        // Refresh cards cache if needed, matching original ShowcaseCard logic
        getPrompts("cards", userLoves, currentLanguage);
      }
      refreshUserAuth();
    },
    [currentLanguage, refreshUserAuth]
  );

  const addFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      try {
        let userLoves: number[];
        let favoriteId: number;

        if (!userAuth?.data?.favorites) {
          const createFavoriteResponse = await createFavorite([id], isComm);
          userLoves = [id];
          favoriteId = createFavoriteResponse.data.id;
        } else {
          userLoves = isComm ? [...(userAuth.data.favorites.commLoves || [])] : [...(userAuth.data.favorites.loves || [])];
          favoriteId = userAuth.data.favorites.id;

          if (!userLoves.includes(id)) {
            userLoves.push(id);
          }
        }

        message.success("Added to favorites successfully!");
        await updateFavorites(userLoves, favoriteId, isComm);
      } catch (err) {
        console.error(err);
        message.error("Failed to add to favorites.");
      }
    },
    [userAuth, message, updateFavorites]
  );

  const removeFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      try {
        let userLoves = isComm ? [...(userAuth?.data?.favorites?.commLoves || [])] : [...(userAuth?.data?.favorites?.loves || [])];
        const favoriteId = userAuth?.data?.favorites?.id;

        const index = userLoves.indexOf(id);
        if (index > -1) {
          userLoves.splice(index, 1);
          message.success("Removed from favorites successfully!");

          if (isComm) {
            localStorage.removeItem(`commus_${id}`);
          }

          await updateFavorites(userLoves, favoriteId, isComm);
        }
      } catch (err) {
        console.error(err);
        message.error("Failed to remove from favorites.");
      }
    },
    [userAuth, message, updateFavorites]
  );

  const confirmRemoveFavorite = useCallback(
    (id: number, isComm: boolean = false) => {
      modal.confirm({
        title: <Translate id="message.removeFavorite.confirm.title">确认移除</Translate>,
        content: <Translate id="message.removeFavorite.confirm.content">您确定要从收藏中移除该提示词吗？</Translate>,
        onOk: async () => {
          await removeFavorite(id, isComm);
        },
        okText: <Translate id="button.confirm">确认</Translate>,
        cancelText: <Translate id="button.cancel">取消</Translate>,
        centered: true,
      });
    },
    [modal, removeFavorite]
  );

  return { addFavorite, removeFavorite, confirmRemoveFavorite };
};
