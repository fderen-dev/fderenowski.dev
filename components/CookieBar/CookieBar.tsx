import CookieConsent from "react-cookie-consent";

import { Button } from "components/common/Button/Button";

import { isDevMode } from "utils/utils";

import styles from "./cookieBar.module.scss";

export const CookieBar = () => (
  <CookieConsent
    overlay
    acceptOnOverlayClick
    enableDeclineButton
    disableStyles
    flipButtons
    buttonText="Accept"
    declineButtonText="Decline"
    cookieName="cookieConsent"
    debug={isDevMode}
    expires={365}
    ButtonComponent={Button}
    customButtonProps={{
      className: styles.button,
    }}
    customDeclineButtonProps={{
      className: styles.button,
      variant: "secondary",
    }}
    containerClasses={styles.container}
    contentClasses={styles.content}
    overlayClasses={styles.overlay}
    buttonWrapperClasses={styles.buttonContainer}
  >
    I am collecting trafic data with Google Analytics. Your consent will be
    appreciated.
  </CookieConsent>
);
