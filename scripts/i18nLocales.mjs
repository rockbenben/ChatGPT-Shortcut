/**
 * 站点【构建/UI 语言】的单一数据源。
 *
 * docusaurus.config.js 与 scripts/buildPhased.mjs 都从这里读，保证「配置里的 locales」
 * 和「分段构建实际要 build 的 locales」永远一致 —— 历史上两者脱钩（config 7 个、
 * 分段构建 18 个）正是 /th/es/zh-Hant//th 这类脏 URL 的根源之一。
 *
 * ── 改默认语言 ──
 *   改 defaultLocale，并保持它在 locales 数组【首位】（分段构建第一块要含默认语言，
 *   它写到 build/ 根目录；Docusaurus 也要求 defaultLocale ∈ locales）。
 *
 * ── 增 / 删一个语言（两条轴，必须同步，否则会「有数据却不显示」或「构建了却没数据」）──
 *   1) 构建/UI 轴（本文件）：在 locales 增删该 locale；并准备好 i18n/<locale>/ 下的翻译。
 *   2) 数据轴（src/api/homepage.ts）：**手动**在 SUPPORTED_LANGUAGES 数组里增删该 locale，
 *      并放好 src/data/prompt_<locale>.json。
 *      注意：它曾由 PROMPT_DATA_MAP 的 key 自动派生，2026-08 改成模板字面量 import() 后
 *      变成手维护的字面量数组——漏改不会报错，只会让该 locale 的首页/搜索静默回落中文数据。
 *      scripts/genPromptPages.mjs 会校验每个 locale 的 prompt_<locale>.json 是否存在并中止构建，
 *      但它管不到 SUPPORTED_LANGUAGES 数组本身，这一处仍需人工同步。
 */
export const defaultLocale = "zh-Hans";

export const locales = ["zh-Hans", "en", "zh-Hant", "ja", "ko", "es", "pt", "hi", "ind", "vi", "th", "fr", "de", "it", "ru", "ar", "tr", "bn"];
