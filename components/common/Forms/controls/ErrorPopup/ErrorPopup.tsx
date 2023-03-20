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
  const [isHidden, setIsHidden] = useState(!show);

  useEffect(() => {
    if (TypeTools.isNonEmptyString(messageProp)) {
      setMessage(messageProp);
    }
  }, [messageProp]);

  useEffect(() => {
    setIsHidden(!show);
  }, [show]);

  const visible = show && !isHidden;

  return (
    <FadeInAndOut isTriggered={visible}>
      <div className={classNames(styles.errorPopup, popupClass)}>
        <button aria-label="Dismiss validation error message" onClick={() => setIsHidden(true)} className={styles.dismissButton}>x</button>
        <p className={styles.errorMessage}>{message}</p>
      </div>
    </FadeInAndOut>
  );
};
