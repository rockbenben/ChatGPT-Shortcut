import { useCallback, useEffect, useRef, useState } from "react";
import { updateCustomTags } from "@site/src/api";
import type { CustomTag } from "./types";

interface UseTagAssignmentParams {
  spaceItems: any[];
  customTags: CustomTag[];
  setSpaceItems: React.Dispatch<React.SetStateAction<any[]>>;
  userAuth: any;
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
export function useTagAssignment({ spaceItems, customTags, setSpaceItems, userAuth, syncMySpaceState, syncSpaceCache, messageApi }: UseTagAssignmentParams) {
  // 受控管理"哪张卡片的 tag dropdown 当前展开"——为了 multi-select：点 menu item 不关闭，点外面或 manage 才关
  const [openTagDropdownItemId, setOpenTagDropdownItemId] = useState<string | null>(null);

  const spaceItemsRef = useRef(spaceItems);
  spaceItemsRef.current = spaceItems;
  const customTagsRef = useRef(customTags);
  customTagsRef.current = customTags;
  // 当前打开的 dropdown：itemId + 打开那一刻的 tag 状态（失败回滚 + diff 判断用）
  const dropdownEditRef = useRef<{ itemId: string; originalTags: string[] } | null>(null);

  // 把 spaceItemsRef 当前状态构建成 itemTags payload
  const buildItemTags = useCallback((): Record<string, string[]> => {
    const itemTags: Record<string, string[]> = {};
    spaceItemsRef.current.forEach((item) => {
      if (item.customTags && item.customTags.length > 0) {
        itemTags[item.id] = item.customTags;
      }
    });
    return itemTags;
  }, []);

  // 提交当前编辑会话——dropdown 关闭、点"管理标签"、卸载时调用
  const saveTagAssignment = useCallback(async () => {
    const editing = dropdownEditRef.current;
    if (!editing) return;
    dropdownEditRef.current = null;

    const currentItem = spaceItemsRef.current.find((i) => i.id === editing.itemId);
    if (!currentItem) return;
    const currentTags = currentItem.customTags || [];

    // 无变化（开了 dropdown 但什么都没改）→ 跳过 API
    if (tagsEqual(currentTags, editing.originalTags)) return;

    try {
      const itemTagsPayload = buildItemTags();
      await updateCustomTags({ definitions: customTagsRef.current, itemTags: itemTagsPayload });
      // 同步 userAuth.data.items[i].tags（之前此路径漏写造成隐性 drift）：
      // spaceItems 的 composite id 跟 userAuth.items 的 (type, source, id) 一一对应，
      // 用同一个 itemTags map 重新拼 tags 字段。空 tags 时移除字段，与 /myspace 返回 shape 一致。
      if (userAuth?.data?.items) {
        const newItems = (userAuth.data.items as any[]).map((it) => {
          const compositeKey = `${it.type}_${it.source}_${it.id}`;
          const tags = itemTagsPayload[compositeKey];
          if (tags && tags.length > 0) return { ...it, tags };
          const { tags: _drop, ...rest } = it;
          return rest;
        });
        syncMySpaceState({ items: newItems });
      }
      // 镜像进模块缓存：spaceItemsRef 已含本次 toggle 结果，definitions 未变
      syncSpaceCache(spaceItemsRef.current, customTagsRef.current);
    } catch (error) {
      console.error("Failed to update item tags:", error);
      messageApi.error("标签更新失败");
      // 回滚到打开 dropdown 那一刻的 originalTags（中间的 toggle 全部撤销）
      setSpaceItems((items) => items.map((i) => (i.id === editing.itemId ? { ...i, customTags: editing.originalTags } : i)));
    }
  }, [buildItemTags, messageApi, userAuth, syncMySpaceState, syncSpaceCache, setSpaceItems]);

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
      updateCustomTags({ definitions: customTagsRef.current, itemTags: buildItemTags() }).catch(() => {});
      // 卸载时也镜像本地最新状态进模块缓存，避免下次 remount 读到旧 tags 并触发全量覆盖
      syncSpaceCache(spaceItemsRef.current, customTagsRef.current);
    };
  }, [buildItemTags, syncSpaceCache]);

  return { openTagDropdownItemId, setOpenTagDropdownItemId, dropdownEditRef, saveTagAssignment, handleToggleTag, spaceItemsRef, customTagsRef };
}
