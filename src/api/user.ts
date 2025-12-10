/**
 * User APIs - User info, username update
 */
import { apiClient, getAuthToken, clearUserAllInfoCache } from "./client";
import { setCache, getCache, CACHE_TTL, CACHE_PREFIX, getPromptCacheKey } from "@site/src/utils/cache";
import { getPrompts } from "./prompts";

/**
 * Update user info cache with new data
 */
export const updateUserInfoCache = (setField: string, updatedData: unknown) => {
  const cachedData = getCache(CACHE_PREFIX.USER_INFO);
  if (!cachedData) return;

  try {
    cachedData.data = cachedData.data || {};

    if (setField === "favorites.loves") {
      cachedData.data.favorites = cachedData.data.favorites || {};
      cachedData.data.favorites.loves = updatedData;
    } else if (setField === "favorites.commLoves") {
      cachedData.data.favorites = cachedData.data.favorites || {};
      cachedData.data.favorites.commLoves = updatedData;
    } else {
      cachedData.data[setField] = updatedData;
    }

    setCache(CACHE_PREFIX.USER_INFO, cachedData, CACHE_TTL.USER_INFO);
  } catch (error) {
    console.error("Error updating user info cache:", error);
  }
};

/**
 * Get complete user info for logged-in user
 */
export async function getUserAllInfo() {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  const cacheKey = CACHE_PREFIX.USER_INFO;
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await apiClient.get(
      `/users/me?fields[0]=username&fields[1]=email&populate[favorites][fields][0]=loves&populate[favorites][fields][1]=commLoves&populate[userprompts][fields][0]=id&populate[userprompts][fields][1]=share`
    );

    const normalizedResponse = { data: response.data };
    setCache(cacheKey, normalizedResponse, CACHE_TTL.USER_INFO);

    // Pre-warm userprompts cache
    const userprompts = response.data.userprompts;
    if (userprompts && userprompts.length > 0) {
      const uncachedPrompts = userprompts.filter((p: { id: number }) => {
        const promptCacheKey = getPromptCacheKey("userprompts", p.id);
        return !getCache(promptCacheKey);
      });

      if (uncachedPrompts.length > 0) {
        getPrompts("userprompts", uncachedPrompts);
      }
    }

    return normalizedResponse;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

/**
 * Update username
 */
export async function updateUsername(username: string) {
  try {
    const response = await apiClient.put(`/favorites/update-username`, {
      data: { newUsername: username },
    });
    return response;
  } catch (error) {
    console.error("Error updating Username:", error);
    throw error;
  }
}
