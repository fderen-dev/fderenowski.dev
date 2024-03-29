import React from "react";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";

import { Button } from "components/common/Button/Button";

import styles from "./placeableContent.module.scss";

interface PlaceableContentItemProps {
  // @ts-ignore
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
}: PlaceableContentItemProps) => {
  const doesLinkContainUrl = button_link_href.hasOwnProperty("url");

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.contentWrapper}
        style={{ justifyContent: content_placement ?? "start" }}
      >
        <PrismicRichText field={content} />
      </div>
      {doesLinkContainUrl && (
        <div
          className={styles.buttonWrapper}
          style={{ justifyContent: button_link_placement ?? "start" }}
        >
          {/*@ts-ignore*/}
          <PrismicNextLink href={button_link_href.url} className={styles.link}>
            <Button variant="primary" className={styles.button}>
              <span className={styles.buttonText}>{button_link_label}</span>
            </Button>
          </PrismicNextLink>
        </div>
      )}
    </div>
  );
};

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
