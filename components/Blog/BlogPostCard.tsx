import { Content } from "@prismicio/client";

import { getBlogPostUrl, getLocalDateString } from "utils/utils";

import styles from "./blogPostCard.module.scss";

interface BlogPostCardProps {
  prismicDocumentData: Content.BlogpostDocument;
}

export const BlogPostCard = ({ prismicDocumentData }: BlogPostCardProps) => {
  const {
    uid,
    data: { header, datecreated },
  } = prismicDocumentData;

  const link = getBlogPostUrl(uid);
  const date = datecreated && getLocalDateString(datecreated);

  return (
    <article className={styles.card}>
      {header && <h2>{header}</h2>}
      {date && <time>{date}</time>}
      <a className={styles.link} href={link}></a>
    </article>
  );
};
