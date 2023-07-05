import { ReactElement, useRef } from "react";
import classNames from "classnames";

import { ScrollDetectionProvider } from "context/ScrollDetection";
import { useIsMounted } from "utils/hooks";
import { WithChildren } from "utils/types";

import styles from "./layout.module.scss";

interface MainProps extends WithChildren {
  contentContainerClassName?: string;
}

const Main = ({ children, contentContainerClassName }: MainProps) => (
  <main className={styles.main}>
    <div className={styles.contentWrapper}>
      <div className={classNames(styles.content, contentContainerClassName)}>
        {children}
      </div>
    </div>
  </main>
);

interface LayoutProps extends WithChildren {
  Navbar?: ReactElement;
  Header?: ReactElement;
  Footer?: ReactElement;
  CookieBar?: ReactElement;
  contentContainerClassName?: string;
}

export const Layout = ({
  Navbar,
  Header,
  Footer,
  CookieBar,
  children,
  contentContainerClassName,
}: LayoutProps) => {
  const layoutRef = useRef(null);
  useIsMounted();

  return (
    <div id="layout" className={styles.root} ref={layoutRef}>
      <ScrollDetectionProvider treshold={100} element={layoutRef.current!}>
        {Navbar}
        {Header}
        <Main contentContainerClassName={contentContainerClassName}>
          {children}
        </Main>
        {Footer}
      </ScrollDetectionProvider>
      {CookieBar}
    </div>
  );
};
