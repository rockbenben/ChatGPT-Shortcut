import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// Authentication Constants 登陆用户常量
const API_URL = "https://api.newzone.top/api"; // http://localhost:1337/api  https://api.newzone.top/api
let authToken;
if (ExecutionEnvironment.canUseDOM) {
  authToken = localStorage.getItem("auth_token");
}

const config = {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
};

// Remove User Cache 移除用户缓存信息
export function clearUserAllInfoCache() {
  localStorage.removeItem("userAllInfo");
  localStorage.removeItem("userAllInfoCacheExpiration");
}

// 更新 localStorage 缓存的通用函数
export const updateLocalStorageCache = (setField, updatedData) => {
  const cachedData = localStorage.getItem("userAllInfo");
  if (!cachedData) return;
  try {
    const data = JSON.parse(cachedData);

    if (setField === "favorites.loves") {
      if (!data.data.favorites) {
        data.data.favorites = {};
      }
      data.data.favorites.loves = updatedData;
    } else if (setField === "favorites.commLoves") {
      if (!data.data.favorites) {
        data.data.favorites = {};
      }
      data.data.favorites.commLoves = updatedData;
    } else {
      data.data[setField] = updatedData;
    }
    localStorage.setItem("userAllInfo", JSON.stringify(data));
  } catch (error) {
    console.error("Error updating localStorage cache:", error);
  }
};

