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
  /** Maximum number of visible tags before collapsing extras into a +N badge. */
  maxVisible?: number;
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
    .filter((tag) => Boolean(Tags[tag]))
    .map((tag) => ({ tag, ...Tags[tag] }))
    .sort((a, b) => TagList.indexOf(a.tag) - TagList.indexOf(b.tag));
}

/** Renders tag list with click-to-filter behavior */
const ClickableTagList = ({ tags, muted, maxVisible }: { tags: TagType[]; muted: boolean; maxVisible?: number }) => {
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

  return <TagLayout tags={tagObjectsSorted} muted={muted} maxVisible={maxVisible} onClick={(e, tag) => handleTagClick(e, tag)} cursor="pointer" />;
};

/** Renders static tag list (clicks pass through to parent) */
const StaticTagList = ({ tags, muted, maxVisible }: { tags: TagType[]; muted: boolean; maxVisible?: number }) => {
  const tagObjectsSorted = useMemo(() => sortTags(tags), [tags]);
  return <TagLayout tags={tagObjectsSorted} muted={muted} maxVisible={maxVisible} cursor="default" />;
};

/** Shared layout for rendering soft rounded tag badges */
const TagLayout = ({
  tags,
  muted,
  maxVisible,
  onClick,
  cursor,
}: {
  tags: Array<{ tag: TagType; label: string; description: string }>;
  muted: boolean;
  maxVisible?: number;
  onClick?: (e: React.MouseEvent, tag: TagType) => void;
  cursor: string;
}) => {
  const visibleTags = maxVisible !== undefined && tags.length > maxVisible ? tags.slice(0, maxVisible) : tags;
  const hiddenTags = maxVisible !== undefined && tags.length > maxVisible ? tags.slice(maxVisible) : [];

  return (
    <Space size={[6, 6]} wrap>
      {visibleTags.map((tagObject) => (
        <Tooltip key={tagObject.tag} title={tagObject.description} id={`showcase_card_tag_${tagObject.tag}`}>
          <AntTag
            onClick={onClick ? (e) => onClick(e, tagObject.tag) : undefined}
            style={{
              marginRight: 0,
              color: muted ? "var(--site-color-text-tertiary)" : "var(--ifm-color-content-secondary)",
              backgroundColor: "var(--site-color-preview-bg)",
              border: "none",
              borderRadius: 6,
              padding: "1px 8px",
              fontSize: 11,
              lineHeight: "20px",
              letterSpacing: "0.01em",
              cursor,
            }}>
            {tagObject.label}
          </AntTag>
        </Tooltip>
      ))}
      {hiddenTags.length > 0 && (
        <Tooltip title={hiddenTags.map((t) => t.label).join(", ")}>
          <AntTag
            style={{
              marginRight: 0,
              color: "var(--site-color-text-tertiary)",
              backgroundColor: "transparent",
              border: "1px solid var(--site-color-hairline)",
              borderRadius: 6,
              padding: "1px 7px",
              fontSize: 11,
              lineHeight: "20px",
              fontFamily: "var(--site-font-mono)",
              fontVariantNumeric: "tabular-nums",
            }}>
            +{hiddenTags.length}
          </AntTag>
        </Tooltip>
      )}
    </Space>
  );
};

export const PromptCardTag = ({ tags, muted = false, clickable = true, maxVisible }: PromptCardTagProps) => {
  return clickable ? <ClickableTagList tags={tags} muted={muted} maxVisible={maxVisible} /> : <StaticTagList tags={tags} muted={muted} maxVisible={maxVisible} />;
};
