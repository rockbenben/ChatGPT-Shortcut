import React, { useEffect, useState, useRef } from "react";

const AdComponent = ({ type = "default", className = "", style = {} }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);
  const adSlot = type === "transverse" ? "3744254915" : "7438073448";

  // CLS 优化：预留高度
  const minHeight = type === "transverse" ? "100px" : "280px";

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
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense push failed", error);
    }
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        minHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.02)",
        borderRadius: "8px",
        ...style,
      }}>
      {shouldLoad && (
        <ins
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
