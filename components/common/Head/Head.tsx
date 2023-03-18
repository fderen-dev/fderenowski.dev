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
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    {children}
  </HeadNext>
);
