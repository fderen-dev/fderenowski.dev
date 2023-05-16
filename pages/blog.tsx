import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import { Tag } from "models/blog/Tag";

import { BlogPostCard } from "components/Blog/BlogPostCard";
import { Head } from "components/common/Head/Head";
import { Footer } from "components/common/Layout/Footer/Footer";
import { Header } from "components/common/Layout/Header/Header";
import { Layout } from "components/common/Layout/Layout";
import { Navbar } from "components/common/Layout/Navbar/Navbar";
import { CookieBar } from "components/CookieBar/CookieBar";

import { TypeTools } from "utils/TypeTools";

import { createClient } from "../prismicio";

import styles from "./blog.module.scss";

export type BlogpostDocumentWithTags = Omit<
  Content.BlogpostDocument,
  "data"
> & {
  data: BlogpostDocumentDataWithTags;
};

type BlogpostDocumentDataWithTags = Omit<
  Content.BlogpostDocumentData,
  "tags"
> & {
  tags: Array<Tag>;
};

const getTags = (raw: string | null): Array<Tag> => {
  if (TypeTools.isNullOrUndefined(raw)) {
    return [];
  }

  return raw!.split(";").map<Tag>((name, idx) => ({
    name,
    url: `blog?tag=${name}`,
    key: `tag-${idx}`,
  }));
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });
  const page = await client.getByUID("blog", "blog");
  let blogPosts = await client.getAllByType("blogpost");
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

  // @ts-ignore
  blogPosts =
    blogPosts?.map((post) => ({
      ...post,
      data: { ...post.data, tags: getTags(post.data?.tags) },
    })) ?? [];

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
  blogPosts: Array<BlogpostDocumentWithTags>;
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
              prismicDocument={blogPost}
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
