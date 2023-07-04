import { useMemo } from "react";
import { PaginatedPosts } from "pages/api/posts";

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
): FetchReturnType<PaginatedPosts> => {
  const url = useMemo(
    () => getPostsEndpointUrl(tagsPaths),
    [JSON.stringify(tagsPaths)]
  );
  const { data, isFetching, error } = useFetch<PaginatedPosts>(url);

  return {
    data,
    isFetching,
    error,
  };
};
