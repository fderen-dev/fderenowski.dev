import { ReactElement } from "react";
import classNames from "classnames";

import { WithChildren } from "utils/types";

import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

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
  contentClassName?: string;
}

export const Layout = ({ Navbar, children, contentClassName }: LayoutProps) => (
  <div className={styles.root}>
    {Navbar}
    <Header />
    <Main contentClassName={contentClassName}>{children}</Main>
    <Footer />
  </div>
);
