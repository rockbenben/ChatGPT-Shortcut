# AGENTS.md

This file provides guidance to coding agents (Claude Code, Codex, Antigravity, ...) when working with code in this repository.

## Project Overview

AiShort (ChatGPT Shortcut) is an AI prompt management platform built on **Docusaurus 3.10.2** with **React 19** and **Ant Design 6**. Users browse, search, create, and share AI prompts across 18 languages. The backend is a Strapi instance at `https://api.newzone.top/api` (for online branches).

Live site: https://www.aishort.top

---

## Branch Strategy & Multi-Branch Maintenance (`speed`, `main`, `offline`)

The repository is maintained across three primary branches with distinct architectural boundaries. When porting features or resolving conflicts during cherry-pick/merge, **always respect these boundaries**:

### 1. High-Level Branch Matrix

| Dimension | `speed` (`speedup/data-retrieval`) | `main` | `offline` |
| :--- | :--- | :--- | :--- |
| **Role & Deployment** | Production online deployment branch (auto-deploys to GitHub Pages `gh-pages`). | Canonical open-source baseline on GitHub. Clean of ads and tracking. | Standalone offline / self-hosted Docker edition. No remote backend. |
| **Ad Components** | **Present**: Uses `AdComponent` (`src/components/AdComponent.js`) via `lazyOptional` in HomePage, CommunityPromptPage, PromptPage, and community-prompts. | **Forbidden**: Completely stripped out. Never introduce `AdComponent` or ad scripts into `main`. | **Forbidden**: Completely stripped out. |
| **Community Prompts Architecture** | **Full SSG Sharded Prerendering**: Includes `src/data/community/` (1400+ JSONs), `communityTraffic.json`. Uses `plugin-community-pages.js` with 16-prompt shards (`promptShard`, `staticIds`) to prerender `/community-prompt/<id>`. | **Pure Dynamic CSR**: No `src/data/community/`, no static route plugin, no shards. Detail pages dynamically load via `/community-prompt?id=<id>` querying Strapi API. | **Local / Disabled**: No remote community fetch. Detail page loads local prompts via `loadPrompts()`; community listing page shows `<OnlineOnlyNotice>`. |
| **Backend & Auth** | Remote Strapi API with JWT auth and SWR session caching. | Remote Strapi API with JWT auth and SWR session caching. | **No Remote API**: `src/api/auth.ts`, `client.ts`, `comments.ts`, `config.ts` removed. Uses `src/api/localStore.ts` purely in `localStorage`. |
| **Comments & Polling** | **Present**: `Comments.tsx`, `usePollForAIReply.ts` using Strapi comment endpoints. | **Present**: Identical to `speed`. | **Forbidden / Deleted**: No remote comments or AI comment polling. `Comments.tsx` and `usePollForAIReply.ts` are deleted. |
| **User Status & Modals** | Dual-state (logged-in dropdown / logged-out button) with login/logout modals & session reset. | Dual-state (identical to `speed`). | **Single Local State**: Direct buttons for collection toggle and prompt creation. No login/logout modals, no remote session reset. |
| **Tracking / Tags** | GTM (`GTM-MX524GTT`) + Umami tracker script (`tracker.js`) + `static/ads.txt`. | None. Clean open-source baseline. | None. Docker-ready build. |
| **Build Generators** | Runs all generators including `genCommunityData.mjs`, `genCommunitySelection.mjs`, `genCommunitySnapshot.mjs`. | Runs `genAntdCss.mjs`, `genPromptPages.mjs`, `genCommunitySnapshot.mjs` (skips community corpus fetchers). | Runs `genAntdCss.mjs`, `genPromptPages.mjs` (skips absent snapshot/community scripts). |

---

### 2. File-by-File Differences Reference

When porting or cherry-picking, refer to this exact file-level difference table:

