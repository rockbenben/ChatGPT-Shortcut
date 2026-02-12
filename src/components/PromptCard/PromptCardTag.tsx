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
            opacity: muted ? 0.7 : 1,
            color: tagObject.color,
            backgroundColor: `${tagObject.color}18`,
            borderColor: `${tagObject.color}50`,
            cursor,
          }}>
          {tagObject.label}
        </AntTag>
      </Tooltip>
    ))}
  </Space>
);

export const PromptCardTag = ({ tags, muted = false, clickable = true }: PromptCardTagProps) => {
  return clickable ? <ClickableTagList tags={tags} muted={muted} /> : <StaticTagList tags={tags} muted={muted} />;
};
