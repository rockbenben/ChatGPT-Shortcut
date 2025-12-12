/**
 * Comments APIs - get and post comments
 */
import { apiClient } from "./client";
import { setCache, getCache, flushCacheByPrefix, getListCacheKey, CACHE_TTL, CACHE_PREFIX, getETag, setCacheWithETag, extendCache } from "@site/src/utils/cache";

/**
 * Clear comments cache for a specific page
 */
function clearCommentsCache(id: number, type: string = "card") {
  const prefix = `${CACHE_PREFIX.COMMENTS}${type}_${id}`;
  flushCacheByPrefix(prefix);
}

/**
 * Get comments for a page
 */
export async function getComments(id: number, page: number, pageSize: number, type: string = "card") {
  const cacheKey = getListCacheKey(CACHE_PREFIX.COMMENTS, type, id, page, pageSize);
  const cachedData = getCache(cacheKey);
  const cachedEtag = getETag(cacheKey);

  // 防御性检查：ETag 存在但数据为 null
  if (cachedEtag && !cachedData) {
    console.warn("[Comments] Found ETag but no cached data, clearing ETag");
    const { removeETag } = require("@site/src/utils/cache");
    removeETag(cacheKey);
  }

  try {
    const response = await apiClient.get(
      `/comments/api::${type}.${type}:${id}/flat?fields[0]=content&fields[1]=createdAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true&sort=id:desc`,
      {
        headers: {
          ...(cachedEtag && cachedData && { "If-None-Match": cachedEtag }),
        },
        validateStatus: (status) => status === 200 || status === 304,
      }
    );

    // Handle 304 Not Modified
    if (response.status === 304) {
      console.log("[Comments] Data unchanged, extending cache");
      extendCache(cacheKey, CACHE_TTL.COMMENTS);
      return cachedData;
    }

    // Handle 200 OK
    const newEtag = response.headers["etag"] || response.headers["ETag"];
    setCacheWithETag(cacheKey, response.data, CACHE_TTL.COMMENTS, newEtag);
    return response.data;
  } catch (error) {
    // Handle 304 in catch block
    if (error?.response?.status === 304) {
      console.log("[Comments] 304 handled in catch, extending cache");
      extendCache(cacheKey, CACHE_TTL.COMMENTS);
      return cachedData;
    }

    console.error("Error fetching comments:", error);
    throw error;
  }
}

/**
 * Post a new comment
 */
export async function postComment(pageId: number, commentContent: string, threadOf: number | null = null, type: string = "card") {
  try {
    const response = await apiClient.post(`/comments/api::${type}.${type}:${pageId}`, {
      content: commentContent,
      threadOf,
    });

    clearCommentsCache(pageId, type);
    return response;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}
