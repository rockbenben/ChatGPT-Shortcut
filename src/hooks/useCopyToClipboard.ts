import { useState, useCallback } from "react";
import copy from "copy-to-clipboard";
import { updateCopyCount } from "@site/src/api";

export const useCopyToClipboard = (timeout: number = 2000) => {
  const [copied, setCopied] = useState(false);

  const copyText = useCallback(
    (text: string) => {
      copy(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    },
    [timeout]
  );

  const updateCopy = useCallback(
    async (text: string, id) => {
      try {
        copyText(text);
        await updateCopyCount(id);
      } catch (error) {
        console.error("Error updating copy count:", error);
      }
    },
    [copyText]
  );

  return { copied, copyText, updateCopy };
};