| File Path | `speed` (`speedup/data-retrieval`) | `main` | `offline` |
| :--- | :--- | :--- | :--- |
| `src/components/AdComponent.js` | **Exists** and is used. | **Deleted / Forbidden**. | **Deleted / Forbidden**. |
| `static/ads.txt` | **Exists**. | **Deleted**. | **Deleted**. |
| `docusaurus.config.js` | Has GTM, Umami `tracker.js`, and `plugin-community-pages.js`. | Clean: No GTM, no Umami, no `plugin-community-pages.js`. | Clean: No GTM, no Umami, no community plugins. Docker-ready. |
| `src/components/Comments.tsx` | **Exists** (remote Strapi comments & voting). | **Exists** (identical to `speed`). | **Deleted**: No comments feature. |
| `src/hooks/CommentComponent/usePollForAIReply.ts` | **Exists** (polls for AI reply). | **Exists** (identical to `speed`). | **Deleted**. |
| `src/components/CommunityPromptDetail.tsx` | **Exists with SSG shards**: accepts `promptShard`, `staticIds`, handles static SSR rendering. | **Exists as pure dynamic CSR**: prop-free component (`export default function CommunityPromptDetail() { return <CommunityPromptDetailInner />; }`). | **Deleted**: `src/pages/community-prompt.tsx` renders local prompt data directly. |
| `src/components/CommunityPromptPage.tsx` | Contains `<AdComponent />`, SSG canonical logic, full `Comments` and `LoginComponent`. | **No `<AdComponent />`**, dynamic CSR canonical, full `Comments` and `LoginComponent`. | **No `<AdComponent />`**, breadcrumbs and notFound link to local `/`, **no `Comments` or `LoginComponent`**. |
| `src/pages/community-prompts.tsx` | Paginated community prompts listing with search, sorting, and `<AdComponent />`. | Paginated community prompts listing, **strictly no `<AdComponent />`**. | **`<OnlineOnlyNotice>`**: Renders placeholder informing users that community prompts require online site. |
| `src/pages/community-prompt.tsx` | Renders `CommunityPromptDetail` shell. | Renders `CommunityPromptDetail` shell. | Loads local prompt via `loadPrompts()` and renders `CommunityPromptPage`. |
| `src/components/HomePage.tsx` | Uses `<AdComponent />` via `lazyOptional`. | **No `<AdComponent />`**. | **No `<AdComponent />`**. |
| `src/components/PromptPage.tsx` | Uses `<AdComponent />` via `lazyOptional`. | **No `<AdComponent />`**. | **No `<AdComponent />`**. |
| `src/components/user/UserStatus.tsx` | Logged-in/logged-out states, login modal, logout confirm modal, `persistAuthToken(null)`. | Logged-in/logged-out states, login modal, logout confirm modal, `persistAuthToken(null)`. | **Pure local state**: no login/logout modals or tokens; buttons rendered directly. Responsive `<span>` labels kept. |
| `src/api/auth.ts`, `client.ts`, `comments.ts`, `config.ts` | **Exists** (Axios client, Strapi JWT auth, comment APIs). | **Exists** (identical to `speed`). | **Deleted / Forbidden**: Never add or reintroduce these files into `offline`. |
| `src/api/localStore.ts` | Not used. | Not used. | **Primary store**: Local browser storage for prompts, favorites, tags, and user space. |
| `src/api/prompts.ts` | Remote API client with cache/force options. | Remote API client with cache/force options. | Offline implementation backed by `localStore.ts`. Accepts `_options?: { force?: boolean }` for signature parity. |
| `src/data/community/` | 1400+ static community JSONs. | **None** (omitted). | **None** (omitted). |
| `plugin-community-pages.js` | **Exists** (generates static routes). | **None** (omitted). | **None** (omitted). |
| `scripts/genCommunityData.mjs`, `genCommunitySelection.mjs` | **Exists** (corpus fetch & selection). | **None** (omitted). | **None** (omitted). |

---

### 3. Cherry-Pick & Conflict Resolution Rules

#### Step 1: Porting from `speed` to `main`
`speed` is the primary feature source of truth. When porting commits to `main`:
1. **Strip all Ad components**:
   - Remove `import AdComponent` and all `<AdComponent />` JSX nodes from `CommunityPromptPage.tsx`, `HomePage.tsx`, `PromptPage.tsx`, and `community-prompts.tsx`.
