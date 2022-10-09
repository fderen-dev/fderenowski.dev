import { createContext, useContext, useMemo } from "react";

import { WithChildren } from "utils/types";
import {
  initialScrollData,
  ScrollData,
  useScrollDetection,
} from "utils/useScrollDetection";

const ScrollDetectionContext = createContext<ScrollData>(initialScrollData);

export const ScrollDetectionProvider = ({ children }: WithChildren) => {
  const { prevIsScrolling, isScrolling, scrollDirection } =
    useScrollDetection(100);

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
