import type { AppProps } from "next/app";
import Modal from "react-modal";

import { MediaQueries } from "context/MediaQueries";
import { ScrollDetectionProvider } from "context/ScrollDetection";

import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueries.Provider>
      <ScrollDetectionProvider>
        <Component {...pageProps} />
      </ScrollDetectionProvider>
    </MediaQueries.Provider>
  );
}

export default MyApp;
