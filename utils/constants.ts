import { Tag } from "models/blog/Tag";

export const ROUTES = {
  HOME: "/",
};

export const TAGS: Record<string, Tag> = {
  react: {
    id: "1",
    name: "react",
    path: "react",
    url: "blog?tag=react",
  },
  snippets: {
    id: "2",
    name: "snippets",
    path: "snippets",
    url: "blog?tag=snippets",
  },
};
