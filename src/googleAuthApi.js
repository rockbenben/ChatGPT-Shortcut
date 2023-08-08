import axios from "axios";
import Cookies from "js-cookie";

const API_URL1 = "https://api.newzone.top/strapi-google-auth"; // http://localhost:1337  https://api.newzone.top
const API_URL = "https://gauth.aishort.top/strapi-google-auth";
const authToken = Cookies.get("auth_token");

const config = {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
};

// 获取 Google 认证 URL
export async function getGoogleAuthUrl() {
  try {
    const response = await axios.get(`${API_URL1}/init`);
    return response.data.url; // The response should contain the Google authentication URL
  } catch (error) {
    console.error("Error fetching Google authentication URL:", error);
    throw error;
  }
}

// 使用 REDIRECTION_AUTH_CODE 认证用户
export async function authenticateUserWithGoogle(code) {
  try {
    const response = await axios.post(`${API_URL}/user-profile`, { code }, { timeout: 30000 }); // 设置超时时间为 30 秒
    return response.data.data;
  } catch (error) {
    console.error("Error authenticating user with Google:", error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    } else {
      throw error;
    }
  }
}

// 获取认证用户详细信息
export async function getAuthenticatedUserDetails(token) {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // The response should contain the user's details
  } catch (error) {
    console.error("Error fetching authenticated user details:", error);
    throw error;
  }
}

// 为用户账户创建/更新密码
export async function updateUserPassword(newPassword) {
  try {
    const response = await axios.post(
      `${API_URL}/update-password`,
      { password: newPassword },
      config
    );
    return response.data; // The response should confirm the password update
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
}
