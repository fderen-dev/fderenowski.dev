import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

import { Section } from "components/common/Section/Section";

import styles from "./fragment.module.scss";

const Fragment = ({ slice }: SliceComponentProps<Content.FragmentSlice>) => {
  if (slice.variation === "homepageFragment") {
    // @ts-ignore
    return (
      <Section
        withIntersection
        left={slice?.primary?.placement === "Left"}
        right={slice?.primary?.placement === "Right"}
        header={slice?.primary?.header?.[0]?.text}
        className={styles.section}
        key={slice.id}
      >
        {slice.items.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <PrismicRichText field={item.content} />
        ))}
      </Section>
    );
  }
};

export default Fragment;
