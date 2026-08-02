/**
 * 分语言分批构建：一次性 build 全部 18 个 locale 会 OOM，切块后每块一个进程，退出即释放内存。
 *
 * 能累积而不互相覆盖，靠 docusaurus 只写本次构建的 locale、且默认 locale 落在 build/ 根、
 * 其余落在 build/<locale>/。所以默认 locale 必须在第一块。
 *
 * ⚠ 坑：一块里若只有一个「非默认」locale，docusaurus 会把它当站点根写进 build/、覆盖默认
 * 语言。planChunks() 保证这种块不出现，别绕过它。
 */
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { defaultLocale, locales } from "./i18nLocales.mjs";

// 直接用 node 跑 bin，不经包管理器：npm/yarn/pnpm 都能构建，也没有 npx→npm 的告警噪音
const docusaurusBin = createRequire(import.meta.url).resolve("@docusaurus/core/bin/docusaurus.mjs");

// sitemap 协议对单文件的硬上限。超了 Google 直接拒收整份文件。
const SITEMAP_MAX_URLS = 50000;
const SITEMAP_MAX_BYTES = 50 * 1024 * 1024;

/** 切块。默认 locale 排首位；末块若只剩一个非默认 locale 就并回前一块（见文件头的坑）。 */
function planChunks(chunkSize) {
  const ordered = [defaultLocale, ...locales.filter((l) => l !== defaultLocale)];

  const chunks = [];
  for (let i = 0; i < ordered.length; i += chunkSize) {
    chunks.push(ordered.slice(i, i + chunkSize));
  }

  const last = chunks[chunks.length - 1];
  if (chunks.length >= 2 && last.length === 1 && last[0] !== defaultLocale) {
    chunks[chunks.length - 2].push(last[0]);
    chunks.pop();
  }

  return chunks;
}

/** 逐块调 docusaurus build。stdio: inherit 让进度与错误直接透传；任一块失败即抛错中断。 */
function buildChunks(chunks) {
  chunks.forEach((chunk, i) => {
    const localeArgs = chunk.map((l) => `--locale ${l}`).join(" ");
    console.log(`\n[build] chunk ${i + 1}/${chunks.length}: ${chunk.join(", ")}`);
    execSync(`node "${docusaurusBin}" build ${localeArgs}`, { stdio: "inherit" });
  });
}

/** 从一份 sitemap XML 里取出所有 <url> 块，连同各自的 <loc>。 */
function readUrlBlocks(xml) {
  return (xml.match(/<url>[\s\S]*?<\/url>/g) || []).map((block) => ({
    block,
    loc: (block.match(/<loc>([^<]*)<\/loc>/) || [])[1],
  }));
}

/**
 * 把各 locale 的 sitemap 合并进根 sitemap.xml。
 *
 * 合并结果 /sitemap.xml 是搜索引擎主要读的那一份，漏掉一门语言是静默失败——站点照常
 * 访问，只是那门语言再也不被收录。所以缺文件、空文件一律抛错，宁可让构建红掉。
 *
 * 规模：18 语言 × 327 条 = 5886 条 / 809KB，约占上限 1/9。到 80% 会警告、越界直接失败，
 * 届时改用 <sitemapindex> 指向那 18 份分语言 sitemap（文件本来就已生成）。
 *
 * hreflang 不写进 sitemap：HTML <head> 里 Docusaurus 已输出，Google 对两种方式三选一。
 */
