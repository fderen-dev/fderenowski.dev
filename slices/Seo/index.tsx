import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Seo`.
 */
export type SeoProps = SliceComponentProps<Content.SeoSlice>;

/**
 * Component for "Seo" Slices.
 */
const Seo = ({ slice }: SeoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for seo (variation: {slice.variation}) Slices
    </section>
  );
};

export default Seo;
