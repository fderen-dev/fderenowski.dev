import { Content } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";

import { useClientSideDate } from "utils/useClientSideDate";
import { getBlogPostUrl } from "utils/utils";

import styles from "./blogPostCard.module.scss";

interface BlogPostCardProps {
  prismicDocumentData: Content.BlogpostDocument;
}

export const BlogPostCard = ({ prismicDocumentData }: BlogPostCardProps) => {
  const { uid, data } = prismicDocumentData;
  const { header, datecreated, thumbnail } = data;
  const link = getBlogPostUrl(uid);
  const date = useClientSideDate(datecreated);
  const tags = data.tags?.split(";") ?? [];

  return (
    <article className={styles.card}>
      {thumbnail && (
        <PrismicImage className={styles.thumbnail} field={thumbnail} />
      )}
      <div className={styles.contentWrapper}>
        {header && <h2 className={styles.header}>{header}</h2>}
        <div className={styles.footer}>
          {tags.length > 0 && (
            <div className={styles.tagsContainer}>
              {tags.map((tag) => (
                <a key={tag} className={styles.tag}>
                  {tag}
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
