import { useEffect, useState } from "react";

export const useMinWidthMediaQuery = (
  minWidthPx: number,
  maxWidthPx?: number
) => {
  const [isMinWidthReached, setIsMinWidthReached] = useState(false);

  useEffect(() => {
    const updateIsMinWidthReached = (event: MediaQueryListEvent) => {
      setIsMinWidthReached(event.matches);
    };
    const minWidthQuery = `(min-width:${minWidthPx}px)`;
    const andMaxWidthQuery = maxWidthPx
      ? `and (max-width:${maxWidthPx}px)`
      : "";
    const media = window.matchMedia(`${minWidthQuery}${andMaxWidthQuery}`);
    media.addEventListener("change", updateIsMinWidthReached);

    if (media.matches) {
      setIsMinWidthReached(true);
    }

    return () => media.removeEventListener("change", updateIsMinWidthReached);
  }, [minWidthPx, maxWidthPx]);

  return isMinWidthReached;
};
