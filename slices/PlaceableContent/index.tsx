import React from "react";
import { Content } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";

import { Button } from "components/common/Button/Button";

import styles from "./placeableContent.module.scss";

interface PlaceableContentItemProps {
  data: Content.PlaceableContentSliceDefaultItem;
}

const PlaceableContentItem = ({
  data: {
    content_placement,
    content,
    button_link_href,
    button_link_label,
    button_link_placement,
  },
}: PlaceableContentItemProps) => (
  <div className={styles.wrapper}>
    <div
      className={styles.contentWrapper}
      style={{ justifyContent: content_placement ?? "start" }}
    >
      <PrismicRichText field={content} />
    </div>
    {button_link_href && (
      <div
        className={styles.buttonWrapper}
        style={{ justifyContent: button_link_placement ?? "start" }}
      >
        {/*@ts-ignore*/}
        <PrismicLink href={button_link_href.url} className={styles.link}>
          <Button variant="primary" className={styles.button}>
            <span className={styles.buttonText}>{button_link_label}</span>
          </Button>
        </PrismicLink>
      </div>
    )}
  </div>
);

const PlaceableContent: SliceComponentType = ({
  slice,
}: SliceComponentProps<Content.PlaceableContentSlice>) => (
  <>
    {slice.items.map((placeableContentItemData) => (
      <PlaceableContentItem
        data={placeableContentItemData}
        key={placeableContentItemData.content.toString()}
      />
    ))}
  </>
);

export default PlaceableContent;
