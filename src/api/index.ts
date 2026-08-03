/**
 * API Module - Barrel export for all API functions
 *
 * This module re-exports all API functions from their respective modules
 * to maintain backward compatibility with existing imports from "@site/src/api"
 */

// API 配置（定义在 config.ts，此处重新导出）
export { API_URL, GAUTH_API_BASE } from "./config";

// Client utilities
export { getAuthToken, persistAuthToken, apiClient } from "./client";
export { clearUserProfileCache, clearMySpaceCache } from "./sessionCache";

// Auth APIs
export { register, login, changePassword, forgotPassword, resetPassword, sendPasswordlessLink, loginWithToken, getGoogleAuthUrl, googleLogin } from "./auth";

// User APIs
export { getUserAllInfo, updateUsername } from "./user";

// Prompts APIs
export { getPrompts, submitPrompt, updatePrompt, deletePrompt, getCommPrompts, voteOnUserPrompt, fetchAllCopyCounts, updateCopyCount, getSingleCommPrompt } from "./prompts";

// Favorites APIs
export { patchFavorites } from "./favorites";
export type { FavoriteDeltaOps, FavoriteFieldOps, FavoriteDeltaResponse, MySpaceShape } from "./favorites";

// MySpace APIs
export { getMySpace, updateMySpaceOrder, updateCustomTags } from "./myspace";

// Comments APIs
export { getComments, postComment } from "./comments";
