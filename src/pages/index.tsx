import React, { useContext, useState, useMemo, useEffect, useCallback, useRef } from "react";
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
import { Skeleton, ConfigProvider, Input, InputRef, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import styles from "@site/src/pages/styles.module.css";
import { Tags, TagList, type TagType } from "@site/src/data/tags";

import ShowcaseTagSelect from "@site/src/pages/_components/ShowcaseTagSelect";
import ShowcaseFilterToggle, { type Operator } from "@site/src/pages/_components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/pages/_components/ShowcaseTooltip";
import ShowcaseCard from "@site/src/pages/_components/ShowcaseCard";
import UserStatus from "@site/src/pages/_components/user/UserStatus";
import UserPrompts from "@site/src/pages/_components/user/UserPrompts";
import UserFavorite from "@site/src/pages/_components/user/UserFavorite";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";

import { findCardsWithTags, getPrompts } from "@site/src/api";

import favorData from "@site/src/data/default/favor_zh.json";
import otherData from "@site/src/data/default/other_zh.json";

const ShareButtons = Loadable({
  loader: () => import("@site/src/pages/_components/ShareButtons"),
  loading: () => null,
});

const TITLE = translate({
  id: "homepage.title",
  message: "AiShort(ChatGPT Shortcut)-简单易用的 AI 快捷指令表，让生产力倍增！",
});
const DESCRIPTION = translate({
  id: "homepage.description",
  message: "AI Short 是一款用于管理和分享 AI 提示词的工具，帮助用户更有效地定制、保存和共享自己的提示词，以提高生产力。该平台还包括一个提示词分享社区，让用户轻松找到适用于不同场景的指令。",
});
const SLOGAN = translate({
  id: "homepage.slogan",
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

function useFilteredUsers() {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>("OR");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tags = queryParams.getAll("tags");
    const search = queryParams.get("name");
    const operatorParam = queryParams.get("operator") || "OR";

    setSelectedTags(tags);
    setSearchName(search);
    setOperator(operatorParam as Operator);
  }, [location.search]);

  useEffect(() => {
    async function fetchAndFilterUsers() {
      // 如果没有提供 tags 和 search，跳过搜索
      if (selectedTags.length === 0 && !searchName) {
        setFilteredUsers([]);
        return;
      }
      try {
        const data = await findCardsWithTags(selectedTags, searchName, currentLanguage, operator);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching and filtering users:", error);
      }
    }

    fetchAndFilterUsers();
  }, [selectedTags, searchName, operator, currentLanguage]);

  // 计算 isFiltered 标志
  const isFiltered = selectedTags.length > 0 || searchName !== null;

  return { filteredUsers, isFiltered };
}

function ShowcaseHeader() {
  return (
    <section className={"text--center"}>
      <div className={styles.hideOnMobile}>
        <Heading as="h1">AI Short</Heading>
        <p>{SLOGAN}</p>
      </div>
      <UserStatus hideLinks={{ userCenter: false, myFavorite: false }} />
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
            <li className={styles.checkboxListItem} onClick={handleUserFavs}>
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
      {showUserPrompts && <UserPrompts />}
      {showUserFavs && <UserFavorite />}
    </section>
  );
}

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const searchRef = useRef<InputRef>(null);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    // 初始化时根据当前 URL 设置搜索框的值
    setValue(readSearchName(location.search));
    //searchRef.current?.focus();
  }, [location]);

  // 搜索函数
  const handleSearch = useCallback(() => {
    try {
      const newSearch = new URLSearchParams(location.search);
      newSearch.delete(SearchNameQueryKey);
      if (value) {
        newSearch.set(SearchNameQueryKey, value);
      }
      history.push({
        ...location,
        search: newSearch.toString(),
        state: prepareUserState(),
      });
    } catch (error) {
      console.error("Error occurred while searching:", error);
    }
  }, [value, location, history]);

  useEffect(() => {
    // 如果 value 变为空字符串，假定清除操作已发生，触发搜索
    if (value === "") {
      handleSearch();
    }
  }, [value, handleSearch]);

  // 处理输入事件，更新搜索框的值
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#397e6a",
            borderRadius: 30,
            colorBgContainer: "#f6ffed",
          },
        }}>
        <Input
          ref={searchRef}
          id="searchbar"
          placeholder={translate({
            message: "Search for prompts...",
            id: "showcase.searchBar.placeholder",
          })}
          value={value ?? undefined}
          onChange={handleInput}
          onPressEnter={handleSearch}
          allowClear
          suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} type="primary" />}
        />
      </ConfigProvider>
    </div>
  );
}

