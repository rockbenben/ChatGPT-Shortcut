/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState, useEffect, type ComponentProps, type ReactNode, type ReactElement } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import { Tag } from "antd";
import { toggleListItem } from "@site/src/utils/jsUtils";
import type { TagType } from "@site/src/data/tags";
import styles from "./styles.module.css";

import { prepareUserState } from "@site/src/components/SearchBar/index";

interface Props extends ComponentProps<"input"> {
  icon: ReactElement<ComponentProps<"svg">> | ReactNode;
  label: ReactNode;
  tag: TagType | string;
}

const TagQueryStringKey = "tags";

function readSearchTags(search: string): (TagType | string)[] {
  return new URLSearchParams(search).getAll(TagQueryStringKey) as (TagType | string)[];
}

function replaceSearchTags(search: string, newTags: (TagType | string)[]) {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(TagQueryStringKey);
  newTags.forEach((tag) => searchParams.append(TagQueryStringKey, tag));
  return searchParams.toString();
}

function ShowcaseTagSelect({ id, icon, label, tag, checked: propChecked, ...rest }: Props, ref: React.ForwardedRef<HTMLSpanElement>) {
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // Use propChecked if provided (for controlled mode), otherwise derive from URL
    if (propChecked !== undefined) {
      setSelected(propChecked);
    } else {
      const tags = readSearchTags(location.search);
      setSelected(tags.includes(tag));
    }
  }, [tag, location, propChecked]);

  const toggleTag = useCallback(() => {
    const tags = readSearchTags(location.search);
    const newTags = toggleListItem(tags, tag);
    const newSearch = replaceSearchTags(location.search, newTags);
    history.push({
      ...location,
      search: newSearch,
      state: prepareUserState(),
    });
  }, [tag, location, history]);

  const handleChange = useCallback(() => {
    toggleTag();
  }, [toggleTag]);

  // rest 必须展开到 span 上：antd Tooltip 通过给子元素注入 onMouseEnter/onMouseLeave/
  // onFocus/onBlur 与 aria-describedby 来工作，丢掉它们 tooltip 就不会触发。
  // （旧的自研 ShowcaseTooltip 走 addEventListener 直接挂 DOM，绕开 React props，
  //  所以那时丢掉 rest 也看不出问题，连 id / aria-describedby 一起被吞了。）
  return (
    <span ref={ref} id={id} style={{ display: "inline-block" }} {...rest}>
      <Tag.CheckableTag className={`${styles.tagSelect} ${selected ? styles.tagSelectChecked : ""}`} checked={selected} onChange={handleChange}>
        {label}
        {icon}
      </Tag.CheckableTag>
    </span>
  );
}

export default React.forwardRef(ShowcaseTagSelect);
