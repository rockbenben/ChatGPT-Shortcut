import { useCallback, useEffect, useRef, useState } from "react";
import { translate } from "@docusaurus/Translate";
import { updateCustomTags } from "@site/src/api";
import type { CustomTag } from "./types";

interface UseTagAssignmentParams {
  spaceItems: any[];
  customTags: CustomTag[];
  setSpaceItems: React.Dispatch<React.SetStateAction<any[]>>;
  getUserAuth: () => any;
  syncMySpaceState: (partial: any) => void;
  syncSpaceCache: (items: any[], tags: CustomTag[]) => void;
  messageApi: any;
}

// 浅比较两个 string[]（无序）
const tagsEqual = (a: string[], b: string[]) => a.length === b.length && a.every((t) => b.includes(t));

/**
 * 标签分配：save on dropdown close
 * 心理模型：dropdown 是一次"编辑会话"，关闭即提交。
 * 点 tag = 纯本地 toggle，关闭 dropdown = 一次 API 提交（无变化跳过）。
 */
export function useTagAssignment({ spaceItems, customTags, setSpaceItems, getUserAuth, syncMySpaceState, syncSpaceCache, messageApi }: UseTagAssignmentParams) {
  // 受控管理"哪张卡片的 tag dropdown 当前展开"——为了 multi-select：点 menu item 不关闭，点外面或 manage 才关
  const [openTagDropdownItemId, setOpenTagDropdownItemId] = useState<string | null>(null);

  const spaceItemsRef = useRef(spaceItems);
  spaceItemsRef.current = spaceItems;
  const customTagsRef = useRef(customTags);
  customTagsRef.current = customTags;
  // 当前打开的 dropdown：itemId + 打开那一刻的 tag 状态（失败回滚 + diff 判断用）
  const dropdownEditRef = useRef<{ itemId: string; originalTags: string[] } | null>(null);
  const pendingSaveRef = useRef<Promise<void>>(Promise.resolve());

  // 在最新权威分配上只替换本次编辑的条目。
  const buildItemTags = useCallback((itemId: string, tags: string[]): Record<string, string[]> => {
    const itemTags: Record<string, string[]> = {};
    (getUserAuth()?.data?.items || []).forEach((item) => {
      if (item.tags?.length > 0) {
        itemTags[`${item.type}_${item.source}_${item.id}`] = item.tags;
      }
    });
    if (tags.length > 0) itemTags[itemId] = tags;
    else delete itemTags[itemId];
    return itemTags;
  }, [getUserAuth]);

  // 接口写入整份分配，串行提交才能让后一笔合并前一笔的保存结果。
  const persistAssignment = useCallback((itemId: string, tags: string[]) => {
    const save = pendingSaveRef.current.catch(() => {}).then(async () => {
      const itemTags = buildItemTags(itemId, tags);
      await updateCustomTags({ definitions: getUserAuth()?.data?.customTags || customTagsRef.current, itemTags });
      const items = getUserAuth()?.data?.items;
      if (!items) return;
      const updated = items.map((item) => {
        if (`${item.type}_${item.source}_${item.id}` !== itemId) return item;
        const { tags: _tags, ...rest } = item;
        return tags.length ? { ...rest, tags } : rest;
      });
      syncMySpaceState({ items: updated });
    });
    pendingSaveRef.current = save;
    return save;
  }, [buildItemTags, getUserAuth, syncMySpaceState]);

  // 提交当前编辑会话——dropdown 关闭、点"管理标签"、卸载时调用
  const saveTagAssignment = useCallback(async () => {
    const editing = dropdownEditRef.current;
    if (!editing) return pendingSaveRef.current.catch(() => {});
    dropdownEditRef.current = null;

    const currentItem = spaceItemsRef.current.find((i) => i.id === editing.itemId);
    if (!currentItem) return;
    const currentTags = currentItem.customTags || [];

    // 无变化（开了 dropdown 但什么都没改）→ 跳过 API
    if (tagsEqual(currentTags, editing.originalTags)) return pendingSaveRef.current.catch(() => {});

    try {
      await persistAssignment(editing.itemId, [...currentTags]);
      // 镜像进模块缓存：spaceItemsRef 已含本次 toggle 结果，definitions 未变
      syncSpaceCache(spaceItemsRef.current, customTagsRef.current);
    } catch (error) {
      console.error("Failed to update item tags:", error);
      messageApi.error(translate({ id: "message.tagsUpdateFailed", message: "标签更新失败，请稍后重试" }));
      // 回滚到打开 dropdown 那一刻的 originalTags（中间的 toggle 全部撤销）
      setSpaceItems((items) => items.map((i) => (i.id === editing.itemId ? { ...i, customTags: editing.originalTags } : i)));
    }
  }, [persistAssignment, messageApi, syncSpaceCache, setSpaceItems]);

  // 切换项目标签——纯本地 toggle，不发 API
  // functional updater 防 stale state（rapid click 安全）
  const handleToggleTag = useCallback(
    (itemId: string, tagId: string) => {
      setSpaceItems((items) =>
        items.map((i) => {
          if (i.id !== itemId) return i;
          const currentTags = i.customTags || [];
          const newTags = currentTags.includes(tagId) ? currentTags.filter((t) => t !== tagId) : [...currentTags, tagId];
          return { ...i, customTags: newTags };
        }),
      );
    },
    [setSpaceItems],
  );

  // 卸载兜底：用户在 dropdown 开着的时候 F5 / 路由跳走 → fire-and-forget 提交
  // 浏览器在 unload 期间通常会让 in-flight 请求继续完成；rare case 失败接受丢失（用户可重新 toggle）
  useEffect(() => {
    return () => {
      const editing = dropdownEditRef.current;
      if (!editing) return;
      dropdownEditRef.current = null;
      const currentItem = spaceItemsRef.current.find((i) => i.id === editing.itemId);
      if (!currentItem || tagsEqual(currentItem.customTags || [], editing.originalTags)) return;
      persistAssignment(editing.itemId, [...(currentItem.customTags || [])]).catch(() => {});
      // 卸载时也镜像本地最新状态进模块缓存，避免下次 remount 读到旧 tags 并触发全量覆盖
      syncSpaceCache(spaceItemsRef.current, customTagsRef.current);
    };
  }, [persistAssignment, syncSpaceCache]);

  return { openTagDropdownItemId, setOpenTagDropdownItemId, dropdownEditRef, saveTagAssignment, handleToggleTag, spaceItemsRef, customTagsRef };
}
