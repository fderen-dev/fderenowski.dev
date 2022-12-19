import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { default as Textarea} from 'react-textarea-autosize';

import { Button } from "components/Button/Button";
import Forms, { FormStructure } from "components/Forms";
import validators from "components/Forms/validators";
import { Layout } from "components/Layout/Layout";

import { TimeoutHandle } from "utils/types";

import styles from './contact.module.scss'

interface ContactFormStructure extends FormStructure {
  name: string;
  email: string;
  message: string;
}


const Contact: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutHandle = useRef<TimeoutHandle | null>(null);

  const handleSubmit = (values: ContactFormStructure) => {
    setIsSubmitting(true);

    timeoutHandle.current = setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    return (() => {
      if (timeoutHandle.current) {
        clearTimeout(timeoutHandle.current);

        timeoutHandle.current = null;
      }
    });
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
          <Forms.Form onSubmit={handleSubmit}>
            <Forms.FormGroup>
                <Forms.Input
                  name="name"
                  label="name"
                  placeholder="What's your name?"
                />
                <Forms.Input
                  type="email"
                  name="email"
                  label="E-mail"
                  placeholder="Type your email so I could get back to you"
                />
            </Forms.FormGroup>
            <label>
              <span className={styles.text}>Message</span>
              <Textarea
                minRows={5}
                maxRows={8}
                placeholder="What's on your mind?"
              />
            </label>
            <Button type="submit" loading={isSubmitting}>Send!</Button>
          </Forms.Form>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
