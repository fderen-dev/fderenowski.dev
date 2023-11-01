import { GetStaticProps, NextPage } from "next";
import { Content } from "@prismicio/client";

import { FormProvider } from "components/common/Forms/FormProvider";
import { Footer, Header, Layout, Navbar } from "components/common/Layout";
import { MetaSliceZone } from "components/common/MetaSliceZone/MetaSliceZone";
import { ContactForm } from "components/ContactForm/ContactForm";
import { CookieBar } from "components/CookieBar/CookieBar";

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
  const formGroup = await client.getByUID<Content.FormgroupDocument>(
    "formgroup",
    "conctact-form-nameemail-form-group"
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
      contact,
      form,
      formGroup,
      navigation,
      header,
      footer,
      cookieBar,
    },
  };
};

const Contact: NextPage<{
  contact: Content.ContactDocument;
  form: Content.FormDocument;
  formGroup: Content.FormgroupDocument;
  navigation: Content.NavigationDocument;
  header: Content.HeaderDocument;
  footer: Content.FooterDocument;
  cookieBar: Content.CookiebarDocument;
}> = ({
  contact,
  form,
  formGroup,
  navigation,
  header: mainHeader,
  footer,
  cookieBar,
}) => {
  const {
    data: { header, subheading, slices1: meta },
  } = contact;
  const conctactFormPrismicDocumentData = {
    form: form.data,
    formGroup: formGroup.data,
  };

  return (
    <>
      <MetaSliceZone slices={meta} />
      <Layout
        Navbar={<Navbar prismicDocumentData={navigation.data} />}
        Header={<Header prismicDocumentData={mainHeader.data} />}
        Footer={<Footer prismicDocumentData={footer.data} />}
        CookieBar={<CookieBar prismicDocumentData={cookieBar.data} />}
      >
        <section className={styles.section}>
          <h2 className={styles.heading}>
            {header}
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
          </h2>
          <FormProvider>
            <ContactForm
              prismicDocumentData={conctactFormPrismicDocumentData}
            />
          </FormProvider>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
