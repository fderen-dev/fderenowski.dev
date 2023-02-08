import HeadNext from "next/head";

import { WithChildren } from "utils/types";

type NullableStringProperty = string | null;

interface Meta {
  meta_title: NullableStringProperty;
  meta_author: NullableStringProperty;
  meta_description: NullableStringProperty;
  meta_keywords: NullableStringProperty;
  meta_robots: NullableStringProperty;
}

interface HeadProps {
  meta: Meta;
  children?: React.ReactNode;
}

export const Head = ({ meta, children }: HeadProps) => (
  <HeadNext>
    {meta.meta_title && <title>{meta.meta_title}</title>}
    {meta.meta_author && <meta property="author" content={meta.meta_author} />}
    {meta.meta_description && (
      <meta property="description" content={meta.meta_description} />
    )}
    {meta.meta_keywords && (
      <meta property="keywords" content={meta.meta_keywords} />
    )}
    {meta.meta_robots && <meta property="robots" content={meta.meta_robots} />}
    {children}
  </HeadNext>
);
