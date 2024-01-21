import React, { useEffect, useContext, useState, useCallback } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import { Button, message, Spin } from "antd";
import { CopyOutlined, StarOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getPrompts, updateFavorite, updateFavoritesOrder, updateLocalStorageCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";

function UserFavorite() {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [comms, setComms] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  const [copiedCardIndex, setCopiedCardIndex] = useState(null);
  const [copiedCommIndex, setCopiedCommIndex] = useState(null);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  useEffect(() => {
    if (!userAuth || !userAuth.data) {
      return;
    }

    const loves = userAuth.data.favorites ? userAuth.data.favorites.loves || [] : [];
    const commLoves = userAuth.data.favorites ? userAuth.data.favorites.commLoves || [] : [];

    const fetchPrompts = async () => {
      try {
        const cardsData = await getPrompts("cards", loves, currentLanguage);
        setCards(cardsData);
        const commsData = await getPrompts("commus", commLoves);
        setComms(commsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrompts();
  }, [userAuth, currentLanguage]);

  const removeBookmark = useCallback(
    async (id, isComm = false) => {
      try {
        let userLoves;
        let favoriteId;
        userLoves = isComm ? userAuth.data.favorites.commLoves || [] : userAuth.data.favorites.loves || [];
        favoriteId = userAuth.data.favorites.id;

        const index = userLoves.indexOf(id);
        if (index > -1) {
          userLoves.splice(index, 1);
          message.success("Removed from favorites successfully!");
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
  const handleTextClick = (index) => {
    setClickedIndex(index);
    setShowDescription((prev) => !prev); // toggle the state
  };

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

  const formatCopyCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  const [hasDragged, setHasDragged] = useState(false);
  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      // 如果拖放到列表外或同一位置，则不执行操作
      if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
        return;
      }
      setHasDragged(true);
      const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };

      if (source.droppableId === "droppableComms") {
        if (source.droppableId === destination.droppableId) {
          const newComms = reorder(comms, source.index, destination.index);
          setComms(newComms);
        } else {
          // 从 Comms 拖到 Cards
          const newComms = Array.from(comms);
          const [removed] = newComms.splice(source.index, 1);
          setComms([...newComms, removed]); // 将移动的项添加到 comms 的末尾
        }
      } else if (source.droppableId === "droppableCards") {
        if (source.droppableId === destination.droppableId) {
          const newCards = reorder(cards, source.index, destination.index);
          setCards(newCards);
        } else {
          // 从 Cards 拖到 Comms
          const newCards = Array.from(cards);
          const [removed] = newCards.splice(source.index, 1);
          setCards([removed, ...newCards]); // 将移动的项添加到 cards 的开头
        }
      }
    },
    [comms, cards]
  );

  useEffect(() => {
    if (hasDragged) {
      const comm_ids = comms.map((comm) => comm.id);
      updateFavoritesOrder("commLoves", comm_ids);
      updateLocalStorageCache("favorites.commLoves", comm_ids);
      setHasDragged(false);
    }
  }, [comms]);

  useEffect(() => {
    if (hasDragged) {
      const card_ids = cards.map((card) => card.id);
      updateFavoritesOrder("loves", card_ids);
      updateLocalStorageCache("favorites.loves", card_ids);
      setHasDragged(false);
    }
  }, [cards]);

  if (!userAuth || !userAuth.data) {
    return <Spin />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.showcaseFavorite}>
        <div className="container">
          {(!cards || cards.length === 0) && (!comms || comms.length === 0) ? (
            <p>You haven't favorited any prompts yet.</p>
          ) : (
            <>
              <Droppable droppableId="droppableComms">
                {(provided) => (
                  <ul className="clean-list showcaseList_Cwj2" {...provided.droppableProps} ref={provided.innerRef}>
                    {comms.map((comm, index) => (
                      <Draggable key={comm.id} draggableId={comm.id.toString()} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="card shadow--md">
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
                                  <Heading as="h4" className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`}>
                                    <Link className={styles.showcaseCardLink}>{comm.title} </Link>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#999",
                                        marginLeft: "10px",
                                      }}>
                                      @{comm.owner}
                                    </span>
                                  </Heading>
                                </div>
                                <p className={styles.showcaseCardBody}>
                                  {comm.remark && (
                                    <>
                                      👉 {comm.remark}
                                      <br />
                                    </>
                                  )}
                                  {comm.description}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button icon={<CopyOutlined />} type="default" onClick={() => handleCopyClick(index, comm, true)}>
                                  {copiedCommIndex === index ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
                                </Button>
                                <Button
                                  icon={<StarOutlined />}
                                  type="default"
                                  onClick={() => {
                                    removeBookmark(comm.id, true); // isComm set to true
                                  }}>
                                  <Translate>移除收藏</Translate>
                                </Button>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <Droppable droppableId="droppableCards">
                {(provided) => (
                  <ul className="clean-list showcaseList_Cwj2" {...provided.droppableProps} ref={provided.innerRef}>
                    {cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="card shadow--md">
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
                                  <Heading as="h4" className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`}>
                                    <Link href={"/prompt/" + card.id} className={styles.showcaseCardLink}>
                                      {card[currentLanguage].title}{" "}
                                    </Link>
                                    <span className={styles.showcaseCardBody}>{card.count > 0 && `🔥${formatCopyCount(card.count)}`}</span>
                                  </Heading>
                                </div>
                                <p className={styles.showcaseCardBody}>👉 {card[currentLanguage].remark}</p>
                                <p className={styles.showcaseCardBody} onClick={() => handleTextClick(index)} style={{ cursor: "pointer" }}>
                                  {clickedIndex === index && showDescription ? card[currentLanguage].description : card[currentLanguage].prompt}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button icon={<CopyOutlined />} type="default" onClick={() => handleCopyClick(index, card)}>
                                  {copiedCardIndex === index ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
                                </Button>
                                <Button
                                  icon={<StarOutlined />}
                                  type="default"
                                  onClick={() => {
                                    removeBookmark(card.id); // isComm defaults to false
                                  }}>
                                  <Translate>移除收藏</Translate>
                                </Button>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </>
          )}
        </div>
      </div>
    </DragDropContext>
  );
}

export default UserFavorite;
