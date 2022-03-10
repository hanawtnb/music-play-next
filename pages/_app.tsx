import type { AppProps } from "next/app";

import { Store as Search } from "store/search";
import { Store as Token } from "store/token";
import { Store as Song } from "store/song";

import "./global.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Song>
      <Token>
        <Search>
          <Component {...pageProps} />
        </Search>
      </Token>
    </Song>
  );
}
