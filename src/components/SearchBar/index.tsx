import React, { useContext, useState, useEffect, useCallback, useRef, startTransition } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";

import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AuthContext } from "@site/src/components/AuthContext";

import { type Operator } from "@site/src/components/ShowcaseFilterToggle";
import { type TagType, TagList } from "@site/src/data/tags";
import { getPrompts } from "@site/src/api";
import { getCommPrompts } from "@site/src/api/prompts";
import { searchCardsLocally } from "@site/src/api/homepage";
import { getWeight } from "@site/src/utils/formatters";

import styles from "./styles.module.css";

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

/** Check if a prompt matches a search term across text fields */
// title/description 用可选链：getPrompts 对「已收藏但作者取消分享且本地无缓存」的社区提示词
// 会返回 {id,_unavailable,_noCache} 占位对象（无 title/description）。裸 .toLowerCase() 会抛错，
// 而该调用在 [...userprompts,...commus].filter 里——一个占位对象就会中断整组过滤，
// 导致用户自有/收藏提示词的搜索结果被整体吞空。占位对象无可搜索内容，应安静地不匹配。
const matchesSearch = (prompt: any, searchLower: string): boolean =>
  prompt.title?.toLowerCase().includes(searchLower) ||
  prompt.description?.toLowerCase().includes(searchLower) ||
  (prompt.remark && prompt.remark.toLowerCase().includes(searchLower)) ||
  (prompt.notes && prompt.notes.toLowerCase().includes(searchLower));

