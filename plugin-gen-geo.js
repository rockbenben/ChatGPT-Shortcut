const fs = require("fs");
const path = require("path");

// llms.txt 中包含的热门 prompt 数量上限（按 weight 降序）
// 控制文件大小（多语言 × 18，单份建议 < 50KB）
const MAX_PROMPTS_IN_LLMS = 100;

// llms.txt 节标题按 locale 本地化（fallback 到英文）
const I18N_LABELS = {
  documentation: {
    en: "Documentation",
    "zh-Hans": "文档",
    "zh-Hant": "文件",
    ja: "ドキュメント",
    ko: "문서",
    es: "Documentación",
    pt: "Documentação",
    fr: "Documentation",
    de: "Dokumentation",
    it: "Documentazione",
    ru: "Документация",
    ar: "التوثيق",
    hi: "दस्तावेज़",
    bn: "ডকুমেন্টেশন",
    vi: "Tài liệu",
    th: "เอกสาร",
    tr: "Belgeler",
    ind: "Dokumentasi",
  },
  topPrompts: {
    en: "Top Prompts (by popularity)",
    "zh-Hans": "热门提示词（按热度）",
    "zh-Hant": "熱門提示詞（按熱度）",
    ja: "人気プロンプト（人気順）",
    ko: "인기 프롬프트 (인기순)",
    es: "Prompts populares (por popularidad)",
    pt: "Prompts populares (por popularidade)",
    fr: "Prompts populaires (par popularité)",
    de: "Beliebteste Prompts (nach Beliebtheit)",
    it: "Prompt popolari (per popolarità)",
    ru: "Популярные промпты (по популярности)",
    ar: "أشهر المطالبات (حسب الشعبية)",
    hi: "लोकप्रिय प्रॉम्प्ट (लोकप्रियता के अनुसार)",
    bn: "জনপ্রিয় প্রম্পট (জনপ্রিয়তা অনুসারে)",
    vi: "Prompt phổ biến (theo độ phổ biến)",
    th: "Prompt ยอดนิยม (ตามความนิยม)",
    tr: "Popüler promptlar (popülerliğe göre)",
    ind: "Prompt populer (berdasarkan popularitas)",
  },
};

