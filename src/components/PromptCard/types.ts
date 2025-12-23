import { ReactNode } from "react";

export type CardType = "user" | "favorite" | "data" | "community";

export interface PromptCardProps {
  type: CardType;
  data: any; // We'll refine this type as we go
  index?: number; // For sortable items
  sortableId?: string | number; // Custom ID for sortable context (uses data.id if not provided)
  isFiltered?: boolean;
  onEdit?: (data: any) => void;
  onDelete?: (id: string) => void;
  onRemoveFavorite?: (id: string, isComm?: boolean) => void;
  onToggleFavorite?: (id: string | number, isComm: boolean) => void;
  onVote?: (id: string | number, action: "upvote" | "downvote") => void;
  isFavorite?: boolean;
  copyCount?: number;

  onOpenModal?: (data: any) => void;
  onConvertToPrivate?: (data: any) => void; // Convert unavailable prompt to private
  extraActions?: ReactNode;
  typeBadge?: ReactNode;
}
