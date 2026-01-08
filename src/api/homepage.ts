/**
 * Homepage Data Service - Manages card data loading for the homepage
 * All data is loaded from static JSON files (no API calls)
 * Uses lscache for persistent caching (100 days)
 */
import { ALL_IDS, SUPPORTED_LANGUAGES } from "@site/src/data/constants";
import { getCache, setCache, CACHE_TTL } from "@site/src/utils/cache";

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

// 内存缓存（会话级别，快速访问）
const promptDataCache: Record<string, CardData[]> = {};

// lscache 缓存键前缀
const PROMPT_CACHE_KEY = "prompt_data_";

// Define explicit import maps to ensure bundlers (like in extensions) can resolve them statically
const PROMPT_DATA_MAP: Record<string, () => Promise<any>> = {
  "zh-Hans": () => import("@site/src/data/prompt_zh-Hans.json"),
  "zh-Hant": () => import("@site/src/data/prompt_zh-Hant.json"),
  en: () => import("@site/src/data/prompt_en.json"),
  ja: () => import("@site/src/data/prompt_ja.json"),
  ko: () => import("@site/src/data/prompt_ko.json"),
  de: () => import("@site/src/data/prompt_de.json"),
  fr: () => import("@site/src/data/prompt_fr.json"),
  es: () => import("@site/src/data/prompt_es.json"),
  it: () => import("@site/src/data/prompt_it.json"),
  pt: () => import("@site/src/data/prompt_pt.json"),
  ru: () => import("@site/src/data/prompt_ru.json"),
  ar: () => import("@site/src/data/prompt_ar.json"),
  hi: () => import("@site/src/data/prompt_hi.json"),
  bn: () => import("@site/src/data/prompt_bn.json"),
  vi: () => import("@site/src/data/prompt_vi.json"),
  th: () => import("@site/src/data/prompt_th.json"),
  tr: () => import("@site/src/data/prompt_tr.json"),
  ind: () => import("@site/src/data/prompt_ind.json"),
};

const DEFAULT_FAVOR_MAP: Record<string, () => Promise<any>> = {
  "zh-Hans": () => import("@site/src/data/default/favor_zh-Hans.json"),
  "zh-Hant": () => import("@site/src/data/default/favor_zh-Hant.json"),
  en: () => import("@site/src/data/default/favor_en.json"),
  ja: () => import("@site/src/data/default/favor_ja.json"),
  ko: () => import("@site/src/data/default/favor_ko.json"),
  de: () => import("@site/src/data/default/favor_de.json"),
  fr: () => import("@site/src/data/default/favor_fr.json"),
  es: () => import("@site/src/data/default/favor_es.json"),
  it: () => import("@site/src/data/default/favor_it.json"),
  pt: () => import("@site/src/data/default/favor_pt.json"),
  ru: () => import("@site/src/data/default/favor_ru.json"),
  ar: () => import("@site/src/data/default/favor_ar.json"),
  hi: () => import("@site/src/data/default/favor_hi.json"),
  bn: () => import("@site/src/data/default/favor_bn.json"),
  vi: () => import("@site/src/data/default/favor_vi.json"),
  th: () => import("@site/src/data/default/favor_th.json"),
  tr: () => import("@site/src/data/default/favor_tr.json"),
  ind: () => import("@site/src/data/default/favor_ind.json"),
};

const DEFAULT_OTHER_MAP: Record<string, () => Promise<any>> = {
  "zh-Hans": () => import("@site/src/data/default/other_zh-Hans.json"),
  "zh-Hant": () => import("@site/src/data/default/other_zh-Hant.json"),
  en: () => import("@site/src/data/default/other_en.json"),
  ja: () => import("@site/src/data/default/other_ja.json"),
  ko: () => import("@site/src/data/default/other_ko.json"),
  de: () => import("@site/src/data/default/other_de.json"),
  fr: () => import("@site/src/data/default/other_fr.json"),
  es: () => import("@site/src/data/default/other_es.json"),
  it: () => import("@site/src/data/default/other_it.json"),
  pt: () => import("@site/src/data/default/other_pt.json"),
  ru: () => import("@site/src/data/default/other_ru.json"),
  ar: () => import("@site/src/data/default/other_ar.json"),
  hi: () => import("@site/src/data/default/other_hi.json"),
  bn: () => import("@site/src/data/default/other_bn.json"),
  vi: () => import("@site/src/data/default/other_vi.json"),
  th: () => import("@site/src/data/default/other_th.json"),
  tr: () => import("@site/src/data/default/other_tr.json"),
  ind: () => import("@site/src/data/default/other_ind.json"),
};

