import classNames from "classnames/bind";

import { WithChildren } from "utils/types";

import styles from "./section.module.scss";

const cx = classNames.bind(styles);

interface SectionProps extends WithChildren {
  right?: boolean;
  left?: boolean;
  className?: string;
}

export const Section = ({ children, right, left, className }: SectionProps) => (
  <section className={cx(styles.section, className, { right, left })}>
    {children}
  </section>
);
