const fs = require("fs");
const path = require("path");

// Helper to recursively find files
function findFiles(dir, ext, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

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
      const projectTitle = siteConfig.title;

      let urlPrefix = siteConfig.url;
      if (currentLocale !== defaultLocale) {
        urlPrefix = `${siteConfig.url}/${currentLocale}`;
      }

      const projectDesc = "AiShort (ChatGPT Shortcut) - AI Prompt Management Tool. Maximize your Efficiency and Productivity.";

      // 3. Scan Documentation (docs/)
      const defaultDocsDir = path.resolve(context.siteDir, "docs");
      const localizedDocsDir = path.resolve(context.siteDir, `i18n/${currentLocale}/docusaurus-plugin-content-docs/current`);

      const docFilePaths = findFiles(defaultDocsDir, ".md");

      let docsList = [];
      let docsFullContent = "";

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
        // Windows path fix
        const slug = relativePath
          .replace(/\\/g, "/")
          .replace(/\.md$/, "")
          .replace(/\/index$/, "");
        const url = `${urlPrefix}/docs/${slug}`;

        // Summary
        const contentBody = content.replace(/^---[\s\S]*?---/, "");
        const summary = stripMarkdown(contentBody.slice(0, 200)) + "...";

        docsList.push({ title, url, summary });

        docsFullContent += `## Document: ${title}\nLink: ${url}\n\n${contentBody}\n\n---\n\n`;
      });

      // 4. Scan Prompts (src/data/prompt_{locale}.json)
      let promptsPath = path.resolve(context.siteDir, `src/data/prompt_${currentLocale}.json`);
      if (!fs.existsSync(promptsPath)) {
        console.warn(`[GEO] Prompt file for ${currentLocale} not found, falling back to ${defaultLocale}`);
        promptsPath = path.resolve(context.siteDir, `src/data/prompt_${defaultLocale}.json`);
      }

      let promptsList = [];
      let promptsFullContent = "";

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

            // Description Fallback Logic
            let desc = promptInfo.description;
            // If description is missing or empty string, fallback to prompt text
            if (!desc || desc.trim() === "") {
              // Use prompt text, truncate to 150 chars, add ellipsis
              desc = stripMarkdown(promptText).slice(0, 150).replace(/\n/g, " ");
              if (promptText.length > 150) desc += "...";
            }

            promptsList.push({ title, url, desc });

            promptsFullContent += `## Prompt: ${title}\nLink: ${url}\n> ${desc}\n\n\`\`\`\n${promptText}\n\`\`\`\n\n---\n\n`;
          });
        } catch (e) {
          console.error(`[GEO] Error reading prompts json (${promptsPath}):`, e);
        }
      }

      // 5. Generate llms.txt content
      let llmsContent = `# ${projectTitle}\n\n`;
      llmsContent += `> ${projectDesc}\n\n`;

      llmsContent += `## Documentation\n\n`;
      docsList.forEach((doc) => {
        llmsContent += `- [${doc.title}](${doc.url}): ${doc.summary}\n`;
      });

      llmsContent += `\n## Selected Prompts\n\n`;
      promptsList.forEach((p) => {
        // Truncate desc if too long (clean up for list view)
        const shortDesc = p.desc ? p.desc.slice(0, 100).replace(/\n/g, " ") + (p.desc.length > 100 ? "..." : "") : "";
        llmsContent += `- [${p.title}](${p.url}): ${shortDesc}\n`;
      });

      // 6. Write llms.txt
      fs.writeFileSync(path.join(outDir, "llms.txt"), llmsContent);
      console.log(`[GEO] Generated llms.txt (${(llmsContent.length / 1024).toFixed(2)} KB)`);
    },
  };
};
