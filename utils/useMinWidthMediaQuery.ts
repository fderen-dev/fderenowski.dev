import { useEffect, useState } from "react";

export const useMinWidthMediaQuery = (minWidth: number) => {
  const [isMinWidthReached, setIsMinWidthReached] = useState(false);

  useEffect(() => {
    const updateIsMinWidthReached = (event: MediaQueryListEvent) => {
      setIsMinWidthReached(event.matches);
    };
    const media = window.matchMedia(`(min-width:${minWidth}px)`);
    media.addEventListener("change", updateIsMinWidthReached);

    if (media.matches) {
      setIsMinWidthReached(true);
    }

    return () => media.removeEventListener("change", updateIsMinWidthReached);
  }, [minWidth]);

  return isMinWidthReached;
};