export function mergeSitemaps() {
  const buildDir = path.resolve("build");
  const rootSitemap = path.join(buildDir, "sitemap.xml");

  if (!fs.existsSync(rootSitemap)) {
    throw new Error("[build] 缺 build/sitemap.xml —— 默认 locale 没构建出来，中止");
  }

  // 根（默认语言）+ 每个非默认 locale 的子目录，一个都不能少
  const files = [rootSitemap];
  const missing = [];
  for (const loc of locales) {
    if (loc === defaultLocale) continue;
    const file = path.join(buildDir, loc, "sitemap.xml");
    if (fs.existsSync(file)) files.push(file);
    else missing.push(loc);
  }
  if (missing.length > 0) {
    // 只构建部分语言走 passthrough，不会到这里；真撞上就是「声称全量却少了几门」
    throw new Error(
      `[build] 缺 ${missing.length} 个 locale 的 sitemap（${missing.join(", ")}），合并会漏语言，中止。\n` +
        `        只想构建部分语言请用 \`yarn build --locale <xx>\`（该路径不合并 sitemap）；\n` +
        `        若要永久只发布这几门语言，请改 scripts/i18nLocales.mjs 的 locales 列表。`,
    );
  }

  // 复用根 sitemap 原有的 <urlset> 头，命名空间声明跟着一起继承
  const rootXml = fs.readFileSync(rootSitemap, "utf8");
  const headerEnd = rootXml.indexOf("<url>");
  const header = headerEnd >= 0 ? rootXml.slice(0, headerEnd) : '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  const seen = new Set();
  const blocks = [];
  for (const file of files) {
    const entries = readUrlBlocks(fs.readFileSync(file, "utf8"));

    // 判空看文件本身有没有 <url>，不能看「贡献了几条新的」：build/ 不清空，重复跑时根
    // sitemap 已是上轮结果，各分语言文件贡献 0 条属正常，按异常处理会让第二次构建失败。
    if (entries.length === 0) {
      throw new Error(`[build] ${path.relative(buildDir, file)} 没有任何 <url>，产物异常，中止`);
    }

    for (const { block, loc } of entries) {
      if (!loc || seen.has(loc)) continue; // 按 <loc> 去重，重复合并保持幂等
      seen.add(loc);
      blocks.push(block);
    }
  }

  const xml = `${header}${blocks.join("")}</urlset>`;
  const bytes = Buffer.byteLength(xml);
  fs.writeFileSync(rootSitemap, xml);

  const sizeMB = (bytes / 1048576).toFixed(1);
  if (blocks.length > SITEMAP_MAX_URLS || bytes > SITEMAP_MAX_BYTES) {
    throw new Error(`[build] sitemap 越过协议上限（${blocks.length} URLs / ${sizeMB}MB），必须改用 sitemapindex`);
  }
  if (blocks.length > SITEMAP_MAX_URLS * 0.8 || bytes > SITEMAP_MAX_BYTES * 0.8) {
    console.warn(`[build] ⚠ sitemap 已用到上限的 80%（${blocks.length} URLs / ${sizeMB}MB），该换 sitemapindex 了`);
  }

  console.log(`[build] sitemap 合并完成：${blocks.length} URLs / ${(bytes / 1024).toFixed(0)}KB，来自 ${files.length} 个 locale`);
  return { urls: blocks.length, bytes, files: files.length };
}

function main() {
  // 带参（`yarn build --locale pt`）→ 转交单次 build，不分批也不合并 sitemap。
  // 供 Vercel/Cloudflare 只部署部分语言用，见 docs/deploy.md。
  const passthrough = process.argv.slice(2);
  if (passthrough.length > 0) {
    console.log(`[build] passthrough → docusaurus build ${passthrough.join(" ")}`);
    execSync(`node "${docusaurusBin}" build ${passthrough.join(" ")}`, { stdio: "inherit" });
    return;
  }

  // 每块下限 2：单个非默认 locale 独占一块会覆盖默认语言（见文件头）。内存吃紧用 BUILD_CHUNK=2。
  const chunkSize = Math.max(2, Number(process.env.BUILD_CHUNK) || 3);
  const chunks = planChunks(chunkSize);

  console.log(`[build] ${locales.length} locales → ${chunks.length} chunk(s) of ≤${chunkSize}`);
  buildChunks(chunks);
  mergeSitemaps();
  console.log(`\n[build] ✓ all ${locales.length} locales built into build/`);
}

// 只有作为脚本直接执行才真的构建；被 import 时只暴露函数，便于单独验证 mergeSitemaps()
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
