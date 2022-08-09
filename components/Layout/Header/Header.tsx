import styles from "./header.module.scss";

export const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.heading}>Filip Derenowski</h1>
    <div className={styles.subheading}>Frontend developer</div>
  </header>
);
