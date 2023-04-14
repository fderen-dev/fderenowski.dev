import { Content } from "@prismicio/client";
import CookieConsent from "react-cookie-consent";

import { Button } from "components/common/Button/Button";

import { isDevMode } from "utils/utils";

import styles from "./cookieBar.module.scss";

interface CookieBarProps {
  prismicDocumentData: Content.CookiebarDocumentData;
}

export const CookieBar = ({ prismicDocumentData }: CookieBarProps) => {
  const {
    acceptbuttontext = "Accept",
    declinebuttontext = "Decline",
    expirationtimeindays = 365,
    content = "I am collecting trafic data with Google Analytics. Your consent will be appreciated.",
  } = prismicDocumentData;

  return (
    <CookieConsent
      overlay
      acceptOnOverlayClick
      enableDeclineButton
      disableStyles
      flipButtons
      buttonText={acceptbuttontext}
      declineButtonText={declinebuttontext}
      cookieName="cookieConsent"
      debug={isDevMode}
      expires={expirationtimeindays!}
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
      {content}
    </CookieConsent>
  );
};
