import { useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import classNames from "classnames/bind";

import { useIntersection } from "utils/hooks/useIntersection";

import { components as slices } from "../../slices";

import styles from "./homePageArticle.module.scss";

const cx = classNames.bind(styles);

interface HomePageArticleProps {
  prismicDocumentData: Content.HomePageArticleDocumentData;
}

export const HomePageArticle = ({
  prismicDocumentData: {
    header,
    slices: slicesData,
    with_intersection,
  },
}: HomePageArticleProps) => {
  const wrapperRef = useRef(null);
  const isInViewport = useIntersection(wrapperRef, 1.0, with_intersection);

  return (
    <article
      ref={wrapperRef}
      className={cx(styles.article, {
        inViewport: isInViewport,
        outOfViewport: !isInViewport,
      })}
    >
      {header && (
        <h2
          className={cx(styles.header)}
        >
          <span className={styles.headerText}>{header}</span>
        </h2>
      )}
      <SliceZone slices={slicesData} components={slices} />
    </article>
  );
};
