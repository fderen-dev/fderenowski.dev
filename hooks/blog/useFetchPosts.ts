import { useMemo } from "react";
import { PaginatedPosts } from "pages/api/posts";

import { Post } from "models/blog/Posts";
import { FetchReturnType } from "models/misc";
import { useFetchPaginatedData } from "hooks/useFetchPaginatedData";
import { TypeTools } from "utils/TypeTools";

const getPostsEndpointUrl = (
  tagsPaths: Array<string>,
  page?: number,
  limit?: number
) => {
  const url = new URL(`${origin}/api/posts`);
  tagsPaths.forEach((path) => {
    url.searchParams.append("tag", path);
  });

  if (!TypeTools.isNullOrUndefined(page)) {
    url.searchParams.append("page", page!.toString());
  }

  if (!TypeTools.isNullOrUndefined(limit)) {
    url.searchParams.append("limit", limit!.toString());
  }

  return url;
};

export const useFetchPosts = (
  tagsPaths: Array<string>,
  page?: number,
  limit?: number
): FetchReturnType<PaginatedPosts> => {
  const url = useMemo(
    () => getPostsEndpointUrl(tagsPaths, page, limit),
    [JSON.stringify(tagsPaths), page, limit]
  );
  const { data, isFetching, error } = useFetchPaginatedData<Post>(url);

  return {
    data,
    isFetching,
    error,
  };
};
