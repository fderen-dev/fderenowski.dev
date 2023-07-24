import Link from "next/link";
import classNames from "classnames";

import { Button } from "components/common/Button/Button";

import { Tag as TagModel } from "models/blog/Tag";

import { BlogPostsListTag } from "../models";

import styles from "./tag.module.scss";

interface TagProps<T extends TagModel> {
  tag: T;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLink?: boolean;
  url?: string;
  className?: string;
  buttonClassName?: string;
}

export const Tag = ({
  tag,
  onClick,
  isLink,
  className,
  buttonClassName,
}: TagProps<TagModel>) => {
  const { name } = tag;

  return (
    <li className={classNames(styles.tag, className)}>
      <Button
        variant={"primary"}
        onClick={onClick}
        className={classNames(
          isLink ? styles.linkButton : styles.button,
          buttonClassName
        )}
      >
        {name}
      </Button>
      {isLink && (
        <Link
          href={{ pathname: "/blog", query: { tag: tag.path } }}
          className={styles.link}
        />
      )}
    </li>
  );
};

export const BlogPostListTag = ({
  tag,
  onClick,
  className,
  buttonClassName,
}: TagProps<BlogPostsListTag>) => {
  const { name, isSelected } = tag;

  return (
    <li className={classNames(styles.tag, className)}>
      <Button
        variant={isSelected ? "primary" : "secondary"}
        onClick={onClick}
        className={classNames(styles.button, buttonClassName)}
      >
        {name}
      </Button>
    </li>
  );
};
