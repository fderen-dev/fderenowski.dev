import { createContext, useContext, useMemo } from "react";

import { WithChildren } from "utils/types";
import {
  initialScrollData,
  ScrollData,
  useScrollDetection,
} from "utils/useScrollDetection";

const ScrollDetectionContext = createContext<ScrollData>(initialScrollData);

interface ScrollDetectionProvideProps extends WithChildren {
  element: HTMLElement;
  treshold: number;
}

export const ScrollDetectionProvider = ({
  element,
  treshold,
  children,
}: ScrollDetectionProvideProps) => {
  const { prevIsScrolling, isScrolling, scrollDirection } = useScrollDetection(
    element,
    treshold
  );

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
