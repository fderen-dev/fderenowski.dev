import { FC } from "react";
import classNames from "classnames/bind";

import { useMediaQueriesContext } from "context/MediaQueries";
import { useScrollDetectionContext } from "context/ScrollDetection";
import { useIsMounted } from "utils/useIsMounted";
import { ScrollDirection } from "utils/useScrollDetection";

import GearImage from "public/static/gear.svg";

import styles from "./gear.module.scss";

const cx = classNames.bind(styles);

export type Placement = {
  top: string;
  left: string;
  right: string;
};

export type ResponsivePlacement = {
  mobiles: Partial<Placement>;
  desktop: Partial<Placement>;
};

interface GearProps {
  maxSize?: string;
  minSize?: string;
  placement: Partial<Placement>;
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
  const { isScrolling, scrollDirection } = useScrollDetectionContext();
  const { isDesktop } = useMediaQueriesContext();
  const isMounted = useIsMounted();
  let { top, left, right } = placement;

  if (responsivePlacement) {
    const { desktop, mobiles } = responsivePlacement;
    if (isDesktop) {
      top = desktop.top;
      left = desktop.left;
      right = desktop.right;
    } else {
      top = mobiles.top;
      left = mobiles.left;
      right = mobiles.right;
    }
  }

  return isMounted ? (
    <GearImage
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
        right,
        minWidth: minSize,
        minHeight: minSize,
        maxWidth: maxSize,
        maxHeight: maxSize,
      }}
    />
  ) : null;
};
