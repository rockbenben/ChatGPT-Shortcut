# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AiShort (ChatGPT Shortcut) is an AI prompt management platform built on **Docusaurus 3.10.1** with **React 19** and **Ant Design 6**. Users browse, search, create, and share AI prompts across 18 languages. The backend is a Strapi instance at `https://api.newzone.top/api`.

Live site: https://www.aishort.top

## Common Commands

```bash
yarn start          # Dev server (default locale zh-Hans)
yarn dev            # Alias for start (has its own predev hook — do not add aliases without one)
yarn build          # Production build — all 18 locales, memory-safe (6×3 phased)
yarn typecheck      # Runs the generators + self-checks (clipboard, chunk fallback), then tsc
yarn gen:snapshot   # Fetch the real community snapshot (dev hooks only write an empty stub)
yarn serve          # Serve built site locally
yarn clear          # Clear Docusaurus cache
```

**Generated artifacts are gitignored**: `src/css/antd.dark.css`, the 5022 prompt page shells
(`src/pages/prompt/` + `i18n/*/docusaurus-plugin-content-pages/prompt/`), and
`src/data/communitySnapshot.json`. `scripts/generate.mjs` is the **single orchestrator** — every
`pre*` hook (`prestart`/`predev`/`pretypecheck`/`prebuild`/`predeploy`) is just
`node scripts/generate.mjs [--prod]`, so adding a generator means editing one file, not five.
It skips any step whose script is absent, which keeps the same file working on `main` and
`offline` (their generator sets differ). `--prod` fetches the real community snapshot; without it
the snapshot falls back to an empty stub so a fresh clone runs dev/typecheck with no backend.

There are deliberately **no per-artifact `gen:` commands** — the hooks always produce them, and a
manual command would imply they need hand-maintaining (`antd.dark.css` went stale for exactly that
reason). To force one, call the script directly: `node scripts/genAntdCss.mjs --force`,
`node scripts/genPromptPages.mjs`. `gen:snapshot` is the one exception: the dev hooks
*deliberately* write only a stub, so it is the only way to get real data locally.

There is no linter, formatter, or test framework configured. `yarn typecheck` is the primary
quality gate — it runs `tsc` **plus** the assert-based self-checks
(`scripts/checkClipboardFallback.mjs` for the clipboard fallback chain,
`scripts/checkChunkReloadGuard.mjs` for the chunk-failure fallback; both guard logic whose failure
mode is invisible to the compiler — add new ones to the `pretypecheck` chain). CI runs it before building, because the Docusaurus
build strips types with swc and does **not** type-check: code with a TS error still builds with
exit code 0.

## Architecture

### Framework Stack
- **Docusaurus 3.10.1** — static site generator with file-based routing under `src/pages/`
- **React 19** with Context API for state (no Redux/Zustand)
- **Ant Design 6** — primary UI library, dark-mode only with zero-runtime CSS (`colorMode.disableSwitch: true`). Tokens live in `src/theme/antdTokens.mjs`, shared by `src/theme/Root.tsx` (runtime `ConfigProvider`, adds `zeroRuntime`) and `scripts/genAntdCss.mjs` (build-time extraction, must **not** set `zeroRuntime` or it extracts an empty file). The extracted `src/css/antd.dark.css` is **not in git** — it is regenerated on prestart/predev/pretypecheck/prebuild/predeploy (all of which just call `scripts/generate.mjs`), fingerprinted by antd version + token hash. It previously went stale silently when antd was bumped, which shows up only as buttons/hover keeping old colors, with a green build.
- **Axios** for API calls with JWT auth interceptors

