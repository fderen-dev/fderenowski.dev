import { useEffect, useState } from "react";
import classNames from "classnames";

import { FadeInAndOut } from "components/transitions/FadeInAndOut/FadeInAndOut";

import { TypeTools } from "utils/TypeTools";

import styles from "./errorPopup.module.scss";

interface ErrorPopupProps {
  show: boolean;
  message: string;
  popupClass?: string;
}

export const ErrorPopup = ({
  show,
  message: messageProp,
  popupClass,
}: ErrorPopupProps) => {
  const [message, setMessage] = useState(messageProp);

  useEffect(() => {
    if (TypeTools.isNonEmptyString(messageProp)) {
      setMessage(messageProp);
    }
  }, [messageProp]);

  return (
    <FadeInAndOut isTriggered={show}>
      <div className={classNames(styles.errorPopup, popupClass)}>
        <p className={styles.errorMessage}>{message}</p>
      </div>
    </FadeInAndOut>
  );
};
