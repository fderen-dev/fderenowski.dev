import { useEffect, useRef } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";

import { ScrollDetectionProvider } from "context/ScrollDetection";
import { useIsMounted } from "utils/hooks";

type ValidTags = React.ElementType;

type PolymorficCointainerProps<C extends ValidTags> = {
  as?: C;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

type ScrollContainerProps<Tag extends ValidTags> = {
  className?: string;
} & PolymorficCointainerProps<Tag>;

export const ScrollContainer = <Tag extends ValidTags>({
  as,
  children,
  className,
  ...rest
}: ScrollContainerProps<Tag>) => {
  const Component = (as || "div") as React.ElementType;
  const containerRef = useRef(null);
  const scrollViewportRef = useRef<HTMLElement>(null);
  const [initialize, instance] = useOverlayScrollbars({
    options: { scrollbars: { autoHide: "scroll" } },
  });
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      initialize(containerRef.current!);
      // @ts-ignore
      scrollViewportRef.current = instance()?.elements().viewport!;
      scrollViewportRef.current?.style.setProperty("height", "100%");
    }
  }, [isMounted, initialize, instance]);

  return (
    <Component {...rest} className={className} ref={containerRef}>
      <ScrollDetectionProvider
        treshold={100}
        element={scrollViewportRef.current!}
      >
        {children}
      </ScrollDetectionProvider>
    </Component>
  );
};