2. **Preserve Dynamic CSR for Community Detail**:
   - Never port `src/data/community/`, `communityTraffic.json`, `communityStaticIds.json`, `plugin-community-pages.js`, `genCommunityData.mjs`, or `genCommunitySelection.mjs` to `main`.
   - In `CommunityPromptDetail.tsx`: keep the component prop-free (`export default function CommunityPromptDetail() { return <CommunityPromptDetailInner />; }`). Discard `promptShard`, `staticIds`, `initialPrompt`, `STATIC_PATH_ID`, and `isRefreshOnly`.
   - In `CommunityPromptPage.tsx`: canonical must always point to `${siteConfig.url}${localePrefix}/community-prompt?id=${prompt.id}`.
   - Still keep all pure UX fixes (e.g. separating `error` from `notFound`, `onRetry` button, `getUserAuth()` authoritative check, `promptKey` instance reuse guard).
3. **Card Data Timestamps (`src/data/cards/`)**:
   - `main` and `speed` run `CodeUpdateHandler.py` independently. When `src/data/cards/` conflict, compare `dateModified` timestamps; `main` often already has the newest timestamp and newly added cards. Keep `main`'s versions if already up to date.
4. **Validation Gate**:
   - Run `yarn checks && yarn typecheck` to verify 0 errors before committing.

#### Step 2: Porting from `main` to `offline`
When porting commits from `main` to `offline`:
1. **Deleted Files Handling (`git rm`)**:
   - If incoming commit modifies `src/components/Comments.tsx`, `src/hooks/CommentComponent/usePollForAIReply.ts`, or `src/components/CommunityPromptDetail.tsx`, stage their deletion with `git rm` (they must stay deleted on `offline`).
2. **Community Listing Placeholder**:
   - In `src/pages/community-prompts.tsx`, keep the offline `<OnlineOnlyNotice>` implementation.
3. **Local Community Prompt Detail**:
   - In `src/components/CommunityPromptPage.tsx`: keep offline breadcrumb links (`onlineCommunityUrl`), empty state back-to-home actions (`/`), and omit `Comments` / `LoginComponent`. Apply UX improvements (`error` vs `notFound`, `onRetry`).
4. **Offline User Status**:
   - In `src/components/user/UserStatus.tsx`: keep offline single-state UI (no login/logout modals or session clearing). Adopt responsive button improvements (`<span>` instead of `hideOnSmallScreen`, button label copy).
5. **Zero Remote Network Imports**:
   - Never import `src/api/client.ts`, `src/api/auth.ts`, `src/api/comments.ts`, or `src/api/config.ts`.
   - In `src/api/prompts.ts`, preserve `localStore` loading logic while keeping parameter signature parity (`_options?: { force?: boolean }`).
6. **Graceful Generator Fallback**:
   - `scripts/generate.mjs` checks file existence before executing scripts. Keep this intact so missing community/snapshot scripts do not fail builds.
7. **Validation Gate**:
   - Run `yarn checks && yarn typecheck` to confirm 0 errors.

---

## Common Commands

```bash
yarn start          # Dev server (default locale zh-Hans)
yarn dev            # Alias for start (has its own predev hook — do not add aliases without one)
yarn build          # Production build — all 18 locales, memory-safe (6×3 phased)
yarn typecheck      # Runs the generators + self-checks (clipboard, chunk reload, antd style wiring), then tsc
yarn gen:snapshot   # Fetch the real community snapshot (dev hooks only write an empty stub)
yarn gen:community  # Incremental fetch of the full community corpus into src/data/community/ (speed branch only)
yarn serve          # Serve built site locally
yarn clear          # Clear Docusaurus cache
```

**Generated artifacts are gitignored**: `src/css/antd.dark.css`, the generated prompt page shells
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
`node scripts/genPromptPages.mjs`. Two commands are the exception — `gen:snapshot` and
`gen:community` — because the dev hooks *deliberately* write only a stub / skip the network, so
those are the only way to get real community data locally.