// 用户获取：获取登录用户信息
// User Retrieval: Fetches informations of the logged-in user.
export async function getUserAllInfo() {
  if (!authToken) {
    // 返回 null 而不是抛出错误，表示未登录状态
    return null;
  }

  const cacheKey = "userAllInfo";
  const expirationKey = "userAllInfoCacheExpiration";

  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiration = localStorage.getItem(expirationKey);

  if (cachedData && cachedExpiration && Date.now() < Number(cachedExpiration)) {
    // 如果缓存的数据和缓存过期时间都存在，且当前时间小于缓存过期时间，那么直接返回缓存的数据
    return JSON.parse(cachedData);
  }

  try {
    // 如果缓存不存在或已过期，那么发送请求获取新的数据
    const response = await axios.get(
      `${API_URL}/users/me?fields[0]=username&fields[1]=email&populate[favorites][fields][0]=loves&populate[favorites][fields][1]=commLoves&populate[userprompts][fields][0]=id&populate[userprompts][fields][1]=share`,
      config
    );

    // 保存新的数据和缓存时间
    localStorage.setItem(cacheKey, JSON.stringify(response));
    getPrompts("userprompts", response.data.userprompts);
    localStorage.setItem(expirationKey, (Date.now() + 24 * 60 * 60 * 1000).toString());

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Batch fetch selected prompts 批量获取精选prompt
export async function getPrompts(type, ids, lang) {
  // 如果没有 ids，直接返回空数组
  if (!ids || ids.length === 0) {
    return [];
  }

  // 如果 type 为 "userprompts"，提取 id 值
  let originalIds = ids;
  if (type === "userprompts") {
    ids = ids.map((prompt) => prompt.id);
  }

  const cachedPrompts = [];
  const idsToFetch = [];
  const idToIndexMap = {}; // 用于记录每个 id 在原数组中的位置

  // 辅助函数：生成缓存 key 和过期时间 key
  const getCacheKey = (id) => `${type}_${id}${lang ? `_${lang}` : ""}`;
  const getExpirationKey = (cacheKey) => `${cacheKey}_expiration`;

  // 遍历每个 id，检查缓存是否有效
  ids.forEach((id, index) => {
    idToIndexMap[id] = index; // 记录 id 的原始位置

    const cacheKey = getCacheKey(id);
    const expirationKey = getExpirationKey(cacheKey);
    const cachedDataStr = localStorage.getItem(cacheKey);
    const expirationDate = localStorage.getItem(expirationKey);

    let cachedData;
    try {
      cachedData = JSON.parse(cachedDataStr);
    } catch (error) {
      cachedData = null;
    }

    if (cachedData && expirationDate && Date.now() < Number(expirationDate)) {
      cachedPrompts.push(cachedData);
    } else {
      idsToFetch.push(id);
    }
  });

  // 如果所有数据都在缓存中，直接按原始顺序返回
  if (idsToFetch.length === 0) {
    // 按原始 id 顺序排序
    return ids.map((id) => cachedPrompts.find((item) => item.id === id)).filter(Boolean);
  }

  const apiEndpoints = {
    cards: "/cards/bulk",
    commus: "/userprompts/bulk",
    userprompts: "/userprompts/favorbulk",
  };

  const apiEndpoint = apiEndpoints[type] || apiEndpoints["commus"];
  const postData = type === "cards" ? { ids: idsToFetch, lang } : { ids: idsToFetch };
  const requestConfig = type === "userprompts" ? config : {};

  try {
    const response = await axios.post(`${API_URL}${apiEndpoint}`, postData, requestConfig);

    // 通过对象映射来获取对应的过期时间
    const expirationTimes = {
      cards: 100 * 24 * 60 * 60 * 1000,
      commus: 30 * 24 * 60 * 60 * 1000,
      userprompts: 12 * 60 * 60 * 1000,
    };
    const expirationTime = expirationTimes[type] || 24 * 60 * 60 * 1000;

    // 更新缓存：保存请求到的数据及过期时间
    response.data.forEach((item) => {
      const itemCacheKey = getCacheKey(item.id);
      const itemExpirationKey = getExpirationKey(itemCacheKey);
      localStorage.setItem(itemCacheKey, JSON.stringify(item));
      localStorage.setItem(itemExpirationKey, String(Date.now() + expirationTime));
    });

    // 合并缓存和新获取的数据
    const allData = [...cachedPrompts, ...response.data];

    // 按照原始 ids 数组的顺序返回数据
    return ids.map((id) => allData.find((item) => item.id === id)).filter(Boolean);
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
}

// update username 更新用户名
export async function updateUsername(username) {
  try {
    const response = await axios.put(
      `${API_URL}/favorites/update-username`,
      {
        data: { newUsername: username },
      },
      config
    );

    //clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error updating Username:", error);
    throw error;
  }
}

// 提示词自定义排序
export async function updatePromptsOrder(order) {
  try {
    const response = await axios.put(
      `${API_URL}/favorites/userprompt-order`,
      {
        data: { newOrder: order },
      },
      config
    );
    //clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error updating Order:", error);
    throw error;
  }
}

// 收藏自定义排序
export async function updateFavoritesOrder(type, order) {
  try {
    const response = await axios.put(
      `${API_URL}/favorites/favorite-order`,
      {
        [type]: order,
      },
      config
    );
    clearUserAllInfoCache();
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
    const response = await axios.post(
      `${API_URL}/favorites`,
      {
        data: {
          [isComm ? "commLoves" : "loves"]: loves,
        },
      },
      config
    );

    //clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
}

// 更新收藏：更新现有的精选或社区提示收藏
// Update Favorite: Updates an existing selected or community prompt favorite.
export async function updateFavorite(favoriteId, loves, isComm = false) {
  try {
    const response = await axios.put(
      `${API_URL}/favorites/${favoriteId}`,
      {
        data: {
          [isComm ? "commLoves" : "loves"]: loves,
        },
      },
      config
    );

    clearUserAllInfoCache();
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
    const response = await axios.post(
      `${API_URL}/userprompts`,
      {
        data: {
          title: values.title,
          description: values.description,
          remark: values.remark,
          notes: values.notes,
          share: values.share,
          promptLength: values.description.length,
        },
      },
      config
    );

    clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error submitting prompt:", error);
    throw error;
  }
}

// 更新自定义提示：修改现有的自定义提示
// Update Custom Prompt: Modifies an existing custom prompt.
export async function updatePrompt(id, values) {
  try {
    const response = await axios.put(
      `${API_URL}/userprompts/${id}`,
      {
        data: {
          title: values.title,
          description: values.description,
          remark: values.remark,
          notes: values.notes,
          share: values.share,
          promptLength: values.description.length,
        },
      },
      config
    );

    const cacheKey = `userprompts_${id}`;
    localStorage.removeItem(cacheKey);
    getPrompts("userprompts", [{ id }]);

    //clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error updating prompt:", error);
    throw error;
  }
}

// 删除自定义 prompt
export async function deletePrompt(id) {
  try {
    const response = await axios.delete(`${API_URL}/userprompts/${id}`, config);
    clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
}

/* Community-prompts 页面管理 */
// Get Community Prompts 获取社区精选提示词
export async function getCommPrompts(page, pageSize, sortField, sortOrder, searchTerm) {
  const cacheKey = `commPrompts_${page}_${pageSize}_${sortField}_${sortOrder}_${searchTerm || "noTerm"}`;
  const expirationKey = `${cacheKey}_expiration`;

  const cachedData = JSON.parse(localStorage.getItem(cacheKey));
  const expirationDate = localStorage.getItem(expirationKey);

  // 检查缓存的数据是否还有效
  if (cachedData && expirationDate && Date.now() < Number(expirationDate)) {
    //localStorage.removeItem(cacheKey);
    return cachedData;
  }

  let url = `${API_URL}/userprompts?fields=id&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${pageSize}&sort=${sortField}:${sortOrder}`;

  // 如果存在搜索关键字，那么添加到 URL 中
  if (searchTerm) {
    const trimmedSearchTerm = searchTerm.trim();
    // 检查搜索词长度，并进行必要的截断
    const finalSearchTerm = trimmedSearchTerm.length > 100 ? trimmedSearchTerm.substring(0, 100) : trimmedSearchTerm;
    url += `&filters[$or][0][description][$containsi]=${finalSearchTerm}&filters[$or][1][title][$containsi]=${finalSearchTerm}&filters[$or][2][remark][$containsi]=${finalSearchTerm}`;
  }

  try {
    const responseTotal = await axios.get(url);
    const ids = responseTotal.data.data.map((item) => item.id);
    const responseIds = await getPrompts("commus", ids);

    const nextExpirationDate = Date.now() + 24 * 60 * 60 * 1000; // 24 hour later
    localStorage.setItem(cacheKey, JSON.stringify([responseIds, responseTotal]));
    localStorage.setItem(expirationKey, String(nextExpirationDate));

    return [responseIds, responseTotal];
  } catch (error) {
    console.error(`Error fetching commPrompts:`, error);
    throw error;
  }
}

// 根据 tag 或关键词搜索 cards prompts
export async function findCardsWithTags(tags, search, lang = "zh", operator = "OR") {
  try {
    const cacheKey = `findCardsWithTags_${tags.join(",")}_${search}_${lang}_${operator}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheExpirationKey = `${cacheKey}_expiration`;
    const cacheExpiration = localStorage.getItem(cacheExpirationKey);

    // 检查缓存是否存在且未过期
    if (cachedData && cacheExpiration && Date.now() < Number(cacheExpiration)) {
      return JSON.parse(cachedData);
    }

    const queryParams = new URLSearchParams();
    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        const trimmedTag = tag.trim();
        if (trimmedTag) {
          queryParams.append("tags", trimmedTag);
        }
      });
    }

    // 处理并添加 search, lang 和 operator 到查询参数
    const trimmedSearch = search?.trim().substring(0, 100) || "";
    if (trimmedSearch) {
      queryParams.append("search", trimmedSearch);
    }
    queryParams.append("lang", lang);
    queryParams.append("operator", operator);

    const responseIds = await axios.get(`${API_URL}/cards/find-with-tag`, { params: queryParams });
    const detailedCards = await getPrompts("cards", responseIds.data, lang);

    localStorage.setItem(cacheKey, JSON.stringify(detailedCards));
    const expirationTime = Date.now() + 100 * 24 * 60 * 60 * 1000;
    localStorage.setItem(cacheExpirationKey, expirationTime.toString());

    return detailedCards;
  } catch (error) {
    console.error("Error fetching cards with tags:", error);
    throw error;
  }
}

// 投票用户提示
export async function voteOnUserPrompt(promptId, action) {
  try {
    if (!["upvote", "downvote"].includes(action)) {
      throw new Error("Invalid vote action");
    }
    const result = await axios.post(`${API_URL}/userprompts/${promptId}/vote`, { action: action }, config);

    // 使用后端返回值更新本地缓存（而非清除）
    if (result?.data?.counts) {
      const { upvotes, downvotes, difference } = result.data.counts;

      // 1. 更新该 prompt 的单独缓存
      const cacheKey = `commus_${promptId}`;
      const cachedDataStr = localStorage.getItem(cacheKey);
      if (cachedDataStr) {
        try {
          const cachedData = JSON.parse(cachedDataStr);
          cachedData.upvotes = upvotes;
          cachedData.downvotes = downvotes;
          cachedData.upvoteDifference = difference;
          localStorage.setItem(cacheKey, JSON.stringify(cachedData));
        } catch (e) {
          // 解析失败，忽略
        }
      }

      // 2. 更新所有 commPrompts 列表缓存中该 prompt 的数据
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("commPrompts_") && !key.endsWith("_expiration")) {
          try {
            const listCache = JSON.parse(localStorage.getItem(key));
            if (Array.isArray(listCache) && listCache[0]) {
              const prompts = listCache[0];
              const promptIndex = prompts.findIndex((p) => p.id === promptId);
              if (promptIndex !== -1) {
                prompts[promptIndex].upvotes = upvotes;
                prompts[promptIndex].downvotes = downvotes;
                prompts[promptIndex].upvoteDifference = difference;
                localStorage.setItem(key, JSON.stringify(listCache));
              }
            }
          } catch (e) {
            // 解析失败，忽略
          }
        }
      });
    }

    return result;
  } catch (error) {
    console.error("Error voting on user prompt:", error);
    throw error;
  }
}

/* 用户管理：注册、登录、更改密码、重置密码 */
export async function register(values) {
  return axios.post(`${API_URL}/auth/local/register`, {
    username: values.username,
    email: values.email,
    password: values.password,
  });
}

export async function login(values) {
  return axios.post(`${API_URL}/auth/local`, {
    identifier: values.username,
    password: values.password,
  });
}

export async function changePassword(values) {
  try {
    await axios.post(
      `${API_URL}/auth/change-password`,
      {
        password: values.newPassword,
        currentPassword: values.currentPassword,
        passwordConfirmation: values.confirmPassword,
      },
      config
    );
    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

export async function forgotPassword(email) {
  try {
    await axios.post(`${API_URL}/auth/forgot-password`, {
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
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
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
    return await axios.post(`${API_URL}/passwordless/send-link`, target);
  } catch (error) {
    console.error("Failed to send passwordless link:", error);
    throw error;
  }
}

// 使用令牌进行无密码登录
export async function loginWithToken(loginToken) {
  try {
    const response = await axios.get(`${API_URL}/passwordless/login?loginToken=${loginToken}`);
    localStorage.setItem("auth_token", response.data.jwt);
    return response.data;
  } catch (error) {
    console.error("Failed to login with token:", error);
    throw error;
  }
}

/* 评论系统 */
// 按 type 来获取评论
export async function getComments(id, page, pageSize, type = "card") {
  const cacheKey = `comments_${type}_${id}_${page}_${pageSize}`;
  const expirationKey = `${cacheKey}_expiration`;

  const cachedData = JSON.parse(localStorage.getItem(cacheKey));
  const expirationDate = localStorage.getItem(expirationKey);

  if (cachedData && expirationDate && Date.now() < Number(expirationDate)) {
    return Promise.resolve(cachedData);
  } else {
    try {
      const response = await axios.get(
        `${API_URL}/comments/api::${type}.${type}:${id}/flat?fields[0]=content&fields[1]=createdAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true&sort=id:desc`
      );

      const nextExpirationDate = Date.now() + 12 * 60 * 60 * 1000;
      localStorage.setItem(cacheKey, JSON.stringify(response.data));
      localStorage.setItem(expirationKey, String(nextExpirationDate));

      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  }
}

function clearCommentsCache(id, type = "card") {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(`comments_${type}_${id}`)) {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_expiration`);
    }
  });
}

// 发布评论
export async function postComment(pageId, commentContent, threadOf = null, type = "card") {
  try {
    const response = await axios.post(
      `${API_URL}/comments/api::${type}.${type}:${pageId}`,
      {
        content: commentContent,
        threadOf,
      },
      config
    );

    // 更新缓存
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
    // 首先从 localStorage 中获取缓存的数据和到期时间
    const cachedData = JSON.parse(localStorage.getItem("copyCounts"));
    const expirationDate = localStorage.getItem("copyCountsExpiration");

    let counts;

    // 检查缓存的数据是否还有效
    if (cachedData && expirationDate && Date.now() < Number(expirationDate)) {
      // 如果有效，那么直接使用缓存的数据
      counts = cachedData;
    } else {
      // 如果没有缓存的数据，或者数据已经过期，那么从服务器获取新的数据
      const response = await axios.get(`${API_URL}/cards/allcounts`);
      counts = response.data.reduce((acc, item) => {
        acc[item.card_id] = item.count;
        return acc;
      }, {});

      // 将获取到的数据和新的到期时间存储到 localStorage 中
      const nextExpirationDate = Date.now() + 240 * 60 * 60 * 1000;
      localStorage.setItem("copyCounts", JSON.stringify(counts));
      localStorage.setItem("copyCountsExpiration", String(nextExpirationDate));
    }

    return counts;
  } catch (error) {
    console.error("Error fetching all copy counts:", error);
    return {};
  }
}

export async function updateCopyCount(cardId) {
  try {
    const response = await axios.post(`${API_URL}/cards/${cardId}/copy`);
    const updatedCount = response.data.copyCount;
    return updatedCount;
  } catch (error) {
    console.error("Error updating copy count:", error);
    return null;
  }
}
