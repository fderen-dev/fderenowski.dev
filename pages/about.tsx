import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Head } from "components/common/Head/Head";
import { Layout } from "components/common/Layout/Layout";

import { createClient } from "../prismicio";
import { components as slices } from "../slices";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const result = await client.getByUID<Content.AboutDocument>(
    "about",
    "about-me"
  );

  return {
    props: result,
  };
};

const About: NextPage<Content.AboutDocument> = (page) => {
  const {
    data: { slices: slicesData, ...meta },
  } = page;

  return (
    <>
      <Head meta={meta} />
      <Layout>
        <SliceZone slices={slicesData} components={slices} />
      </Layout>
    </>
  );
};

export default About;
