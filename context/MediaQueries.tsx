import { createContext, useContext, useMemo, useState } from "react";

import { useMinWidthMediaQuery } from "utils/hooks";
import { WithChildren } from "utils/types";

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

const currentBreakpointIndicatorStyle: React.CSSProperties = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  fontSize: "22px",
  fontWeight: "700",
  backgroundColor: "black",
  color: "white",
  textTransform: "uppercase",
  zIndex: 999,
  cursor: "pointer",
  overflow: "hidden",
  userSelect: "none",
};

enum Breakpoint {
  MOBILE = "Mobile",
  TABLET = "Tablet",
  DESKTOP = "Desktop",
}

function getCurrentBreakpointLabel(
  isTablet: boolean,
  isDesktop: boolean
): Breakpoint {
  if (!isTablet && !isDesktop) {
    return Breakpoint.MOBILE;
  }

  if (isTablet) {
    return Breakpoint.TABLET;
  }

  return Breakpoint.DESKTOP;
}

interface CurrentBreakpointProps {
  bottom?: string;
  right?: string;
  opacity?: number;
}

const CurrentBreakpoint = ({
  bottom = "10px",
  right = "10px",
  opacity = 0.5,
}: CurrentBreakpointProps) => {
  const { isTablet, isDesktop } = useMediaQueriesContext();
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleIsMinimized = () => setIsMinimized((prev) => !prev);
  const label = getCurrentBreakpointLabel(isTablet, isDesktop);

  return (
    <div
      onClick={toggleIsMinimized}
      style={{
        ...currentBreakpointIndicatorStyle,
        bottom,
        right,
        opacity,
        maxHeight: isMinimized ? "25px" : "1000px",
        maxWidth: isMinimized ? "25px" : "1000px",
        padding: isMinimized ? "0" : "25px 50px",
        borderRadius: isMinimized ? "25px" : "0",
        width: isMinimized ? "100%" : "unset",
        height: isMinimized ? "100%" : "unset",
      }}
    >
      {isMinimized ? label[0] : label}
    </div>
  );
};

export const MediaQueries = {
  Provider: MediaQueriesProvider,
  CurrentBreakpoint,
  ForMobile,
  ForTabletAndAbove,
  ForDesktop,
  NotForDesktop,
};

export const useMediaQueriesContext = () => useContext(MediaQueriesContext);
