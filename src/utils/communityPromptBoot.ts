import { API_URL } from "@site/src/api/config";
import type { CommunityPrompt } from "@site/src/utils/snapshotPrime";

export interface EarlyCommunityPromptHandle {
  id: number;
  fromCache: boolean;
  data: CommunityPrompt | null;
  promise: Promise<CommunityPrompt | null>;
  dismiss: () => void;
}

declare global {
  interface Window {
    __AISHORT_EARLY_BOOTED__?: boolean;
    __AISHORT_EARLY_PROMPT__?: EarlyCommunityPromptHandle;
  }
}

/**
 * Remove the pre-hydration early prompt preview overlay and its style tag.
 * Always cleans up by DOM ID as a fallback in case the handle was already cleared.
 */
export function dismissEarlyCommunityPrompt(): void {
  if (typeof window === "undefined") return;
  try {
    window.__AISHORT_EARLY_PROMPT__?.dismiss?.();
  } catch {
    // ignore
  }
  if (typeof document !== "undefined") {
    document.getElementById("aishort-early-cp")?.remove();
    document.getElementById("aishort-early-cp-style")?.remove();
  }
}

const BULK_ENDPOINT = JSON.stringify(`${API_URL}/userprompts/bulk`);

/**
 * Self-contained ES5-safe <head> boot script for /community-prompt?id=<N>.
 * Starts the API fetch (or reads lscache) immediately in <head> and renders a
 * non-interactive sibling preview overlay outside #__docusaurus so mobile LCP
 * lands before main.js + route chunks finish downloading and hydrating.
 */
export const COMMUNITY_PROMPT_BOOT_SCRIPT = `(function(){
  try {
    var root = document.documentElement;
    if (window.__AISHORT_EARLY_BOOTED__ || root.getAttribute("data-has-hydrated") === "true") return;
    window.__AISHORT_EARLY_BOOTED__ = true;
    var m = /[?&]id=([1-9]\\d*)(?:&|$)/.exec(location.search);
    if (!m) return;
    var id = parseInt(m[1], 10);
    if (!(id > 0)) return;

    var claimed = false;
    function dismiss() {
      claimed = true;
      var el = document.getElementById("aishort-early-cp");
      if (el && el.parentNode) el.parentNode.removeChild(el);
      var st = document.getElementById("aishort-early-cp-style");
      if (st && st.parentNode) st.parentNode.removeChild(st);
    }

    function readCached() {
      try {
        var prefix = "lscache-pm_" + id;
        var raw = localStorage.getItem(prefix);
        if (!raw) return null;
        var exp = localStorage.getItem(prefix + "-cacheexpiration");
        if (exp) {
          var expMin = parseInt(exp, 10);
          if (!isNaN(expMin) && expMin <= Math.floor(Date.now() / 60000)) return null;
        }
        var obj = JSON.parse(raw);
        if (obj && obj.id === id && !obj._unavailable && obj.title && obj.description) return obj;
      } catch (e) {}
      return null;
    }

    var cached = readCached();
    var fromCache = !!cached;
    var promise = cached
      ? Promise.resolve(cached)
      : fetch(${BULK_ENDPOINT}, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: [id] })
        })
          .then(function(r) { return r.ok ? r.json() : null; })
          .then(function(arr) {
            var item = Array.isArray(arr) ? arr[0] : null;
            return item && item.id === id && !item._unavailable && item.title && item.description ? item : null;
          })
          .catch(function() { return null; });

    window.__AISHORT_EARLY_PROMPT__ = {
      id: id,
      fromCache: fromCache,
      data: cached,
      promise: promise,
      dismiss: dismiss
    };

    function buildCodeBody(container, text) {
      var parts = text.split(/(\\[[^\\[\\]\\n]{1,60}\\](?!\\())/g);
      var exactRe = /^\\[[^\\[\\]\\n]{1,60}\\]$/;
      var numRe = /^\\[\\d+\\]$/;
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (!part) continue;
        if (exactRe.test(part) && !numRe.test(part)) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "prompt-placeholder-chip";
          chip.textContent = part;
          container.appendChild(chip);
        } else {
          container.appendChild(document.createTextNode(part));
        }
      }
    }

    function mount(item) {
      if (claimed || root.getAttribute("data-has-hydrated") === "true" || !document.body) return;
      if (document.getElementById("aishort-early-cp")) return;

      var style = document.createElement("style");
      style.id = "aishort-early-cp-style";
      style.textContent = "#aishort-early-cp{position:absolute;top:var(--ifm-navbar-height,60px);left:0;right:0;min-height:calc(100vh - var(--ifm-navbar-height,60px));z-index:99;background:var(--ifm-background-color)}";
      (document.head || root).appendChild(style);

      var wrap = document.createElement("div");
      wrap.id = "aishort-early-cp";
      wrap.className = "aishort";
      wrap.setAttribute("aria-hidden", "true");

      var row = document.createElement("div");
      row.className = "ant-row ant-row-center";
      row.style.cssText = "margin-top:16px;margin-bottom:24px;padding-inline:12px";

      var col = document.createElement("div");
      col.className = "ant-col ant-col-xs-24 ant-col-sm-22 ant-col-md-20 ant-col-lg-18 ant-col-xl-16 full-width-col";

      var bcSpacer = document.createElement("div");
      bcSpacer.style.cssText = "height:22px;margin-bottom:12px";
      col.appendChild(bcSpacer);

      var card = document.createElement("div");
      card.className = "ant-card ant-card-bordered";
      card.style.cssText = "border-radius:12px;border-color:var(--site-color-hairline);background:var(--ifm-background-surface-color)";

      var cardBody = document.createElement("div");
      cardBody.className = "ant-card-body";
      cardBody.style.cssText = "padding:clamp(16px, 3vw, 32px)";

      var outerFlex = document.createElement("div");
      outerFlex.style.cssText = "display:flex;flex-direction:column;gap:24px";

      var hero = document.createElement("div");
      hero.style.cssText = "display:flex;flex-direction:column;gap:10px";

      var h1 = document.createElement("h1");
      h1.className = "ant-typography comp-sheet-title";
      h1.textContent = item.title;
      hero.appendChild(h1);

      var meta = document.createElement("div");
      meta.style.cssText = "font-size:11.5px;color:var(--site-color-text-tertiary);font-family:var(--site-font-mono);min-height:18px";
      meta.textContent = item.owner || "";
      hero.appendChild(meta);
      outerFlex.appendChild(hero);

      if (item.remark) {
        var bq = document.createElement("blockquote");
        bq.className = "comp-sheet-remark";
        bq.textContent = item.remark;
        outerFlex.appendChild(bq);
      }

      var bodySec = document.createElement("div");
      bodySec.style.cssText = "display:flex;flex-direction:column;gap:14px";

      var actionSpacer = document.createElement("div");
      actionSpacer.style.cssText = "height:40px";
      bodySec.appendChild(actionSpacer);

      var codeBox = document.createElement("div");
      codeBox.className = "comp-sheet-code";
      codeBox.style.lineHeight = "1.8";
      buildCodeBody(codeBox, item.description);
      bodySec.appendChild(codeBox);

      outerFlex.appendChild(bodySec);
      cardBody.appendChild(outerFlex);
      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
      wrap.appendChild(row);
      document.body.appendChild(wrap);

      document.title = item.title + " | AiShort";
    }

    promise.then(function(item) {
      if (!item || claimed || root.getAttribute("data-has-hydrated") === "true") return;
      if (document.body) {
        mount(item);
      } else {
        document.addEventListener("DOMContentLoaded", function() { mount(item); }, { once: true });
      }
    });
  } catch (e) {}
})();`;
