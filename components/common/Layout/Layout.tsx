import { ReactElement, useRef } from "react";
import classNames from "classnames";

import { ScrollDetectionProvider } from "context/ScrollDetection";
import { WithChildren } from "utils/types";
import { useIsMounted } from "utils/useIsMounted";

import { TypewriterProvider } from "./Header/Typewriter/Typewriter";

import styles from "./layout.module.scss";

interface MainProps extends WithChildren {
  contentClassName?: string;
}

const Main = ({ children, contentClassName }: MainProps) => (
  <main className={styles.main}>
    <div className={styles.contentWrapper}>
      <div className={classNames(styles.content, contentClassName)}>
        {children}
      </div>
    </div>
  </main>
);

interface LayoutProps extends WithChildren {
  Navbar?: ReactElement;
  Header?: ReactElement;
  Footer?: ReactElement;
  contentClassName?: string;
}

export const Layout = ({
  Navbar,
  Header,
  Footer,
  children,
  contentClassName,
}: LayoutProps) => {
  const layoutRef = useRef(null);
  useIsMounted();

  return (
    <div id="layout" className={styles.root} ref={layoutRef}>
      <ScrollDetectionProvider treshold={100} element={layoutRef.current!}>
        {Navbar}
        {Header}
        <Main contentClassName={contentClassName}>{children}</Main>
        {Footer}
      </ScrollDetectionProvider>
    </div>
  );
};