There is no linter, formatter, or test framework configured. `yarn typecheck` is the primary
quality gate — it runs `tsc` **plus** the assert-based self-checks (the `checks` script:
`scripts/checkClipboardFallback.mjs` for the clipboard fallback chain,
`scripts/checkChunkReloadGuard.mjs` for the chunk-failure fallback,
`scripts/checkAntdStyleWiring.mjs` for the build-time antd style extraction; all three guard logic
whose failure mode is invisible to the compiler — add new ones to `checks`, which `pretypecheck`
invokes). CI runs it before building, because the Docusaurus
build strips types with swc and does **not** type-check: code with a TS error still builds with
exit code 0.

**When a contract can live in the type system, encode it there instead of writing a self-check.**
A check script that parses source is a last resort: it can both miss real breakages and block
legitimate rewrites, whereas an annotation is enforced by `yarn typecheck` on every machine and in CI
with no false positives. See `handleApiError`'s `: never` in `src/api/client.ts`.

## Architecture

### Framework Stack
- **Docusaurus 3.10.2** — static site generator with file-based routing under `src/pages/`
- **React 19** with Context API for state (no Redux/Zustand)
- **Ant Design 6** — primary UI library, **light + dark, both served from one static zero-runtime stylesheet** (`colorMode.defaultMode: "dark"`, `disableSwitch: false`). Tokens live in `src/theme/antdTokens.mjs`, shared by `src/theme/Root.tsx` (runtime `ConfigProvider`, adds `zeroRuntime`) and `scripts/genAntdCss.mjs` (build-time extraction, must **not** set `zeroRuntime` or it extracts an empty file). The extracted `src/css/antd.dark.css` is **not in git** — it is regenerated on prestart/predev/pretypecheck/prebuild/predeploy (all of which just call `scripts/generate.mjs`), fingerprinted by antd version + token hash + component-list hash + **the generator's own hash**. The antd-version half of that has a real incident behind it — a bump left buttons and hover on the old colours behind a green build. The generator hash closes the same hole for the assembly logic itself: change how blocks are composed without touching tokens or the component list, and the local file would otherwise stay on the previous output. CI is a fresh clone, so CI can never reproduce that class of bug for you. The `.dark` in the filename is historical — it now carries both themes.
  **Only the components actually used get extracted** (392 KB instead of 994 KB; `styles.css` gzip 131→~69 KB on every page × 18 locales). The `includes` list is **derived from `src`'s `import { … } from "antd"` at generation time, never hand-maintained** — a hand list drifts, and drift shows up as an unstyled component with a green build. That is also why the list's hash is in the fingerprint: without it the list updates but the CSS doesn't. Only usage that no import statement can reveal is hardcoded, in `IMPERATIVE_EXTRAS` — currently just `message` (20+ `App.useApp()` call sites, zero imports, and toasts never reach SSR so no product check can catch it). `notification` and `Select` are deliberately **not** there: their hazards need someone to write new code, and dev serves this same static CSS, so they fail visibly at authoring time rather than silently in production — see the comment block in the script before adding them back. A post-extraction assert fails the build if any required family is missing, so a change in `extractStyle`'s `includes` semantics can't degrade silently.
  **Why two themes cost almost nothing**: with `cssVar: {key}` the component rules only reference `var(--ant-*)`, so they are byte-identical across algorithms (1588 rules each, verified by string compare). Only the light *variable blocks* are appended, each scoped to its own class (`aishort` / `aishort-light`) — isolation by scope class, never by specificity competition. Switching themes just swaps that class on every antd element, injecting no styles, which is why `zeroRuntime` can stay on. Cost: raw +28 KB, brotli +2.1 KB.
  **Three token invariants, each with an invisible failure mode:**
  1. `antdThemeFor(mode)` layers universal / lightOnly / darkOnly. **Both sides must spell out `colorBg*` explicitly** — whichever side is left to the algorithm falls back to antd's own white/greys and stops matching the three-tier backgrounds in `custom.css`. That is how the light side first landed — pure-white buttons, Switch and Input on the warm paper page — and nothing catches it but actually switching themes and looking.
  2. The generator emits `html[data-theme="light"] .aishort…` next to every `.aishort-light…` block. SSR bakes the **dark** scope class into the HTML (151 elements on the homepage) because a static build cannot know the visitor's theme, while Docusaurus's pre-paint script has already set `data-theme` from localStorage. Drop that extra selector and light-mode visitors get dark components on a light page from first paint until hydration swaps the class (on the mobile Lighthouse profile that gap runs from FCP at 1.1 s to interactive at 6.2 s). It is a colour change, not a layout shift, so CLS reports 0 and Lighthouse (fresh profile ⇒ always the default theme) never sees it.
  3. The extractor also emits a React `useId`-scoped copy of every variable block (`.css-var-_R_jv_…`, 6 rules / 31.8 KB). Those ids are artefacts of the extraction render and match nothing at runtime, so they are pruned, guarded by an assert that no `css-var-` survives. Prune whole selectors only — a rule may list several and only some are orphans.
