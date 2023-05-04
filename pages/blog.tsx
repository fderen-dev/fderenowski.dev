import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";

import { TypeTools } from "utils/TypeTools";

import { createClient } from "../prismicio";

const getBlogPostUrl = (path: string | null): string => {
  if (TypeTools.isNullOrUndefined(path)) {
    return "/blog";
  }

  return `/blog/${path}`;
};

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
          <li key={blogPost.id}>
            <a href={getBlogPostUrl(blogPost.data.path)}>
              {blogPost.data.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Blog;
