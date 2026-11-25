import React, { useState, useEffect, useCallback } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Segmented, Button, Input, Flex } from "antd";
import { AppstoreOutlined, EditOutlined, HeartOutlined, TagOutlined, SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import searchStyles from "@site/src/components/SearchBar/styles.module.css";
import { SearchShortcutHint } from "@site/src/components/SearchBar/SearchShortcutHint";
import { InputClearIcon } from "@site/src/components/InputClearIcon";
import type { CustomTag, FilterType } from "./types";

const FilterBar: React.FC<{
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  customTags: CustomTag[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  onManageTags: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({ filter, setFilter, customTags, selectedTags, setSelectedTags, onManageTags, searchQuery, setSearchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const inputRef = React.useRef<any>(null);

  // 同步外部searchQuery变化到本地inputValue
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Ctrl+K / ⌘K 聚焦搜索框（与首页 SearchBar 一致的终端 command palette 惯例，对应 suffix 键帽提示）。
  // MySpace 与首页 SearchBar 互斥渲染（collection 视图下首页不挂 SearchBar），不会出现双重 Ctrl+K 监听
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
    setSearchQuery(inputValue);
  }, [inputValue, setSearchQuery]);

  // 清空时立即触发搜索
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      if (val === "") {
        setSearchQuery("");
      }
    },
    [setSearchQuery],
  );

  const filterOptions = [
    {
      label: (
        <>
          <AppstoreOutlined /> <Translate id="myspace.filter.all">全部</Translate>
        </>
      ),
      value: "all",
    },
    {
      label: (
        <>
          <EditOutlined /> <Translate id="myspace.filter.prompts">提示词</Translate>
        </>
      ),
      value: "prompt",
    },
    {
      label: (
        <>
          <HeartOutlined /> <Translate id="myspace.filter.favorites">收藏</Translate>
        </>
      ),
      value: "favorite",
    },
  ];

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      // If already selected, deselect it
      setSelectedTags([]);
    } else {
      // Single select: replace with this tag only
      setSelectedTags([tagId]);
    }
  };

  return (
    <Flex wrap="wrap" gap="small" align="center" style={{ marginBottom: 16 }}>
      <Segmented options={filterOptions} value={filter} onChange={(value) => setFilter(value as FilterType)} />

      {customTags.length > 0 && (
        <Flex wrap="wrap" gap="small" style={{ marginInlineStart: 4 }}>
          {customTags.map((tag) => {
            const isSelected = selectedTags.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleTag(tag.id)}
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  margin: 0,
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontFamily: "inherit",
                  fontSize: 12.5,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  border: `1px solid ${isSelected ? "var(--site-color-tag-selected-border)" : "var(--site-color-hairline)"}`,
                  background: isSelected ? "var(--site-color-tag-selected-bg)" : "var(--ifm-background-surface-color)",
                  color: isSelected ? "var(--site-color-tag-selected-text)" : "var(--ifm-color-content-secondary)",
                  transition: "all 0.14s var(--site-motion-emphasized)",
                }}>
                <span
                  aria-hidden
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    marginInlineEnd: 7,
                    display: "inline-block",
                    flexShrink: 0,
                    background: `var(--ant-${tag.color}-6)`,
                  }}
                />
                {tag.name}
              </button>
            );
          })}
        </Flex>
      )}

      <Button type="text" icon={<TagOutlined />} onClick={onManageTags} size="small">
        <Translate id="myspace.manageTags">管理标签</Translate>
      </Button>

      <div className={searchStyles.searchInput}>
        <Input
          aria-label={translate({ id: "search.submit", message: "搜索" })}
          ref={inputRef}
          placeholder={translate({ id: "input.search.placeholder", message: "写作、翻译…" })}
          value={inputValue}
          onChange={handleChange}
          onPressEnter={handleSearch}
          onKeyDown={(e) => {
            // Esc 退出聚焦（与 Ctrl+K 进入对应）。isComposing 守卫避免打断输入法候选词
            if (e.key === "Escape" && !e.nativeEvent.isComposing) (e.target as HTMLInputElement).blur();
          }}
          allowClear={{ clearIcon: <InputClearIcon /> }}
          prefix={<SearchOutlined className={searchStyles.searchIcon} aria-hidden />}
          suffix={
            <>
              <SearchShortcutHint />
              <Button
                type="text"
                size="small"
                icon={<ArrowRightOutlined />}
                onClick={handleSearch}
                aria-label={translate({ id: "search.submit", message: "搜索" })}
              />
            </>
          }
        />
      </div>
    </Flex>
  );
};

export default FilterBar;
