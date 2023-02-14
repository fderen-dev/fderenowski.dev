import { GetStaticProps, NextPage } from "next";
import type { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Head } from "components/common/Head/Head";
import { Layout } from "components/common/Layout/Layout";
import { Navbar } from "components/common/Layout/Navbar/Navbar";

import { createClient } from "../prismicio";
import { components as slices } from "../slices";

import styles from "./index.module.scss";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getByUID<Content.HomepageDocument>(
    "homepage",
    "home"
  );
  const navigation = await client.getByUID<Content.NavigationDocument>(
    "navigation",
    "top-navigation"
  );

  return {
    props: {
      page,
      navigation,
    },
  };
};

const Home: NextPage<{
  page: Content.HomepageDocument;
  navigation: Content.NavigationDocument;
}> = ({ page, navigation }) => {
  const {
    data: { slices: slicesData, ...meta },
  } = page;

  return (
    <>
      <Head meta={meta} />
      <Layout
        Navbar={<Navbar navigationData={navigation.data} />}
        contentClassName={styles.layoutContent}
      >
        <SliceZone slices={slicesData} components={slices} />
      </Layout>
    </>
  );
};

export default Home;
