import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicImage, SliceZone } from "@prismicio/react";
import { components as slices } from "slices";

import { Footer, Layout, Navbar } from "components/common/Layout";
import { CookieBar } from "components/CookieBar/CookieBar";

import { useClientSideDate } from "utils/hooks";

import { createClient } from "../../prismicio";

import styles from "./blogPost.module.scss";

// Fetch content from prismic
export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData });

  const page = await client.getByUID("blogpost", params!.uid as string);
  const navigation = await client.getByUID<Content.NavigationDocument>(
    "navigation",
    "top-navigation"
  );
  const footer = await client.getByUID<Content.FooterDocument>(
    "footer",
    "footer"
  );
  const cookieBar = await client.getByUID<Content.CookiebarDocument>(
    "cookiebar",
    "cookie-bar"
  );

  return {
    props: { page, navigation, footer, cookieBar },
  };
};

export const getStaticPaths = async () => {
  const client = createClient();

  const pages = await client.getAllByType("blogpost");

  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: true,
  };
};

const BlogPost: NextPage<{
  page: Content.BlogpostDocument;
  navigation: Content.NavigationDocument;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
}> = ({ page, navigation, footer, cookieBar }) => {
  const {
    name,
    header,
    datecreated,
    slices: slicesData,
    background,
    tags,
  } = page?.data ?? {};
  const date = useClientSideDate(datecreated);

  const mappedTags = tags?.split(";") ?? null;

  return (
    <Layout
      Navbar={<Navbar prismicDocumentData={navigation.data} />}
      Footer={<Footer prismicDocumentData={footer.data} />}
      CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
      contentWrapperClassName={styles.layoutContentWrapper}
      contentContainerClassName={styles.layoutContentContainer}
    >
      <header className={styles.header}>
        <PrismicImage field={background} className={styles.headerImage} />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{header}</h1>
          {date && <time className={styles.headerDate}>{date}</time>}
          {mappedTags && (
            <ul className={styles.headerTagsList}>
              {mappedTags.map((mappedTag) => (
                <li key={mappedTag}>{mappedTag}</li>
              ))}
            </ul>
          )}
        </div>
      </header>
      <article className={styles.article}>
        <SliceZone slices={slicesData} components={slices} />
      </article>
    </Layout>
  );
};

export default BlogPost;
