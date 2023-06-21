import { useFetchPosts } from "hooks/blog/useFetchPosts";

import { BlogPostsListWithFetchingData } from "../BlogPostsList/BlogPostsList";

interface BlogPostListContainerProps {
  selectedTags: Array<string>;
  listClassName?: string;
  cardClassName?: string;
}

export const BlogPostsListContainer = ({
  selectedTags,
  listClassName,
  cardClassName,
}: BlogPostListContainerProps) => {
  const { data: posts, isFetching, error } = useFetchPosts(selectedTags);

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
