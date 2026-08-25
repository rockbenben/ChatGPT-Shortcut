import React from "react";
import { Grid, SearchBar, SearchContext, SearchContextManager } from "@giphy/react-components";
import { useColorMode } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";

const GIPHY_API_KEY = "36zezehgQXZMRV6Mko784D9OEBm0UHiP";

export const GiphySelector = ({ onGifSelect, width = 450, height = 300, columns = 3, gutter = 6 }) => {
  // 主分支 colorMode.disableSwitch: true，这里恒为 dark；但**不要**简化成 darkMode: true——
  // 双色主题分支要 cherry-pick 本文件，保留 useColorMode 才不会每次都手工改回来。
  // 评论子系统其余部分（Comments.tsx → CommentForm → EmojiPickerLazy）同样是主题感知的。
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <SearchContextManager
      apiKey={GIPHY_API_KEY}
      // 面板打开先铺热门 GIF：不开的话搜索前是 300px 无说明空白，像加载失败
      shouldDefaultToTrending
      theme={{
        darkMode: isDarkMode,
        searchbarHeight: 32,
      }}>
      <div className="giphy-selector" style={{ maxWidth: width, marginInlineStart: "5px" }}>
        <SearchBar placeholder={translate({ id: "comments.gif.searchPlaceholder", message: "搜索 GIF" })} />
        <div
          style={{
            height,
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}>
          <SearchContext.Consumer>
            {({ fetchGifs, searchKey }) => (
              <Grid
                key={searchKey}
                onGifClick={(gif, e) => {
                  e.preventDefault();
                  onGifSelect(gif);
                }}
                fetchGifs={fetchGifs}
                width={width}
                columns={columns}
                gutter={gutter}
              />
            )}
          </SearchContext.Consumer>
        </div>
      </div>
    </SearchContextManager>
  );
};
