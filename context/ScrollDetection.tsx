import { createContext, useContext, useMemo } from "react";

import {
  initialScrollData,
  ScrollData,
  useScrollDetection,
} from "utils/useScrollDetection";

const ScrollDetectionContext = createContext<ScrollData>(initialScrollData);

export const ScrollDetectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { prevIsScrolling, isScrolling, scrollDirection } =
    useScrollDetection(100);

  // FIXME: value consumer receives is different from one passed to provider
  const value = useMemo(
    () => ({
      prevIsScrolling,
      isScrolling,
      scrollDirection,
    }),
    [prevIsScrolling, isScrolling, scrollDirection]
  );

  return (
    <ScrollDetectionContext.Provider value={value}>
      {children}
    </ScrollDetectionContext.Provider>
  );
};

export const useScrollDetectionContext = () =>
  useContext(ScrollDetectionContext);
