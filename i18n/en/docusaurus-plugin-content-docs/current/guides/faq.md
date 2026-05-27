---
sidebar_label: FAQ
title: AI Short FAQ | Use, Optimize, Commercial Use & Privacy
description: Is AiShort free? Are prompts cross-model compatible? Can I use them commercially? This guide answers 13 common questions covering use, optimization, commercial use, and data privacy.
---

# FAQ

## Is AiShort an AI prompt generator?

No. AiShort is a **curated, hand-organized** library of prompt templates sorted by scenario — not a tool that uses an LLM to auto-generate prompts. Every prompt is hand-picked, tagged, and ready to copy-paste into any AI chat tool such as ChatGPT, Claude, Gemini, or DeepSeek. If you're looking for tools that "automatically generate a prompt from a requirement," PromptPerfect and ChatGPT prompt generators are a different category of product.

## Is AiShort free? Do I need an API Key?

Completely free, with **no API Key and no registration required**. Browsing, searching, and copying prompts don't need an account.

Logging in unlocks extra features — favorites with drag-and-drop sorting, custom tags, creating and managing private prompts, community sharing and voting, JSON data export, cross-device sync, and more — all still free. The code is fully open source on [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut).

Note: AiShort only provides prompts. **Whether the AI model itself charges you depends on the AI service you use** (e.g. ChatGPT free vs. paid tier, API billing, etc.).

## How many prompts? What scenarios are covered?

AiShort hosts **5000+ prompts in total**, organized into two libraries:

- **Curated library** — hand-picked, sorted by 25+ scenario tags, fully translated into 18 languages. Tags include: writing assistance, IT/programming, articles/reports, SEO/marketing, business functions, academia/teachers, education/students, language/translation, psychology/social, mindset training, productivity tools, terminal/interpreter, debate/speech, review/critique, science trivia, life encyclopedia, medical health, finance advisor, music/art, philosophy/religion, text/words, fun games, professional advisor, etc.
- **[Community library](./community)** — the vast majority, contributed continuously by users, sortable by popularity or recency with full-text search; covers a finer and broader range of scenarios than the curated library.

If you can't find a fit in the curated library, search the community library.

## Which AI models are supported? Are prompts cross-model compatible?

AiShort prompts are universal — they work in **any AI scenario where you input prompts**: not just chat pages, but also coding tools like Cursor, API calls, AI agents, etc. Here are the common chat-style models:

- International: ChatGPT, Gemini, Claude, Grok
- Mainland China: DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, ChatGLM, iFLYTEK Spark, Tencent Yuanbao
- API platforms: OpenRouter, SiliconFlow, Groq

