import { Content } from "@prismicio/client";
import { asLink,asText } from "@prismicio/helpers";
import { SliceComponentProps } from "@prismicio/react";

import { Head } from "components/common/Head/Head";;

/**
 * Props for `Seo`.
 */
export type SeoProps = SliceComponentProps<Content.SeoSlice>;

/**
 * Component for "Seo" Slices.
 */
const Seo = ({ slice }: SeoProps): JSX.Element => {
  const { meta_og_image, meta_og_description, meta_og_url, ...meta } = slice.primary;

  return (
    <Head
      meta_og_image={meta_og_image.url!}
      meta_og_description={asText(meta_og_description)}
      // TODO: link resolver
      meta_og_url={null}
      {...meta}
    />
  );
}

export default Seo;
