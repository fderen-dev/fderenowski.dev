import classNames from "classnames";

import { BlogPostListTag } from "./Tag/Tag";
import { BlogPostsListTag } from "./models";

import styles from "./tagsList.module.scss";

interface TagListProps {
  tags: Array<BlogPostsListTag>;
  onTagClick: (tag: BlogPostsListTag) => void;
  className?: string;
}

export const TagsList = ({ tags, onTagClick, className }: TagListProps) => {
  return (
    <ul
      style={{ display: "flex" }}
      className={classNames(styles.list, className)}
    >
      {tags.map((tag) => (
        <BlogPostListTag
          key={tag.id}
          tag={tag}
          onClick={() => onTagClick(tag)}
        />
      ))}
    </ul>
  );
};
