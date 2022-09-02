import { FC } from "react";
import classNames from "classnames/bind";

import { ScrollDirection, useScrollDetection } from "utils/useScrollDetection";

import GearImage from "../../../public/static/gear.svg";

import styles from "./gear.module.scss";

const cx = classNames.bind(styles);

interface GearProps {
  maxSize?: string;
  minSize?: string;
  top?: string;
  left?: string;
  className?: string;
}

export const Gear: FC<GearProps> = ({
  top = "10vh",
  left = "60%",
  maxSize = "20%",
  minSize = "150px",
  className,
}) => {
  const { isScrolling, scrollDirection } = useScrollDetection(100);

  return (
    <GearImage
      width="100%"
      height="100%"
      alt="Spinning gear"
      className={cx(styles.gear, className, {
        paused: !isScrolling,
        running: isScrolling,
        up: scrollDirection === ScrollDirection.Up,
        down: scrollDirection === ScrollDirection.Down,
      })}
      style={{
        top,
        left,
        minWidth: minSize,
        minHeight: minSize,
        maxWidth: maxSize,
        maxHeight: maxSize,
      }}
    />
  );
};
