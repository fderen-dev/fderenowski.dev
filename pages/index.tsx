import { GetStaticProps, NextPage } from "next";
import type { Content } from "@prismicio/client";
import { HomePageArticle } from "customtypes/home_page_article/HomePageArticle";

import { Footer, Header, Layout, Navbar } from "components/common/Layout";
import { MetaSliceZone } from "components/common/MetaSliceZone/MetaSliceZone";
import { CookieBar } from "components/CookieBar/CookieBar";

import { createClient } from "../prismicio";

import styles from "./index.module.scss";

const sortArticles = (
  article1: Content.HomePageArticleDocument,
  article2: Content.HomePageArticleDocument
): number => {
  return (article1.data.order ?? 0) - (article2.data.order ?? 0);
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getByUID<Content.HomepageDocument>(
    "homepage",
    "home"
  );
  const articles = await client.getAllByType("home_page_article");
  const navigation = await client.getByUID<Content.NavigationDocument>(
    "navigation",
    "top-navigation"
  );
  const header = await client.getByUID<Content.HeaderDocument>(
    "header",
    "main-header"
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
    props: {
      page,
      navigation,
      header,
      articles,
      footer,
      cookieBar,
    },
  };
};

const Home: NextPage<{
  page: Content.HomepageDocument;
  navigation: Content.NavigationDocument;
  header: Content.HeaderDocument;
  articles: Array<Content.HomePageArticleDocument>;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
}> = ({ page, navigation, header, articles, footer, cookieBar }) => {
  const {
    data: { slices: meta },
  } = page;

  return (
    <>
      <MetaSliceZone slices={meta} />
      <Layout
        Navbar={<Navbar prismicDocumentData={navigation.data} />}
        Header={<Header prismicDocumentData={header.data} />}
        Footer={<Footer prismicDocumentData={footer.data} />}
        CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
        contentContainerClassName={styles.layoutContent}
      >
        {articles.sort(sortArticles).map((article) => (
          <HomePageArticle
            prismicDocumentData={article.data}
            key={article.uid}
          />
        ))}
      </Layout>
    </>
  );
};

export default Home;
