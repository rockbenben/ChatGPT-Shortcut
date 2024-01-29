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
function clearUserAllInfoCache() {
  localStorage.removeItem("userAllInfo");
  localStorage.removeItem("userAllInfoCacheExpiration");
}

// 更新 localStorage 缓存的通用函数
export const updateLocalStorageCache = (setField, updatedData) => {
  const cachedData = localStorage.getItem("userAllInfo");
  if (cachedData) {
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
  }
};

// 用户获取：获取登录用户信息
// User Retrieval: Fetches informations of the logged-in user.
export async function getUserAllInfo() {
  try {
    if (!authToken) {
      throw new Error("Please log in to gain access.");
    }

    // 定义缓存的 key
    const cacheKey = "userAllInfo";
    const expirationKey = "userAllInfoCacheExpiration";

    // 尝试从本地存储中获取缓存的数据
    const cachedData = localStorage.getItem(cacheKey);
    const cachedExpiration = localStorage.getItem(expirationKey);

    if (cachedData && cachedExpiration && new Date().getTime() < Number(cachedExpiration)) {
      // 如果缓存的数据和缓存过期时间都存在，且当前时间小于缓存过期时间，那么直接返回缓存的数据
      return JSON.parse(cachedData);
    } else {
      // 如果缓存不存在或已过期，那么发送请求获取新的数据
      const response = await axios.get(
        `${API_URL}/users/me?fields[0]=username&fields[1]=email&populate[favorites][fields][0]=loves&populate[favorites][fields][1]=commLoves&populate[userprompts][fields][0]=id`,
        config
      );
      localStorage.setItem(cacheKey, JSON.stringify(response));
      getPrompts("userprompts", response.data.userprompts);
      localStorage.setItem(expirationKey, (new Date().getTime() + 24 * 60 * 60 * 1000).toString());

      return response;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Batch fetch selected prompts 批量获取精选prompt
export function getPrompts(type, ids, lang) {
  let idsToFetch = [];
  let cachedPrompts = [];

  if (type == "userprompts") {
    ids = ids.map((prompt) => prompt.id);
  }

  // 检查每个 ID 对应的缓存
  ids.forEach((id) => {
    const cacheKey = `${type}_${id}${lang ? `_${lang}` : ""}`;
    const expirationKey = `${cacheKey}_expiration`;

    const cachedData = JSON.parse(localStorage.getItem(cacheKey));
    const expirationDate = localStorage.getItem(expirationKey);

    if (cachedData && expirationDate && new Date().getTime() < Number(expirationDate)) {
      cachedPrompts.push(cachedData);
    } else {
      idsToFetch.push(id);
    }
  });

  // 如果所有数据都已缓存，直接返回这些数据
  if (idsToFetch.length === 0) {
    return Promise.resolve(cachedPrompts);
  } else {
    const apiEndpoint = type === "cards" ? "/cards/bulk" : type === "commus" ? "/userprompts/bulk" : "/userprompts/favorbulk";
    const postData = type === "cards" ? { ids: idsToFetch, lang } : { ids: idsToFetch };
    const requestConfig = type === "userprompts" ? config : {};

    return axios
      .post(`${API_URL}${apiEndpoint}`, postData, requestConfig)
      .then((response) => {
        const expirationTime = type === "userprompts" ? 12 * 60 * 60 * 1000 : 240 * 60 * 60 * 1000;
        const nextExpirationDate = new Date().getTime() + expirationTime;

        response.data.forEach((item) => {
          const itemCacheKey = `${type}_${item.id}${lang ? `_${lang}` : ""}`;
          const itemExpirationKey = `${itemCacheKey}_expiration`;

          localStorage.setItem(itemCacheKey, JSON.stringify(item));
          localStorage.setItem(itemExpirationKey, String(nextExpirationDate));
        });

        return [...cachedPrompts, ...response.data];
      })
      .catch((error) => {
        console.error(`Error fetching ${type}:`, error);
        throw error;
      });
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
  // 创建一个唯一的缓存键，用于在 localStorage 中存储和检索数据
  const cacheKey = `commPrompts_${page}_${pageSize}_${sortField}_${sortOrder}_${searchTerm || "noTerm"}`;
  const expirationKey = `${cacheKey}_expiration`;

  // 从 localStorage 中获取缓存的数据和到期时间
  const cachedData = JSON.parse(localStorage.getItem(cacheKey));
  const expirationDate = localStorage.getItem(expirationKey);

  // 检查缓存的数据是否还有效
  if (cachedData && expirationDate && new Date().getTime() < Number(expirationDate)) {
    //localStorage.removeItem(cacheKey);
    return cachedData;
  } else {
    // 如果没有缓存的数据，或者数据已经过期，那么从服务器获取新的数据
    let url = `${API_URL}/userprompts?fields=id&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${pageSize}&sort=${sortField}:${sortOrder}`;

    // 如果存在搜索关键字，那么添加到 URL 中
    if (searchTerm) {
      url += `&filters[$or][0][description][$containsi]=${searchTerm}&filters[$or][1][title][$containsi]=${searchTerm}&filters[$or][2][remark][$containsi]=${searchTerm}`;
    }

    const responseTotal = await axios.get(url);
    const ids = responseTotal.data.data.map((item) => item.id);
    const responseIds = await getPrompts("commus", ids);

    const nextExpirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hour later
    localStorage.setItem(cacheKey, JSON.stringify([responseIds, responseTotal]));
    localStorage.setItem(expirationKey, String(nextExpirationDate));

    return [responseIds, responseTotal];
  }
}

// 投票用户提示
export async function voteOnUserPrompt(promptId, action) {
  try {
    if (!["upvote", "downvote"].includes(action)) {
      throw new Error("Invalid vote action");
    }
    return await axios.post(`${API_URL}/userprompts/${promptId}/vote`, { action: action }, config);
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

/* 评论系统 */
// 按 type 来获取评论
export async function getComments(id, page, pageSize, type = "card") {
  const cacheKey = `comments_${type}_${id}_${page}_${pageSize}`;
  const expirationKey = `${cacheKey}_expiration`;

  const cachedData = JSON.parse(localStorage.getItem(cacheKey));
  const expirationDate = localStorage.getItem(expirationKey);

  if (cachedData && expirationDate && new Date().getTime() < Number(expirationDate)) {
    return Promise.resolve(cachedData);
  } else {
    try {
      const response = await axios.get(
        `${API_URL}/comments/api::${type}.${type}:${id}/flat?fields[0]=content&fields[1]=createdAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true&sort=id:desc`
      );

      const nextExpirationDate = new Date().getTime() + 12 * 60 * 60 * 1000;
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
    if (cachedData && expirationDate && new Date().getTime() < Number(expirationDate)) {
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
      const nextExpirationDate = new Date().getTime() + 240 * 60 * 60 * 1000;
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
