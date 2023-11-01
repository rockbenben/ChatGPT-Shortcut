# Deploy

## Deploy With Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build
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

## Modification Information

AI Short is an open-source project, affording you the liberty to make alterations to the nomenclature and explication of the website.

- To amend the appellation of the page, please peruse the `docusaurus.config.js` document.
- For the modification of usage directives, navigate to the `docs` directory.
- To tailor the cues, you may find them within `src/data/prompt.json`. If you require alteration solely for a particular language, such as Chinese, direct your edits to `src/data/prompt_zh.json`.
- Presently, the user-end system is already integrated with a communal backend infrastructure. Should the need arise, you have the autonomy to establish your own backend, with pertinent interfaces located in the `src/api.js` file.

`CodeUpdateHandler.py` is the script designed for bulk processing of multilingual deployments. Upon completing your alterations, execute `python CodeUpdateHandler.py`. It will, in accordance with the prescribed rules, partition the `prompt.json` into diverse languages and synchronize the principal page code as well as individual page code for the selected cues in each language.
