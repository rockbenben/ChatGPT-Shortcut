/**
 * 社区快照 —— 离线版的空实现。
 *
 * 在线版这里读的是构建期抓取的 src/data/communitySnapshot.json，用来在首屏之前把社区列表
 * 预热进缓存。离线版没有社区、也没有那份快照（genCommunitySnapshot.mjs 不在这条线上），
 * 但类型与导出面必须原样保留：CommunityPromptPage、PromptCard/CommunityCard、UserCard、
 * community-prompts 都从这里取类型，删掉就要改这几个文件，两条线的组件会因此分叉。
 *
 * primeCacheFromSnapshot 是空操作，communitySnapshot 是空索引 —— 调用方拿到空列表后
 * 走的是它们本来就有的「无结果」分支，不需要为离线加判断。
 */
import type { TagType } from "@site/src/data/tags";

export const COMMUNITY_PAGE_SIZE = 12;

export type CommunitySortField = "id" | "upvoteDifference";

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
  updatedAt?: string;
}

export interface CommunityPrompt extends CommunityPromptSnapshot {
  tags?: TagType[];
  copyCount?: number;
  website?: string;
  share?: boolean;
  createdAt?: string;
}

interface CommunitySnapshotIndex {
  ids: number[];
  total: number;
  etag?: string | null;
}

interface CommunitySnapshot {
  generatedAt: string | null;
  byNewest: CommunitySnapshotIndex;
  byUpvoted: CommunitySnapshotIndex;
  byId: Record<string, CommunityPromptSnapshot>;
}

const EMPTY_INDEX: CommunitySnapshotIndex = { ids: [], total: 0, etag: null };

export const communitySnapshot: CommunitySnapshot = {
  generatedAt: null,
  byNewest: EMPTY_INDEX,
  byUpvoted: EMPTY_INDEX,
  byId: {},
};

export function primeCacheFromSnapshot(): void {}
