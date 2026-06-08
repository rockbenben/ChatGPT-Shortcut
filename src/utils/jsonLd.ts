/**
 * JSON-LD 安全序列化。
 *
 * 两层风险（实测验证，2026-06-07）：
 * 1. JSON.stringify 不做 HTML 转义：若文本字段（如 prompt 内容）含 `</script` 子串，
 *    HTML 解析器会提前闭合 script 标签——结构化数据失效 + 尾部文本裸注入 DOM。
 * 2. 仅靠 `<` → < 的 JSON 转义【无效】：Docusaurus Faster 的 swc HTML minifier
 *    会把 application/ld+json 内容 parse 后重新最小化序列化，任何 JSON 转义都被还原为
 *    裸字符（实测连安全输入都会被它重新打出裸 `</script>` 截断 script 块）。
 *
 * 因此必须改【数据本身】：在能切换 HTML script 解析状态的序列（`</script`、`<script`、
 * `<!--`）的 `<` 后插入零宽空格 U+200B——真实字符能活过任意 parse/重序列化轮回，
 * 对搜索引擎读取 JSON 值无影响。再叠加 < 转义作为非 minifier 渲染路径的纵深防御。
 *
 * 所有内嵌 JSON-LD 的输出点都应使用本函数，禁止直接 JSON.stringify。
 */
export function toJsonLd(schema: unknown): string {
  return (
    JSON.stringify(schema)
      // JSON.stringify 输出里所有 `<` 都在字符串值内，插入 ZWSP 即修改数据值本身
      .replace(/<(\/?script|!--)/gi, "<\u200b$1")
      .replace(/</g, "\\u003c")
  );
}
