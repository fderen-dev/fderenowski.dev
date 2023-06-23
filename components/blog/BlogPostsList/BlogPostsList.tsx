import { Posts } from "models/blog/Posts";

import {
  BlogPostCard,
  TagPillClickHandler,
} from "../BlogPostCard/BlogPostCard";

import { withFetchingData } from "HOCs/withFetchingData";

interface BlogPostsListProps {
  data: Posts | null;
  onTagPillClick: TagPillClickHandler;
  listClassName?: string;
  cardClassName?: string;
}

const BlogPostsList = ({
  data,
  onTagPillClick,
  listClassName,
  cardClassName,
}: BlogPostsListProps) => (
  <ul className={listClassName}>
    {data!.map((blogPost) => (
      <BlogPostCard
        onTagPillClick={onTagPillClick}
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
