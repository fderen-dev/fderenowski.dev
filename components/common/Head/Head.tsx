import HeadNext from "next/head";

type NullableStringProperty = string | null;

interface HeadProps {
  meta_title: NullableStringProperty;
  meta_author: NullableStringProperty;
  meta_description: NullableStringProperty;
  meta_keywords: NullableStringProperty;
  meta_robots: NullableStringProperty;
  meta_og_title: NullableStringProperty;
  meta_og_description: NullableStringProperty;
  meta_og_image: NullableStringProperty;
  meta_og_type: NullableStringProperty;
  meta_og_url: NullableStringProperty;
  meta_og_site_name: NullableStringProperty;
  children?: React.ReactNode;
}

export const Head = ({ children, ...meta }: HeadProps) => {
  const ogTitle = meta.meta_og_title || meta.meta_title;
  const ogDescription = meta.meta_og_description || meta.meta_description;

  return (
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
      {ogTitle && (
        <meta property="og:title" content={ogTitle} />
      )}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {meta.meta_og_image && (
        <meta property="og:image" content={meta.meta_og_image} />
      )}
      {meta.meta_og_type && (
        <meta property="og:type" content={meta.meta_og_type} />
      )}
      {meta.meta_og_url && (
        <meta property="og:url" content={meta.meta_og_url} />
      )}
      {meta.meta_og_site_name && (
        <meta property="og:site_name" content={meta.meta_og_site_name} />
      )}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      {children}
    </HeadNext>
    );
  };
