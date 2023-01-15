import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { WithChildren } from "utils/types";

import styles from "./section.module.scss";

const cx = classNames.bind(styles);

interface SectionProps extends WithChildren {
  header?: string;
  left?: boolean;
  center?: boolean;
  right?: boolean;
  className?: string;
  headerClassName?: string;
  withIntersection?: boolean;
}

export const Section = ({
  children,
  header,
  left,
  center,
  right,
  withIntersection,
  className,
  headerClassName,
}: SectionProps) => {
  const containerRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);

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
        { threshold: 1.0 }
      );

      const disconnectObserver = (): void => {
        if (containerRef.current && observer) {
          observer.disconnect();
          observer = null;
        }
      };

      if (containerRef.current && observer) {
        observer.observe(containerRef.current);
      }

      return disconnectObserver;
    }

    return () => {};
  }, [withIntersection]);

  return (
    <section
      ref={containerRef}
      className={cx(styles.section, className, {
        left,
        center,
        right,
        inViewport: withIntersection && isInViewport,
        outOfViewport: withIntersection && !isInViewport,
      })}
    >
      {header && (
        <h2
          className={cx(styles.header, headerClassName, {
            left,
            center,
            right,
          })}
        >
          <span className={styles.headerText}>{header}</span>
        </h2>
      )}
      {children}
    </section>
  );
};