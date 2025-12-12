/**
 * Homepage Data Service - Manages card data loading for the homepage
 * Uses existing getPrompts API as transition approach
 */
import { getPrompts } from "./prompts";
import { setCache, getCache, CACHE_TTL, CACHE_PREFIX, getListCacheKey } from "@site/src/utils/cache";
import { DEFAULT_FAVORITE_IDS, DEFAULT_IDS, ALL_IDS } from "@site/src/data/constants";

export interface CardData {
  id: number;
  title: string;
  description: string;
  remark?: string;
  tags?: string[];
  [key: string]: any;
}

export interface DefaultCardsResult {
  favorite: CardData[];
  other: CardData[];
}

export interface PagedCardsResult {
  data: CardData[];
  hasMore: boolean;
  total: number;
  currentPage: number;
}

/**
 * 获取默认卡片数据（未登录用户）
 * - 直接导入本地静态 JSON 文件
 * - 不使用缓存，确保每次都是最新的静态数据
 */
export async function fetchDefaultCards(lang: string = "zh"): Promise<DefaultCardsResult> {
  try {
    // 直接从本地静态文件加载默认数据
    const [favorModule, otherModule] = await Promise.all([import(`@site/src/data/default/favor_${lang}.json`), import(`@site/src/data/default/other_${lang}.json`)]);

    const result: DefaultCardsResult = {
      favorite: favorModule.default,
      other: otherModule.default,
    };

    return result;
  } catch (error) {
    console.error("[fetchDefaultCards] Error loading default cards:", error);
    // 降级到中文
    if (lang !== "zh") {
      return fetchDefaultCards("zh");
    }
    throw error;
  }
}

/**
 * 批量获取卡片详情（过渡方案）
 * - 使用现有 getPrompts API
 * - 自动缓存每个卡片（100 天）
 */
export async function fetchCardsByIds(ids: number[], lang: string = "zh"): Promise<CardData[]> {
  if (!ids || ids.length === 0) {
    return [];
  }

  try {
    const cards = await getPrompts("cards", ids, lang);
    return cards as CardData[];
  } catch (error) {
    console.error("[fetchCardsByIds] Error fetching cards:", error);
    throw error;
  }
}

/**
 * 增量加载下一批卡片
 * - 从 ALL_IDS 中获取，排除已显示的 ID
 * - 每次加载 8 个
 * - 用于滚动加载场景
 */
export async function fetchNextCards(excludeIds: number[], batchSize: number = 8, lang: string = "zh"): Promise<CardData[]> {
  try {
    // 从 ALL_IDS 中过滤掉已显示的卡片
    const availableIds = ALL_IDS.filter((id) => !excludeIds.includes(id));

    if (availableIds.length === 0) {
      return [];
    }

    // 取前 batchSize 个
    const nextIds = availableIds.slice(0, batchSize);

    // 批量获取卡片数据
    const cards = await fetchCardsByIds(nextIds, lang);

    return cards;
  } catch (error) {
    console.error("[fetchNextCards] Error fetching next cards:", error);
    throw error;
  }
}
