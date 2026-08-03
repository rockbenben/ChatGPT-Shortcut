---
sidebar_label: Firefox 插件设置
title: AI Short Firefox 设置 | 原生侧边栏与快捷键
description: Firefox 版 AI Short 设置指南：自 v4.4.0 起与 Chrome 对齐，原生侧边栏免逐站授权，Alt+Shift+D 开关侧边栏。
---

# Firefox 插件设置

Firefox 版自 v4.4.0 起与 Chrome 版对齐：同样是**侧边栏、弹窗、独立窗口**三种显示模式，提示词库随扩展本地打包。

扩展只申请 `storage` 权限，不读取也不修改你访问的网页，因此**不需要**再逐个网站授权。

> 旧版（v4.3 及以前）靠内容脚本把侧边栏注入 ChatGPT 页面，装完得右键图标选「始终允许在此网站上运行」。新版已移除该机制，升级后可忽略这一步。

## 快捷键

- `Alt + Shift + S`：按当前显示模式打开扩展
- `Alt + Shift + D`：开关 Firefox 原生侧边栏

在 `about:addons` → 右上角齿轮 → 「管理扩展快捷键」中可自定义。

## 设置界面

在 Firefox 工具栏上把 AI Short 固定出来（Pin to Toolbar），再从扩展中心进入 AI Short 的「选项」（Options），即可切换语言、显示模式与深色模式。

各项设置的含义见[插件使用教程](./usage)。
