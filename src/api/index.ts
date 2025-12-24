/**
 * API Module - Barrel export for all API functions
 *
 * This module re-exports all API functions from their respective modules
 * to maintain backward compatibility with existing imports from "@site/src/api"
 */

// API 配置（定义在 config.ts，此处重新导出）
export { API_URL, GAUTH_API_BASE } from "./config";

// Client utilities
export { clearUserProfileCache, getAuthToken, persistAuthToken, apiClient } from "./client";

// Auth APIs
export { register, login, changePassword, forgotPassword, resetPassword, sendPasswordlessLink, loginWithToken, getGoogleAuthUrl, googleLogin } from "./auth";

// User APIs
export { getUserAllInfo, updateUsername } from "./user";

// Prompts APIs
export { getPrompts, submitPrompt, updatePrompt, deletePrompt, getCommPrompts, findCardsWithTags, voteOnUserPrompt, fetchAllCopyCounts, updateCopyCount } from "./prompts";

// Favorites APIs
export { createFavorite, updateFavorite } from "./favorites";

// MySpace APIs
export { getMySpace, clearMySpaceCache, updateMySpaceOrder, updateCustomTags } from "./myspace";

// Comments APIs
export { getComments, postComment } from "./comments";
