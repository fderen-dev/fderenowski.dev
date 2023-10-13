import { ReactElement, useEffect, useRef } from "react";
import classNames from "classnames";
import { useOverlayScrollbars } from "overlayscrollbars-react";

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
  const scrollViewportRef = useRef<HTMLElement>(null);
  const [initialize, instance] = useOverlayScrollbars();

  useEffect(() => {
    initialize(layoutRef.current!);
    // @ts-ignore
    scrollViewportRef.current = instance()?.elements().viewport!;
  }, [initialize, instance]);

  useIsMounted();

  return (
    // TODO: find workaround for framer motion exit animations + css modules dissapearing on exit
    <div id="layout" className={styles.root} ref={layoutRef}>
      <ScrollDetectionProvider
        treshold={100}
        element={scrollViewportRef.current!}
      >
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
    </div>
  );
};
