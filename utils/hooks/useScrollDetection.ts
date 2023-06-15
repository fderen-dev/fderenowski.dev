import { useEffect, useRef, useState } from "react";
import noop from "lodash/noop";

import { TimeoutHandle } from "../types";

export enum ScrollDirection {
  Up = "Up",
  Down = "Down",
}

export interface ScrollData {
  prevIsScrolling: boolean;
  isScrolling: boolean;
  scrollDirection: ScrollDirection;
}

export const initialScrollData: ScrollData = {
  prevIsScrolling: false,
  isScrolling: false,
  scrollDirection: ScrollDirection.Down,
};

export const useScrollDetection = (
  element: HTMLElement,
  wait: number = 200,
  treshold: number = 0
) => {
  const [scrollData, setScrollData] = useState<ScrollData>(initialScrollData);
  const prevScrollY = useRef(0);
  const isBlocked = useRef(false);

  useEffect(() => {
    if (element) {
      let timeoutHandle: TimeoutHandle | null = null;
      prevScrollY.current = element.scrollTop;

      const doSetTimeout = (): void => {
        timeoutHandle = setTimeout(() => {
          setScrollData((prev) => ({
            prevIsScrolling: prev.isScrolling,
            isScrolling: false,
            scrollDirection: getScrollDirection(),
          }));
          doClearTimeout();
          isBlocked.current = false;
        }, wait);
      };

      const doClearTimeout = (): void => {
        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
          timeoutHandle = null;
        }
      };

      const getScrollDirection = (): ScrollDirection => {
        let newScrollDirection = ScrollDirection.Down;
        const scrollY = element.scrollTop;

        if (Math.abs(scrollY - prevScrollY.current) >= treshold) {
          newScrollDirection =
            scrollY > prevScrollY.current
              ? ScrollDirection.Down
              : ScrollDirection.Up;

          prevScrollY.current = scrollY;
        }

        return newScrollDirection;
      };

      const onScroll = (): void => {
        if (isBlocked.current) {
          doClearTimeout();
          doSetTimeout();
        } else if (!isBlocked.current) {
          isBlocked.current = true;
          setScrollData((prev) => ({
            prevIsScrolling: prev.isScrolling,
            isScrolling: true,
            scrollDirection: getScrollDirection(),
          }));
          doSetTimeout();
        }
      };

      element.addEventListener("scroll", onScroll);

      return () => {
        doClearTimeout();
        element.removeEventListener("scroll", onScroll);
      };
    }

    return () => noop;
  }, [element, wait, treshold]);

  return scrollData;
};
