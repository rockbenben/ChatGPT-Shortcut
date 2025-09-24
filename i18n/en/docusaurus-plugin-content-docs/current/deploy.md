---
sidebar_label: Deployment
title: Deployment & Customization Guide | Configure AI Short with Ease
description: Learn how to quickly deploy and customize your AI Short project. This guide covers Vercel, Cloudflare, Docker, and local deployment, plus how to edit content and enable auto-updates.
---

# Project Deployment

## Configuration & Customization

AI Short is an open-source project, and you can freely modify the site’s title, description, prompts, and more. Below are common customization options:

- **Edit site title and description**  
  Update the `docusaurus.config.js` file.

- **Edit usage instructions and docs**  
  All documentation files are located in the `docs` directory. Open and modify the relevant file as needed.

- **Edit homepage prompts**  
  Homepage prompts are stored in `src/data/prompt.json`.  
  For specific languages (e.g., Chinese), edit `src/data/prompt_zh.json`.  
  Example format for a new prompt:

  ```json
  {
    "zh": {
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

**Note**: Use `id >= 500` for new prompts. These will not have dedicated pages or comments.
If you want a dedicated page, copy a template file from `src/data/pages/prompt` and modify it.

- **Custom backend**
  The project is currently linked to a shared backend.
  To set up your own, check the API details in `src/api.js`.

- **Multi-language support**
  After updating language files, run the script `CodeUpdateHandler.py` to batch process:

  ```bash
  python CodeUpdateHandler.py
  ```

  This script will split `prompt.json` and sync updates to each language’s main and featured prompt pages.

## Deployment Guide

**System Requirements**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (including WSL), or Linux

### Local Deployment

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
# Install dependencies
yarn

# Local development
yarn start

# Build static files
yarn build

# Build for multiple locales
yarn build --locale zh
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn

# Example: build for two languages
yarn build --locale zh && yarn build --locale en
```

### Vercel Deployment

Click below to deploy ChatGPT-Shortcut to Vercel with one click:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Note**: The free Vercel plan may run out of memory. In that case, deploy a single language only.

Steps:

1. Go to your deployed Vercel project → **Settings**.
2. Under **Build & Deployment**, find **Build Command** → click **Override**.
3. Set the build command, e.g.:

   - For Chinese: `yarn build --locale zh`
   - For Portuguese: `yarn build --locale pt`

## Cloudflare Pages Deployment

👉 [Fork the repo](https://github.com/rockbenben/ChatGPT-Shortcut/fork), then deploy via Cloudflare Pages:

1. Log in to [Cloudflare Pages](https://pages.cloudflare.com/), choose **Create a project**.
2. Connect your forked repo.
3. Configure build settings:

   - **Build command**: `yarn build --locale zh` (or another language)
   - **Output directory**: `build`

4. Deploy and wait for build to finish.

Cloudflare Pages will automatically redeploy when you push new commits.

### Docker Deployment

Run with Docker:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Or with `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Enable Auto-Update

If you used the one-click Vercel deployment, you might see “updates available” often.
This is because Vercel creates a new repo instead of a fork, breaking sync.

**Fix:**

1. Delete the old repo.
2. Fork this project directly (use the fork button).
3. Re-deploy from your fork via [Vercel new project page](https://vercel.com/new).

### Automatic Updates

> If you see errors with **Upstream Sync**, run **Sync Fork** manually once.

After forking, GitHub requires you to enable workflows manually:

- Go to **Actions** in your fork
- Enable workflows, especially **Upstream Sync Action**.

This will run daily to pull upstream updates.

![Auto Update](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)
![Enable Workflow](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manual Updates

For immediate updates, check [GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) on syncing forks.

⭐ Star / 👀 Watch this project or follow the author to get notified about new features.
