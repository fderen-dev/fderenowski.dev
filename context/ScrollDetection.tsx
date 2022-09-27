import { createContext, useContext } from "react";

import {
  ScrollData,
  ScrollDirection,
  useScrollDetection,
} from "utils/useScrollDetection";

const initialScrollData: ScrollData = {
  scrollDirection: ScrollDirection.Down,
  isScrolling: false,
};

const ScrollDetectionContext = createContext<ScrollData>(initialScrollData);

export const ScrollDetectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const scrollInfo = useScrollDetection(100);

  return (
    <ScrollDetectionContext.Provider value={scrollInfo}>
      {children}
    </ScrollDetectionContext.Provider>
  );
};

export const useScrollDetectionContext = () =>
  useContext(ScrollDetectionContext);
