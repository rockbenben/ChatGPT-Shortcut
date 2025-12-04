import React, { useEffect, useContext, useState, useCallback } from "react";
import clsx from "clsx";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ShowcaseCardTag } from "@site/src/pages/_components/ShowcaseCard";
import { ShowcaseRemark } from "@site/src/pages/_components/ShowcaseCard/ShowcaseRemark";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import pageStyles from "@site/src/pages/styles.module.css";
import { Button, Spin, Tooltip, Space, App, Empty } from "antd";
import { CheckOutlined, CopyOutlined, DownOutlined, StarFilled, LinkOutlined, FireFilled } from "@ant-design/icons";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getPrompts, updateFavorite, updateFavoritesOrder, updateLocalStorageCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { MAX_LENGTH, truncate, getWeight, formatCount } from "@site/src/utils/formatters";
import isEqual from "lodash/isEqual";

// SortableItem component for both cards and comms
const SortableItem = ({ item, isCard, currentLanguage, isFiltered, removeBookmark }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const { copied, copyText, updateCopy } = useCopyToClipboard();
  const [showFullContent, setShowFullContent] = useState(false);
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
      updateCopy(item[currentLanguage].prompt, item.id);
    } else {
      copyText(item.description);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isFiltered ? "default" : "grab",
  };

  return (
    <li ref={setNodeRef} className={clsx("card", styles.showcaseCard)} style={style}>
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
                    {item[currentLanguage].title}
                  </Link>
                  <span style={{ gap: "2px", color: "gray", fontSize: "0.8rem", marginLeft: "4px" }}>
                    <FireFilled style={{ color: "#ff6b6b" }} />
                    {formatCount(weight)}
                  </span>
                </>
              ) : (
                <span className={styles.showcaseCardLink}>{item.title} </span>
              )}
            </div>
            <Space.Compact>
              <Tooltip title={<Translate id="theme.CodeBlock.copy">复制</Translate>}>
                <Button icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopyClick} />
              </Tooltip>
              <Tooltip title={<Translate>点击移除收藏</Translate>}>
                <Button icon={<StarFilled style={{ color: "#faad14" }} />} onClick={() => removeBookmark(item.id, !isCard)} />
              </Tooltip>
            </Space.Compact>
          </div>
          {isCard ? (
            <>
              <ShowcaseRemark remark={item[currentLanguage].remark} style={{ maxHeight: 68 }} {...attributes} {...(isFiltered ? {} : listeners)} />
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
                    <div className={styles.loadMoreBtn} onClick={toggleContentDisplay}>
                      <DownOutlined />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {item.remark && <ShowcaseRemark remark={item.remark} style={{ maxHeight: 68 }} {...attributes} {...(isFiltered ? {} : listeners)} />}
              <div className={styles.descriptionWrapper}>
                <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${item.notes ? styles.clickable : styles.nonClickable}`}>
                  {showFullContent ? paragraphText : truncate(paragraphText)}
                </p>
                {!showFullContent && paragraphText.length > MAX_LENGTH && (
                  <div className={styles.gradientOverlay}>
                    <div className={styles.loadMoreBtn} onClick={toggleContentDisplay}>
                      <DownOutlined />
                    </div>
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
              <a href={item.website} className="buttonLink" target="_blank" rel="noopener noreferrer">
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
  const { message: messageApi } = App.useApp();
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
      {!cards?.length && !comms?.length ? (
        <div className={pageStyles.showcaseList}>
          <div className={clsx("card", styles.showcaseCard)}>
            <div className={clsx("card__body")}>
              <Empty description={<Translate id="message.noFavorites">No favorites yet</Translate>} />
            </div>
          </div>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <ul className={clsx("clean-list", pageStyles.showcaseList)}>
            {comms?.length > 0 && (
              <SortableContext items={comms.map((comm) => comm.id)}>
                {comms.map((comm) => (
                  <SortableItem key={comm.id} item={comm} isCard={false} currentLanguage={currentLanguage} isFiltered={isFiltered} removeBookmark={removeBookmark} />
                ))}
              </SortableContext>
            )}
            {cards?.length > 0 && (
              <SortableContext items={cards.map((card) => card.id)}>
                {cards.map((card) => (
                  <SortableItem key={card.id} item={card} isCard={true} currentLanguage={currentLanguage} isFiltered={isFiltered} removeBookmark={removeBookmark} />
                ))}
              </SortableContext>
            )}
          </ul>
        </DndContext>
      )}
    </>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.isFiltered === nextProps.isFiltered && isEqual(prevProps.filteredCommus, nextProps.filteredCommus) && isEqual(prevProps.filteredCards, nextProps.filteredCards);
}

export default React.memo(UserFavorite, areEqual);