### Key Contexts
- **`AuthContext`** (`src/components/AuthContext.tsx`) — User auth state with Stale-While-Revalidate pattern: loads cached user from `lscache`, refreshes silently in background. Mounted **once** at `src/theme/Root.tsx` (not per-page) so SPA navigations don't re-trigger `/myspace`. `enrichMySpaceData` (in `src/utils/myspaceUtils.ts`) is the shared shape-builder used by `fetchUser`. Exposes `syncMySpaceState(patch)` — the **single entry point** for any client-side mutation to update `userAuth` state + `lscache-user_auth` + `lscache-myspace` in lockstep (used by useFavorite delta reconcile, MySpace drag/tag mutations). Adds `ensureAuthReady`-style waits in callers for the rare pending-window race.
- **`ViewModeContext`** (`src/contexts/ViewModeContext.tsx`) — Toggles between "collection" (personal space) and "explore" (public browsing) modes

### API Layer (`src/api/`)
Modular barrel-exported API client against Strapi backend:
- `config.ts` — API base URLs (must not import other API modules to avoid circular deps)
- `client.ts` — Axios instance with auth token interceptors, 401 auto-logout
- `auth.ts`, `user.ts`, `prompts.ts`, `favorites.ts`, `myspace.ts`, `comments.ts` — Domain modules
- `homepage.ts` — Loads prompt cards from static JSON (not API), with 3-tier cache: Memory → lscache → Dynamic Import

**Mutation patterns** (decision tree by frequency):
- **High-frequency** (❤️ via `useFavorite`): `patchFavorites({loves:{add,remove}, commLoves:{add,remove}})` → delta `PATCH /favorites/me`. Server merges against current DB state, so concurrent multi-device edits don't lose entries. Response is intentionally delta-shaped (`{favoriteId, loves, commLoves, added}` — NOT `/myspace` shape), keeping payload proportional to ops not state. Flow: *optimistic update → PATCH → reconcile via `applyDeltaResponse`* — ops + `delta.added` are applied to local `items` (server's `updatedAt` replaces optimistic client time), then `syncMySpaceState` writes both lscache layers.
- **Low-frequency local state changes** (MySpace drag, tag manager save, item-tag toggle): API call + local manual sync via `syncMySpaceState`. **No GET /myspace round-trip** — we know what we sent and server doesn't reorder, so we mirror the change locally. Documented trade-off: cross-device drift until next cold load.
- **Complex/multi-entity mutations** (prompt CRUD via `useUserPrompt`, bulk import): API call + `refreshUserAuth()` for a full `/myspace` re-fetch. Justified because prompt operations have server-side lifecycle hooks that modify fields client can't predict.

Legacy `createFavorite`/`updateFavorite` (full-array PUT) are retained for backward-compat; bulk import has been migrated to `patchFavorites`. **Every new mutation should route through `syncMySpaceState`** — never write `lscache-user_auth` or `lscache-myspace` directly from outside AuthContext.

### Caching (`src/utils/cache.js`)
Uses `lscache` (localStorage with TTL). Prefixed keys: `cc` (copy counts), `cl_` (comm lists), `pc_` (prompt cards), `pm_` (commu prompts), `pu_` (user prompts), `sr_` (search), `cm_` (comments), `up` (user profile), `myspace`. ETag-based conditional requests for API cache validation.

**Cache key invariant for `getPromptCacheKey(type, id, lang)`**: cards use `${prefix}${id}_${lang}` (per-language); commus/userprompts use `${prefix}${id}` (language-agnostic). Hoist `keyLang = type === "cards" ? sanitizedLang : undefined` once and reuse — passing `sanitizedLang` directly for commus/userprompts produces a different key from what `setCache` writes, silently breaking `needsCacheExtension` (returns `true` for nonexistent key → triggers redundant `check-updates` every page load).

**In-flight dedup** (`src/utils/dedupe.ts`): both `getPromptData` (homepage cards loader) and `getPrompts` (commus/userprompts batch fetch) wrap their network paths with `dedupe(key, fn)` — concurrent calls for the same id set share a Promise instead of racing duplicate cache-validation + check-updates requests. Dedup key for `getPrompts`: `getPrompts_${safeType}_${sorted-ids}` - no lang segment, because `cards` short-circuits to `fetchCardsByIds` before the dedupe and the remaining types (commus/userprompts) are language-agnostic. Do not re-add one: it would desync from `getPromptCacheKey`, the exact mismatch that made `needsCacheExtension` fire `check-updates` on every page load.

