import { ReactElement } from "react";
import classNames from "classnames";

import { WithChildren } from "utils/types";

import { ScrollContainer } from "./ScrollContainer/ScrollContainer";

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
  return (
    // TODO: find workaround for framer motion exit animations + css modules dissapearing on exit
    <ScrollContainer id="layout" className={styles.root}>
      {Navbar}
      {Header}
      <Main
        contentWrapperClassName={contentWrapperClassName}
        contentContainerClassName={contentContainerClassName}
      >
        {children}
      </Main>
      {Footer}
    {CookieBar}
    </ScrollContainer>
  );
};
