import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

/**
 * 发版后「卡在首屏、刷新才好」的兜底。
 *
 * 成因：SSG 的 JS/CSS chunk 文件名带内容哈希、按 immutable 长缓存；发版后 chunk 哈希变了，
 * 但浏览器/CDN 若拿到的是上一版缓存的 HTML，它引用的旧 chunk 已被新版替换 → 加载 404
 * → React 挂不起来 → 整页卡死，等多久都没用，只有手动刷新拿到新 HTML 才恢复。
 *
 * 本模块监听 chunk 加载失败，自动刷新一次（= 把用户那步手动刷新自动化）。
 * 用 sessionStorage 冷却窗口防重载循环：若刷新后短时间内同类错误又出现（说明不是发版陈旧、
 * 而是真·缺文件），就不再刷，避免死循环。
 *
 * 治本仍需 CDN 对 HTML 设 no-cache（见 static/edgeone.json 说明）；本模块是治标且对任意
 * chunk 失败都生效的纵深防御。
 */
if (ExecutionEnvironment.canUseDOM) {
  const GUARD_KEY = "__chunk_reload_at";
  const COOLDOWN_MS = 20000; // 冷却 20s：一次刷新够修发版陈旧；若仍失败则不再刷，防循环

  const isChunkErrorText = (text) =>
    typeof text === "string" &&
    /(Loading(\s+CSS)?\s+chunk\s+[\w-]+\s+failed|ChunkLoadError|Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed)/i.test(text);

  const reloadOnce = () => {
    let last = 0;
    try {
      last = Number(sessionStorage.getItem(GUARD_KEY)) || 0;
    } catch {}
    if (Date.now() - last < COOLDOWN_MS) return; // 冷却内不再刷，避免死循环
    try {
      sessionStorage.setItem(GUARD_KEY, String(Date.now()));
    } catch {}
    window.location.reload();
  };

  // ① 资源加载失败（<script>/<link> 404）—— 走捕获阶段，target 是元素、message 常为空。
  //    仅对本站 /assets/ 下的 chunk 触发；第三方脚本（adsense / tracker）失败不重载。
  window.addEventListener(
    "error",
    (e) => {
      const t = e && e.target;
      if (t && (t.tagName === "SCRIPT" || t.tagName === "LINK")) {
        const url = t.src || t.href || "";
        if (/\/assets\//.test(url)) reloadOnce();
        return;
      }
      const msg = (e && e.message) || (e && e.error && e.error.message);
      if (isChunkErrorText(msg)) reloadOnce();
    },
    true
  );

  // ② 动态 import() 失败多以 unhandledrejection 抛出（ChunkLoadError）
  window.addEventListener("unhandledrejection", (e) => {
    const r = e && e.reason;
    if (!r) return;
    if (isChunkErrorText(r.message) || isChunkErrorText(r.name) || isChunkErrorText(String(r))) {
      reloadOnce();
    }
  });
}
