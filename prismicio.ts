import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import sm from "./slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

// Update the routes array to match your project's route structure
/** @type {prismic.ClientConfig['routes']} **/
const routes = [
  {
    type: "homepage",
    uid: "home",
    path: "/",
    lang: "en-us",
  },
  {
    type: "about",
    uid: "about-me",
    path: "/about",
    lang: "en-us",
  },
  {
    type: "contact",
    uid: "contact",
    path: "/contact",
    lang: "en-us",
  },
  {
    type: "blog",
    uid: "blog",
    path: "/blog",
    lang: "en-us",
  },
  {
    type: "blogpost",
    path: "/blog/:uid",
    lang: "en-us",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = ({
  previewData,
  req,
  ...config
}: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData,
    req,
  });

  return client;
};
