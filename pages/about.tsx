import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Head } from "components/common/Head/Head";
import { Layout } from "components/common/Layout/Layout";
import { Navbar } from "components/common/Layout/Navbar/Navbar";

import { createClient } from "../prismicio";
import { components as slices } from "../slices";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getByUID<Content.AboutDocument>(
    "about",
    "about-me"
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

const About: NextPage<{
  page: Content.AboutDocument;
  navigation: Content.NavigationDocument;
}> = ({ page, navigation }) => {
  const {
    data: { slices1: slicesData, ...meta },
  } = page;

  return (
    <>
      <Head meta={meta} />
      <Layout Navbar={<Navbar prismicDocumentData={navigation.data} />}>
        <SliceZone slices={slicesData} components={slices} />
      </Layout>
    </>
  );
};

export default About;
