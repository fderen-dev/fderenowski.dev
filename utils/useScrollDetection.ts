import { useEffect, useRef, useState } from "react";
import noop from "lodash/noop";

import { TimeoutHandle } from "./types";
import { useIsMounted } from "./useIsMounted";

export interface ScrollData {
  isScrolling: boolean;
  scrollDirection: ScrollDirection;
}

export enum ScrollDirection {
  Up = "Up",
  Down = "Down",
}

export const useScrollDetection = (
  wait: number = 200,
  treshold: number = 0
) => {
  const [scrollData, setScrollData] = useState<ScrollData>({
    isScrolling: false,
    scrollDirection: ScrollDirection.Down,
  });
  const prevScrollY = useRef(0);
  const timeoutHandle = useRef<TimeoutHandle | null>(null);
  const isBlocked = useRef(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      prevScrollY.current = window.pageYOffset;

      const doSetTimeout = (): void => {
        timeoutHandle.current = setTimeout(() => {
          setScrollData({
            isScrolling: false,
            scrollDirection: getScrollDirection(),
          });
          doClearTimeout();
          isBlocked.current = false;
        }, wait);
      };

      const doClearTimeout = (): void => {
        if (timeoutHandle.current) {
          clearTimeout(timeoutHandle.current);
          timeoutHandle.current = null;
        }
      };

      const getScrollDirection = (): ScrollDirection => {
        let newScrollDirection = ScrollDirection.Down;
        const scrollY = window.pageYOffset;

        if (Math.abs(scrollY - prevScrollY.current) >= treshold) {
          newScrollDirection =
            scrollY > prevScrollY.current
              ? ScrollDirection.Down
              : ScrollDirection.Up;

          prevScrollY.current = scrollY > 0 ? scrollY : 0;
        }

        return newScrollDirection;
      };

      const onScroll = (): void => {
        const scrollDirection = getScrollDirection();

        if (isBlocked.current) {
          doClearTimeout();
          doSetTimeout();
        } else if (!isBlocked.current) {
          isBlocked.current = true;
          setScrollData({ isScrolling: true, scrollDirection });
          doSetTimeout();
        }
      };

      window.addEventListener("scroll", onScroll);

      return () => {
        doClearTimeout();
        window.removeEventListener("scroll", onScroll);
      };
    }

    return () => noop;
  }, [wait, treshold, isMounted]);

  return scrollData;
};
