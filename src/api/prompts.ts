/**
 * 提示词读写的离线实现。
 *
 * 精选卡片仍走 api/homepage.ts（它读的是打进产物的静态 JSON，本来就不联网，两条线共用）；
 * 自建提示词落 localStorage；社区相关一律返回空 —— 离线版没有社区。
 */
import { fetchCardsByIds } from "./homepage";
import { loadPrompts, savePrompts, nextLocalPromptId, type LocalPrompt } from "./localStore";

const nowIso = () => new Date().toISOString();

/**
 * 与在线版同签名。cards 交给 fetchCardsByIds（静态 JSON），userprompts 读本地，commus 恒空。
 * ids 允许是 number[] 或 { id }[]，与在线版一致 —— AuthContext 传的就是后者。
 */
export async function getPrompts(type: "cards" | "commus" | "userprompts", ids: number[] | { id: number }[], lang?: string) {
  if (!ids || ids.length === 0) return [];

  const normalized: number[] = typeof (ids as any[])[0] === "object" ? (ids as { id: number }[]).map((p) => p.id) : (ids as number[]);

  if (type === "cards") return fetchCardsByIds(normalized, lang);
  if (type === "commus") return [];

  // userprompts：按传入 id 顺序返回，缺失的跳过（条目可能已被删除，但排序表里还留着）
  const byId = new Map(loadPrompts().map((p) => [p.id, p]));
  return normalized.map((id) => byId.get(id)).filter(Boolean) as LocalPrompt[];
}

export async function submitPrompt(values: { title: string; description: string; remark?: string; notes?: string; share?: boolean }) {
  const list = loadPrompts();
  const prompt: LocalPrompt = {
    id: nextLocalPromptId(list),
    title: values.title,
    description: values.description,
    remark: values.remark,
    notes: values.notes,
    // share 在离线版没有意义（没有社区可分享），但保留字段：
    // 导出的备份要能被在线版导入，丢字段会让那边的条目全部变成未分享。
    share: values.share ?? false,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    copyCount: 0,
  };
  savePrompts([prompt, ...list]);
  return { data: { id: prompt.id, attributes: prompt } };
}

export async function updatePrompt(id: number, values: { title: string; description: string; remark?: string; notes?: string; share?: boolean }) {
  if (!id) throw new Error("prompt id is required");
  const list = loadPrompts();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error(`prompt ${id} not found`);
  list[idx] = { ...list[idx], ...values, updatedAt: nowIso() };
  savePrompts(list);
  return { data: { id, attributes: list[idx] } };
}

export async function deletePrompt(id: number) {
  savePrompts(loadPrompts().filter((p) => p.id !== id));
  return { success: true };
}

/**
 * 复制次数：在线版打到服务端做全站统计，离线版只累加本机计数。
 * 它驱动等级系统（LevelSystem 按累计复制数算等级），所以不能直接空实现 —— 那样等级永远停在 L00。
 */
export async function updateCopyCount(cardId: number) {
  const list = loadPrompts();
  const idx = list.findIndex((p) => p.id === cardId);
  if (idx !== -1) {
    list[idx] = { ...list[idx], copyCount: (list[idx].copyCount ?? 0) + 1 };
    savePrompts(list);
  }
  return { success: true };
}

/**
 * 社区列表：恒返回空页。形状必须与在线版一致（[ids, { pagination }] 元组）——
 * 调用方 SearchBar / useFallbackSearch / community-prompts 都按元组解构，
 * 返回 undefined 或裸数组会让它们抛错而不是优雅显示「无结果」。
 */
export async function getCommPrompts(
  page: number,
  pageSize: number,
  _sortField?: string,
  _sortOrder?: string,
  _searchTerm?: string,
): Promise<[any[], { pagination: { page: number; pageSize: number; pageCount: number; total: number } }]> {
  // 返回类型显式写成元组而不是让 TS 推成联合数组：调用方按 result[0] / result[1] 解构，
  // 推断成 (any[] | {pagination})[] 会让每个解构点都报「属性不存在」。
  return [[], { pagination: { page, pageSize, pageCount: 0, total: 0 } }];
}

/** 投票需要服务端计数，离线版无从落地：空操作，UI 侧的乐观更新会自行回滚 */
export async function voteOnUserPrompt(_promptId: number, _action: "upvote" | "downvote") {
  return {};
}