### Data Pipeline
`CodeUpdateHandler.py` (Python) is the build-time data transformer:
1. Reads master `src/data/prompt.json` (all languages)
2. Splits into per-language files (`prompt_{lang}.json`)
3. Generates per-ID per-language card JSONs in `src/data/cards/`
4. Generates default favorite/other card sets in `src/data/default/`
5. Generates the 18 i18n homepage wrappers (`i18n/{lang}/docusaurus-plugin-content-pages/index.tsx`) by copying `src/pages/index.tsx` with the locale's favor/other JSON swapped in
6. Uses OpenCC for Simplified → Traditional Chinese conversion

It does **not** generate the `prompt/{id}.tsx` shells any more — `scripts/genPromptPages.mjs` owns those (see Routing). `src/data/cards/` must stay tracked: it carries `datePublished`/`dateModified`, which step 3 maintains by content diff and `scripts/sitemapPromptLastmod.mjs` reads for sitemap `lastmod`.

### Component Patterns
- **PromptCard** is polymorphic with variants: `DataCard`, `CommunityCard`, `FavoriteCard`, `UserCard` (all in `src/components/PromptCard/`)
- **`ClampBox` (`PromptCard/Base.tsx`) wraps every multi-line `Typography` inside a card.** antd's
  multi-line ellipsis needs `display:-webkit-box`, but a **flex item gets blockified** (Chrome computes
  `flow-root`), which silently kills `-webkit-line-clamp` and leaves `overflow:hidden` slicing the last
  line in half. The wrapper carries the flex props so the clamp survives. Any new clamped title/body in
  a flex container needs it — the failure is visual only and passes typecheck and build.
- **`EmptyState` (`src/components/EmptyState.tsx`) is the only empty/error state.** Don't use antd
  `<Empty>` / `<Result>` (light cartoon illustrations, loudest thing on a dark page) and don't add
  another CSS-only variant — a parallel `.comments-empty` implementation already existed once and has
  been folded in.
- **Lazy 组件一律走 `src/utils/lazyRetry.ts`，不要裸用 `React.lazy`**：裸用时 chunk 抖一次
  就永久红框（React.lazy 缓存失败的 promise，root ErrorBoundary 的 "Try again" 不会重新发
  请求），且调用处都没有局部 error boundary —— 一个广告位没加载出来会把整页 crash 掉。
  两个入口按「缺了它页面还成不成立」选，且都套**可重置外壳**——chunk 层面的最终失败会
  丢弃 lazy 实例，下一次渲染（红框 "Try again"、用户再点一次按钮）换新实例真正重新请求：
  - `lazyWithRetry` — 页面主体功能（`PromptDetailModal`、`MySpace`、`LoginComponent`）。
    重试一次；仍是 chunk 失败先 `reloadOnce`（此时页面反正要被 root ErrorBoundary 整页替换，
    刷新还能自愈发版陈旧），刷新发起则挂起不闪红框，冷却内才抛红框。
  - `lazyOptional` — 装饰性组件（`AdComponent`、`ShareButtons`、emoji/Giphy 选择器）。
    仍失败降级成空组件 + `console.error`，**永不刷新**（会冲掉用户正在写的评论）。
  模块自身抛错（非 chunk）一律不重试、不重置：重试必抛的模块只会把真错误延后。
- `React.memo()` on performance-sensitive components
- Custom hooks in `src/hooks/`: `useFavorite`, `useCopyToClipboard`, `useUserPrompt`, `useFilteredPrompts`

### i18n
- 18 locales, default `zh-Hans`. Configured in `docusaurus.config.js`
- Locales: en, zh-Hans, zh-Hant, ja, ko, es, pt, hi, ind, vi, th, fr, de, it, ru, ar (RTL), tr, bn
- UI strings: `@docusaurus/Translate` component and `translate()` function, stored in `i18n/{locale}/code.json`
- Prompt data: per-locale JSON files in `src/data/`
- **One id, one default message.** The default locale has no `code.json`, so each call site renders its
  own inline default — two spellings under the same id means two different strings on screen (this
  shipped once: modal said "Prompt 内容", detail page said "提示词内容"). Adding an id also means adding
  it to all 17 non-default `code.json` files, or those locales fall back to the Chinese source.
