import React from "react";
import { Grid, SearchBar, SearchContext, SearchContextManager } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useColorMode } from "@docusaurus/theme-common";

const GIPHY_API_KEY = "36zezehgQXZMRV6Mko784D9OEBm0UHiP";
const gf = new GiphyFetch(GIPHY_API_KEY);

export const GiphySelector = ({ onGifSelect, width = 450, height = 300, columns = 3, gutter = 6, limit = 10 }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const fetchGifs = (offset) => gf.trending({ offset, limit });

  return (
    <SearchContextManager
      apiKey={GIPHY_API_KEY}
      theme={{
        darkMode: isDarkMode,
        searchbarHeight: 32,
      }}>
      <div className="giphy-selector" style={{ maxWidth: width, marginLeft: "5px" }}>
        <SearchBar />
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
