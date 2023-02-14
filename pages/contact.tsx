import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";

import { FormProvider } from "components/common/Forms/FormProvider";
import { Head } from "components/common/Head/Head";
import { Layout } from "components/common/Layout/Layout";
import { Navbar } from "components/common/Layout/Navbar/Navbar";
import { ContactForm } from "components/ContactForm/ContactForm";

import { createClient } from "../prismicio";

import styles from "./contact.module.scss";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const contact = await client.getByUID<Content.ContactDocument>(
    "contact",
    "contact"
  );
  const form = await client.getByUID<Content.FormDocument>(
    "form",
    "contact-form"
  );
  const navigation = await client.getByUID<Content.NavigationDocument>(
    "navigation",
    "top-navigation"
  );

  return {
    props: {
      contact,
      form,
      navigation,
    },
  };
};

const Contact: NextPage<{
  contact: Content.ContactDocument;
  form: Content.FormDocument;
  navigation: Content.NavigationDocument;
}> = ({ contact, form, navigation }) => {
  const {
    data: { header, subheading, ...meta },
  } = contact;

  return (
    <>
      <Head meta={meta} />
      <Layout Navbar={<Navbar navigationData={navigation.data} />}>
        <section className={styles.section}>
          <h2 className={styles.heading}>
            {header}
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
          </h2>
          <FormProvider>
            <ContactForm formData={form.data} />
          </FormProvider>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
