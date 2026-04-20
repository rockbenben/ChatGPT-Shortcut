import React from "react";

/**
 * 占位符高亮 — 把 [xxx] 包装成视觉 tag，让用户一眼看到要改哪
 * 用正则拆 [xxx] 段，其余文本保持空白字符和换行（配合 whitespace: pre-wrap）
 */
export function renderPromptWithPlaceholders(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/(\[[^\[\]\n]+\])/g);
  return parts.map((part, i) => {
    if (/^\[[^\[\]\n]+\]$/.test(part)) {
      return (
        <span
          key={i}
          style={{
            display: "inline-block",
            padding: "0 6px",
            margin: "0 1px",
            borderRadius: 4,
            backgroundColor: "rgba(var(--ifm-color-primary-rgb, 24 144 255), 0.12)",
            color: "var(--ifm-color-primary)",
            fontWeight: 500,
          }}>
          {part}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
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
