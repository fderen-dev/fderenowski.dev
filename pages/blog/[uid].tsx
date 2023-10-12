import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { getTags } from "pages/api/posts";
import { components as slices } from "slices";

import { Tag } from "components/blog/TagsList/Tag/Tag";
import { Footer, Layout, Navbar } from "components/common/Layout";
import { CookieBar } from "components/CookieBar/CookieBar";

import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { useClientSideDate } from "utils/hooks";
import { TypeTools } from "utils/TypeTools";

import { createClient } from "../../prismicio";

import styles from "./blogPost.module.scss";

// Fetch content from prismic
export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData });
  let page: Content.BlogpostDocument<string>;

  try {
  page = await client.getByUID("blogpost", params!.uid as string);

    if (TypeTools.isNullOrUndefined(page)) {
      return {
        notFound: true,
      };
    }
  } catch {
        return {
          notFound: true,
        };
  }

  (page as unknown as BlogpostDocumentWithTags).data.tags = getTags(
    page.data.tags
  );

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
    fallback: "blocking",
  };
};

const BlogPost: NextPage<{
  page: BlogpostDocumentWithTags;
  navigation: Content.NavigationDocument;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
}> = ({ page, navigation, footer, cookieBar }) => {
  const {
    header,
    datecreated,
    slices: slicesData,
    background,
    tags,
  } = page?.data ?? {};
  const date = useClientSideDate(datecreated);
  const hasTags = Boolean(tags?.length);

  return (
    <Layout
      Navbar={<Navbar prismicDocumentData={navigation.data} />}
      Footer={<Footer prismicDocumentData={footer.data} />}
      CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
      contentWrapperClassName={styles.layoutContentWrapper}
      contentContainerClassName={styles.layoutContentContainer}
    >
      <header className={styles.header}>
        <PrismicNextImage
          field={background}
          className={styles.headerImage}
          draggable={false}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{header}</h1>
          {date && <time className={styles.headerDate}>{date}</time>}
          {hasTags && (
            <ul className={styles.headerTagsList}>
              {tags.map((tag) => (
                <Tag
                  isLink
                  tag={tag}
                  key={tag.id}
                  buttonClassName={styles.headerTagButton}
                />
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
