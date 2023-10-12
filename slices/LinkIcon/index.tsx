import React from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";

import styles from "./linkIcon.module.scss";

const LinkIcon: SliceComponentType = ({
  slice,
}: SliceComponentProps<Content.LinkIconSlice>) => (
  <PrismicNextLink
    rel="noreferrer noopener"
    target="_blank"
    field={slice.primary.href}
    className={styles.link}
  >
    <PrismicNextImage
      field={slice.primary.icon}
      draggable={false}
      className={styles.icon}
    />
  </PrismicNextLink>
);

export default LinkIcon;
