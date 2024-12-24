import React, { useEffect } from "react";

const AdComponent = ({ type = "default" }) => {
  const adSlot = type === "transverse" ? "3744254915" : "7438073448";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeAds = () => {
      window.adsbygoogle = window.adsbygoogle || [];
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.error("AdSense Initialization failed", error);
      }
    };

    const loadScript = () => {
      // 检查 script 是否已存在
      const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
      if (existingScript) {
        initializeAds();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7585955822109216";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = initializeAds;
      script.onerror = (error) => {
        console.error("Failed to load AdSense script:", error);
      };
      document.head.appendChild(script);
    };

    if (!window.adsbygoogle || !window.adsbygoogle.loaded) {
      loadScript();
    } else {
      initializeAds();
    }
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-7585955822109216" data-ad-slot={adSlot} data-ad-format="auto" data-full-width-responsive="true" />;
};

export default AdComponent;
