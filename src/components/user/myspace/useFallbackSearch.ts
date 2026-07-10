import { useEffect, useState } from "react";
import { getCommPrompts } from "@site/src/api/prompts";
import { searchCardsLocally } from "@site/src/api/homepage";

interface UseFallbackSearchParams {
  /** 本地筛选结果数——为 0 且有搜索词时触发降级搜索 */
  filteredCount: number;
  searchQuery: string;
  currentLanguage: string;
}

/** 降级搜索：本地无结果时搜索精选提示词库，精选也无结果则搜索社区 */
export function useFallbackSearch({ filteredCount, searchQuery, currentLanguage }: UseFallbackSearchParams) {
  const [fallbackCards, setFallbackCards] = useState<any[]>([]);
  const [fallbackSource, setFallbackSource] = useState<"curated" | "community">("curated");
  const [isFallbackLoading, setIsFallbackLoading] = useState(false);

  useEffect(() => {
    if (filteredCount > 0 || !searchQuery.trim()) {
      setFallbackCards([]);
      return;
    }

    let cancelled = false;
    setIsFallbackLoading(true);

    (async () => {
      try {
        const data = await searchCardsLocally([], searchQuery, currentLanguage);
        if (cancelled) return;

        if (data.length > 0) {
          setFallbackSource("curated");
          setFallbackCards(data.slice(0, 12));
          return;
        }

        // 精选也无结果，尝试搜索社区提示词
        const result = await getCommPrompts(1, 12, "upvoteDifference", "desc", searchQuery);
        if (cancelled) return;
        const commuPrompts = Array.isArray(result) ? result[0] : [];
        setFallbackSource("community");
        setFallbackCards(commuPrompts);
      } catch {
        if (!cancelled) setFallbackCards([]);
      } finally {
        if (!cancelled) setIsFallbackLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filteredCount, searchQuery, currentLanguage]);

  return { fallbackCards, fallbackSource, isFallbackLoading };
}
