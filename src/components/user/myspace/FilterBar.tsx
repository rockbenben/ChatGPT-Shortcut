import React, { useState, useEffect, useCallback } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Segmented, Button, Input, Flex } from "antd";
import { AppstoreOutlined, EditOutlined, HeartOutlined, TagOutlined, SearchOutlined } from "@ant-design/icons";
import searchStyles from "@site/src/components/SearchBar/styles.module.css";
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
        <Flex wrap="wrap" gap="small" style={{ marginLeft: 8 }}>
          {customTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              // 用真 <button> 而不是 antd <Tag>（span）：同 TagManagerModal 里的颜色触发器。
              // <Tag onClick> 看着能点（cursor:pointer），但没有 tabindex / role，
              // 键盘用户 Tab 不到、读屏当纯文本念，自定义标签筛选实际上用不了。
              // aria-pressed 而非 role="button"：这是个可切换的筛选开关，选中态要能被拿到。
              aria-pressed={selectedTags.includes(tag.id)}
              // 不走 antd 预设色标签（color-6 文字 + color-1 底）：gold/lime 这类中间调在浅底上
              // 只有 2.48~2.76:1，12px 文字不达标，且三种 variant 都救不回来。
              // 改成与首页筛选标签同一套语言（中性文字 + 末尾圆点，见 ShowcaseTagSelect），
              // 用户选的颜色收敛到圆点上：--ant-<preset>-6 由 antd 按主题各出一份值。
              onClick={() => toggleTag(tag.id)}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                margin: 0,
                padding: "4px 10px",
                borderRadius: 0,
                // <button> 不继承页面字体，不写会变成系统 UI 字体
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "0.02em",
                border: `1px solid ${selectedTags.includes(tag.id) ? "rgba(var(--ifm-color-primary-rgb), 0.4)" : "var(--site-color-hairline)"}`,
                background: selectedTags.includes(tag.id) ? "rgba(var(--ifm-color-primary-rgb), 0.1)" : "transparent",
                color: selectedTags.includes(tag.id) ? "var(--site-color-tag-selected-text)" : "var(--ifm-color-content-secondary)",
                transition: "all 0.12s cubic-bezier(0.16,1,0.3,1)",
              }}>
              {tag.name}
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 1,
                  marginInlineStart: 8,
                  display: "inline-block",
                  flexShrink: 0,
                  background: `var(--ant-${tag.color}-6)`,
                }}
              />
            </button>
          ))}
        </Flex>
      )}

      <Button type="text" icon={<TagOutlined />} onClick={onManageTags} size="small">
        <Translate id="myspace.manageTags">管理标签</Translate>
      </Button>

      <div className={searchStyles.searchInput}>
        <Input
          ref={inputRef}
          placeholder={translate({ id: "input.search.placeholder", message: "写作、翻译…" })}
          value={inputValue}
          onChange={handleChange}
          onPressEnter={handleSearch}
          onKeyDown={(e) => {
            // Esc 退出聚焦（终端惯例，与 Ctrl+K 进入对应）。
            // isComposing 守卫：拼音输入中按 Esc 是取消 IME 候选词，焦点必须留在框内
            if (e.key === "Escape" && !e.nativeEvent.isComposing) (e.target as HTMLInputElement).blur();
          }}
          allowClear
          prefix={
            <span className={searchStyles.promptChar} aria-hidden>
              &gt;
              <span className={searchStyles.fakeCaret} />
            </span>
          }
          suffix={
            <>
              <kbd className={`${searchStyles.kbdHint} hideOnSmallScreen`} aria-hidden>
                CTRL K
              </kbd>
              <Button type="text" icon={<SearchOutlined />} onClick={handleSearch} aria-label={translate({ id: "search.submit", message: "搜索" })} />
            </>
          }
        />
      </div>
    </Flex>
  );
};

export default FilterBar;
