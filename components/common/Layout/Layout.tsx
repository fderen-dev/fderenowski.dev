import { ReactElement } from "react";
import classNames from "classnames";

import { WithChildren } from "utils/types";

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
}: LayoutProps) => (
  <div id="layout" className={styles.root}>
    {Navbar}
    {Header}
    <Main contentClassName={contentClassName}>{children}</Main>
    {Footer}
  </div>
);
