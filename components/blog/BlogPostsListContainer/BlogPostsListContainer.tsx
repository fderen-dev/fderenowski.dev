import { memo } from "react";

import { Spinner } from "components/common/Spinner/Spinner";

import { useFetchPosts } from "hooks/blog/useFetchPosts";

import { TagPillClickHandler } from "../BlogPostCard/BlogPostCard";
import { BlogPostsListWithFetchingData } from "../BlogPostsList/BlogPostsList";

interface BlogPostListContainerProps {
  selectedTagsPaths: Array<string>;
  onTagPillClick: TagPillClickHandler;
  listClassName?: string;
  cardClassName?: string;
  loaderClassName?: string;
}

const _BlogPostsListContainer = ({
  selectedTagsPaths = [],
  onTagPillClick,
  listClassName,
  cardClassName,
  loaderClassName,
}: BlogPostListContainerProps) => {
  const { data: posts, isFetching, error } = useFetchPosts(selectedTagsPaths);

  return (
    <BlogPostsListWithFetchingData
      data={posts?.data}
      onTagPillClick={onTagPillClick}
      isFetching={isFetching}
      error={error}
      Loader={
        <Spinner size="large" color="yellow" className={loaderClassName} />
      }
      cardClassName={cardClassName}
      listClassName={listClassName}
    />
  );
};

export const BlogPostsListContainer = memo(_BlogPostsListContainer);
