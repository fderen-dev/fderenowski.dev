import { useMemo } from "react";

import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { FetchReturnType } from "models/misc";
import { useFetch } from "hooks/useFetch";

const getPostsEndpointUrl = (tagsPaths: Array<string>) => {
  const url = new URL(`${origin}/api/posts`);
  tagsPaths.forEach((path) => {
    url.searchParams.append("tag", path);
  });

  return url;
};

export const useFetchPosts = (
  tagsPaths: Array<string>
): FetchReturnType<Array<BlogpostDocumentWithTags>> => {
  const url = useMemo(
    () => getPostsEndpointUrl(tagsPaths),
    [JSON.stringify(tagsPaths)]
  );
  const { data, isFetching, error } =
    useFetch<Array<BlogpostDocumentWithTags>>(url);

  return {
    data,
    isFetching,
    error,
  };
};
