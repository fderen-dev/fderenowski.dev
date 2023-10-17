import { useEffect, useRef } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";

import { ElementProps, PolymorficContainer, ValidTags } from "components/common/PolymofricContainer/PolymorficContainer";

import { ScrollDetectionProvider } from "context/ScrollDetection";
import { useIsMounted } from "utils/hooks";

import styles from './scrollContainer.module.scss';

type ScrollContainerProps<Tag extends ValidTags> = {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
} & ElementProps<Tag>; 

export const ScrollContainer = <Tag extends ValidTags>({
  as,
  children,
  className,
  ...rest
}: ScrollContainerProps<Tag>) => {
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
      scrollViewportRef.current?.classList.add(styles.flexContainer);
    }
  }, [isMounted, initialize, instance]);

  return (
    <PolymorficContainer {...rest} className={className} ref={containerRef}>
      <ScrollDetectionProvider
        treshold={100}
        element={scrollViewportRef.current!}
      >
        {children}
      </ScrollDetectionProvider>
    </PolymorficContainer>
  );
};
