import { ReactNode } from "react";

import styles from "./layout.module.scss";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>
    <header style={{ position: "fixed", top: 0, height: "64px" }}>
      Header
    </header>
    <main className={styles.main} style={{ marginTop: "64px" }}>
      {children}
    </main>
    <footer style={{ position: "fixed", bottom: 0 }}>Footer</footer>
  </div>
);
