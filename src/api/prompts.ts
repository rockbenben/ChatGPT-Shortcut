/**
 * Prompts APIs - CRUD for prompts, search, voting
 */
import { apiClient } from "./client";
import {
  setCache,
  getCache,
  removeCache,
  flushCacheByPrefix,
  getPromptCacheKey,
  getPromptTTL,
  getListCacheKey,
  CACHE_TTL,
  CACHE_PREFIX,
  getETag,
  setCacheWithETag,
  extendCache,
  extendCacheIfNeeded,
  needsCacheExtension,
} from "@site/src/utils/cache";
import { clearMySpaceCache } from "./myspace";

/**
 * Batch fetch prompts by IDs with ETag conditional request support
 * Note: For "cards" type, uses local JSON data instead of API
 */
export async function getPrompts(type: "cards" | "commus" | "userprompts", ids: number[] | { id: number }[], lang?: string) {
  if (!ids || ids.length === 0) {
    return [];
  }

  // If type is "userprompts", extract id values
  let normalizedInputIds: number[] = ids as number[];
  if (type === "userprompts" && ids.length > 0 && typeof ids[0] === "object") {
    normalizedInputIds = (ids as { id: number }[]).map((prompt) => prompt.id);
  }

  const normalizedType = typeof type === "string" ? type.trim() : "";
  const allowedTypes = new Set(["cards", "commus", "userprompts"]);
  const safeType = allowedTypes.has(normalizedType) ? normalizedType : "commus";
  const sanitizedLang = typeof lang === "string" && lang.trim() ? lang.trim() : "zh";

  // Deduplicate and validate IDs
  const idsSeen = new Set<number>();
  const normalizedIds: number[] = [];
  normalizedInputIds.forEach((value) => {
    const numericId = Number(value);
    if (Number.isInteger(numericId) && numericId > 0 && !idsSeen.has(numericId)) {
      idsSeen.add(numericId);
      normalizedIds.push(numericId);
    }
  });

  if (!normalizedIds.length) {
    return [];
  }

  // === Cards: Use local JSON data with lscache caching ===
  // This avoids API calls and uses the same cached prompt_*.json as search/filter
  if (safeType === "cards") {
    const { fetchCardsByIds } = await import("./homepage");
    return fetchCardsByIds(normalizedIds, sanitizedLang);
  }

  const cachedPrompts = new Map();
  const idsToFetch: number[] = [];

  // Check cache for each id
  normalizedIds.forEach((id) => {
    // Userprompts and Commus are language-agnostic (user content), others (cards) differ by language
    const keyLang = safeType === "cards" ? sanitizedLang : undefined;
    const cacheKey = getPromptCacheKey(safeType, id, keyLang);
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      cachedPrompts.set(id, cachedData);
    } else {
      idsToFetch.push(id);
    }
  });

  // Smart cache extension based on type
  // - Cards: Pure cache (count changes frequently, not reliable)
  // - Commus: Validate ONLY favorited items, auto-extend others
  // - Userprompts: Already validated by MySpace API, auto-extend

  if (cachedPrompts.size > 0) {
    const ttl = getPromptTTL(safeType);

    if (safeType === "commus") {
      // Get favorited commu IDs from MySpace cache
      const myspace = getCache("myspace");
      const favoredCommIds = new Set(myspace?.items?.filter((item: any) => item.type === "favorite" && item.source === "community")?.map((item: any) => item.id) || []);

      // Separate favorited and non-favorited
      const favoredToValidate: number[] = [];
      const nonFavoredToExtend: number[] = [];

      Array.from(cachedPrompts.keys()).forEach((id) => {
        if (favoredCommIds.size > 0 && favoredCommIds.has(id) && cachedPrompts.get(id)?.updatedAt) {
          favoredToValidate.push(id);
        } else {
          nonFavoredToExtend.push(id);
        }
      });

      // Auto-extend non-favorited commus
      nonFavoredToExtend.forEach((id) => {
        const cacheKey = getPromptCacheKey(safeType, id, sanitizedLang);
        extendCacheIfNeeded(cacheKey, ttl);
      });

      // Filter favorited commus: only validate those needing extension (< 50% TTL remaining)
      const favoredNeedingValidation = favoredToValidate.filter((id) => {
        const cacheKey = getPromptCacheKey(safeType, id, sanitizedLang);
        return needsCacheExtension(cacheKey, ttl);
      });

      // Validate favorited commus (only those needing validation)
      if (favoredNeedingValidation.length > 0) {
        try {
          const response = await apiClient.get("/userprompts/check-updates", {
            params: { ids: favoredNeedingValidation },
          });

          // Track which IDs were returned (still available)
          const returnedIds = new Set(response.data.map((item: { id: number }) => item.id));

          // Process returned (available) prompts
          response.data.forEach((serverItem: { id: number; updatedAt: string }) => {
            const cached = cachedPrompts.get(serverItem.id);
            const cacheKey = getPromptCacheKey(safeType, serverItem.id, sanitizedLang);

            if (cached?.updatedAt === serverItem.updatedAt) {
              // Same → Conditionally extend
              extendCacheIfNeeded(cacheKey, ttl);
            } else {
              // Changed → Clear and mark for refetch
              removeCache(cacheKey);
              cachedPrompts.delete(serverItem.id);
              idsToFetch.push(serverItem.id);
            }
          });

          // Process unavailable prompts (not returned = unshared/deleted)
          favoredNeedingValidation.forEach((id) => {
            if (!returnedIds.has(id)) {
              const cacheKey = getPromptCacheKey(safeType, id, sanitizedLang);
              const cached = cachedPrompts.get(id);

              if (cached) {
                // Has cache → Mark as unavailable, extend TTL to 1 year
                // User can still access cached content while it's private/deleted
                const unavailablePrompt = {
                  ...cached,
                  _unavailable: true,
                  _unavailableReason: "unshared",
                  _unavailableAt: new Date().toISOString(),
                };
                setCache(cacheKey, unavailablePrompt, CACHE_TTL.UNAVAILABLE_CACHE);
                cachedPrompts.set(id, unavailablePrompt);
                console.warn(`[getPrompts] Prompt ${id} is unavailable (unshared), cached for 1 year`);
              } else {
                // No cache → Mark for frontend handling (will be fetched via favorBulk)
                const placeholderPrompt = {
                  id,
                  _unavailable: true,
                  _unavailableReason: "unshared",
                  _noCache: true,
                  _unavailableAt: new Date().toISOString(),
                };
                setCache(cacheKey, placeholderPrompt, CACHE_TTL.UNAVAILABLE_CACHE);
                cachedPrompts.set(id, placeholderPrompt);
                console.warn(`[getPrompts] Prompt ${id} is unavailable and has no cache`);
              }
            }
          });
        } catch (error) {
          console.warn("[getPrompts] Favorited commus validation failed:", error);
        }
      }
    } else if (safeType === "userprompts") {
      // For userprompts: trust MySpace validation, conditionally extend
      cachedPrompts.forEach((_, id) => {
        const cacheKey = getPromptCacheKey(safeType, id, sanitizedLang);
        extendCacheIfNeeded(cacheKey, ttl);
      });
    }
    // Cards: no extension (pure cache)
  }

  // Return cached data if all present
  if (idsToFetch.length === 0) {
    return normalizedIds.map((id) => cachedPrompts.get(id)).filter(Boolean);
  }

  const apiEndpoints = {
    cards: "/cards/bulk",
    commus: "/userprompts/bulk",
    userprompts: "/userprompts/favorbulk",
  };

  const apiEndpoint = apiEndpoints[safeType] || apiEndpoints["commus"];
  const postData = safeType === "cards" ? { ids: idsToFetch, lang: sanitizedLang } : { ids: idsToFetch };

  try {
    const response = await apiClient.post(apiEndpoint, postData);
    const ttl = getPromptTTL(safeType);

    // Save fetched data to cache
    response.data.forEach((item: { id: number }) => {
      const keyLang = safeType === "cards" ? sanitizedLang : undefined;
      const cacheKey = getPromptCacheKey(safeType, item.id, keyLang);
      setCache(cacheKey, item, ttl);
    });

    // Merge cached and fetched data
    const allData = new Map(cachedPrompts);
    response.data.forEach((item: { id: number }) => {
      allData.set(item.id, item);
    });

    return normalizedIds.map((id) => allData.get(id)).filter(Boolean);
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
}

