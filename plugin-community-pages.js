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
 * ── 页数上限 ──
 * EdgeOne Pages 单项目最多 20000 个文件，每个静态页占 2 个（HTML + 它的 JSON chunk）。
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
      const ids = readIds(siteDir);
      for (const id of ids) {
        actions.addRoute({
          path: `/community-prompt/${id}`,
          exact: true,
          component: "@site/src/components/CommunityPromptDetail",
          // modules 的 key 即组件收到的 prop 名。CommunityPromptDetail 拿到 initialPrompt
          // 就跳过 loading 骨架屏（正文随 SSR 直出，LCP 元素进 HTML），
          // 只在后台做一次 SWR 刷新，刷新失败也不会把页面翻成错误页。
          modules: { initialPrompt: `@site/src/data/community/${id}.json` },
        });
      }
      if (ids.length) console.log(`[community-pages] ${ids.length} routes @ ${i18n.currentLocale}`);
    },
  };
};
