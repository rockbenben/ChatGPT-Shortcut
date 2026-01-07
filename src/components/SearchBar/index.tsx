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
          const data = await searchCardsLocally(selectedTags, searchName, currentLanguage, operator);
          if (cancelled) return;
          startTransition(() => {
            setFilteredCards(data);
          });
          if (userAuth && selectedTags.length === 0) {
            Promise.all([
              userAuth.data.userprompts ? getPrompts("userprompts", userAuth.data.userprompts) : Promise.resolve([]),
              userAuth.data.favorites && userAuth.data.favorites.commLoves ? getPrompts("commus", userAuth.data.favorites.commLoves) : Promise.resolve([]),
            ])
              .then(([userprompts, commus]) => {
                if (cancelled) return [];
                return [...userprompts, ...commus].filter(
                  (prompt) =>
                    prompt.title.toLowerCase().includes(searchLower) ||
                    prompt.description.toLowerCase().includes(searchLower) ||
                    (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
                    (prompt.notes && prompt.notes.toLowerCase().includes(searchLower))
                );
              })
              .then((filteredCommus) => {
                if (cancelled) return;
                startTransition(() => setFilteredCommus(filteredCommus));
              });
          }
        } else if (searchMode === "myfavor") {
          if (userAuth?.data?.favorites) {
            Promise.resolve()
              .then(async () => {
                const data = await searchCardsLocally(selectedTags, searchName, currentLanguage, operator);
                if (cancelled) return { favoriteCards: [], commus: [] };
                const favoriteCards = userAuth.data.favorites.loves ? data.filter((card) => userAuth.data.favorites.loves.includes(card.id)) : [];
                startTransition(() => setFilteredCards(favoriteCards));
                if (userAuth.data.favorites.commLoves) {
                  const commus = await getPrompts("commus", userAuth.data.favorites.commLoves);
                  return { favoriteCards, commus };
                }
                return { favoriteCards, commus: [] };
              })
              .then(({ commus }) => {
                if (cancelled) return;
                const filtered = commus.filter(
                  (prompt) =>
                    prompt.title.toLowerCase().includes(searchLower) ||
                    prompt.description.toLowerCase().includes(searchLower) ||
                    (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
                    (prompt.notes && prompt.notes.toLowerCase().includes(searchLower))
                );
                startTransition(() => setFilteredCommus(filtered));
              });
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
            Promise.resolve()
              .then(async () => {
                const userprompts = await getPrompts("userprompts", userAuth.data.userprompts);
                return userprompts;
              })
              .then((userprompts) => {
                if (cancelled) return;
                const filtered = userprompts.filter(
                  (prompt) =>
                    prompt.title.toLowerCase().includes(searchLower) ||
                    prompt.description.toLowerCase().includes(searchLower) ||
                    (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
                    (prompt.notes && prompt.notes.toLowerCase().includes(searchLower))
                );
                startTransition(() => setFilteredCommus(filtered));
              });
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
    <div className={styles.searchInput} style={{ marginLeft: "auto" }}>
      <Input
        ref={inputRef}
        id="searchbar"
        placeholder={translate({
          message: "搜索提示词……",
          id: "input.search.placeholder",
        })}
        value={value ?? undefined}
        onChange={handleInput}
        onPressEnter={handleSearch}
        allowClear
        suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} type="text" />}
      />
    </div>
  );
}

export default SearchBar;
