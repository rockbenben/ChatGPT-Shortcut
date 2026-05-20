/**
 * i18n 小工具。
 * Docusaurus 的 locale code 跟 BCP-47 标准命名不完全一致，
 * 这里集中处理映射，避免散落各处。
 */

/**
 * Docusaurus `i18n.localeConfigs` 的结构子集 —— 只用到 htmlLang 字段。
 * 用结构化类型避免直接 import Docusaurus 内部类型。
 */
type LocaleConfigs = Record<string, { htmlLang?: string }>;

/**
 * Docusaurus locale → BCP-47 language tag。
 *
 * 单一映射源：`docusaurus.config.js` 里的 `localeConfigs[locale].htmlLang`。
 * 例：`ind` locale 配置 `htmlLang: "id"`，本函数返回 "id"；其他 locale 原样返回。
 *
 * 故意不在这里硬编码 "ind" → "id"，避免跟 Docusaurus 配置漂移。
 *
 * `localeConfigs` 必须传：optional 版本会让漏传时静默退化为 identity，
 * 导致非默认 locale 下 schema.org/hreflang 输出错误 locale code。
 * required 让漏传在编译期就被 TS 拦截。
 */
export function toBcp47(locale: string, localeConfigs: LocaleConfigs): string {
  return localeConfigs[locale]?.htmlLang ?? locale;
}
