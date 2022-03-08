import type { AppProps } from "next/app";

import { Store } from "store/search";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  );
}
