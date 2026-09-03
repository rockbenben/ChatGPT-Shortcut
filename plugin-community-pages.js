/**
 * 社区提示词详情页的静态路由 —— 仅 speedup/data-retrieval 分支有此文件。
 *
 * 为每条 UGC 注册一条 /community-prompt/<id> 路由，正文由 scripts/genCommunityData.mjs
 * 抓到 src/data/community/<id>.json，构建期直出 HTML。
 *
 * 为什么要静态化：?id=N 是查询参数，SSG 没法按参数出不同 HTML，4409 条提示词共用同一份
 * 4.7KB 空壳（<title>加载中…</title> + skeleton），正文要等 main.js 启动 + API 往返才出现
 * —— Search Console 场地数据里移动端 587 个 URL 判「欠佳」，群组 LCP 4.4s。
 *
 * ── 为什么用 addRoute 而不是 src/pages/community-prompt/<id>.tsx 薄壳 ──
 * 薄壳那条路（genPromptPages 的做法）试过，代价是三个连锁补丁：
 *  1) 每个薄壳是独立入口模块，而 Docusaurus 对 **server 编译**关死了 splitChunks
 *     （@docusaurus/core/lib/webpack/base.js: `splitChunks: isServer ? false : {...}`），
 *     于是每个路由 chunk 复制一份 ~4.6MB 的 antd 依赖树 —— 实测 3709 个 chunk 写出
 *     14GB，把 server.bundle.js 挤没，构建以一句莫名的 ENOENT 失败。
 *  2) Docusaurus 的 pages 对没有 i18n 覆盖的文件会回落到 src/pages/，18 个 locale
 *     各生成一份 = 79362 页，得再加一层 per-locale exclude 去挡。
 *  3) 那层 exclude 里的 glob 字符串又会撞坏 checkAntdStyleWiring 的注释剥离。
 * addRoute 让 4409 条路由共用同一个 component chunk（同一个 import 请求 = 同一个 chunk），
 * 没有可复制的东西，上面三条全部不存在。locale 也由本插件直接决定，不依赖 exclude。
 *
 * ── 为什么正文要合并成分片，而不是一条一个 JSON ──
 * modules 里每出现一个不同的模块路径，Docusaurus 就为它生成一个 chunk，并在
 * **每一页都要下载的 main.js** 里留下三处登记：registry.js 的 import 表、
 * routesChunkNames.json 的路由→chunk 映射、以及 runtime 的 chunk id/hash 表。
 * 一条一个 JSON 时 1400 条 ≈ 83 KB gz（占 main.js 的四分之一），
 * 而这笔钱首页、prompt 页、docs 页全都在付，它们一条社区正文都不用。
 * 合并成 SHARD_SIZE 条一片后登记项降到 1/16，代价只落在社区详情页自己身上：
 * 水合前要下整片而不是一条（正文是 SSR 直出的，LCP 不受影响）。
 * 组件怎么从整片里挑出自己那条，见 src/components/CommunityPromptDetail.tsx。
 *
 * ── 页数上限 ──
 * EdgeOne Pages 单项目最多 20000 个文件。分片前每个静态页占 2 个（HTML + 它的 JSON chunk）；
 * 分片后 JSON chunk 由 SHARD_SIZE 条共用，1400 页只多 88 个文件而不是 1400 个。
 * 2026-09-02 全量 4409 页时产物 23044 个文件，EdgeOne 只回一句
 * "File count exceeds project limit" 就整个部署失败、线上静默停在上一版。
 * 现在由 scripts/genCommunitySelection.mjs 选品封顶，并由 scripts/buildPhased.mjs 兜底断言。
 *
 * ── 只注册默认 locale ──
 * UGC 正文不随 locale 翻译，18 份只差界面语言，不值 18 倍的构建代价。
 * 其余 locale 继续走 src/pages/community-prompt.tsx 的 ?id= CSR 壳，行为完全不变。
 */
const fs = require("fs");
const path = require("path");

const SELECTION = "src/data/communityStaticIds.json";
const DATA_DIR = "src/data/community";

// 一个分片装多少条正文。见文件头「为什么正文要合并成分片」。
// 调大：main.js 里的登记项更少，但社区详情页水合前要多下几 KB；调小则相反。
// 16 时实测：main.js 省 ~50 KB gz（每页都省），社区详情页多下 ~11 KB gz（只有它自己付）。
const SHARD_SIZE = 16;

/**
 * 出静态页的 id 由 scripts/genCommunitySelection.mjs 决定，不是语料全集 ——
 * EdgeOne Pages 单项目 20000 文件上限，全量 4409 页会超。见该脚本文件头的实测账。
 */
function readIds(siteDir) {
  try {
    const ids = JSON.parse(fs.readFileSync(path.join(siteDir, SELECTION), "utf8"));
    // 选品表可能比语料新/旧一步，正文不在就跳过，否则构建期 Module not found
    return ids.filter((id) => Number.isInteger(id) && fs.existsSync(path.join(siteDir, DATA_DIR, `${id}.json`)));
  } catch {
    return [];
  }
}

module.exports = function communityPagesPlugin(context, options = {}) {
  const { siteDir, i18n } = context;
  // enabled: 总开关，见 docusaurus.config.js 顶部的 COMMUNITY_STATIC_PAGES。
  // main / offline 分支置 false，社区详情页回到纯 ?id= CSR，构建期也不会去抓 UGC。
  const enabled = options.enabled !== false && i18n.currentLocale === i18n.defaultLocale;

  return {
    name: "community-prompt-pages",

    async contentLoaded({ actions }) {
      if (!enabled) return;
      // 排序只为让分片边界稳定可读（第 k 片 = 排序后的第 k 组），与正确性无关
      const ids = readIds(siteDir).sort((a, b) => a - b);
      if (ids.length === 0) return;

      const shards = [];
      for (let i = 0; i < ids.length; i += SHARD_SIZE) {
        shards.push(ids.slice(i, i + SHARD_SIZE));
      }

      // createData 写进 .docusaurus/community-prompt-pages/（不入库），返回可当模块路径用的绝对路径。
      // 同一片里的所有 id 拿到同一个路径 → Docusaurus 只为它生成一个 chunk、一条登记。
      const shardPathById = new Map();
      await Promise.all(
        shards.map(async (shardIds, index) => {
          const bundle = {};
          for (const id of shardIds) {
            bundle[id] = JSON.parse(fs.readFileSync(path.join(siteDir, DATA_DIR, `${id}.json`), "utf8"));
          }
          const modulePath = await actions.createData(`shard-${index}.json`, JSON.stringify(bundle));
          for (const id of shardIds) {
            shardPathById.set(id, modulePath);
          }
        }),
      );

      for (const id of ids) {
        actions.addRoute({
          path: `/community-prompt/${id}`,
          exact: true,
          component: "@site/src/components/CommunityPromptDetail",
          // modules 的 key 即组件收到的 prop 名。CommunityPromptDetail 从 URL 取出本页的 id，
          // 再从 promptShard 里挑自己那条：拿到正文就跳过 loading 骨架屏（正文随 SSR 直出，
          // LCP 元素进 HTML），只在后台做一次 SWR 刷新，刷新失败也不会把页面翻成错误页。
          modules: { promptShard: shardPathById.get(id) },
        });
      }
      console.log(`[community-pages] ${ids.length} routes / ${shards.length} shards @ ${i18n.currentLocale}`);
    },
  };
};
