import React, { useCallback } from "react";
import { Tooltip, Space, Tag as AntTag } from "antd";
import { useHistory, useLocation } from "@docusaurus/router";
import { Tags, TagList, type TagType } from "@site/src/data/tags";
import { sortBy, toggleListItem } from "@site/src/utils/jsUtils";
import { prepareUserState } from "@site/src/components/SearchBar/index";

interface PromptCardTagProps {
  tags: TagType[];
  muted?: boolean;
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

export const PromptCardTag = ({ tags, muted = false }: PromptCardTagProps) => {
  const location = useLocation();
  const history = useHistory();
  const tagObjects = (tags || []).map((tag) => ({ tag, ...Tags[tag] }));
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) => TagList.indexOf(tagObject.tag));

  const handleTagClick = useCallback(
    (tag: TagType) => {
      const currentTags = readSearchTags(location.search);
      const newTags = toggleListItem(currentTags, tag);
      const newSearch = replaceSearchTags(location.search, newTags);
      history.push({
        ...location,
        search: newSearch,
        state: prepareUserState(),
      });
    },
    [location, history]
  );

  return (
    <Space size={[8, 8]} wrap style={{ opacity: muted ? 0.6 : 1 }}>
      {tagObjectsSorted.map((tagObject, index) => (
        <Tooltip key={index} title={tagObject.description} id={`showcase_card_tag_${tagObject.tag}`}>
          <AntTag
            onClick={() => handleTagClick(tagObject.tag)}
            style={{
              marginRight: 0,
              opacity: muted ? 0.7 : 1,
              color: tagObject.color,
              backgroundColor: `${tagObject.color}18`,
              borderColor: `${tagObject.color}50`,
              cursor: "pointer",
            }}>
            {tagObject.label}
          </AntTag>
        </Tooltip>
      ))}
    </Space>
  );
};
