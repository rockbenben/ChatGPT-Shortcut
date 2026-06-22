---
sidebar_label: Deployment
title: Deploy AI Short | Vercel, Docker & Cloudflare Setup
description: Want to host your own AI prompt library? Deploy AI Short easily using Vercel, Docker, or Cloudflare. Includes config tips and auto-update scripts.
---

# Project Deployment

> **Who this is for**: developers who want to self-host or customize AiShort. Regular users can just use [aishort.top](https://www.aishort.top) — no need to read this.

## Choose a Deployment Model

Pick the model that fits your needs:

| Model                       | Backend                            | Notes                                                                                          |
| --------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Standard** (default)      | Reuses the official shared backend | After forking you can customize the site name, description, prompts, etc. (see [Configuration](./deploy/configuration)); login, favorites, community, and sync work out of the box |
| **Offline Edition**         | No backend, data stored locally in the browser | Air-gapped enterprise or government networks; no account needed                                |
| **Fully self-hosted backend** | Your own independent backend     | When you need an independent account system, full data ownership, and a private community      |

The first two are covered in this guide. For the third, since the backend service isn't open-sourced, please [email the developer](mailto:qingwhat@gmail.com) with a short note about your use case and scale to get a deployment plan and support.

## Deployment Docs

The deployment flow is split into the pages below — read whichever ones you need:

- **[Standard Deployment](./deploy/standard)** — reuses the official shared backend, with local build, Vercel, Cloudflare Pages, and Docker as the four supported methods.
- **[Offline Edition](./deploy/offline)** — an offline solution for air-gapped environments such as enterprise or government intranets, with no backend and no account required.
- **[Configuration and Customization](./deploy/configuration)** — change the site title, description, and prompts, and connect a custom backend.
- **[Keeping Your Fork in Sync](./deploy/sync-updates)** — keep your fork following upstream automatically so it doesn't fall behind on features.
