/**
 * Comments APIs - get and post comments
 */
import { apiClient } from "./client";
import { setCache, getCache, flushCacheByPrefix, getListCacheKey, CACHE_TTL, CACHE_PREFIX } from "@site/src/utils/cache";

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

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await apiClient.get(
      `/comments/api::${type}.${type}:${id}/flat?fields[0]=content&fields[1]=createdAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true&sort=id:desc`
    );

    setCache(cacheKey, response.data, CACHE_TTL.COMMENTS);
    return response.data;
  } catch (error) {
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
