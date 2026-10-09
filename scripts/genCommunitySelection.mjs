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

// 抛错而非 process.exit：本模块会被 scripts/generate.mjs 在同一进程里调用，
// 直接退出会连带杀掉后续生成器。退出码由调用方统一决定。
const die = (msg) => {
  throw new Error(msg);
};

/**
 * 读 JSON 并解析。
 *
 * allowMissing=true 时【仅】"文件不存在"返回 fallback，"文件存在但解析失败"仍然抛错。
 *
 * 这条区分是必须的：communityTraffic.json 是【入库的】人工取数文件（.gitignore 里写明
 * "必须入库，重新生成需要人工去 Search Console 后台导出"，不是派生物）。若把损坏也当成
 * "没有数据"，一个逗号就能让全部有真实搜索流量的社区页被挤出静态页、改由赞数补足：
 *   - 退出码 0，CI 全绿，部署成功，sitemap 正常生成
 *   - 日志会打印 "0 有流量" —— 数字本身很扎眼，但没人盯构建日志里的这个数
 *   - 真正的损失是上线后 SEO 静默退化，只有 Search Console 数据能发现
 * 文件不存在则是合法状态（首次拉取快照前还没有流量数据），那才是可以静默降级的。
 *
 * 反过来说，对【产物】 communityStaticIds.json 不适用这条：它每次都由输入完整重算，
 * 损坏时正确的恢复方式是重写而不是报错。见 run() 里的落盘判断。
 */
function readJson(file, fallback, allowMissing = false) {
  let raw;
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch (e) {
    if (allowMissing && e.code === "ENOENT") return fallback;
    die(`[community-select] 读取失败 ${file}: ${e.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    die(`[community-select] JSON 解析失败 ${file}: ${e.message}`);
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
    const item = readJson(path.join(dataDir, file), null, true);
    if (item && Number.isInteger(item.id)) corpus.set(item.id, item);
  }

  // 1) 有搜索流量的先进 —— 不看赞数。净踩与否是 sitemap 的收录取舍
  //    （见 scripts/sitemapCommunityItems.mjs），不该决定要不要预渲染：
  //    一个被踩过的页面同样有 LCP 问题，而它有流量就说明真有人在看。
  const traffic = readJson(trafficPath, [], true).filter((id) => corpus.has(id));
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
  // 只在变化时落盘：否则每次构建都动这个文件，dev server 的 watcher 会跟着抖。
  //
  // 产物损坏时【重写而不是报错】，与输入的 fail-fast 策略相反，这是有意的：
  // 产物每次都由上面的选品逻辑完整重算，重写就是它的正确恢复方式；而报错会让
  // "构建失败 → 手工删文件"成为唯一出路。触发场景还特别现实——fs.writeFileSync 不是
  // 原子的，写入途中断电/被杀就会留下截断文件，此时 fail-fast 反而把一次瞬时中断
  // 变成需要人工介入才能恢复的构建阻塞。
  // 所以这里只做"文件是否存在"的检查，不经过 readJson 的解析。
  if (!fs.existsSync(outPath) || fs.readFileSync(outPath, "utf8") !== next) {
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
