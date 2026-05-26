---
sidebar_label: FAQ
title: AI Short FAQ | Prompt Optimization & Fixing AI Hallucinations
description: Prompts not working as expected? AI making things up? This guide answers common questions and shows you how to optimize prompts, avoid hallucinations, and back up your data.
---

# FAQ

## Is AiShort free?

The AiShort web app is **completely free** — browsing, copying, and searching for prompts is free, and you don't even need to register. The advanced features available after logging in (collections, custom prompts, community sharing) are also free.

Note: AiShort only provides prompts. **Whether the AI model itself charges you depends on the AI service you use** (e.g. ChatGPT free vs. paid tier, API billing, etc.).

## Which AI models are supported?

AiShort prompts are universal — they work in **any AI scenario where you input prompts**: not just chat pages, but also coding tools like Cursor, API calls, AI agents, etc. Here are the common chat-style models:

- International: ChatGPT, Gemini, Claude, Grok
- Mainland China: DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, ChatGLM, iFLYTEK Spark, Tencent Yuanbao
- API platforms: OpenRouter, SiliconFlow, Groq

See the full list at [Getting Started → Common AI Models](./getting-started#common-ai-models).

## Why are the prompts written in English?

Most large language models are trained predominantly on English, so English prompts tend to be interpreted more accurately and produce more consistent output across runs. Writing the instructions in English also makes a single prompt reusable across languages — you can ask for the reply in any language you want without rewriting the prompt itself.

> 💡 Want the reply in a different language? Add a line like `respond in Spanish` (or any target language) at the end of the prompt.

## Do I need to enter the prompt every time?

**API usage**: Set the prompt as the `system prompt` and it will apply automatically to subsequent turns.

**Web version**: As long as you don't switch conversations, ChatGPT will remember the current prompt. When replies start to drift, it means it has "forgotten" — just paste the prompt again.

**Tip**: Save frequently used conversations as browser bookmarks for quick access later.

## Why can't I find a related prompt?

Homepage search covers the **curated prompt library** (plus your personal prompts after logging in), but **does not include** community-shared prompts.

If short keywords don't return results on the homepage, search again on the [Community Prompts](./community) page — there's far more user-shared content there.

## What if the AI outputs false information?

AI sometimes "hallucinates", producing information that sounds plausible but is actually wrong. How to handle it:

1. **Verify key information**: Especially data, citations, and code
2. **Iterate**: Ask the AI to review and improve its own answer
3. **Cross-check**: Use different prompts or models to verify important conclusions

Better prompts can also reduce hallucinations.

## How do I back up my prompts?

1. Go to "My Account" and find the "Data Management → Export Prompts" section
2. Click the "Export Data" button
3. The system will generate a JSON file and download it automatically

Backing up regularly is recommended to prevent data loss.

## The prompt isn't working well?

1. **Ask the AI to refine**: Have the AI rate and improve its own answer
2. **Rephrase**: Try a different prompt expressing the same need
3. **Try the community**: [Community Prompts](./community) may have a better version — and feel free to share your own good prompts there
4. **Send us feedback**: Found a problem or have a suggestion? Let us know via [Feedback](/feedback)

## Related Documentation

- [Getting Started](./getting-started) - Basic usage
- [My Collection](./my-collection) - Collection and tag management
- [Community Prompts](./community) - Discover and share
