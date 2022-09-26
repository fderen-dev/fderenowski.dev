import { createContext, useContext } from "react";

import { useMinWidthMediaQuery } from "utils/useMinWidthMediaQuery";

interface MediaQueriesValue {
  isDesktop: boolean;
}

const MediaQueriesContext = createContext<MediaQueriesValue>(undefined!);

interface MediaQueriesProviderProps {
  children: React.ReactNode;
}

export const MediaQueriesProvider = ({
  children,
}: MediaQueriesProviderProps) => {
  const isDesktop = useMinWidthMediaQuery(992);

  return (
    <MediaQueriesContext.Provider value={{ isDesktop }}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

export const useMediaQueriesContext = () => useContext(MediaQueriesContext);
