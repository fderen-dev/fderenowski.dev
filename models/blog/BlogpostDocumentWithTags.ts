import { Content } from "@prismicio/client";

import { Tag } from "./Tag";

export type BlogpostDocumentWithTags = Omit<
  Content.BlogpostDocument,
  "data"
> & {
  data: BlogpostDocumentDataWithTags;
};

type BlogpostDocumentDataWithTags = Omit<
  Content.BlogpostDocumentData,
  "tags"
> & {
  tags: Array<Tag>;
};
