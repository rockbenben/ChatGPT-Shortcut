import lscache from "lscache";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// 缓存时间常量（分钟）
export const CACHE_TTL = {
  PROMPT_CARDS: 100 * 24 * 60, // 100 天
  PROMPT_COMMUS: 30 * 24 * 60, // 30 天
  PROMPT_USER: 12 * 60, // 12 小时
  COMM_PROMPT_LISTS: 24 * 60, // 24 小时
  SEARCH_RESULTS: 100 * 24 * 60, // 100 天
  COMMENTS: 12 * 60, // 12 小时
  COPY_COUNTS: 240 * 60, // 240 小时 (10 天)
  USER_INFO: 24 * 60, // 24 小时
};

// 缓存键前缀
export const CACHE_PREFIX = {
  PROMPT_CARD: "pc_",
  PROMPT_COMMU: "pm_",
  PROMPT_USER: "pu_",
  COMM_LISTS: "cl_",
  SEARCH: "sr_",
  COMMENTS: "cm_",
  COPY_COUNTS: "cc",
  USER_INFO: "ui",
};

/**
 * 检查是否可以使用缓存
 */
const canUseCache = () => ExecutionEnvironment.canUseDOM;

/**
 * 设置缓存
 * @param {string} key - 缓存键
 * @param {any} value - 缓存值
 * @param {number} ttlMinutes - 过期时间（分钟）
 */
export const setCache = (key, value, ttlMinutes) => {
  if (!canUseCache()) return;
  lscache.set(key, value, ttlMinutes);
};

/**
 * 获取缓存
 * @param {string} key - 缓存键
 * @returns {any} 缓存值，过期或不存在返回 null
 */
export const getCache = (key) => {
  if (!canUseCache()) return null;
  return lscache.get(key);
};

/**
 * 移除缓存
 * @param {string} key - 缓存键
 */
export const removeCache = (key) => {
  if (!canUseCache()) return;
  lscache.remove(key);
};

/**
 * 清除所有缓存
 */
export const flushCache = () => {
  if (!canUseCache()) return;
  lscache.flush();
};

/**
 * 根据前缀清除缓存
 * @param {string} prefix - 缓存键前缀
 */
export const flushCacheByPrefix = (prefix) => {
  if (!canUseCache()) return;
  lscache.flushExpired();

  // lscache 没有按前缀清除的方法，需要遍历
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`lscache-${prefix}`)) {
      keysToRemove.push(key.replace("lscache-", "").replace("-cacheexpiration", ""));
    }
  }

  // 去重并移除
  [...new Set(keysToRemove)].forEach((key) => {
    lscache.remove(key);
  });
};

/**
 * 生成 prompt 缓存键
 * @param {string} type - prompt 类型 (cards, commus, userprompts)
 * @param {number|string} id - prompt ID
 * @param {string} [lang] - 语言（仅 cards 需要）
 */
export const getPromptCacheKey = (type, id, lang) => {
  const prefixMap = {
    cards: CACHE_PREFIX.PROMPT_CARD,
    commus: CACHE_PREFIX.PROMPT_COMMU,
    userprompts: CACHE_PREFIX.PROMPT_USER,
  };
  const prefix = prefixMap[type] || CACHE_PREFIX.PROMPT_COMMU;
  return lang ? `${prefix}${id}_${lang}` : `${prefix}${id}`;
};

/**
 * 获取 prompt 的 TTL（分钟）
 * @param {string} type - prompt 类型
 */
export const getPromptTTL = (type) => {
  const ttlMap = {
    cards: CACHE_TTL.PROMPT_CARDS,
    commus: CACHE_TTL.PROMPT_COMMUS,
    userprompts: CACHE_TTL.PROMPT_USER,
  };
  return ttlMap[type] || CACHE_TTL.PROMPT_COMMUS;
};

/**
 * 生成列表缓存键
 * @param {string} prefix - 前缀
 * @param  {...any} parts - 键的组成部分
 */
export const getListCacheKey = (prefix, ...parts) => {
  return `${prefix}${parts.join("_")}`;
};
