---
sidebar_label: Offline Version (Corporate Intranet)
title: AI Short Offline Deployment | Corporate Intranet without External Server
description: AI Short offline version is designed for enterprises and teams without external network access. No backend server required, no registration needed, data stored locally in the browser, ready to use out of the box.
---

# Offline Deployment Version

**Applicable Scenarios**: Corporate intranets, government networks, classified environments, campus networks, and other scenarios where **external network access is unavailable or inconvenient**.

The AI Short offline version requires no backend server and no user registration. All data is stored locally in the browser. Once deployed, it can be used directly by teams on the intranet.

## Team Usage

The offline version is a purely static website. After deploying it to an intranet server, team members simply need to open the intranet address in their browser to use it:

1. **Administrator** deploys the offline version to an intranet server (e.g., `http://192.168.1.100:3000`)
2. **Team members** open the address in their browser to browse, search, and copy prompts
3. Each person's **favorites and custom prompts are saved in their own browser**, independent of each other
4. No registration required, no software installation needed, ready to use immediately

```
Intranet Server (offline version deployed)
   ├── Prompt library data (shared by all, from static JSON)
   │
   ├── User A's browser → localStorage (A's favorites and custom prompts)
   ├── User B's browser → localStorage (B's favorites and custom prompts)
   └── User C's browser → localStorage (C's favorites and custom prompts)
```

:::tip Note
The prompt library content (curated prompts) is static data packaged at build time, and all users see the same content. Each user's favorites, custom prompts, sorting, and tags are saved in their own browser's localStorage, completely independent of each other.
:::

## Differences from the Online Version

| Feature | Online Version | Offline Version |
| ---- | ------ | ------ |
| Prompt browsing/search/filtering | ✅ | ✅ |
| Prompt copying | ✅ | ✅ |
| Favorites management | Server storage | Browser local storage |
| Custom prompts | Server storage | Browser local storage |
| My Collection (drag-sort, tags) | ✅ | ✅ |
| Multi-language support (18 languages) | ✅ | ✅ |
| Data import/export | ✅ | ✅ (format compatible) |
| Prompt detail pages | ✅ | ✅ (static data, no comments) |
| User registration/login | ✅ | ❌ (no account needed) |
| Community prompt list/voting | ✅ | ❌ |
| Comment feedback | ✅ | ❌ |

## Data Storage

Each user's data is saved in their **own browser's** localStorage, independent of the server:

| Data | Storage Key | Description |
| ---- | ------ | ---- |
| Favorites list | `local_favorites` | Array of favorited prompt IDs |
| Custom prompts | `local_user_prompts` | User-created prompt data |
| Sort order | `local_myspace_order` | Card sorting in My Collection |
| Custom tags | `local_custom_tags` | Tag definitions and assignments |

:::caution Warning
- Browser local storage has an approximately 5MB capacity limit, which is more than sufficient for daily use.
- Clearing browser data will cause personal data loss. It is recommended to regularly back up via "Settings > Export Data".
- Data must be re-imported after switching computers or browsers.
:::

## Deployment

The offline version is based on the `offline` branch. Once an administrator completes the deployment, team members can use it without any additional steps.

### Docker Deployment (Recommended)

The simplest deployment method -- a single command to run on your intranet server:

```bash
# Use the pre-built offline image
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Or use Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

After deployment, team members can access `http://<server-IP>:3000` to start using it.

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

If you need to customize prompt content or modify configurations:

```bash
# Clone the offline branch
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Install dependencies
yarn

# Local development
yarn start

# Build single language version (Chinese)
yarn build --locale zh-Hans

# Build all languages
yarn build
```

The build output is in the `build/` directory and can be deployed to any static file server (Nginx, Apache, Caddy, etc.).

### Nginx Configuration Example

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

When deploying on platforms like Vercel or Cloudflare Pages, select the `offline` branch. All other steps are the same as the online version. See [Project Deployment](../deploy) for details.

## Data Import and Export

### Export

Go to "Settings > Export Data" to export your personal favorites and custom prompts as a JSON file.

### Import

The following JSON file formats are supported for import:

- **Files exported from the offline version**: Fully restores favorites, prompts, sorting, and tags
- **Files exported from the online version**: Automatically handled for compatibility
  - User prompts → Merged into local storage (deduplicated by title)
  - Curated favorites (card) → Merged into local favorites
  - Community favorites (community) → Automatically converted to local custom prompts
  - MySpace sorting → Restored to local storage
  - Custom tags → Appended and merged (does not overwrite existing ones)

### Migrating from the Online Version

1. Export data from the "My Account" page on the online version (aishort.top)
2. Import the JSON file on the "Settings" page of the offline version
3. Community favorites will be automatically converted to local prompts, and curated favorites will sync normally

## FAQ

### How does the team use it after deployment?

After the administrator deploys it to an intranet server, simply share the access URL (e.g., `http://192.168.1.100:3000`) with team members. Everyone opens it in their browser -- no installation, no registration needed.

### Will different users' data affect each other?

No. Each person's favorites and custom prompts are saved in their own browser's localStorage, completely independent. The server only hosts the shared prompt library (read-only).

### Can data be lost?

The following actions will cause personal data loss:

- Clearing browser data/cache
- Browsing in private/incognito mode
- Switching computers or browsers

It is recommended to regularly back up important data via "Settings > Export Data" as a JSON file.

### Can custom prompts be shared among team members?

Yes. One person exports the JSON file, and other members import it via "Settings > Import Data". Duplicates are automatically removed during import.

### How to update the prompt library?

The prompt library is static data packaged at build time. To update:

1. The administrator pulls the latest `offline` branch code
2. Rebuild and deploy (or pull the latest Docker image)
3. Team members refresh their browser page to see the new content (personal data is not affected)

### Is the offline version data format compatible with the online version?

Yes. The exported JSON format is the same and can be imported between the two versions. Prompt IDs differ between the two versions (the online version uses server IDs, the offline version uses timestamp IDs), but deduplication is done by title during import, so there are no conflicts.
