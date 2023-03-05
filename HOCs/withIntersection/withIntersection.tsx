import { ElementType, useRef } from "react";

import { useIntersection } from "utils/useIntersection";

interface IntersectionProps {
  isInViewport: boolean;
}

interface WithIntersectionProps<ComponentProps> {
  Component: React.FunctionComponent<ComponentProps & IntersectionProps>;
  threshold?: number;
  wrapperElementType?: ElementType;
  wrapperClassName?: string;
}

export const withIntersection = <ComponentProps,>({
  Component,
  threshold = 1.0,
  wrapperElementType: Wrapper = "div",
  wrapperClassName,
}: WithIntersectionProps<ComponentProps>) => {
  const ComponentWithIntersection = (props: ComponentProps) => {
    const elementRef = useRef(null);
    const isInViewport = useIntersection(elementRef, threshold, true);

    return (
      <Wrapper ref={elementRef} className={wrapperClassName}>
        <Component isInViewport={isInViewport} {...props} />
      </Wrapper>
    );
  };

  return ComponentWithIntersection;
};
