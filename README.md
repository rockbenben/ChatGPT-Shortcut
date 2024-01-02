<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    English | <a href="./README-zh.md">中文</a> |
<a href="./README-lang/README-es.md">Español</a> |
<a href="./README-lang/README-ja.md">日本語</a> |
<a href="./README-lang/README-ko.md">한국어</a> |
<a href="./README-lang/README-fr.md">Français</a> |
<a href="./README-lang/README-de.md">Deutsch</a> |
<a href="./README-lang/README-it.md">Italiano</a> |
<a href="./README-lang/README-ru.md">Русский</a> |
<a href="./README-lang/README-pt.md">Português</a> |
<a href="./README-lang/README-ar.md">العربية</a> |
<a href="./README-lang/README-hi.md">हिन्दी</a> |
<a href="./README-lang/README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>ChatGPT Shortcut, Maximize your Efficiency and Productivity</em>
</p>

## Why use AiShort?

AiShort provides a concise and easy-to-use list of AI instructions. Even without understanding of prompts, you can easily find the prompts suitable for various scenarios through filtering and searching, thus improving your productivity.

🚀 **One-click prompts**: With just one click, you can get a variety of prompts carefully selected by experts. Send them to AI language models like ChatGPT and you can get the expected output.

💻 **Boost productivity**: By using optimized prompts, you can get more accurate and practical feedback, thus effectively enhancing your work efficiency.

🌍 **Optimization for Non-English Languages**: We provide translations for English prompts in 12 major global languages, and support default responses in your mother tongue, which is convenient for non-English speakers to understand and use.

💾 **Save prompts**: Conveniently collect, edit, and manage your favorite prompts for future use.

🌐 **Share prompts**: Share your favorite prompts, collaborate with others, and inspire more ideas.

🗳️ **Community voting system**: Similar to Product Hunt or Reddit, the platform is community-driven. The best prompts will be pushed to the homepage.

📦 **Ready to use**: Just visit https://www.aishort.top/en/ to start using.

The source of AiShort prompts includes internet selections, community shares, and [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). We will regularly update to provide you with new prompts and inspiration. To understand how to use AiShort, please refer to [user manual](https://www.aishort.top/en/docs/guides/getting-started).

Welcome to join our Discord community to exchange ideas and feedback.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

## Browser Extension

AiShort (ChatGPT Shortcut) is a versatile extension compatible with Chrome, Edge, Firefox, and other Chromium-based browsers. This extension not only features the functionality of the web version of ChatGPT Shortcut but also adds unique features such as a sidebar and automatic window activation. The extension can automatically start with ChatGPT or custom pages and can also be manually activated using the shortcut `Alt+Shift+S`. Here are the download channels:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

In addition, we offer the Tampermonkey script - [**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), allowing users to customize matching domain names and use the AiShort sidebar on any website. However, due to script content injection restrictions on the ChatGPT page, the script's sidebar functionality is activated via a popup on the ChatGPT page.

## Deploy

### Deploy With Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

### Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build

# Update the `defaultLocale` in the `docusaurus.config.js` file,
# then perform a build for the desired language.
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
