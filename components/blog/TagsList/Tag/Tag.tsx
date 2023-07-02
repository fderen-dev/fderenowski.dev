import { Button } from "components/common/Button/Button";

import { BlogPostsListTag } from "../models";

import styles from "./tag.module.scss";

interface TagProps {
  tag: BlogPostsListTag;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export const Tag = ({ tag, onClick, className }: TagProps) => {
  const { name, isSelected } = tag;

  return (
    <li className={className}>
      <Button
        variant={isSelected ? "primary" : "secondary"}
        onClick={onClick}
        className={styles.tag}
      >
        {name}
      </Button>
    </li>
  );
};
