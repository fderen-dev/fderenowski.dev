import { FetchReturnType } from "models/misc";
import { MutableRefObject, useEffect, useRef } from "react";
import { useIntersection } from "utils/hooks";

interface ComponentProps {
  ref: MutableRefObject<HTMLElement | null>;
}

interface WithInfiniteScrollProps<Data> extends FetchReturnType<Data> {
  next: () => void;
  hasMore: boolean;
  Loader?: JSX.Element;
  NoResults?: JSX.Element;
}

export const withInfiniteScroll = <Props extends ComponentProps, Data>(
  Component: React.FunctionComponent<Props>
): React.FunctionComponent<Props & WithInfiniteScrollProps<Data>> =>
  function InfiniteScrollWrapper({
    hasMore,
    next,
    Loader,
    NoResults,
    isFetching,
    error,
    data,
    ...props
  }: WithInfiniteScrollProps<Data>) {
    const componentRef = useRef(null);
    const isInViewport = useIntersection(componentRef, 1.0, true);

    useEffect(() => {
      if (hasMore && !isFetching && isInViewport) {
        next();
      }
    }, [isInViewport, hasMore, next]);

    return (
      <>
        <Component {...(props as Props)} data={data} ref={componentRef} />
        {isFetching && Loader}
      </>
    );
  };
