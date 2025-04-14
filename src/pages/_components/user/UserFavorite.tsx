import React, { useEffect, useContext, useState, useCallback } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ShowcaseCardTag } from "@site/src/pages/_components/ShowcaseCard";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import { Button, message, Spin, Tooltip, Space } from "antd";
import { CopyOutlined, DownOutlined, HeartTwoTone, LinkOutlined } from "@ant-design/icons";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateCopyCount, getPrompts, updateFavorite, updateFavoritesOrder, updateLocalStorageCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { MAX_LENGTH, truncate, getWeight, formatCount } from "@site/src/utils/formatters";
import isEqual from "lodash/isEqual";

// SortableItem component for both cards and comms
const SortableItem = ({ item, isCard, currentLanguage, isFiltered, removeBookmark }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const [showFullContent, setShowFullContent] = useState(false);
  const [copied, setShowCopied] = useState(false);
  const [paragraphText, setParagraphText] = useState(isCard ? item[currentLanguage].prompt : item.description);
  const canToggle = isCard && currentLanguage !== "en" && item[currentLanguage].description !== item[currentLanguage].prompt;
  const weight = getWeight(item);

  const toggleContentDisplay = () => {
    setShowFullContent(!showFullContent);
  };

  const handleParagraphClick = () => {
    if (isCard) {
      if (!canToggle) return;
      setParagraphText((prevText) => (prevText === item[currentLanguage].prompt ? item[currentLanguage].description : item[currentLanguage].prompt));
    } else if (item.notes) {
      setParagraphText((prevText) => (prevText === item.description ? item.notes : item.description));
    }
  };

  const handleCopyClick = () => {
    if (isCard) {
      copy(item[currentLanguage].prompt);
      updateCopyCount(item.id);
    } else {
      copy(item.description);
    }
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isFiltered ? "default" : "grab",
  };

  return (
    <li ref={setNodeRef} className="card shadow--md" style={style}>
      <div
        className={clsx("card__body")}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
        <div>
          <div className={clsx(styles.showcaseCardHeader)}>
            <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`} {...attributes} {...(isFiltered ? {} : listeners)}>
              {isCard ? (
                <>
                  <Link href={"/prompt/" + item.id} className={styles.showcaseCardLink}>
                    {item[currentLanguage].title}{" "}
                  </Link>
                  <span className={styles.showcaseCardBody}>{weight > 0 && `🔥${formatCount(weight)}`}</span>
                </>
              ) : (
                <span className={styles.showcaseCardLink} style={{ color: "var(--ifm-color-primary)" }}>
                  {item.title}{" "}
                </span>
              )}
            </div>
            <Space.Compact>
              <Tooltip title={<Translate>点击移除收藏</Translate>}>
                <Button type="default" onClick={() => removeBookmark(item.id, !isCard)}>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                </Button>
              </Tooltip>
              <Tooltip title={translate({ id: "theme.CodeBlock.copy", message: "复制" })}>
                <Button type="default" onClick={handleCopyClick}>
                  <CopyOutlined />
                  {copied && <Translate id="theme.CodeBlock.copied">已复制</Translate>}
                </Button>
              </Tooltip>
            </Space.Compact>
          </div>
          {isCard ? (
            <>
              <p className={styles.showcaseCardBody} style={{ maxHeight: 68 }} {...attributes} {...(isFiltered ? {} : listeners)}>
                👉 {item[currentLanguage].remark}
              </p>
              <div className={styles.descriptionWrapper}>
                <p
                  onClick={canToggle ? handleParagraphClick : undefined}
                  className={clsx(styles.showcaseCardBody, {
                    [styles.clickable]: canToggle,
                  })}>
                  {showFullContent ? paragraphText : truncate(paragraphText)}
                </p>
                {!showFullContent && paragraphText.length > MAX_LENGTH && (
                  <div className={styles.gradientOverlay}>
                    <Tooltip title={<Translate>加载更多</Translate>}>
                      <DownOutlined onClick={toggleContentDisplay} className={styles.downIcon} />
                    </Tooltip>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {item.remark && (
                <p className={styles.showcaseCardBody} style={{ maxHeight: 68 }} {...attributes} {...(isFiltered ? {} : listeners)}>
                  👉 {item.remark}
                </p>
              )}
              <div className={styles.descriptionWrapper}>
                <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${item.notes ? styles.clickable : styles.nonClickable}`}>
                  {showFullContent ? paragraphText : truncate(paragraphText)}
                </p>
                {!showFullContent && paragraphText.length > MAX_LENGTH && (
                  <div className={styles.gradientOverlay}>
                    <Tooltip title={<Translate>加载更多</Translate>}>
                      <DownOutlined onClick={toggleContentDisplay} className={styles.downIcon} />
                    </Tooltip>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {!isCard && (
          <div style={{ display: "flex", justifyContent: "space-between" }} {...attributes} {...(isFiltered ? {} : listeners)}>
            <span style={{ fontSize: "12px", color: "#999", marginLeft: "6px" }}>@{item.owner}</span>
          </div>
        )}
      </div>
      {isCard && (
        <ul className={clsx("card__footer", styles.cardFooter)} style={{ listStyle: "none" }}>
          <ShowcaseCardTag tags={item.tags} />
          {item.website && (
            <li style={{ marginLeft: "auto" }}>
              <a href={item.website} target="_blank" rel="noopener noreferrer">
                <LinkOutlined />
              </a>
            </li>
          )}
        </ul>
      )}
    </li>
  );
};

function UserFavorite({ filteredCommus = [], filteredCards = [], isFiltered = false }) {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const [cards, setCards] = useState([]);
  const [comms, setComms] = useState([]);
  const [hasDragged, setHasDragged] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Configure dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!userAuth?.data) return;
    const loves = userAuth.data?.favorites?.loves || [];
    const commLoves = userAuth.data?.favorites?.commLoves || [];
    const fetchPrompts = async () => {
      try {
        if (isFiltered) {
          setComms(filteredCommus);
          setCards(filteredCards);
        } else {
          const cardsData = await getPrompts("cards", loves, currentLanguage);
          setCards(cardsData);
          const commsData = await getPrompts("commus", commLoves);
          setComms(commsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrompts();
  }, [userAuth, currentLanguage, isFiltered, filteredCommus, filteredCards]);

  const removeBookmark = useCallback(
    async (id, isComm = false) => {
      try {
        let userLoves = isComm ? userAuth.data.favorites.commLoves || [] : userAuth.data.favorites.loves || [];
        const favoriteId = userAuth.data.favorites.id;

        const index = userLoves.indexOf(id);
        if (index > -1) {
          userLoves.splice(index, 1);
          messageApi.open({
            type: "success",
            content: "Removed from favorites successfully!",
          });
        }
        if (isComm) {
          localStorage.removeItem(`commus_${id}`);
        }
        await updateFavorite(favoriteId, userLoves, isComm);
        refreshUserAuth();
      } catch (err) {
        console.error(err);
      }
    },
    [userAuth, refreshUserAuth]
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setHasDragged(true);

      // Determine if we're working with comms or cards
      const isCommItem = comms.some((comm) => comm.id === active.id);

      if (isCommItem) {
        setComms((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      } else {
        setCards((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }

    setActiveId(null);
  };

  useEffect(() => {
    if (hasDragged) {
      const comm_ids = comms.map((comm) => comm.id);
      const card_ids = cards.map((card) => card.id);

      updateFavoritesOrder("commLoves", comm_ids);
      updateFavoritesOrder("loves", card_ids);

      updateLocalStorageCache("favorites.commLoves", comm_ids);
      updateLocalStorageCache("favorites.loves", card_ids);

      setHasDragged(false);
    }
  }, [comms, cards]);

  if (!userAuth?.data) {
    return <Spin />;
  }

  return (
    <>
      {contextHolder}
      {!cards?.length && !comms?.length ? (
        <ul className="clean-list showcaseList_Cwj2">
          <li className="card shadow--md">
            <div className={clsx("card__body")}>
              <p>You haven't favorited any prompts yet.</p>
            </div>
          </li>
        </ul>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {comms?.length > 0 && (
            <SortableContext items={comms.map((comm) => comm.id)}>
              <ul className="clean-list showcaseList_Cwj2">
                {comms.map((comm) => (
                  <SortableItem key={comm.id} item={comm} isCard={false} currentLanguage={currentLanguage} isFiltered={isFiltered} removeBookmark={removeBookmark} />
                ))}
              </ul>
            </SortableContext>
          )}
          {cards?.length > 0 && (
            <SortableContext items={cards.map((card) => card.id)}>
              <ul className="clean-list showcaseList_Cwj2">
                {cards.map((card) => (
                  <SortableItem key={card.id} item={card} isCard={true} currentLanguage={currentLanguage} isFiltered={isFiltered} removeBookmark={removeBookmark} />
                ))}
              </ul>
            </SortableContext>
          )}
        </DndContext>
      )}
    </>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.isFiltered === nextProps.isFiltered && isEqual(prevProps.filteredCommus, nextProps.filteredCommus) && isEqual(prevProps.filteredCards, nextProps.filteredCards);
}

export default React.memo(UserFavorite, areEqual);
