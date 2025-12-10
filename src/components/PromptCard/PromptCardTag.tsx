import React from "react";
import { Tooltip, Space, Tag as AntTag } from "antd";
import { Tags, TagList, type TagType } from "@site/src/data/tags";
import { sortBy } from "@site/src/utils/jsUtils";

interface PromptCardTagProps {
  tags: TagType[];
  muted?: boolean;
}

export const PromptCardTag = ({ tags, muted = false }: PromptCardTagProps) => {
  const safeTags = (tags || []).filter((tag) => tag !== "favorite");
  const tagObjects = safeTags.map((tag) => ({ tag, ...Tags[tag] }));
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) => TagList.indexOf(tagObject.tag));

  return (
    <Space size={[8, 8]} wrap style={{ opacity: muted ? 0.6 : 1 }}>
      {tagObjectsSorted.map((tagObject, index) => (
        <Tooltip key={index} title={tagObject.description} id={`showcase_card_tag_${tagObject.tag}`}>
          <AntTag
            color={tagObject.color}
            style={{
              marginRight: 0,
              opacity: muted ? 0.7 : 1,
            }}>
            {tagObject.label}
          </AntTag>
        </Tooltip>
      ))}
    </Space>
  );
};
