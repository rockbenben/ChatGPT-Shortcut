//https://docusaurus.io/zh-CN/docs/api/plugin-methods/lifecycle-apis#injectHtmlTags
module.exports = function () {
  return {
    name: "instantpage",
    injectHtmlTags() {
      return {
        postBodyTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preload",
              href: "https://oss.newzone.top/instantpage.min.js",
              as: "script",
              crossorigin: "anonymous",
            },
          },
          {
            tagName: "script",
            attributes: {
              src: "https://oss.newzone.top/instantpage.min.js",
              type: "module",
            },
          },
        ],
      };
    },
  };
};