export function useFilteredPrompts(searchMode: "default" | "myfavor" | "myprompts" = "default") {
  const location = useLocation<UserState>();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;
  const [operator, setOperator] = useState<Operator>("OR");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filteredCommus, setFilteredCommus] = useState<any[]>([]);
  // 筛选/搜索要等 prompt 索引 chunk（首访约 140 KB）落地，降级社区搜索还要再等一次网络。
  // 没有这个信号，调用方只能把「结果为空」当成「搜不到」——首访用户按下回车后先看到的是
  // 一句谎报的「没有找到匹配的提示词」，慢网下能挂好几秒，然后结果才出现。
  const [isSearching, setIsSearching] = useState(false);
  // 搜索失败标记：失败时不能显示「没有找到匹配的提示词」——数据没加载出来 ≠ 没有匹配项。
  const [searchFailed, setSearchFailed] = useState(false);
  // 手动重试：改这个计数器触发下面的搜索 effect 重跑。
  // 失败态不能靠「再搜一次同一个词」恢复——SearchBar.handleSearch 对相同 name 是 no-op
  // （不 push 历史记录），没有这个计数器，失败就是一条死路：用户除了刷新没有第二条路。
  const [retryNonce, setRetryNonce] = useState(0);
  // 显式重试标记：点「重试」后置 true，让这一轮请求绕过 api 层的失败抑制窗口
  // （失败后 60 分钟内的调用直接吃缓存、不重发请求 —— 那不叫重试）。
  const retryForceRef = useRef(false);
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tags = queryParams.getAll("tags");
    const search = queryParams.get("name");
    const operatorParam = queryParams.get("operator") || "OR";
    // 将多次初始 setState 合并到一次低优更新，避免 hydration 尚未完全时触发高优刷新
    startTransition(() => {
      const validTags = tags.filter((tag) => TagList.includes(tag as TagType)) as TagType[];
      setSelectedTags(validTags);
      // 空串归一成 null：`?name=` 是空查询而不是"查一个空词"，留着 "" 会让 isFiltered 为真
      // 却搜不到任何东西，页面谎报「没有找到匹配的提示词」。
      setSearchName(search || null);
      setOperator(operatorParam as Operator);
      // 旗标必须和上面三个值同批提交。selectedTags/searchName/operator 只在这里被写，
      // 所以「进入筛选态」这一帧一定经过此处；放在下面的 effect 里立旗标就晚了——passive
      // effect 跑在 paint 之后，首帧仍是 isFiltered && 结果为空 && isSearching=false，
      // 那句谎报只靠 NoResults 自带的 150ms 定时器兜着，删掉它就静默回归。
      setIsSearching(validTags.length > 0 || !!search);
    });
  }, [location.search]);

  useEffect(() => {
    let cancelled = false;
    // 本轮是否由「重试」触发：显式重试要真发一次请求，绕过 api 层的失败抑制窗口。
    const force = retryForceRef.current;
    retryForceRef.current = false;
    // 骨架屏旗标只在上面那个 URL effect 里立，这里不再补一次：本 effect 的依赖含
    // 收藏/自有提示词的数组引用，筛选态点一次 ❤️ 或后台 /myspace 刷新都会重跑
    // 同一个查询，每次都立旗标就把整张结果表换成骨架屏再重挂一遍。
    // selectedTags/searchName/operator 只由那个 effect 写，查询一变它已同批立过旗标。
    async function fetchAndFilterUsers() {
      if (selectedTags.length === 0 && !searchName) {
        // 保持引用：非筛选态下这些数组必须是空，但**不能每次都写新的 []**。
        // 依赖里有 favorites.loves/commLoves，而收藏乐观更新（applyOptimistic）每次都
        // 构造新数组 → 未开筛选时点一次 ❤️ 也会走到这里。写新引用会让 filteredCommus
        // 换掉，HomePage 里依赖它的 setVoteDeltas({}) 再引一次渲染（对象字面量，
        // Object.is 恒不成立）——一次点击白白多两轮渲染 + 整表协调。
        // 返回 prev 本身即可让 React 按引用相等跳过这次更新。
        startTransition(() => {
          if (!cancelled) {
            setFilteredCards((prev) => (prev.length === 0 ? prev : []));
            setFilteredCommus((prev) => (prev.length === 0 ? prev : []));
          }
        });
        // 清除筛选后不是"没找到"，是回到未筛选态——顺手清掉失败标记，
        // 否则上一轮搜索失败留下的标记会跟着下一次查询显示成加载失败。
        setSearchFailed(false);
        return;
      }
      const searchLower = searchName ? searchName.toLowerCase() : "";
      try {
        if (searchMode === "default") {
          // 精选搜索和本地收藏搜索并行，互不依赖
          const cardsPromise = searchCardsLocally(selectedTags, searchName, currentLanguage, operator);
          // 本地收藏/自有提示词这一路查找失败过没有：失败了就等于「用户自己的提示词没搜」，
          // 这时候结果为空不能断言「没有匹配的提示词」。
          let localLookupFailed = false;
          const commusPromise =
            userAuth?.data && selectedTags.length === 0
              ? Promise.all([
                  userAuth.data.userprompts ? getPrompts("userprompts", userAuth.data.userprompts) : Promise.resolve([]),
                  userAuth.data.favorites && userAuth.data.favorites.commLoves ? getPrompts("commus", userAuth.data.favorites.commLoves) : Promise.resolve([]),
                ])
                  .then(([userprompts, commus]) => [...userprompts, ...commus].filter((prompt) => matchesSearch(prompt, searchLower)))
                  .catch((err) => {
                    localLookupFailed = true;
                    // 别静默：这一路失败等于「用户自己的提示词根本没被搜过」，
                    // 本文件其他失败路径都有日志，出问题时要能在控制台看到。
                    console.error("Local prompt lookup failed during search:", err);
                    return [] as any[];
                  })
              : Promise.resolve([]);

          const [data, localCommus] = await Promise.all([cardsPromise, commusPromise]);
          if (cancelled) return;

          // searchCardsLocally 返回精选数据的原始顺序（无标签时甚至是共享的 allData），
          // 这里复制后按复制热度排序；不要原地排序，否则会改写全局数据顺序。
          const sortedData = [...data].sort((a, b) => getWeight(b) - getWeight(a));

          startTransition(() => {
            setFilteredCards(sortedData);
            setFilteredCommus(localCommus);
          });
          // 降级搜索：精选和本地收藏都无结果时，搜索全量社区提示词（无需登录）
          if (localCommus.length === 0 && data.length === 0 && searchName) {
            try {
              // 这一轮要出网络：上面已把 filteredCommus 覆写成本地命中（这里是空数组），
              // 不立旗标的话降级结果回来之前会显示「没有找到匹配的提示词」。
              // 同查询的无关重跑（点 ❤️、后台 /myspace 刷新）走的就是这条路——
              // 查询一变时旗标由读 URL 的 effect 立，这里只补「要出网络」这一段。
              setIsSearching(true);
              const result = await getCommPrompts(1, 12, "upvoteDifference", "desc", searchName, { force });
              if (cancelled) return;
              const communityPrompts = Array.isArray(result) ? result[0] : [];
              if (communityPrompts.length > 0) {
                startTransition(() => setFilteredCommus(communityPrompts));
                // 降级搜索成功 → 这一轮搜索整体成功
                setSearchFailed(false);
              } else {
                // 公开搜索没命中，但本地收藏那一路查找失败过 → 这一轮根本没搜全，
                // 结果为空就不能说「没有找到匹配的提示词」。
                setSearchFailed(localLookupFailed);
              }
            } catch (err) {
              // 降级搜索是本次查询【唯一】的结果来源（精选与本地收藏都已确认无结果）。
              // 它失败 = 搜索失败，不是「没有匹配项」——继续让它落回 NoResults，
              // 就是拿一次网络故障冒充「没搜到」。这里必须立失败标记。
              console.error("Community fallback search failed:", err);
              // 被更新的查询取代时必须丢弃：否则这一轮的失败会落到**新查询**头上，
              // 把已经成功的新结果盖成「加载数据失败」（与本文件其他异步写入同一守卫）。
              if (cancelled) return;
              setSearchFailed(true);
            }
            return;
          }
        } else if (searchMode === "myfavor") {
          if (userAuth?.data?.favorites) {
            const data = await searchCardsLocally(selectedTags, searchName, currentLanguage, operator);
            if (cancelled) return;
            const favoriteCards = userAuth.data.favorites.loves ? data.filter((card) => userAuth.data.favorites.loves.includes(card.id)) : [];
            startTransition(() => setFilteredCards(favoriteCards));

            let commus: any[] = [];
            if (userAuth.data.favorites.commLoves) {
              commus = await getPrompts("commus", userAuth.data.favorites.commLoves);
              if (cancelled) return;
            }
            const filtered = commus.filter((prompt) => matchesSearch(prompt, searchLower));
            startTransition(() => setFilteredCommus(filtered));
          } else {
            startTransition(() => {
              if (!cancelled) {
                setFilteredCards([]);
                setFilteredCommus([]);
              }
            });
          }
        } else if (searchMode === "myprompts") {
          if (userAuth?.data?.userprompts) {
            const userprompts = await getPrompts("userprompts", userAuth.data.userprompts);
            if (cancelled) return;
            const filtered = userprompts.filter((prompt) => matchesSearch(prompt, searchLower));
            startTransition(() => setFilteredCommus(filtered));
          } else {
            startTransition(() => {
              if (!cancelled) setFilteredCommus([]);
            });
          }
        }

        // 三个模式都跑完 = 这一轮搜索成功，清掉失败标记。
        // 必须放在模式分发之外：只写在 default 分支里的话，myfavor/myprompts 一旦立起
        // 标志就再也消不掉——失败态会永久盖在正常结果上，点重试也清不掉。
        setSearchFailed(false);
      } catch (error) {
        console.error("Error fetching and filtering prompts:", error);
        if (!cancelled) {
          // 标记失败：空数组会被渲染成「没有找到匹配的提示词」，那是谎报
          setSearchFailed(true);
          startTransition(() => {
            setFilteredCards([]);
            setFilteredCommus([]);
          });
        }
      }
    }
    fetchAndFilterUsers().finally(() => {
      // 只作废「本次」run 的收尾：被更新的搜索/筛选取代时，新 run 已经自己把旗标立起来了。
      if (!cancelled) setIsSearching(false);
    });
    return () => {
      cancelled = true;
    };
  }, [selectedTags, searchName, operator, currentLanguage, searchMode, retryNonce, userAuth?.data?.userprompts, userAuth?.data?.favorites?.loves, userAuth?.data?.favorites?.commLoves]);

  const isFiltered = selectedTags.length > 0 || searchName !== null;

  // retry：失败态的唯一出路。同一搜索词重新提交是 no-op（SearchBar.handleSearch 不 push），
  // 所以失败后必须有一条能真正重发请求的路。
  const retry = useCallback(() => {
    retryForceRef.current = true;
    // 重试自己立旗标：下面 effect 里的「每次重跑都立」已经删掉了（无关重跑会把结果表
    // 换成骨架屏），但点重试确实开始了一次新查询，这一帧要有「在跑」的反馈。
    setIsSearching(true);
    setRetryNonce((n) => n + 1);
  }, []);

  return { filteredCommus, filteredCards, isFiltered, isSearching, searchFailed, retry };
}

