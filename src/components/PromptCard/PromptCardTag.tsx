import React from "react";
import { Tooltip, Space, Tag as AntTag } from "antd";
import { Tags, TagList, type TagType } from "@site/src/data/tags";
import { sortBy } from "@site/src/utils/jsUtils";

export const PromptCardTag = ({ tags }: { tags: TagType[] }) => {
  const safeTags = (tags || []).filter((tag) => tag !== "favorite");
  const tagObjects = safeTags.map((tag) => ({ tag, ...Tags[tag] }));
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) => TagList.indexOf(tagObject.tag));

  return (
    <Space size={[8, 8]} wrap>
      {tagObjectsSorted.map((tagObject, index) => (
        <Tooltip key={index} title={tagObject.description} id={`showcase_card_tag_${tagObject.tag}`}>
          <AntTag
            variant="filled"
            style={{
              backgroundColor: `${tagObject.color}20`, // 12% opacity
              color: tagObject.color,
              borderColor: "transparent",
              marginRight: 0,
            }}>
            {tagObject.label}
          </AntTag>
        </Tooltip>
      ))}
    </Space>
  );
};
