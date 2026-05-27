import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// 在 GTM dataLayer 上推一个 ai_referral 事件，让 GA4 能把 AI 引擎来源单独成组。
// Docusaurus 默认不区分 chatgpt.com / claude.ai 等 referrer，全混在 referral 里。
// 模块只在 app boot 时跑一次（SPA 内部跳转不重触发），用 sessionStorage 防止 hard refresh 重复打点。
if (ExecutionEnvironment.canUseDOM) {
  try {
    const ref = (document.referrer || "").toLowerCase();
    if (ref && !sessionStorage.getItem("__ai_referral_tracked")) {
      const sources: Array<[RegExp, string]> = [
        [/chatgpt\.com|chat\.openai\.com/, "chatgpt"],
        [/claude\.ai|claude\.com/, "claude"],
        [/perplexity\.ai/, "perplexity"],
        [/bing\.com\/copilot|copilot\.microsoft\.com/, "copilot"],
        [/gemini\.google\.com/, "gemini"],
        [/kimi\.com|kimi\.moonshot\.cn/, "kimi"],
        [/doubao\.com|bots\.doubao\.com/, "doubao"],
        [/yuanbao\.tencent\.com/, "yuanbao"],
        [/metaso\.cn/, "metaso"],
        [/tongyi\.aliyun\.com|qwen/, "qwen"],
        [/chatglm\.cn|zhipuai/, "zhipu"],
        [/yiyan\.baidu\.com/, "wenxin"],
      ];
      for (const [pattern, source] of sources) {
        if (pattern.test(ref)) {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: "ai_referral",
            ai_source: source,
            ai_referer_host: new URL(document.referrer).hostname,
            landing_page: location.pathname + location.search,
          });
          sessionStorage.setItem("__ai_referral_tracked", source);
          break;
        }
      }
    }
  } catch {
    // 任何 referrer 解析失败都静默吃掉，分析不应影响用户
  }
}
