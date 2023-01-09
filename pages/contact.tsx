import { useEffect, useRef } from "react";
import { NextPage } from "next";
import Head from "next/head";

import { FormProvider } from "components/common/Forms/FormProvider";
import { Layout } from "components/common/Layout/Layout";
import {
  ContactForm,
  ContactFormStructure,
} from "components/ContactForm/ContactForm";

import { TimeoutHandle } from "utils/types";

import styles from "./contact.module.scss";

const Contact: NextPage = () => {
  const timeoutHandle = useRef<TimeoutHandle | null>(null);

  const handleSubmit = async (values: ContactFormStructure) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        alert(JSON.stringify(values, null, 2));
      }, 2000);
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutHandle.current) {
        clearTimeout(timeoutHandle.current);

        timeoutHandle.current = null;
      }
    };
  }, []);

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
            <ContactForm onSubmit={handleSubmit} />
          </FormProvider>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
