import classNames from "classnames/bind";

import styles from "./spinner.module.scss";

type Size = "small" | "medium" | "large";

interface SpinnerProps {
  size: Size;
  className?: string;
}

const cx = classNames.bind(styles);

export const Spinner = ({ size = "medium", className }: SpinnerProps) => (
  <i className={cx(styles.spinner, size, className)}></i>
);
