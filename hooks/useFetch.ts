import { useEffect, useState } from "react";

import { FetchReturnType } from "models/misc";

export const useFetch = <Result>(url: URL): FetchReturnType<Result> => {
  const [result, setResult] = useState<Result | null>(null);
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

        const result: Result = await response.json();
        setResult(result ?? null);
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
