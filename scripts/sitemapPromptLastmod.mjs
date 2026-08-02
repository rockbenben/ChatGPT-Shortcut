/**
 * sitemap lastmod 修正：prompt 详情页 /prompt/<id>
 *
 * 为什么不能用默认实现：@docusaurus/plugin-sitemap 的 lastmod 来自
 * route.metadata.sourceFilePath 的 git 历史（`git log -1 -- <file>`）。而 prompt 详情页的
 * 薄壳自 2026-08 起不再入库（由 scripts/genPromptPages.mjs 现生成），于是：
 *   - 已存在的 id → git 只认得「取消追踪」那一个提交，~5000 个 URL 的 lastmod 被永久钉死在
 *     一个与内容无关的依赖清理提交上，此后任何提示词修改都无法让它前进；
 *   - 新增的 id → 路径毫无 git 历史，plugin 抛 FileNotTrackedError、lastmod 为空，
 *     被 docusaurus.config.js 的 fallback 填成「今天」，于是每次部署都声称刚改过，
 *     IndexNow（每 3 天、since:4）会无休止地重复提交这些 URL。
 *
 * 改用 src/data/cards/<id>_<locale>.json 里的 dateModified —— 它由 CodeUpdateHandler.py
 * 按内容比对维护（内容没变就保留旧值），本来就是入库的、且是内容变更的**权威**信号，
 * 比「薄壳文件的 git 时间」这个代理更准。cards 目录必须入库的理由也正是这个字段。
 */
import fs from "node:fs";
import path from "node:path";
import { defaultLocale, locales } from "./i18nLocales.mjs";

const CARDS_DIR = path.resolve("./src/data/cards");

// locale 来源优先级：
//  1) process.env.DOCUSAURUS_CURRENT_LOCALE —— Docusaurus 每个 locale 构建前设置
//     （core/lib/commands/build/buildLocale.js），createSitemapItems 的入参里拿不到 currentLocale。
//  2) URL 前缀兜底（多 locale 构建下非默认 locale 带 /xx/ 前缀）。
// 只靠 URL 会在**单 locale 构建**下判错：`yarn build --locale ja`（buildPhased 文档化的
// 单语言部署路径）会把 ja 当站点根输出，URL 是 /prompt/1 而非 /ja/prompt/1，
// 于是被当成默认 locale、读到 zh-Hans 的 dateModified。
const envLocale = locales.includes(process.env.DOCUSAURUS_CURRENT_LOCALE) ? process.env.DOCUSAURUS_CURRENT_LOCALE : null;

// 非默认 locale 按长度降序排列，避免短代码抢先匹配（如 zh-Hans / zh-Hant）。
const nonDefault = locales.filter((l) => l !== defaultLocale).sort((a, b) => b.length - a.length);
const PROMPT_URL = new RegExp(`/(?:(${nonDefault.join("|")})/)?prompt/(\\d+)/?$`);

/** 读某个 (id, locale) 的 dateModified，返回 YYYY-MM-DD；读不到返回 null。 */
function cardLastmod(id, locale) {
  try {
    const raw = fs.readFileSync(path.join(CARDS_DIR, `${id}_${locale}.json`), "utf8");
    const d = JSON.parse(raw).dateModified || JSON.parse(raw).datePublished;
    return typeof d === "string" ? d.split("T")[0] : null;
  } catch {
    return null;
  }
}

/**
 * 就地修正 items 里 /prompt/<id> 的 lastmod。其余 URL 原样返回。
 * @param {{url: string, lastmod?: string}[]} items 默认实现产出的 sitemap items
 * @param {string} fallbackLastmod YYYY-MM-DD
 */
export function withPromptLastmod(items, fallbackLastmod) {
  return items.map((it) => {
    const m = PROMPT_URL.exec(it.url);
    if (!m) return it;
    const [, urlLocale, id] = m;
    const locale = envLocale || urlLocale || defaultLocale;
    return { ...it, lastmod: cardLastmod(id, locale) || it.lastmod || fallbackLastmod };
  });
}
