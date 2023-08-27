import React from "react";
import { Content } from "@prismicio/client";
import { asText } from "@prismicio/helpers";
import {
  PrismicImage,
  PrismicRichText,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";
import { ImageField } from "@prismicio/types";

import { SyntaxHiglighter } from "components/blog/SyntaxHighlighter/SyntaxHighlighter";

import styles from "./blogPostContent.module.scss";

interface BlogPostContentItemFigureProps {
  image: ImageField<never>;
  caption: string;
}

const BlogPostContentItemFigure = ({
  image,
  caption,
}: BlogPostContentItemFigureProps) => {
  return (
    <figure className={styles.figure}>
      <PrismicImage
        field={image}
        // @ts-ignore
        alt={image.alt ?? ""}
        draggable={false}
      />
      <figcaption className={styles.figcaption}>{caption}</figcaption>
    </figure>
  );
};

interface BlogPostContentItemProps {
  item: Content.BlogPostContentSliceDefaultItem;
}

const BlogPostContentDefaultItem = ({ item }: BlogPostContentItemProps) => {
  const { content, image, imagecaption } = item;

  return (
    <>
      {image && imagecaption ? (
        <BlogPostContentItemFigure image={image} caption={imagecaption} />
      ) : (
        <PrismicImage
          field={image}
          // @ts-ignore
          alt={image.alt ?? ""}
          draggable={false}
          className={styles.figure}
        />
      )}
      <PrismicRichText field={content} />
    </>
  );
};

interface BlogPostConentWithCodeBlockItemProps {
  item: Content.BlogPostContentSliceWithCodeBlockItem;
}

const BlogPostConentWithCodeBlockItem = ({
  item,
}: BlogPostConentWithCodeBlockItemProps) => {
  const { content, image, imagecaption, language, showlinenumbers, wraplines, showcopybutton, code } = item;
  const codeString = asText(code);

  return (
    <>
      {image && imagecaption ? (
        <BlogPostContentItemFigure image={image} caption={imagecaption} />
      ) : (
        <PrismicImage
          field={image}
          // @ts-ignore
          alt={image.alt ?? ""}
          draggable={false}
          className={styles.figure}
        />
      )}
      <PrismicRichText field={content} />
      {codeString && language ? (
        <SyntaxHiglighter
          language={language}
          codeString={codeString}
          showLineNumbers={showlinenumbers}
          wrapLines={wraplines}
          showCopyButton={showcopybutton}
        />
      ) : null}
    </>
  );
};

const BlogPostContent: SliceComponentType = (
  props: SliceComponentProps<Content.BlogPostContentSlice>
) => {
  const { slice } = props;

  return slice.items.map((item, idx) => {
    if (slice.variation === "default") {
     return <BlogPostContentDefaultItem item={item} key={idx} />
    } else if (slice.variation === "withCodeBlock") {
      return <BlogPostConentWithCodeBlockItem item={item} key={idx} />
    }
  });
};

export default BlogPostContent;