/**
 * Submit a new user prompt
 */
export async function submitPrompt(values: { title: string; description: string; remark?: string; notes?: string; share?: boolean }) {
  try {
    const response = await apiClient.post(`/userprompts`, {
      data: {
        title: values.title,
        description: values.description,
        remark: values.remark,
        notes: values.notes,
        share: values.share,
        promptLength: values.description.length,
      },
    });
    clearMySpaceCache();
    return response.data;
  } catch (error) {
    console.error("Error submitting prompt:", error);
    throw error;
  }
}

/**
 * Update an existing user prompt
 */
export async function updatePrompt(
  id: number,
  values: {
    title: string;
    description: string;
    remark?: string;
    notes?: string;
    share?: boolean;
  }
) {
  if (!id) throw new Error("prompt id is required");
  try {
    const response = await apiClient.put(`/userprompts/${id}`, {
      data: {
        title: values.title,
        description: values.description,
        remark: values.remark,
        notes: values.notes,
        share: values.share,
        promptLength: values.description.length,
      },
    });

    // Clear cache
    const cacheKey = getPromptCacheKey("userprompts", id);
    removeCache(cacheKey);
    clearMySpaceCache();

    return response.data;
  } catch (error) {
    error("Error updating prompt:", error);
    throw error;
  }
}

