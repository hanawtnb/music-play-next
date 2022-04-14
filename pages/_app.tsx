import type { AppProps } from "next/app";

import { Store as Search } from "store/search";
import { Store as Song } from "store/song";
import { Store as Playlist } from "store/playlist";
import { Store as Youtube } from "store/youtube";

import "./global.scss";
import { SWRConfig } from "swr";

export default function MyApp({ Component, pageProps }: AppProps) {
  function localStorageProvider() {
    // windowはサーバーサイドには存在しないから、localstorage=undefinedのエラーが出る。
    if (typeof window !== "undefined") {
      // When initializing, we restore the data from `localStorage` into a map.
      const map = new Map(
        JSON.parse(localStorage.getItem("app-cache") || "[]")
      );

      // Before unloading the app, we write back all the data into `localStorage`.
      window.addEventListener("beforeunload", () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem("app-cache", appCache);
      });

      // We still use the map for write & read for performance.
      return map;
    }
    return new Map();
  }
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      <Youtube>
        <Song>
          <Search>
            <Playlist>
              <Component {...pageProps} />
            </Playlist>
          </Search>
        </Song>
      </Youtube>
    </SWRConfig>
  );
}