- **Axios** for API calls with JWT auth interceptors (online branches)

### Key Contexts
- **`AuthContext`** (`src/components/AuthContext.tsx`) — User auth state with Stale-While-Revalidate pattern: loads cached user from `lscache`, refreshes silently in background. Mounted **once** at `src/theme/Root.tsx` (not per-page) so SPA navigations don't re-trigger `/myspace`. `enrichMySpaceData` (in `src/utils/myspaceUtils.ts`) is the shared shape-builder used by `fetchUser`. Exposes `syncMySpaceState(patch)` — the **single entry point** for any client-side mutation to update `userAuth` state + `lscache-user_auth` + `lscache-myspace` in lockstep (used by useFavorite delta reconcile, MySpace drag/tag mutations). Adds `ensureAuthReady`-style waits in callers for the rare pending-window race. **`userAuthRef` is the single source of truth and React state is only its projection** — every write goes through `applyAuth`, so the two can't diverge. Read it with the exposed `getUserAuth()`, **never** with your own `const ref = useRef(userAuth); ref.current = userAuth` mirror: that's a render-time snapshot which `startTransition`-published updates lag behind, so computing items from it after `await refreshUserAuth()` writes stale data over fresh. Logout goes through `clearAuth()` (clears session caches + drops to logged-out; in-flight `/myspace` is voided by the token comparison in `fetchOnce`). There is deliberately **no public `setUserAuth`** — the raw setter bypasses the ref and is how the old race bugs got in; the three controlled channels are `clearAuth` / `syncMySpaceState` / internal `applyAuth`.
- **`ViewModeContext`** (`src/contexts/ViewModeContext.tsx`) — Toggles between "collection" (personal space) and "explore" (public browsing) modes

### API Layer (`src/api/`)
Modular barrel-exported API client against Strapi backend (online branches):
- `config.ts` — API base URLs (must not import other API modules to avoid circular deps)
- `client.ts` — Axios instance with auth token interceptors, 401 auto-logout
- `auth.ts`, `user.ts`, `prompts.ts`, `favorites.ts`, `myspace.ts`, `comments.ts` — Domain modules
- `homepage.ts` — Loads prompt cards from static JSON (not API), with 3-tier cache: Memory → lscache → Dynamic Import
- `localStore.ts` — Offline storage module used by the `offline` branch

**Mutation patterns** (decision tree by frequency):
- **High-frequency** (❤️ via `useFavorite`): `patchFavorites({loves:{add,remove}, commLoves:{add,remove}})` → delta `PATCH /favorites/me`. Server merges against current DB state, so concurrent multi-device edits don't lose entries. Response is intentionally delta-shaped (`{favoriteId, loves, commLoves, added}` — NOT `/myspace` shape), keeping payload proportional to ops not state. Flow: *optimistic update → PATCH → reconcile via `applyDeltaResponse`* — ops + `delta.added` are applied to local `items` (server's `updatedAt` replaces optimistic client time), then `syncMySpaceState` writes both lscache layers.
- **Low-frequency local state changes** (MySpace drag, tag manager save, item-tag toggle): API call + local manual sync via `syncMySpaceState`. **No GET /myspace round-trip** — we know what we sent and server doesn't reorder, so we mirror the change locally. Documented trade-off: cross-device drift until next cold load.
- **Complex/multi-entity mutations** (prompt CRUD via `useUserPrompt`, bulk import): API call + `refreshUserAuth()` for a full `/myspace` re-fetch. Justified because prompt operations have server-side lifecycle hooks that modify fields client can't predict.

