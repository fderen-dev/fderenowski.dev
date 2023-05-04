import React from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, SliceComponentType } from "@prismicio/react";

const BlogPostContent: SliceComponentType = (
  props: SliceComponentProps<Content.BlogPostContentSlice>
) => <section>Blog post content</section>;

export default BlogPostContent;
