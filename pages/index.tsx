import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import type { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Layout } from "components/common/Layout/Layout";
import { Section } from "components/common/Section/Section";

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
        <Section left header="Lorem" className={styles.section}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros
            risus, efficitur non neque in, tempus mattis ipsum. Duis efficitur
            nibh a vulputate placerat. Aenean id elit vitae quam malesuada
            volutpat a euismod dolor. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Nam luctus finibus sem, eu rhoncus augue aliquet
            sit amet. Aliquam pharetra consequat ex non pulvinar. Praesent
            pellentesque dui sit amet tortor imperdiet, id pretium lorem porta.
            Phasellus eu molestie metus. Vivamus vulputate turpis eu tristique
            suscipit. Fusce id commodo nibh. Vestibulum pharetra lacus nec
            laoreet vestibulum. Praesent malesuada turpis eget nibh posuere, at
            auctor justo aliquam. Suspendisse vel vestibulum lacus, non bibendum
            nisl. Nulla ut hendrerit dolor. Praesent tristique vel lectus non
            dictum.
          </p>
        </Section>
        <Section
          right
          withIntersection
          header="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          className={styles.section}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros
            risus, efficitur non neque in, tempus mattis ipsum. Duis efficitur
            nibh a vulputate placerat. Aenean id elit vitae quam malesuada
            volutpat a euismod dolor. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Nam luctus finibus sem, eu rhoncus augue aliquet
            sit amet. Aliquam pharetra consequat ex non pulvinar. Praesent
            pellentesque dui sit amet tortor imperdiet, id pretium lorem porta.
            Phasellus eu molestie metus. Vivamus vulputate turpis eu tristique
            suscipit. Fusce id commodo nibh. Vestibulum pharetra lacus nec
            laoreet vestibulum. Praesent malesuada turpis eget nibh posuere, at
            auctor justo aliquam. Suspendisse vel vestibulum lacus, non bibendum
            nisl. Nulla ut hendrerit dolor. Praesent tristique vel lectus non
            dictum.
          </p>
        </Section>
        <Section left withIntersection className={styles.section}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros
            risus, efficitur non neque in, tempus mattis ipsum. Duis efficitur
            nibh a vulputate placerat. Aenean id elit vitae quam malesuada
            volutpat a euismod dolor. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Nam luctus finibus sem, eu rhoncus augue aliquet
            sit amet. Aliquam pharetra consequat ex non pulvinar. Praesent
            pellentesque dui sit amet tortor imperdiet, id pretium lorem porta.
            Phasellus eu molestie metus. Vivamus vulputate turpis eu tristique
            suscipit. Fusce id commodo nibh. Vestibulum pharetra lacus nec
            laoreet vestibulum. Praesent malesuada turpis eget nibh posuere, at
            auctor justo aliquam. Suspendisse vel vestibulum lacus, non bibendum
            nisl. Nulla ut hendrerit dolor. Praesent tristique vel lectus non
            dictum.
          </p>
        </Section>
        <Section right withIntersection className={styles.section}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros
            risus, efficitur non neque in, tempus mattis ipsum. Duis efficitur
            nibh a vulputate placerat. Aenean id elit vitae quam malesuada
            volutpat a euismod dolor. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Nam luctus finibus sem, eu rhoncus augue aliquet
            sit amet. Aliquam pharetra consequat ex non pulvinar. Praesent
            pellentesque dui sit amet tortor imperdiet, id pretium lorem porta.
            Phasellus eu molestie metus. Vivamus vulputate turpis eu tristique
            suscipit. Fusce id commodo nibh. Vestibulum pharetra lacus nec
            laoreet vestibulum. Praesent malesuada turpis eget nibh posuere, at
            auctor justo aliquam. Suspendisse vel vestibulum lacus, non bibendum
            nisl. Nulla ut hendrerit dolor. Praesent tristique vel lectus non
            dictum.
          </p>
        </Section>
      </Layout>
    </>
  );
};

export default Home;
