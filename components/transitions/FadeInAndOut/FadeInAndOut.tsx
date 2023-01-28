import { CSSTransition } from "react-transition-group";

import { WithChildren } from "utils/types";

import transitions from "./fadeInAndOut.module.scss";

interface FadeInAndOutProps extends WithChildren {
  isTriggered?: boolean;
  timeoutMs?: number;
}

export const FadeInAndOut = ({
  isTriggered = true,
  timeoutMs = 2000,
  children,
}: FadeInAndOutProps) => (
  <CSSTransition
    in={isTriggered}
    unmountOnExit
    timeout={timeoutMs}
    classNames={{ ...transitions }}
  >
    {children}
  </CSSTransition>
);
