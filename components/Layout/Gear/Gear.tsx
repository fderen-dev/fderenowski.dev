import { FC } from "react";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";

import { ScrollDirection, useScrollDetection } from "utils/useScrollDetection";

import GearImage from "../../../public/static/gear.svg";

import styles from "./gear.module.scss";

const cx = classNames.bind(styles);

export type Placement = {
  top: string;
  left: string;
};

export type ResponsivePlacement = {
  mobiles: Placement;
  desktop: Placement;
};

interface GearProps {
  maxSize?: string;
  minSize?: string;
  placement: Placement;
  responsivePlacement?: ResponsivePlacement;
  className?: string;
}

export const Gear: FC<GearProps> = ({
  placement,
  responsivePlacement,
  maxSize = "20%",
  minSize = "150px",
  className,
}) => {
  const { isScrolling, scrollDirection } = useScrollDetection(100);
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });
  let { top, left } = placement;

  if (responsivePlacement) {
    const { desktop, mobiles } = responsivePlacement;
    if (isDesktop) {
      top = desktop.top;
      left = desktop.left;
    } else {
      top = mobiles.top;
      left = mobiles.left;
    }
  }

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
