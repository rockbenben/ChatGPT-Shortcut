import React, { useEffect, useContext, useState, useCallback } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import { Button, message, Spin, Tooltip } from "antd";
import { CopyOutlined, StarOutlined, DownOutlined } from "@ant-design/icons";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getPrompts, updateFavorite, updateFavoritesOrder, updateLocalStorageCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { MAX_LENGTH, truncate, formatCopyCount } from "@site/src/utils/formatters";

// SortableItem component for both cards and comms
const SortableItem = ({ item, index, isCard, currentLanguage, copiedIndex, isFiltered, handleCopyClick, removeBookmark }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const [showFullContent, setShowFullContent] = useState(false);
  const [paragraphText, setParagraphText] = useState(isCard ? item[currentLanguage].prompt : item.description);
  const canToggle = isCard && currentLanguage !== "en" && item[currentLanguage].description !== item[currentLanguage].prompt;

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
          <div className={clsx(styles.showcaseCardHeader)} {...attributes} {...(isFiltered ? {} : listeners)}>
            <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`}>
              {isCard ? (
                <>
                  <Link href={"/prompt/" + item.id} className={styles.showcaseCardLink}>
                    {item[currentLanguage].title}{" "}
                  </Link>
                  <span className={styles.showcaseCardBody}>{item.count > 0 && `🔥${formatCopyCount(item.count)}`}</span>
                </>
              ) : (
                <>
                  <Link className={styles.showcaseCardLink}>{item.title} </Link>
                  <span style={{ fontSize: "12px", color: "#999", marginLeft: "10px" }}>@{item.owner}</span>
                </>
              )}
            </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button icon={<CopyOutlined />} type="default" style={{ fontSize: "12px" }} onClick={() => handleCopyClick(index, item, !isCard)}>
            {copiedIndex === index ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
          </Button>
          <Button icon={<StarOutlined />} type="default" style={{ fontSize: "12px" }} onClick={() => removeBookmark(item.id, !isCard)}>
            <Translate>移除收藏</Translate>
          </Button>
        </div>
      </div>
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
  const [copiedCardIndex, setCopiedCardIndex] = useState(null);
  const [copiedCommIndex, setCopiedCommIndex] = useState(null);
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

  const handleCopyClick = useCallback(
    (index, item, isComm = false) => {
      const text = isComm ? item.description : item[currentLanguage].prompt;
      copy(text);
      const setCopiedIndex = isComm ? setCopiedCommIndex : setCopiedCardIndex;
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    },
    [currentLanguage]
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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={styles.showcaseFavorite}>
          <div className="container">
            {!cards?.length && !comms?.length ? (
              <p>You haven't favorited any prompts yet.</p>
            ) : (
              <>
                {comms?.length > 0 && (
                  <SortableContext items={comms.map((comm) => comm.id)}>
                    <ul className="clean-list showcaseList_Cwj2">
                      {comms.map((comm, index) => (
                        <SortableItem
                          key={comm.id}
                          item={comm}
                          index={index}
                          isCard={false}
                          currentLanguage={currentLanguage}
                          copiedIndex={copiedCommIndex}
                          isFiltered={isFiltered}
                          handleCopyClick={handleCopyClick}
                          removeBookmark={removeBookmark}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                )}
                {cards?.length > 0 && (
                  <SortableContext items={cards.map((card) => card.id)}>
                    <ul className="clean-list showcaseList_Cwj2">
                      {cards.map((card, index) => (
                        <SortableItem
                          key={card.id}
                          item={card}
                          index={index}
                          isCard={true}
                          currentLanguage={currentLanguage}
                          copiedIndex={copiedCardIndex}
                          isFiltered={isFiltered}
                          handleCopyClick={handleCopyClick}
                          removeBookmark={removeBookmark}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                )}
              </>
            )}
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default UserFavorite;
