import React, { useContext, useState, useMemo, useEffect, useCallback } from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { useLocation } from "@docusaurus/router";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import { ConfigProvider, theme } from "antd";
import { EditOutlined, HeartOutlined, ArrowDownOutlined } from "@ant-design/icons";

import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import ShowcaseTagSelect, { readSearchTags } from "@site/src/pages/_components/ShowcaseTagSelect";
import ShowcaseFilterToggle, { type Operator, readOperator } from "@site/src/pages/_components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/pages/_components/ShowcaseTooltip";
import ShowcaseCard from "@site/src/pages/_components/ShowcaseCard";
import UserStatus from "@site/src/pages/_components/user/UserStatus";
import UserPrompts from "@site/src/pages/_components/user/UserPrompts";
import UserFavorite from "@site/src/pages/_components/user/UserFavorite";
import ShareButtons from "@site/src/pages/_components/ShareButtons";
import SearchBar, { NoResults, type UserState } from "@site/src/pages/_components/SearchBar";

import styles from "@site/src/pages/styles.module.css";
import { Tags, TagList, type User, type TagType } from "@site/src/data/tags";
import { SLOGAN, TITLE, DESCRIPTION } from "@site/src/data/constants";

import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";

import { fetchAllCopyCounts } from "@site/src/api";

import { sortedUsers } from "@site/src/data/users.ar";

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = "name";

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterUsers(users: User[], selectedTags: TagType[], operator: Operator, searchName: string | null) {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  if (searchName) {
    const lowercaseSearchName = searchName.toLowerCase();
    // 搜索范围
    users = users.filter((user) =>
      (user[currentLanguage].title + user[currentLanguage].prompt + (user[currentLanguage].description ?? "") + user[currentLanguage].remark).toLowerCase().includes(lowercaseSearchName)
    );
  }
  if (selectedTags.length === 0) {
    return users.sort((a, b) => b.weight - a.weight);
  }
  return users.filter((user) => {
    if (user.tags.length === 0) {
      return false;
    }
    if (operator === "AND") {
      return selectedTags.every((tag) => user.tags.includes(tag));
    }
    return selectedTags.some((tag) => user.tags.includes(tag));
  });
}

