/**
 * 分段构建：一次性 `docusaurus build` 全部 18 个 locale 会在单进程里把内存撑爆（OOM）。
 * 本脚本把语言切成小块，每块单独跑一个 `docusaurus build` 进程，进程退出即释放内存，
 * 峰值内存 ≈ 一块的 locale 数（默认 3，可用 BUILD_CHUNK 调）。
 *
 * 为什么能累积而不互相覆盖（已实测验证）：
 *   - `docusaurus build` 不会清空整个 build/，只写它本次构建的那些 locale。
 *   - 默认 locale 写到 build/ 根，其余写到 build/<locale>/。
 *   - 因此只要【默认 locale 在第一块】，后续块只往各自子目录写，根目录与已构建的
 *     其它语言子目录都安然无恙。根 sitemap.xml 由第一块（默认语言）生成，后续不动。
 *
 * 唯一的坑：一块里若【只有一个非默认 locale】，docusaurus 会把它当成站点根写进 build/，
 * 覆盖默认语言。下面的分块逻辑保证不出现「单个非默认 locale 独占一块」。
 */
import { execSync } from "node:child_process";
import { defaultLocale, locales } from "./i18nLocales.mjs";

// 透传模式：显式带参运行（如 `yarn build --locale pt` 单语言部署、`yarn build --locale a --locale b`）
// → 直接转交给单次 docusaurus build，不分段。用于 Vercel/Cloudflare 等只部署单一/少数语言的场景，
// 与 docs/deploy.md、docs/guides/offline.md 里文档化的命令保持一致。
const passthrough = process.argv.slice(2);
if (passthrough.length > 0) {
  console.log(`[build] passthrough → docusaurus build ${passthrough.join(" ")}`);
  execSync(`npx docusaurus build ${passthrough.join(" ")}`, { stdio: "inherit" });
  process.exit(0);
}

// 无参（`yarn build`）：分段构建全部 locale。
// 每块语言数。下限 2：单个「非默认」locale 单独构建会被 docusaurus 写到 build/ 根、
// 覆盖默认语言（已实测），所以不允许 1。内存吃紧就用 BUILD_CHUNK=2（进程更多、更慢，但峰值更低）。
const CHUNK_SIZE = Math.max(2, Number(process.env.BUILD_CHUNK) || 3);

// 默认 locale 排首位（它必须在第一块，负责写 build/ 根）。
const ordered = [defaultLocale, ...locales.filter((l) => l !== defaultLocale)];

// 按 CHUNK_SIZE 切块。
const chunks = [];
for (let i = 0; i < ordered.length; i += CHUNK_SIZE) {
  chunks.push(ordered.slice(i, i + CHUNK_SIZE));
}

// 防坑：末块若只剩 1 个且非默认 locale，并入前一块（避免它被写到 build/ 根覆盖默认语言）。
if (chunks.length >= 2) {
  const last = chunks[chunks.length - 1];
  if (last.length === 1 && last[0] !== defaultLocale) {
    chunks[chunks.length - 2].push(last[0]);
    chunks.pop();
  }
}

console.log(`[build] ${ordered.length} locales → ${chunks.length} chunk(s) of ≤${CHUNK_SIZE}`);

chunks.forEach((chunk, i) => {
  const localeArgs = chunk.map((l) => `--locale ${l}`).join(" ");
  console.log(`\n[build] chunk ${i + 1}/${chunks.length}: ${chunk.join(", ")}`);
  // stdio: inherit → docusaurus 的进度/错误直接透传到终端；构建失败会抛错中断整个流程。
  execSync(`npx docusaurus build ${localeArgs}`, { stdio: "inherit" });
});

console.log(`\n[build] ✓ all ${ordered.length} locales built into build/`);
