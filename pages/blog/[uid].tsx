import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { SliceZone } from "@prismicio/react";
import { components as slices } from "slices";

import { Footer, Layout, Navbar } from "components/common/Layout";
import { CookieBar } from "components/CookieBar/CookieBar";

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
  const { name, header, datecreated, slices: slicesData } = page?.data ?? {};

  const date = datecreated ? new Date(datecreated).toDateString() : null;

  return (
    <Layout
      Navbar={<Navbar prismicDocumentData={navigation.data} />}
      Footer={<Footer prismicDocumentData={footer.data} />}
      CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
      contentWrapperClassName={styles.layoutContentWrapper}
      contentContainerClassName={styles.layoutContentContainer}
    >
      <header style={{ display: "flex", alignItems: "start" }}>
        <h1 style={{ flexGrow: 1 }}>{name}</h1>
        {date && <time>{date}</time>}
      </header>
      <h2>{header}</h2>
      <section>
        <SliceZone slices={slicesData} components={slices} />
      </section>
    </Layout>
  );
};

export default BlogPost;
