import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface Props {
  isDarkMode: boolean;
  onEmojiSelect: (emoji: any) => void;
}

/**
 * Docusaurus locale → `@emoji-mart/data/i18n/<name>.json`。不映射的话整个选择器都是英文。
 * emoji-mart 只带 14 种能对上的语言包；bn/ind/th 没有，留空回落英文，zh-Hant 借用 zh。
 */
const EMOJI_LOCALE: Record<string, string> = {
  "zh-Hans": "zh",
  "zh-Hant": "zh",
  en: "en",
  ja: "ja",
  ko: "ko",
  es: "es",
  pt: "pt",
  hi: "hi",
  vi: "vi",
  fr: "fr",
  de: "de",
  it: "it",
  ru: "ru",
  ar: "ar",
  tr: "tr",
};

// 单独 chunk 包 @emoji-mart/data (大表情数据集) + @emoji-mart/react (Picker)；
// 仅用户点 😀 才被 Comments.tsx 通过 React.lazy 触发下载。
const EmojiPickerLazy: React.FC<Props> = ({ isDarkMode, onEmojiSelect }) => {
  const { i18n: siteI18n } = useDocusaurusContext();
  const localeName = EMOJI_LOCALE[siteI18n.currentLocale];
  // en 是 emoji-mart 的内建默认，不需要额外拉一份；没映射到的语言同样直接渲染
  const needsPack = !!localeName && localeName !== "en";

  // ⚠ @emoji-mart/react 在 mount 时把 props 一次性交给 web component，之后不再更新，
  // 所以语言包必须在挂载【之前】就位；先渲染再 setState 传 i18n 无效。
  const [pack, setPack] = useState<{ ready: boolean; i18n?: any }>({ ready: !needsPack });

  useEffect(() => {
    if (!needsPack) return;
    let alive = true;
    import(
      /* webpackChunkName: "emoji-i18n" */
      /* webpackInclude: /(ar|de|es|fr|hi|it|ja|ko|pt|ru|tr|vi|zh)\.json$/ */
      `@emoji-mart/data/i18n/${localeName}.json`
    )
      .then((mod) => {
        if (alive) setPack({ ready: true, i18n: mod.default ?? mod });
      })
      .catch(() => {
        // 拉不到就照常渲染英文版，不能把整个选择器卡住
        if (alive) setPack({ ready: true });
      });
    return () => {
      alive = false;
    };
  }, [localeName, needsPack]);

  if (!pack.ready) return null;

  return <Picker data={data} i18n={pack.i18n} theme={isDarkMode ? "dark" : "light"} onEmojiSelect={onEmojiSelect} />;
};

export default EmojiPickerLazy;
