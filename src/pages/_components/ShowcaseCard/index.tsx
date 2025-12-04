import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";
import { message, Tooltip, Button, Space, App } from "antd";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { CheckOutlined, CopyOutlined, StarOutlined, StarFilled, DownOutlined, LinkOutlined, FireFilled } from "@ant-design/icons";
import { Tags, TagList, type TagType, type Tag } from "@site/src/data/tags";
import { sortBy } from "@site/src/utils/jsUtils";
import styles from "./styles.module.css";
import { AuthContext } from "../AuthContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MAX_LENGTH, truncate, formatCount } from "@site/src/utils/formatters";

import { ShowcaseRemark } from "./ShowcaseRemark";

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
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
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

  const handleLove = useCallback(() => {
    addFavorite(user.id, false);
  }, [addFavorite, user.id]);

  const handleRemoveFavorite = useCallback(() => {
    confirmRemoveFavorite(user.id, false);
  }, [confirmRemoveFavorite, user.id]);

  return (
    <li key={userInfo.title} className={clsx("card", styles.showcaseCard)}>
      <div className={clsx("card__body")}>
        <div className={clsx(styles.showcaseCardHeader)}>
          <div className={styles.showcaseCardTitle}>
            <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink}>
              {userInfo.title}
            </Link>
            <span style={{ gap: "2px", color: "gray", fontSize: "0.8rem", marginLeft: "4px" }}>
              <FireFilled style={{ color: "#ff6b6b" }} />
              {formatCount(copyCount)}
            </span>
          </div>
          <Space.Compact>
            <Tooltip title={<Translate id="action.copy">复制</Translate>}>
              <Button icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} />
            </Tooltip>
            {userAuth && (
              <Tooltip title={isFavorite ? <Translate id="action.removeFavorite">点击移除收藏</Translate> : <Translate id="showcase.tag.favorite.description">收藏</Translate>}>
                <Button icon={isFavorite ? <StarFilled style={{ color: "#faad14" }} /> : <StarOutlined />} onClick={isFavorite ? handleRemoveFavorite : handleLove} />
              </Tooltip>
            )}
            {!userAuth && user.tags?.includes("favorite") && <Button type="text" disabled icon={<StarFilled style={{ color: "#faad14" }} />} />}
          </Space.Compact>
        </div>
        <ShowcaseRemark remark={userInfo.remark} />
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
              <div className={styles.loadMoreBtn} onClick={toggleContentDisplay}>
                <DownOutlined />
              </div>
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
