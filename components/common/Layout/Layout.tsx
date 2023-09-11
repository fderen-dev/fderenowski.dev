import { ReactElement, useRef } from "react";
import classNames from "classnames";

import { PageFade } from "components/transitions/PageFade/PageFade";

import { ScrollDetectionProvider } from "context/ScrollDetection";
import { useIsMounted } from "utils/hooks";
import { WithChildren } from "utils/types";

import styles from "./layout.module.scss";

interface MainProps extends WithChildren {
  contentWrapperClassName?: string;
  contentContainerClassName?: string;
}

const Main = ({
  children,
  contentWrapperClassName,
  contentContainerClassName,
}: MainProps) => (
  <main className={styles.main}>
    <div className={classNames(styles.contentWrapper, contentWrapperClassName)}>
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
  contentWrapperClassName?: string;
  contentContainerClassName?: string;
}

export const Layout = ({
  Navbar,
  Header,
  Footer,
  CookieBar,
  children,
  contentWrapperClassName,
  contentContainerClassName,
}: LayoutProps) => {
  const layoutRef = useRef(null);
  useIsMounted();

  return (
    <PageFade id="layout" className={styles.root} ref={layoutRef}>
        <ScrollDetectionProvider treshold={100} element={layoutRef.current!}>
          {Navbar}
          {Header}
          <Main
            contentWrapperClassName={contentWrapperClassName}
            contentContainerClassName={contentContainerClassName}
          >
            {children}
          </Main>
          {Footer}
        </ScrollDetectionProvider>
        {CookieBar}
    </PageFade>
  );
};
