import { PrismicImage } from "@prismicio/react";
import classNames from "classnames";

import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { Tag } from "models/blog/Tag";
import { useClientSideDate } from "utils/hooks";
import { getBlogPostUrl } from "utils/utils";

import styles from "./blogPostCard.module.scss";

interface BlogPostCardProps {
  prismicDocument: BlogpostDocumentWithTags;
  className?: string;
}

export const BlogPostCard = ({
  prismicDocument,
  className,
}: BlogPostCardProps) => {
  const { uid, data } = prismicDocument;
  const { header, datecreated, thumbnail, tags } = data ?? {};
  const link = getBlogPostUrl(uid);
  const date = useClientSideDate(datecreated);
  const typedTags = (tags as unknown as Array<Tag>) ?? [];

  return (
    <article className={classNames(styles.card, className)}>
      {thumbnail && (
        <PrismicImage className={styles.thumbnail} field={thumbnail} />
      )}
      <div className={styles.contentWrapper}>
        {header && <h2 className={styles.header}>{header}</h2>}
        <div className={styles.footer}>
          {typedTags.length > 0 && (
            <div className={styles.tagsContainer}>
              {typedTags.map(({ name, url, key }) => (
                <a key={key} href={url} className={styles.tag}>
                  {name}
                </a>
              ))}
            </div>
          )}
          {date && <time className={styles.date}>{date}</time>}
        </div>
      </div>
      <a className={styles.link} href={link} />
    </article>
  );
};