// Helper to recursively find files (按路径稳定排序，避免 OS 顺序差异)
function findFiles(dir, ext, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir).sort();

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, ext, fileList);
    } else {
      if (path.extname(file) === ext) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Helper to remove Markdown formatting for cleaner summaries
function stripMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/^#+\s+/gm, "") // headings
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // italic
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1") // links
    .replace(/`([^`]+)`/g, "$1") // code
    .replace(/^\s*-\s+/gm, "") // list items
    .replace(/^\s*>\s+/gm, "") // blockquotes
    .replace(/\n+/g, " ") // newlines to spaces
    .trim();
}

// 智能截断：在最近的句子结束符处切，避免截在词中间
// 优先级：中文句号/问号/感叹号 > 英文句号/问号/感叹号 > 分号 > 逗号 > 空格
function smartTruncate(text, maxLen) {
  if (!text || text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  // 在 maxLen 的后 30% 范围内寻找句子边界，避免过度截断
  const minBoundary = Math.floor(maxLen * 0.7);
  const boundaries = [
    /[。！？.!?][^。！？.!?]*$/,  // 句末标点
    /[；;][^；;]*$/,                 // 分号
    /[，,][^，,]*$/,                 // 逗号
    /\s\S*$/,                        // 空格
  ];
  for (const re of boundaries) {
    const match = slice.match(re);
    if (match && match.index >= minBoundary) {
      return slice.slice(0, match.index + 1);
    }
  }
  return slice;
}

module.exports = function (context, options) {
  return {
    name: "docusaurus-plugin-gen-geo",

    async postBuild({ siteConfig, outDir }) {
      // 1. Context & Locale Info
      const { i18n } = context;
      const currentLocale = i18n.currentLocale; // e.g., 'en', 'zh-Hans'
      const defaultLocale = i18n.defaultLocale;

      console.log(`[GEO] Generating llms.txt for locale: ${currentLocale}`);
      console.log(`[GEO] Output directory: ${outDir}`);

      // 2. Project Info
      // 站点品牌名固定，所有 locale 一致（与 src/data/constants.tsx 中 SITE_NAME 保持同步）
      const projectTitle = "AiShort";

      let urlPrefix = siteConfig.url;
      if (currentLocale !== defaultLocale) {
        urlPrefix = `${siteConfig.url}/${currentLocale}`;
      }

      // 项目描述按 locale 本地化：从 i18n/{locale}/code.json 读 homepage.description
      // 默认 locale (zh-Hans) 没有 code.json，回退到代码中的中文 message
      const FALLBACK_DESC = "AiShort 收录论文写作、编程、翻译等场景的实用 Prompt 模板，一键复制即可让 AI 精准理解指令，工作效率翻倍。";
      let projectDesc = FALLBACK_DESC;
      const i18nCodeFile = path.resolve(context.siteDir, `i18n/${currentLocale}/code.json`);
      if (fs.existsSync(i18nCodeFile)) {
        try {
          const i18nData = JSON.parse(fs.readFileSync(i18nCodeFile, "utf-8"));
          if (i18nData["homepage.description"]?.message) {
            projectDesc = i18nData["homepage.description"].message;
          }
        } catch (e) {
          console.warn(`[GEO] Failed to read ${i18nCodeFile}:`, e.message);
        }
      }

      // 3. Scan Documentation (docs/)
      const defaultDocsDir = path.resolve(context.siteDir, "docs");
      const localizedDocsDir = path.resolve(context.siteDir, `i18n/${currentLocale}/docusaurus-plugin-content-docs/current`);

      const docFilePaths = findFiles(defaultDocsDir, ".md");

      let docsList = [];

      docFilePaths.forEach((filePath) => {
        const relativePath = path.relative(defaultDocsDir, filePath);

        // Check if localized version exists
        let contentFilePath = filePath;
        if (currentLocale !== defaultLocale) {
          const possibleLocalizedPath = path.join(localizedDocsDir, relativePath);
          if (fs.existsSync(possibleLocalizedPath)) {
            contentFilePath = possibleLocalizedPath;
          }
        }

        const content = fs.readFileSync(contentFilePath, "utf-8");

        // Extract title
        let title = relativePath;
        const titleMatch = content.match(/^#\s+(.*)$/m);
        const fmTitleMatch = content.match(/^title:\s*(.*)$/m);
        if (fmTitleMatch) title = fmTitleMatch[1].replace(/['"]/g, "");
        else if (titleMatch) title = titleMatch[1];

        // URL construction
        // 解析 frontmatter `slug:` 覆盖，并把 README/readme 当作目录索引页（同 index）。
        // 否则纯靠文件路径推导会生成与真实路由不符的死链：
        //   docs/introduction.md（slug: /）真实路由 /docs/，被错推成 /docs/introduction；
        //   docs/extension/README.md 真实路由 /docs/extension，被错推成 /docs/extension/README。
        const fmSlugMatch = content.match(/^slug:\s*(.*)$/m);
        let slug;
        if (fmSlugMatch) {
          const raw = fmSlugMatch[1].replace(/^['"]|['"]$/g, "").trim();
          if (raw.startsWith("/")) {
            // 绝对 slug：相对 docs 路由根
            slug = raw.replace(/^\/+/, "").replace(/\/+$/, "");
          } else {
            // 相对 slug：替换所在目录下的最后一段
            const dir = relativePath.replace(/\\/g, "/").replace(/\/?[^/]*$/, "");
            slug = `${dir ? dir + "/" : ""}${raw}`.replace(/\/+$/, "");
          }
        } else {
          slug = relativePath
            .replace(/\\/g, "/")
            .replace(/\.md$/, "")
            .replace(/\/(index|readme)$/i, "")
            .replace(/^(index|readme)$/i, "");
        }
        const url = `${urlPrefix}/docs/${slug}`;

        // Summary 优先级：frontmatter description > body 智能截断
        const fmDescMatch = content.match(/^description:\s*(.*)$/m);
        let summary;
        if (fmDescMatch) {
          summary = fmDescMatch[1].replace(/^['"]|['"]$/g, "").trim();
        } else {
          const contentBody = content.replace(/^---[\s\S]*?---/, "");
          const cleaned = stripMarkdown(contentBody);
          summary = smartTruncate(cleaned, 200) + (cleaned.length > 200 ? "..." : "");
        }

        docsList.push({ title, url, summary });
      });

      // 按相对路径排序，保证 llms.txt 输出顺序稳定
      docsList.sort((a, b) => a.url.localeCompare(b.url));

      // 4. Scan Prompts (src/data/prompt_{locale}.json)
      let promptsPath = path.resolve(context.siteDir, `src/data/prompt_${currentLocale}.json`);
      if (!fs.existsSync(promptsPath)) {
        console.warn(`[GEO] Prompt file for ${currentLocale} not found, falling back to ${defaultLocale}`);
        promptsPath = path.resolve(context.siteDir, `src/data/prompt_${defaultLocale}.json`);
      }

      let promptsList = [];

      if (fs.existsSync(promptsPath)) {
        try {
          const promptsData = JSON.parse(fs.readFileSync(promptsPath, "utf-8"));

          promptsData.forEach((p) => {
            // Determine the locale key to access inside the object
            // If we are reading prompt_en.json, we expect "en" key.
            // If we fell back to default (e.g. zh-Hans), we expect "zh-Hans" key.
            const fileLocale = promptsPath.includes(`prompt_${currentLocale}.json`) ? currentLocale : defaultLocale;

            let promptInfo = p[fileLocale];

            // Fallback: if structure doesn't match convention, try to find first key that is an object
            if (!promptInfo) {
              const keys = Object.keys(p);
              for (const k of keys) {
                if (typeof p[k] === "object" && p[k].title) {
                  promptInfo = p[k];
                  break;
                }
              }
            }

            if (!promptInfo) return;

            const title = promptInfo.title;
            const id = p.id;
            const url = `${urlPrefix}/prompt/${id}`;
            const promptText = promptInfo.prompt;
            const weight = typeof p.weight === "number" ? p.weight : 0;

            // Description Fallback Logic
            let desc = promptInfo.description;
            if (!desc || desc.trim() === "") {
              // 缺描述时用 prompt 文本，智能截断到 150 字符
              const flat = stripMarkdown(promptText).replace(/\n/g, " ");
              desc = smartTruncate(flat, 150);
              if (flat.length > 150) desc += "...";
            }

            promptsList.push({ title, url, desc, weight });
          });
        } catch (e) {
          console.error(`[GEO] Error reading prompts json (${promptsPath}):`, e);
        }
      }

      // 按热度（weight = 历史复制数）降序，截取头部，控制 llms.txt 大小
      promptsList.sort((a, b) => b.weight - a.weight);
      const topPrompts = promptsList.slice(0, MAX_PROMPTS_IN_LLMS);

      // 5. Generate llms.txt content
      const labelDoc = I18N_LABELS.documentation[currentLocale] || I18N_LABELS.documentation.en;
      const labelTop = I18N_LABELS.topPrompts[currentLocale] || I18N_LABELS.topPrompts.en;

      let llmsContent = `# ${projectTitle}\n\n`;
      llmsContent += `> ${projectDesc}\n\n`;

      llmsContent += `## ${labelDoc}\n\n`;
      docsList.forEach((doc) => {
        llmsContent += `- [${doc.title}](${doc.url}): ${doc.summary}\n`;
      });

      llmsContent += `\n## ${labelTop}\n\n`;
      topPrompts.forEach((p) => {
        // Truncate desc for list view（句子边界）
        const flat = (p.desc || "").replace(/\n/g, " ");
        const shortDesc = flat ? smartTruncate(flat, 100) + (flat.length > 100 ? "..." : "") : "";
        llmsContent += `- [${p.title}](${p.url}): ${shortDesc}\n`;
      });

      // 6. Write llms.txt
      fs.writeFileSync(path.join(outDir, "llms.txt"), llmsContent);
      console.log(`[GEO] Generated llms.txt (${(llmsContent.length / 1024).toFixed(2)} KB)`);
    },
  };
};
