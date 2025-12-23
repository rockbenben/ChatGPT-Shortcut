/**
 * Core type definitions for the ChatGPT-Shortcut application
 */

import type { TagType } from "@site/src/data/User.d";

// ============== Prompt Types ==============

/**
 * Language-specific content for a prompt
 */
export interface LanguageContent {
  title: string;
  prompt: string;
  description?: string;
  remark: string;
}

/**
 * Base prompt data from JSON files
 */
export interface PromptData {
  id: number;
  zh?: LanguageContent;
  en?: LanguageContent;
  ja?: LanguageContent;
  ko?: LanguageContent;
  website: string | null;
  tags: TagType[];
  weight: number;
  metaDescription?: string;
  metaTitle?: string;
}

/**
 * Community prompt data
 */
export interface CommunityPromptData {
  id: number;
  title: string;
  description: string;
  note?: string;
  remark?: string;
  tags: TagType[];
  owner: string;
  upvotes: number;
  downvotes: number;
  upvoteDifference: number;
  copyCount?: number;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * User-created prompt data
 */
export interface UserPromptData {
  id: number;
  title: string;
  description: string;
  remark?: string;
  tags: TagType[];
  owner?: string;
}

// ============== Comment Types ==============

/**
 * Comment author information
 */
export interface CommentAuthor {
  id: number;
  name: string;
  email?: string;
}

/**
 * Comment data structure
 */
export interface CommentData {
  id: number;
  content: string;
  author?: CommentAuthor;
  createdAt: string;
  updatedAt?: string;
  threadOf?: { id: number };
  children?: CommentData[];
}

// ============== User/Auth Types ==============

/**
 * User favorites structure
 */
export interface UserFavorites {
  id: number;
  loves: number[];
  commLoves: number[];
}

/**
 * User authentication data
 */
export interface UserAuthData {
  id: number;
  username: string;
  email: string;
  favorites?: UserFavorites;
  userprompts?: UserPromptData[];
}

/**
 * Full user authentication context
 */
export interface UserAuth {
  jwt?: string;
  data?: UserAuthData;
}

// ============== Modal Data Types ==============

/**
 * Data passed to prompt detail modal
 */
export interface PromptModalData {
  id: number;
  title: string;
  prompt: string;
  description?: string;
  remark?: string;
  tags: TagType[];
  owner?: string;
  vote?: number;
  copyCount?: number;
}

// ============== API Response Types ==============

/**
 * Pagination metadata from API
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Generic paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

// ============== Component Prop Types ==============

/**
 * Common props for prompt card components
 */
export interface BaseCardProps {
  isDescription?: boolean;
  onOpenModal?: (data: PromptModalData) => void;
}

/**
 * Props for DataCard component
 */
export interface DataCardProps extends BaseCardProps {
  data: PromptData;
  copyCount?: number;
}

/**
 * Props for CommunityCard component
 */
export interface CommunityCardProps extends BaseCardProps {
  data: CommunityPromptData;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number, isComm: boolean) => void;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
  onEdit?: (data: CommunityPromptData) => void;
}

/**
 * Props for FavoriteCard component
 */
export interface FavoriteCardProps extends BaseCardProps {
  data: PromptData | CommunityPromptData;
  isFiltered?: boolean;
  type?: "favorite" | "community";
  onRemoveFavorite?: (id: number, isComm: boolean) => void;
}

/**
 * Props for UserCard component
 */
export interface UserCardProps extends BaseCardProps {
  data: UserPromptData;
  onEdit?: (data: UserPromptData) => void;
  onDelete?: (id: number) => void;
}
