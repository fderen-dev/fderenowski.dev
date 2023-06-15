import { useRef } from "react";
import classNames from "classnames/bind";

import { useIntersection } from "utils/hooks";
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
  const isInViewport = useIntersection(containerRef, 1.0, withIntersection);

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
