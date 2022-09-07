import { ReactNode } from "react";

import { Footer } from "./Footer/Footer";
import { Gear, Placement, ResponsivePlacement } from "./Gear/Gear";
import { Header } from "./Header/Header";
import { Navbar } from "./Navbar/Navbar";

import styles from "./layout.module.scss";

const DESKTOP_GEAR_PLACEMENT: Placement = { top: "10vh", left: "60%" };
const RESPONSIVE_GEAR_PLACEMENT: ResponsivePlacement = {
  mobiles: { top: "25vh", left: "60%" },
  desktop: DESKTOP_GEAR_PLACEMENT,
};

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>
    <Navbar />
    <Header />
    <main className={styles.main}>
      <div className={styles.transition} />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Gear
            placement={DESKTOP_GEAR_PLACEMENT}
            responsivePlacement={RESPONSIVE_GEAR_PLACEMENT}
          />
          {children}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);
