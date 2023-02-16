import React from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, SliceComponentProps } from "@prismicio/react";

const LinkIcon = ({ slice }: SliceComponentProps<Content.LinkIconSlice>) => (
  <PrismicLink field={slice.primary.link}>
    <PrismicNextImage field={slice.primary.icon} draggable={false} />
  </PrismicLink>
);

export default LinkIcon;
