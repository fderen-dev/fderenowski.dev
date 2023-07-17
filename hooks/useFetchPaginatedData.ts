import { useEffect, useState } from "react";
import { PaginatedResponse } from "pages/api/posts";

import { FetchReturnType } from "models/misc";

export const useFetchPaginatedData = <Data>(
  url: URL
): FetchReturnType<PaginatedResponse<Data>> => {
  const [result, setResult] = useState<PaginatedResponse<Data> | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    const abortController = new AbortController();
    const fetchPosts = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          signal: abortController.signal,
        });

        if (!response.ok) {
          setError(response.statusText);

          return;
        }

        const result: PaginatedResponse<Data> = await response.json();

        setResult((prev) => {
          if (!result) {
            return prev;
          }

          if (!prev || result.currentPage === 1) {
            return result;
          }

          return {
            ...result,
            data: [...prev!.data, ...result.data],
          };
        });
        setError(null);
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
  }, [url]);

  return {
    data: result,
    isFetching,
    error,
  };
};
