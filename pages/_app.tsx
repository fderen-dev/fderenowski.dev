import type { AppProps } from "next/app";
import Modal from "react-modal";

import { MediaQueriesProvider } from "context/MediaQueries";

import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueriesProvider>
      <Component {...pageProps} />
    </MediaQueriesProvider>
  );
}

export default MyApp;