Legacy `createFavorite`/`updateFavorite` (full-array PUT) have been **deleted** — every favorite
write now goes through `patchFavorites` (including bulk import). **Every new mutation should route
through `syncMySpaceState`** — never write `lscache-user_auth` or `lscache-myspace` directly from outside AuthContext.

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
  `<Empty>` / `<Result>` (fixed-palette cartoon illustrations that ignore the theme and end up the
  loudest thing on the page) and don't add another CSS-only variant — a parallel `.comments-empty`
  implementation already existed once and has been folded in.
- **Lazy 组件一律走 `src/utils/lazyRetry.ts`，不要裸用 `React.lazy`**：裸用时 chunk 抖一次
  就永久红框（React.lazy 缓存失败的 promise，root ErrorBoundary 的 "Try again" 不会重新发
  请求），且调用处都没有局部 error boundary —— 装饰性组件或广告没加载出来会把整页 crash 掉。
  两个入口按「缺了它页面还成不成立」选，且都套**可重置外壳**——chunk 层面的最终失败会
  丢弃 lazy 实例，下一次渲染（红框 "Try again"、用户再点一次按钮）换新实例真正重新请求：
  - `lazyWithRetry` — 页面主体功能（`PromptDetailModal`、`MySpace`、`LoginComponent`）。
    重试一次；仍是 chunk 失败先 `reloadOnce`（此时页面反正要被 root ErrorBoundary 整页替换，
    刷新还能自愈发版陈旧），刷新发起则挂起不闪红框，冷却内才抛红框。
  - `lazyOptional` — 装饰性组件（`AdComponent` 在 speed 分支、`ShareButtons`、emoji/Giphy 选择器）。
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
- `community-prompt.tsx` — Single community prompt page:
  - **On `speed` branch**: Dynamic `?id=` shell for search/direct navigation, plus default locale's
    `/community-prompt/<id>` static routes generated via `plugin-community-pages.js`. Handed over
    in shards of 16 (`promptShard`). Which ids get a static page is decided by `scripts/genCommunitySelection.mjs`
    (capped at ~1400 by host file limits; search traffic first, upvotes to fill).
  - **On `main` branch**: Pure dynamic CSR shell (`/community-prompt?id=...`). Does not use shards or
    static route generation plugin.
- `prompt/{id}.tsx` — one shell per (prompt × locale). **Not in git**: these shells (one per default-locale prompt, plus one per prompt in each i18n locale) are generated by `scripts/genPromptPages.mjs` from `src/data/cards/` on prestart/predev/pretypecheck/prebuild/predeploy, and are gitignored. Don't hand-edit them; change the template in that script. It fails the build if any locale is missing a card JSON or a `prompt_<locale>.json` (both would otherwise silently ship default-locale content under a localized URL), and prunes orphaned shells.
- `user/auth.tsx`, `user/index.tsx` — User account pages
- `feedback.tsx` — Feedback/comments page

## Conventions

