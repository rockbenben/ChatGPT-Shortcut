import axios from "axios";
import Cookies from "js-cookie";

// 登陆体系常量
const API_URL = "https://api.newzone.top/api"; // http://localhost:1337/api  https://api.newzone.top/api
const authToken = Cookies.get("auth_token"); // Get the auth token from the cookie

const config = {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
};

// 登陆用户获取
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

    if (
      cachedData &&
      cachedExpiration &&
      new Date().getTime() < Number(cachedExpiration)
    ) {
      // 如果缓存的数据和缓存过期时间都存在，且当前时间小于缓存过期时间，那么直接返回缓存的数据
      return JSON.parse(cachedData);
    } else {
      // 如果缓存不存在或已过期，那么发送请求获取新的数据
      const response = await axios.get(
        `${API_URL}/users/me?fields[0]=username&fields[1]=email&populate[favorites][fields][0]=loves&populate[userprompts]=*`,
        config
      );
      // 将新的数据存入缓存，设置缓存过期时间为 24 小时后
      localStorage.setItem(cacheKey, JSON.stringify(response));
      localStorage.setItem(
        expirationKey,
        (new Date().getTime() + 24 * 60 * 60 * 1000).toString()
      );

      return response;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function createFavorite(loves) {
  try {
    const response = await axios.post(
      `${API_URL}/favorites`,
      {
        data: {
          loves: loves,
        },
      },
      config
    );

    // 在添加新收藏后，清除缓存的用户信息
    localStorage.removeItem("userAllInfo");
    localStorage.removeItem("userAllInfoCacheExpiration");

    return response;
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
}

export async function updateFavorite(favoriteId, loves) {
  try {
    const response = await axios.put(
      `${API_URL}/favorites/${favoriteId}`,
      {
        data: {
          loves: loves,
        },
      },
      config
    );

    // 在更新收藏后，清除缓存的用户信息
    localStorage.removeItem("userAllInfo");
    localStorage.removeItem("userAllInfoCacheExpiration");

    return response;
  } catch (error) {
    console.error("Error updating favorite:", error);
    throw error;
  }
}

// 获取 userprompts
export async function getUserPrompts(
  page,
  pageSize,
  sortField,
  sortOrder,
  searchTerm
) {
  // 创建一个唯一的缓存键，用于在 localStorage 中存储和检索数据
  const cacheKey = `userPrompts_${page}_${pageSize}_${sortField}_${sortOrder}_${
    searchTerm || "noTerm"
  }`;
  const expirationKey = `${cacheKey}_expiration`;

  // 从 localStorage 中获取缓存的数据和到期时间
  const cachedData = JSON.parse(localStorage.getItem(cacheKey));
  const expirationDate = localStorage.getItem(expirationKey);

  // 检查缓存的数据是否还有效
  if (
    cachedData &&
    expirationDate &&
    new Date().getTime() < Number(expirationDate)
  ) {
    // 如果有效，那么直接使用缓存的数据
    return cachedData;
  } else {
    // 如果没有缓存的数据，或者数据已经过期，那么从服务器获取新的数据
    let url = `${API_URL}/userprompts?filters[share]=true&filters[promptLength][$gt]=30&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${pageSize}&sort=${sortField}:${sortOrder}`;

    // 如果存在搜索关键字，那么添加到 URL 中
    if (searchTerm) {
      url += `&filters[description][$containsi]=${searchTerm}&filters[title][$containsi]=${searchTerm}&filters[remark][$containsi]=${searchTerm}`;
    }

    const response = await axios.get(url);

    // 将获取到的数据和新的到期时间存储到 localStorage 中
    const nextExpirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hour later
    localStorage.setItem(cacheKey, JSON.stringify(response));
    localStorage.setItem(expirationKey, String(nextExpirationDate));

    return response;
  }
}

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

    // 在提交新的提示后，清除缓存的用户信息
    localStorage.removeItem("userAllInfo");
    localStorage.removeItem("userAllInfoCacheExpiration");

    return response;
  } catch (error) {
    console.error("Error submitting prompt:", error);
    throw error;
  }
}

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

    // 在更新提示后，清除缓存的用户信息
    localStorage.removeItem("userAllInfo");
    localStorage.removeItem("userAllInfoCacheExpiration");

    return response;
  } catch (error) {
    console.error("Error updating prompt:", error);
    throw error;
  }
}

export async function deletePrompt(id) {
  try {
    const response = await axios.delete(`${API_URL}/userprompts/${id}`, config);

    // 在删除提示后，清除缓存的用户信息
    localStorage.removeItem("userAllInfo");
    localStorage.removeItem("userAllInfoCacheExpiration");

    return response;
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
}

// 投票用户提示
export async function voteOnUserPrompt(promptId, action) {
  try {
    if (!authToken) {
      throw new Error(
        "Kindly proceed with casting your vote after logging in."
      );
    }
    if (!["upvote", "downvote"].includes(action)) {
      throw new Error("Invalid vote action");
    }
    return await axios.post(
      `${API_URL}/userprompts/${promptId}/vote`,
      { action: action },
      config
    );
  } catch (error) {
    console.error("Error voting on user prompt:", error);
    throw error;
  }
}

export async function login(values) {
  return axios.post(`${API_URL}/auth/local`, {
    identifier: values.username,
    password: values.password,
  });
}

export async function register(values) {
  return axios.post(`${API_URL}/auth/local/register`, {
    username: values.username,
    email: values.email,
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

// 重置用户密码
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

// copy count api
export async function fetchAllCopyCounts() {
  try {
    // 首先从 localStorage 中获取缓存的数据和到期时间
    const cachedData = JSON.parse(localStorage.getItem("copyCounts"));
    const expirationDate = localStorage.getItem("copyCountsExpiration");

    let counts;

    // 检查缓存的数据是否还有效
    if (
      cachedData &&
      expirationDate &&
      new Date().getTime() < Number(expirationDate)
    ) {
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
      const nextExpirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours later
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
