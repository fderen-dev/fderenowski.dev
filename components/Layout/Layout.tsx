import { ReactNode } from "react";

import { WithChildren } from "utils/types";

import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Navbar } from "./Navbar/Navbar";

import styles from "./layout.module.scss";

const Main = ({ children }: WithChildren) => (
  <main className={styles.main}>
    <div className={styles.transition} />
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </main>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>
    <Navbar />
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
);
