import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Layout } from "components/Layout/Layout";
import { Section } from "components/Section/Section";

import portrait from '../public/static/portrait.webp';

import styles from './about.module.scss';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>fderenowski.dev - About</title>
      </Head>
      <Layout>
        <Section center className={styles.section}>
          <Image
            src={portrait}
            alt="Picture of the author"
            sizes="(max-width: 1920px) 80vw, 800px"
            className={styles.portrait}
          />
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

export default About;
