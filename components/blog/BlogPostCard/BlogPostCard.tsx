import { forwardRef } from "react";
import { PrismicImage } from "@prismicio/react";
import classNames from "classnames";

import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { Tag } from "models/blog/Tag";
import { useClientSideDate } from "utils/hooks";
import { getBlogPostUrl } from "utils/utils";

import styles from "./blogPostCard.module.scss";

export type TagPillClickHandler = (tag: Tag) => void;

interface BlogPostCardProps {
  prismicDocument: BlogpostDocumentWithTags;
  onTagPillClick: TagPillClickHandler;
  className?: string;
  style?: React.CSSProperties;
}

export const BlogPostCard = forwardRef<HTMLLIElement, BlogPostCardProps>(
  function BlogPostCard(
    { prismicDocument, onTagPillClick, className, style },
    ref
  ) {
    const { uid, data } = prismicDocument;
    const { header, datecreated, thumbnail, tags } = data ?? {};
    const link = getBlogPostUrl(uid);
    const date = useClientSideDate(datecreated);
    const typedTags = (tags as unknown as Array<Tag>) ?? [];

    const handleTagPillClick = (
      tag: Tag,
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      event.preventDefault();
      onTagPillClick(tag);
    };

    return (
      <li
        className={classNames(styles.card, className)}
        style={style}
        ref={ref}
      >
        {thumbnail && (
          <PrismicImage className={styles.thumbnail} field={thumbnail} />
        )}
        <div className={styles.contentWrapper}>
          {header && <h2 className={styles.header}>{header}</h2>}
          <div className={styles.footer}>
            {typedTags.length > 0 && (
              <div className={styles.tagsContainer}>
                {typedTags.map((typedTag) => (
                  <a
                    onClick={(event) => handleTagPillClick(typedTag, event)}
                    key={typedTag.id}
                    href={typedTag.url}
                    className={styles.tag}
                  >
                    {typedTag.name}
                  </a>
                ))}
              </div>
            )}
            {date && <time className={styles.date}>{date}</time>}
          </div>
        </div>
        <a className={styles.link} href={link} />
      </li>
    );
  }
);
