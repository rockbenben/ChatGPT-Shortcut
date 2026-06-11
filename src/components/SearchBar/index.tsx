import React, { useContext, useState, useEffect, useCallback, startTransition } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";

import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AuthContext } from "@site/src/components/AuthContext";

import { type Operator } from "@site/src/components/ShowcaseFilterToggle";
import { type TagType, TagList } from "@site/src/data/tags";
import { getPrompts } from "@site/src/api";
import { getCommPrompts } from "@site/src/api/prompts";
import { searchCardsLocally } from "@site/src/api/homepage";

import styles from "./styles.module.css";

export type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = "name";

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

/** Check if a prompt matches a search term across text fields */
// title/description 用可选链：getPrompts 对「已收藏但作者取消分享且本地无缓存」的社区提示词
// 会返回 {id,_unavailable,_noCache} 占位对象（无 title/description）。裸 .toLowerCase() 会抛错，
// 而该调用在 [...userprompts,...commus].filter 里——一个占位对象就会中断整组过滤，
// 导致用户自有/收藏提示词的搜索结果被整体吞空。占位对象无可搜索内容，应安静地不匹配。
const matchesSearch = (prompt: any, searchLower: string): boolean =>
  prompt.title?.toLowerCase().includes(searchLower) ||
  prompt.description?.toLowerCase().includes(searchLower) ||
  (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
  (prompt.notes && prompt.notes.toLowerCase().includes(searchLower));

export function useFilteredPrompts(searchMode: "default" | "myfavor" | "myprompts" = "default") {
  const location = useLocation<UserState>();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;
  const [operator, setOperator] = useState<Operator>("OR");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filteredCommus, setFilteredCommus] = useState<any[]>([]);
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tags = queryParams.getAll("tags");
    const search = queryParams.get("name");
    const operatorParam = queryParams.get("operator") || "OR";
    // 将多次初始 setState 合并到一次低优更新，避免 hydration 尚未完全时触发高优刷新
    startTransition(() => {
      const validTags = tags.filter((tag) => TagList.includes(tag as TagType)) as TagType[];
      setSelectedTags(validTags);
      setSearchName(search);
      setOperator(operatorParam as Operator);
    });
  }, [location.search]);

  useEffect(() => {
    let cancelled = false;
    async function fetchAndFilterUsers() {
      if (selectedTags.length === 0 && !searchName) {
        startTransition(() => {
          if (!cancelled) {
            setFilteredCards([]);
            setFilteredCommus([]);
          }
        });
        return;
      }
      const searchLower = searchName ? searchName.toLowerCase() : "";
      try {
        if (searchMode === "default") {
          // 精选搜索和本地收藏搜索并行，互不依赖
          const cardsPromise = searchCardsLocally(selectedTags, searchName, currentLanguage, operator);
          const commusPromise =
            userAuth?.data && selectedTags.length === 0
              ? Promise.all([
                  userAuth.data.userprompts ? getPrompts("userprompts", userAuth.data.userprompts) : Promise.resolve([]),
                  userAuth.data.favorites && userAuth.data.favorites.commLoves ? getPrompts("commus", userAuth.data.favorites.commLoves) : Promise.resolve([]),
                ]).then(([userprompts, commus]) => [...userprompts, ...commus].filter((prompt) => matchesSearch(prompt, searchLower)))
              : Promise.resolve([]);

          const [data, localCommus] = await Promise.all([cardsPromise, commusPromise.catch(() => [] as any[])]);
          if (cancelled) return;

          startTransition(() => {
            setFilteredCards(data);
            setFilteredCommus(localCommus);
          });

          // 降级搜索：精选和本地收藏都无结果时，搜索全量社区提示词（无需登录）
          if (localCommus.length === 0 && data.length === 0 && searchName) {
            try {
              const result = await getCommPrompts(1, 12, "upvoteDifference", "desc", searchName);
              if (cancelled) return;
              const communityPrompts = Array.isArray(result) ? result[0] : [];
              if (communityPrompts.length > 0) {
                startTransition(() => setFilteredCommus(communityPrompts));
              }
            } catch {
              // 社区搜索失败不影响已有结果
            }
          }
        } else if (searchMode === "myfavor") {
          if (userAuth?.data?.favorites) {
            const data = await searchCardsLocally(selectedTags, searchName, currentLanguage, operator);
            if (cancelled) return;
            const favoriteCards = userAuth.data.favorites.loves ? data.filter((card) => userAuth.data.favorites.loves.includes(card.id)) : [];
            startTransition(() => setFilteredCards(favoriteCards));

            let commus: any[] = [];
            if (userAuth.data.favorites.commLoves) {
              commus = await getPrompts("commus", userAuth.data.favorites.commLoves);
              if (cancelled) return;
            }
            const filtered = commus.filter((prompt) => matchesSearch(prompt, searchLower));
            startTransition(() => setFilteredCommus(filtered));
          } else {
            startTransition(() => {
              if (!cancelled) {
                setFilteredCards([]);
                setFilteredCommus([]);
              }
            });
          }
        } else if (searchMode === "myprompts") {
          if (userAuth?.data?.userprompts) {
            const userprompts = await getPrompts("userprompts", userAuth.data.userprompts);
            if (cancelled) return;
            const filtered = userprompts.filter((prompt) => matchesSearch(prompt, searchLower));
            startTransition(() => setFilteredCommus(filtered));
          } else {
            startTransition(() => {
              if (!cancelled) setFilteredCommus([]);
            });
          }
        }
      } catch (error) {
        console.error("Error fetching and filtering prompts:", error);
        if (!cancelled) {
          startTransition(() => {
            setFilteredCards([]);
            setFilteredCommus([]);
          });
        }
      }
    }
    fetchAndFilterUsers();
    return () => {
      cancelled = true;
    };
  }, [selectedTags, searchName, operator, currentLanguage, searchMode, userAuth?.data?.userprompts, userAuth?.data?.favorites?.loves, userAuth?.data?.favorites?.commLoves]);

  const isFiltered = selectedTags.length > 0 || searchName !== null;

  return { filteredCommus, filteredCards, isFiltered };
}

