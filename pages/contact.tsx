import { NextPage } from "next";
import Head from "next/head";

import { FormProvider } from "components/common/Forms/FormProvider";
import { Layout } from "components/common/Layout/Layout";
import { ContactForm } from "components/ContactForm/ContactForm";

import styles from "./contact.module.scss";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>fderenowski.dev - Contact</title>
      </Head>
      <Layout>
        <section className={styles.section}>
          <h2 className={styles.heading}>
            Any questions?
            <div className={styles.subheading}>or feedback?</div>
          </h2>
          <FormProvider>
            <ContactForm />
          </FormProvider>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
