import { forwardRef } from "react";

export type ValidTags = React.ElementType;
export type ElementProps<T extends ValidTags> = React.ComponentPropsWithoutRef<T>;
export type PolymorficCointainerProps<T extends ValidTags> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

// TODO: fix typing
export const PolymorficContainer = forwardRef<any, any>(
  function Container({ children, as, ...rest }, ref) {
  const Component = (as || "div");

  return (
    <Component {...rest} ref={ref}>
      {children}
    </Component>
  );
});