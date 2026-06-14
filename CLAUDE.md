# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AiShort (ChatGPT Shortcut) is an AI prompt management platform built on **Docusaurus 3.10.1** with **React 19** and **Ant Design 6**. Users browse, search, create, and share AI prompts across 18 languages. The backend is a Strapi instance at `https://api.newzone.top/api`.

Live site: https://www.aishort.top

## Common Commands

```bash
yarn start          # Dev server (default locale zh-Hans)
yarn build          # Production build — all 18 locales, memory-safe (6×3 phased)
yarn typecheck      # TypeScript type checking (tsc)
yarn gen:antd-css   # Regenerate Ant Design dark theme static CSS
yarn clear          # Clear Docusaurus cache
yarn serve          # Serve built site locally
```

There is no linter, formatter, or test framework configured. Type checking via `yarn typecheck` is the primary code quality gate.

## Architecture

### Framework Stack
- **Docusaurus 3.10.1** — static site generator with file-based routing under `src/pages/`
- **React 19** with Context API for state (no Redux/Zustand)
- **Ant Design 6** — primary UI library, dark-mode only with zero-runtime CSS (`colorMode.disableSwitch: true`)
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

**In-flight dedup** (`src/utils/dedupe.ts`): both `getPromptData` (homepage cards loader) and `getPrompts` (commus/userprompts batch fetch) wrap their network paths with `dedupe(key, fn)` — concurrent calls for the same id set share a Promise instead of racing duplicate cache-validation + check-updates requests. Dedup key for `getPrompts`: `getPrompts_${safeType}_${sorted-ids}_${lang}`.

### Data Pipeline
`CodeUpdateHandler.py` (Python) is the build-time data transformer:
1. Reads master `src/data/prompt.json` (all languages)
2. Splits into per-language files (`prompt_{lang}.json`)
3. Generates per-ID per-language card JSONs in `src/data/cards/`
4. Generates default favorite/other card sets in `src/data/default/`
5. Generates `src/pages/prompt/{id}.tsx` pages and i18n variants
6. Uses OpenCC for Simplified → Traditional Chinese conversion

### Component Patterns
- **PromptCard** is polymorphic with variants: `DataCard`, `CommunityCard`, `FavoriteCard`, `UserCard` (all in `src/components/PromptCard/`)
- `React.lazy()` for code-splitting: `PromptDetailModal`, `ShareButtons`, `AdComponent`
- `React.memo()` on performance-sensitive components
- Custom hooks in `src/hooks/`: `useFavorite`, `useCopyToClipboard`, `useUserPrompt`, `useFilteredPrompts`

### i18n
- 18 locales, default `zh-Hans`. Configured in `docusaurus.config.js`
- Locales: en, zh-Hans, zh-Hant, ja, ko, es, pt, hi, ind, vi, th, fr, de, it, ru, ar (RTL), tr, bn
- UI strings: `@docusaurus/Translate` component and `translate()` function, stored in `i18n/{locale}/code.json`
- Prompt data: per-locale JSON files in `src/data/`

### Routing (file-based via `src/pages/`)
- `index.tsx` — Homepage with collection/explore views
- `community-prompts.tsx` — Paginated community prompt listing with voting
- `community-prompt.tsx` — Single community prompt page
- `prompt/{id}.tsx` — ~278 statically generated individual prompt pages
- `user/auth.tsx`, `user/index.tsx` — User account pages
- `feedback.tsx` — Feedback/comments page

## Conventions

- **Import paths** use `@site/src/...` (Docusaurus alias)
- **Code comments** are predominantly in Chinese (Simplified)
- **CSS approach** is a mix of CSS Modules (`*.module.css`), global CSS (`src/css/custom.css`), Ant Design theme tokens, and inline styles
- **Theme root** (`src/theme/Root.tsx`) wraps entire app with Ant Design `ConfigProvider` (theme key: "aishort")
- **Config files** use ES module syntax; `plugin-gen-geo.js` is CommonJS
- Voting uses **optimistic UI** updates with rollback on error

## CI/CD

Primary deployment workflow (`.github/workflows/main.yml`): triggers on push to `speedup/data-retrieval` branch, runs `yarn build` (memory-safe phased build), deploys to GitHub Pages via `gh-pages` branch. Uses Node 24 with yarn cache.
