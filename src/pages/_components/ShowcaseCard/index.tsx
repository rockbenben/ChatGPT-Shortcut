import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
//import Image from '@theme/IdealImage';
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import {
  Tags,
  TagList,
  type TagType,
  type User,
  type Tag,
} from "@site/src/data/users";
import { sortBy } from "@site/src/utils/jsUtils";
import Heading from "@theme/Heading";
import Tooltip from "../ShowcaseTooltip";
import styles from "./styles.module.css";
import { updateCopyCount } from "@site/src/api";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({ label, color, description }, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{ backgroundColor: color }} />
    </li>
  )
);

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
  const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag)
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}
          >
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function ShowcaseCard({ user, isDescription, copyCount, onCopy }) {
  const [paragraphText, setParagraphText] = useState(
    isDescription ? user.description : user.desc_cn
  );

  useEffect(() => {
    setParagraphText(isDescription ? user.description : user.desc_cn);
  }, [isDescription, user.description, user.desc_cn]);

  // 点击显示中文文本
  function handleParagraphClick() {
    if (paragraphText === user.description) {
      setParagraphText(user.desc_cn);
    } else {
      setParagraphText(user.description);
    }
  }
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;
  const userTitle = currentLanguage === "en" ? user.title_en : user.title;
  const userRemark = currentLanguage === "en" ? user.remark_en : user.remark;
  const userDescription =
    currentLanguage === "zh-Hans" ? paragraphText : user.desc_en;
  //const image = getCardImage(user);
  // 复制
  const [copied, setShowCopied] = useState(false);

  const handleCopyClick = useCallback(async () => {
    try {
      const updatedCount = await updateCopyCount(user.id);
      if (user.description) {
        copy(userDescription);
      }
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      // Notify parent component to update the copy count
      onCopy(user.id, updatedCount);
    } catch (error) {
      console.error("Error updating copy count:", error);
    }
  }, [user.id]);
  // 将显示数据单位简化到 k
  const formatCopyCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };
  
  return (
    <li key={userTitle} className="card shadow--md">
      {/* <div className={clsx('card__image', styles.showcaseCardImage)}>
        <Image img={image} alt={user.title} />
      </div> */}
      <div className={clsx("card__body", styles.cardBodyHeight)}>
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link href={user.website} className={styles.showcaseCardLink}>
              {userTitle}{" "}
            </Link>
            <span className={styles.showcaseCardBody}>
              {copyCount > 0 && `🔥${formatCopyCount(copyCount)}`}
            </span>
          </Heading>
          {user.tags.includes("favorite") && (
            <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
          )}
          {/* {user.source && (
            <Link
              href={user.source}
              className={clsx(
                'button button--secondary button--sm',
                styles.showcaseCardSrcBtn,
              )}>
              <Translate id="showcase.card.sourceLink">source</Translate>
            </Link>
          )} */}
          <button
            className={clsx(
              "button button--secondary button--sm",
              styles.showcaseCardSrcBtn
            )}
            type="button"
            onClick={handleCopyClick}
          >
            {copied ? (
              <Translate>已复制</Translate>
            ) : (
              <Translate>复制</Translate>
            )}
          </button>
        </div>
        <p className={styles.showcaseCardBody}>👉 {userRemark}</p>
        <p onClick={handleParagraphClick} className={styles.showcaseCardBody}>
          {userDescription}
        </p>
      </div>
      <ul className={clsx("card__footer", styles.cardFooter)}>
        <ShowcaseCardTag tags={user.tags} />
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
