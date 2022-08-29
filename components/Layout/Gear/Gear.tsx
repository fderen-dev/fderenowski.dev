import { FC } from "react";
import classNames from "classnames/bind";

import { ScrollDirection, useScrollDetection } from "utils/useScrollDetection";

import GearImage from "../../../public/static/gear.svg";

import styles from "./gear.module.scss";

const cx = classNames.bind(styles);

interface GearProps {
  top?: string;
  left?: string;
}

export const Gear: FC<GearProps> = ({ top = "10%", left = "60%" }) => {
  const { isScrolling, scrollDirection } = useScrollDetection(100);

  return (
    <GearImage
      width="20%"
      alt="Spinning gear"
      className={cx(styles.gear, {
        paused: !isScrolling,
        running: isScrolling,
        up: scrollDirection === ScrollDirection.Up,
        down: scrollDirection === ScrollDirection.Down,
      })}
      style={{ top, left }}
    />
  );
};
