import React, {
  useContext, useState, useMemo, useEffect, useCallback,
} from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Translate, { translate } from "@docusaurus/Translate";
import { useHistory, useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import Loadable from "@docusaurus/react-loadable";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import { EditOutlined, HeartOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import styles from "@site/src/pages/styles.module.css";
import { Tags, TagList, type User, type TagType } from "@site/src/data/tags";
import { sortedUsers } from "@site/src/data/users.pt";

import ShowcaseTagSelect, { readSearchTags } from "@site/src/pages/_components/ShowcaseTagSelect";
import ShowcaseFilterToggle, {
  type Operator,
  readOperator,
} from "@site/src/pages/_components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/pages/_components/ShowcaseTooltip";
import ShowcaseCard from "@site/src/pages/_components/ShowcaseCard";
import UserStatus from "@site/src/pages/_components/user/UserStatus";
import UserPrompts from "@site/src/pages/_components/user/UserPrompts";
import UserFavorite from "@site/src/pages/_components/user/UserFavorite";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";

import { fetchAllCopyCounts } from "@site/src/api";
const ShareButtons = Loadable({
  loader: () => import("@site/src/pages/_components/ShareButtons"),
  loading: () => <div>Loading ShareButtons...</div>,
});

const TITLE = translate({
  id: 'homepage.title',
  message:
    "AiShort(ChatGPT Shortcut)-简单易用的 AI 快捷指令表，让生产力倍增！",
});
const DESCRIPTION = translate({
  id: 'homepage.description',
  message: "AI Short 是一款用于管理和分享 AI 提示词的工具，帮助用户更有效地定制、保存和共享自己的提示词，以提高生产力。该平台还包括一个提示词分享社区，让用户轻松找到适用于不同场景的指令。",
});
const SLOGAN = translate({
  id: 'homepage.slogan',
  message: "让生产力加倍的 AI 快捷指令",
});

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

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

function filterUsers(
  users: User[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null
) {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  if (searchName) {
    const lowercaseSearchName = searchName.toLowerCase();
    // eslint-disable-next-line no-param-reassign
    // 搜索范围
    users = users.filter((user) =>
      (
        user[currentLanguage].title +
        user[currentLanguage].prompt +
        (user[currentLanguage].description ?? "") +
        user[currentLanguage].remark
      )
        .toLowerCase()
        .includes(lowercaseSearchName)
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

  return useMemo(
    () => filterUsers(sortedUsers, selectedTags, operator, searchName),
    [selectedTags, operator, searchName]
  );
}

function ShowcaseHeader() {
  return (
    <section className={styles.mobileMarginAdjust + " text--center"}>
      <Heading as='h1' className={styles.hideOnMobile}>
        AI Short
      </Heading>
      <p>{SLOGAN}</p>
      <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
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

  let modifiedTagList = userAuth ? TagList.filter(tag => tag !== "favorite") : [...TagList];

  // 提前调用 Translate 组件以确保 Hooks 的调用顺序一致
  const togglePromptLanguage = (
    <Translate id='toggle_prompt_language'>切换 Prompt 语言</Translate>
  );

  return (
    <section className='container margin-top--l margin-bottom--lg'>
      <div className={clsx("margin-bottom--sm", styles.filterCheckbox)}>
        <div>
          <Heading as='h2'>
            <Translate id='showcase.filters.title'>Filters</Translate>
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
        {/* 登陆用户标签按钮 */}
        {userAuth && (
          <>
            <li className={styles.checkboxListItem} onClick={handleUserPrompts}>
              <ShowcaseTooltip
                text={translate({
                  id: 'myprompt.tooltip',
                  message: "我添加或制作过的个人提示词，可用于存放AiShort之外的提示词。",
                })}
                anchorEl='#__docusaurus'>
                <ShowcaseTagSelect
                  tag='myprompt'
                  label={translate({
                    id: 'myprompt',
                    message: "我的提示词",
                  })}
                  icon={
                    <EditOutlined style={{ marginLeft: "5px" }} />
                  }
                />
              </ShowcaseTooltip>
            </li>
            <li className={styles.checkboxListItem} onClick={handleUserFavs}>
              <ShowcaseTooltip
                text={translate({
                  id: 'myfavorite.tooltip',
                  message: "我收藏的提示词，包括社区提示词。",
                })}
                anchorEl='#__docusaurus'>
                <ShowcaseTagSelect
                  tag='myfavorite'
                  label={translate({
                    id: 'link.myfavorite',
                    message: "我的收藏",
                  })}
                  icon={
                    <HeartOutlined style={{ marginLeft: "5px" }} />
                  }
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
              <ShowcaseTooltip
                id={id}
                text={description}
                anchorEl='#__docusaurus'>
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
              message: "分享到社区的提示词",
            })}
            anchorEl='#__docusaurus'>
            <Link to='/community-prompts'>
              <ShowcaseTagSelect
                tag='communityprompt'
                label={translate({
                  message: "社区提示词",
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
      {showUserPrompts && <UserPrompts />}
      {showUserFavs && <UserFavorite />}
    </section>
  );
}

function SearchBar() {
  const history = useHistory();
  const location = useLocation();

  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);

  useEffect(() => {
    const searchbar = document.getElementById("searchbar");
    if (searchbar) {
      searchbar.focus();
    }
  }, [value]);

  const updateSearch = useCallback(
    debounce((searchValue: string) => {
      const newSearch = new URLSearchParams(location.search);
      newSearch.delete(SearchNameQueryKey);
      if (searchValue) {
        newSearch.set(SearchNameQueryKey, searchValue);
      }
      history.push({
        ...location,
        search: newSearch.toString(),
        state: prepareUserState(),
      });
    }, 1000), //搜索延时
    [location, history]
  );

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (
      currentLanguage !== "en" &&
      (window.innerWidth >= 768 ||
        (typeof chrome !== "undefined" && chrome.extension) ||
        (typeof browser !== "undefined" && browser.extension))
    ) {
      // PC 端或插件版
      setValue(e.currentTarget.value);
      updateSearch(e.currentTarget.value);
    } else {
      // 移动端
      setValue(e.currentTarget.value);
      const newSearch = new URLSearchParams(location.search);
      newSearch.delete(SearchNameQueryKey);
      if (e.currentTarget.value) {
        newSearch.set(SearchNameQueryKey, e.currentTarget.value);
      }
      history.push({
        ...location,
        search: newSearch.toString(),
        state: prepareUserState(),
      });
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        id='searchbar'
        placeholder={translate({
          message: "Search for prompts...",
          id: "showcase.searchBar.placeholder",
        })}
        value={value ?? undefined}
        onInput={handleInput}
      />
    </div>
  );
}

function ShowcaseCards({ isDescription, showUserFavs }) {
  const [copyCounts, setCopyCounts] = useState({});

  const { userAuth } = useContext(AuthContext);
  const [userLoves, setUserLoves] = useState(
    () => userAuth?.data?.favorites?.loves || []
  );
  const [showAllOtherUsers, setShowAllOtherUsers] = useState(false);

  // 当 userAuth 改变时，更新 userLoves 的值
  useEffect(() => {
    setUserLoves(userAuth?.data?.favorites?.loves || []);
  }, [userAuth]);

  const [favoriteUsers, otherUsers] = useMemo(() => {
    return sortedUsers.reduce(
      ([favorites, others], user) => {
        // 登陆后移除默认的收藏标签
        if (userAuth) {
          if (user.tags.includes("favorite")) {
            const index = user.tags.indexOf("favorite");
            if (index > -1) {
              user.tags.splice(index, 1);
            }
          }
        }
        if (
          userLoves &&
          userLoves.includes(user.id) &&
          !user.tags.includes("favorite")
        ) {
          user.tags.push("favorite");
        }
        if (user.tags.includes("favorite")) {
          favorites.push(user);
        } else {
          others.push(user);
        }
        return [favorites, others];
      },
      [[], []]
    );
  }, [sortedUsers, userAuth, userLoves]);

  const displayedOtherUsers = showAllOtherUsers
    ? otherUsers
    : otherUsers.slice(0, 24);

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
      <section className='margin-top--lg margin-bottom--xl'>
        <div className='container padding-vert--md text--center'>
          <Heading as='h2'>
            <Translate id='showcase.usersList.noResult'>
              😒 找不到结果，请缩短搜索词
            </Translate>
          </Heading>
          <SearchBar />
        </div>
      </section>
    );
  }
  if (showUserFavs) {
    // 如果 showUserFavs 为 true，则不渲染 Favorites 区块
    return (
      <section className='margin-top--lg margin-bottom--xl'>
        {filteredUsers.length === sortedUsers.length ? (
          <>
            <div className='container margin-top--lg'>
              <div
                className={clsx(
                  "margin-bottom--md",
                  styles.showcaseFavoriteHeader
                )}>
                <Heading as='h2' className={styles.showcaseHeader}>
                  <Translate id='showcase.usersList.allUsers'>
                    All prompts
                  </Translate>
                </Heading>
                <SearchBar />
              </div>
              <ul className={clsx("clean-list", styles.showcaseList)}>
                {displayedOtherUsers.map((user) => (
                  <ShowcaseCard
                    key={user.id}
                    user={user}
                    isDescription={isDescription}
                    copyCount={copyCounts[user.id] || 0}
                    onCopy={handleCardCopy}
                    onLove={setUserLoves}
                  />
                ))}
              </ul>
              {!showAllOtherUsers && otherUsers.length > 50 && (
                <Link
                  className='button button--secondary'
                  style={{ width: "100%" }}
                  onClick={() => setShowAllOtherUsers(true)}>
                  {<ArrowDownOutlined />}
                  <Translate>加载更多</Translate>
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className='container'>
            <div
              className={clsx(
                "margin-bottom--md",
                styles.showcaseFavoriteHeader
              )}>
              <SearchBar />
            </div>
            <ul className={clsx("clean-list", styles.showcaseList)}>
              {filteredUsers.map((user) => (
                <ShowcaseCard
                  key={user.id}
                  user={user}
                  isDescription={isDescription}
                  copyCount={copyCounts[user.id] || 0}
                  onCopy={handleCardCopy}
                  onLove={setUserLoves}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }

  // 正常渲染 Favorites 区块
  return (
    <section className='margin-top--lg margin-bottom--xl'>
      {filteredUsers.length === sortedUsers.length ? (
        <>
          <div className={styles.showcaseFavorite}>
            <div className='container'>
              <div
                className={clsx(
                  "margin-bottom--md",
                  styles.showcaseFavoriteHeader
                )}>
                <Heading as='h2'>
                  <Translate id='showcase.favoritesList.title'>
                    Favorites
                  </Translate>
                </Heading>
                <FavoriteIcon svgClass={styles.svgIconFavorite} />
                <SearchBar />
              </div>
              <ul className={clsx("clean-list", styles.showcaseList)}>
                {favoriteUsers.map((user) => (
                  <ShowcaseCard
                    key={user.id}
                    user={user}
                    isDescription={isDescription}
                    copyCount={copyCounts[user.id] || 0}
                    onCopy={handleCardCopy}
                    onLove={setUserLoves}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className='container margin-top--lg'>
            <Heading as='h2' className={styles.showcaseHeader}>
              <Translate id='showcase.usersList.allUsers'>
                All prompts
              </Translate>
            </Heading>
            <ul className={clsx("clean-list", styles.showcaseList)}>
              {displayedOtherUsers.map((user) => (
                <ShowcaseCard
                  key={user.id}
                  user={user}
                  isDescription={isDescription}
                  copyCount={copyCounts[user.id] || 0}
                  onCopy={handleCardCopy}
                  onLove={setUserLoves}
                />
              ))}
            </ul>
            {!showAllOtherUsers && otherUsers.length > 50 && (
              <Link
                className='button button--secondary'
                style={{ width: "100%" }}
                onClick={() => setShowAllOtherUsers(true)}>
                {<ArrowDownOutlined />}
                <Translate>加载更多</Translate>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className='container'>
          <div
            className={clsx(
              "margin-bottom--md",
              styles.showcaseFavoriteHeader
            )}>
            <SearchBar />
          </div>
          <ul className={clsx("clean-list", styles.showcaseList)}>
            {filteredUsers.map((user) => (
              <ShowcaseCard
                key={user.id}
                user={user}
                isDescription={isDescription}
                copyCount={copyCounts[user.id] || 0}
                onCopy={handleCardCopy}
                onLove={setUserLoves}
              />
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
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className='margin-vert--lg'>
        <AuthProvider>
          <ShowcaseHeader />
          <ShowcaseFilters onToggleDescription={toggleDescription} showUserFavs={showUserFavs} setShowUserFavs={setShowUserFavs} />
          <ShowcaseCards isDescription={isDescription} showUserFavs={showUserFavs} />
        </AuthProvider>
        <ShareButtons shareUrl={Shareurl} title={TITLE} popOver={false} />
      </main>
    </Layout>
  );
}
