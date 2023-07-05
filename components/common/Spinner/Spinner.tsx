import classNames from "classnames/bind";

import styles from "./spinner.module.scss";

type Size = "small" | "medium" | "big" | "large";
type Color = "black" | "yellow";

interface SpinnerProps {
  size?: Size;
  color?: Color;
  className?: string;
}

const cx = classNames.bind(styles);

export const Spinner = ({
  size = "medium",
  color = "black",
  className,
}: SpinnerProps) => (
  <i className={cx(styles.spinner, size, color, className)}></i>
);
