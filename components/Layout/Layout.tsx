import { ReactNode } from "react";

import { Header } from "./Header/Header";

import styles from "./layout.module.scss";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>
    <Header />
    <main className={styles.main}>{children}</main>
    <footer style={{ position: "fixed", bottom: 0 }}>Footer</footer>
  </div>
);
