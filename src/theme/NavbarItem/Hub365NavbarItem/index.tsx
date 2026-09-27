/**
 * 「365 开源计划」(https://365.aishort.top/) 的导航项。
 *
 * 为什么要自定义：365 站只有中/英两语（SPA），站内语言决策链是
 * `?lang=` > localStorage > 浏览器语言。参数优先级最高，所以必须显式传
 * `?lang=`，落地语言才会跟随**本站**的 UI 语言；只给裸 URL 的话，它读的是
 * 访客浏览器语言——中文浏览器切到法语界面再点进来，会掉回中文版。
 *
 * 规则与 tools 站 hub365 链接一致（web-tools-by-ai: src/app/components/projects.tsx）：
 * 中文（简/繁）给 zh，其余一律 en。
 */
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type { Props } from "@theme/NavbarItem/DefaultNavbarItem";

const HUB365_URL = "https://365.aishort.top/";

export default function Hub365NavbarItem(props: Props) {
  const { i18n } = useDocusaurusContext();
  // 本站中文 locale 只有 zh-Hans / zh-Hant，startsWith("zh") 已全覆盖
  const lang = i18n.currentLocale.startsWith("zh") ? "zh" : "en";
  return <DefaultNavbarItem {...props} href={`${HUB365_URL}?lang=${lang}`} />;
}
