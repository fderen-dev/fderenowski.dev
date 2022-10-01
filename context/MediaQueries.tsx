import { createContext, useContext } from "react";

import { WithChildren } from "utils/types";
import { useMinWidthMediaQuery } from "utils/useMinWidthMediaQuery";

interface MediaQueriesValue {
  isDesktop: boolean;
}

const MediaQueriesContext = createContext<MediaQueriesValue>(undefined!);

interface MediaQueriesProviderProps {
  children: React.ReactNode;
}

const MediaQueriesProvider = ({ children }: MediaQueriesProviderProps) => {
  const isDesktop = useMinWidthMediaQuery(992);

  return (
    <MediaQueriesContext.Provider value={{ isDesktop }}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

const ForDesktop = ({ children }: WithChildren) => {
  const { isDesktop } = useMediaQueriesContext();

  return <>{isDesktop ? children : null}</>;
};

const NotForDesktop = ({ children }: WithChildren) => {
  const { isDesktop } = useMediaQueriesContext();

  return <>{isDesktop ? null : children}</>;
};

export const MediaQueries = {
  Provider: MediaQueriesProvider,
  ForDesktop,
  NotForDesktop,
};

export const useMediaQueriesContext = () => useContext(MediaQueriesContext);
