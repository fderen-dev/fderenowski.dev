import { createContext, useContext, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

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
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });
  const state = useMemo(
    () => ({
      isDesktop,
    }),
    [isDesktop]
  );

  return (
    <MediaQueriesContext.Provider value={state}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

export const useMediaQueriesContext = () => useContext(MediaQueriesContext);
