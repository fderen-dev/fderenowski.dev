import { Gear, Placement } from "../Gear/Gear";

import styles from "./header.module.scss";

const DESKTOP_GEAR_PLACEMENT: Partial<Placement> = {
  top: "0",
  bottom: "0",
  right: "20%",
};
const GEAR_STYLE: React.CSSProperties = {
  marginTop: "auto",
  marginBottom: "auto",
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
        style={GEAR_STYLE}
        maxSize="70%"
      />
    </header>
  </div>
);
