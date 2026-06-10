import { ReactNode } from "react";
import type { TagType } from "@site/src/data/User.d";

export type CardType = "user" | "favorite" | "data" | "community";

// Prompt 卡片数据类型。
// 原从 @site/src/utils/snapshotPrime 导入；offline 分支已移除该联网 util
// （快照 prime 依赖社区 API），类型随消费它的卡片组件就近保留，字段与在线版一致。
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
  // 提示词不可用（unshared/deleted）时的标记
  _unavailable?: boolean;
  _unavailableReason?: string;
  _noCache?: boolean;
}

export interface PromptCardProps {
  type: CardType;
  data: any; // We'll refine this type as we go
  index?: number; // For sortable items
  sortableId?: string | number; // Custom ID for sortable context (uses data.id if not provided)
  isFiltered?: boolean;
  onEdit?: (data: any) => void;
  onDelete?: (id: number) => void;
  onRemoveFavorite?: (id: number, isComm?: boolean) => void;
  onToggleFavorite?: (id: number, isComm: boolean) => void;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
  isFavorite?: boolean;
  isLoggedIn?: boolean;
  copyCount?: number;

  onOpenModal?: (data: any) => void;
  onConvertToPrivate?: (data: any) => void; // Convert unavailable prompt to private
  extraActions?: ReactNode;
  typeBadge?: ReactNode;
}
