import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Content } from "@prismicio/client";

import { BlogPostCard } from "components/blog/BlogPostCard";
import { Head } from "components/common/Head/Head";
import { Footer } from "components/common/Layout/Footer/Footer";
import { Header } from "components/common/Layout/Header/Header";
import { Layout } from "components/common/Layout/Layout";
import { Navbar } from "components/common/Layout/Navbar/Navbar";
import { CookieBar } from "components/CookieBar/CookieBar";

import { useFetchPosts } from "hooks/blog/useFetchPosts";
import { TypeTools } from "utils/TypeTools";

import { createClient } from "../../prismicio";

import styles from "./blog.module.scss";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });
  const page = await client.getByUID("blog", "blog");
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
      footer,
      cookieBar,
    },
  };
};

const Blog: NextPage<{
  page: Content.BlogDocument;
  navigation: Content.NavigationDocument;
  header: Content.HeaderDocument;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
}> = ({ page, navigation, header: mainHeader, footer, cookieBar }) => {
  const {
    data: { name, ...meta },
  } = page;

  const { query } = useRouter();

  let tags: Array<string> = [];

  if (!TypeTools.isNullOrUndefined(query.tag)) {
    if (Array.isArray(query.tag)) {
      tags = query.tag;
    } else if (typeof query.tag === "string") {
      tags = [query.tag!];
    }
  }

  const { data: posts, isFetching, error } = useFetchPosts(tags);

  return (
    <>
      <Head meta={meta} />
      <Layout
        Navbar={<Navbar prismicDocumentData={navigation.data} />}
        Header={<Header prismicDocumentData={mainHeader.data} />}
        Footer={<Footer prismicDocumentData={footer.data} />}
        CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
        mainClassName={styles.main}
      >
        <div className={styles.controlsContainer}></div>
        {isFetching && <p>Loading</p>}
        {error && <p>{error}</p>}
        {posts && (
          <ul className={styles.posts}>
            {posts.map((blogPost) => (
              <BlogPostCard
                prismicDocument={blogPost}
                className={styles.postCard}
                key={blogPost.id}
              />
            ))}
          </ul>
        )}
      </Layout>
    </>
  );
};

export default Blog;
