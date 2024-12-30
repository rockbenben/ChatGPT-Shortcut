import React, { useContext, useState, useMemo, useEffect, useCallback } from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import copy from "copy-text-to-clipboard";
import { ConfigProvider, theme, Button } from "antd";
import { EditOutlined, HeartOutlined, ArrowDownOutlined, CopyOutlined } from "@ant-design/icons";

import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import ShowcaseTagSelect from "@site/src/pages/_components/ShowcaseTagSelect";
import ShowcaseFilterToggle from "@site/src/pages/_components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/pages/_components/ShowcaseTooltip";
import ShowcaseCard from "@site/src/pages/_components/ShowcaseCard";
import UserStatus from "@site/src/pages/_components/user/UserStatus";
import UserPrompts from "@site/src/pages/_components/user/UserPrompts";
import UserFavorite from "@site/src/pages/_components/user/UserFavorite";
import SearchBar, { NoResults, useFilteredPrompts, type UserState } from "@site/src/pages/_components/SearchBar";
import ShareButtons from "@site/src/pages/_components/ShareButtons";

import styles from "@site/src/pages/styles.module.css";
import cardStyles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";

import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";
import { getPrompts } from "@site/src/api";

import { Tags, TagList } from "@site/src/data/tags";
import { SLOGAN, TITLE, DESCRIPTION } from "@site/src/data/constants";

import AdComponent from "@site/src/pages/_components/AdComponent";

import favorDefault from "@site/src/data/default/favor_pt.json";
import otherDefault from "@site/src/data/default/other_pt.json";

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

function ShowcaseHeader() {
  return (
    <section className={"text--center"}>
      <div className={styles.hideOnMobile}>
        <Heading as="h1">AI Short</Heading>
        <p>{SLOGAN}</p>
      </div>
      <UserStatus hideLinks={{ userCenter: true, myFavorite: false }} />
    </section>
  );
}

function ShowcaseFilters({ onToggleDescription, showUserFavs, setShowUserFavs }) {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const [showUserPrompts, setShowUserPrompts] = useState(false);

  const handleUserPrompts = useCallback(() => {
    setShowUserFavs(false);
    setShowUserPrompts((prev) => !prev);
  }, [setShowUserFavs]);

  const handleUserFavs = useCallback(() => {
    setShowUserPrompts(false);
    setShowUserFavs((prev) => !prev);
  }, [setShowUserFavs]);

  let modifiedTagList = TagList.filter((tag) => tag !== "contribute");
  if (userAuth) {
    modifiedTagList = modifiedTagList.filter((tag) => tag !== "favorite");
  }

  const togglePromptLanguage = <Translate id="toggle_prompt_language">切换 Prompt 语言</Translate>;

  return (
    <section className="container" style={{ backgroundColor: "var(--site-color-tags-background)" }}>
      <div className={styles.filterCheckbox}>
        <div>
          <Heading as="h2">
            <Translate id="showcase.filters.title">Filters</Translate>
          </Heading>
        </div>
        {currentLanguage !== "en" && (
          <button
            onClick={onToggleDescription}
            className={styles.onToggleButton}
            title={translate({
              id: "toggle_prompt_language_description",
              message: "更改提示词的显示语言，可以在英语和当前页面语言之间进行切换。",
            })}>
            {togglePromptLanguage}
          </button>
        )}
        <div className={styles.hideOnMobile}>
          <ShowcaseFilterToggle />
        </div>
      </div>
      <ul className={clsx("clean-list", styles.checkboxList)}>
        {userAuth && (
          <>
            <li className={`${styles.checkboxListItem} ${showUserPrompts ? styles.activeItem : ""}`} onClick={handleUserPrompts}>
              <ShowcaseTooltip
                text={translate({
                  id: "myprompt.tooltip",
                  message: "添加或制作过的个人提示词，可用于存放AiShort之外的提示词。",
                })}
                anchorEl="#__docusaurus">
                <ShowcaseTagSelect
                  tag="myprompt"
                  label={translate({
                    id: "myprompt",
                    message: "我的提示词",
                  })}
                  icon={<EditOutlined style={{ marginLeft: "5px" }} />}
                />
              </ShowcaseTooltip>
            </li>
            <li className={`${styles.checkboxListItem} ${showUserFavs ? styles.activeItem : ""}`} onClick={handleUserFavs}>
              <ShowcaseTooltip
                text={translate({
                  id: "myfavorite.tooltip",
                  message: "我收藏的提示词，包括社区提示词。",
                })}
                anchorEl="#__docusaurus">
                <ShowcaseTagSelect
                  tag="myfavorite"
                  label={translate({
                    id: "link.myfavorite",
                    message: "我的收藏",
                  })}
                  icon={<HeartOutlined style={{ marginLeft: "5px" }} />}
                />
              </ShowcaseTooltip>
            </li>
          </>
        )}
        {modifiedTagList.map((tag, i) => {
          const { label, description, color } = Tags[tag];
          const id = `showcase_checkbox_id_${tag}`;

          const handleTagClick = () => {
            if (!userAuth) {
              return;
            }
            setShowUserPrompts(false);
            setShowUserFavs(false);
          };

          return (
            <li key={i} className={styles.checkboxListItem} onClick={handleTagClick}>
              <ShowcaseTooltip id={id} text={description} anchorEl="#__docusaurus">
                <ShowcaseTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    tag === "favorite" ? (
                      <FavoriteIcon svgClass={styles.svgIconFavoriteXs} />
                    ) : (
                      <span
                        style={{
                          backgroundColor: color,
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          marginLeft: 8,
                        }}
                      />
                    )
                  }
                />
              </ShowcaseTooltip>
            </li>
          );
        })}
        <li key="community.tag.tooltip" className={styles.checkboxListItem}>
          <ShowcaseTooltip
            id="community.tag.tooltip"
            text={translate({
              id: "community.tag.tooltip",
              message: "社区分享的精选提示词",
            })}
            anchorEl="#__docusaurus">
            <Link to="/community-prompts" style={{ color: "var(--site-primary-font)" }}>
              <ShowcaseTagSelect
                id="community.tag.tooltip"
                tag="communityprompt"
                label={translate({
                  id: "community.tag",
                  message: "社区精选",
                })}
                icon={
                  <span
                    style={{
                      backgroundColor: "#a2222a",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      marginLeft: 8,
                    }}
                  />
                }
              />
            </Link>
          </ShowcaseTooltip>
        </li>
      </ul>
      {showUserPrompts && (
        <>
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar setShowUserPrompts={setShowUserPrompts} setShowUserFavs={setShowUserFavs} />
          </div>
          <UserPrompts />
        </>
      )}
      {showUserFavs && (
        <>
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar setShowUserPrompts={setShowUserPrompts} setShowUserFavs={setShowUserFavs} />
          </div>
          <UserFavorite />
        </>
      )}
    </section>
  );
}

