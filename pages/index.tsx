import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import type { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Layout } from "components/common/Layout/Layout";

import { createClient } from "../prismicio";
import { components as slices } from "../slices";

import styles from "./index.module.scss";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const result = await client.getByUID<Content.HomepageDocument>(
    "homepage",
    "home"
  );

  return {
    props: result,
  };
};

const Home: NextPage<Content.HomepageDocument> = (page) => {
  console.log(page);

  const {
    data: { slices: slicesData, ...meta },
  } = page;

  return (
    <>
      <Head>
        {meta.meta_title && <title>{meta.meta_title}</title>}
        {meta.meta_author && (
          <meta property="author" content={meta.meta_author} />
        )}
        {meta.meta_description && (
          <meta property="description" content={meta.meta_description} />
        )}
        {meta.meta_keywords && (
          <meta property="keywords" content={meta.meta_keywords} />
        )}
        {meta.meta_robots && (
          <meta property="robots" content={meta.meta_robots} />
        )}
      </Head>
      <Layout contentClassName={styles.layoutContent}>
        <SliceZone slices={slicesData} components={slices} />
      </Layout>
    </>
  );
};

export default Home;
