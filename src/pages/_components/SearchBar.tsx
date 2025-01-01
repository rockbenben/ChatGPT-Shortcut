import React, { useContext, useState, useEffect, useCallback, useRef } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import Translate, { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";

import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AuthContext } from "@site/src/pages/_components/AuthContext";

import styles from "@site/src/pages/styles.module.css";
import { type Operator } from "@site/src/pages/_components/ShowcaseFilterToggle";
import { type TagType } from "@site/src/data/tags";
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

export const NoResults = () => (
  <Heading as="h2" className="text--center">
    <Translate id="showcase.usersList.noResult">😒 找不到结果，请缩短搜索词</Translate>
  </Heading>
);

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

    setSelectedTags(tags);
    setSearchName(search);
    setOperator(operatorParam as Operator);
  }, [location.search]);

  useEffect(() => {
    async function fetchAndFilterUsers() {
      if (selectedTags.length === 0 && !searchName) {
        setFilteredCards([]);
        setFilteredCommus([]);
        return;
      }
      const searchLower = searchName ? searchName.toLowerCase() : "";
      try {
        if (searchMode === "default") {
          const data = await findCardsWithTags(selectedTags, searchName, currentLanguage, operator);
          console.log("搜索结果", data);
          setFilteredCards(data); // 未登录时，仅搜索 cards 提示词
          if (userAuth) {
            // 登录后，使用本地缓存，搜索用户收藏和自定义的提示词（不区分大小写）
            Promise.all([
              userAuth.data.userprompts ? getPrompts("userprompts", userAuth.data.userprompts) : Promise.resolve([]),
              userAuth.data.favorites && userAuth.data.favorites.commLoves ? getPrompts("commus", userAuth.data.favorites.commLoves) : Promise.resolve([]),
            ])
              .then(([userprompts, commus]) => {
                return [...userprompts, ...commus].filter(
                  (prompt) =>
                    prompt.title.toLowerCase().includes(searchLower) ||
                    prompt.description.toLowerCase().includes(searchLower) ||
                    (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
                    (prompt.notes && prompt.notes.toLowerCase().includes(searchLower))
                );
              })
              .then((filteredCommus) => {
                setFilteredCommus(filteredCommus);
                // 你可以在这里将 filteredPrompts 传递给你的组件
              });
          }
        } else if (searchMode === "myfavor") {
          if (userAuth?.data?.favorites) {
            Promise.resolve()
              .then(async () => {
                // 第一步：获取并过滤 cards
                const data = await findCardsWithTags(selectedTags, searchName, currentLanguage, operator);
                const favoriteCards = userAuth.data.favorites.loves ? data.filter((card) => userAuth.data.favorites.loves.includes(card.id)) : [];
                setFilteredCards(favoriteCards);
                console.log("用户收藏的提示词", favoriteCards);

                // 第二步：获取并过滤 community prompts
                if (userAuth.data.favorites.commLoves) {
                  const commus = await getPrompts("commus", userAuth.data.favorites.commLoves);
                  return commus;
                }
                return [];
              })
              .then((commus) => {
                // 第三步：处理过滤后的结果
                const filtered = commus.filter(
                  (prompt) =>
                    prompt.title.toLowerCase().includes(searchLower) ||
                    prompt.description.toLowerCase().includes(searchLower) ||
                    (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
                    (prompt.notes && prompt.notes.toLowerCase().includes(searchLower))
                );
                setFilteredCommus(filtered);
              });
          } else {
            setFilteredCards([]);
            setFilteredCommus([]);
          }
        } else if (searchMode === "myprompts") {
          if (userAuth?.data?.userprompts) {
            Promise.resolve()
              .then(async () => {
                // 第一步：获取用户自定义提示词
                const userprompts = await getPrompts("userprompts", userAuth.data.userprompts);
                return userprompts;
              })
              .then((userprompts) => {
                // 第二步：过滤结果
                const filtered = userprompts.filter(
                  (prompt) =>
                    prompt.title.toLowerCase().includes(searchLower) ||
                    prompt.description.toLowerCase().includes(searchLower) ||
                    (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
                    (prompt.notes && prompt.notes.toLowerCase().includes(searchLower))
                );
                setFilteredCommus(filtered);
              });
          } else {
            setFilteredCommus([]);
          }
        }
      } catch (error) {
        console.error("Error fetching and filtering prompts:", error);
        setFilteredCards([]);
        setFilteredCommus([]);
      }
    }

    fetchAndFilterUsers();
  }, [selectedTags, searchName, operator, currentLanguage, searchMode]);

  const isFiltered = selectedTags.length > 0 || searchName !== null;

  return { filteredCommus, filteredCards, isFiltered };
}

function SearchBar({ setShowUserPrompts = (value: boolean) => {}, setShowUserFavs = (value: boolean) => {} }) {
  const history = useHistory();
  const location = useLocation();
  const searchRef = useRef<Input>(null);
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