- **Import paths** use `@site/src/...` (Docusaurus alias)
- **Code comments** are predominantly in Chinese (Simplified)
- **CSS approach** is a mix of CSS Modules (`*.module.css`), global CSS (`src/css/custom.css`), Ant Design theme tokens, and inline styles
- **Never hard-code a mode-specific colour in component CSS.** `rgba(255,255,255,…)` reads as "a hairline" in dark and as "invisible" in light; the same for `rgba(0,0,0,…)` the other way. Use the paired site tokens (`--site-color-hairline`, `--site-color-neutral-marker`, `--site-color-text-tertiary`, …), or `color-mix(in srgb, var(--ifm-color-content) N%, transparent)` when no token fits. Both mode blocks in `custom.css` must define every such token: `:root` now holds the **light** values, so anything the dark block forgets to override leaks light values onto a dark background.
- **Theme root** (`src/theme/Root.tsx`) wraps entire app with Ant Design `ConfigProvider`, switching between the two cssVar scopes (`aishort` / `aishort-light`). It reads `data-theme` through a `MutationObserver`, **not** `useColorMode()` — Root sits outside Docusaurus's `ColorModeProvider` and calling the hook there throws.
- **Config files** use ES module syntax; `plugin-gen-geo.js` is CommonJS
- Voting uses **optimistic UI** updates with rollback on error
- **Chunk 失败兜底的分工不变量**（`src/clientModules/chunkReload.js` + `src/utils/lazyRetry.ts`，
  由 `scripts/checkChunkReloadGuard.mjs` 自检守护）：整页刷新只发生在「页面已经/即将不可用」
  的两处——React 未挂载的首屏死壳，和主体 lazy 组件重试后仍 chunk 失败（ErrorBoundary 即将
  整页替换）。**其余已挂载场景一律不刷** —— Docusaurus 的
  hover 预载 / rel=prefetch 失败会冒到 window 但页面完全正常，扩大兜底范围会重新引入
  「鼠标扫过链接就把用户当前页面整页重载」的实测回归。路由切换的失败 Docusaurus 自己会 reload，不要重复处理

## CI/CD

**同名的 `main.yml` 在三个分支上职责不同**（同名文件按分支各自生效，改之前先确认当前分支）：

| 分支 | `main.yml` 行为 |
| :--- | :--- |
| `main` | 只跑 `yarn typecheck` + `yarn build`（CI 校验），**不部署**。workflow 名 `✅ CI: typecheck & build`。 |
| `speedup/data-retrieval` | 同上 + `JamesIves/github-pages-deploy-action` 推到 `gh-pages` 分支 —— **生产环境部署走这条**。 |
| `offline` | 没有 `main.yml`，只有 Docker 相关 workflow。 |

其它 workflow（都在 `main` 分支上）：
- `docker.yml` —— **推 `v*` tag 即自动构建**（早先是 `release: published`，得去 GitHub 点 Publish release 才触发；推 tag 本身什么都不触发）。一次跑两个 job：**在线镜像**（取 tag 指向的代码）+ **离线镜像**（取 `offline` 分支当前代码，`ref: offline` checkout）——离线镜像和在线镜像不是同一份代码，这是它不能只靠 tag 的原因。两个 job 并行，都推 Docker Hub + GHCR，多架构（amd64 + arm64）。
  - **Docker 标签取自 `package.json` 的 version，不是 git tag**：构建前先校验 tag 名与 package.json 版本一致，不一致直接中止（否则会静默覆盖已有标签）。
  - **预发布 tag（带 `-`）整条跳过**：version / major.minor / major / latest 四个标签会被预发布构建一起覆盖，正式版的 latest 就此指向预发布内容。
  - 离线分支版本落后于 tag 时**只发 warning 不拦**：真拦了会把一次发版卡在另一条分支的进度上。
  - **tag 触发用的是 tag 指向的那个 commit 上的 workflow 文件**：所以这次改动合进 main 之前打的 tag，走的仍是旧逻辑（推 tag 不触发、要发 Release 才触发）——不会出错，只是行为没变。反过来，`release` 事件用的是默认分支上的文件，两条触发不要同时开，否则同一个版本会构建两遍（多花 15–18 分钟，还会对同一批标签各推一遍）。
- `docker-offline.yml` —— 仅手动触发、且必须从 `offline` 分支触发（否则红字报错），推同一镜像仓库的 `offline` 标签。**保留作手动补建入口**（自动那条走 `docker.yml` 的第二个 job）。
- `IndexNow.yml` —— 定时把 18 份 sitemap 提交给 IndexNow。
- `dependabot-auto-approve.yml` —— 给 dependabot 的 PR 自动 approve。

