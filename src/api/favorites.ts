/**
 * 收藏的离线实现。类型与在线版逐字段一致 —— useFavorite 的乐观更新 + delta reconcile
 * 那条链路直接复用，不用为离线单开一份。
 */
import { loadFavorites, saveFavorites, buildItems } from "./localStore";

export interface FavoriteFieldOps {
  add?: number[];
  remove?: number[];
}

export interface FavoriteDeltaOps {
  loves?: FavoriteFieldOps;
  commLoves?: FavoriteFieldOps;
}

export interface MySpaceShape {
  favoriteId: number | null;
  items: Array<{ id: number; type: string; source: string; updatedAt?: string; share?: boolean; tags?: string[] }>;
  customTags: Array<{ id: string; name: string; color: string; order: number }>;
}

export interface FavoriteDeltaResponse {
  favoriteId: number;
  loves: number[];
  commLoves: number[];
  added: Array<{ id: number; type: string; source: string; updatedAt?: string }>;
}

/**
 * 在线版是 PATCH /favorites/me，服务端按当前 DB 状态合并 add/remove，所以多设备并发编辑不会互相覆盖。
 * 离线版只有本机一份数据，不存在并发，但**仍按 delta 语义处理**而不是整份覆盖：
 * 调用方传的就是 delta，整份覆盖会把它没提到的收藏一并抹掉。
 *
 * commLoves（社区收藏）恒为空：离线版没有社区。传进来的 commLoves 直接忽略，
 * 不报错 —— 导入在线版备份时会带上它，报错会让整个导入失败。
 */
export async function patchFavorites(ops: FavoriteDeltaOps): Promise<FavoriteDeltaResponse> {
  const before = loadFavorites();
  const add = ops.loves?.add ?? [];
  const remove = new Set(ops.loves?.remove ?? []);

  const next = [...before.filter((id) => !remove.has(id)), ...add.filter((id) => !before.includes(id))];
  saveFavorites(next);

  const actuallyAdded = add.filter((id) => !before.includes(id));
  return {
    favoriteId: 1,
    loves: next,
    commLoves: [],
    // added 供调用方把新条目并进本地 items。离线没有服务端时间戳，
    // 用本机时间：MySpace 的「最近添加」排序读它，缺了会让新收藏排到末尾。
    added: actuallyAdded.map((id) => ({ id, type: "favorite", source: "card", updatedAt: new Date().toISOString() })),
  };
}

/** 供导入流程在整体写入后重新取一份完整形状 */
export async function getFavoritesSnapshot(): Promise<MySpaceShape> {
  return { favoriteId: 1, items: buildItems(), customTags: [] };
}
