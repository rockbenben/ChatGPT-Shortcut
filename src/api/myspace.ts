/**
 * MySpace APIs - 我的空间数据管理
 */
import { apiClient } from "./client";
import { getCache, setCache, removeCache, getPromptCacheKey, getETag, removeETag, CACHE_PREFIX, CACHE_TTL, extendCache, setCacheWithETag } from "@site/src/utils/cache";

/**
 * 获取 MySpace 完整数据（带 ETag 优化）
 * 包含：favorites（收藏、排序、标签）、userprompts、updatedAt
 */
export async function getMySpace() {
  const cacheKey = CACHE_PREFIX.MYSPACE;
  const cachedEtag = getETag(cacheKey);
  const cachedData = getCache(cacheKey);

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
      extendCache(cacheKey, CACHE_TTL.MYSPACE);
      return cachedData;
    }

    // 提取新 ETag 并更新缓存
    const newEtag = response.headers["etag"];
    const newData = response.data;

    setCacheWithETag(cacheKey, newData, CACHE_TTL.MYSPACE, newEtag);
    // Clear stale userprompt caches by comparing updatedAt
    if (newData?.items) {
      newData.items.forEach((item: any) => {
        if (item.type === "prompt" && item.source === "userprompt") {
          const promptCacheKey = getPromptCacheKey("userprompts", item.id);
          const cachedPrompt = getCache(promptCacheKey);

          // If cached updatedAt differs from latest, clear the cache
          if (cachedPrompt && cachedPrompt.updatedAt !== item.updatedAt) {
            removeCache(promptCacheKey);
          }
        }
      });
    }

    return newData;
  } catch (error) {
    // 处理 304 在某些配置下被当作错误（与 try 内 304 路径保持一致：续期缓存）
    if (error.response?.status === 304 && cachedData) {
      extendCache(cacheKey, CACHE_TTL.MYSPACE);
      return cachedData;
    }

    console.error("[MySpace] Error fetching data:", error);
    // 有缓存时降级返回缓存（应对 5xx/网络拒绝/DNS 等瞬时失败）；无缓存时必须抛出（而非吞错返回 null），
    // 否则有 token 无缓存的用户遇到快速失败时 fetchOnce 拿到 null 直接 return，既不重试也不降级登出，
    // userAuth 永久停在 {pending:true} → 骨架屏永不消失。
    // 例外：401（token 已失效，如服务端密钥轮换）绝不返回缓存——否则 AuthContext 误判为登录成功，
    // 当前会话变成"僵尸登录"（UI 显示已登录但所有写操作都 401）。与 getUserAllInfo 的 401 行为一致。
    if (error.response?.status !== 401 && cachedData) {
      return cachedData;
    }
    throw error;
  }
}

/**
 * 清除 MySpace 缓存
 * 在修改收藏、提示词、排序、标签等操作后调用
 */
export function clearMySpaceCache() {
  removeCache(CACHE_PREFIX.MYSPACE);
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