**`rsync.yml` 是给 fork 用户的,不是死代码**:fork 会把整个 `.github/` 复制过去,`if: github.event.repository.fork` 让它只在 fork 里真跑——在上游仓库自己这里它永远 skipped,那是设计如此。删掉它 = 以后新建的 fork 再也没有自动同步。⚠️ 但 fork 里的定时任务默认是禁用的(GitHub 对公开仓库的 fork 就是这么设的),fork 用户得在 Actions 页点一次「Enable workflow」,或跑 `gh workflow enable rsync.yml`。

**它不能把上游 main 原样推下来**：`GITHUB_TOKEN` 永远不能创建/更新 `.github/workflows/` 下的文件(`workflows` 权限不在 GITHUB_TOKEN 的可授予清单里,仓库 Settings → Actions 里勾 "Read and write permissions" 也没用)。上游只要有提交碰了 workflow 文件,整次 push 就被拒(`refusing to allow a GitHub App to create or update workflow ... without workflows permission`),fork 的 main 卡住不动——**这是平台硬边界,换掉哪个 workflow 文件都没用,整次 push 一起拒**。GitHub 判的是**这次 push 的净差异**,不是逐个 commit(实测:先改 workflow 文件再 revert,净差异为零,推得上去),所以现在的做法是：
- **默认(只有 GITHUB_TOKEN)**:合并上游,但把 `.github/workflows/` 换回 fork 自己的版本 → 净差异里没有 workflow 文件,推得上去。代价: fork 的 workflow 停在最后一次手动同步的版本。
- **fork 配了 `FORK_SYNC_TOKEN`**(fine-grained PAT:Contents write + Workflows write):连 workflow 一起同步,行为和以前一样。
- 想更新 fork 的 workflow:去仓库首页点一次 [Sync fork](GitHub 自己的按钮有 workflow 权限),或在 fork 里配 `FORK_SYNC_TOKEN`。

**已删除**：`dependabot-auto-merge.yml`（条件里的 `'my-dependency'` 是模板占位符，**在所有仓库里都不成立**——上游和 fork 都一样,从未合并过任何 PR；而当时也没有 required checks，把它"修好"等于无人审直接上线。现在 main 有了分支保护，想让 fork 用户自动合并依赖的话应该**修好**而不是留着这个占位符）。**依赖升级的实际做法是手工提交**，dependabot PR 开出来后会关掉、提交同样的改动。

CI 的几条硬约束：
- **类型检查必须单独跑**：Docusaurus 用 swc 剥离类型，构建期不做类型检查（带 TS 错误 `yarn build` 仍以退出码 0 成功）。
- **`fetch-depth: 0` 不能省**：`showLastUpdateTime` 依赖 git 历史做 blame。Docker 构建走 `SKIP_GIT_INFO=true`，不需要 git（也因此能把 `.git` 排除出构建上下文）。
- **main 的合并闸门 = 分支保护 + PR 触发的 CI**：`main.yml` 里有 `pull_request` 触发，仓库对 `main` 开了保护，必需检查是 **`✅ Typecheck & Build`**（就是那个 job 的 `name`）。两条要一起成立才有效：
  - **改 job 的 `name` 会同时废掉闸门** —— 保护里记的是字符串，改名后 PR 会永远等一个不再出现的检查（GitHub 显示 "Expected — Waiting for status to be reported"）。改名必须同步改保护设置：`gh api -X PUT repos/rockbenben/ChatGPT-Shortcut/branches/main/protection --input <json>`。
  - **远端保护与 workflow 文件必须同时落地** —— 只开保护、不推 workflow，PR 会全部卡死（检查名对不上 / 压根没触发）。反过来也一样。
  - 保护是 `strict: true`（要跟 main 同步才能合）、**不强制 review、不强制 admin**（管理员仍可直接 push，依赖升级的手工提交习惯不受影响）。
- **speed / offline 分支没有分支保护，也没有 PR 触发的 CI**（按维护者的选择没同步）。生产部署走 speed 的 push 触发，闸门是那个 workflow 自己的 typecheck 步骤——typecheck 失败则 job 失败，后面的 deploy 步骤根本不会执行。
- **Actions 产物配额是账号级共用的**（不是每仓各算），给任何 workflow 加 `upload-artifact` 前先算总量，并一律设 `retention-days: 7`。
