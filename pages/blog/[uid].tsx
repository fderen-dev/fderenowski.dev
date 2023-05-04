import { GetStaticProps } from "next";
import * as prismicH from "@prismicio/helpers";

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
