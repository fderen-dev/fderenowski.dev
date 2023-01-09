import classNames from "classnames";

import styles from "./errorPopup.module.scss";

interface ErrorPopupProps {
  message: string;
  popupClass?: string;
}

export const ErrorPopup = ({ message, popupClass }: ErrorPopupProps) => {
  return (
    <div className={classNames(styles.errorPopup, popupClass)}>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
};