function useFilteredUsers() {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>("OR");
  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
  // hydration mismatch)
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
  }, [location]);

  return useMemo(() => filterUsers(sortedUsers, selectedTags, operator, searchName), [selectedTags, operator, searchName]);
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

  // 登陆后显示用户提示词和收藏夹，两者不可同时显示
  const [showUserPrompts, setShowUserPrompts] = useState(false);
  const handleUserPrompts = () => {
    setShowUserFavs(false);
    setShowUserPrompts(!showUserPrompts);
  };
  const handleUserFavs = () => {
    setShowUserPrompts(false);
    setShowUserFavs(!showUserFavs);
  };

  let modifiedTagList = TagList.filter((tag) => tag !== "contribute");
  if (userAuth) {
    modifiedTagList = modifiedTagList.filter((tag) => tag !== "favorite");
  }

  // 提前调用 Translate 组件以确保 Hooks 的调用顺序一致
  const togglePromptLanguage = <Translate id="toggle_prompt_language">切换 Prompt 语言</Translate>;

  return (
    <section className="container">
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
        <ShowcaseFilterToggle />
      </div>
      <ul className={clsx("clean-list", styles.checkboxList)}>
        {/* 登陆用户标签按钮 */}
        {userAuth && (
          <>
            <li className={`${styles.checkboxListItem} ${showUserPrompts ? styles.activeItem : ""}`} onClick={handleUserPrompts}>
              <ShowcaseTooltip
                text={translate({
                  id: "myprompt.tooltip",
                  message: "我添加或制作过的个人提示词，可用于存放AiShort之外的提示词。",
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
        <li className={styles.checkboxListItem}>
          <ShowcaseTooltip
            text={translate({
              id: "community.tag.tooltip",
              message: "社区分享的精选提示词",
            })}
            anchorEl="#__docusaurus">
            <Link to="/community-prompts">
              <ShowcaseTagSelect
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
}

function ShowcaseCards({ isDescription, showUserFavs }) {
  const [copyCounts, setCopyCounts] = useState({});

  const { userAuth } = useContext(AuthContext);
  const [userLoves, setUserLoves] = useState(() => userAuth?.data?.favorites?.loves || []);
  const [showAllOtherUsers, setShowAllOtherUsers] = useState(false);

  // 当 userAuth 改变时，更新 userLoves 的值
  useEffect(() => {
    setUserLoves(userAuth?.data?.favorites?.loves || []);
  }, [userAuth]);

  const [favoriteUsers, otherUsers] = useMemo(() => {
    return sortedUsers.reduce(
      ([favorites, others], user) => {
        let updatedUser = { ...user }; // 创建新对象，避免直接修改
        if (userAuth && updatedUser.tags.includes("favorite")) {
          updatedUser.tags = updatedUser.tags.filter((tag) => tag !== "favorite");
        }
        if (userLoves && userLoves.includes(updatedUser.id) && !updatedUser.tags.includes("favorite")) {
          updatedUser.tags = [...updatedUser.tags, "favorite"];
        }
        if (updatedUser.tags.includes("favorite")) {
          favorites.push(updatedUser);
        } else {
          others.push(updatedUser);
        }
        return [favorites, others];
      },
      [[], []]
    );
  }, [sortedUsers, userAuth, userLoves]);

  const displayedOtherUsers = showAllOtherUsers ? otherUsers : otherUsers.slice(0, 24);

  favoriteUsers.sort((a, b) => b.weight - a.weight);
  otherUsers.sort((a, b) => b.weight - a.weight);

  useEffect(() => {
    const fetchData = async () => {
      const counts = await fetchAllCopyCounts();
      setCopyCounts(counts);
    };

    fetchData();
  }, []);

  const handleCardCopy = useCallback((cardId) => {
    setCopyCounts((prevCopyCounts) => ({
      ...prevCopyCounts,
      [cardId]: (prevCopyCounts[cardId] || 0) + 1,
    }));
  }, []);

  const filteredUsers = useFilteredUsers();

  if (filteredUsers.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <NoResults />
        </div>
      </section>
    );
  }
  if (showUserFavs) {
    // 如果 showUserFavs 为 true，则不渲染 Favorites 区块
    return (
      <section className="margin-top--lg margin-bottom--xl">
        {filteredUsers.length === sortedUsers.length ? (
          <>
            <div className="container margin-top--lg">
              <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
                <Heading as="h2">
                  <Translate id="showcase.usersList.allUsers">All prompts</Translate>
                </Heading>
                <SearchBar />
              </div>
              <ul className={clsx("clean-list", styles.showcaseList)}>
                {displayedOtherUsers.map((user) => (
                  <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={copyCounts[user.id] || 0} onCopy={handleCardCopy} onLove={setUserLoves} />
                ))}
              </ul>
              {!showAllOtherUsers && otherUsers.length > 50 && (
                <Link className="button button--secondary" style={{ width: "100%" }} onClick={() => setShowAllOtherUsers(true)}>
                  <ArrowDownOutlined />
                  <Translate>加载更多</Translate>
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="container">
            <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
              <SearchBar />
            </div>
            <ul className={clsx("clean-list", styles.showcaseList)}>
              {filteredUsers.map((user) => (
                <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={copyCounts[user.id] || 0} onCopy={handleCardCopy} onLove={setUserLoves} />
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }

  // 正常渲染 Favorites 区块
  return (
    <section className="margin-top--lg margin-bottom--sm">
      {filteredUsers.length === sortedUsers.length ? (
        <>
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
                  <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={copyCounts[user.id] || 0} onCopy={handleCardCopy} onLove={setUserLoves} />
                ))}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <Heading as="h2" className={styles.showcaseHeader}>
              <Translate id="showcase.usersList.allUsers">All prompts</Translate>
            </Heading>
            <ul className={clsx("clean-list", styles.showcaseList)}>
              {displayedOtherUsers.map((user) => (
                <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={copyCounts[user.id] || 0} onCopy={handleCardCopy} onLove={setUserLoves} />
              ))}
            </ul>
            {!showAllOtherUsers && otherUsers.length > 50 && (
              <Link className="button button--secondary" style={{ width: "100%" }} onClick={() => setShowAllOtherUsers(true)}>
                {<ArrowDownOutlined />}
                <Translate>加载更多</Translate>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="container">
          <div className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}>
            <SearchBar />
          </div>
          <ul className={clsx("clean-list", styles.showcaseList)}>
            {filteredUsers.map((user) => (
              <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={copyCounts[user.id] || 0} onCopy={handleCardCopy} onLove={setUserLoves} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function Showcase(): JSX.Element {
  const [Shareurl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);
  const [isDescription, setIsDescription] = useState(true);
  const [showUserFavs, setShowUserFavs] = useState(false);
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
