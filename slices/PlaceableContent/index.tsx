import React from "react";
import { Content } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
  SliceComponentType,
} from "@prismicio/react";
import { getPlacement } from "slices/utils";

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
}: PlaceableContentItemProps) => {
  const contentPlacement = getPlacement(content_placement);
  const buttonLinkPlacement = getPlacement(button_link_placement);

  return (
    <>
      <div
        className={styles.contentWrapper}
        style={{ justifyContent: contentPlacement }}
      >
        <PrismicRichText field={content} />
      </div>
      {button_link_href && (
        <div
          className={styles.buttonWrapper}
          style={{ justifyContent: buttonLinkPlacement }}
        >
          <PrismicLink href={button_link_href as unknown as string}>
            <Button variant="primary">{button_link_label}</Button>
          </PrismicLink>
        </div>
      )}
    </>
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
