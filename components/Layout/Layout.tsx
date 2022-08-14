import { ReactNode } from "react";

import { Header } from "./Header/Header";

import styles from "./layout.module.scss";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>
    <Header />
    <main className={styles.main}>
      <div className={styles.transition} />
      <div className={styles.content}>{children}</div>
    </main>
  </div>
);
