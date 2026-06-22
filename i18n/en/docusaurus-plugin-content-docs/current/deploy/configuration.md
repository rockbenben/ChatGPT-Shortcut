---
sidebar_label: Configuration and Customization
title: AI Short Configuration and Customization | Edit Titles, Prompts, Custom Backend
description: Customize AI Short — change the site title and description, add homepage prompts, and connect a custom backend, including the API module structure and caching mechanism.
---

# Configuration and Customization

AI Short is open source — you can freely modify the site title, description, prompts, and more.

## Site title and description

Edit `docusaurus.config.js`.

## Docs and guides

Edit the corresponding files under `docs/`.

## Homepage prompts

The source data lives in `src/data/prompt.json` — an array where each object stores all language versions keyed by language code (`zh` / `en` / `ja`, etc.). The format for adding a prompt:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "website": null,
  "tags": ["music"],
  "id": 500,
  "weight": 1
}
```

After editing, run `python CodeUpdateHandler.py`. The script splits `prompt.json` into per-language `prompt_<locale>.json` files and updates each language's homepage and curated prompt pages.

![Data pipeline: the master prompt.json is processed by python CodeUpdateHandler.py — split by language into per-locale prompt files, generating each id's card JSON and detail page, with OpenCC Simplified-to-Traditional conversion](/img/docs/data-pipeline.svg)

> **Note**: set `id` to 500 or higher to avoid colliding with existing prompt or community IDs. Running `python CodeUpdateHandler.py` automatically generates the card data and a detail page for every prompt (including new ones), so there's no need to create any page file manually; custom prompts just won't have curated meta descriptions or comment data by default.

## Custom backend

By default the project connects to a shared backend (login, favorites, community, comments, and cross-device sync all depend on it), and `src/api` documents the full interface contract for reference. The backend service itself is not open-sourced; for a **fully self-hosted deployment with its own backend**, see [Choose a Deployment Model](../deploy#choose-a-deployment-model) above.

API module structure:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

Caching: API data is cached intelligently via `lscache` plus ETag — when the server returns 304 Not Modified, the local cache is reused to reduce data transfer.
