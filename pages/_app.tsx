import type { AppProps } from "next/app";

import { Store } from "store/search";
import { Store as Token } from "store/token";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Token>
      <Store>
        <Component {...pageProps} />
      </Store>
    </Token>
  );
}
