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
  // 检查 authToken 是否存在
  if (!authToken) {
    // 如果 authToken 不存在，直接返回 null 或者抛出错误
    // return null;
    throw new Error("Auth token not provided");
  }
  return axios.get(`${API_URL}/users/me?populate=*`, config);
}

export async function createFavorite(loves) {
  return axios.post(
    `${API_URL}/favorites`,
    {
      data: {
        loves: loves,
      },
    },
    config
  );
}

export async function updateFavorite(favoriteId, loves) {
  return axios.put(
    `${API_URL}/favorites/${favoriteId}`,
    {
      data: {
        loves: loves,
      },
    },
    config
  );
}

export async function submitPrompt(values) {
  return axios.post(
    `${API_URL}/userprompts`,
    {
      data: {
        title: values.title,
        description: values.description,
        remark: values.remark,
        notes: values.notes,
      },
    },
    config
  );
}

// 更新 updatePrompt 函数，让它接受两个参数：id 和 values
export async function updatePrompt(id, values) {
  return axios.put(
    `${API_URL}/userprompts/${id}`,
    {
      data: {
        title: values.title,
        description: values.description,
        remark: values.remark,
        notes: values.notes,
      },
    },
    config
  );
}

export async function deletePrompt(id) {
  return axios.delete(`${API_URL}/userprompts/${id}`, config);
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

// user
export async function fetchUserData() {
  try {
    if (!authToken) {
      throw new Error("Auth token not provided");
    }
    const response = await axios.get(`${API_URL}/users/me`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
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
    const response = await axios.get("https://api-count.newzone.top/api/cards/allcounts");
    const counts = response.data.reduce((acc, item) => {
      acc[item.card_id] = item.count;
      return acc;
    }, {});
    return counts;
  } catch (error) {
    console.error("Error fetching all copy counts:", error);
    return {};
  }
}
export async function updateCopyCount(cardId) {
  try {
    const response = await axios.post(`https://api-count.newzone.top/api/cards/${cardId}/copy`);
    const updatedCount = response.data.copyCount;
    return updatedCount;
  } catch (error) {
    console.error("Error updating copy count:", error);
    return null;
  }
}
