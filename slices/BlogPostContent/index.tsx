import React from "react";
import { Content } from "@prismicio/client";
import {
  PrismicImage,
  PrismicRichText,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";
import { ImageField } from "@prismicio/types";

interface BlogPostContentItemFigureProps {
  image: ImageField<never>;
  caption: string;
}

const BlogPostContentItemFigure = ({
  image,
  caption,
}: BlogPostContentItemFigureProps) => {
  return (
    <figure>
      {/* @ts-ignore */}
      <PrismicImage field={image} alt={image.alt ?? ""} draggable={false} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

interface BlogPostContentItemProps {
  item: Content.BlogPostContentSliceDefaultItem;
}

const BlogPostConentItem = ({ item }: BlogPostContentItemProps) => {
  const { content, image, imagecaption } = item;

  return (
    <>
      {image && imagecaption ? (
        <BlogPostContentItemFigure image={image} caption={imagecaption} />
      ) : (
        <>
          {/* @ts-ignore */}
          <PrismicImage field={image} alt={image.alt ?? ""} draggable={false} />
        </>
      )}
      <PrismicRichText field={content} />
    </>
  );
};

const BlogPostContent: SliceComponentType = (
  props: SliceComponentProps<Content.BlogPostContentSlice>
) => {
  const { slice } = props;

  return slice.items.map((item, idx) => (
    <BlogPostConentItem item={item} key={idx} />
  ));
};

export default BlogPostContent;
