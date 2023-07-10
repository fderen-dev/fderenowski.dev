import { createRef } from "react";
import { TransitionGroup } from "react-transition-group";

import { Grow } from "components/transitions/Grow/Grow";

import { Posts } from "models/blog/Posts";

import {
  BlogPostCard,
  TagPillClickHandler,
} from "../BlogPostCard/BlogPostCard";

import { withFetchingData } from "HOCs/withFetchingData";

interface BlogPostsListProps {
  data: Posts | undefined;
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
  <TransitionGroup enter appear component="ul" className={listClassName}>
    {data!.map((blogPost, index) => {
      const ref = createRef<HTMLLIElement>();

      return (
        <Grow timeout={100} nodeRef={ref} index={index} key={blogPost.id}>
          {(delay) => (
            <BlogPostCard
              onTagPillClick={onTagPillClick}
              prismicDocument={blogPost}
              className={cardClassName}
              style={{ transitionDelay: `${delay}ms` }}
              ref={ref}
            />
          )}
        </Grow>
      );
    })}
  </TransitionGroup>
);

export const BlogPostsListWithFetchingData = withFetchingData<
  BlogPostsListProps,
  Posts | undefined
>(BlogPostsList);
