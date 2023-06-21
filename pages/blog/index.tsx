import { useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";

import { BlogPostsListContainer } from "components/blog/BlogPostsListContainer/BlogPostsListContainer";
import { Button } from "components/common/Button/Button";
import { Head } from "components/common/Head/Head";
import { Footer, Header, Layout, Navbar } from "components/common/Layout";
import { CookieBar } from "components/CookieBar/CookieBar";

import { ClientSideContainer } from "utils/components";

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
        <ClientSideContainer>
          <Container />
        </ClientSideContainer>
      </Layout>
    </>
  );
};

function markSelectedTags(
  availableTags: Array<string>,
  selectedTags: Array<string>
): Array<{ label: string; isSelected: boolean }> {
  return availableTags.map((tag) => ({
    label: tag,
    isSelected: selectedTags.includes(tag),
  }));
}

interface BlogPostsListTag {
  label: string;
  isSelected: boolean;
}

const TagsList = ({ tags }: { tags: Array<BlogPostsListTag> }) => {
  return (
    <ul style={{ display: "flex" }}>
      {tags.map((tag, index) => (
        <Tag
          key={index}
          tag={tag}
          onClick={() => {
            console.log(tag);
          }}
        />
      ))}
    </ul>
  );
};

const Tag = ({
  tag,
  onClick,
  className,
}: {
  tag: BlogPostsListTag;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}) => {
  const { label, isSelected } = tag;

  return (
    <li className={className}>
      <Button variant={isSelected ? "primary" : "secondary"} onClick={onClick}>
        {label}
      </Button>
    </li>
  );
};

const Container = () => {
  const selectedTags: Array<string> = new URLSearchParams(
    window.location.search
  ).getAll("tag");
  const availableTags = ["angular", "react.js", "sass"];
  const [tags] = useState<Array<BlogPostsListTag>>(
    markSelectedTags(availableTags, selectedTags)
  );

  return (
    <>
      <section className={styles.controlsContainer}>
        <TagsList tags={tags} />
      </section>
      <BlogPostsListContainer
        selectedTags={selectedTags}
        listClassName={styles.postsList}
        cardClassName={styles.postCard}
      />
    </>
  );
};

export default Blog;
