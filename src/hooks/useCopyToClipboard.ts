import { useState, useCallback, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";

export const useCopyToClipboard = (timeout: number = 2000) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyText = useCallback(
    (text: string) => {
      copy(text);
      setCopied(true);
      // Clear previous timer to prevent stacking on rapid clicks
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, timeout);
    },
    [timeout]
  );

  const updateCopy = useCallback(
    (text: string, id: number | string) => {
      copyText(text);
    },
    [copyText]
  );

  return { copied, copyText, updateCopy };
};
