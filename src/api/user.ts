/**
 * User APIs - User info, username update
 */
import { apiClient, getAuthToken } from "./client";
import { setCache, getCache, removeCache, CACHE_TTL, CACHE_PREFIX, getPromptCacheKey, extendCache, setCacheWithETag } from "@site/src/utils/cache";
import { getPrompts } from "./prompts";

/**
 * Get complete user info for logged-in user
 * Uses ETag for efficient caching
 */
export async function getUserAllInfo() {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  const cacheKey = CACHE_PREFIX.USER_PROFILE;
  const cachedEtag = getCache(`${cacheKey}_etag`);
  const cachedData = getCache(cacheKey);

  // 安全检查：如果有 ETag 但数据为 null，清除 ETag 并重新请求
  // 这种情况可能发生在用户清除缓存后但 ETag 未被清除时
  if (cachedEtag && !cachedData) {
    console.warn("[UserInfo] Found ETag but no cached data, clearing ETag");
    removeCache(`${cacheKey}_etag`);
  }

  try {
    const response = await apiClient.get(`/users/me?fields[0]=username&fields[1]=email&fields[2]=provider`, {
      headers: {
        // 使用标准 HTTP If-None-Match header
        // 仅当有 ETag 且有缓存数据时才发送
        ...(cachedEtag && cachedData && { "If-None-Match": cachedEtag }),
      },
      validateStatus: (status) => status === 200 || status === 304,
    });

    // Handle 304 Not Modified
    if (response.status === 304) {
      console.log("[UserInfo] Data unchanged, extending cache");
      extendCache(cacheKey, CACHE_TTL.USER_PROFILE);
      return cachedData;
    }

    // Extract and cache new ETag
    const newEtag = response.headers["etag"] || response.headers["ETag"];
    const normalizedResponse = { data: response.data };

    setCacheWithETag(cacheKey, normalizedResponse, CACHE_TTL.USER_PROFILE, newEtag);
    if (newEtag) {
      console.log("[UserInfo] ETag cached:", newEtag);
    }

    // 简单预热：异步加载 userprompts 缓存（智能刷新由 MySpace 处理）
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
    // Handle 304 in error handler (some axios configs)
    if (error.response?.status === 304) {
      console.log("[UserInfo] 304 handled as error, using cache");
      return cachedData;
    }

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
