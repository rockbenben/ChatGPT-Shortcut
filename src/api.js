import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { setCache, getCache, removeCache, flushCacheByPrefix, getPromptCacheKey, getPromptTTL, getListCacheKey, CACHE_TTL, CACHE_PREFIX } from "@site/src/utils/cache";

// Authentication Constants 登陆用户常量
const API_URL = "https://api.newzone.top/api"; // http://localhost:1337/api  https://api.newzone.top/api
let authToken;
if (ExecutionEnvironment.canUseDOM) {
  authToken = localStorage.getItem("auth_token");
}

// Remove User Cache 移除用户缓存信息
export function clearUserAllInfoCache() {
  removeCache(CACHE_PREFIX.USER_INFO);
}

const ensureArrayInput = (value, fieldName) => {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
  return value;
};

const handleApiError = (error) => {
  if (error?.response?.status === 401) {
    clearUserAllInfoCache();
  }

  // 提取 Strapi 错误信息并附加到 error 对象，方便前端直接使用
  const strapiMessage = error?.response?.data?.error?.message;
  if (strapiMessage && !error.message?.includes(strapiMessage)) {
    error.strapiMessage = strapiMessage;
  }

  throw error;
};

const getAuthToken = () => {
  if (ExecutionEnvironment.canUseDOM) {
    return localStorage.getItem("auth_token");
  }
  return authToken;
};

const persistAuthToken = (token) => {
  authToken = token || null;
  if (!ExecutionEnvironment.canUseDOM) {
    return authToken;
  }

  if (token) {
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_token");
  }

  return authToken;
};

const apiClient = axios.create({ baseURL: API_URL });

