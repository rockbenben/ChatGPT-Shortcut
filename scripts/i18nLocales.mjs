/**
 * 站点【构建/UI 语言】的单一数据源。
 *
 * docusaurus.config.js 与 scripts/buildPhased.mjs 都从这里读，保证「配置里的 locales」
 * 和「分段构建实际要 build 的 locales」永远一致 —— 历史上两者脱钩（config 7 个、
 * build-phased 18 个）正是 /th/es/zh-Hant//th 这类脏 URL 的根源之一。
 *
 * ── 改默认语言 ──
 *   改 defaultLocale，并保持它在 locales 数组【首位】（分段构建第一块要含默认语言，
 *   它写到 build/ 根目录；Docusaurus 也要求 defaultLocale ∈ locales）。
 *
 * ── 增 / 删一个语言（两条轴，必须同步，否则会「有数据却不显示」或「构建了却没数据」）──
 *   1) 构建/UI 轴（本文件）：在 locales 增删该 locale；并准备好 i18n/<locale>/ 下的翻译。
 *   2) 数据轴（src/api/homepage.ts）：在 PROMPT_DATA_MAP / DEFAULT_FAVOR_MAP / DEFAULT_OTHER_MAP
 *      增删对应 import，并放好 src/data/prompt_<locale>.json 等数据文件。
 *      （SUPPORTED_LANGUAGES 由这些表的 key 派生，会自动跟随，无需单独改。）
 */
export const defaultLocale = "zh-Hans";

export const locales = ["zh-Hans", "en", "zh-Hant", "ja", "ko", "es", "pt", "hi", "ind", "vi", "th", "fr", "de", "it", "ru", "ar", "tr", "bn"];