/**
 * Load all prompt data for a specific language
 * Cache hierarchy: Memory -> lscache (100 days) -> Dynamic Import
 */
async function getPromptData(lang: string): Promise<CardData[]> {
  // Fallback to zh-Hans if language not supported
  const safeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : "zh-Hans";
  const cacheKey = `${PROMPT_CACHE_KEY}${safeLang}`;

  // 1. 检查内存缓存（最快）
  if (promptDataCache[safeLang]) {
    return promptDataCache[safeLang];
  }

  // 2. 检查 lscache 持久化缓存（100天有效期）
  const cachedData = getCache(cacheKey);
  if (cachedData && Array.isArray(cachedData)) {
    // 存入内存缓存以供后续快速访问
    promptDataCache[safeLang] = cachedData;
    return cachedData;
  }

  // 3. 静态映射导入 JSON 文件
  try {
    const loader = PROMPT_DATA_MAP[safeLang];
    if (!loader) {
      throw new Error(`Language ${safeLang} not supported in PROMPT_DATA_MAP`);
    }
    const data = await loader();
    const promptData = data.default;

    // 同时存入内存缓存和 lscache
    promptDataCache[safeLang] = promptData;
    setCache(cacheKey, promptData, CACHE_TTL.PROMPT_CARDS); // 100 天

    return promptData;
  } catch (error) {
    console.error(`[getPromptData] Failed to load prompt_${safeLang}.json:`, error);
    // Fallback to zh-Hans
    if (safeLang !== "zh-Hans") {
      return getPromptData("zh-Hans");
    }
    throw error;
  }
}

/**
 * 获取默认卡片数据（未登录用户）
 * - 直接导入本地静态 JSON 文件
 */
export async function fetchDefaultCards(lang: string = "zh-Hans"): Promise<DefaultCardsResult> {
  try {
    // 直接从本地静态文件加载默认数据
    const favorLoader = DEFAULT_FAVOR_MAP[lang] || DEFAULT_FAVOR_MAP["zh-Hans"];
    const otherLoader = DEFAULT_OTHER_MAP[lang] || DEFAULT_OTHER_MAP["zh-Hans"];

    const [favorModule, otherModule] = await Promise.all([favorLoader(), otherLoader()]);

    const result: DefaultCardsResult = {
      favorite: favorModule.default,
      other: otherModule.default,
    };

    return result;
  } catch (error) {
    console.error("[fetchDefaultCards] Error loading default cards:", error);
    // 降级到中文
    if (lang !== "zh-Hans") {
      return fetchDefaultCards("zh-Hans");
    }
    throw error;
  }
}

/**
 * 批量获取卡片详情（从静态 JSON）
 * - 从 prompt_{lang}.json 加载数据
 * - 根据 ID 过滤返回
 */
export async function fetchCardsByIds(ids: number[], lang: string = "zh-Hans"): Promise<CardData[]> {
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
export async function fetchNextCards(excludeIds: number[], batchSize: number = 8, lang: string = "zh-Hans"): Promise<CardData[]> {
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
export async function searchCardsLocally(tags: string[], searchName: string | null, lang: string = "zh-Hans", operator: "AND" | "OR" = "OR"): Promise<CardData[]> {
  try {
    const allData = await getPromptData(lang);
    const searchLower = searchName ? searchName.toLowerCase().trim() : "";

    // Map legacy 'zh' to 'zh-Hans' to match data structure
    const safeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : "zh-Hans";

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
        const langData = card[safeLang] || card.zh || {};
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
