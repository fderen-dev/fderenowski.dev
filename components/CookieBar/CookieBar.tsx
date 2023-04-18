import { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import CookieConsent from "react-cookie-consent";

import { Button } from "components/common/Button/Button";

import { useIsMounted } from "utils/useIsMounted";
import { isDevMode, setBodyScroll } from "utils/utils";

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
  const cookieConsentRef = useRef<CookieConsent | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      const isCookieBarVisible =
        cookieConsentRef.current && cookieConsentRef.current.state.visible;

      if (isCookieBarVisible) {
        setBodyScroll(false);
      }
    }
  }, [isMounted]);

  const enableBodyScroll = () => {
    setBodyScroll(true);
  };

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
      // debug={isDevMode}
      expires={expirationtimeindays!}
      onAccept={enableBodyScroll}
      onDecline={enableBodyScroll}
      onOverlayClick={enableBodyScroll}
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
      ref={cookieConsentRef}
    >
      {content}
    </CookieConsent>
  );
};
