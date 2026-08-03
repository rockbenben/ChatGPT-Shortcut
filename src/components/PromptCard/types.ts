import { ReactNode } from "react";

export interface PromptCardProps {
  type: "user" | "favorite" | "data" | "community";
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
}
