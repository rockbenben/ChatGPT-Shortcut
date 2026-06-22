---
sidebar_label: 配置與自定義
title: AI Short 配置與自定義 | 修改標題、提示詞、自定義後端
description: 自定義 AI Short——修改網站標題與描述、新增主頁提示詞、對接自定義後端，含 API 模組結構與快取機制說明。
---

# 配置與自定義

AI Short 開源，可以自由修改網站標題、描述、提示詞等內容。

## 網站標題和描述

編輯 `docusaurus.config.js`。

## 使用說明和介紹

改 `docs/` 目錄下的對應檔案。

## 主頁提示詞

源資料在 `src/data/prompt.json`——一個陣列，每個物件按 `zh` / `en` / `ja` 等語言代碼鍵存放所有語言的版本。新增提示詞時格式如下：

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

編輯後執行 `python CodeUpdateHandler.py`，腳本會按預設規則拆分 `prompt.json` 生成各語言的 `prompt_<locale>.json`，並同步更新各語言的主頁面和精選提示詞頁面。

![資料流水線：主資料 prompt.json 經 python CodeUpdateHandler.py 按語言拆分，生成各語言的 prompt 檔案、各 id 的卡片 JSON 與詳情頁，並用 OpenCC 做簡繁轉換](/img/docs/zh/data-pipeline.svg)

> **注意**：建議將 `id` 設為 500 以上，避免與現有提示詞或社群內容的 ID 衝突。執行 `python CodeUpdateHandler.py` 會自動為每條提示詞（含新增的）生成卡片資料和詳情頁，無需手動建立頁面檔案；自訂提示詞預設沒有精選元描述和評論資料。

## 自定義後端

項目預設連接一個共享後端（登入、收藏、社群、評論、跨裝置同步等功能都依賴它），`src/api` 提供了完整的接口契約可供參考。後端服務本身並未開源；如需**帶後端的完整自部署**，參見[選擇部署形態](../deploy#選擇部署形態)。

API 模組結構：

```
src/api/
├── index.ts       # 統一導出入口
├── config.ts      # API URL 配置
├── client.ts      # Axios 客戶端（含認證攔截器）
├── auth.ts        # 認證 API（登入/註冊/OAuth）
├── prompts.ts     # 提示詞 CRUD + 搜尋 + 投票
├── favorites.ts   # 收藏操作
├── myspace.ts     # 我的空間資料（核心資料來源）
├── comments.ts    # 評論系統
└── user.ts        # 用戶資訊
```

快取機制：API 資料透過 `lscache` 結合 ETag 實現智慧快取——伺服器返回 304 Not Modified 時直接復用本地快取，減少資料傳輸。