function ShowcaseCards({ isDescription, showUserFavs }) {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const defaultFavorIds = [2, 209, 109, 197, 20, 199, 4];
  const defaultIds = [185, 2, 209, 109, 197, 20, 199, 4, 1, 90, 204, 180, 251, 218, 234, 232, 196, 41, 11];
  const allIds = [
    185, 2, 209, 109, 197, 20, 199, 4, 1, 90, 204, 180, 251, 218, 234, 232, 196, 41, 11, 9, 17, 206, 173, 8, 210, 219, 7, 56, 177, 155, 214, 220, 212, 187, 10, 159, 122, 15, 238, 256, 242, 21, 80,
    224, 5, 132, 171, 200, 217, 14, 142, 49, 158, 139, 181, 19, 13, 94, 48, 63, 91, 205, 16, 176, 190, 18, 141, 125, 191, 195, 266, 95, 89, 152, 73, 24, 182, 120, 50, 222, 75, 6, 145, 221, 188, 138,
    23, 82, 160, 40, 253, 3, 77, 194, 241, 93, 255, 237, 126, 184, 163, 103, 243, 192, 101, 42, 215, 57, 12, 130, 233, 250, 179, 87, 112, 236, 157, 202, 264, 211, 239, 167, 162, 189, 216, 46, 35, 74,
    147, 151, 175, 137, 134, 72, 193, 198, 66, 98, 97, 88, 172, 178, 37, 203, 267, 150, 254, 47, 106, 22, 140, 38, 240, 201, 78, 123, 228, 213, 67, 45, 144, 39, 51, 270, 92, 96, 258, 262, 245, 207,
    265, 58, 259, 261, 62, 64, 271, 85, 135, 28, 133, 71, 269, 99, 70, 170, 26, 168, 257, 76, 246, 186, 169, 248, 68, 208, 244, 81, 153, 86, 54, 25, 235, 53, 100, 43, 146, 52, 166, 252, 154, 79, 111,
    118, 143, 124, 59, 61, 129, 183, 247, 31, 29, 27, 131, 119, 226, 102, 148, 36, 55, 84, 107, 223, 30, 161, 44, 260, 229, 263, 128, 165, 60, 65, 114, 136, 164, 69, 116, 149, 115, 108, 83, 117, 121,
    32, 249, 174, 104, 113, 225, 227, 105, 33, 156, 34, 277, 127, 268, 275, 273, 274, 272, 276, 110, 230, 231,
  ];
  const [favoritePrompts, setFavoritePrompts] = useState([]);
  const [otherPrompts, setOtherPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userAuth } = useContext(AuthContext);
  const [showAllOtherUsers, setShowAllOtherUsers] = useState(false);

  const [userLoves, setUserLoves] = useState([]);

  useEffect(() => {
    if (userAuth) {
      setUserLoves(userAuth.data?.favorites?.loves || []);
    }
  }, [userAuth]);

  useEffect(() => {
    setIsLoading(true);
    if (!userAuth && !showAllOtherUsers) {
      setFavoritePrompts(favorData);
      setOtherPrompts(otherData);
      setIsLoading(false);
    } else {
      const favorIds = userAuth ? userLoves : defaultFavorIds;
      const filteredAllIds = allIds.filter((id) => !favorIds.includes(id));
      const filteredDefaultIds = defaultIds.filter((id) => !favorIds.includes(id));
      // 如果 showAllOtherUsers 为真，使用 filteredAllIds，否则使用 filteredDefaultIds
      const idsToShow = showAllOtherUsers ? filteredAllIds : filteredDefaultIds;

      Promise.all([getPrompts("cards", favorIds, currentLanguage), getPrompts("cards", idsToShow, currentLanguage)])
        .then(([favoriteData, otherData]) => {
          setFavoritePrompts(favoriteData);
          setOtherPrompts(otherData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          setIsLoading(false);
        });
    }
  }, [currentLanguage, showAllOtherUsers, userLoves]);

  const [favoriteUsers, otherUsers] = useMemo(() => {
    return [favoritePrompts, otherPrompts];
  }, [favoritePrompts, otherPrompts]);

  const displayedOtherUsers = useMemo(() => {
    return otherUsers;
  }, [otherUsers]);

  const { filteredUsers, isFiltered } = useFilteredUsers();

  if (isLoading) {
    return (
      <section className="margin-top--lg margin-bottom--sm">
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
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <Skeleton active title={false} avatar paragraph={{ rows: 5 }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container margin-top--lg">
          <Heading as="h2" className={styles.showcaseHeader}>
            <Translate id="showcase.usersList.allUsers">All prompts</Translate>
          </Heading>
          <ul className={clsx("clean-list", styles.showcaseList)}>
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <Skeleton active title={false} avatar paragraph={{ rows: 5 }} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (isFiltered && filteredUsers.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <Heading as="h2">
            <Translate id="showcase.usersList.noResult">😒 找不到结果，请缩短搜索词</Translate>
          </Heading>
          <SearchBar />
        </div>
      </section>
    );
  }
  if (showUserFavs) {
    // 如果 showUserFavs 为 true，则不渲染 Favorites 区块
    return (
      <section className="margin-top--lg margin-bottom--xl">
        {!isFiltered ? (
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
                  <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} onLove={setUserLoves} />
                ))}
              </ul>
              {!showAllOtherUsers && (
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
                <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} onLove={setUserLoves} />
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
      {!isFiltered ? (
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
                  <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} onLove={setUserLoves} />
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
                <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} onLove={setUserLoves} />
              ))}
            </ul>
            {!showAllOtherUsers && (
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
              <ShowcaseCard key={user.id} user={user} isDescription={isDescription} copyCount={user.count || 0} onLove={setUserLoves} />
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
      <main className="margin-vert--md">
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
