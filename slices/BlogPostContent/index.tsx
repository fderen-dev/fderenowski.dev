import React from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";

const BlogPostContent: SliceComponentType = (
  props: SliceComponentProps<Content.BlogPostContentSlice>
) => {
  const { slice } = props;

  return <PrismicRichText field={slice.items[0].content} />;
};

export default BlogPostContent;
