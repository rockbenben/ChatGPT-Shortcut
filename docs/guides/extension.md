# 浏览器扩展

AiShort（ChatGPT Shortcut）扩展兼容 Chrome、Edge、Firefox 及其他基于 Chromium 的浏览器。这款扩展不仅具备网页版 ChatGPT Shortcut 的功能，还增添了如侧边栏和自动激活窗口等独特特性。该扩展能够随 ChatGPT 或自定义页面自动启动，同时支持通过 `Alt+Shift+S` 快捷键手动激活。以下为下载渠道：

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)
- **国内下载**: [蓝奏云](https://wwva.lanzouq.com/b01lsc9vi),密码:1qow

此外，我们还提供了油猴脚本——[**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)，该脚本允许用户自定义匹配域名，在任意网站上使用 AiShort 侧边栏。但需注意，由于 ChatGPT 页面的脚本内容注入限制，脚本的侧边栏功能在 ChatGPT 页面上是通过弹窗来激活的。

## 语言选项

ChatGPT Shortcut 支持 13 种主流语言，扩展语言将根据你的浏览器环境自动设置。扩展中的 ChatGPT 内建页面和侧边栏语言也会跟随这一设置。请注意，为避免触发第三方网站的权限警示，避免在内嵌页面中直接更换语言。

![](https://img.newzone.top/2023-12-23-12-04-29.png?imageMogr2/format/webp)

## 显示设置

### AiShort 侧边栏

启用 AiShort 侧边栏后，你会在支持网页的右下角看到一个绿色图标开关。点击此图标，便可开启或关闭侧边栏。目前默认支持 ChatGPT、Bard、Claude 和文心一言。若选择“自动激活侧边栏”，则在访问这些支持的网站时，侧边栏会自动打开。

![](https://img.newzone.top/2023-12-23-04-16-15.gif?imageMogr2/format/webp)

如果你想在其他网站上使用 AiShort 侧边栏，请安装 [ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere) 脚本。请注意，为避免功能重叠和潜在的冲突，ChatGPT Shortcut Anywhere 脚本在扩展默认支持的网站上不会生效。

### 内置主页

启用内置主页功能后，ChatGPT 网页版左上角将出现一个内置主页按钮。点击后，AiShort 页面将替代 ChatGPT 应用界面。

![](https://img.newzone.top/ai/2023-12-22-19-40-15.png?imageMogr2/format/webp)

## 独立窗口模式

启用独立窗口模式后，扩展界面将以独立窗口形式持久显示，便于多任务操作。你可以在扩展设置中设置自动激活网站，当浏览器访问这些网站时，AiShort 窗口将自动激活。

![](https://img.newzone.top/2023-12-23-12-07-09.png?imageMogr2/format/webp)

### 自动激活网站

在扩展设置中，你可以指定哪些网站会自动激活 AiShort 独立窗口。

![](https://img.newzone.top/2023-12-23-12-09-51.png?imageMogr2/format/webp)

### 热键激活

使用 `Alt+Shift+S` 快捷键可以直接激活 AiShort 窗口，无论是弹窗模式还是独立窗口模式。

## 使用问题

### ChatGPT 页面限制

ChatGPT 对扩展嵌入的页面设置了多项权限限制，特别是不支持使用 Google 授权进行登录。这意味着用户必须使用账号和密码进行登录。

如果你的账户最初是通过 Google 授权创建的，你可以利用「忘记密码」功能设置新的密码。这样做将确保您能够在 ChatGPT 的嵌入页面中顺利登录。

### 内容屏蔽提示

使用帐号密码登录后，页面有时可能会出现「该内容被屏蔽了」的提示。遇到这种情况时，通常只需简单刷新页面，就可以解决问题，页面将恢复到正常的登录状态。此外，一旦登录成功，除非您主动登出，否则登录状态通常会保持较长时间，因此不必过于担心此类提示频繁出现。

需要注意的是，在 ChatGPT 的集成页面内切换语言时，可能也会触发「该内容被屏蔽了」的提示。因此，建议你通过扩展的设置项来进行语言切换，而不是直接在集成页面内操作。这样可以避免不必要的错误提示。

## Firefox 设置

Firefox 浏览器的设置相对复杂，以下是两个主要的配置步骤：

### 1. 固定扩展与访问设置

首先，在 Firefox 工具栏上选择“固定 ChatGPT Shortcut 扩展”（Pin to Toolbar），然后进入扩展中心，在 ChatGPT Shortcut 扩展条目上选择“选项”（Options），进入扩展的设置界面。具体步骤如下图所示：

![Firefox settings](https://img.newzone.top/2023-12-25-05-51-47.png?imageMogr2/format/webp)

### 2. 授权扩展运行

其次，为确保扩展在 ChatGPT、Bard 等网站上正常运行，您需要在这些网站上右键点击扩展图标，选择“始终允许在此网站上运行”（Always allow on ***）。此操作授予扩展在指定网站上修改内容和添加侧边栏的权限。

![Firefox Extension Permission](https://img.newzone.top/2023-12-25-05-59-48.png?imageMogr2/format/webp)
