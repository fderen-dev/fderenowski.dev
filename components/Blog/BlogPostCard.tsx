import { Content } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";
import classNames from "classnames";

import { TypeTools } from "utils/TypeTools";
import { useClientSideDate } from "utils/useClientSideDate";
import { getBlogPostUrl } from "utils/utils";

import styles from "./blogPostCard.module.scss";

interface Tag {
  name: string;
  url: string;
  key: string;
}

const getTags = (raw: string): Array<Tag> => {
  if (TypeTools.isNullOrUndefined(raw)) {
    return [];
  }

  return raw.split(";").map<Tag>((name, idx) => ({
    name,
    url: `blog?tag=${name}`,
    key: `tag-${idx}`,
  }));
};

interface BlogPostCardProps {
  prismicDocumentData: Content.BlogpostDocument;
  className?: string;
}

export const BlogPostCard = ({
  prismicDocumentData,
  className,
}: BlogPostCardProps) => {
  const { uid, data } = prismicDocumentData;
  const { header, datecreated, thumbnail } = data;
  const link = getBlogPostUrl(uid);
  const date = useClientSideDate(datecreated);
  const tags = getTags(data.tags!);

  return (
    <article className={classNames(styles.card, className)}>
      {thumbnail && (
        <PrismicImage className={styles.thumbnail} field={thumbnail} />
      )}
      <div className={styles.contentWrapper}>
        {header && <h2 className={styles.header}>{header}</h2>}
        <div className={styles.footer}>
          {tags.length > 0 && (
            <div className={styles.tagsContainer}>
              {tags.map(({ name, url, key }) => (
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
