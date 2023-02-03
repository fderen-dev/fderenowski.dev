import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Section } from "components/common/Section/Section";

import styles from "./fragment.module.scss";

const Fragment = ({
  slice,
  slices,
}: SliceComponentProps<Content.FragmentSlice>) => {
  console.log(slices);

  if (slice.variation === "homepageFragment") {
    // @ts-ignore
    return slices.map((sliceToRender: Content.FragmentSlice) => (
      <Section left header={sliceToRender.primary.header.} className={styles.section} key={sliceToRender.id}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros
          risus, efficitur non neque in, tempus mattis ipsum. Duis efficitur
          nibh a vulputate placerat. Aenean id elit vitae quam malesuada
          volutpat a euismod dolor. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Nam luctus finibus sem, eu rhoncus augue aliquet
          sit amet. Aliquam pharetra consequat ex non pulvinar. Praesent
          pellentesque dui sit amet tortor imperdiet, id pretium lorem porta.
          Phasellus eu molestie metus. Vivamus vulputate turpis eu tristique
          suscipit. Fusce id commodo nibh. Vestibulum pharetra lacus nec laoreet
          vestibulum. Praesent malesuada turpis eget nibh posuere, at auctor
          justo aliquam. Suspendisse vel vestibulum lacus, non bibendum nisl.
          Nulla ut hendrerit dolor. Praesent tristique vel lectus non dictum.
        </p>
      </Section>
    ));
  }
};
export default Fragment;
