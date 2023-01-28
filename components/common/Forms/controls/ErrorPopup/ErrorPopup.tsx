import classNames from "classnames";

import { FadeInAndOut } from "components/transitions/FadeInAndOut/FadeInAndOut";

import { TypeTools } from "utils/TypeTools";

import styles from "./errorPopup.module.scss";

interface ErrorPopupProps {
  message: string;
  popupClass?: string;
}

export const ErrorPopup = ({ message, popupClass }: ErrorPopupProps) => {
  const isTriggered = TypeTools.isNonEmptyString(message);

  return (
    <FadeInAndOut isTriggered={isTriggered}>
      <div className={classNames(styles.errorPopup, popupClass)}>
        <p className={styles.errorMessage}>{message}</p>
      </div>
    </FadeInAndOut>
  );
};
