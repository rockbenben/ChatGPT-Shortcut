import React from "react";
import { useAppleKeyboard } from "@site/src/hooks/useAppleKeyboard";
import styles from "./styles.module.css";

export function SearchShortcutHint() {
  const isApple = useAppleKeyboard();

  return (
    <kbd className={`${styles.kbdHint} hideOnSmallScreen`} aria-hidden>
      {isApple ? "⌘K" : "Ctrl+K"}
    </kbd>
  );
}