apiClient.interceptors.request.use((requestConfig) => {
  const token = getAuthToken();
  if (token) {
    requestConfig.headers = {
      ...(requestConfig.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  } else if (requestConfig.headers?.Authorization) {
    delete requestConfig.headers.Authorization;
  }
  return requestConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      handleApiError(error);
    } catch (handledError) {
      return Promise.reject(handledError);
    }
  }
);

// 更新用户信息缓存的通用函数
export const updateUserInfoCache = (setField, updatedData) => {
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

// 用户获取：获取登录用户信息
// User Retrieval: Fetches informations of the logged-in user.
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

    // 预热 userprompts 缓存：只获取尚未缓存的 prompt
    const userprompts = response.data.userprompts;
    if (userprompts && userprompts.length > 0) {
      const uncachedPrompts = userprompts.filter((p) => {
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

// Batch fetch selected prompts 批量获取精选prompt
export async function getPrompts(type, ids, lang) {
  if (!ids || ids.length === 0) {
    return [];
  }

  // 如果 type 为 "userprompts"，提取 id 值
  if (type === "userprompts") {
    ids = ids.map((prompt) => prompt.id);
  }

  const normalizedType = typeof type === "string" ? type.trim() : "";
  const allowedTypes = new Set(["cards", "commus", "userprompts"]);
  const safeType = allowedTypes.has(normalizedType) ? normalizedType : "commus";
  const sanitizedLang = typeof lang === "string" && lang.trim() ? lang.trim() : undefined;

  // 去重并验证 ID
  const idsSeen = new Set();
  const normalizedIds = [];
  ids.forEach((value) => {
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
  const idsToFetch = [];

  // 遍历每个 id，检查缓存
  normalizedIds.forEach((id) => {
    const cacheKey = getPromptCacheKey(safeType, id, sanitizedLang);
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      cachedPrompts.set(id, cachedData);
    } else {
      idsToFetch.push(id);
    }
  });

  // 如果所有数据都在缓存中，直接返回
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

    // 更新缓存
    response.data.forEach((item) => {
      const cacheKey = getPromptCacheKey(safeType, item.id, sanitizedLang);
      setCache(cacheKey, item, ttl);
    });

    // 合并缓存和新获取的数据
    const allData = new Map(cachedPrompts);
    response.data.forEach((item) => {
      allData.set(item.id, item);
    });

    return normalizedIds.map((id) => allData.get(id)).filter(Boolean);
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
}

// update username 更新用户名
export async function updateUsername(username) {
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

// 提示词自定义排序
export async function updatePromptsOrder(order) {
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

// 收藏自定义排序
export async function updateFavoritesOrder(type, order) {
  try {
    const trimmedType = typeof type === "string" ? type.trim() : "";
    if (!trimmedType) {
      throw new Error("type is required");
    }

    const safeOrder = ensureArrayInput(order, `${trimmedType} order`);

    const response = await apiClient.put(`/favorites/favorite-order`, {
      [trimmedType]: safeOrder,
    });
    return response;
  } catch (error) {
    console.error("Error updating Order:", error);
    throw error;
  }
}
// 创建收藏：添加新的精选或社区 prompt 至收藏
// Create Favorite: Adds a new selected or community prompt to favorites.
export async function createFavorite(loves, isComm = false) {
  try {
    const response = await apiClient.post(`/favorites`, {
      data: {
        [isComm ? "commLoves" : "loves"]: loves,
      },
    });

    clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
}

// 更新收藏：更新现有的精选或社区提示收藏
// Update Favorite: Updates an existing selected or community prompt favorite.
export async function updateFavorite(favoriteId, loves, isComm = false) {
  if (!favoriteId) throw new Error("favoriteId is required");
  try {
    const response = await apiClient.put(`/favorites/${favoriteId}`, {
      data: {
        [isComm ? "commLoves" : "loves"]: loves,
      },
    });

    return response;
  } catch (error) {
    console.error("Error updating favorite:", error);
    throw error;
  }
}

/* 管理自定义 prompt（userprompt） */
// submit prompt
export async function submitPrompt(values) {
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

// 更新我的提示词
export async function updatePrompt(id, values) {
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

    // 清除缓存，下次访问时获取最新数据
    // PUT 返回格式 (data.attributes) 与 getPrompts (扁平) 不同，不能直接缓存
    const cacheKey = getPromptCacheKey("userprompts", id);
    removeCache(cacheKey);

    return response.data;
  } catch (error) {
    console.error("Error updating prompt:", error);
    throw error;
  }
}

// 删除自己创建的提示词 prompt
export async function deletePrompt(id) {
  if (!id) throw new Error("prompt id is required");
  try {
    const response = await apiClient.delete(`/userprompts/${id}`);

    // 清除该 prompt 的缓存
    const cacheKey = getPromptCacheKey("userprompts", id);
    removeCache(cacheKey);

    return response;
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
}

/* Community-prompts 页面管理 */
// Get Community Prompts 获取社区精选提示词
export async function getCommPrompts(page, pageSize, sortField, sortOrder, searchTerm) {
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
    const ids = responseTotal.data.data.map((item) => item.id);
    const responseIds = await getPrompts("commus", ids);

    // 只缓存必要数据：prompts 数组和分页信息
    const result = [responseIds, { pagination: responseTotal.data.meta.pagination }];
    setCache(cacheKey, result, CACHE_TTL.COMM_PROMPT_LISTS);

    return result;
  } catch (error) {
    console.error(`Error fetching commPrompts:`, error);
    throw error;
  }
}

// 根据 tag 或关键词搜索 cards prompts
export async function findCardsWithTags(tags, search, lang = "zh", operator = "OR") {
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

// 投票用户提示
export async function voteOnUserPrompt(promptId, action) {
  if (!promptId) throw new Error("promptId is required");
  try {
    if (!["upvote", "downvote"].includes(action)) {
      throw new Error("Invalid vote action");
    }
    const result = await apiClient.post(`/userprompts/${promptId}/vote`, { action: action });

    // 使用后端返回值更新本地缓存
    if (result?.data?.counts) {
      const { upvotes, downvotes } = result.data.counts;
      const upvoteDifference = upvotes - downvotes;

      // 1. 更新该 prompt 的单独缓存
      const cacheKey = getPromptCacheKey("commus", promptId);
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        cachedData.upvotes = upvotes;
        cachedData.downvotes = downvotes;
        cachedData.upvoteDifference = upvoteDifference;
        setCache(cacheKey, cachedData, getPromptTTL("commus"));
      }

      // 2. 清除 commPrompts 列表缓存（强制下次刷新时获取最新数据）
      flushCacheByPrefix(CACHE_PREFIX.COMM_LISTS);
    }

    return result;
  } catch (error) {
    console.error("Error voting on user prompt:", error);
    throw error;
  }
}

/* 用户管理：注册、登录、更改密码、重置密码 */
export async function register(values) {
  const response = await apiClient.post(`/auth/local/register`, {
    username: values.username,
    email: values.email,
    password: values.password,
  });
  clearUserAllInfoCache();
  return response;
}

export async function login(values) {
  const response = await apiClient.post(`/auth/local`, {
    identifier: values.username,
    password: values.password,
  });
  clearUserAllInfoCache();
  return response;
}

export async function changePassword(values) {
  try {
    await apiClient.post(`/auth/change-password`, {
      password: values.newPassword,
      currentPassword: values.currentPassword,
      passwordConfirmation: values.confirmPassword,
    });
    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

export async function forgotPassword(email) {
  try {
    await apiClient.post(`/auth/forgot-password`, {
      email: email,
    });
    return true;
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    throw error;
  }
}

export async function resetPassword(values) {
  try {
    const response = await apiClient.post(`/auth/reset-password`, {
      code: values.code,
      password: values.newPassword,
      passwordConfirmation: values.confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

// 发送无密码登录链接
export async function sendPasswordlessLink(target) {
  try {
    return await apiClient.post(`/passwordless/send-link`, target);
  } catch (error) {
    console.error("Failed to send passwordless link:", error);
    throw error;
  }
}

// 使用令牌进行无密码登录
export async function loginWithToken(loginToken) {
  try {
    const response = await apiClient.get(`/passwordless/login`, { params: { loginToken } });
    persistAuthToken(response.data.jwt);
    clearUserAllInfoCache();
    return response.data;
  } catch (error) {
    console.error("Failed to login with token:", error);
    throw error;
  }
}

/* 评论系统 */
// 按 type 来获取评论
export async function getComments(id, page, pageSize, type = "card") {
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

function clearCommentsCache(id, type = "card") {
  const prefix = `${CACHE_PREFIX.COMMENTS}${type}_${id}`;
  flushCacheByPrefix(prefix);
}

// 发布评论
export async function postComment(pageId, commentContent, threadOf = null, type = "card") {
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

/* 精选提示词的 copy count */
// 获取所有 cards 的 copy count
export async function fetchAllCopyCounts() {
  try {
    const cacheKey = CACHE_PREFIX.COPY_COUNTS;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await apiClient.get(`/cards/allcounts`);
    const counts = response.data.reduce((acc, item) => {
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

export async function updateCopyCount(cardId) {
  if (!cardId) return null;
  try {
    const response = await apiClient.post(`/cards/${cardId}/copy`);
    return response.data.count;
  } catch (error) {
    console.error("Error updating copy count:", error);
    return null;
  }
}
