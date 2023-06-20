import { Posts } from "models/blog/Posts";

import { BlogPostCard } from "../BlogPostCard/BlogPostCard";

import { withFetchingData } from "HOCs/withFetchingData";

interface BlogPostsListProps {
  data: Posts | null;
  listClassName?: string;
  cardClassName?: string;
}

const BlogPostsList = ({
  data,
  listClassName,
  cardClassName,
}: BlogPostsListProps) => (
  <ul className={listClassName}>
    {data!.map((blogPost) => (
      <BlogPostCard
        prismicDocument={blogPost}
        className={cardClassName}
        key={blogPost.id}
      />
    ))}
  </ul>
);

export const BlogPostsListWithFetchingData = withFetchingData<
  BlogPostsListProps,
  Posts
>(BlogPostsList);
