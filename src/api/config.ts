/**
 * API 配置 - 所有接口地址集中在此，便于后期修改
 *
 * ⚠️ 注意：此文件不能导入其他 API 模块，以避免循环依赖
 */

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
