//https://docusaurus.io/zh-CN/docs/api/plugin-methods/lifecycle-apis#injectHtmlTags
module.exports = function () {
  return {
    name: "instantpage",
    injectHtmlTags() {
      return {
        postBodyTags: [
          {
            tagName: "script",
            attributes: {
              src: "https://cdn.staticfile.org/instant.page/5.1.1/instantpage.min.js",
            },
          },
        ],
      };
    },
  };
};
