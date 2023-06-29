import classNames from "classnames";

import { Tag } from "./Tag/Tag";
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
        <Tag key={tag.id} tag={tag} onClick={() => onTagClick(tag)} />
      ))}
    </ul>
  );
};
