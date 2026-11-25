import React from "react";

const PLACEHOLDER_SPLIT_RE = /(\[[^\[\]\n]{1,60}\](?!\())/g;
const PLACEHOLDER_EXACT_RE = /^\[([^\[\]\n]{1,60})\]$/;
const NUMERIC_FOOTNOTE_RE = /^\[\d+\]$/;

function parsePlaceholderKey(part: string): string | null {
  if (NUMERIC_FOOTNOTE_RE.test(part)) return null;
  const match = PLACEHOLDER_EXACT_RE.exec(part);
  return match ? match[1] : null;
}

/**
 * 提取提示词中所有唯一占位符名称（按首次出现顺序），跳过 Markdown 链接与纯数字脚注。
 */
export function extractPlaceholders(text: string): string[] {
  if (!text) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  const parts = text.split(PLACEHOLDER_SPLIT_RE);
  for (const part of parts) {
    const key = parsePlaceholderKey(part);
    if (key && !seen.has(key)) {
      seen.add(key);
      result.push(key);
    }
  }
  return result;
}

export function getPlaceholderValue(values: Record<string, string> | undefined, key: string): string | undefined {
  return values && Object.hasOwn(values, key) ? values[key] : undefined;
}

/**
 * 将占位符替换为已填写的值；未填写或仅空白的占位符保留原 `[key]`。
 */
export function applyPlaceholders(text: string, values?: Record<string, string>): string {
  if (!text || !values) return text;
  const parts = text.split(PLACEHOLDER_SPLIT_RE);
  return parts
    .map((part) => {
      const key = parsePlaceholderKey(part);
      if (!key) return part;
      return getPlaceholderValue(values, key)?.trim() || part;
    })
    .join("");
}

export interface RenderPlaceholderOptions {
  values?: Record<string, string>;
  onSelectPlaceholder?: (key: string) => void;
}

/**
 * 占位符高亮与实时预览 —— 把 `[xxx]` 包装为交互式胶囊，已填值时原地高亮显示替换后的成品。
 */
export function renderPromptWithPlaceholders(text: string, options?: RenderPlaceholderOptions): React.ReactNode {
  if (!text) return null;
  const { values, onSelectPlaceholder } = options ?? {};
  const parts = text.split(PLACEHOLDER_SPLIT_RE);

  return parts.map((part, i) => {
    const key = parsePlaceholderKey(part);
    if (!key) {
      return <React.Fragment key={i}>{part}</React.Fragment>;
    }

    const filled = getPlaceholderValue(values, key)?.trim();
    const className = filled ? "prompt-placeholder-filled" : "prompt-placeholder-chip";
    const content = filled || part;

    if (onSelectPlaceholder) {
      return (
        <button
          key={i}
          type="button"
          className={className}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPlaceholder(key);
          }}
          title={key}>
          {content}
        </button>
      );
    }

    return (
      <span key={i} className={className}>
        {content}
      </span>
    );
  });
}

/**
 * Token 估算 — 权重法：中文 2.0，日/韩 1.8，拉丁 0.25，其他 0.5
 * 比等比粗估更贴近真实 tokenizer，供提交表单与 prompt 展示页共用
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  let tokens = 0;
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0x4e00 && code <= 0x9fa5) {
      tokens += 2.0;
    } else if (code >= 0x3040 && code <= 0x30ff) {
      tokens += 1.8;
    } else if (code >= 0xac00 && code <= 0xd7af) {
      tokens += 1.8;
    } else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      tokens += 0.25;
    } else {
      tokens += 0.5;
    }
  }
  return Math.ceil(tokens);
}
