import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicText } from "@prismicio/react";

import { Section } from "components/common/Section/Section";

import aboutMeStyles from "../../pages/about.module.scss";
import styles from "./fragment.module.scss";

const Fragment = ({ slice }: SliceComponentProps<Content.FragmentSlice>) => {
  if (slice.variation === "homepageFragment") {
    return (
      <Section
        withIntersection
        left={slice?.primary?.placement === "Left"}
        right={slice?.primary?.placement === "Right"}
        header={slice?.primary?.header?.[0]?.text}
        className={styles.section}
      >
        {slice.items.map((item) => (
          <>
            {item.content && (
              <PrismicRichText field={item.content} key={slice.id} />
            )}
          </>
        ))}
      </Section>
    );
  }

  if (slice.variation === "aboutMeFragment") {
    return (
      <section className={aboutMeStyles.section}>
        <PrismicNextImage
          field={slice?.primary?.portrait}
          sizes="(max-width: 1920px) 80vw, 800px"
          priority
          className={aboutMeStyles.portrait}
          draggable={false}
        />
        <div className={aboutMeStyles.content}>
          <h2 className={aboutMeStyles.subheader}>
            {slice?.primary?.header?.[0]?.text}
          </h2>
          {slice.items.map((item) => (
            <p className={aboutMeStyles.paragraph} key={slice.id}>
              {item.content && <PrismicText field={item.content} />}
            </p>
          ))}
        </div>
      </section>
    );
  }
};

export default Fragment;
