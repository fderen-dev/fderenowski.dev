import { useMemo } from "react";

import { useFetchPosts } from "hooks/blog/useFetchPosts";

import { BlogPostsListWithFetchingData } from "../BlogPostsList/BlogPostsList";

interface BlogPostListContainerProps {
  listClassName?: string;
  cardClassName?: string;
}

export const BlogPostsListContainer = ({
  listClassName,
  cardClassName,
}: BlogPostListContainerProps) => {
  const tags: Array<string> = useMemo(
    () => new URLSearchParams(window.location.search).getAll("tag"),
    []
  );
  const { data: posts, isFetching, error } = useFetchPosts(tags);

  return (
    <BlogPostsListWithFetchingData
      data={posts}
      isFetching={isFetching}
      error={error}
      cardClassName={cardClassName}
      listClassName={listClassName}
    />
  );
};
