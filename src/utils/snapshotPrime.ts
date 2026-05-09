/**
 * 社区快照子系统的总入口：
 *   - 类型 + 常量：CommunityPromptSnapshot（snapshot 实际形状）/ CommunityPrompt
 *     （extends 后的 API 全字段形状，卡片用）/ CommunitySnapshotIndex /
 *     COMMUNITY_PAGE_SIZE / CommunitySortField
 *   - 类型化的 snapshot 数据（communitySnapshot 已 cast 为 CommunitySnapshot，消费方无需再 cast）
 *   - primeCacheFromSnapshot：把 snapshot 写进 lscache 两层
 *
 * Prime 行为：
 *   1) 列表层 cl_..._desc_noTerm
 *      用 snapshot.byNewest/byUpvoted 配 ETag + lastFetch=generatedAt：
 *        - snapshot < 1h → throttle 接管，零网络
 *        - 1-24h → If-None-Match → 多数 304 无 body
 *        - > 24h → cache TTL 已过，自然 200 重拉
 *
 *   2) 详情层 pc_commus_<id>
 *      用 snapshot.byId（带服务端真实 updatedAt）逐条 setCache：
 *        - 用户点详情 → cache 命中，零网络
 *        - 列表流跑时 → cached.updatedAt vs server.updatedAt 自动比对，
 *          一致则保留（bulk POST 跳过），不一致则 removeCache 重拉
 *
 * 关键约束：
 *   - 已有真实 lscache 时不覆盖（避免冲掉用户上次访问拿到的新数据）
 *   - 模块级 primed flag 保证整 SPA session 只 prime 一次
 *   - SSR safe：cache utils 内部已 canUseDOM 守卫；本函数只在 useEffect 中调
 *   - 列表层 cache key 必须与 src/api/prompts.ts 的 getCommPrompts 完全一致：
 *       cl_{page}_{pageSize}_{sortField}_{sortOrder}_{encodedSearchKey}
 *   - 详情层条目必须带 updatedAt，否则会被列表流的 updatedAt 比对立即清掉
 */
import {
  getCache,
  setCache,
  setCacheWithETag,
  getListCacheKey,
  getPromptCacheKey,
  getPromptTTL,
  CACHE_PREFIX,
  CACHE_TTL,
} from "@site/src/utils/cache";
import rawSnapshot from "@site/src/data/communitySnapshot.json";
import type { TagType } from "@site/src/data/User.d";

// ==================== 共享常量 ====================

// 列表页 + getCommPrompts cache key + snapshot prime 三处共用，必须保持一致
export const COMMUNITY_PAGE_SIZE = 12;

// sortField 的合法取值；对应后端 /userprompts list 端点的 sort 参数
// 字面量本身就是 API 契约，直接用字符串比 const-object 包装更直观
export type CommunitySortField = "id" | "upvoteDifference";

// ==================== 共享类型 ====================

// Strapi /userprompts 表记录的两层形状，按数据来源严格分层：
//
//   CommunityPromptSnapshot —— 构建期 snapshot.byId 实际只有这 10 个字段
//   （scripts/genCommunitySnapshot.mjs 的 PROMPT_DATA_FIELDS 投影 + 剔除 null/undefined）
//
//   CommunityPrompt extends ——— API /userprompts/bulk 响应的全字段（含 tags/
//   website/copyCount/share/createdAt），以及 getPrompts 在 prompt 不可用时打的
//   _unavailable / _noCache 标记。卡片 / 列表 state 用这个宽类型，因为它们可能
//   收到 snapshot 形状（首屏）也可能收到 API 形状（SWR 后）

export interface CommunityPromptSnapshot {
  id: number;
  title: string;
  description: string;
  remark?: string;
  notes?: string;
  owner?: string;
  upvotes?: number;
  downvotes?: number;
  upvoteDifference?: number;
  // /userprompts/bulk 响应；snapshot 也透传，runtime 用作列表流的 updatedAt 比对
  updatedAt?: string;
}

export interface CommunityPrompt extends CommunityPromptSnapshot {
  // 仅 API/lscache 全字段路径有，snapshot 投影不包含
  tags?: TagType[];
  copyCount?: number;
  website?: string;
  share?: boolean;
  createdAt?: string;
  // getPrompts 在 prompt 不可用（unshared/deleted）时打的标记
  _unavailable?: boolean;
  _unavailableReason?: string;
  _noCache?: boolean;
}

export interface CommunitySnapshotIndex {
  ids: number[];
  total: number;
  etag?: string | null;
}

export interface CommunitySnapshot {
  generatedAt: string | null;
  byNewest: CommunitySnapshotIndex;
  byUpvoted: CommunitySnapshotIndex;
  // 严格用窄类型：snapshot 永远不会有 tags/website/_unavailable 等
  byId: Record<string, CommunityPromptSnapshot>;
}

// 类型化的 snapshot 数据：消费方直接 import 这个，不必各自做 `as unknown as ...` cast
// JSON 字面类型对 nullable optional 字段过窄（remark/notes 不存在时 TS 推断为 never），
// 所以在边界做一次 unknown 断言把它收窄到我们的 schema
export const communitySnapshot = rawSnapshot as unknown as CommunitySnapshot;

// ==================== Prime 实现 ====================

let primed = false;

export function primeCacheFromSnapshot(): void {
  if (primed) return;
  primed = true;

  const generatedAtMs = communitySnapshot.generatedAt ? Date.parse(communitySnapshot.generatedAt) : NaN;
  if (!Number.isFinite(generatedAtMs)) return;

  const { byId } = communitySnapshot;

  // 1) 列表层
  primeListView("id", communitySnapshot.byNewest, byId, generatedAtMs);
  primeListView("upvoteDifference", communitySnapshot.byUpvoted, byId, generatedAtMs);

  // 2) 详情层：byId 全量铺进 pc_commus_<id>
  primeDetailEntries(byId);
}

function primeListView(sortField: CommunitySortField, idx: CommunitySnapshotIndex, byId: Record<string, CommunityPromptSnapshot>, generatedAtMs: number): void {
  if (!idx?.ids?.length) return;

  // cl_1_12_id_desc_noTerm / cl_1_12_upvoteDifference_desc_noTerm
  const cacheKey = getListCacheKey(CACHE_PREFIX.COMM_LISTS, 1, COMMUNITY_PAGE_SIZE, sortField, "desc", "noTerm");
  if (getCache(cacheKey)) return;

  const items = idx.ids.map((id) => byId[String(id)]).filter(Boolean);
  if (items.length === 0) return;

  // getCommPrompts 把 result 形如 [items, { pagination: { total } }] 写进 cache，对齐这个形状
  const result = [items, { pagination: { total: idx.total } }];
  setCacheWithETag(cacheKey, result, CACHE_TTL.COMM_PROMPT_LISTS, idx.etag ?? "");
  setCache(`${cacheKey}_lastFetch`, generatedAtMs, CACHE_TTL.COMM_PROMPT_LISTS);
}

function primeDetailEntries(byId: Record<string, CommunityPromptSnapshot>): void {
  const ttl = getPromptTTL("commus"); // 30 天
  for (const [idStr, prompt] of Object.entries(byId)) {
    // 没 updatedAt 的 prime 进去会被列表流的对比立刻清掉，跳过
    if (!prompt?.updatedAt) continue;
    const numericId = Number(idStr);
    if (!Number.isInteger(numericId) || numericId <= 0) continue;

    const key = getPromptCacheKey("commus", numericId);
    if (getCache(key)) continue; // 不覆盖真数据

    setCache(key, prompt, ttl);
  }
}
