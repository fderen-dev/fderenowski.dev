import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

import { TypeTools } from "utils/TypeTools";

import transitions from "./grow.module.scss";

interface GrowProps
  extends Omit<CSSTransitionProps, "classNames" | "children"> {
  timeout: number;
  index?: number;
  children: (delay: number) => React.ReactNode;
}

export const Grow = ({
  nodeRef,
  timeout,
  index,
  children,
  ...props
}: GrowProps) => {
  const delay = TypeTools.isNullOrUndefined(index) ? timeout : index! * timeout;

  return (
    <CSSTransition
      timeout={timeout}
      nodeRef={nodeRef}
      classNames={{ ...transitions }}
      {...props}
    >
      {children(delay)}
    </CSSTransition>
  );
};
