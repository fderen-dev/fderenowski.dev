import { FC } from "react";
import classNames from "classnames/bind";

import { useMediaQueriesContext } from "context/MediaQueries";
import { useScrollDetectionContext } from "context/ScrollDetection";
import { useIsMounted } from "utils/hooks";
import { ScrollDirection } from "utils/hooks/useScrollDetection";

import GearImage from "public/icons/gear.svg";

import styles from "./gear.module.scss";

const cx = classNames.bind(styles);

export type Placement = {
  top: string;
  left: string;
  right: string;
  bottom: string;
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
  style?: React.CSSProperties;
}

export const Gear: FC<GearProps> = ({
  placement,
  responsivePlacement,
  maxSize = "20%",
  minSize = "150px",
  className,
  style,
}) => {
  const { isScrolling, scrollDirection } = useScrollDetectionContext();
  const { isDesktop } = useMediaQueriesContext();
  const isMounted = useIsMounted();
  let { top, left, right, bottom } = placement;

  if (responsivePlacement) {
    const { desktop, mobiles } = responsivePlacement;

    if (isDesktop) {
      placement = {...desktop};
    } else {
      placement = {...mobiles};
    }
  }

  return isMounted ? (
    <GearImage
      alt=""
      className={cx(styles.gear, className, {
        paused: !isScrolling,
        running: isScrolling,
        up: scrollDirection === ScrollDirection.Up,
        down: scrollDirection === ScrollDirection.Down,
      })}
      style={{
        ...style,
        top,
        left,
        right,
        bottom,
        minWidth: minSize,
        minHeight: minSize,
        maxWidth: maxSize,
        maxHeight: maxSize,
      }}
    />
  ) : null;
};
