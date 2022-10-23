import { Gear, Placement, ResponsivePlacement } from "../Gear/Gear";

import styles from "./header.module.scss";

const DESKTOP_GEAR_PLACEMENT: Partial<Placement> = { top: "10vh", right: "10%" };
const RESPONSIVE_GEAR_PLACEMENT: ResponsivePlacement = {
  mobiles: { top: "30%", right: "10%" },
  desktop: DESKTOP_GEAR_PLACEMENT,
};

export const Header = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Filip Derenowski</h1>
        <div className={styles.subheading}>Frontend developer</div>
      </div>
      <Gear
        placement={DESKTOP_GEAR_PLACEMENT}
        responsivePlacement={RESPONSIVE_GEAR_PLACEMENT}
      />
    </header>
  </div>
);
