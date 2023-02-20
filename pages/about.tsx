import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Head } from "components/common/Head/Head";
import { Footer } from "components/common/Layout/Footer/Footer";
import { Header } from "components/common/Layout/Header/Header";
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
  const header = await client.getByUID<Content.HeaderDocument>(
    "header",
    "main-header"
  );
  const footer = await client.getByUID<Content.FooterDocument>(
    "footer",
    "footer"
  );

  return {
    props: {
      page,
      navigation,
      header,
      footer,
    },
  };
};

const About: NextPage<{
  page: Content.AboutDocument;
  navigation: Content.NavigationDocument;
  header: Content.HeaderDocument;
  footer: Content.FooterDocument;
}> = ({ page, navigation, header, footer }) => {
  const {
    data: { slices1: slicesData, ...meta },
  } = page;

  return (
    <>
      <Head meta={meta} />
      <Layout
        Navbar={<Navbar prismicDocumentData={navigation.data} />}
        Header={<Header prismicDocumentData={header.data} />}
        Footer={<Footer prismicDocumentData={footer.data} />}
      >
        <SliceZone slices={slicesData} components={slices} />
      </Layout>
    </>
  );
};

export default About;
