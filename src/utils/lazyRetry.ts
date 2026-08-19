import React from "react";
import { isChunkError, reloadOnce } from "./chunkReloadGuard";

/**
 * React.lazy 的自愈版。全站 lazy 组件统一走这里，不要再裸用 React.lazy
 * （scripts/checkChunkReloadGuard.mjs 会扫描并拦下裸用）。裸用有两个坑：
 *
 *  1. React.lazy 会**永久缓存** settled 结果：chunk 抖一次，之后每次渲染都直接拿那个
 *     已 reject 的 promise，root ErrorBoundary 红框上的 "Try again" 重渲染也不会重新发请求。
 *  2. 调用处都没有局部 error boundary，失败一路冒到 root ErrorBoundary —— 一个广告位
 *     没加载出来，整页被 "This page crashed" 替换。
 *
 * 解法分两层：
 *  · retryImport —— chunk 失败等 500ms 重试一次（Rspack 与 webpack 的 chunk 运行时在失败
 *    回调里都会清掉 installedChunks 记录，重试是真重新发请求）。模块自身抛错不重试：
 *    重试多少次都一样，只会把真错误延后。
 *  · 可重置外壳 —— chunk 层面的「最终失败」不让 React.lazy 缓存：丢弃当前 lazy 实例，
 *    下一次渲染（红框点 "Try again"、用户再点一次分享按钮、SPA 导航回来）换全新实例
 *    重新请求。非 chunk 的代码错误则保留缓存：重渲染重试一个必抛的模块只会刷屏。
 */
const RETRY_DELAY_MS = 500;

function retryImport<T>(factory: () => Promise<T>): Promise<T> {
  return factory().catch((err) => {
    if (!isChunkError(err)) throw err;
    return new Promise<void>((resolve) => setTimeout(resolve, RETRY_DELAY_MS)).then(factory);
  });
}

type Loader<T extends React.ComponentType<any>> = () => Promise<{ default: T }>;

function makeResettableLazy<T extends React.ComponentType<any>>(factory: Loader<T>, onFinalFailure: (err: unknown) => Promise<{ default: T }>) {
  let inner: React.LazyExoticComponent<T> | null = null;
  const load = () =>
    retryImport(factory).catch((err) => {
      if (isChunkError(err)) inner = null; // 抖动/发版陈旧：下一次渲染换新实例重来
      return onFinalFailure(err);
    });
  function LazyShell(props: React.ComponentProps<T>) {
    if (!inner) inner = React.lazy(load);
    return React.createElement(inner, props);
  }
  return LazyShell;
}

/**
 * 页面主体功能用（PromptDetailModal、MySpace、LoginComponent）：重试后仍是 chunk 失败，
 * 先尝试整页刷新 —— 这些组件失败时页面反正要被 root ErrorBoundary 整页替换、组件状态
 * 保不住，刷新拿新 HTML 还能自愈发版陈旧；刷新已发起时挂起 promise（Suspense 停在
 * fallback，不闪红框），冷却窗口内则抛给红框，且外壳已重置——"Try again" 是真重试。
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(factory: Loader<T>) {
  return makeResettableLazy<T>(factory, (err) => {
    if (isChunkError(err) && reloadOnce()) return new Promise(() => {});
    throw err;
  });
}

/**
 * 装饰性/可有可无的组件用（ShareButtons、表情/Giphy 选择器）：仍失败就
 * 渲染成空，不惊动 ErrorBoundary、不刷新 —— 它们缺席页面照常可用，为它们 crash 整页
 * 或刷掉用户正在写的评论完全不成比例。chunk 失败会重置外壳，网络恢复后用户下一次
 * 交互（再点分享/表情按钮）就能加载出来；console.error 保证真出 bug 时可见，
 * 不至于和广告拦截器的静默 null 混为一谈。
 */
export function lazyOptional<T extends React.ComponentType<any>>(factory: Loader<T>) {
  return makeResettableLazy<T>(factory, (err) => {
    console.error("[lazyOptional] 组件加载失败，本次渲染为空：", err);
    return Promise.resolve({ default: (() => null) as unknown as T });
  });
}
