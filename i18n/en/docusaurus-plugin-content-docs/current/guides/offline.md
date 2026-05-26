---
sidebar_label: Offline Deployment
title: AI Short Offline Deployment | Self-Hosted for Corporate Intranets
description: The AI Short offline edition is built for enterprises and teams that can't reach the public internet. No backend server, no account required, data stays in the browser — deploy once and your team is ready to go.
---

# Offline Deployment

> **Audience**: IT administrators or technical leads responsible for deployment. End users just open the internal URL the admin provides — they don't need to read this page.

**When to use it**: corporate intranets, government networks, air-gapped or classified environments, regulated industries (HIPAA, SOC 2, FedRAMP, financial), campus networks, and any other setting where **public internet access is unavailable or restricted**.

No backend, no sign-up — all data lives in the browser. Once deployed, internal team members just open a browser and start using it.

## How Your Team Uses It

The offline edition is a pure static site. Deploy it to an internal server, and team members access it from their browsers over the internal network:

1. **The admin** deploys the offline edition to an internal server (e.g. `http://192.168.1.100:3000`)
2. **Team members** open that address in a browser to browse, search, and copy prompts
3. Each person's **collections and custom prompts live in their own browser** — fully isolated from each other
4. No accounts, no software to install, just open and use

```
Internal Server (offline edition deployed)
   ├── Prompt library data (shared by everyone, from static JSON)
   │
   ├── User A's browser → localStorage (A's collections and custom prompts)
   ├── User B's browser → localStorage (B's collections and custom prompts)
   └── User C's browser → localStorage (C's collections and custom prompts)
```

:::tip
The prompt library (curated prompts) is static data bundled at build time, so every user sees the same content. Each user's collections, custom prompts, ordering, and tags are kept in their own browser's localStorage, completely independent.
:::

## Differences vs. the Online Edition

| Feature | Online Edition | Offline Edition |
| ------- | -------------- | --------------- |
| Browse / search / filter prompts | Yes | Yes |
| Copy prompts | Yes | Yes |
| Collection management | Server-side storage | Browser local storage |
| Custom prompts | Server-side storage | Browser local storage |
| My Collection (drag sorting, tags) | Yes | Yes |
| Multi-language support (18 languages) | Yes | Yes |
| Data import / export | Yes | Yes (formats interchangeable) |
| Prompt detail pages | Yes | Yes (static data, no comments) |
| User registration / login | Yes | No (no accounts) |
| Community prompts list / voting | Yes | No |
| Comments and feedback | Yes | No |

## Data Storage

Each user's data is saved in **their own browser's** localStorage, independent of any server:

| Data | Storage Key | Description |
| ---- | ----------- | ----------- |
| Collection list | `local_favorites` | Array of collected prompt IDs |
| Custom prompts | `local_user_prompts` | User-created prompt data |
| Display order | `local_myspace_order` | Card order within My Collection |
| Custom tags | `local_custom_tags` | Tag definitions and assignments |

:::caution
- Browser local storage caps out around 5 MB, which is plenty for typical use.
- Clearing browser data will wipe a user's personal data — encourage regular backups via "Settings > Export Data".
- Switching computers or browsers requires re-importing the data.
:::

## Deployment

The offline edition lives on the `offline` branch. After a one-time deployment by the admin, team members can use it with no further action.

### Docker Deployment (Recommended)

The simplest option — a single command brings it up on any internal server:

```bash
# Use the prebuilt offline image
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Or pull from Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Once deployed, team members access it at `http://<server-ip>:3000`.

Using `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Build from Source

If you need to customize prompt content or change configuration:

```bash
# Clone the offline branch
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Install dependencies
yarn

# Local development
yarn start

# Build a single-language version (English)
yarn build --locale en

# Build all languages
yarn build
```

Build output goes to the `build/` directory and can be served by any static file server (Nginx, Apache, Caddy, etc.).

### Sample Nginx Configuration

```nginx
server {
    listen 3000;
    server_name _;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Platform Deployment

When deploying to Vercel, Cloudflare Pages, or similar platforms, just select the `offline` branch — every other step matches the online edition. See [Project Deployment](../deploy) for details.

## Data Import & Export

### Export

Go to "Settings > Export Data" to save your collections and custom prompts as a JSON file.

### Import

The following JSON formats are supported:

- **Files exported from the offline edition**: fully restores collections, prompts, ordering, and tags
- **Files exported from the online edition**: automatically converted for compatibility
  - User prompts → merged locally (deduped by title)
  - Curated collections (card) → merged into local collections
  - Community collections (community) → automatically converted to local custom prompts
  - MySpace ordering → restored locally
  - Custom tags → appended (existing tags are not overwritten)

### Migrating from the Online Edition

1. Export your data from the "My Account" page on the online edition (aishort.top)
2. Import that JSON file from the "Settings" page on the offline edition
3. Community collections are converted to local prompts automatically; curated collections sync as expected

## FAQ

### How does the team use it after deployment?

Once the admin has deployed it to an internal server, share the access URL (e.g. `http://192.168.1.100:3000`) with the team. Everyone opens it in a browser — no installs, no accounts.

### Will users' data interfere with each other?

No. Each person's collections and custom prompts live in their own browser's localStorage, completely isolated. The server only holds the shared prompt library (read-only).

### Can data be lost?

The following actions will erase a user's personal data:

- Clearing browser data or cache
- Using private / incognito browsing
- Switching to a different computer or browser

Recommend backing up important data regularly to a JSON file via "Settings > Export Data".

### Can custom prompts be shared across the team?

Yes. One person exports a JSON file, and others import it from "Settings > Import Data" — duplicates are handled automatically.

### How do I update the prompt library?

The prompt library is static data bundled at build time. To update it:

1. The admin pulls the latest code from the `offline` branch
2. Rebuild and redeploy (or pull the latest Docker image)
3. Team members just refresh the browser to see the new content — personal data is untouched

### Is the offline edition's data format compatible with the online edition?

Yes. The exported JSON format is the same and can be imported in either direction. The prompt IDs differ (the online edition uses server-side IDs while the offline edition uses timestamp IDs), but imports dedupe by title, so there's no conflict.
