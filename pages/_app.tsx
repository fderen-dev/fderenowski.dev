import type { AppProps } from "next/app";
import { MediaQueriesProvider } from "context/MediaQueries";

import "styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueriesProvider>
      <Component {...pageProps} />
    </MediaQueriesProvider>
  );
}

export default MyApp;
