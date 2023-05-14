import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";

import { BlogPostCard } from "components/Blog/BlogPostCard";
import { Head } from "components/common/Head/Head";
import { Footer } from "components/common/Layout/Footer/Footer";
import { Header } from "components/common/Layout/Header/Header";
import { Layout } from "components/common/Layout/Layout";
import { Navbar } from "components/common/Layout/Navbar/Navbar";
import { CookieBar } from "components/CookieBar/CookieBar";

import { createClient } from "../prismicio";

import styles from "./blog.module.scss";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getByUID("blog", "blog");
  const blogPosts = await client.getAllByType("blogpost");
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
      blogPosts,
      navigation,
      header,
      footer,
      cookieBar,
    },
  };
};

const Blog: NextPage<{
  page: Content.BlogDocument;
  blogPosts: Array<Content.BlogpostDocument>;
  navigation: Content.NavigationDocument;
  header: Content.HeaderDocument;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
}> = ({
  page,
  blogPosts,
  navigation,
  header: mainHeader,
  footer,
  cookieBar,
}) => {
  const {
    data: { name, ...meta },
  } = page;

  return (
    <>
      <Head meta={meta} />
      <Layout
        Navbar={<Navbar prismicDocumentData={navigation.data} />}
        Header={<Header prismicDocumentData={mainHeader.data} />}
        Footer={<Footer prismicDocumentData={footer.data} />}
        mainClassName={styles.main}
      >
        <div className={styles.controlsContainer}></div>
        <ul className={styles.posts}>
          {blogPosts.map((blogPost) => (
            <BlogPostCard
              prismicDocumentData={blogPost}
              className={styles.postCard}
              key={blogPost.id}
            />
          ))}
        </ul>
      </Layout>
      <CookieBar prismicDocumentData={cookieBar.data} />
    </>
  );
};

export default Blog;
