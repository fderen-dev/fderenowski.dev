import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Modal from "react-modal";

import { Measurement } from "components/Measurement/Measurement";

import { MediaQueries } from "context/MediaQueries";
import RootProvider from "context/RootProvider";
import { isDevMode } from "utils/utils";

import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <AnimatePresence
        mode="sync"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
      <Measurement />
      {isDevMode && <MediaQueries.CurrentBreakpoint />}
    </RootProvider>
  );
}

export default MyApp;
