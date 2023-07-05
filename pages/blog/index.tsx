import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";

import { BlogContainer } from "components/blog/BlogContainer/BlogContainer";
import { BlogPostsListContainer } from "components/blog/BlogPostsListContainer/BlogPostsListContainer";
import { TagsList } from "components/blog/TagsList/TagsList";
import { Head } from "components/common/Head/Head";
import { Footer, Header, Layout, Navbar } from "components/common/Layout";
import { CookieBar } from "components/CookieBar/CookieBar";

import { Tag } from "models/blog/Tag";
import { ClientSideContainer } from "utils/components";
import { TAGS } from "utils/constants";

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

  const blogPostsTags = Array.from(Object.values(TAGS));

  return {
    props: {
      page,
      navigation,
      header,
      footer,
      cookieBar,
      blogPostsTags,
    },
  };
};

const Blog: NextPage<{
  page: Content.BlogDocument;
  navigation: Content.NavigationDocument;
  header: Content.HeaderDocument;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
  blogPostsTags: Array<Tag>;
}> = ({
  page,
  navigation,
  header: mainHeader,
  footer,
  cookieBar,
  blogPostsTags,
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
        CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
        contentContainerClassName={styles.main}
      >
        <ClientSideContainer>
          <BlogContainer
            blogPostsTags={blogPostsTags}
            renderTagsList={(tags, toggleTagSelected) =>
              tags && (
                <TagsList
                  tags={tags}
                  onTagClick={toggleTagSelected}
                  className={styles.tagsListWrapper}
                />
              )
            }
            renderBlogPostsListContainer={(
              selectedTagsPaths,
              toggleTagSelected
            ) => (
              <BlogPostsListContainer
                selectedTagsPaths={selectedTagsPaths}
                onTagPillClick={toggleTagSelected}
                listClassName={styles.postsList}
                cardClassName={styles.postCard}
              />
            )}
          />
        </ClientSideContainer>
      </Layout>
    </>
  );
};

export default Blog;
