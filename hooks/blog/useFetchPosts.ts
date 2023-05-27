import { useEffect, useState } from "react";

import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { FetchReturnType } from "models/misc";

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
  const [posts, setPosts] = useState<Array<BlogpostDocumentWithTags>>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      const postsEndpoint = getPostsEndpointUrl(tags);

      setIsFetching(true);
      try {
        const response = await fetch(postsEndpoint, {
          method: "GET",
          signal: abortController.signal,
        });

        if (!response.ok) {
          setError(response.statusText);

          return;
        }

        const posts: Array<BlogpostDocumentWithTags> = await response.json();
        setPosts(posts ?? []);
      } catch (networkError) {
        setError("Network error");
      } finally {
        setIsFetching(false);
      }
    };

    if (!abortController.signal.aborted) {
      fetchPosts();
    }

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tags)]);

  return {
    data: posts,
    isFetching,
    error,
  };
};
