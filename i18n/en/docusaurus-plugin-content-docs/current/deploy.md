# Deploy

## Configuration and Customization

AI Short is an open-source project that you can customize based on your needs. Below are common customization options and instructions:

- **Change Website Title and Description**  
  To update the website's title and description, edit the `docusaurus.config.js` configuration file.

- **Modify Usage Instructions and Introduction**  
  The project’s usage instructions and introduction can be found in the `docs` directory. Open the relevant files and make the necessary changes.

- **Change Homepage Prompts**  
  Homepage prompts are stored in the `src/data/prompt.json` file. To modify prompts in specific languages, such as English, edit the `src/data/prompt_en.json` file directly. To add a new prompt, use the following format:

  ```json
  {
    "en": {
      "title": "custom prompt",
      "prompt": "custom prompt",
      "description": "custom description",
      "remark": "custom mark"
    },
    "website": null,
    "tags": [
      "music"
    ],
    "id": 500, 
    "weight": 1
  }
  ```

  **Note**: It's recommended to set the `id` to 500 or higher. New prompts won’t have dedicated pages or comment sections. If you want a dedicated page for a prompt, you can copy the template files from `src/data/pages/prompt` and modify them.

- **Customize Backend**  
  The project is currently connected to a shared backend system. If you wish to set up your own backend, refer to the API documentation in the `src/api.js` file.

- **Multilingual Support and Deployment**  
  After updating the language files, you can use the `CodeUpdateHandler.py` script for batch processing. Run the following command:

  ```bash
  python CodeUpdateHandler.py
  ```

  This script will split the `prompt.json` file based on predefined rules and update the homepage and featured prompts pages for all language versions.

## Deployment

### Deploy With Vercel

Click the button below to deploy ChatGPT-Shortcut to the Vercel platform with one click:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

With Vercel, you can quickly host your project and automatically handle builds and deployments, which is suitable for users who do not have complex server configuration requirements.

### Local Deployment

Make sure you have installed [Node.js](https://nodejs.org/).

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

### Docker Deployment

If you are familiar with Docker, you can quickly deploy with the following command:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternatively, you can use `docker-compose`:

```yml
version: "3.8"

services:
  docsify:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Synchronized Updates

If you have deployed your own project on Vercel with a single click, you might encounter an issue where updates are consistently indicated. This arises from Vercel's default behavior of creating a new project for you instead of forking the current project, thereby impeding proper update detection. It is recommended to follow the subsequent steps for re-deployment:

1. Remove the previous repository.
2. Utilize the "fork" button located in the upper right corner of the page to fork the current project.
3. On the [Vercel New Project page](https://vercel.com/new), select the recently forked project from the Import Git Repository section and proceed with deployment.

### Automatic Updates

> In the event of encountering an error during the execution of Upstream Sync, manually perform a single Sync Fork.

Once you have forked the project, due to GitHub restrictions, it is necessary to manually enable Workflows on the Actions page of your forked project and activate the Upstream Sync Action. Upon activation, updates will be automatically executed on a daily basis.

![Automatic Updates](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enabling Automatic Updates](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manual Updates

If you wish to manually update immediately, you can refer to [GitHub's documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to learn how to synchronize the forked project with the upstream code.

Feel free to show support for this project by giving it a star/follow, or by following the author, to stay informed about timely notifications regarding new feature updates.
