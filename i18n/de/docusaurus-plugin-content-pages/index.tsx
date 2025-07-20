import React, { useContext, useState, useMemo, useEffect, useCallback, Suspense } from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import { ConfigProvider, theme, Button } from "antd";
import { EditOutlined, HeartOutlined, ArrowDownOutlined, MenuOutlined } from "@ant-design/icons";

import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import ShowcaseTagSelect from "@site/src/pages/_components/ShowcaseTagSelect";
import ShowcaseFilterToggle from "@site/src/pages/_components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/pages/_components/ShowcaseTooltip";
import ShowcaseCard from "@site/src/pages/_components/ShowcaseCard";
import UserStatus from "@site/src/pages/_components/user/UserStatus";
import UserPrompts from "@site/src/pages/_components/user/UserPrompts";
import UserFavorite from "@site/src/pages/_components/user/UserFavorite";
import SearchBar, { NoResults, useFilteredPrompts, type UserState } from "@site/src/pages/_components/SearchBar";

import styles from "@site/src/pages/styles.module.css";
import themeConfig from "@site/src/pages/_components/themeConfig";
import { SearchCommu } from "@site/src/pages/_components/ShowcaseCard/unifyPrompt";
import { getWeight } from "@site/src/utils/formatters";

import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";

import { Tags, TagList } from "@site/src/data/tags";
import { SLOGAN, TITLE, DESCRIPTION, DEFAULT_FAVORITE_IDS, DEFAULT_IDS, ALL_IDS } from "@site/src/data/constants";

const ShareButtons = React.lazy(() => import("@site/src/pages/_components/ShareButtons"));

import { sortedUsers } from "@site/src/data/users.de";
import { cacheJsonData } from "@site/src/utils/cacheJsonData";
import favorDefault from "@site/src/data/default/favor_de.json";
import otherDefault from "@site/src/data/default/other_de.json";

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const ShowcaseHeader = React.memo(() => (
  <section className={"text--center"}>
    <div className="hideOnSmallScreen">
      <Heading as="h1">AI Short</Heading>
      <p>{SLOGAN}</p>
    </div>
    <UserStatus hideLinks={{ userCenter: true, myFavorite: false }} />
  </section>
));

interface ShowcaseFiltersProps {
  onToggleDescription: () => void;
  showUserFavs: boolean;
  setShowUserFavs: React.Dispatch<React.SetStateAction<boolean>>;
  showUserPrompts: boolean;
  setShowUserPrompts: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowcaseFilters: React.FC<ShowcaseFiltersProps> = React.memo(({ onToggleDescription, showUserFavs, setShowUserFavs, showUserPrompts, setShowUserPrompts }) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  const handleUserPrompts = useCallback(() => {
    setShowUserFavs(false);
    setShowUserPrompts((prev) => !prev);
  }, []);

  const handleUserFavs = useCallback(() => {
    setShowUserPrompts(false);
    setShowUserFavs((prev) => !prev);
  }, []);

  const [showTagsOnMobile, setShowTagsOnMobile] = useState(false);
  const toggleTagsOnMobile = useCallback(() => {
    setShowTagsOnMobile((prev) => !prev);
  }, []);

  const modifiedTagList = useMemo(() => {
    const tags = TagList.filter((tag) => tag !== "contribute");
    return userAuth ? tags.filter((tag) => tag !== "favorite") : tags;
  }, [userAuth]);

  const handleTagClick = useCallback(() => {
    if (!userAuth) {
      return;
    }
    setShowUserPrompts(false);
    setShowUserFavs(false);
  }, [userAuth]);

  const togglePromptLanguage = <Translate id="toggle_prompt_language">切换 Prompt 语言</Translate>;

  return (
    <section className="container" style={{ backgroundColor: "var(--site-color-tags-background)" }}>
      <div className={styles.filterCheckbox}>
        <div>
          <Heading as="h2" className="hideOnSmallScreen">
            <Translate id="showcase.filters.title">Filters</Translate>
          </Heading>
          <button onClick={toggleTagsOnMobile} className={`${styles.onToggleButton} showOnSmallScreen`}>
            <MenuOutlined /> {showTagsOnMobile ? <Translate id="hideTags">隐藏标签</Translate> : <Translate id="showTags">显示标签</Translate>}
          </button>
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
        <ShowcaseFilterToggle />
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

          return (
            <li key={i} className={`${styles.checkboxListItem} ${!showTagsOnMobile ? "hideOnSmallScreen" : ""}`} onClick={handleTagClick}>
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
            <Link to="/community-prompts">
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
          <UserPrompts filteredCommus={[]} isFiltered={false} />
        </>
      )}
      {showUserFavs && (
        <>
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar setShowUserPrompts={setShowUserPrompts} setShowUserFavs={setShowUserFavs} />
          </div>
          <UserFavorite filteredCommus={[]} filteredCards={[]} isFiltered={false} />
        </>
      )}
    </section>
  );
});