See the full list at [Getting Started → Common AI Models](./getting-started#common-ai-models).

**Cross-model compatibility**: Most text-based prompts work across models — writing, translation, coding, and Q&A are general tasks where the same prompt produces solid results on all mainstream large language models, and every AiShort prompt is model-agnostic by default. But **results differ**: for writing, Claude often nails the nuance and ChatGPT-5 tends to follow instructions more tightly; for coding, GPT-5, Gemini Pro, and DeepSeek each have their strengths; for reasoning-heavy problems, Claude Opus, Gemini Deep Thinking, and the o-series are usually the most reliable. Image-generation prompts (Midjourney, Stable Diffusion, DALL·E) are **not** cross-compatible and need to be adjusted to each tool's syntax.

## Why are the prompts written in English?

Most large language models are trained predominantly on English, so English prompts tend to be interpreted more accurately and produce more consistent output across runs. Chinese prompts work too, but if you run the same Chinese prompt several times, the results can vary noticeably. For high-stakes scenarios, English is recommended.

> 💡 Want the reply in Chinese? Add `respond in Chinese` (or any target language) at the end of the prompt.

## Do I need to enter the prompt every time?

**API usage**: Set the prompt as the `system prompt` and it will apply automatically to subsequent turns.

**Web version**: As long as you don't switch conversations, ChatGPT will remember the current prompt. When replies start to drift, it means it has "forgotten" — just paste the prompt again.

**Tip**: Save frequently used conversations as browser bookmarks for quick access later.

## How do I pick the right prompt?

Work backwards from the output you want: for writing, use the [`write`](/?tags=write) or [`article`](/?tags=article) tags; for code, use [`code`](/?tags=code) or [`interpreter`](/?tags=interpreter); for translation, use [`language`](/?tags=language); for role-play, use [`games`](/?tags=games). When you're not familiar with the tags, just search by keyword. Each prompt card shows its popularity (copy count) — prompts that have been copied many times are usually more reliable.

## Why can't I find a related prompt?

Homepage search covers the **curated prompt library** (plus your personal prompts after logging in), but **does not include** community-shared prompts.

If short keywords don't return results on the homepage, search again on the [Community Prompts](./community) page — there's far more user-shared content there.

## What if the AI outputs false information?

AI sometimes "hallucinates", producing information that sounds plausible but is actually wrong. How to handle it:

1. **Verify key information**: Especially data, citations, and code
2. **Iterate**: Ask the AI to review and improve its own answer
3. **Cross-check**: Use different prompts or models to verify important conclusions

Better prompts can also reduce hallucinations.

## The prompt isn't working well — how do I tune it?

Don't swap out the prompt right away — try tuning it in these directions first:

1. **Make the `[placeholders]` more specific** — add style, length, domain, target audience, and other details
2. **Ask the AI to refine its answer**: For replies you're not happy with, follow up with "please make it more X" or "please rewrite this in Y style" — usually one or two rounds get you close to the target. You can also ask the AI to rate its own answer and improve it
3. **Switch models to compare**: The same prompt can perform very differently across Claude Sonnet, ChatGPT, Gemini, and DeepSeek — for writing, Claude is often more nuanced; for coding, GPT-5 and DeepSeek are usually more reliable
4. **Try the community**: [Community Prompts](./community) may have a better version — and feel free to share your own good prompts there
5. **Send us feedback**: Found a problem or have a suggestion? Let us know via [Feedback](/feedback)

## How do I back up my prompts?

1. Go to "My Account" and find the "Data Management → Export Prompts" section
2. Click the "Export Data" button
3. The system will generate a JSON file and download it automatically

Backing up regularly is recommended to prevent data loss.

## Can I use AiShort prompts in commercial projects?

Yes, but it depends on the license:

1. Content from [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) is under the **CC0 public domain**, with no restrictions
2. AiShort's own content and community submissions are licensed by default under **CC BY-SA 4.0** — commercial use, redistribution, and adaptation are all allowed, as long as you keep the AiShort / original author attribution and release derivatives under the same open license
3. **The AI-generated content you produce with a prompt** is governed by the terms of the AI provider you use (OpenAI, Anthropic, Google, etc.); in most cases it belongs to you
4. The very few prompts that are explicitly marked "personal use only" in the card description are the exception

## Does copying a prompt leak my data?

No. AiShort's prompts are bundled into the site as static JSON, and **the copy action itself happens locally in your browser clipboard**.

The **specifics you fill into the `[placeholders]` and the AI's replies** are transmitted directly between you and your chosen AI platform (ChatGPT, Claude, Gemini, DeepSeek, etc.) — AiShort doesn't see them.

One clarification: when you copy, the site sends an **anonymous count event** to the backend (POST `/cards/<id>/copy`) purely for tracking each prompt's popularity (the "copy count" shown on cards). **It only sends the card ID — no placeholder content, no personal information, and no user-identity association.**

**Once you're logged in**, your favorites list, custom prompts, and community submissions are synced to the backend for cross-device sync. You can export everything as JSON anytime, or delete all your data with one click.

## Related Documentation

- [Getting Started](./getting-started) - Basic usage
- [My Collection](./my-collection) - Collection and tag management
- [Community Prompts](./community) - Discover and share
