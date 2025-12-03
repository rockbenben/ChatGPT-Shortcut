import React, { useContext, useState, useEffect, useCallback, useRef, startTransition } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import Translate, { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";

import { Input, Button, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AuthContext } from "@site/src/pages/_components/AuthContext";

import styles from "@site/src/pages/styles.module.css";
import { type Operator } from "@site/src/pages/_components/ShowcaseFilterToggle";
import { type TagType, TagList } from "@site/src/data/tags";
import { findCardsWithTags, getPrompts } from "@site/src/api";

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

// NoResults 组件：先显示 "Searching..." 150ms，再显示真正的“无结果”提示，防止瞬间搜索完成时的闪烁
export const NoResults: React.FC = () => {
  const [showNoResult, setShowNoResult] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowNoResult(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Heading as="h2" className="text--center">
      {showNoResult ? translate({ id: "showcase.usersList.noResult", message: "😒 找不到结果，请缩短搜索词" }) : "Searching..."}
    </Heading>
  );
};

export function useFilteredPrompts(searchMode: "default" | "myfavor" | "myprompts" = "default") {
  const location = useLocation<UserState>();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
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
          const data = await findCardsWithTags(selectedTags, searchName, currentLanguage, operator);
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
                const data = await findCardsWithTags(selectedTags, searchName, currentLanguage, operator);
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
  }, [selectedTags, searchName, operator, currentLanguage, searchMode, userAuth]);

  const isFiltered = selectedTags.length > 0 || searchName !== null;

  return { filteredCommus, filteredCards, isFiltered };
}

function SearchBar({ setShowUserPrompts = (value: boolean) => {}, setShowUserFavs = (value: boolean) => {} }) {
  const history = useHistory();
  const location = useLocation();
  const searchRef = useRef<InputRef>(null);
  const [value, setValue] = useState<string | null>(null);

  const isMobile = useCallback(() => {
    if (ExecutionEnvironment.canUseDOM) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return false; // 默认为非移动设备。避免在 SSR 时报错
  }, []);

  useEffect(() => {
    setValue(readSearchName(location.search));
    // 只在非移动设备上自动获取焦点
    if (!isMobile() && searchRef.current?.input) {
      searchRef.current.input.focus();
    }
  }, [location]);

  const handleSearch = useCallback(() => {
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
    setShowUserFavs(false);
  }, [value, location, history]);

  useEffect(() => {
    if (value === "") {
      handleSearch();
    }
  }, [value, handleSearch]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        ref={searchRef}
        id="searchbar"
        placeholder={translate({
          message: "Search for prompts...",
          id: "showcase.searchBar.placeholder",
        })}
        value={value ?? undefined}
        onChange={handleInput}
        onPressEnter={handleSearch}
        allowClear
        autoFocus={!isMobile()}
        suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} type="primary" />}
      />
    </div>
  );
}

export default SearchBar;
