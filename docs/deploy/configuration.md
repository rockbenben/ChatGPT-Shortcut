---
sidebar_label: 配置与自定义
title: AI Short 配置与自定义 | 修改标题、提示词、自定义后端
description: 自定义 AI Short——修改网站标题与描述、新增主页提示词、对接自定义后端，含 API 模块结构与缓存机制说明。
---

# 配置与自定义

AI Short 开源，可以自由修改网站标题、描述、提示词与后端等内容。

## 网站标题和描述

编辑 `docusaurus.config.js`。

## 使用说明和介绍

改 `docs/` 目录下的对应文件。

## 主页提示词

源数据在 `src/data/prompt.json`——一个数组，每个对象按 `zh` / `en` / `ja` 等语言代码键存放所有语言的版本。新增提示词时格式如下：

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
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

编辑后运行 `python CodeUpdateHandler.py`，脚本会按预设规则拆分 `prompt.json` 生成各语言的 `prompt_<locale>.json`，并同步更新各语言的主页面和精选提示词页面。

![数据流水线：主数据 prompt.json 经 python CodeUpdateHandler.py 按语言拆分，生成各语言的 prompt 文件、各 id 的卡片 JSON 与详情页，并用 OpenCC 做简繁转换](/img/docs/zh/data-pipeline.svg)

> **注意**：建议将 `id` 设为 500 以上，避免与现有提示词或社区内容的 ID 冲突。运行 `python CodeUpdateHandler.py` 会自动为每条提示词（含新增的）生成卡片数据和详情页，无需手动创建页面文件；自定义提示词默认没有精选元描述和评论数据。

## 自定义后端

项目默认连接一个共享后端（登录、收藏、社区、评论、跨设备同步等功能都依赖它），`src/api` 提供了完整的接口契约可供参考。后端服务本身并未开源；如需**带后端的完整自部署**，参见[选择部署形态](../deploy#选择部署形态)。

API 模块结构：

```
src/api/
├── index.ts       # 统一导出入口
├── config.ts      # API URL 配置
├── client.ts      # Axios 客户端（含认证拦截器）
├── auth.ts        # 认证 API（登录/注册/OAuth）
├── prompts.ts     # 提示词 CRUD + 搜索 + 投票
├── favorites.ts   # 收藏操作
├── myspace.ts     # 我的空间数据（核心数据源）
├── comments.ts    # 评论系统
└── user.ts        # 用户信息
```

缓存机制：API 数据通过 `lscache` 结合 ETag 实现智能缓存——服务器返回 304 Not Modified 时直接复用本地缓存，减少数据传输。
