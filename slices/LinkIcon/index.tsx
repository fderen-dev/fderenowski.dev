import React from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  PrismicLink,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";

import styles from "./linkIcon.module.scss";

const LinkIcon: SliceComponentType = ({
  slice,
}: SliceComponentProps<Content.LinkIconSlice>) => (
  <PrismicLink
    rel="noreferrer noopener"
    target="_blank"
    field={slice.primary.link}
    className={styles.link}
  >
    <PrismicNextImage
      field={slice.primary.icon}
      draggable={false}
      className={styles.icon}
    />
  </PrismicLink>
);

export default LinkIcon;
