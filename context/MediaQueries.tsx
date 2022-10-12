import { createContext, useContext, useMemo } from "react";

import { WithChildren } from "utils/types";
import { useMinWidthMediaQuery } from "utils/useMinWidthMediaQuery";

import variables from "styles/exports.module.scss";

const minDesktopWidth = parseInt(variables.MIN_DESKTOP_WIDTH);
const minTabletWidth = parseInt(variables.MIN_TABLET_WIDTH);

interface MediaQueriesValue {
  isDesktop: boolean;
  isTablet: boolean;
  isTabletAndAbove: boolean;
}

const MediaQueriesContext = createContext<MediaQueriesValue>(undefined!);

interface MediaQueriesProviderProps {
  children: React.ReactNode;
}

const MediaQueriesProvider = ({ children }: MediaQueriesProviderProps) => {
  const isTablet = useMinWidthMediaQuery(
    minTabletWidth,
    minDesktopWidth - 0.01
  );
  const isTabletAndAbove = useMinWidthMediaQuery(minTabletWidth);
  const isDesktop = useMinWidthMediaQuery(minDesktopWidth);

  const value = useMemo(
    () => ({
      isTablet,
      isTabletAndAbove,
      isDesktop,
    }),
    [isTablet, isTabletAndAbove, isDesktop]
  );

  return (
    <MediaQueriesContext.Provider value={value}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

const ForMobile = ({ children }: WithChildren) => {
  const { isTabletAndAbove } = useMediaQueriesContext();

  return <>{isTabletAndAbove ? null : children}</>;
};

const ForTabletAndAbove = ({ children }: WithChildren) => {
  const { isTabletAndAbove } = useMediaQueriesContext();

  return <>{isTabletAndAbove ? children : null}</>;
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
  ForMobile,
  ForTabletAndAbove,
  ForDesktop,
  NotForDesktop,
};

export const useMediaQueriesContext = () => useContext(MediaQueriesContext);
