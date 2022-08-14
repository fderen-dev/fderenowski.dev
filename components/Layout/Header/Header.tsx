import styles from "./header.module.scss";

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headingContainer}>
      <h1 className={styles.heading}>Filip Derenowski</h1>
      <div className={styles.subheading}>Frontend developer</div>
    </div>
  </header>
);
