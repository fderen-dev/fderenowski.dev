import { useCallback, useMemo, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import classNames from "classnames";

import { BlogPostsListContainer } from "components/blog/BlogPostsListContainer/BlogPostsListContainer";
import { Button } from "components/common/Button/Button";
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
        mainClassName={styles.main}
      >
        <ClientSideContainer>
          {blogPostsTags && <Container blogPostsTags={blogPostsTags} />}
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
  className?: string;
}

const TagsList = ({ tags, onTagClick, className }: TagListProps) => {
  return (
    <ul
      style={{ display: "flex" }}
      className={classNames(styles.tagsList, className)}
    >
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

interface ContainerProps {
  blogPostsTags: Array<Tag>;
}

const Container = ({ blogPostsTags }: ContainerProps) => {
  const selectedTags: Array<string> = new URLSearchParams(
    window.location.search
  ).getAll("tag");
  const [tags, setTags] = useState<Array<BlogPostsListTag>>(
    markSelectedTags(blogPostsTags, selectedTags)
  );

  const toggleTagSelected = useCallback((tag: BlogPostsListTag | Tag) => {
    setTags((prev) => {
      const selectedTagIndex = prev.findIndex((_tag) => _tag.id === tag.id);

      if (selectedTagIndex === -1) {
        return prev;
      }

      const selectedTag = prev[selectedTagIndex];
      selectedTag.isSelected = !selectedTag.isSelected;

      return structuredClone(prev);
    });
  }, []);

  const selectedTagsPaths = useMemo(() => {
    return tags.reduce((tagsPaths, tag) => {
      if (tag.isSelected) {
        return [...tagsPaths, tag.path];
      }

      return tagsPaths;
    }, [] as Array<string>);
  }, [JSON.stringify(tags)]);

  return (
    <>
      <TagsList
        tags={tags}
        onTagClick={toggleTagSelected}
        className={styles.tagsListWrapper}
      />
      <BlogPostsListContainer
        selectedTagsPaths={selectedTagsPaths}
        onTagPillClick={toggleTagSelected}
        listClassName={styles.postsList}
        cardClassName={styles.postCard}
      />
    </>
  );
};

export default Blog;
