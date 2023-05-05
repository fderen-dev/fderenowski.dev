import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";

import { BlogPostCard } from "components/Blog/BlogPostCard";

import { createClient } from "../prismicio";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getByUID("blog", "blog");
  const blogPosts = await client.getAllByType("blogpost");

  return {
    props: {
      page,
      blogPosts,
    },
  };
};

const Blog: NextPage<{
  page: Content.BlogDocument;
  blogPosts: Array<Content.BlogpostDocument>;
}> = ({ page, blogPosts }) => {
  const {
    data: { name },
  } = page;

  return (
    <main>
      <h1>{name}</h1>
      <ul>
        {blogPosts.map((blogPost) => (
          <BlogPostCard prismicDocumentData={blogPost} key={blogPost.id} />
        ))}
      </ul>
    </main>
  );
};

export default Blog;
