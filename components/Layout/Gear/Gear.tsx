import { FC } from "react";
import classNames from "classnames/bind";

import { ScrollDirection, useScrollDetection } from "utils/useScrollDetection";

import GearImage from "../../../public/static/gear.svg";

import styles from "./gear.module.scss";

const cx = classNames.bind(styles);

interface GearProps {
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  className?: string;
}

export const Gear: FC<GearProps> = ({
  top = "10%",
  left = "60%",
  width = "20vw",
  height = "20vw",
  className,
}) => {
  const { isScrolling, scrollDirection } = useScrollDetection(100);

  return (
    <GearImage
      width={width}
      height={height}
      alt="Spinning gear"
      className={cx(styles.gear, className, {
        paused: !isScrolling,
        running: isScrolling,
        up: scrollDirection === ScrollDirection.Up,
        down: scrollDirection === ScrollDirection.Down,
      })}
      style={{ top, left }}
    />
  );
};
