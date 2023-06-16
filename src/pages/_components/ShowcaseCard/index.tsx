import React, { useContext,useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { message, Tooltip } from "antd";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
//import Image from '@theme/IdealImage';
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import { LinkOutlined } from "@ant-design/icons";
import {
  Tags,
  TagList,
  type TagType,
  type User,
  type Tag,
} from "@site/src/data/users";
import { sortBy } from "@site/src/utils/jsUtils";
import Heading from "@theme/Heading";
//import Tooltip from "../ShowcaseTooltip";
import styles from "./styles.module.css";
import {
  updateCopyCount,
  createFavorite,
  updateFavorite,
} from "@site/src/api";
import { AuthContext } from '../AuthContext';

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

function ShowcaseCard({ user, isDescription, copyCount, onCopy, onLove }) {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);

  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split('-')[0];
  const userTitle = user[currentLanguage].title;
  const userRemark = user[currentLanguage].remark;

  const [paragraphText, setParagraphText] = useState(
    isDescription ? user[currentLanguage].prompt : user[currentLanguage].description
  );

  useEffect(() => {
    setParagraphText(isDescription ? user[currentLanguage].prompt : user[currentLanguage].description);
  }, [isDescription, user[currentLanguage].prompt, user[currentLanguage].description]);

  // 点击显示母语
  function handleParagraphClick() {
    if (paragraphText === user[currentLanguage].prompt) {
      setParagraphText(user[currentLanguage].description);
    } else {
      setParagraphText(user[currentLanguage].prompt);
    }
  }
  const userDescription = currentLanguage === "en" ? user.en.prompt : paragraphText;

  //const image = getCardImage(user);
  // 复制
  const [copied, setShowCopied] = useState(false);
  // 将显示数据单位简化到 k
  const formatCopyCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  const handleCopyClick = useCallback(async () => {
    try {
      if (user[currentLanguage].prompt) {
        copy(userDescription);
      }
      const updatedCount = await updateCopyCount(user.id);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      // Notify parent component to update the copy count
      onCopy(user.id, updatedCount);
    } catch (error) {
      console.error("Error updating copy count:", error);
    }
  }, [user.id]);

  const handleLove = useCallback(async () => {
    try {
      let userLoves;
      let favoriteId;

      if (!userAuth.data.favorites) {
        const createFavoriteResponse = await createFavorite([user.id]);
        userLoves = [user.id];
        favoriteId = createFavoriteResponse.data.id;
      } else {
        userLoves = userAuth.data.favorites.loves || [];
        favoriteId = userAuth.data.favorites.id;

        if (!userLoves.includes(user.id)) {
          userLoves.push(user.id);
          message.success("Added to favorites successfully!");
        }
      }

      await updateFavorite(favoriteId, userLoves);
      onLove(userLoves);
      refreshUserAuth();
    } catch (err) {
      console.error(err);
    }
  }, [user.id, onLove, userAuth, refreshUserAuth]);

  const removeFavorite = useCallback(async () => {
    try {
      let userLoves;
      let favoriteId;

      if (userAuth.data.favorites) {
        userLoves = userAuth.data.favorites.loves || [];
        favoriteId = userAuth.data.favorites.id;

        const index = userLoves.indexOf(user.id);
        if (index > -1) {
          userLoves.splice(index, 1);
          message.success("Removed from favorites successfully!");
        }

        await updateFavorite(favoriteId, userLoves);
        onLove(userLoves);
        refreshUserAuth();
      }
    } catch (err) {
      console.error(err);
    }
  }, [user.id, onLove, userAuth, refreshUserAuth]);

  return (
    <li key={userTitle} className="card shadow--md">
      {/* <div className={clsx('card__image', styles.showcaseCardImage)}>
        <Image img={image} alt={user.title} />
      </div> */}
      <div className={clsx("card__body")}>
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link href={"/prompt/"+ user.id} className={styles.showcaseCardLink}>
              {userTitle}{" "}
            </Link>
            <span className={styles.showcaseCardBody}>
              {copyCount > 0 && `🔥${formatCopyCount(copyCount)}`}
            </span>
          </Heading>
          {user.tags.includes("favorite") && (
            <Tooltip
              title={userAuth ? <Translate>点击移除收藏</Translate> : ""}
            >
              <div onClick={userAuth ? removeFavorite : null}>
                <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
              </div>
            </Tooltip>
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
          {userAuth && !user.tags.includes("favorite") && (
            <button
              className={clsx(
                "button button--secondary button--sm",
                styles.showcaseCardSrcBtn
              )}
              type="button"
              onClick={handleLove}
            >
              <Translate>收藏</Translate>
            </button>
          )}
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
        <p onClick={handleParagraphClick} className={styles.showcaseCardBody} style={{ cursor: "pointer" }}>
          {userDescription}
        </p>
      </div>
      <ul className={clsx("card__footer", styles.cardFooter)}>
        <ShowcaseCardTag tags={user.tags} />
        {user.website ? <a href={user.website} style={{ marginLeft: 'auto' }}><LinkOutlined /></a> : null}
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
