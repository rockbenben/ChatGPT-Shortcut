import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { isChunkError, isChunkErrorText, reloadOnce } from "@site/src/utils/chunkReloadGuard";

/**
 * 首屏 chunk 加载失败的兜底 —— 只管首屏，因为只有首屏 Docusaurus 自己不管。
 *
 * 覆盖范围有个天然上限，先说清楚：本文件被打进 main.<hash>.js（client modules 由
 * @docusaurus/core 的 App.js 顶层 import 进来）。所以**入口 chunk 自己 404 时救不了** ——
 * runtime~main / main 挂了，这段代码根本没机会执行。能接到的是入口跑起来之后、
 * 异步注入的那些 <script>/<link>：路由 chunk、预载、预取。
 *
 * 为什么只在「未挂载」时刷新（实测结论，改之前先读完）：
 *  · 首屏：clientEntry 是 `preload(pathname).then(renderApp)`，**没有 .catch**。preload 一挂
 *    React 就永不挂载，页面停在 SSG 出的静态 HTML 上 —— 看着完全正常，实则一点都点不动
 *    （实测过 React fiber 键为空）。这是唯一没人兜底的洞，本模块存在的理由。
 *  · 路由切换：PendingNavigation 的 preload().catch() 里 Docusaurus 自己就 location.reload()，
 *    不需要我们重复。
 *  · hover 预载（Link.onInteractionEnter → docusaurus.preload，无 catch）和 rel=prefetch
 *    （client/prefetch.js，自带 .catch(()=>{})）都是**投机性**的：它们失败时当前页面完全正常。
 *    早先版本对这类失败也刷新 —— 等于「鼠标扫过一个链接、网络抖一下，就把用户正在看的页面
 *    整页重载」。实测确认过这条路径会触发，故必须排除。
 *  · lazy 组件：交给 utils/lazyRetry.ts（重试 → 主体组件才允许刷新，装饰组件降级为空）。
 *
 * 已挂载后本模块不再兜的两类，是**有意放弃**、别当成漏网补回来：
 *  · 数据 chunk（prompt_{lang}.json、antd/emoji 语言包）在已挂载页面上 404：window 层
 *    分不清它和 hover 预载（同为 webpack script 注入），跟着刷会复活「扫过链接就整页重载」。
 *    实害有限：homepage.ts 有 lscache 三级缓存 + en→zh-Hans 回退，冷数据下一次冷加载自愈。
 *  · 首屏全局 stylesheet 404：CSS 请求早于本模块的监听注册，error 事件大概率根本收不到
 *    （改前的版本同样收不到，不是本次退化）；SPA 切换的路由 CSS 失败走 Docusaurus 自己的
 *    preload().catch → reload，有人管。
 *
 * 判据用 window.docusaurusRoot：clientEntry 的 renderApp() 一进去就赋值。它的精确语义是
 * 「preload 已成功、React 已开始接管」，**不是**「hydration 已提交」。这正是我们要的边界 ——
 * 从这一刻起页面的错误归 React（ErrorBoundary / lazyRetry）管，不该再由整页刷新插手。
 * 换成 Docusaurus 的 data-has-hydrated（hydration 提交后才置位）反而会把首帧渲染期间的
 * lazy 失败也拖进刷新，与上面一条冲突。
 *
 * CDN 侧的治本已做：static/edgeone.json 对 HTML 设 `max-age=0, must-revalidate`、对 assets
 * 设 immutable（线上响应头已验证）。本模块防的是剩余场景 —— 网络抖动、浏览器/中间缓存异常。
 */
if (ExecutionEnvironment.canUseDOM) {
  // 应用已挂载 = 当前页面是活的，任何 chunk 失败都不该由我们整页刷新
  const appMounted = () => Boolean(window.docusaurusRoot);

  const reloadIfDeadOnArrival = () => {
    if (appMounted()) return;
    reloadOnce();
  };

  // ① 资源加载失败（<script>/<link> 404 或 5xx）—— 走捕获阶段，target 是元素、message 常为空。
  //    仅对本站 /assets/ 下的 chunk 触发；第三方脚本（统计 / 嵌入等）失败不重载。
  window.addEventListener(
    "error",
    (e) => {
      const t = e && e.target;
      if (t && (t.tagName === "SCRIPT" || t.tagName === "LINK")) {
        const url = t.src || t.href || ""; // script 用 src，link（preload/stylesheet）用 href
        if (/\/assets\//.test(url)) reloadIfDeadOnArrival();
        return;
      }
      const msg = (e && e.message) || (e && e.error && e.error.message);
      if (isChunkErrorText(msg)) reloadIfDeadOnArrival();
    },
    true
  );

  // ② 动态 import() 失败以 unhandledrejection 抛出（ChunkLoadError）
  window.addEventListener("unhandledrejection", (e) => {
    if (isChunkError(e && e.reason)) reloadIfDeadOnArrival();
  });
}
