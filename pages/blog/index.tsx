import { useMemo, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";

import { BlogPostsListContainer } from "components/blog/BlogPostsListContainer/BlogPostsListContainer";
import { Button } from "components/common/Button/Button";
import { Head } from "components/common/Head/Head";
import { Footer, Header, Layout, Navbar } from "components/common/Layout";
import { CookieBar } from "components/CookieBar/CookieBar";

import { Tag } from "models/blog/Tag";
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
  availableTags: Array<Tag>,
  selectedTags: Array<string>
): Array<BlogPostsListTag> {
  return availableTags.map((tag) => ({
    ...tag,
    isSelected: Boolean(
      selectedTags.find((selectedTag) => selectedTag === tag.path)
    ),
  }));
}

export interface BlogPostsListTag extends Tag {
  id: string;
  url: string;
  name: string;
  isSelected: boolean;
}

interface TagListProps {
  tags: Array<BlogPostsListTag>;
  onTagClick: (tag: BlogPostsListTag) => void;
}

const TagsList = ({ tags, onTagClick }: TagListProps) => {
  return (
    <ul style={{ display: "flex" }}>
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} onClick={() => onTagClick(tag)} />
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
  const { name, isSelected } = tag;

  return (
    <li className={className}>
      <Button variant={isSelected ? "primary" : "secondary"} onClick={onClick}>
        {name}
      </Button>
    </li>
  );
};

const Container = () => {
  const selectedTags: Array<string> = new URLSearchParams(
    window.location.search
  ).getAll("tag");
  const availableTags: Array<Tag> = [
    { id: "1", name: "angular", path: "angular", url: "blog?tag=angular" },
    { id: "2", name: "react.js", path: "angular", url: "blog?tag=react.js" },
    { id: "3", name: "sass", path: "angular", url: "blog?tag=sass" },
  ];
  const [tags, setTags] = useState<Array<BlogPostsListTag>>(
    markSelectedTags(availableTags, selectedTags)
  );

  const toggleTagSelected = (tag: BlogPostsListTag) => {
    const selectedTagIndex = tags.findIndex((_tag) => _tag.name === tag.name);

    if (selectedTagIndex !== -1) {
      setTags((prev) => {
        const selectedTag = prev[selectedTagIndex];
        selectedTag.isSelected = !selectedTag.isSelected;

        return structuredClone(prev);
      });
    }
  };

  const selectedTagsPaths = useMemo(() => {
    return tags.reduce((tagsPaths, tag) => {
      if (tag.isSelected) {
        return [...tagsPaths, tag.url];
      }

      return tagsPaths;
    }, [] as Array<string>);
  }, [JSON.stringify(tags)]);

  return (
    <>
      <section className={styles.controlsContainer}>
        <TagsList tags={tags} onTagClick={toggleTagSelected} />
      </section>
      <BlogPostsListContainer
        selectedTagsPaths={selectedTagsPaths}
        listClassName={styles.postsList}
        cardClassName={styles.postCard}
      />
    </>
  );
};

export default Blog;
