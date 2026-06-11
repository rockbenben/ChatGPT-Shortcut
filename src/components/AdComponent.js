import React, { useEffect, useState, useRef } from "react";

let adScriptInjected = false;

// 填充判定唯一权威信号是 AdSense 落在 ins 上的 data-ad-status（"filled"/"unfilled"），
// 用 MutationObserver 等它落定。不要用 ins 高度做启发式——AdSense 尝试填充期间会先给
// ins 一个临时高度（~280px），会把"高度>0 即已填充"骗过。
// 超时仅兜底 status 永不落定的场景（adblock 屏蔽脚本 / 脚本加载失败）。
const FILL_TIMEOUT_MS = 5000;

/**
 * 广告位三态（设计原则：广告位永远不自我标记，CLS 取舍已确认可接受）：
 *  - pending：隐形等待（无预留高度、无底色边框），页面看不出这里有广告位
 *  - filled：AdSense 注入内容，自然撑开（此时发生一次布局移动，可接受）
 *  - empty：渲染 null。详情页的 transverse 位随之彻底消失；
 *    首页网格的外层 Col 会留一个空槽，已确认可接受（不值得为它引入收起机制）
 */
const AdComponent = ({ type = "default", className = "", style = {} }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [empty, setEmpty] = useState(false);
  const containerRef = useRef(null);
  const insRef = useRef(null);
  const adSlot = type === "transverse" ? "3744254915" : "7438073448";

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    try {
      if (!adScriptInjected) {
        adScriptInjected = true;
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7585955822109216";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense push failed", error);
      setEmpty(true);
      return;
    }

    const ins = insRef.current;
    let observer;
    const timer = setTimeout(() => {
      // status 始终未落定 = 脚本被屏蔽或加载失败，按空位收起
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
    };
  }, [shouldLoad]);

  if (empty) {
    return null;
  }

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", ...style }}>
      {shouldLoad && (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-7585955822109216"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};

export default AdComponent;
