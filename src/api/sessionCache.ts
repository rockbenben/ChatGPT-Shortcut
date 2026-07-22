/**
 * 会话级缓存清理 —— 「用户不再登录」时要抹掉的全部本地痕迹，唯一定义在此。
 *
 * 三条登出路径共用：UserStatus.handleLogout（手动）、client.ts 的 401 拦截器（服务端吊销）、
 * AuthContext.clearAuth（本地判定失效）。集中定义是为了让三者不可能各自漂移。
 *
 * 只依赖 utils/cache，不 import 任何 api 模块，因此 client.ts / myspace.ts 都能静态引入而不成环。
 */
import { removeCache, removeETag, CACHE_PREFIX } from "@site/src/utils/cache";

/** 清用户基本信息（id/username/email）。必须连 ETag 一起清，否则下次请求带旧 ETag 会命中旧数据。 */
export function clearUserProfileCache() {
  removeCache(CACHE_PREFIX.USER_PROFILE);
  removeETag(CACHE_PREFIX.USER_PROFILE);
}

/** 清 MySpace 缓存。收藏、提示词、排序、标签变更后调用。ETag 同上。 */
export function clearMySpaceCache() {
  removeCache(CACHE_PREFIX.MYSPACE);
  removeETag(CACHE_PREFIX.MYSPACE);
}

/**
 * 清除会话身份相关的缓存。不碰 token（调用方负责），不发请求。
 *
 * 清的是「谁登录着 + 该账号的收藏/资料」这类身份状态：user_auth 快照、myspace、用户资料。
 * 不清**提示词词条内容**：pu_（用户自己的提示词）、pm_/pc_（社区/卡片）、cl_（社区列表）、
 * cc（复制数）——这些是内容缓存，与「当前是谁」无关，清了只会让下次访问白白重打后端。
 * 换账号时按 id 取用各自的键，旧账号的词条缓存不会污染新账号显示。
 */
export function clearUserSessionCaches() {
  clearUserProfileCache();
  clearMySpaceCache();
  removeCache("user_auth"); // 登录态快照，TTL 30 天，漏清即僵尸登录
  removeCache("myspace_stats");
}
