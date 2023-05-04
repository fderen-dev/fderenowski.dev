import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { SliceZone } from "@prismicio/react";
import { components as slices } from "slices";

import { createClient } from "../../prismicio";

// Fetch content from prismic
export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData });

  const page = await client.getByUID("blogpost", params!.uid as string);

  return {
    props: { page },
  };
};

export const getStaticPaths = async () => {
  const client = createClient();

  const pages = await client.getAllByType("blogpost");

  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: true,
  };
};

const BlogPost: NextPage<{
  page: Content.BlogpostDocument;
}> = ({ page }) => {
  const {
    data: { name, header, datecreated, slices: slicesData },
  } = page;

  const date = datecreated ? new Date(datecreated).toDateString() : null;

  return (
    <main>
      <header style={{ display: "flex", alignItems: "start" }}>
        <h1 style={{ flexGrow: 1 }}>{name}</h1>
        {date && <time>{date}</time>}
      </header>
      <h2>{header}</h2>
      <section>
        <SliceZone slices={slicesData} components={slices} />
      </section>
    </main>
  );
};

export default BlogPost;
