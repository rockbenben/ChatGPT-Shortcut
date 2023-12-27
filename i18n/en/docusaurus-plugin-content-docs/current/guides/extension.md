# Browser Extension

AiShort (ChatGPT Shortcut) is a versatile extension compatible with Chrome, Edge, Firefox, and other Chromium-based browsers. This extension not only features the functionality of the web version of ChatGPT but also adds unique features such as a sidebar and automatic window activation. The extension can automatically start with ChatGPT or custom pages and can also be manually activated using the shortcut `Alt+Shift+S`. Here are the download channels:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: Waiting
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

In addition, we offer the Tampermonkey script - [**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), allowing users to customize matching domain names and use the AiShort sidebar on any website. However, due to script content injection restrictions on the ChatGPT page, the script's sidebar functionality is activated via a popup on the ChatGPT page.

## Language Options

ChatGPT Shortcut supports 13 mainstream languages, and the extension language will be automatically set according to your browser environment. The language of the ChatGPT built-in page and sidebar in the extension will also follow this setting. Please note, to avoid triggering permission warnings on third-party websites, avoid directly changing languages in embedded pages.

## Display Settings

### AiShort Sidebar

When the AiShort sidebar is enabled, it will automatically activate when visiting specified web pages. You can also manually activate it through the green icon at the bottom right of the page. Currently, the sidebar is supported on ChatGPT, Bard, Claude, and Wenxin Yiyan pages.

If you wish to use the AiShort sidebar on other websites, please install the [ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere) script. Note that to avoid overlapping functionalities and potential conflicts, the ChatGPT Shortcut Anywhere script will not be effective on websites natively supported by the extension.

### Built-in Homepage

After enabling the built-in homepage feature, a button for the AiShort page will appear in the top left corner of the ChatGPT web version. Clicking on it will replace the ChatGPT application interface with the AiShort page.

## Independent Window Mode

When the independent window mode is enabled, the extension interface will be persistently displayed in a separate window, facilitating multitasking. You can set automatic activation websites in the extension settings, and the AiShort window will automatically activate when the browser visits these sites.

### Automatic Activation Websites

In the extension settings, you can specify which websites will automatically activate the AiShort independent window.

### Hotkey Activation

Use the `Alt+Shift+S` shortcut to directly activate the AiShort window, whether in popup or independent window mode.

## Login Issues

### ChatGPT Embedded Page Limitations

ChatGPT imposes several restrictions on embedded pages, including not supporting Google authorization login. Users can only log in using an account and password. If your account was created through Google authorization, you can set a password using the "Forgot Password" feature.

### Content Blocking Alert

After logging in with an account and password, the page may sometimes display a "This content is blocked" alert. In such cases, a simple page refresh usually solves the problem and returns to the normal logged-in state.

## Firefox Settings

The configuration for Firefox is relatively complex; here are two main steps:

### 1. Pin Extension and Access Settings

First, select "Pin ChatGPT Shortcut Extension" (Pin to Toolbar) in the Firefox toolbar, then enter the extension center and select "Options" on the ChatGPT Shortcut extension entry to enter the extension's settings interface. The specific steps are shown in the figure below:

![Firefox settings](https://img.newzone.top/2023-12-25-05-51-47.png?imageMogr2/format/webp)

### 2. Authorize Extension Operation

Secondly, to ensure the extension runs normally on sites like ChatGPT and Bard, right-click on the extension icon on these websites and choose "Always allow on ***." This action grants the extension permission to modify content and add sidebars on specified sites.

![Firefox Extension Permission](https://img.newzone.top/2023-12-25-05-59-48.png?imageMogr2/format/webp)
