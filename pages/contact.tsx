import { NextPage } from "next";
import Head from "next/head";

import { Button } from "components/Button/Button";
import { Layout } from "components/Layout/Layout";

import styles from './contact.module.scss'


const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>fderenowski.dev - Contact</title>
      </Head>
      <Layout>
        <section className={styles.section}>
          <h2>Any questions?</h2>
          <h3>or feedback?</h3>
          <form className={styles.form}>
            <label>
              <span className={styles.text}>Name</span>
              <input placeholder="What's your name?"></input>
            </label>
            <label>
              <span className={styles.text}>E-mail</span>
              <input
                id="email"
                type="email"
                placeholder="Type your email so I could get back to you"
              ></input>
            </label>
            <label>
              <span className={styles.text}>Message</span>
              <textarea placeholder="What's on your mind?"></textarea>
            </label>
            <Button type="submit">Send!</Button>
          </form>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
