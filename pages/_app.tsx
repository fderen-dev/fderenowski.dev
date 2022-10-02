import type { AppProps } from "next/app";
import Modal from "react-modal";

import RootProvider from "context/RootProvider";

import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
}

export default MyApp;
