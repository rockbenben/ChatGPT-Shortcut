import { useCallback, useEffect, useRef, useState } from "react";
import { translate } from "@docusaurus/Translate";
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

// 共享的空标签数组（装的是标签 id）。缺席时不能每次重建都发一个 fresh []：
// 下面 setSpaceItems 的引用守卫要逐项比 `p.customTags === n.customTags`，fresh [] 让这一项
// 永不成立，守卫就白写了（N 行照旧全重渲）。顺带省下每项一个数组分配。
// 冻结只是防止有人就地 push 这份共享常量。
const EMPTY_TAGS: readonly string[] = Object.freeze([]);

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
  // 详情拉取失败标记：失败时 MySpace 要显示「加载失败 + 重试」，
  // 不能退化成「暂无内容，去创建提示词或收藏喜欢的吧」——那是谎报
  //（提示词没加载出来 ≠ 用户真的什么都没存）。
  const [fetchFailed, setFetchFailed] = useState(false);
  // 手动重试：改这个计数器触发上面的数据 effect 重跑
  const [retryNonce, setRetryNonce] = useState(0);

  // 跟踪已加载的用户数据，避免重复加载
  const lastLoadedRef = useRef<CacheRef | null>(initialCacheRef.current.ref);
  // 失败过的那一版数据哈希。同一个哈希失败过就不能再走「完全相同：跳过」短路，
  // 否则「重试」按钮点了也只是原地短路返回：请求永远不再发，错误态永远消不掉。
  // （典型触发：加载成功后 items 变动导致刷新失败，用户把改动撤回 → 哈希回到上次成功的值。）
  const failedHashRef = useRef<string | null>(null);

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
    // 但失败过的哈希不享受这个豁免——失败时 lastLoadedRef 仍指向上一次成功的版本，
    // 用户把改动撤回后哈希会与它相同，这时若照旧短路，重试就永远不会重发请求。
    if (lastLoadedRef.current?.userId === currentUserId && lastLoadedRef.current?.hash === currentHash && failedHashRef.current !== currentHash && spaceItems.length > 0) {
      setDataProcessing(false);
      // 走到这里说明「屏幕上的这份数据就是当前这份数据的最新版」，是一次成功结论，
      // 把失败标记一起清掉。否则上一次失败留下的标记会永远挂着：失败标记一立，
      // 过滤到空列表时页面就一直显示「加载数据失败」，而点重试又会落进这条短路，
      // 变成一条永远走不出去的死路。
      setFetchFailed(false);
      failedHashRef.current = null;
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
              customTags: item.tags || EMPTY_TAGS,
            };
          })
          .filter(Boolean);

        if (isMounted) {
          // 只有内容真变了才换引用。
          //
          // 收藏一次会让 userAuth.data.items 里那一项的 updatedAt 变，于是 hash 失配、
          // 走不进上面「完全相同」的短路分支；若此时无条件 setSpaceItems(allItems)，
          // 整份数组（每一项都是新对象字面量）都会换掉，SpaceItemRow 的 React.memo
          // 对【全部 N 行】失效 —— 一次收藏重渲整张列表，与实际只变了 1 条无关。
          //
          // isSilentRefresh 压住的是骨架屏，不是重建；这里补的是后者。
          // 逐项比 id/type/source/sourceId/data 引用/customTags：这 6 项就是上面构造对象的全部
          // 字段，所以"全部相等 → 返回 prev"不可能藏住真实变化。detailData 来自 getPrompts 的
          // 内存缓存层（cache.js 的 memCache 命中返回原引用），内容没变时就是同一引用。
          const isSameItems = (other: any[]) =>
            other.length === allItems.length &&
            other.every(
              (p, i) =>
                p.id === allItems[i].id &&
                p.type === allItems[i].type &&
                p.source === allItems[i].source &&
                p.sourceId === allItems[i].sourceId &&
                p.data === allItems[i].data &&
                p.customTags === allItems[i].customTags,
            );

          // 状态这一遍必须用 functional updater：并发的标签编辑只活在 live state 里，
          // 换成拿闭包快照比较会把它覆盖掉。
          setSpaceItems((prev) => (isSameItems(prev) ? prev : allItems)); // 引用不变 → memo 全部命中，不触发额外渲染
          const newRef = { userId: currentUserId, hash: currentHash, structuralHash };
          lastLoadedRef.current = newRef;

          // 更新模块级缓存，供下次挂载时即时显示。判据与状态那一遍共用，让缓存尽量存 state 里
          // 的那一份引用，而不是留一份"内容相同、指针不同"的孤儿；这里用闭包快照只做指针选型，
          // 不成立就退回 allItems，写坏 state 的风险为零。
          _spaceItemsCache = { items: isSameItems(spaceItems) ? spaceItems : allItems, tags: tagsArray || [], ref: newRef };

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
          // 拉到了就清掉失败标记
          setFetchFailed(false);
          failedHashRef.current = null;
        }
      } catch (error) {
        console.error("Failed to fetch MySpace data:", error);
        if (isMounted) {
          // 记下失败的是哪一版数据：哈希回到这个值时不能再走「完全相同：跳过」短路，
          // 否则重试按钮点了也不会重发请求（见 failedHashRef 处的说明）。
          failedHashRef.current = currentHash;
          // 标记失败：MySpace 据此渲染「加载失败 + 重试」，而不是「暂无内容」
          setFetchFailed(true);
          messageApi.error(translate({ id: "message.loadFailed", message: "加载数据失败，请稍后重试" }));
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
  }, [userAuth, currentLanguage, onDataLoaded, messageApi, retryNonce]);

  return { spaceItems, setSpaceItems, customTags, setCustomTags, dataProcessing, syncSpaceCache, fetchFailed, retry: () => setRetryNonce((n) => n + 1) };
}