/**
 * 「清除筛选」的唯一定义，供筛选栏与无结果空状态共用。
 * 两处曾各算各的：筛选栏只数标签、空状态数标签+关键词，同屏出现两个同名按钮却显示不同数字。
 * 计数与清除范围必须是同一件事，所以合并到这里。
 */
export function useClearFilters() {
  const location = useLocation();
  const history = useHistory();

  const activeFilterCount = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.getAll("tags").length + (params.get(SearchNameQueryKey) ? 1 : 0);
  }, [location.search]);

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete("tags");
    params.delete(SearchNameQueryKey);
    params.delete("operator");
    history.push({ ...location, search: params.toString() });
  }, [location, history]);

  return { activeFilterCount, clearFilters };
}

interface SearchBarProps {
  beforeSearch?: (value: string | null) => boolean | void;
}

function SearchBar({ beforeSearch }: SearchBarProps) {
  const history = useHistory();
  const location = useLocation<UserState>();
  const [value, setValue] = useState<string | null>(null);
  const inputRef = React.useRef<any>(null);

  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);

  useEffect(() => {
    if (location.state?.focusedElementId === "searchbar" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.state]);

  // Ctrl+K / ⌘K 聚焦搜索框（终端 command palette 惯例，与 suffix 键帽提示对应）
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSearch = useCallback(() => {
    if (beforeSearch && beforeSearch(value) === false) {
      return;
    }
    // 避免重复 push：清空搜索时 effect 会因 handleSearch 重建而二次触发，
    // 若搜索词没变就跳过，防止产生重复历史记录（用户按返回键需按两次）。
    //
    // 只比对 name 参数本身，不比对整个 query 串——handleSearch 唯一改动的就是它，
    // 而 delete + set 会把 name 挪到参数列表末尾，串比较在 URL 还带 tags 等参数时
    // 必然不等（"name=a&tags=b" vs "tags=b&name=a"），守卫会静默失效。
    const nextName = value || null;
    if (readSearchName(location.search) === nextName) {
      return;
    }

    const newSearch = new URLSearchParams(location.search);
    newSearch.delete(SearchNameQueryKey);
    if (nextName) {
      newSearch.set(SearchNameQueryKey, nextName);
    }
    history.push({
      ...location,
      search: newSearch.toString(),
      state: prepareUserState(),
    });
  }, [value, location, history, beforeSearch]);

  useEffect(() => {
    if (value === "") {
      handleSearch();
    }
  }, [value, handleSearch]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchInput}>
      <Input
        ref={inputRef}
        id="searchbar"
        // 只留示例词：`>` 和放大镜已说明是搜索框，加前缀后任何语言都会被截断
        placeholder={translate({
          message: "写作、翻译…",
          id: "input.search.placeholder",
        })}
        value={value ?? undefined}
        onChange={handleInput}
        onPressEnter={handleSearch}
        onKeyDown={(e) => {
          // Esc 退出聚焦（终端惯例，与 Ctrl+K 进入对应）。
          // isComposing 守卫：拼音输入中按 Esc 是取消 IME 候选词，焦点必须留在框内
          if (e.key === "Escape" && !e.nativeEvent.isComposing) (e.target as HTMLInputElement).blur();
        }}
        allowClear
        prefix={
          <span className={styles.promptChar} aria-hidden>
            &gt;
            <span className={styles.fakeCaret} />
          </span>
        }
        suffix={
          <>
            <kbd className={`${styles.kbdHint} hideOnSmallScreen`} aria-hidden>
              CTRL K
            </kbd>
            <Button icon={<SearchOutlined />} onClick={handleSearch} type="text" aria-label={translate({ id: "search.submit", message: "搜索" })} />
          </>
        }
      />
    </div>
  );
}

export default SearchBar;
