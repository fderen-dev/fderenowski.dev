import { createRef, forwardRef } from "react";
import { TransitionGroup } from "react-transition-group";

import { Grow } from "components/transitions/Grow/Grow";

import { Posts } from "models/blog/Posts";

import {
  BlogPostCard,
  TagPillClickHandler,
} from "../BlogPostCard/BlogPostCard";

import { withFetchingData } from "HOCs/withFetchingData";
import { withInfiniteScroll } from "HOCs/withInfiniteScroll";

interface BlogPostsListProps {
  data: Posts | undefined;
  onTagPillClick: TagPillClickHandler;
  listClassName?: string;
  cardClassName?: string;
}

const BlogPostsList = forwardRef<HTMLUListElement, BlogPostsListProps>(
  function PostsList(props, ref) {
    const { data, onTagPillClick, listClassName, cardClassName } = props;

    return (
      <ul className={listClassName} ref={ref}>
        <TransitionGroup enter appear exit component={null}>
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
      </ul>
    );
  }
);

export const BlogPostsListWithFetchingData = withFetchingData<
  BlogPostsListProps,
  Posts | undefined
>(BlogPostsList);

export const BlogPostsListWithInfiniteScroll = withInfiniteScroll<
  // @ts-ignore
  BlogPostsListProps,
  Posts | undefined
>(BlogPostsList);
