import { memo } from "react";

import { Spinner } from "components/common/Spinner/Spinner";

import { useFetchPosts } from "hooks/blog/useFetchPosts";

import { TagPillClickHandler } from "../BlogPostCard/BlogPostCard";
import { BlogPostsListWithFetchingData } from "../BlogPostsList/BlogPostsList";

interface BlogPostListContainerProps {
  selectedTagsPaths: Array<string>;
  onTagPillClick: TagPillClickHandler;
  noResultsText: string;
  listClassName?: string;
  cardClassName?: string;
  loaderClassName?: string;
  noResultsClassName?: string;
}

const _BlogPostsListContainer = ({
  selectedTagsPaths = [],
  onTagPillClick,
  noResultsText,
  listClassName,
  cardClassName,
  loaderClassName,
  noResultsClassName,
}: BlogPostListContainerProps) => {
  const { data: posts, isFetching, error } = useFetchPosts(selectedTagsPaths);

  return (
    <BlogPostsListWithFetchingData
      data={posts?.data}
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

export const BlogPostsListContainer = memo(_BlogPostsListContainer);
