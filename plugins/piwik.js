//https://docusaurus.io/zh-CN/docs/api/plugin-methods/lifecycle-apis#injectHtmlTags
module.exports = function () {
  return {
    name: "piwik",
    injectHtmlTags() {
      return {
        postBodyTags: [
          {
            tagName: "script",
            innerHTML: `var _paq = window._paq = window._paq || [];/* tracker methods like "setCustomDimension" should be called before "trackPageView" */_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function() {var u="https://piwik.seoipo.com/";_paq.push(['setTrackerUrl', u+'matomo.php']);_paq.push(['setSiteId', '9']);var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);})();`,
          },
        ],
      };
    },
  };
};
