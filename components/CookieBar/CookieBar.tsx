import CookieConsent from "react-cookie-consent";

export const CookieBar = () => (
  <CookieConsent
    debug
    overlay
    acceptOnOverlayClick
    enableDeclineButton
    location="bottom"
    buttonText="Accept"
    declineButtonText="Decline"
    cookieName="cookieConsent"
    style={{ background: "#333", color: "#fff" }}
    buttonStyle={{ background: "#FA9D1C", color: "#fff", fontSize: "13px" }}
    expires={365}
  >
    I am collecting trafic data with Google Analytics. Your consent will be
    appreciated.
  </CookieConsent>
);
