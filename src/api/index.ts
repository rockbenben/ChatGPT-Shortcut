/**
 * API Module - Barrel export for all API functions
 *
 * This module re-exports all API functions from their respective modules
 * to maintain backward compatibility with existing imports from "@site/src/api"
 */

// Client utilities
export { clearUserAllInfoCache, getAuthToken, persistAuthToken, apiClient } from "./client";

// Auth APIs
export { register, login, changePassword, forgotPassword, resetPassword, sendPasswordlessLink, loginWithToken } from "./auth";

// User APIs
export { getUserAllInfo, updateUsername, updateUserInfoCache } from "./user";

// Prompts APIs
export { getPrompts, submitPrompt, updatePrompt, deletePrompt, updatePromptsOrder, getCommPrompts, findCardsWithTags, voteOnUserPrompt, fetchAllCopyCounts, updateCopyCount } from "./prompts";

// Favorites APIs
export { createFavorite, updateFavorite, updateFavoritesOrder } from "./favorites";

// Comments APIs
export { getComments, postComment } from "./comments";
