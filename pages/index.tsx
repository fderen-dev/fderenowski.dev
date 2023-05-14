import { GetStaticProps, NextPage } from "next";
import type { Content } from "@prismicio/client";
import { HomePageArticle } from "customtypes/home_page_article/HomePageArticle";

import { Head } from "components/common/Head/Head";
import { Footer } from "components/common/Layout/Footer/Footer";
import { Header } from "components/common/Layout/Header/Header";
import { Layout } from "components/common/Layout/Layout";
import { Navbar } from "components/common/Layout/Navbar/Navbar";
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
    data: { slices: slicesData, ...meta },
  } = page;

  return (
    <>
      <Head meta={meta} />
      <Layout
        Navbar={<Navbar prismicDocumentData={navigation.data} />}
        Header={<Header prismicDocumentData={header.data} />}
        Footer={<Footer prismicDocumentData={footer.data} />}
        mainClassName={styles.layoutContent}
      >
        {articles.sort(sortArticles).map((article) => (
          <HomePageArticle
            prismicDocumentData={article.data}
            key={article.uid}
          />
        ))}
      </Layout>
      <CookieBar prismicDocumentData={cookieBar.data} />
    </>
  );
};

export default Home;
