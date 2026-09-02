/**
 * 决定哪些社区提示词出静态页 —— 仅 speedup/data-retrieval 分支有此文件。
 *
 * 产物：src/data/communityStaticIds.json（gitignore，纯派生物）
 *
 * ── 为什么必须选品，不能全量 ──
 * EdgeOne Pages 单项目上限 20000 个文件。实测：
 *   每个静态页占 2 个文件（<id>/index.html + 它的 JSON chunk）。
 * 全量 4409 页 = +8828 → 23044，超限。EdgeOne 只回一句 "File count exceeds project limit"
 * 就整个部署失败，线上静默停在上一版 —— 2026-09-02 真实踩过一次。
 *   实测基线 14224（18 locale 全量构建，不含社区页）。余量 5776 → 天花板 2888 页。
 *   取 MAX_PAGES=1400（产物 17024，占上限 85%）：2000 页时产物 18224 已到 91%，
 *   护栏每次构建都告警，那种噪音很快会被无视，等于没有护栏。
 *   注意结构性张力：光是覆盖有流量的 933 条就已占到 80%，这条路本来就没多少余地。
 *
 * ── 选品顺序 ──
 *  1. src/data/communityTraffic.json：Search Console 实测有搜索流量的 id（90 天）。
 *     这批是问题本身 —— CrUX 判「欠佳」的 URL 就在里面，必须全部覆盖。
 *  2. 剩余名额按 upvoteDifference 降序补足，同分按 id 降序（新的优先）。
 *     赞数在尾部区分度很差（第 2000 名 4 分、第 2892 名 3 分，大片并列），
 *     所以它只用来填空位，不作为主依据。补位时跳过净踩（upvoteDifference < 0）的；
 *     但第 1 步不看赞数 —— 有流量就说明真有人在看，被踩过也一样有 LCP 问题。
 *
 * 选中的 id 集合还会被 src/pages/community-prompt.tsx 读走：?id= 壳靠它判断
 * canonical 该不该指向静态页（指向不存在的静态页 = canonical 到 404）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// EdgeOne Pages 项目文件数上限 20000，见文件头的实测账。改这个数之前先重算余量。
export const MAX_PAGES = 1400;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src", "data", "community");
const trafficPath = path.join(root, "src", "data", "communityTraffic.json");
const outPath = path.join(root, "src", "data", "communityStaticIds.json");

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

export function run() {
  if (!fs.existsSync(dataDir)) {
    // 语料不在本分支（main / offline）——写个空表让静态 import 能解析，不注册任何路由
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, "[]\n", "utf-8");
    console.log("[community-select] skip — src/data/community/ 不在本分支，写入空表");
    return;
  }

  const corpus = new Map();
  for (const file of fs.readdirSync(dataDir)) {
    if (!/^\d+\.json$/.test(file)) continue;
    const item = readJson(path.join(dataDir, file), null);
    if (item && Number.isInteger(item.id)) corpus.set(item.id, item);
  }

  // 1) 有搜索流量的先进 —— 不看赞数。净踩与否是 sitemap 的收录取舍
  //    （见 scripts/sitemapCommunityItems.mjs），不该决定要不要预渲染：
  //    一个被踩过的页面同样有 LCP 问题，而它有流量就说明真有人在看。
  const traffic = readJson(trafficPath, []).filter((id) => corpus.has(id));
  const selected = new Set(traffic);

  // 2) 剩余名额按赞数补足。这里才用赞数：没有流量数据时它是仅有的质量信号，
  //    补进来的是「将来可能来流量」的候选，宁可挑口碑好的。
  const rest = [...corpus.keys()]
    .filter((id) => !selected.has(id) && (corpus.get(id).upvoteDifference || 0) >= 0)
    .sort((a, b) => (corpus.get(b).upvoteDifference || 0) - (corpus.get(a).upvoteDifference || 0) || b - a);
  for (const id of rest) {
    if (selected.size >= MAX_PAGES) break;
    selected.add(id);
  }

  const ids = [...selected].sort((a, b) => a - b);
  const next = JSON.stringify(ids) + "\n";
  // 只在变化时落盘：否则每次构建都动这个文件，dev server 的 watcher 会跟着抖
  if (readJson(outPath, null) === null || fs.readFileSync(outPath, "utf8") !== next) {
    fs.writeFileSync(outPath, next, "utf-8");
  }

  const truncated = traffic.length > MAX_PAGES;
  console.log(
    `[community-select] ${ids.length} pages = ${Math.min(traffic.length, MAX_PAGES)} 有流量 + ${ids.length - Math.min(traffic.length, MAX_PAGES)} 高赞补足` +
      ` (语料 ${corpus.size}, 上限 ${MAX_PAGES}${truncated ? " —— ⚠ 有流量的条目已超上限，被截断" : ""})`,
  );
}

// 直接执行入口：node scripts/genCommunitySelection.mjs
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    run();
  } catch (e) {
    console.error(`[community-select] ${e.message}`);
    process.exit(1);
  }
}
