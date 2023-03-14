import HeadNext from "next/head";

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
    {meta.meta_author && <meta name="author" content={meta.meta_author} />}
    {meta.meta_description && (
      <meta name="description" content={meta.meta_description} />
    )}
    {meta.meta_keywords && (
      <meta name="keywords" content={meta.meta_keywords} />
    )}
    {meta.meta_robots && <meta name="robots" content={meta.meta_robots} />}
    {children}
  </HeadNext>
);
