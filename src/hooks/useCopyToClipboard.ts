import { useState, useCallback, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";
import { updateCopyCount } from "@site/src/api";

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
    async (text: string, id: number | string) => {
      try {
        copyText(text);
        await updateCopyCount(Number(id));
      } catch (error) {
        console.error("Error updating copy count:", error);
      }
    },
    [copyText]
  );

  return { copied, copyText, updateCopy };
};
