/**
 * Homepage Data Service - Manages card data loading for the homepage
 * All data is loaded from static JSON files (no API calls)
 * 仅会话级内存缓存；跨会话由 import() chunk 的 content-hash + HTTP immutable 缓存兜底
 */
import { ALL_IDS } from "@site/src/data/constants";
import { dedupe } from "@site/src/utils/dedupe";

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

// 支持的语言 = 我们拥有 prompt 数据文件（prompt_<lang>.json）的语言集合，即数据导入表的 key。
// 这是「数据维度」，与 i18n 构建 locale（docusaurus.config.js 的 locales，可因构建内存裁剪）
// 是不同的轴：构建 locale 变了，数据语言不随之变。lang 不在此列时回退 zh-Hans 数据。
export const SUPPORTED_LANGUAGES = Object.keys(PROMPT_DATA_MAP);

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
 * Cache hierarchy: Memory (会话级) -> Dynamic Import (bundle)
 *
 * 不再叠 lscache：prompt_<lang>.json 是 import() 进来的静态 chunk，文件名带 webpack
 * content-hash —— 数据没变浏览器 HTTP 缓存直接命中（零网络），数据变则文件名变自动拉新。
 * 失效完全交给构建层 hash，比手写 TTL/版本号更可靠；旧的 lscache 100 天 TTL 反而导致
 * 新增提示词最长 100 天不可见，故移除。跨会话由 HTTP 缓存的 bundle 兜底，仅多一次 JSON.parse。
 */
async function getPromptData(lang: string): Promise<CardData[]> {
  // Fallback to zh-Hans if language not supported
  const safeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : "zh-Hans";

  // 内存缓存命中（会话级）—— 命中走快路径，跳过 dedupe 开销
  if (promptDataCache[safeLang]) {
    return promptDataCache[safeLang];
  }

  return dedupe(`getPromptData:${safeLang}`, async () => {
    // 二次内存检查：可能有并发调用在 dedupe 排队期间已回填
    if (promptDataCache[safeLang]) {
      return promptDataCache[safeLang];
    }

    // 静态映射导入 JSON 文件（HTTP 缓存兜底跨会话）
    try {
      const loader = PROMPT_DATA_MAP[safeLang];
      if (!loader) {
        throw new Error(`Language ${safeLang} not supported in PROMPT_DATA_MAP`);
      }
      const data = await loader();
      const promptData = data.default;

      promptDataCache[safeLang] = promptData;
      return promptData;
    } catch (error) {
      console.error(`[getPromptData] Failed to load prompt_${safeLang}.json:`, error);
      // Fallback to zh-Hans
      if (safeLang !== "zh-Hans") {
        return getPromptData("zh-Hans");
      }
      throw error;
    }
  });
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
    const excludeSet = new Set(excludeIds);
    const availableIds = ALL_IDS.filter((id) => !excludeSet.has(id));

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

// 倒排标签索引缓存：tag → Set<cardIndex>，按语言分组
const tagIndexCache: Record<string, Map<string, Set<number>>> = {};

/**
 * 构建倒排标签索引（首次搜索时自动创建）
 * 将 O(n*m) 的标签匹配优化为 O(m) 的集合查找
 */
function getTagIndex(lang: string, allData: CardData[]): Map<string, Set<number>> {
  if (tagIndexCache[lang]) return tagIndexCache[lang];

  const index = new Map<string, Set<number>>();
  allData.forEach((card, i) => {
    (card.tags || []).forEach((tag: string) => {
      if (!index.has(tag)) index.set(tag, new Set());
      index.get(tag)!.add(i);
    });
  });

  tagIndexCache[lang] = index;
  return index;
}

/**
 * 本地搜索卡片（从静态 JSON）
 * - 使用倒排索引加速标签过滤
 * - 根据 tags 和关键词过滤
 */
export async function searchCardsLocally(tags: string[], searchName: string | null, lang: string = "zh-Hans", operator: "AND" | "OR" = "OR"): Promise<CardData[]> {
  try {
    const allData = await getPromptData(lang);
    const searchLower = searchName ? searchName.toLowerCase().trim() : "";
    const safeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : "zh-Hans";

    // 使用倒排索引快速获取候选卡片
    let candidateIndices: Set<number> | null = null;

    if (tags.length > 0) {
      const tagIndex = getTagIndex(safeLang, allData);

      if (operator === "AND") {
        // AND: 取所有标签结果的交集
        for (const tag of tags) {
          const tagSet = tagIndex.get(tag) || new Set<number>();
          if (candidateIndices === null) {
            candidateIndices = new Set(tagSet);
          } else {
            // 交集
            for (const idx of candidateIndices) {
              if (!tagSet.has(idx)) candidateIndices.delete(idx);
            }
          }
          if (candidateIndices.size === 0) return [];
        }
      } else {
        // OR: 取所有标签结果的并集
        candidateIndices = new Set<number>();
        for (const tag of tags) {
          const tagSet = tagIndex.get(tag);
          if (tagSet) {
            for (const idx of tagSet) candidateIndices.add(idx);
          }
        }
        if (candidateIndices.size === 0) return [];
      }
    }

    // 过滤：标签索引筛选 + 关键词搜索
    const candidates = candidateIndices ? Array.from(candidateIndices).map((i) => allData[i]) : allData;

    if (!searchLower) return candidates;

    return candidates.filter((card) => {
      const langData = card[safeLang] || card["zh-Hans"] || {};
      const title = (langData.title || card.title || "").toLowerCase();
      const description = (langData.description || card.description || "").toLowerCase();
      const remark = (langData.remark || card.remark || "").toLowerCase();
      const prompt = (langData.prompt || card.prompt || "").toLowerCase();

      return title.includes(searchLower) || description.includes(searchLower) || remark.includes(searchLower) || prompt.includes(searchLower);
    });
  } catch (error) {
    console.error("[searchCardsLocally] Error searching cards:", error);
    throw error;
  }
}
