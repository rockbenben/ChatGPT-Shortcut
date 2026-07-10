import { useCallback, useEffect, useRef, useState } from "react";
import { getPrompts } from "@site/src/api";
import type { CustomTag } from "./types";

interface CacheRef {
  userId: number;
  hash: string;
  structuralHash: string;
}

// 模块级缓存（跨挂载保持，用于 explore→collection 视图切换时即时显示）
let _spaceItemsCache: {
  items: any[];
  tags: CustomTag[];
  ref: CacheRef;
} | null = null;

interface UseSpaceItemsParams {
  userAuth: any;
  currentLanguage: string;
  onDataLoaded?: (data: { totalItems: number; totalPrompts: number; totalFavorites: number; totalTags: number }) => void;
  messageApi: any;
}

/**
 * MySpace 数据加载：
 * - 从 userAuth.data.items 批量拉取 prompt/card/community 详情并按后端顺序组装
 * - 双哈希判断：structuralHash（增删/排序）决定是否显示骨架屏，完整 hash（含 updatedAt）决定是否跳过
 * - 模块级缓存跨挂载保持，视图切换 remount 时即时显示
 */
export function useSpaceItems({ userAuth, currentLanguage, onDataLoaded, messageApi }: UseSpaceItemsParams) {
  // 从模块缓存初始化（仅同一用户且数据结构未变时有效），避免 explore→collection 切换时重新加载
  // 需要验证结构哈希：如果用户在 explore 视图中添加/删除了收藏，缓存就失效
  // 一次性计算：原写法 validCache 在函数体顶部，items.map+join 每次 re-render 都会跑，
  // 但只在 mount 时被 useState/useRef 用作初始值，subsequent render 重算无意义
  const initialCacheRef = useRef<{ items: any[]; tags: CustomTag[]; ref: CacheRef | null } | null>(null);
  if (initialCacheRef.current === null) {
    const userId = userAuth?.data?.id;
    const items = userAuth?.data?.items || [];
    const structuralHash = items.map((item: any) => `${item.type}_${item.source}_${item.id}`).join(",");
    const validCache = _spaceItemsCache && _spaceItemsCache.ref?.userId === userId && _spaceItemsCache.ref?.structuralHash === structuralHash;
    initialCacheRef.current = validCache ? { items: _spaceItemsCache!.items, tags: _spaceItemsCache!.tags, ref: _spaceItemsCache!.ref } : { items: [], tags: [], ref: null };
  }

  const [spaceItems, setSpaceItems] = useState<any[]>(initialCacheRef.current.items);
  const [customTags, setCustomTags] = useState<CustomTag[]>(initialCacheRef.current.tags);
  const [dataProcessing, setDataProcessing] = useState(false);

  // 跟踪已加载的用户数据，避免重复加载
  const lastLoadedRef = useRef<CacheRef | null>(initialCacheRef.current.ref);

  // 把当前本地 spaceItems/customTags 镜像进模块级缓存。
  // 标签 mutation（toggle 提交 / 管理标签保存）只改 item.tags 与 definitions，不改
  // structuralHash/hash，所以加载 effect 会走「完全相同：跳过」分支、永不重写 _spaceItemsCache。
  // 若不在此同步，explore→collection 切视图 remount 时会命中带旧 tags 的缓存：UI 回退，
  // 且下次全量 PATCH /favorites/custom-tags 会用旧 itemTags 覆盖服务器已保存的标签——真实数据丢失。
  // 沿用 lastLoadedRef 当前 ref（tags 变更不影响它）；无有效 ref 时清空缓存，强制下次 remount 重建。
  const syncSpaceCache = useCallback((items: any[], tags: CustomTag[]) => {
    _spaceItemsCache = lastLoadedRef.current ? { items, tags, ref: lastLoadedRef.current } : null;
  }, []);

  // 加载数据 - 直接使用 AuthContext 提供的数据
  useEffect(() => {
    if (!userAuth?.data) {
      setSpaceItems([]);
      return;
    }

    const items = userAuth.data.items || [];
    const currentUserId = userAuth.data.id;

    // 结构哈希（增删/排序变化）与完整哈希（含 updatedAt）分离
    const structuralHash = items.map((item: any) => `${item.type}_${item.source}_${item.id}`).join(",");
    const currentHash = items.map((item: any) => `${item.type}_${item.source}_${item.id}_${item.updatedAt || ""}`).join(",");

    // 用户切换时，重置状态避免显示上一个用户的数据
    if (lastLoadedRef.current?.userId !== currentUserId) {
      lastLoadedRef.current = null;
      _spaceItemsCache = null;
      setSpaceItems([]);
    }

    // 完全相同（含 updatedAt）：跳过
    if (lastLoadedRef.current?.userId === currentUserId && lastLoadedRef.current?.hash === currentHash && spaceItems.length > 0) {
      setDataProcessing(false);
      return;
    }

    // 结构不变且已有数据时，静默刷新（不显示骨架屏）
    const isSilentRefresh = lastLoadedRef.current?.userId === currentUserId && lastLoadedRef.current?.structuralHash === structuralHash && spaceItems.length > 0;

    let isMounted = true;

    const fetchData = async () => {
      if (!userAuth?.data) return;

      // 仅在首次加载或结构变化时显示骨架屏
      if (!isSilentRefresh) {
        setDataProcessing(true);
      }

      try {
        const { items, customTags: tagsArray } = userAuth.data;

        if (isMounted) {
          setCustomTags(tagsArray || []);
        }

        // 从 items 提取需要获取详细数据的 IDs
        const promptIds = items.filter((item) => item.type === "prompt").map((item) => item.id);
        const cardIds = items.filter((item) => item.source === "card").map((item) => item.id);
        const commuIds = items.filter((item) => item.source === "community").map((item) => item.id);

        // 批量获取详细数据（AuthProvider 已预取，大部分会命中缓存）
        const [userPromptsData, cardsData, commusData] = await Promise.all([
          promptIds.length > 0 ? getPrompts("userprompts", promptIds) : Promise.resolve([]),
          cardIds.length > 0 ? getPrompts("cards", cardIds, currentLanguage) : Promise.resolve([]),
          commuIds.length > 0 ? getPrompts("commus", commuIds) : Promise.resolve([]),
        ]);

        // 创建详细数据映射
        const promptsMap = new Map(userPromptsData.map((p) => [p.id, p]));
        const cardsMap = new Map(cardsData.map((c) => [c.id, c]));
        const commusMap = new Map(commusData.map((c) => [c.id, c]));

        // 直接按照 items 的顺序构建 allItems（保持后端排序）
        const allItems = items
          .map((item) => {
            let detailData;

            if (item.type === "prompt") {
              detailData = promptsMap.get(item.id);
            } else if (item.source === "card") {
              detailData = cardsMap.get(item.id);
            } else if (item.source === "community") {
              detailData = commusMap.get(item.id);
            }

            if (!detailData) return null;

            return {
              id: `${item.type}_${item.source}_${item.id}`,
              type: item.type,
              source: item.source,
              sourceId: item.id,
              data: detailData,
              customTags: item.tags || [],
            };
          })
          .filter(Boolean);

        if (isMounted) {
          setSpaceItems(allItems);
          const newRef = { userId: currentUserId, hash: currentHash, structuralHash };
          lastLoadedRef.current = newRef;

          // 更新模块级缓存，供下次挂载时即时显示
          _spaceItemsCache = { items: allItems, tags: tagsArray || [], ref: newRef };

          if (onDataLoaded) {
            const actualPrompts = allItems.filter((item) => item.type === "prompt").length;
            const actualFavorites = allItems.filter((item) => item.type === "favorite").length;
            onDataLoaded({
              totalItems: allItems.length,
              totalPrompts: actualPrompts,
              totalFavorites: actualFavorites,
              totalTags: (tagsArray || []).length,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch MySpace data:", error);
        if (isMounted) {
          messageApi.error("加载数据失败");
        }
      } finally {
        if (isMounted) {
          setDataProcessing(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userAuth, currentLanguage, onDataLoaded, messageApi]);

  return { spaceItems, setSpaceItems, customTags, setCustomTags, dataProcessing, syncSpaceCache };
}
