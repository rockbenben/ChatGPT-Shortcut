import { CSSProperties, ReactNode } from "react";

/**
 * 拖拽排序的注入口。useSortable 只在 user/myspace/SortableCard 里调用，卡片本身不 import
 * @dnd-kit：卡片被首页、社区列表这些不拖拽的页面共用，静态 import 会让它们每页多背 ~20 KB gz。
 */
export interface SortableCardProps {
  setNodeRef: (el: HTMLElement | null) => void;
  style: CSSProperties;
  attributes: Record<string, any>;
  listeners?: Record<string, any>;
}

export interface PromptCardProps {
  type: "user" | "favorite" | "data" | "community";
  data: any; // We'll refine this type as we go
  /** 仅 MySpace 的 SortableCard 传入；有它才渲染拖拽把手 */
  sortable?: SortableCardProps;
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
}
