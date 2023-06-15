import { ReactElement, useRef } from "react";
import classNames from "classnames";

import { ScrollDetectionProvider } from "context/ScrollDetection";
import { useIsMounted } from "utils/hooks";
import { WithChildren } from "utils/types";

import styles from "./layout.module.scss";

interface MainProps extends WithChildren {
  mainClassName?: string;
}

const Main = ({ children, mainClassName }: MainProps) => (
  <main className={styles.main}>
    <div className={styles.contentWrapper}>
      <div className={classNames(styles.content, mainClassName)}>
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
  mainClassName?: string;
}

export const Layout = ({
  Navbar,
  Header,
  Footer,
  CookieBar,
  children,
  mainClassName,
}: LayoutProps) => {
  const layoutRef = useRef(null);
  useIsMounted();

  return (
    <div id="layout" className={styles.root} ref={layoutRef}>
      <ScrollDetectionProvider treshold={100} element={layoutRef.current!}>
        {Navbar}
        {Header}
        <Main mainClassName={mainClassName}>{children}</Main>
        {Footer}
      </ScrollDetectionProvider>
      {CookieBar}
    </div>
  );
};
