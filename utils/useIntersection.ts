import { MutableRefObject, useEffect, useState } from "react";

export const useIntersection = <Element extends HTMLElement>(
  elementRef: MutableRefObject<Element | null>,
  threshold = 1.0,
  withIntersection = true
) => {
  const [isInViewport, setIsInViewport] = useState(!withIntersection);

  useEffect(() => {
    if (withIntersection) {
      const onIntersection: IntersectionObserverCallback = (entries): void => {
        if (entries[0].isIntersecting) {
          setIsInViewport(true);
          disconnectObserver();
        }
      };
      let observer: IntersectionObserver | null = new IntersectionObserver(
        onIntersection,
        { threshold }
      );

      const disconnectObserver = (): void => {
        if (elementRef.current && observer) {
          observer.disconnect();
          observer = null;
        }
      };

      if (elementRef.current && observer) {
        observer.observe(elementRef.current);
      }

      return disconnectObserver;
    }

    return () => {};
  }, [withIntersection]);

  return isInViewport;
};
