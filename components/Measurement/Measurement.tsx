import Script from "next/script";

import { isDevMode } from "utils/utils";

export const Measurement = () => {
  const gaMeasurementId = isDevMode
    ? process.env.NEXT_STATIC_GA_DEV
    : process.env.NEXT_STATIC_GA_PROD;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};