- **Third-party UI carries its own English.** antd (`Pagination`), emoji-mart and Giphy all ship
  hardcoded strings. antd + emoji-mart locale packs load on demand from
  `ANTD_LOCALE` / `EMOJI_LOCALE` maps, each `webpackInclude`-scoped to the 18 locales — without that
  scope the template-literal import emits a chunk per language the package ships (75 / 143 of them).
- **Locale-dependent formatting takes the page locale, never the host's.** Bare `toLocaleString()` /
  `new Intl.X()` follows the browser's locale, which mismatches the UI and desyncs SSR from hydration —
  pass `toBcp47(i18n.currentLocale, i18n.localeConfigs)`. Relative timestamps use native
  `Intl.RelativeTimeFormat` (`formatRelativeTime` in `src/utils/formatters.ts`); dayjs was dropped.
  The one deliberate exception is `formatCompactNumber`, pinned to `en-US` — see the comment there.

### Routing (file-based via `src/pages/`)
- `index.tsx` — Homepage with collection/explore views
- `community-prompts.tsx` — Paginated community prompt listing with voting
- `community-prompt.tsx` — Single community prompt page
- `prompt/{id}.tsx` — 279 individual prompt pages. **Not in git**: these shells (279 default-locale + 4743 i18n = 5022) are generated by `scripts/genPromptPages.mjs` from `src/data/cards/` on prestart/predev/pretypecheck/prebuild/predeploy, and are gitignored. Don't hand-edit them; change the template in that script. It fails the build if any locale is missing a card JSON or a `prompt_<locale>.json` (both would otherwise silently ship default-locale content under a localized URL), and prunes orphaned shells.
- `user/auth.tsx`, `user/index.tsx` — User account pages
- `feedback.tsx` — Feedback/comments page

## Conventions

- **Import paths** use `@site/src/...` (Docusaurus alias)
- **Code comments** are predominantly in Chinese (Simplified)
- **CSS approach** is a mix of CSS Modules (`*.module.css`), global CSS (`src/css/custom.css`), Ant Design theme tokens, and inline styles
- **Theme root** (`src/theme/Root.tsx`) wraps entire app with Ant Design `ConfigProvider` (theme key: "aishort")
- **Config files** use ES module syntax; `plugin-gen-geo.js` is CommonJS
- Voting uses **optimistic UI** updates with rollback on error
- **Chunk 失败兜底的分工不变量**（`src/clientModules/chunkReload.js` + `src/utils/lazyRetry.ts`，
  由 `scripts/checkChunkReloadGuard.mjs` 自检守护）：整页刷新只发生在「页面已经/即将不可用」
  的两处——React 未挂载的首屏死壳，和主体 lazy 组件重试后仍 chunk 失败（ErrorBoundary 即将
  整页替换）。**其余已挂载场景一律不刷** —— Docusaurus 的
  hover 预载 / rel=prefetch 失败会冒到 window 但页面完全正常，扩大兜底范围会重新引入
  「鼠标扫过链接就把用户当前页面整页重载」的实测回归。路由切换的失败 Docusaurus 自己会 reload，不要重复处理

## CI/CD

Primary deployment workflow (`.github/workflows/main.yml`): triggers on push to `speedup/data-retrieval` branch, runs `yarn typecheck` then `yarn build` (memory-safe phased build), deploys to GitHub Pages via `gh-pages` branch. Uses Node 24 with yarn cache. The typecheck step also produces the 5022 prompt page shells, so the subsequent build hits the generator's `.genstamp` fast path.

`.github/workflows/azure-static-web-apps-*.yml` is dormant (its trigger branch is prefixed `disabled-`). Action versions are kept current by Dependabot (weekly, `github-actions` ecosystem); note that `uses:` lines inside comments are invisible to it and will not be bumped.
