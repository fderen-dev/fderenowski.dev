import { GetStaticProps, NextPage } from "next";
import type { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Head } from "components/common/Head/Head";
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
  const {
    data: { slices: slicesData, ...meta },
  } = page;

  return (
    <>
      <Head meta={meta} />
      <Layout contentClassName={styles.layoutContent}>
        <SliceZone slices={slicesData} components={slices} />
      </Layout>
    </>
  );
};

export default Home;
