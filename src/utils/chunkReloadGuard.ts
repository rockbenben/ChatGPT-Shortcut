/**
 * chunk 加载失败的共用判定 + 整页刷新兜底。
 *
 * 判定（isChunkError）两个消费者：clientModules/chunkReload.js 与 utils/lazyRetry.ts。
 * 必须共用一份 —— 两处各写一个正则，迟早一处认得 "ChunkLoadError" 另一处认不得。
 *
 * 刷新（reloadOnce）两个消费者，都只在「页面反正已经/即将不可用」时触发：
 *  · clientModules/chunkReload.js —— 首屏死壳（React 没挂上，页面点不动）
 *  · lazyRetry 的 lazyWithRetry —— 主体功能组件重试后仍 chunk 失败（root ErrorBoundary
 *    即将整页替换、状态反正保不住；刷新还能自愈发版陈旧）
 * lazyOptional（装饰性组件）刻意不刷 —— 页面是活的，用户可能正在写评论/填登录表单。
 *
 * 冷却窗口用 sessionStorage 记下刷新时刻：若刷新后短时间内同类错误又出现（说明不是发版陈旧、
 * 而是真·缺文件或持续断网），就不再刷，避免刷新死循环。
 * 行为由 scripts/checkChunkReloadGuard.mjs 自检守护（pretypecheck 自动跑）。
 */
const CHUNK_ERROR_RE = /(Loading(\s+CSS)?\s+chunk\s+[\w-]+\s+failed|ChunkLoadError|Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed)/i;

export function isChunkErrorText(text: unknown): boolean {
  return typeof text === "string" && CHUNK_ERROR_RE.test(text);
}

/** 从 Error / rejection reason 判定是不是 chunk 加载失败（而非模块自身抛错） */
export function isChunkError(err: unknown): boolean {
  if (!err) return false;
  const e = err as { message?: unknown; name?: unknown };
  if (isChunkErrorText(e.message) || isChunkErrorText(e.name)) return true;
  // String() 对 null-prototype / toString 抛异常的 reason 会抛 TypeError——
  // 判定函数自己抛出去会用转换错误顶替真正的错误，必须吞掉
  try {
    return isChunkErrorText(String(err));
  } catch {
    return false;
  }
}

const GUARD_KEY = "__chunk_reload_at";
const COOLDOWN_MS = 20000;

/** @returns 是否真的发起了刷新。false = 还在冷却窗口内 */
export function reloadOnce(): boolean {
  let last = 0;
  try {
    last = Number(sessionStorage.getItem(GUARD_KEY)) || 0;
  } catch {}
  if (Date.now() - last < COOLDOWN_MS) return false;
  try {
    sessionStorage.setItem(GUARD_KEY, String(Date.now()));
  } catch {}
  window.location.reload();
  return true;
}