interface SearchBarProps {
  setShowUserPrompts?: (value: boolean) => void;
  beforeSearch?: (value: string | null) => boolean | void;
}

function SearchBar({ setShowUserPrompts = () => {}, beforeSearch }: SearchBarProps) {
  const history = useHistory();
  const location = useLocation<UserState>();
  const [value, setValue] = useState<string | null>(null);
  const inputRef = React.useRef<any>(null);

  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);

  useEffect(() => {
    if (location.state?.focusedElementId === "searchbar" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.state]);

  // Ctrl+K / ⌘K 聚焦搜索框（终端 command palette 惯例，与 suffix 键帽提示对应）
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSearch = useCallback(() => {
    if (beforeSearch && beforeSearch(value) === false) {
      return;
    }
    const newSearch = new URLSearchParams(location.search);
    newSearch.delete(SearchNameQueryKey);
    if (value) {
      newSearch.set(SearchNameQueryKey, value);
    }
    history.push({
      ...location,
      search: newSearch.toString(),
      state: prepareUserState(),
    });
    setShowUserPrompts(false);
  }, [value, location, history, beforeSearch]);

  useEffect(() => {
    if (value === "") {
      handleSearch();
    }
  }, [value, handleSearch]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchInput}>
      <Input
        ref={inputRef}
        id="searchbar"
        placeholder={translate({
          message: "搜索：写作、翻译、编程…",
          id: "input.search.placeholder",
        })}
        value={value ?? undefined}
        onChange={handleInput}
        onPressEnter={handleSearch}
        onKeyDown={(e) => {
          // Esc 退出聚焦（终端惯例，与 Ctrl+K 进入对应）。
          // isComposing 守卫：拼音输入中按 Esc 是取消 IME 候选词，焦点必须留在框内
          if (e.key === "Escape" && !e.nativeEvent.isComposing) (e.target as HTMLInputElement).blur();
        }}
        allowClear
        prefix={
          <span className={styles.promptChar} aria-hidden>
            &gt;
            <span className={styles.fakeCaret} />
          </span>
        }
        suffix={
          <>
            <kbd className={`${styles.kbdHint} hideOnSmallScreen`} aria-hidden>
              CTRL K
            </kbd>
            <Button icon={<SearchOutlined />} onClick={handleSearch} type="text" />
          </>
        }
      />
    </div>
  );
}

export default SearchBar;
