import GearImage from "../../../public/static/gear.svg";

import styles from "./footer.module.scss";

export const Footer = () => (
  <div className={styles.container}>
    <footer className={styles.footer}>
      {/* TODO: replace with actual logo */}
      <GearImage
        width="75px"
        height="75px"
        alt="Logo"
        className={styles.logo}
      />
      <div className={styles.right}>
        <div className={styles.copyright}>2022 - present Filip Derenowski</div>
        <div className={styles.links}>
          <a>Gmail</a>
          <a>LinkedIn</a>
          <a>Github</a>
        </div>
      </div>
    </footer>
  </div>
);
