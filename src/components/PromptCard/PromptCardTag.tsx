import React, { useCallback, useMemo } from "react";
import { Tooltip, Space, Tag as AntTag } from "antd";
import { useHistory, useLocation } from "@docusaurus/router";
import { Tags, TagList, type TagType } from "@site/src/data/tags";
import { toggleListItem } from "@site/src/utils/jsUtils";
import { prepareUserState } from "@site/src/components/SearchBar/index";

interface PromptCardTagProps {
  tags: TagType[];
  muted?: boolean;
  /** When true (default), clicking a tag filters the homepage and blocks card modal.
   *  When false, tags are display-only and clicks pass through to the card. */
  clickable?: boolean;
}

const TagQueryStringKey = "tags";

function readSearchTags(search: string): TagType[] {
  return new URLSearchParams(search).getAll(TagQueryStringKey) as TagType[];
}

function replaceSearchTags(search: string, newTags: TagType[]) {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(TagQueryStringKey);
  newTags.forEach((tag) => searchParams.append(TagQueryStringKey, tag));
  return searchParams.toString();
}

function sortTags(tags: TagType[]) {
  return (tags || [])
    .map((tag) => ({ tag, ...Tags[tag] }))
    .sort((a, b) => TagList.indexOf(a.tag) - TagList.indexOf(b.tag));
}

/** Renders tag list with click-to-filter behavior */
const ClickableTagList = ({ tags, muted }: { tags: TagType[]; muted: boolean }) => {
  const location = useLocation();
  const history = useHistory();
  const tagObjectsSorted = useMemo(() => sortTags(tags), [tags]);

  const handleTagClick = useCallback(
    (e: React.MouseEvent, tag: TagType) => {
      e.stopPropagation();
      const currentTags = readSearchTags(location.search);
      const newTags = toggleListItem(currentTags, tag);
      const newSearch = replaceSearchTags(location.search, newTags);
      history.push({
        ...location,
        search: newSearch,
        state: prepareUserState(),
      });
    },
    [location, history],
  );

  return <TagLayout tags={tagObjectsSorted} muted={muted} onClick={(e, tag) => handleTagClick(e, tag)} cursor="pointer" />;
};

/** Renders static tag list (clicks pass through to parent) */
const StaticTagList = ({ tags, muted }: { tags: TagType[]; muted: boolean }) => {
  const tagObjectsSorted = useMemo(() => sortTags(tags), [tags]);
  return <TagLayout tags={tagObjectsSorted} muted={muted} cursor="default" />;
};

/** Shared layout for rendering tag badges */
const TagLayout = ({
  tags,
  muted,
  onClick,
  cursor,
}: {
  tags: Array<{ tag: TagType; label: string; description: string }>;
  muted: boolean;
  onClick?: (e: React.MouseEvent, tag: TagType) => void;
  cursor: string;
}) => (
  // muted 一律不压文字的透明度：原来 Space 0.6 × Tag 0.75 = 0.45，11px 标签在浅色底上
  // 实测 2.05:1（AA 小字要 4.5:1），压成单层 0.75 也只有 3.75:1，仍不合格。
  // 层级改由左侧 tick 承担（见下），文字保持全强度 —— 该弱化的是装饰，不是标签本身。
  <Space size={[6, 6]} wrap>
    {tags.map((tagObject, index) => (
      <Tooltip key={index} title={tagObject.description} id={`showcase_card_tag_${tagObject.tag}`}>
        <AntTag
          onClick={onClick ? (e) => onClick(e, tagObject.tag) : undefined}
          style={{
            marginRight: 0,
            color: "var(--ifm-color-content-secondary)",
            backgroundColor: "transparent",
            border: "1px solid var(--site-color-hairline)",
            borderInlineStart: 0,
            borderRadius: 0,
            paddingInlineStart: 10,
            paddingInlineEnd: 8,
            fontSize: 11,
            letterSpacing: "0.02em",
            position: "relative",
            cursor,
          }}>
          {/* 左侧 tick 收敛为中性灰（原 tagObject.color 彩虹色与单 accent 体系冲突）；
              muted 与否的唯一视觉差别就在这条 tick 的深浅 */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              insetInlineStart: 0,
              top: 0,
              bottom: 0,
              width: 2,
              // 别写死 rgba(255,255,255,…)：浅色模式下白色 22% 等于隐形，tick 直接消失。
              // 配对 token 在两个模式各有值（暗色 white .22 / 浅色 black .2）
              backgroundColor: muted ? "var(--site-color-ghost-border)" : "var(--site-color-neutral-marker)",
            }}
          />
          {tagObject.label}
        </AntTag>
      </Tooltip>
    ))}
  </Space>
);

export const PromptCardTag = ({ tags, muted = false, clickable = true }: PromptCardTagProps) => {
  return clickable ? <ClickableTagList tags={tags} muted={muted} /> : <StaticTagList tags={tags} muted={muted} />;
};
