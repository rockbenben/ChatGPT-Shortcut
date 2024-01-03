# Browser Extension

AiShort (ChatGPT Shortcut) is a browser extension compatible with Chrome, Edge, Firefox, and other Chromium-based browsers. This extension not only offers the functionalities of the web version of ChatGPT Shortcut but also features unique elements like a sidebar and automatic window activation. It can automatically start with ChatGPT or custom pages and can also be manually activated using the `Alt+Shift+S` shortcut key. Below are the download channels:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

Additionally, we offer a Tampermonkey script — [**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), which allows users to customize matching domain names and use the AiShort sidebar on any website. However, due to script content injection limitations on ChatGPT pages, the sidebar function of the script is activated via a popup on ChatGPT pages.

## Language Options

ChatGPT Shortcut supports 13 mainstream languages, and the extension language will be automatically set according to your browser environment. The language of ChatGPT built-in page and sidebar in the extension will also follow this setting. Please note, to avoid triggering permission alerts of third-party websites, avoid directly changing the language in embedded pages.

![](https://img.newzone.top/2023-12-23-12-04-29.png?imageMogr2/format/webp)

## Display Settings

### AiShort Sidebar

After enabling the AiShort sidebar, you will see a green icon switch at the bottom right corner of the supported web pages. By clicking this icon, you can toggle the sidebar on or off. Currently, it defaults to support ChatGPT, Bard, Claude, and Wenxin Yiyan. If you choose to "Activate sidebar automatically," the sidebar will open automatically when you visit these supported sites.

![](https://img.newzone.top/2023-12-23-04-16-15.gif?imageMogr2/format/webp)

If you want to use the AiShort sidebar on other websites, please install the [ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere) script. Please note, to avoid overlapping functionalities and potential conflicts, the ChatGPT Shortcut Anywhere script will not be effective on websites natively supported by the extension.

### Built-in Homepage

After enabling the built-in homepage feature, a button for the built-in page will appear in the top left corner of the ChatGPT web version. Clicking it will replace the ChatGPT app interface with the AiShort page.

![](https://img.newzone.top/ai/2023-12-22-19-40-15.png?imageMogr2/format/webp)

## Separate Window Mode

When separate window mode is enabled, the extension interface will persistently appear in a separate window, facilitating multitasking. You can set websites for automatic activation in the extension settings. When the browser visits these sites, the AiShort window will automatically activate.

![](https://img.newzone.top/2023-12-23-12-07-09.png?imageMogr2/format/webp)

### Auto-Activation Websites

In the extension settings, you can specify which websites will automatically activate the AiShort separate window.

![](https://img.newzone.top/2023-12-23-12-09-51.png?imageMogr2/format/webp)

### Hotkey Activation

The `Alt+Shift+S` shortcut key can be used to directly activate the AiShort window, whether in popup mode or separate window mode.

## Usage Issues

### ChatGPT Embedded Page Limitations

ChatGPT imposes several access restrictions on its embedded extension pages, notably the lack of support for Google account authorization for login. This means that users must log in using their username and password.

If your account was initially created through Google authorization, you can use the "Forget Password" feature to set a new password. Doing so will ensure that you can successfully log in to the ChatGPT embedded page.

### Content Blockage Notice

After logging in with a username and password, you might occasionally encounter a notification stating "This content is blocked." In such instances, simply reloading the page is often sufficient to resolve the issue and revert the page back to its normal state post-login.

It's important to note that switching languages within the integrated ChatGPT page might also trigger the "This content is blocked" notice. Therefore, I recommend changing languages through the extension's settings rather than directly on the integrated page. This approach can help avoid unnecessary error messages.

## Firefox Settings

Settings in Firefox are relatively complex. Below are two main configuration steps:

### 1. Extension Pinning and Access Settings

First, select "Pin ChatGPT Shortcut Extension" in the Firefox toolbar, then enter the extension center. On the ChatGPT Shortcut extension item, select "Options" to enter the extension's settings interface. The specific steps are as shown in the following image:

![Firefox settings](https://img.newzone.top/2023-12-25-05-51-47.png?imageMogr2/format/webp)

### 2. Authorize Extension Operation

Secondly, to ensure the extension functions normally on websites like ChatGPT and Bard, you need to right-click the extension icon on these websites and select "Always allow on this site." This action grants the extension permission to modify content and add sidebars on designated websites.

![Firefox Extension Permission](https://img.newzone.top/2023-12-25-05-59-48.png?imageMogr2/format/webp)
