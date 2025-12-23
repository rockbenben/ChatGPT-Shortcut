---
sidebar_label: Deployment
title: Deploy AI Short | Vercel, Docker & Cloudflare Setup
description: Want to host your own AI prompt library? Deploy AI Short easily using Vercel, Docker, or Cloudflare. Includes config tips and auto-update scripts.
---

# Project Deployment

## Configuration and Customization

AI Short is an open-source project that allows you to freely modify the website title, description, prompts, and other content according to your needs. Below are common modification options and operation instructions:

- **Modify Website Title and Description**
  To change the website's title and description information, please edit the `docusaurus.config.js` configuration file.

- **Modify Project Usage Instructions and Introduction**
  The project's usage instructions and introduction files are located in the `docs` directory. Open the relevant files in that directory to make necessary modifications.

- **Modify Homepage Prompts**
  Homepage prompts are stored in the `src/data/prompt.json` file. If you need to modify prompts for a specific language, such as Chinese, you can directly edit the `src/data/prompt_zh.json` file. When adding a new prompt, the format is as follows:

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

  **Note**: It is recommended to set the `id` to 500 or above. Newly added prompts will not have an exclusive page or comment section. If you need to add an exclusive page for a prompt, you can copy the template file in the `src/data/pages/prompt` directory for modification.

- **Custom Backend**
  The current project is connected to a shared backend system. If you wish to build your own backend, you can refer to the interface instructions in the `src/api` folder.

  API Module Structure:

  ```
  src/api/
  ├── index.ts       # Unified export entry
  ├── config.ts      # API URL configuration
  ├── client.ts      # Axios client (including auth interceptors)
  ├── auth.ts        # Auth API (Login/Register/OAuth)
  ├── prompts.ts     # Prompt CRUD + Search + Voting
  ├── favorites.ts   # Favorites operations
  ├── myspace.ts     # My Space data (Core data source)
  ├── comments.ts    # Comment system
  └── user.ts        # User information
  ```

  **Caching Mechanism**: The project uses `lscache` combined with ETags to implement smart caching. When the server returns 304 Not Modified, local cached data is reused directly to reduce data transmission.

- **Multi-language Support and Deployment**
  After completing multi-language modifications, you can use the `CodeUpdateHandler.py` script for batch processing. Run the following command:

  ```bash
  python CodeUpdateHandler.py
  ```

  This script will split the `prompt.json` file according to preset rules and synchronously update the homepage and featured prompt pages for each language version.

## Deployment Instructions

System Requirements:

- [Node.js 20.0](https://nodejs.org/) or later.
- macOS, Windows (including WSL), and Linux are supported.

### Local Deployment

Ensure you have installed [Node.js](https://nodejs.org/).

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build

# Update the `defaultLocale` in the `docusaurus.config.js` file, then perform a build for the desired language.
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

# Deploy for multiple languages
yarn build --locale zh && yarn build --locale en
```

### Vercel Deployment

Click the button below to one-click deploy ChatGPT-Shortcut to the Vercel platform:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Note**: The free version of Vercel may report an error due to insufficient memory. If you encounter this situation, you can choose to perform single-language deployment. Specific operations are as follows:

1. Enter the Vercel project you just deployed and open **Settings**.
2. In the **Build & Deployment** section, find **Build Command**, then click **Override** to the right.
3. Modify the deployment command. For example, if you need to deploy the Chinese version, you can use `yarn build --locale zh`; if you need to deploy the Portuguese version, use `yarn build --locale pt`.

### Cloudflare Pages Deployment

Click the button or link below to Fork this project, then follow the instructions to deploy on Cloudflare Pages:

👉 [Fork this project](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Deployment Steps:

1. Log in to [Cloudflare Pages](https://pages.cloudflare.com/) and select **"Create a project"**.
2. Bind the repository you just Forked.
3. Configure build commands:
   - **Build command**: `yarn build --locale zh` (Choose the appropriate locale based on the language to be deployed, e.g., for Portuguese use `yarn build --locale pt`).
   - **Output directory**: `build`.
4. Click **Deploy** and wait for Cloudflare Pages to complete the build and deployment.

Cloudflare Pages will also automatically trigger builds and deployments every time you push new code.

### Docker Deployment

If you are familiar with Docker, you can quickly deploy using the following command:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternatively, you can also use `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Enable Sync Updates

If you deployed your own project on Vercel with one click, you might encounter an issue where it always prompts that updates are available. This is because Vercel creates a new project for you by default instead of forking this project, causing update detection to fail. It is recommended to redeploy following these steps:

1. Delete the original repository;
2. Use the fork button in the top right corner of the page to fork this project;
3. Reselect the project you just forked in the Import Git Repository section of the [Vercel New Project Page](https://vercel.com/new) and deploy.

### Enable Auto Updates

> If you encounter an Upstream Sync execution error, please manually execute Sync Fork once!

After fetching the project, due to GitHub limitations, you need to manually enable Workflows in the Actions page of your forked project and enable the Upstream Sync Action. Once enabled, updates will be executed automatically every day:

![Auto Update](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enable Auto Update](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manual Code Update

If you want to update immediately manually, you can view [GitHub's documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to learn how to sync a forked project with upstream code.

You can give this project a star/watch, or follow the author to get notifications of new feature updates in time.
