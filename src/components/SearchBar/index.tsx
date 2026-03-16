import React, { useContext, useState, useEffect, useCallback, startTransition } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";

import { Input, Button, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AuthContext } from "@site/src/components/AuthContext";

import { type Operator } from "@site/src/components/ShowcaseFilterToggle";
import { type TagType, TagList } from "@site/src/data/tags";
import { searchCardsLocally } from "@site/src/api/homepage";

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
          if (!cancelled) setFilteredCards([]);
        });
        return;
      }
      try {
        const data = await searchCardsLocally(selectedTags, searchName, currentLanguage, operator);
        if (cancelled) return;

        if (searchMode === "myfavor") {
          const loves = userAuth?.data?.favorites?.loves || [];
          startTransition(() => setFilteredCards(loves.length > 0 ? data.filter((card) => loves.includes(card.id)) : []));
        } else {
          startTransition(() => setFilteredCards(data));
        }
      } catch (error) {
        console.error("Error fetching and filtering prompts:", error);
        if (!cancelled) {
          startTransition(() => setFilteredCards([]));
        }
      }
    }
    fetchAndFilterUsers();
    return () => {
      cancelled = true;
    };
  }, [selectedTags, searchName, operator, currentLanguage, searchMode, userAuth?.data?.favorites?.loves]);

  const isFiltered = selectedTags.length > 0 || searchName !== null;

  return { filteredCards, isFiltered };
}

const searchBarTheme = {
  components: {
    Input: {
      borderRadius: 20,
      controlHeight: 32,
      colorBorder: "transparent",
      activeBorderColor: "transparent",
      hoverBorderColor: "var(--ifm-color-emphasis-300)",
      activeShadow: "0 0 0 2px var(--ifm-color-primary-lighter)",
      colorBgContainer: "var(--site-color-background)",
    },
    Button: {
      colorText: "var(--ifm-color-emphasis-600)",
      colorPrimaryHover: "var(--ifm-color-primary)",
    },
  },
};

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
    <ConfigProvider theme={searchBarTheme}>
      <div style={{ marginLeft: "auto" }}>
        <Input
          ref={inputRef}
          id="searchbar"
          placeholder={translate({
            message: "搜索提示词...",
            id: "input.search.placeholder",
          })}
          value={value ?? undefined}
          onChange={handleInput}
          onPressEnter={handleSearch}
          allowClear
          suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} type="text" />}
        />
      </div>
    </ConfigProvider>
  );
}

export default SearchBar;
