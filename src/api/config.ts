/**
 * API 配置 - 所有接口地址集中在此，便于后期修改
 *
 * ⚠️ 注意：此文件不能导入其他 API 模块，以避免循环依赖
 */

/**
 * 服务端判定 token 失效（401）时，api 层在 window 上派发的事件名。
 * AuthContext 监听它把 React 登录态一并降下来——否则 401 只清了缓存，
 * 本次会话的 UI 仍显示已登录，用户每次交互都会再发一发注定 401 的请求。
 * 放在 config.ts（不导入任何 api 模块）以免 client.ts ↔ AuthContext 形成循环依赖。
 */
export const AUTH_EXPIRED_EVENT = "aishort:auth-expired";

/** 主 API 地址（Strapi 后端） */
// 生产环境: https://api.newzone.top/api
// 开发环境: http://localhost:1337/api
export const API_URL = "https://api.newzone.top/api";

/** Google OAuth 登录入口服务（因主服务器无法连接 Google，需使用独立服务） */
// 生产环境: https://gauth.aishort.top
// 开发环境: http://localhost:1337
export const GAUTH_API_BASE = "https://gauth.aishort.top";

/**
 * Google OAuth 模式开关
 * - true:  使用旧版流程（/init 获取 URL + /user-profile 认证）
 * - false: 使用新版流程（Strapi 原生 /api/connect/google）
 */
export const USE_LEGACY_GAUTH = false;
