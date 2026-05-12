/**
 * MySpace 数据工具函数
 * 从 items 数组推导 loves, commLoves, userprompts
 */

export interface MySpaceItem {
  id: number;
  type: "favorite" | "prompt";
  source: "card" | "community" | "userprompt";
  updatedAt?: string;
  share?: boolean;
  tags?: string[];
}

/**
 * 从 items 推导出 loves（收藏的卡片ID列表）
 */
export function deriveLoves(items: MySpaceItem[]): number[] {
  return items.filter((item) => item.type === "favorite" && item.source === "card").map((item) => item.id);
}

/**
 * 从 items 推导出 commLoves（收藏的社区提示词ID列表）
 */
export function deriveCommLoves(items: MySpaceItem[]): number[] {
  return items.filter((item) => item.type === "favorite" && item.source === "community").map((item) => item.id);
}

/**
 * 从 items 推导出 userprompts（用户提示词）
 */
export function deriveUserprompts(items: MySpaceItem[]): Array<{ id: number; share: boolean; updatedAt?: string }> {
  return items
    .filter((item) => item.type === "prompt" && item.source === "userprompt")
    .map((item) => ({
      id: item.id,
      share: item.share ?? false,
      updatedAt: item.updatedAt,
    }));
}

/**
 * 将 /myspace 形态的 server 响应 enrich 成 userAuth.data 形态。
 * AuthContext.fetchUser 与 useFavorite 的 server-reconcile 共用此逻辑，保持 shape 一致。
 */
export function enrichMySpaceData(myspaceData: {
  favoriteId?: number | null;
  items?: any[];
  customTags?: any;
  [k: string]: any;
}): any {
  const customTagsArray = Array.isArray(myspaceData.customTags) ? myspaceData.customTags : myspaceData.customTags?.definitions || [];

  const validItems: MySpaceItem[] = (myspaceData.items || []).filter((item: any) => {
    if (item.id == null || item.id === undefined) {
      console.warn("[enrichMySpaceData] Filtered out invalid item with null ID:", item);
      return false;
    }
    return true;
  });

  return {
    ...myspaceData,
    customTags: customTagsArray,
    items: validItems,
    favorites: {
      id: myspaceData.favoriteId,
      loves: deriveLoves(validItems),
      commLoves: deriveCommLoves(validItems),
      customTags: {
        definitions: customTagsArray,
        itemTags: myspaceData.customTags?.itemTags || {},
      },
    },
    userprompts: deriveUserprompts(validItems),
  };
}
