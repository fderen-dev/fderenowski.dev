import { useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import classNames from "classnames/bind";

import { useIntersection } from "utils/useIntersection";

import { components as slices } from "../../slices";

import styles from "./homePageArticle.module.scss";

const cx = classNames.bind(styles);

interface HomePageArticleProps {
  prismicDocumentData: Content.HomePageArticleDocumentData;
}

export const HomePageArticle = ({
  prismicDocumentData: { header, placement, slices: slicesData },
}: HomePageArticleProps) => {
  const wrapperRef = useRef(null);
  const isInViewport = useIntersection(wrapperRef);

  return (
    <article
      ref={wrapperRef}
      className={cx(styles.article, {
        start: placement === "start",
        center: placement === "center",
        end: placement === "end",
        inViewport: isInViewport,
        outOfViewport: !isInViewport,
      })}
    >
      {header && (
        <h2
          className={cx(styles.header, {
            start: placement === "start",
            center: placement === "center",
            end: placement === "end",
          })}
        >
          <span className={styles.headerText}>{header}</span>
        </h2>
      )}
      <SliceZone slices={slicesData} components={slices} />
    </article>
  );
};
