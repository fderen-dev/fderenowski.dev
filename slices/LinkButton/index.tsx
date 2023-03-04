import React from "react";
import { Content } from "@prismicio/client";
import {
  PrismicLink,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";
import { getPlacement } from "slices/utils";

import { Button } from "components/common/Button/Button";

import styles from "./linkButton.module.scss";

const LinkButton: SliceComponentType = ({
  slice,
}: SliceComponentProps<Content.LinkButtonSlice>) => {
  const placement = getPlacement(slice.primary.placement);

  return (
    <div className={styles.wrapper} style={{ justifyContent: placement }}>
      <PrismicLink field={slice.primary.href}>
        <Button variant="primary">{slice.primary.label}</Button>
      </PrismicLink>
    </div>
  );
};

export default LinkButton;
