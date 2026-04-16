import lscache from "lscache";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// 缓存时间常量（分钟）
export const CACHE_TTL = {
  COPY_COUNTS: 240 * 60, // 10 天
  COMM_PROMPT_LISTS: 24 * 60, // 24 小时
  PROMPT_CARDS: 100 * 24 * 60, // 100 天（ETag）
  PROMPT_COMMUS: 30 * 24 * 60, // 30 天（ETag）
  PROMPT_USER: 30 * 24 * 60, // 30 天（ETag）
  SEARCH_RESULTS: 30 * 24 * 60, // 30 天（ETag）
  COMMENTS: 30 * 24 * 60, // 30 天（ETag）
  USER_PROFILE: 30 * 24 * 60, // 30 天（ETag）
  MYSPACE: 30 * 24 * 60, // 30 天（ETag）
  UNAVAILABLE_CACHE: 365 * 24 * 60, // 1 年（不可用内容缓存）
};

// 缓存键前缀
export const CACHE_PREFIX = {
  COPY_COUNTS: "cc",
  COMM_LISTS: "cl_",
  PROMPT_CARD: "pc_",
  PROMPT_COMMU: "pm_",
  PROMPT_USER: "pu_",
  SEARCH: "sr_",
  COMMENTS: "cm_",
  USER_PROFILE: "up", // 用户基本信息 (id, username, email)
  MYSPACE: "myspace", //新的统一 MySpace 数据
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
  try {
    lscache.set(key, value, ttlMinutes);
  } catch (e) {
    console.error("[Cache] Error setting cache for key:", key, e);
  }
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

// ==================== ETag 缓存验证支持 ====================
// ETag 与 cachedData 同用 lscache 存储，TTL 一致，避免出现"ETag 残留但数据已过期"的死局

/**
 * 存储 ETag（与对应数据用同样的 TTL）
 * @param {string} key - 缓存键
 * @param {string} etag - ETag 值
 * @param {number} ttlMinutes - 过期时间（分钟），通常应与 setCache 的 TTL 一致
 */
export const setETag = (key, etag, ttlMinutes) => {
  if (!canUseCache() || !etag) return;
  try {
    lscache.set(`${key}_etag`, etag, ttlMinutes);
  } catch (e) {
    console.error("[Cache] Error setting ETag for key:", key, e);
  }
};

/**
 * 获取 ETag
 * @param {string} key - 缓存键
 * @returns {string|null} ETag 值（已过期则返回 null）
 */
export const getETag = (key) => {
  if (!canUseCache()) return null;
  try {
    return lscache.get(`${key}_etag`);
  } catch (e) {
    console.error("[Cache] Error getting ETag for key:", key, e);
    return null;
  }
};

/**
 * 移除 ETag
 * @param {string} key - 缓存键
 */
export const removeETag = (key) => {
  if (!canUseCache()) return;
  try {
    lscache.remove(`${key}_etag`);
  } catch (e) {
    console.error("[Cache] Error removing ETag for key:", key, e);
  }
};

/**
 * 带 ETag 的缓存设置
 * 原子语义：data 和 ETag 同时写（带相同 TTL）；服务端不返 ETag 时清除旧 ETag，避免错配
 * @param {string} key - 缓存键
 * @param {any} value - 缓存值
 * @param {number} ttlMinutes - 过期时间（分钟）
 * @param {string} etag - ETag 值（可能为空）
 */
export const setCacheWithETag = (key, value, ttlMinutes, etag) => {
  setCache(key, value, ttlMinutes);
  if (etag) {
    setETag(key, etag, ttlMinutes);
  } else {
    // 服务端未返回 ETag 时，清除可能存在的旧 ETag，防止下次请求带旧 ETag 配新数据
    removeETag(key);
  }
};

/**
 * 延长缓存时间（用于 304 Not Modified 响应）
 * 同时连带延长对应的 ETag TTL；prompt-level 缓存（无 ETag）会自动 no-op
 * @param {string} key - 缓存键
 * @param {number} ttlMinutes - 新的过期时间（分钟）
 * @returns {boolean} 是否成功延长
 */
export const extendCache = (key, ttlMinutes) => {
  if (!canUseCache()) return false;

  const data = getCache(key);
  if (!data) return false;

  // 重新设置缓存，更新过期时间
  setCache(key, data, ttlMinutes);

  // 304 表示 ETag 仍有效，连带续期，避免 ETag 比 data 早过期
  const etag = getETag(key);
  if (etag) {
    setETag(key, etag, ttlMinutes);
  }

  return true;
};

/**
 * 检查缓存是否需要延长（不执行延长操作）
 * @param {string} key - 缓存键
 * @param {number} ttlMinutes - TTL（分钟）
 * @returns {boolean} true = 需要延长（剩余 < 50% TTL 或无过期信息），false = 不需要
 */
export const needsCacheExtension = (key, ttlMinutes) => {
  if (!canUseCache()) return true; // 无法判断时，保守返回 true

  const expiryKey = `lscache-${key}-cacheexpiration`;
  const expiryTime = localStorage.getItem(expiryKey);

  if (!expiryTime) return true; // 无过期信息，需要验证

  const expiryNum = parseInt(expiryTime, 10);
  if (isNaN(expiryNum)) return true; // 解析失败，保守返回 true

  const now = Date.now();
  const ttlMs = ttlMinutes * 60 * 1000;
  const remaining = expiryNum - now;

  return remaining < ttlMs * 0.5;
};

/**
 * 条件延长缓存（仅在剩余时间 < 50% TTL 时）
 * @param {string} key - 缓存键
 * @param {number} ttlMinutes - 新的过期时间（分钟）
 * @returns {boolean} 是否成功延长
 */
export const extendCacheIfNeeded = (key, ttlMinutes) => {
  if (!canUseCache()) return false;

  if (needsCacheExtension(key, ttlMinutes)) {
    return extendCache(key, ttlMinutes);
  }

  return false; // 不需要延长
};

// ==================== 遗留缓存清理 ====================

/**
 * 清理遗留缓存数据（旧版缓存系统）
 * 只删除已知的废弃缓存前缀，一次性执行
 */
export const cleanupLegacyCache = () => {
  if (!canUseCache()) return;

  const CLEANUP_FLAG = "lscache_cleanup_v3";
  if (localStorage.getItem(CLEANUP_FLAG)) return;

  // 需要删除的废弃缓存前缀（黑名单）
  // 注意：lscache 的键会加上 "lscache-" 前缀，所以这里需要匹配两种格式
  const LEGACY_PREFIXES = [
    "prompt_data_zh", // 旧版中文数据缓存（仅 "zh"，不是 "zh-Hans" 或 "zh-Hant"）
    "comments_page_", // 旧版评论缓存
    "findCardsWithTags_", // 旧版搜索缓存
    "cards_", // 旧版卡片缓存
    "commus_", // 旧版社区提示词缓存
    "commPrompts_", // 旧版社区列表缓存
    "userprompts_", // 旧版用户提示词缓存
  ];

  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      // lscache 键格式: lscache-{key} 或 lscache-{key}-cacheexpiration
      // 需要处理带前缀和不带前缀的情况
      const keyWithoutLscache = key.startsWith("lscache-") ? key.slice(8) : key;
      // 移除可能的 -cacheexpiration 后缀
      const cleanKey = keyWithoutLscache.replace(/-cacheexpiration$/, "");

      // 检查是否是 prompt_data_zh（精确匹配，不匹配 prompt_data_zh-Hans 等）
      const isLegacyZh = cleanKey === "prompt_data_zh";
      // 检查其他旧版前缀
      const isOtherLegacy = LEGACY_PREFIXES.slice(1).some((prefix) => cleanKey.startsWith(prefix));

      if (isLegacyZh || isOtherLegacy) {
        keysToRemove.push(key);
      }
    }
  }

  if (keysToRemove.length > 0) {
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  localStorage.setItem(CLEANUP_FLAG, Date.now().toString());
};
