import { memo, useCallback, useState } from "react";

import { Spinner } from "components/common/Spinner/Spinner";

import { useFetchPosts } from "hooks/blog/useFetchPosts";
import { TypeTools } from "utils/TypeTools";

import { TagPillClickHandler } from "../BlogPostCard/BlogPostCard";
import { BlogPostsListWithInfiniteScroll } from "../BlogPostsList/BlogPostsList";

interface BlogPostListContainerProps {
  selectedTagsPaths: Array<string>;
  onTagPillClick: TagPillClickHandler;
  noResultsText: string;
  listClassName?: string;
  cardClassName?: string;
  loaderClassName?: string;
  noResultsClassName?: string;
}

const Container = ({
  selectedTagsPaths = [],
  onTagPillClick,
  noResultsText,
  listClassName,
  cardClassName,
  loaderClassName,
  noResultsClassName,
}: BlogPostListContainerProps) => {
  const [page, setPage] = useState(1);
  const {
    data: posts,
    isFetching,
    error,
  } = useFetchPosts(selectedTagsPaths, page, 1);

  const next = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  if (TypeTools.isNullOrUndefined(posts)) {
    return null;
  }

  return (
    <BlogPostsListWithInfiniteScroll
      data={posts!.data}
      next={next}
      hasMore={posts!.hasMore}
      onTagPillClick={onTagPillClick}
      isFetching={isFetching}
      error={error}
      Loader={
        <div className={loaderClassName}>
          <Spinner size="large" color="yellow" />
        </div>
      }
      NoResults={<h2 className={noResultsClassName}>{noResultsText}</h2>}
      cardClassName={cardClassName}
      listClassName={listClassName}
    />
  );
};

export const BlogPostsListContainer = memo(Container);
