/**
 * Swizzled (ejected) LocaleDropdownNavbarItem.
 *
 * 为什么要改：Docusaurus 原版用 useAlternatePageUtils().createUrl 生成语言切换链接，
 * 它只用 `pathname.replace(baseUrl, '')` 剥掉「当前 build 的那一层」locale 前缀，
 * 再把目标 locale 前缀拼到剩下的整段路径前面。在正常页面没问题（每个 locale build 的
 * baseUrl 恰好是 /es/ 这种，能精确剥掉当前前缀）。
 *
 * 但当托管层把不存在的嵌套路径「软 404」成由【默认 locale build】渲染的页面时
 * （EdgeOne 命中 404.html，其 baseUrl 是 /），原版只剥掉开头一个 `/`，于是把目标 locale
 * 拼到脏路径整体前面 → /fr/th/es/zh-Hant/...，爬虫顺着无限叠加，产出 /th/es/zh-Hant//th 这类垃圾 URL。
 *
 * 修法：生成链接前，把路径开头【所有】已知 locale 段全部剥掉，只保留真正的页面后缀，
 * 再拼【恰好一个】目标 locale 前缀。这样无论当前 URL 多脏，切语言都只会得到干净的单层前缀。
 */
import React, {type ReactNode} from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {useLocation} from "@docusaurus/router";
import {translate} from "@docusaurus/Translate";
import {mergeSearchStrings, useHistorySelector} from "@docusaurus/theme-common";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import IconLanguage from "@theme/Icon/Language";
import type {LinkLikeNavbarItemProps} from "@theme/NavbarItem";
import type {Props} from "@theme/NavbarItem/LocaleDropdownNavbarItem";

import styles from "./styles.module.css";

// 判断一个路径段是否是 locale 前缀。用「模式」而非「显式清单」，这样 locale 反复增删
// （本站历史上 13→12→7 来回裁剪）也无需维护：
//   - 所有 ISO 639-1 两字母码：en/es/de/fr/it/ja/ko/pt/ru/hi/ar/bn/vi/th/tr… 全覆盖
//   - 历史遗留三字母 ind（印尼语，标准应为 id）
//   - 中文 zh-Hant / zh-Hans
// 站内真实顶层路由（docs/prompt/community-prompts/feedback/user…）均非两字母，无误伤。
// 唯一理论风险：未来新增「恰好两个小写字母」的非 locale 顶层路由——本站无此规划。
function isLocaleSegment(seg: string): boolean {
  return /^[a-z]{2}$/.test(seg) || seg === "ind" || /^zh-Han[st]$/.test(seg);
}

/** 从路径开头剥掉所有 locale 段，返回不含前导斜杠的页面后缀（如 "prompt/123"）。 */
function stripLeadingLocales(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  while (segments.length > 0 && isLocaleSegment(segments[0]!)) {
    segments.shift();
  }
  return segments.join("/");
}

function useLocaleDropdownUtils() {
  const {
    siteConfig,
    i18n: {localeConfigs},
  } = useDocusaurusContext();
  const {pathname} = useLocation();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  const getLocaleConfig = (locale: string) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(`Docusaurus bug, no locale config found for locale=${locale}`);
    }
    return localeConfig;
  };

  // 关键：用「剥掉全部 locale 前缀后的页面后缀」重建链接，保证只拼一层目标前缀。
  const pathnameSuffix = stripLeadingLocales(pathname);

  const getBaseURLForLocale = (locale: string) => {
    const localeConfig = getLocaleConfig(locale);
    // localeConfig.baseUrl 形如 "/fr/"（默认 locale 为 "/"），始终带前后斜杠。
    const localizedPath = `${localeConfig.baseUrl}${pathnameSuffix}`;
    const isSameDomain = localeConfig.url === siteConfig.url;
    if (isSameDomain) {
      // 同域：用 pathname:// 触发整页导航（目标 locale 是另一个 build，非客户端路由）。
      return `pathname://${localizedPath}`;
    }
    return `${localeConfig.url}${localizedPath}`;
  };

  return {
    getURL: (locale: string, options: {queryString: string | undefined}) => {
      const finalSearch = mergeSearchStrings([search, options.queryString], "append");
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale: string) => getLocaleConfig(locale).label,
    getLang: (locale: string) => getLocaleConfig(locale).htmlLang,
  };
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}: Props): ReactNode {
  const utils = useLocaleDropdownUtils();

  const {
    i18n: {currentLocale, locales},
  } = useDocusaurusContext();

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    return {
      label: utils.getLabel(locale),
      lang: utils.getLang(locale),
      to: utils.getURL(locale, {queryString}),
      target: "_self",
      autoAddBaseUrl: false,
      className:
        // eslint-disable-next-line no-nested-ternary
        locale === currentLocale
          ? mobile
            ? "menu__link--active"
            : "dropdown__link--active"
          : "",
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  const dropdownLabel = mobile
    ? translate({
        message: "Languages",
        id: "theme.navbar.mobileLanguageDropdown.label",
        description: "The label for the mobile language switcher dropdown",
      })
    : utils.getLabel(currentLocale);

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage className={styles.iconLanguage} />
          {dropdownLabel}
        </>
      }
      items={items}
    />
  );
}
