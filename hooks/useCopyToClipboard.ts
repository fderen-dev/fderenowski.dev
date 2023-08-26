import { useCallback, useEffect, useState } from "react";

interface UseCopyToClipboardProps {
  timeout?: number;
}

interface UseCopyToClipboard {
  copyToClipboard(text: string): void;
  isCopying: boolean;
  isCopied: boolean;
}

export const useCopyToClipboard = ({timeout = 2000}: UseCopyToClipboardProps): UseCopyToClipboard => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  useEffect(() => {
    if (isCopied) {
      const timeoutHandle = setTimeout(() => {
        setIsCopied(false);
      }, timeout);
      return () => clearTimeout(timeoutHandle);
    }
  }, [isCopied, timeout]);

  const copyToClipboard = useCallback((text: string) => {
    setIsCopying(true);
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
    }).finally(() => {
      setIsCopying(false);
    });
  }, []);

  return {
    copyToClipboard,
    isCopied,
    isCopying,
  }
}