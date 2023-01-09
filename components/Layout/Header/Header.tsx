import { Gear, Placement } from "../Gear/Gear";

import styles from "./header.module.scss";

const DESKTOP_GEAR_PLACEMENT: Partial<Placement> = { top: "15%", right: "5%" };

export const Header = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Filip Derenowski</h1>
        <div className={styles.subheading}>Frontend developer</div>
      </div>
      <Gear placement={DESKTOP_GEAR_PLACEMENT} maxSize="70%" minSize="70%" />
    </header>
  </div>
);
