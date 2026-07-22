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

interface SearchBarProps {
  beforeSearch?: (value: string | null) => boolean | void;
}

function SearchBar({ beforeSearch }: SearchBarProps) {
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
    // 避免重复 push：清空搜索时 effect 会因 handleSearch 重建而二次触发，
    // 若搜索词没变就跳过，防止产生重复历史记录（用户按返回键需按两次）。
    //
    // 只比对 name 参数本身，不比对整个 query 串——handleSearch 唯一改动的就是它，
    // 而 delete + set 会把 name 挪到参数列表末尾，串比较在 URL 还带 tags 等参数时
    // 必然不等（"name=a&tags=b" vs "tags=b&name=a"），守卫会静默失效。
    const nextName = value || null;
    if (readSearchName(location.search) === nextName) {
      return;
    }

    const newSearch = new URLSearchParams(location.search);
    newSearch.delete(SearchNameQueryKey);
    if (nextName) {
      newSearch.set(SearchNameQueryKey, nextName);
    }
    history.push({
      ...location,
      search: newSearch.toString(),
      state: prepareUserState(),
    });
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