interface ShowcaseCardsProps {
  isDescription: boolean;
  showUserFavs: boolean;
  showUserPrompts: boolean;
}

const ShowcaseCards: React.FC<ShowcaseCardsProps> = React.memo(({ isDescription, showUserFavs, showUserPrompts }) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  const [favoritePrompts, setFavoritePrompts] = useState(favorDefault || []);
  const [otherPrompts, setOtherPrompts] = useState(otherDefault || []);
  const [showAllOtherUsers, setShowAllOtherUsers] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userAuth && !showAllOtherUsers) {
      return;
    }
    cacheJsonData(sortedUsers, currentLanguage);
    try {
      const defaultFavorIds = DEFAULT_FAVORITE_IDS;
      const defaultIds = DEFAULT_IDS;
      const allIds = ALL_IDS;
      const favorIds = userAuth?.data?.favorites?.loves || defaultFavorIds;

      const idsToShow = !userAuth
        ? allIds.filter((id) => !defaultFavorIds.includes(id))
        : showAllOtherUsers
        ? allIds.filter((id) => !favorIds.includes(id))
        : defaultIds.filter((id) => !favorIds.includes(id));

      const favorData = favorIds.map((id) => sortedUsers.find((user) => user.id === id)).filter(Boolean);
      const otherData = sortedUsers.filter((user) => idsToShow.includes(user.id));

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
                  <Heading as="h2" className="hideOnSmallScreen">
                    <Translate id="showcase.favoritesList.title">Favorites</Translate>
                  </Heading>
                  <FavoriteIcon svgClass={styles.svgIconFavorite} />
                  {!showUserPrompts && <SearchBar />}
                </div>
                <ul className={clsx("clean-list", styles.showcaseList)}>
                  {favoriteUsers.map((user) => (
                    <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={getWeight(user)} />
                  ))}
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
                <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={getWeight(user)} />
              ))}
            </ul>
            {!showAllOtherUsers && (
              <Button style={{ width: "100%" }} onClick={() => setShowAllOtherUsers(true)}>
                <ArrowDownOutlined /> <Translate>加载更多</Translate>
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
              <SearchCommu commuPrompt={user} />
            ))}
            {filteredCards.map((user) => (
              <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={getWeight(user)} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
});

export default function Showcase(): JSX.Element {
  const [Shareurl, setShareUrl] = useState("");
  const [isDescription, setIsDescription] = useState(true);
  const [showUserFavs, setShowUserFavs] = useState(false);
  const [showUserPrompts, setShowUserPrompts] = useState(false);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setShareUrl(window.location.href);
    }
  }, []);

  const toggleDescription = useCallback(() => {
    setIsDescription((prevIsDescription) => !prevIsDescription);
  }, []);

  const isDarkMode = ExecutionEnvironment.canUseDOM && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--md">
        <AuthProvider>
          <ConfigProvider
            theme={{
              ...themeConfig,
              algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}>
            <ShowcaseHeader />
            <ShowcaseFilters
              onToggleDescription={toggleDescription}
              showUserFavs={showUserFavs}
              setShowUserFavs={setShowUserFavs}
              showUserPrompts={showUserPrompts}
              setShowUserPrompts={setShowUserPrompts}
            />
            <ShowcaseCards isDescription={isDescription} showUserFavs={showUserFavs} showUserPrompts={showUserPrompts} />
          </ConfigProvider>
        </AuthProvider>
        <Suspense fallback={null}>
          <ShareButtons shareUrl={Shareurl} title={TITLE} popOver={false} />
        </Suspense>
      </main>
    </Layout>
  );
}
