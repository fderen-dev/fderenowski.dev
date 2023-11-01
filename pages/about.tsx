import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Footer, Header, Layout, Navbar } from "components/common/Layout";
import { MetaSliceZone } from "components/common/MetaSliceZone/MetaSliceZone";
import { CookieBar } from "components/CookieBar/CookieBar";

import { createClient } from "../prismicio";
import { components } from "../slices";

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
  const cookieBar = await client.getByUID<Content.CookiebarDocument>(
    "cookiebar",
    "cookie-bar"
  );

  return {
    props: {
      page,
      navigation,
      header,
      footer,
      cookieBar,
    },
  };
};

const About: NextPage<{
  page: Content.AboutDocument;
  navigation: Content.NavigationDocument;
  header: Content.HeaderDocument;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
}> = ({ page, navigation, header, footer, cookieBar }) => {
  const {
    data: { slices: meta, slices1: fragments },
  } = page;

  console.log(page);

  return (
    <>
      <MetaSliceZone slices={meta} />
      <Layout
        Navbar={<Navbar prismicDocumentData={navigation.data} />}
        Header={<Header prismicDocumentData={header.data} />}
        Footer={<Footer prismicDocumentData={footer.data} />}
        CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
      >
        <SliceZone slices={fragments} components={components} />
      </Layout>
    </>
  );
};

export default About;
