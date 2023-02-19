import { Content } from "@prismicio/client";
import { PrismicImage, PrismicRichText, SliceZone } from "@prismicio/react";
import { components as slices } from "slices";

import { TypeTools } from "utils/TypeTools";

import styles from "./footer.module.scss";

interface FooterProps {
  prismicDocumentData: Content.FooterDocumentData;
}

export const Footer = ({ prismicDocumentData }: FooterProps) => {
  if (TypeTools.isNullOrUndefined(prismicDocumentData)) {
    return null;
  }

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        {/* TODO: replace with actual logo */}
        <PrismicImage field={prismicDocumentData.logo} />
        <div className={styles.right}>
          <small className={styles.copyright}>
            <PrismicRichText field={prismicDocumentData.copy} />
          </small>
          <div className={styles.links}>
            <SliceZone
              slices={prismicDocumentData.slices}
              components={slices}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
