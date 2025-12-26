/**
 * Homepage Data Service - Manages card data loading for the homepage
 * All data is loaded from static JSON files (no API calls)
 */
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

// Cache for loaded prompt data by language
const promptDataCache: Record<string, CardData[]> = {};

/**
 * Load all prompt data for a specific language
 * Uses dynamic import with caching
 */
async function getPromptData(lang: string): Promise<CardData[]> {
  // Fallback to zh if language not supported
  const safeLang = ["zh", "en", "ja", "ko", "de", "fr", "es", "it", "pt", "ru", "ar", "hi", "bn"].includes(lang) ? lang : "zh";

  if (!promptDataCache[safeLang]) {
    try {
      const data = await import(`@site/src/data/prompt_${safeLang}.json`);
      promptDataCache[safeLang] = data.default;
    } catch (error) {
      console.error(`[getPromptData] Failed to load prompt_${safeLang}.json:`, error);
      // Fallback to zh
      if (safeLang !== "zh") {
        return getPromptData("zh");
      }
      throw error;
    }
  }
  return promptDataCache[safeLang];
}

/**
 * 获取默认卡片数据（未登录用户）
 * - 直接导入本地静态 JSON 文件
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
 * 批量获取卡片详情（从静态 JSON）
 * - 从 prompt_{lang}.json 加载数据
 * - 根据 ID 过滤返回
 */
export async function fetchCardsByIds(ids: number[], lang: string = "zh"): Promise<CardData[]> {
  if (!ids || ids.length === 0) {
    return [];
  }

  try {
    const allData = await getPromptData(lang);
    const idSet = new Set(ids);

    // Filter cards by IDs and maintain order
    const cardMap = new Map<number, CardData>();
    allData.forEach((card) => {
      if (idSet.has(card.id)) {
        cardMap.set(card.id, card);
      }
    });

    // Return in the requested order
    return ids.map((id) => cardMap.get(id)).filter(Boolean) as CardData[];
  } catch (error) {
    console.error("[fetchCardsByIds] Error fetching cards:", error);
    throw error;
  }
}

/**
 * 增量加载下一批卡片（从静态 JSON）
 * - 从 prompt_{lang}.json 获取，排除已显示的 ID
 * - 按 ALL_IDS 顺序返回
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

    // 从静态 JSON 获取卡片数据
    const cards = await fetchCardsByIds(nextIds, lang);

    return cards;
  } catch (error) {
    console.error("[fetchNextCards] Error fetching next cards:", error);
    throw error;
  }
}

/**
 * 本地搜索卡片（从静态 JSON）
 * - 根据 tags 和关键词过滤
 * - 替代 API 的 searchCards 调用
 */
export async function searchCardsLocally(tags: string[], searchName: string | null, lang: string = "zh", operator: "AND" | "OR" = "OR"): Promise<CardData[]> {
  try {
    const allData = await getPromptData(lang);
    const searchLower = searchName ? searchName.toLowerCase().trim() : "";

    // 过滤逻辑
    const filtered = allData.filter((card) => {
      // Tag 过滤
      let tagMatch = true;
      if (tags.length > 0) {
        const cardTags = card.tags || [];
        if (operator === "AND") {
          // AND: 卡片必须包含所有选中的标签
          tagMatch = tags.every((tag) => cardTags.includes(tag));
        } else {
          // OR: 卡片只需包含其中一个标签
          tagMatch = tags.some((tag) => cardTags.includes(tag));
        }
      }

      // 关键词过滤
      let searchMatch = true;
      if (searchLower) {
        // 获取当前语言的字段数据
        const langData = card[lang] || card.zh || {};
        const title = (langData.title || card.title || "").toLowerCase();
        const description = (langData.description || card.description || "").toLowerCase();
        const remark = (langData.remark || card.remark || "").toLowerCase();
        const prompt = (langData.prompt || card.prompt || "").toLowerCase();

        searchMatch = title.includes(searchLower) || description.includes(searchLower) || remark.includes(searchLower) || prompt.includes(searchLower);
      }

      return tagMatch && searchMatch;
    });

    return filtered;
  } catch (error) {
    console.error("[searchCardsLocally] Error searching cards:", error);
    throw error;
  }
}
