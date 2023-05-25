import { useEffect, useState } from "react";

import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { FetchReturnType } from "models/misc";

const getPostsEndpoint = (origin: string) => `${origin}/api/posts`;

export const useFetchPosts = (): FetchReturnType<
  Array<BlogpostDocumentWithTags>
> => {
  const [posts, setPosts] = useState<Array<BlogpostDocumentWithTags>>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      const postsEndpoint = getPostsEndpoint(window.location.origin);

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
        setPosts(posts);
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
  }, []);

  return {
    data: posts,
    isFetching,
    error,
  };
};
