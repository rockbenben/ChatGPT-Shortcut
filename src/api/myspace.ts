/**
 * MySpace APIs - 我的空间数据管理
 */
import { apiClient } from "./client";
import { getCache, setCache, removeCache, CACHE_PREFIX, CACHE_TTL, extendCache, setCacheWithETag } from "@site/src/utils/cache";

/**
 * 获取 MySpace 完整数据（带 ETag 优化）
 * 包含：favorites（收藏、排序、标签）、userprompts、updatedAt
 */
export async function getMySpace() {
  const cacheKey = CACHE_PREFIX.MYSPACE;
  const cachedEtag = getCache(`${cacheKey}_etag`);
  const cachedData = getCache(cacheKey);

  // 防御性检查：ETag 存在但数据为 null
  if (cachedEtag && !cachedData) {
    console.warn("[MySpace] Found ETag but no cached data, clearing ETag");
    removeCache(`${cacheKey}_etag`);
  }

  try {
    const response = await apiClient.get("/myspace", {
      headers: {
        // 使用标准 If-None-Match header
        ...(cachedEtag && cachedData && { "If-None-Match": cachedEtag }),
      },
      validateStatus: (status) => status === 200 || status === 304,
    });

    // 处理 304 Not Modified
    if (response.status === 304) {
      console.log("[MySpace] Data unchanged, extending cache");
      extendCache(cacheKey, CACHE_TTL.MYSPACE);
      return cachedData;
    }

    // 提取新 ETag 并更新缓存
    const newEtag = response.headers["etag"];
    const newData = response.data;

    setCacheWithETag(cacheKey, newData, CACHE_TTL.MYSPACE, newEtag);
    if (newEtag) {
      // ETag cached
    }

    // Clear stale userprompt caches by comparing updatedAt
    if (newData?.items) {
      const { removeCache, getPromptCacheKey } = await import("@site/src/utils/cache");
      let clearedCount = 0;

      newData.items.forEach((item: any) => {
        if (item.type === "prompt" && item.source === "userprompt") {
          const promptCacheKey = getPromptCacheKey("userprompts", item.id);
          const cachedPrompt = getCache(promptCacheKey);

          // If cached updatedAt differs from latest, clear the cache
          if (cachedPrompt && cachedPrompt.updatedAt !== item.updatedAt) {
            removeCache(promptCacheKey);
            removeCache(`${promptCacheKey}_etag`);
            clearedCount++;
          }
        }
      });

      if (clearedCount > 0) {
        // Cleared stale userprompt cache(s)
      }
    }

    return newData;
  } catch (error) {
    // 处理 304 在某些配置下被当作错误
    if (error.response?.status === 304) {
      console.log("[MySpace] 304 handled as error, using cache");
      return cachedData;
    }

    console.error("[MySpace] Error fetching data:", error);
    // 错误时返回缓存（如果有）
    return cachedData || null;
  }
}

/**
 * 清除 MySpace 缓存
 * 在修改收藏、提示词、排序、标签等操作后调用
 */
export function clearMySpaceCache() {
  removeCache(CACHE_PREFIX.MYSPACE);
  const { removeETag } = require("@site/src/utils/cache");
  removeETag(CACHE_PREFIX.MYSPACE);
}

/**
 * 更新我的空间排序
 * @param order - 排序数组
 */
export async function updateMySpaceOrder(order: Array<{ id: number; type: string; source: string }>) {
  try {
    await apiClient.patch("/favorites/myspace-order", {
      order,
    });

    // 清除 MySpace 缓存
    clearMySpaceCache();
  } catch (error) {
    console.error("Error updating MySpace order:", error);
    throw error;
  }
}

/**
 * 更新自定义标签
 * @param customTags - 完整的 customTags 对象
 */
export async function updateCustomTags(customTags: { definitions: Array<{ id: string; name: string; color: string; order: number }>; itemTags: Record<string, string[]> }) {
  try {
    await apiClient.patch("/favorites/custom-tags", {
      customTags,
    });

    // 清除 MySpace 缓存
    clearMySpaceCache();
  } catch (error) {
    console.error("Error updating custom tags:", error);
    throw error;
  }
}
