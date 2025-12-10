/**
 * Authentication APIs - register, login, password management
 */
import { apiClient, persistAuthToken, clearUserAllInfoCache } from "./client";

/**
 * Register a new user
 */
export async function register(values: { username: string; email: string; password: string }) {
  const response = await apiClient.post(`/auth/local/register`, {
    username: values.username,
    email: values.email,
    password: values.password,
  });
  clearUserAllInfoCache();
  return response;
}

/**
 * Login with username/email and password
 */
export async function login(values: { username: string; password: string }) {
  const response = await apiClient.post(`/auth/local`, {
    identifier: values.username,
    password: values.password,
  });
  clearUserAllInfoCache();
  return response;
}

/**
 * Change password for logged-in user
 */
export async function changePassword(values: { currentPassword: string; newPassword: string; confirmPassword: string }) {
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

/**
 * Request password reset email
 */
export async function forgotPassword(email: string) {
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

/**
 * Reset password with code
 */
export async function resetPassword(values: { code: string; newPassword: string; confirmPassword: string }) {
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

/**
 * Send passwordless login link
 */
export async function sendPasswordlessLink(target: { email?: string }) {
  try {
    return await apiClient.post(`/passwordless/send-link`, target);
  } catch (error) {
    console.error("Failed to send passwordless link:", error);
    throw error;
  }
}

/**
 * Login with passwordless token
 */
export async function loginWithToken(loginToken: string) {
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
