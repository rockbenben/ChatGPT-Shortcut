import React, { useEffect, useState, useRef } from "react";

const AD_CLIENT = "ca-pub-7585955822109216";
const AD_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

// 填充判定唯一权威信号是 AdSense 落在 ins 上的 data-ad-status（"filled"/"unfilled"），
// 用 MutationObserver 等它落定。不要用 ins 高度做启发式——AdSense 尝试填充期间会先给
// ins 一个临时高度（~280px），会把"高度>0 即已填充"骗过。
// 脚本级失败（onerror，如 adblock 拦截）会立即通知所有等待中的实例收起；
// 超时仅兜底 status 永不落定的场景（脚本被静默吞掉或请求挂起）。
const FILL_TIMEOUT_MS = 5000;

/** @type {"idle" | "loading" | "loaded" | "failed"} */
let adScriptStatus = "idle";
/** @type {Set<() => void>} */
const scriptFailListeners = new Set();

function ensureAdScript() {
  if (adScriptStatus === "failed") return false;
  if (adScriptStatus !== "idle") return true;

  if (document.querySelector(`script[src="${AD_SCRIPT_SRC}"]`)) {
    adScriptStatus = "loaded";
    return true;
  }

  adScriptStatus = "loading";
  const script = document.createElement("script");
  script.src = AD_SCRIPT_SRC;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.onload = () => {
    adScriptStatus = "loaded";
    scriptFailListeners.clear();
  };
  script.onerror = () => {
    adScriptStatus = "failed";
    scriptFailListeners.forEach((cb) => cb());
    scriptFailListeners.clear();
  };
  document.body.appendChild(script);
  return true;
}

/**
 * 广告位三态（设计原则：设置最小预留高度消除 CLS 突刺，未填充或屏蔽时自动收起）：
 *  - pending：占位等待（预留 90px 横幅 / 200px 网格最小高度），避免 AdSense 填充时下方内容断崖式下移
 *  - filled：AdSense 注入内容，自然撑开（因已有预留高度，CLS 保持在 0）。横幅用 horizontal，
 *    首页网格用 rectangle + 关闭 full-width-responsive，避免窄列塞进高竖版素材拉扯行高
 *  - empty：渲染 null 并触发 onEmpty。脚本 onerror 立即收起，否则超时后收起；
 *    详情页/列表页横幅彻底消失，首页由外层 AdCardSlot 连同 Col 一并收起不留空槽
 *
 * @param {{ type?: "default" | "transverse"; className?: string; style?: React.CSSProperties; onEmpty?: () => void }} props
 */
const AdComponent = ({ type = "default", className = "", style = {}, onEmpty }) => {
  const isTransverse = type === "transverse";
  const [shouldLoad, setShouldLoad] = useState(false);
  const [empty, setEmpty] = useState(() => adScriptStatus === "failed");
  const containerRef = useRef(null);
  const insRef = useRef(null);
  const pushedRef = useRef(false);
  const onEmptyRef = useRef(onEmpty);
  onEmptyRef.current = onEmpty;
  const adSlot = isTransverse ? "3744254915" : "7438073448";

  useEffect(() => {
    if (empty) onEmptyRef.current?.();
  }, [empty]);

  useEffect(() => {
    if (empty) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // 提前 200px 加载
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [empty]);

  useEffect(() => {
    if (!shouldLoad || empty) return;

    if (!ensureAdScript()) {
      setEmpty(true);
      return;
    }

    const onScriptFail = () => setEmpty(true);
    if (adScriptStatus === "loading") {
      scriptFailListeners.add(onScriptFail);
    }

    const ins = insRef.current;
    try {
      if (!pushedRef.current && !ins?.getAttribute("data-adsbygoogle-status")) {
        pushedRef.current = true;
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("AdSense push failed", error);
      scriptFailListeners.delete(onScriptFail);
      setEmpty(true);
      return;
    }

    let observer;
    const timer = setTimeout(() => {
      // status 始终未落定 = 脚本被静默吞掉或加载超时，按空位收起
      if (insRef.current && insRef.current.getAttribute("data-ad-status") !== "filled") setEmpty(true);
    }, FILL_TIMEOUT_MS);

    const settle = (status) => {
      if (!status) return;
      clearTimeout(timer);
      if (observer) observer.disconnect();
      if (status !== "filled") setEmpty(true);
    };

    if (ins) {
      observer = new MutationObserver(() => settle(ins.getAttribute("data-ad-status")));
      observer.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
      settle(ins.getAttribute("data-ad-status")); // push 前 status 已存在的兜底（理论上不会，防竞态）
    }

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      scriptFailListeners.delete(onScriptFail);
    };
  }, [shouldLoad, empty]);

  if (empty) {
    return null;
  }

  return (
    // overflow:hidden 是兜底，不是常态裁剪。广告位自身守得住 width:100%，但外层没有任何
    // 包含性时，比广告位更宽的素材会整个逃出去把【页面】撑出横向滚动条 —— 实测 320px 视口
    // 下 336×280（移动端很常见的尺寸）溢出 35px、728 溢出 427px；375px 下 728 溢出 372px；
    // 768px 下 728 溢出 9px、970 溢出 251px。桌面够宽才躲得过。
    // 正常情况（responsive 单元按容器宽度取素材）什么都不裁，只有上面那种病态尺寸才生效 ——
    // 裁掉一条广告边，好过整站在手机上横向滚动。
    <div ref={containerRef} className={className} style={{ width: "100%", minHeight: isTransverse ? 90 : 200, overflow: "hidden", ...style }}>
      {shouldLoad && (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={adSlot}
          data-ad-format={isTransverse ? "horizontal" : "rectangle"}
          data-full-width-responsive={isTransverse ? "true" : "false"}
        />
      )}
    </div>
  );
};

export default AdComponent;
