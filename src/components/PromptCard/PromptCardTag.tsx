import React, { useCallback, useMemo } from "react";
import { Tooltip, Space, Tag as AntTag } from "antd";
import { useHistory, useLocation } from "@docusaurus/router";
import { Tags, TagList, type TagType } from "@site/src/data/tags";
import { sortBy, toggleListItem } from "@site/src/utils/jsUtils";
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
  const tagObjects = (tags || []).map((tag) => ({ tag, ...Tags[tag] }));
  return sortBy(tagObjects, (t) => TagList.indexOf(t.tag));
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
  tags: Array<{ tag: TagType; label: string; description: string; color: string }>;
  muted: boolean;
  onClick?: (e: React.MouseEvent, tag: TagType) => void;
  cursor: string;
}) => (
  <Space size={[8, 8]} wrap style={{ opacity: muted ? 0.6 : 1 }}>
    {tags.map((tagObject, index) => (
      <Tooltip key={index} title={tagObject.description} id={`showcase_card_tag_${tagObject.tag}`}>
        <AntTag
          onClick={onClick ? (e) => onClick(e, tagObject.tag) : undefined}
          style={{
            marginRight: 0,
            opacity: muted ? 0.75 : 1,
            color: "var(--ifm-color-content)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--ifm-color-emphasis-300)",
            borderLeft: 0,
            borderRadius: "0 2px 2px 0",
            paddingInlineStart: 10,
            paddingInlineEnd: 8,
            position: "relative",
            cursor,
          }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: tagObject.color,
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
