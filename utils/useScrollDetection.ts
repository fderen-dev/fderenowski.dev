import { useEffect, useRef, useState } from "react";

import { TimeoutHandle } from "./types";

export enum ScrollDirection {
  Up = "Up",
  Down = "Down",
}

export const useScrollDetection = (
  wait: number = 300,
  treshold: number = 0
) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.Down
  );
  const isBlocking = useRef(false);
  const prevScrollY = useRef(0);
  const timeoutHandle = useRef<TimeoutHandle | null>(null);
  const animationFrameHandle = useRef<number | null>(null);

  useEffect(() => {
    prevScrollY.current = window.pageYOffset;

    const doClearTimeout = (): void => {
      if (timeoutHandle.current) {
        clearTimeout(timeoutHandle.current);
        timeoutHandle.current = null;
      }
    };

    const updateScrollDirection = (): void => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - prevScrollY.current) >= treshold) {
        const newScrollDirection =
          scrollY > prevScrollY.current
            ? ScrollDirection.Down
            : ScrollDirection.Up;

        setScrollDirection(newScrollDirection);
        prevScrollY.current = scrollY > 0 ? scrollY : 0;
      }

      isBlocking.current = false;
    };

    const onScroll = (): void => {
      setIsScrolling(true);
      doClearTimeout();
      timeoutHandle.current = setTimeout(() => {
        setIsScrolling(false);
        timeoutHandle.current = null;
      }, wait);

      if (!isBlocking.current) {
        isBlocking.current = true;
        animationFrameHandle.current = window.requestAnimationFrame(
          updateScrollDirection
        );
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      doClearTimeout();

      if (animationFrameHandle.current !== null) {
        window.cancelAnimationFrame(animationFrameHandle.current);
        animationFrameHandle.current = null;
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [wait, treshold]);

  return { isScrolling, scrollDirection };
};
