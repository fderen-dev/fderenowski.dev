import { memo } from "react";

import { useFetchPosts } from "hooks/blog/useFetchPosts";

import { TagPillClickHandler } from "../BlogPostCard/BlogPostCard";
import { BlogPostsListWithFetchingData } from "../BlogPostsList/BlogPostsList";

interface BlogPostListContainerProps {
  selectedTagsPaths: Array<string>;
  onTagPillClick: TagPillClickHandler;
  listClassName?: string;
  cardClassName?: string;
}

const _BlogPostsListContainer = ({
  selectedTagsPaths,
  onTagPillClick,
  listClassName,
  cardClassName,
}: BlogPostListContainerProps) => {
  const { data: posts, isFetching, error } = useFetchPosts(selectedTagsPaths);

  return (
    <BlogPostsListWithFetchingData
      data={posts}
      onTagPillClick={onTagPillClick}
      isFetching={isFetching}
      error={error}
      cardClassName={cardClassName}
      listClassName={listClassName}
    />
  );
};

export const BlogPostsListContainer = memo(_BlogPostsListContainer);
