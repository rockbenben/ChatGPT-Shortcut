/**
 * Favorites APIs - delta-based mutation client.
 * 历史的 createFavorite / updateFavorite (full-array PUT) 已删除，所有路径走 patchFavorites。
 */
import { apiClient } from "./client";

export interface FavoriteFieldOps {
  add?: number[];
  remove?: number[];
}
export interface FavoriteDeltaOps {
  loves?: FavoriteFieldOps;
  commLoves?: FavoriteFieldOps;
}

/**
 * /myspace 端点的响应形态（GET /api/myspace）。仅用于 AuthContext.fetchUser
 * 和 bulk-import-后续 refresh。每次 PATCH 不再使用这个 shape。
 */
export interface MySpaceShape {
  favoriteId: number | null;
  items: Array<{ id: number; type: string; source: string; updatedAt?: string; share?: boolean; tags?: string[] }>;
  customTags: Array<{ id: string; name: string; color: string; order: number }>;
}

/**
 * PATCH /favorites/me 的 delta 响应形态。
 *  - loves/commLoves: server 端 merge 后的权威 id 数组
 *  - added: 本次操作中真正新加进 mySpaceOrder 的 items（含 server 的 updatedAt）；
 *    幂等 add 不计入 added。
 * 客户端拿 ops 和 added 自行调整本地 items，避免每次重传完整列表。
 */
export interface FavoriteDeltaResponse {
  favoriteId: number;
  loves: number[];
  commLoves: number[];
  added: Array<{ id: number; type: string; source: string; updatedAt?: string }>;
}

/**
 * Apply delta favorite ops (add / remove) — server merges against current DB state,
 * so concurrent edits on different devices don't lose entries.
 * Auto-creates the favorite record if the user doesn't have one yet.
 *
 * 返回 delta（不是完整 items）以避免每次 PATCH 都重传所有收藏。
 * 调用方（useFavorite）负责把 ops + delta 应用到本地 items 上，
 * 并写入 lscache-user_auth + lscache-myspace 保持一致。
 */
export async function patchFavorites(ops: FavoriteDeltaOps): Promise<FavoriteDeltaResponse> {
  const response = await apiClient.patch<FavoriteDeltaResponse>("/favorites/me", ops);
  return response.data;
}
