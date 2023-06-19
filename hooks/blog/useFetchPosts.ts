import { useMemo } from "react";

import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { FetchReturnType } from "models/misc";
import { useFetch } from "hooks/useFetch";

const getPostsEndpointUrl = (tags: Array<string>) => {
  const url = new URL(`${origin}/api/posts`);
  tags.forEach((tag) => {
    url.searchParams.append("tag", tag);
  });

  return url;
};

export const useFetchPosts = (
  tags: Array<string>
): FetchReturnType<Array<BlogpostDocumentWithTags>> => {
  const url = useMemo(() => getPostsEndpointUrl(tags), [JSON.stringify(tags)]);
  const { data, isFetching, error } =
    useFetch<Array<BlogpostDocumentWithTags>>(url);

  return {
    data,
    isFetching,
    error,
  };
};
