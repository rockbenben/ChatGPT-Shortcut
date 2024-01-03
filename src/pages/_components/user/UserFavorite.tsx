import React, { useEffect, useContext, useState, useCallback } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import { Button, message, Spin } from "antd";
import { CopyOutlined, StarOutlined } from "@ant-design/icons";
import { getCards, getSelectComms, updateFavorite } from "@site/src/api";
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

    const Loves = userAuth.data.favorites ? userAuth.data.favorites.loves || [] : [];
    const commLoves = userAuth.data.favorites ? userAuth.data.favorites.commLoves || [] : [];

    const fetchCards = async () => {
      try {
        const response = await getCards(Loves, currentLanguage);
        const cardsData = response.data;
        setCards(cardsData);
        const response1 = await getSelectComms(commLoves);
        const commsData = response1.data;
        setComms(commsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
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
  if (!userAuth || !userAuth.data) {
    return <Spin />;
  }

  return (
    <div className={styles.showcaseFavorite}>
      <div className="container">
        {cards.length === 0 && comms.length === 0 ? (
          <p>You haven't favorited any prompts yet.</p>
        ) : (
          <ul className="clean-list showcaseList_Cwj2">
            {comms.map((comm, index) => (
              <li key={comm.id} className="card shadow--md">
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
                      <h4 className={styles.showcaseCardTitle}>
                        <span className={styles.showcaseCardLink} style={{ color: "var(--ifm-color-primary)" }}>
                          {comm.title}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#999",
                            marginLeft: "10px",
                          }}>
                          @{comm.owner}
                        </span>
                      </h4>
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
            ))}
            {cards.map((card, index) => (
              <li key={card.id} className="card shadow--md">
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
                      <h4 className={styles.showcaseCardTitle}>
                        <Link href={"/prompt/" + card.id} className={styles.showcaseCardLink}>
                          {card[currentLanguage].title}{" "}
                        </Link>
                        <span className={styles.showcaseCardBody}>{card.count > 0 && `🔥${formatCopyCount(card.count)}`}</span>
                      </h4>
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserFavorite;
