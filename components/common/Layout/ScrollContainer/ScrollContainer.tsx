import { useEffect, useRef, useState } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";

import { ElementProps, PolymorficContainer, ValidTags } from "components/common/PolymofricContainer/PolymorficContainer";

import { ScrollDetectionProvider } from "context/ScrollDetection";

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
  const viewportRef = useRef(null);
  const targetRef = useRef(null);
  const [_, setInitialized] = useState(false);
  const [initialize, instance] = useOverlayScrollbars({
    events: {
      initialized: () => setInitialized(true),
    },
    options: { scrollbars: { autoHide: "scroll" }, overflow: { x: 'hidden' } },
  });

  useEffect(() => {
    initialize({
      target: targetRef.current!,
      elements: {
        viewport: viewportRef.current,
      },
    });
  }, [initialize, instance]);

  return (
    <PolymorficContainer {...rest} className={className} ref={targetRef}>
      <div className={styles.flexContainer} ref={viewportRef}>
        <ScrollDetectionProvider
          treshold={100}
          element={viewportRef.current!}
        >
          {children}
        </ScrollDetectionProvider>
      </div>
    </PolymorficContainer>
  );
};
