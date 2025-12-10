/**
 * Prompts APIs - CRUD for prompts, search, voting
 */
import { apiClient, ensureArrayInput, clearUserAllInfoCache } from "./client";
import { setCache, getCache, removeCache, flushCacheByPrefix, getPromptCacheKey, getPromptTTL, getListCacheKey, CACHE_TTL, CACHE_PREFIX } from "@site/src/utils/cache";

/**
 * Batch fetch prompts by IDs
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
  const sanitizedLang = typeof lang === "string" && lang.trim() ? lang.trim() : undefined;

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

  const cachedPrompts = new Map();
  const idsToFetch: number[] = [];

  // Check cache for each id
  normalizedIds.forEach((id) => {
    const cacheKey = getPromptCacheKey(safeType, id, sanitizedLang);
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      cachedPrompts.set(id, cachedData);
    } else {
      idsToFetch.push(id);
    }
  });

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

    // Update cache
    response.data.forEach((item: { id: number }) => {
      const cacheKey = getPromptCacheKey(safeType, item.id, sanitizedLang);
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

    return response.data;
  } catch (error) {
    console.error("Error updating prompt:", error);
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

    return response;
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
}

/**
 * Update prompts order
 */
export async function updatePromptsOrder(order: number[]) {
  try {
    const safeOrder = ensureArrayInput(order, "order");
    const response = await apiClient.put(`/favorites/userprompt-order`, {
      data: { newOrder: safeOrder },
    });
    return response;
  } catch (error) {
    console.error("Error updating Order:", error);
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

  if (cachedData) {
    return cachedData;
  }

  let url = `/userprompts?pagination[withCount]=true&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=${sortField}:${sortOrder}`;

  if (trimmedSearchTerm) {
    url += `&filters[$or][0][description][$containsi]=${limitedSearchTerm}&filters[$or][1][title][$containsi]=${limitedSearchTerm}&filters[$or][2][remark][$containsi]=${limitedSearchTerm}`;
  }

  try {
    const responseTotal = await apiClient.get(url);
    const ids = responseTotal.data.data.map((item: { id: number }) => item.id);
    const responseIds = await getPrompts("commus", ids);

    const result = [responseIds, { pagination: responseTotal.data.meta.pagination }];
    setCache(cacheKey, result, CACHE_TTL.COMM_PROMPT_LISTS);

    return result;
  } catch (error) {
    console.error(`Error fetching commPrompts:`, error);
    throw error;
  }
}

/**
 * Search cards by tags or keywords
 */
export async function findCardsWithTags(tags: string[], search: string, lang: string = "zh", operator: string = "OR") {
  try {
    const normalizedTags = Array.isArray(tags) ? Array.from(new Set(tags.map((tag) => (typeof tag === "string" ? tag.trim() : "")).filter(Boolean))) : [];
    const safeSearch = typeof search === "string" ? search.trim().slice(0, 100) : "";

    const cacheKey = getListCacheKey(CACHE_PREFIX.SEARCH, encodeURIComponent(JSON.stringify(normalizedTags)), encodeURIComponent(safeSearch), lang, operator);
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      return cachedData;
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

    const responseIds = await apiClient.get(`/cards/find-with-tag`, { params: queryParams });
    const detailedCards = await getPrompts("cards", responseIds.data, lang);

    setCache(cacheKey, detailedCards, CACHE_TTL.SEARCH_RESULTS);

    return detailedCards;
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
