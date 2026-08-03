/**
 * 生成 prompt 详情页薄壳 —— 每个 (id, locale) 一个 6 行文件，内容完全由
 * src/data/cards/ 里已有的 JSON 决定，因此不入库，由 scripts/generate.mjs 在
 * prestart/predev/pretypecheck/prebuild/predeploy 现生成。
 *
 * 产物：
 *   默认 locale → src/pages/prompt/<id>.tsx
 *   其他 locale → i18n/<locale>/docusaurus-plugin-content-pages/prompt/<id>.tsx
 *
 * 薄壳不能合并成一个共享页：Docusaurus 按 locale 独立构建，静态 import 留在各自文件里，
 * 才能保证每个语言只打包自己那份 card JSON（与首页 18 个薄壳同一套理由）。
 *
 * ── 三条不变量（缺一都会静默产出错内容，故一律 fail-fast 而非跳过）──
 *  1) id 全集由**默认 locale** 的 cards 决定；任何 locale 缺其中任一 id 就中止。
 *     曾经按「每个 locale 各自有哪些 card」生成，缺 280_th.json 时不写 th 页面，
 *     Docusaurus 回落到默认 locale 页 → /th/prompt/280 上线中文内容，构建全绿。
 *  2) 每个 locale 必须有 src/data/prompt_<locale>.json，否则 homepage.ts 的
 *     SUPPORTED_LANGUAGES 会在运行期静默回落中文（模板字面量 import 不再有构建期报错）。
 *  3) 输出目录里不属于本次全集的 <id>.tsx 一律删除。它们已被 gitignore，
 *     git status 看不见；留着会在下次构建报 "Can't resolve cards/<id>_xx.json"。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defaultLocale, locales } from "./i18nLocales.mjs";

// 不用 import.meta.dirname：它要 Node >= 20.11，而 package.json 的 engines 是 >=20.0，
// 20.0–20.10 上它是 undefined，path.resolve 会抛 ERR_INVALID_ARG_TYPE，
// 而本脚本经 scripts/generate.mjs 在所有 pre* 钩子里最先跑 —— 站点会完全跑不起来。
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cardsDir = path.join(root, "src", "data", "cards");
const dataDir = path.join(root, "src", "data");

const pageSource = (id, locale) =>
  `import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/${id}_${locale}.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="${locale}" />;
}
`;

const outDirFor = (locale) =>
  locale === defaultLocale
    ? path.join(root, "src", "pages", "prompt")
    : path.join(root, "i18n", locale, "docusaurus-plugin-content-pages", "prompt");

// 抛错而非 process.exit：本模块会被 scripts/generate.mjs 在同一进程里调用，
// 直接退出会连带杀掉后续生成器。退出码由调用方统一决定。
const die = (msg) => {
  throw new Error(msg);
};

export function run() {
  // ── 读 cards 目录，按 locale 归集 id（一次 readdir，不逐文件 stat）──
  const cardIds = new Map(locales.map((l) => [l, new Set()]));
  for (const file of fs.readdirSync(cardsDir)) {
    const m = /^(\d+)_(.+)\.json$/.exec(file);
    if (m && cardIds.has(m[2])) cardIds.get(m[2]).add(Number(m[1]));
  }

  // 不变量 1：以默认 locale 为 id 全集，逐 locale 校验完整性
  const expectedIds = [...(cardIds.get(defaultLocale) ?? [])].sort((a, b) => a - b);
  if (expectedIds.length === 0) die(`默认 locale ${defaultLocale} 在 ${cardsDir} 下没有任何 card JSON —— 先跑 python CodeUpdateHandler.py`);

  const gaps = [];
  for (const locale of locales) {
    const have = cardIds.get(locale);
    const missing = expectedIds.filter((id) => !have.has(id));
    if (missing.length) gaps.push(`  ${locale}: 缺 ${missing.length} 个 → ${missing.slice(0, 8).join(", ")}${missing.length > 8 ? " …" : ""}`);
  }
  if (gaps.length) {
    die(`以下 locale 的 card JSON 不完整（缺失的页面会被 Docusaurus 回落到默认 locale，上线即错语言内容）：\n${gaps.join("\n")}\n\n补齐 src/data/cards/ 后重试（通常是重跑 python CodeUpdateHandler.py）。`);
  }

  // 不变量 2：每个 locale 都要有 prompt_<locale>.json，否则 SUPPORTED_LANGUAGES 运行期静默回落
  const missingData = locales.filter((l) => !fs.existsSync(path.join(dataDir, `prompt_${l}.json`)));
  if (missingData.length) {
    die(`缺少语言数据文件：${missingData.map((l) => `src/data/prompt_${l}.json`).join(", ")}\n没有它，该 locale 的首页/搜索会在运行期静默回落到中文数据（构建不会报错）。`);
  }

  // ── 稳态快路径 ──
  // 逐个读 5022 个文件比对约占 470ms，而它们是同一模板的确定性产物：
  // 只要「模板 + id 全集 + locale 全集」没变，且每个目录的文件名集合正好等于期望集合，
  // 内容就不可能变（这些文件已 gitignore，只由本脚本产出）。
  // 于是把指纹写进 .stamp，稳态只需 18 次 readdir + 1 次读 stamp。
  // 指纹含模板本身：改了 pageSource 就会失配，强制全量重写。
  const stampPath = path.join(root, "src", "pages", "prompt", ".genstamp");
  const stamp = JSON.stringify({
    template: pageSource(0, "L"),
    ids: expectedIds.length,
    first: expectedIds[0],
    last: expectedIds[expectedIds.length - 1],
    locales: locales.join(","),
  });

  let written = 0;
  let pruned = 0;
  const expectedNames = new Set(expectedIds.map((id) => `${id}.tsx`));

  const dirState = locales.map((locale) => {
    const outDir = outDirFor(locale);
    fs.mkdirSync(outDir, { recursive: true });
    return { locale, outDir, existing: new Set(fs.readdirSync(outDir).filter((f) => f.endsWith(".tsx"))) };
  });

  // 文件名集合完全吻合 + 指纹未变 → 直接收工
  const namesMatch = dirState.every((d) => d.existing.size === expectedNames.size && [...expectedNames].every((n) => d.existing.has(n)));
  let stampOk = false;
  try {
    stampOk = fs.readFileSync(stampPath, "utf8") === stamp;
  } catch {
    stampOk = false;
  }
  if (namesMatch && stampOk) {
      console.log(`[prompt-pages] ${expectedIds.length * locales.length} pages up to date (stamp hit)`);
      return;
    }

  for (const { locale, outDir, existing } of dirState) {
    for (const id of expectedIds) {
      const name = `${id}.tsx`;
      const target = path.join(outDir, name);
      const source = pageSource(id, locale);

      if (existing.has(name)) {
        const current = fs.readFileSync(target, "utf8");
        // 先做零分配的直接比较（稳态命中）；不等再做行尾归一。
        // 行尾归一是给**历史遗留文件**兜底：CodeUpdateHandler.py 曾经也生成这些薄壳，
        // 在 Windows 上写的是 CRLF。已有这批文件的开发机若只逐字节比，会被判定全部不一致
        // 而一次性重写 5022 个文件，抖动 dev server 的 watcher。
        // 该 Python 段已删除，本脚本是唯一写入方，所以这条分支只在首次迁移时命中。
        if (current === source || current.replace(/\r\n/g, "\n") === source) continue;
      }
      fs.writeFileSync(target, source);
      written++;
    }

    // 不变量 3：清理孤儿（card JSON 已删但页面残留，下次构建会 Module not found）
    for (const name of existing) {
      if (!expectedNames.has(name)) {
        fs.unlinkSync(path.join(outDir, name));
        pruned++;
      }
    }
  }

  fs.writeFileSync(stampPath, stamp);

  const total = expectedIds.length * locales.length;
  console.log(`[prompt-pages] ${total} pages = ${expectedIds.length} ids × ${locales.length} locales (${written} written, ${total - written} unchanged${pruned ? `, ${pruned} pruned` : ""})`);
}

// 直接执行入口：node scripts/genPromptPages.mjs
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    run();
  } catch (e) {
    console.error(`[prompt-pages] ${e.message}`);
    process.exit(1);
  }
}
