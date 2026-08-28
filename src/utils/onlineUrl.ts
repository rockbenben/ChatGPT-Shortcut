import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/**
 * 主站上某条路径的绝对地址，带当前语言前缀。
 *
 * 离线版没有后端，社区、账号、反馈这些只存在于主站。指过去时要一次点击到位、而不是先落到
 * 本站的中转页再点一次；导航栏是在 docusaurus.config.js 里直接给外链，组件里则用这个。
 *
 * 带语言前缀是为了别把日语用户丢到中文站。currentLocale 由 Docusaurus 在运行时提供，
 * 与 config 侧读 DOCUSAURUS_CURRENT_LOCALE 得到的是同一个值。
 */
const ONLINE_ORIGIN = "https://www.aishort.top";

export function useOnlineUrl(path: string): string {
  const { i18n } = useDocusaurusContext();
  const prefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
  return `${ONLINE_ORIGIN}${prefix}${path}`;
}
