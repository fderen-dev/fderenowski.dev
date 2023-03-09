import React from "react";
import { Content } from "@prismicio/client";
import {
  PrismicLink,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";

import { Button } from "components/common/Button/Button";

import styles from "./linkButton.module.scss";

const LinkButton: SliceComponentType = ({
  slice,
}: SliceComponentProps<Content.LinkButtonSlice>) => (
  <div
    className={styles.wrapper}
    style={{ justifyContent: slice.primary.placement ?? "start" }}
  >
    <PrismicLink field={slice.primary.href} className={styles.link}>
      <Button variant="primary" className={styles.button}>
        <span className={styles.buttonText}>{slice.primary.label}</span>
      </Button>
    </PrismicLink>
  </div>
);

export default LinkButton;