function ShowcaseCards({ isDescription, showUserFavs }) {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const [favoritePrompts, setFavoritePrompts] = useState(favorDefault || []);
  const [otherPrompts, setOtherPrompts] = useState(otherDefault || []);
  const [showAllOtherUsers, setShowAllOtherUsers] = useState(false);

  const [copiedIndex, setCopiedIndex] = useState(null);
  const handleCopyClick = (index) => {
    const node = filteredCommus.find((commu) => commu.id === index);
    if (node) {
      copy(node.description);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    }
  };

  const fetchData = useCallback(async () => {
    if (!userAuth && !showAllOtherUsers) {
      return;
    }

    try {
      const defaultFavorIds = [2, 209, 109, 197, 20, 199, 4];
      const defaultIds = [185, 2, 209, 109, 197, 20, 199, 4, 1, 251, 90, 180, 204, 232, 218, 11, 41, 234];
      const allIds = [
        2, 185, 209, 109, 197, 20, 199, 1, 251, 90, 4, 180, 204, 232, 218, 11, 41, 234, 196, 206, 9, 17, 8, 256, 173, 219, 7, 210, 155, 214, 56, 212, 177, 220, 224, 10, 15, 187, 5, 266, 122, 80, 238,
        242, 159, 217, 21, 19, 171, 181, 94, 200, 205, 49, 132, 14, 142, 13, 139, 190, 48, 191, 63, 158, 91, 16, 222, 75, 95, 18, 141, 277, 221, 176, 195, 6, 89, 253, 120, 182, 152, 267, 3, 24, 125,
        264, 73, 255, 82, 145, 188, 50, 241, 23, 237, 93, 40, 138, 194, 160, 77, 233, 236, 42, 202, 243, 103, 259, 215, 192, 12, 239, 216, 184, 163, 250, 126, 258, 112, 147, 162, 87, 189, 265, 35, 98,
        257, 157, 211, 57, 193, 151, 179, 175, 46, 262, 270, 130, 167, 275, 74, 228, 198, 254, 134, 72, 101, 150, 66, 261, 97, 178, 137, 203, 88, 67, 47, 106, 269, 172, 39, 38, 37, 51, 140, 96, 273,
        123, 144, 240, 271, 274, 22, 92, 78, 213, 245, 235, 201, 85, 248, 64, 45, 58, 100, 62, 230, 71, 70, 207, 99, 28, 54, 133, 252, 76, 186, 170, 208, 135, 168, 246, 25, 86, 226, 143, 153, 272,
        146, 43, 118, 26, 53, 169, 154, 29, 36, 244, 183, 31, 260, 52, 111, 59, 166, 81, 247, 263, 79, 61, 119, 68, 102, 124, 27, 30, 129, 148, 131, 229, 114, 84, 223, 107, 55, 65, 69, 161, 44, 136,
        231, 116, 115, 60, 128, 164, 249, 149, 121, 165, 108, 117, 276, 32, 83, 113, 110, 174, 268, 33, 105, 227, 34, 104, 156, 225, 127, 278,
      ];
      const favorIds = userAuth?.data?.favorites?.loves || defaultFavorIds;

      const idsToShow = !userAuth
        ? allIds.filter((id) => !defaultFavorIds.includes(id))
        : showAllOtherUsers
        ? allIds.filter((id) => !favorIds.includes(id))
        : defaultIds.filter((id) => !favorIds.includes(id));

      const [favorData, otherData] = await Promise.all([getPrompts("cards", userAuth ? favorIds : [], currentLanguage), getPrompts("cards", idsToShow, currentLanguage)]);

      if (userAuth) {
        setFavoritePrompts(favorData);
      }
      setOtherPrompts(otherData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [userAuth, showAllOtherUsers, currentLanguage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [favoriteUsers, otherUsers] = useMemo(() => {
    return [favoritePrompts, otherPrompts];
  }, [favoritePrompts, otherPrompts]);

  const { filteredCommus, filteredCards, isFiltered } = useFilteredPrompts();

  if (isFiltered && filteredCards.length === 0 && filteredCommus.length === 0) {
    return (
      <section className="margin-top--sm margin-bottom--sm">
        <div className="container padding-vert--md text--center">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <NoResults />
          <AdComponent />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--sm margin-bottom--sm">
      {!isFiltered ? (
        <>
          {showUserFavs ? null : (
            <div className={styles.showcaseFavorite}>
              <div className="container">
                <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                  <Heading as="h2">
                    <Translate id="showcase.favoritesList.title">Favorites</Translate>
                  </Heading>
                  <FavoriteIcon svgClass={styles.svgIconFavorite} />
                  <SearchBar />
                </div>
                <ul className={clsx("clean-list", styles.showcaseList)}>
                  {favoriteUsers.map((user) => (
                    <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} />
                  ))}
                  <AdComponent />
                </ul>
              </div>
            </div>
          )}
          <div className="container margin-top--md">
            <Heading as="h2" className={styles.showcaseHeader}>
              <Translate id="showcase.usersList.allUsers">All prompts</Translate>
            </Heading>
            <ul className={clsx("clean-list", styles.showcaseList)}>
              {otherUsers.map((user) => (
                <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} />
              ))}
              <AdComponent />
            </ul>
            {!showAllOtherUsers && (
              <Button style={{ width: "100%" }} onClick={() => setShowAllOtherUsers(true)}>
                <ArrowDownOutlined />
                <Translate>加载更多</Translate>
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="container">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <ul className={clsx("clean-list", styles.showcaseList)}>
            {filteredCommus.map((user) => (
              <li className="card shadow--md">
                <div
                  className={clsx("card__body")}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}>
                  <div>
                    <div className={clsx(cardStyles.showcaseCardHeader)}>
                      <div className={`${cardStyles.showcaseCardTitle} ${cardStyles.shortEllipsis}`}>
                        <Link className={cardStyles.showcaseCardLink}>{user.title} </Link>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#999",
                            marginLeft: "10px",
                          }}>
                          @{user.owner}
                        </span>
                      </div>
                      <Button icon={<CopyOutlined />} type="default" onClick={() => handleCopyClick(user.id)}>
                        {copiedIndex === user.id ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
                      </Button>
                    </div>
                    <p className={cardStyles.showcaseCardBody}>
                      {user.remark && (
                        <>
                          👉 {user.remark}
                          <br />
                        </>
                      )}
                      {user.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}></div>
                </div>
              </li>
            ))}
            {filteredCards.map((user) => (
              <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} />
            ))}
            <AdComponent />
          </ul>
        </div>
      )}
    </section>
  );
}

export default function Showcase(): JSX.Element {
  const [Shareurl, setShareUrl] = useState("");
  const [isDescription, setIsDescription] = useState(true);
  const [showUserFavs, setShowUserFavs] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const toggleDescription = useCallback(() => {
    setIsDescription((prevIsDescription) => !prevIsDescription);
  }, []);

  const isDarkMode = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--md">
        <AuthProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#397e6a",
              },
              cssVar: true,
              hashed: false,
              algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}>
            <ShowcaseHeader />
            <ShowcaseFilters onToggleDescription={toggleDescription} showUserFavs={showUserFavs} setShowUserFavs={setShowUserFavs} />
            <ShowcaseCards isDescription={isDescription} showUserFavs={showUserFavs} />
          </ConfigProvider>
        </AuthProvider>
        <ShareButtons shareUrl={Shareurl} title={TITLE} popOver={false} />
      </main>
    </Layout>
  );
}
