import type { AppProps } from "next/app";
import Modal from "react-modal";

import { MediaQueriesProvider } from "context/MediaQueries";
import { ScrollDetectionProvider } from "context/ScrollDetection";

import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueriesProvider>
      <ScrollDetectionProvider>
        <Component {...pageProps} />
      </ScrollDetectionProvider>
    </MediaQueriesProvider>
  );
}

export default MyApp;
