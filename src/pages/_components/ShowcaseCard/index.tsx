import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";
import { message, Tooltip, Button, Space } from "antd";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, HeartOutlined, HeartTwoTone, DownOutlined, LinkOutlined } from "@ant-design/icons";
import { Tags, TagList, type TagType, type Tag } from "@site/src/data/tags";
import { sortBy } from "@site/src/utils/jsUtils";
import styles from "./styles.module.css";
import { createFavorite, updateFavorite, getPrompts } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MAX_LENGTH, truncate, formatCount } from "@site/src/utils/formatters";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(({ label, color, description }, ref) => (
  <li ref={ref} className={styles.tag} title={description}>
    <span className={styles.textLabel}>{label.toLowerCase()}</span>
    <span className={styles.colorLabel} style={{ backgroundColor: color }} />
  </li>
));

export const ShowcaseCardTag = ({ tags }: { tags: TagType[] }) => {
  const safeTags = tags || [];
  const tagObjects = safeTags.map((tag) => ({ tag, ...Tags[tag] }));
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) => TagList.indexOf(tagObject.tag));

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => (
        <Tooltip key={index} title={tagObject.description} id={`showcase_card_tag_${tagObject.tag}`}>
          <TagComp key={index} {...tagObject} />
        </Tooltip>
      ))}
    </>
  );
};

const ShowcaseCard = ({ user, isDescription, copyCount }) => {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  const userInfo = useMemo(
    () => ({
      title: user[currentLanguage].title,
      remark: user[currentLanguage].remark,
      prompt: user[currentLanguage].prompt,
      description: user[currentLanguage].description,
    }),
    [user, currentLanguage]
  );

  const canToggle = currentLanguage !== "en" && userInfo.description !== userInfo.prompt;

  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const { copied, updateCopy } = useCopyToClipboard();

  const [paragraphText, setParagraphText] = useState(() => (canToggle ? (isDescription ? userInfo.prompt : userInfo.description) : userInfo.prompt));

  useEffect(() => {
    setIsFavorite(userAuth?.data?.favorites?.loves?.includes(user.id) || false);
  }, [userAuth]);

  useEffect(() => {
    setParagraphText(isDescription ? userInfo.prompt : userInfo.description);
    setShowFullContent(false);
  }, [isDescription, userInfo.prompt, userInfo.description]);

  const handleParagraphClick = useCallback(() => {
    if (!canToggle) return;
    setParagraphText((prevText) => (prevText === userInfo.prompt ? userInfo.description : userInfo.prompt));
  }, [canToggle, userInfo.prompt, userInfo.description]);

  const userDescription = canToggle ? paragraphText : userInfo.prompt;

  // 缓存复制处理函数
  const handleCopy = useCallback(() => {
    updateCopy(userInfo.prompt, user.id);
  }, [updateCopy, userInfo.prompt, user.id]);

  const toggleContentDisplay = useCallback(() => {
    setShowFullContent((prev) => !prev);
  }, []);

  const handleLove = useCallback(async () => {
    try {
      let userLoves;
      let favoriteId;

      if (!userAuth?.data?.favorites) {
        const createFavoriteResponse = await createFavorite([user.id]);
        userLoves = [user.id];
        favoriteId = createFavoriteResponse.data.id;
      } else {
        userLoves = userAuth.data.favorites.loves || [];
        favoriteId = userAuth.data.favorites.id;
        userLoves.push(user.id);
      }
      message.success("Added to favorites successfully!");
      await updateFavorite(favoriteId, userLoves);
      getPrompts("cards", userLoves, currentLanguage);
      refreshUserAuth();
    } catch (err) {
      console.error(err);
    }
  }, [userAuth?.data?.favorites, user.id, currentLanguage, refreshUserAuth]);

  const removeFavorite = useCallback(async () => {
    try {
      const userLoves = userAuth.data.favorites.loves || [];
      const favoriteId = userAuth.data.favorites.id;
      const index = userLoves.indexOf(user.id);

      if (index > -1) {
        userLoves.splice(index, 1);
        message.success("Removed from favorites successfully!");
      }

      await updateFavorite(favoriteId, userLoves);
      refreshUserAuth();
    } catch (err) {
      console.error(err);
    }
  }, [userAuth, user.id, refreshUserAuth]);

  return (
    <li key={userInfo.title} className="card shadow--md">
      <div className={clsx("card__body")}>
        <div className={clsx(styles.showcaseCardHeader)}>
          <div className={styles.showcaseCardTitle}>
            <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink}>
              {userInfo.title}{" "}
            </Link>
            <span className={styles.showcaseCardBody}>{copyCount > 0 && `🔥${formatCount(copyCount)}`}</span>
          </div>
          <Space.Compact>
            {userAuth && (
              <Tooltip title={isFavorite ? <Translate>点击移除收藏</Translate> : translate({ message: "收藏" })}>
                <Button onClick={isFavorite ? removeFavorite : handleLove}>{isFavorite ? <HeartTwoTone twoToneColor="#eb2f96" /> : <HeartOutlined />}</Button>
              </Tooltip>
            )}
            {!userAuth && user.tags?.includes("favorite") && (
              <Button type="text" disabled>
                <HeartTwoTone twoToneColor="#eb2f96" />
              </Button>
            )}
            <Tooltip title={translate({ id: "theme.CodeBlock.copy", message: "复制" })}>
              <Button onClick={handleCopy}>
                {copied ? (
                  <>
                    <CheckOutlined /> <Translate id="theme.CodeBlock.copied">已复制</Translate>
                  </>
                ) : (
                  <CopyOutlined />
                )}
              </Button>
            </Tooltip>
          </Space.Compact>
        </div>
        <p className={styles.showcaseCardBody} style={{ maxHeight: 68 }}>
          👉 {userInfo.remark}
        </p>
        <div className={styles.descriptionWrapper}>
          <p
            onClick={canToggle ? handleParagraphClick : undefined}
            className={clsx(styles.showcaseCardBody, {
              [styles.clickable]: canToggle,
            })}>
            {showFullContent ? userDescription : truncate(userDescription)}
          </p>
          {!showFullContent && userDescription.length > MAX_LENGTH && (
            <div className={styles.gradientOverlay}>
              <Tooltip title={<Translate>加载更多</Translate>}>
                <DownOutlined onClick={toggleContentDisplay} className={styles.downIcon} />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <ul className={clsx("card__footer", styles.cardFooter)} style={{ listStyle: "none" }}>
        <ShowcaseCardTag tags={user.tags} />
        {user.website && (
          <li style={{ marginLeft: "auto" }}>
            <a href={user.website} className="buttonLink" target="_blank" rel="noopener noreferrer">
              <LinkOutlined />
            </a>
          </li>
        )}
      </ul>
    </li>
  );
};

export default React.memo(ShowcaseCard);