/**
 * Delete a user prompt
 */
export async function deletePrompt(id: number) {
  if (!id) throw new Error("prompt id is required");
  try {
    const response = await apiClient.delete(`/userprompts/${id}`);

    // Clear cache
    const cacheKey = getPromptCacheKey("userprompts", id);
    removeCache(cacheKey);
    clearMySpaceCache();

    return response;
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
}

/**
 * Get community prompts with pagination
 */
export async function getCommPrompts(page: number, pageSize: number, sortField: string, sortOrder: string, searchTerm?: string) {
  const trimmedSearchTerm = typeof searchTerm === "string" ? searchTerm.trim() : "";
  const limitedSearchTerm = trimmedSearchTerm.length > 100 ? trimmedSearchTerm.substring(0, 100) : trimmedSearchTerm;
  const encodedSearchKey = trimmedSearchTerm ? encodeURIComponent(limitedSearchTerm) : "noTerm";

  const cacheKey = getListCacheKey(CACHE_PREFIX.COMM_LISTS, page, pageSize, sortField, sortOrder, encodedSearchKey);
  const cachedData = getCache(cacheKey);
  const cachedEtag = getETag(cacheKey);

  // Poll throttling: only validate if >1 hour since last fetch
  const lastFetchKey = `${cacheKey}_lastFetch`;
  const lastFetchTime = getCache(lastFetchKey);
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;

  if (cachedData && lastFetchTime && now - lastFetchTime < ONE_HOUR) {
    // Within 1 hour, return cached data directly
    return cachedData;
  }

  let url = `/userprompts?pagination[withCount]=true&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=${sortField}:${sortOrder}`;

  if (trimmedSearchTerm) {
    url += `&filters[$or][0][description][$containsi]=${limitedSearchTerm}&filters[$or][1][title][$containsi]=${limitedSearchTerm}&filters[$or][2][remark][$containsi]=${limitedSearchTerm}`;
  }

  try {
    // Record fetch time
    setCache(lastFetchKey, now, CACHE_TTL.COMM_PROMPT_LISTS);

    // Always fetch to check for updates (ETag will prevent unnecessary data transfer)
    const config = cachedEtag ? { headers: { "If-None-Match": cachedEtag } } : {};
    const response = await apiClient.get(url, {
      ...config,
      validateStatus: (status) => status === 200 || status === 304,
    });

    // Handle 304 Not Modified
    if (response.status === 304) {
      if (cachedData) {
        extendCache(cacheKey, CACHE_TTL.COMM_PROMPT_LISTS);
        return cachedData;
      }
      // Fallthrough to 200 logic if cache missing
    }

    // Handle 200 OK
    const listItems = response.data.data; // [{ id: 73, updatedAt: "..." }, ...]
    const newEtag = response.headers["etag"];

    // Clear stale caches by comparing updatedAt
    const { removeCache, getPromptCacheKey } = await import("@site/src/utils/cache");
    let clearedCount = 0;

    listItems.forEach((item: { id: number; updatedAt: string }) => {
      const promptCacheKey = getPromptCacheKey("commus", item.id);
      const cachedPrompt = getCache(promptCacheKey);

      // If cached updatedAt differs from latest, clear the cache
      if (cachedPrompt && cachedPrompt.updatedAt !== item.updatedAt) {
        removeCache(promptCacheKey);
        clearedCount++;
      }
    });

    if (clearedCount > 0) {
      console.log(`[getCommPrompts] Cleared ${clearedCount} stale prompt cache(s)`);
    }

    // Fetch prompts (only uncached or rebuilt ones will be fetched)
    const ids = listItems.map((item: { id: number }) => item.id);
    const responseIds = await getPrompts("commus", ids);

    const result = [responseIds, { pagination: response.data.meta.pagination }];

    // Save with ETag
    setCacheWithETag(cacheKey, result, CACHE_TTL.COMM_PROMPT_LISTS, newEtag);

    return result;
  } catch (error) {
    // Handle 304 in catch block
    if (error?.response?.status === 304 && cachedData) {
      extendCache(cacheKey, CACHE_TTL.COMM_PROMPT_LISTS);
      return cachedData;
    }

    console.error(`Error fetching commPrompts:`, error);
    throw error;
  }
}

/**
 * Search cards by tags or keywords
 */
export async function searchCards(tags: string[], search: string, lang: string = "zh", operator: string = "OR") {
  try {
    const normalizedTags = Array.isArray(tags) ? Array.from(new Set(tags.map((tag) => (typeof tag === "string" ? tag.trim() : "")).filter(Boolean))) : [];
    const safeSearch = typeof search === "string" ? search.trim().slice(0, 100) : "";

    const cacheKey = getListCacheKey(CACHE_PREFIX.SEARCH, encodeURIComponent(JSON.stringify(normalizedTags)), encodeURIComponent(safeSearch), lang, operator);
    const cachedData = getCache(cacheKey);
    const cachedEtag = getETag(cacheKey);

    // 防御性检查
    if (cachedEtag && !cachedData) {
      console.warn("[Search] Found ETag but no cached data, clearing ETag");
      const { removeETag } = require("@site/src/utils/cache");
      removeETag(cacheKey);
    }

    const queryParams = new URLSearchParams();
    normalizedTags.forEach((tag) => {
      queryParams.append("tags", tag);
    });

    if (safeSearch) {
      queryParams.append("search", safeSearch);
    }
    queryParams.append("lang", lang);
    queryParams.append("operator", operator);

    try {
      const responseIds = await apiClient.get(`/cards/find-with-tag`, {
        params: queryParams,
        headers: {
          ...(cachedEtag && cachedData && { "If-None-Match": cachedEtag }),
        },
        validateStatus: (status) => status === 200 || status === 304,
      });

      // Handle 304 Not Modified
      if (responseIds.status === 304) {
        console.log("[Search] Data unchanged, extending cache");
        extendCache(cacheKey, CACHE_TTL.SEARCH_RESULTS);
        return cachedData;
      }

      // Handle 200 OK
      const detailedCards = await getPrompts("cards", responseIds.data, lang);
      const newEtag = responseIds.headers["etag"] || responseIds.headers["ETag"];
      setCacheWithETag(cacheKey, detailedCards, CACHE_TTL.SEARCH_RESULTS, newEtag);

      return detailedCards;
    } catch (error) {
      // Handle 304 in catch
      if (error?.response?.status === 304) {
        console.log("[Search] 304 handled in catch, extending cache");
        extendCache(cacheKey, CACHE_TTL.SEARCH_RESULTS);
        return cachedData;
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching cards with tags:", error);
    throw error;
  }
}

/**
 * Vote on a user prompt
 */
export async function voteOnUserPrompt(promptId: number, action: "upvote" | "downvote") {
  if (!promptId) throw new Error("promptId is required");
  try {
    if (!["upvote", "downvote"].includes(action)) {
      throw new Error("Invalid vote action");
    }
    const result = await apiClient.post(`/userprompts/${promptId}/vote`, { action: action });

    // Update local cache with backend response
    if (result?.data?.counts) {
      const { upvotes, downvotes } = result.data.counts;
      const upvoteDifference = upvotes - downvotes;

      // Update prompt single cache
      const cacheKey = getPromptCacheKey("commus", promptId);
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        cachedData.upvotes = upvotes;
        cachedData.downvotes = downvotes;
        cachedData.upvoteDifference = upvoteDifference;
        setCache(cacheKey, cachedData, getPromptTTL("commus"));
      }

      // Clear list cache
      flushCacheByPrefix(CACHE_PREFIX.COMM_LISTS);
    }

    return result;
  } catch (error) {
    console.error("Error voting on user prompt:", error);
    throw error;
  }
}

/**
 * Fetch all copy counts
 */
export async function fetchAllCopyCounts() {
  try {
    const cacheKey = CACHE_PREFIX.COPY_COUNTS;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await apiClient.get(`/cards/allcounts`);
    const counts = response.data.reduce((acc: Record<number, number>, item: { card_id: number; count: number }) => {
      acc[item.card_id] = item.count;
      return acc;
    }, {});

    setCache(cacheKey, counts, CACHE_TTL.COPY_COUNTS);
    return counts;
  } catch (error) {
    console.error("Error fetching all copy counts:", error);
    return {};
  }
}

/**
 * Update copy count for a card
 */
export async function updateCopyCount(cardId: number) {
  if (!cardId) return null;
  try {
    const response = await apiClient.post(`/cards/${cardId}/copy`);
    return response.data.count;
  } catch (error) {
    console.error("Error updating copy count:", error);
    return null;
  }
}
