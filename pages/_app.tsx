import type { AppProps } from "next/app";
import Modal from "react-modal";

import { CookieBar } from "components/CookieBar/CookieBar";
import { Measurement } from "components/Measurement/Measurement";

import { MediaQueries } from "context/MediaQueries";
import RootProvider from "context/RootProvider";
import { isDevMode } from "utils/utils";

import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Measurement />
      <CookieBar />
      <Component {...pageProps} />
      {isDevMode && <MediaQueries.CurrentBreakpoint />}
    </RootProvider>
  );
}

export default MyApp;
