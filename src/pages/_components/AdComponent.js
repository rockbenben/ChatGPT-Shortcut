import React, { useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const AdComponentInner = ({ type = "default" }) => {
  const adSlot = type === "transverse" ? "3744254915" : "7438073448";

  useEffect(() => {
    const initializeAds = () => {
      window.adsbygoogle = window.adsbygoogle || [];
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.error("AdSense Initialization failed", error);
      }
    };

    const loadScript = () => {
      const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
      if (existingScript) {
        setTimeout(initializeAds, 100);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7585955822109216";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => setTimeout(initializeAds, 100);
      script.onerror = (error) => {
        console.error("Failed to load AdSense script:", error);
      };
      document.head.appendChild(script);
    };

    const timer = setTimeout(() => {
      if (!window.adsbygoogle || !window.adsbygoogle.loaded) {
        loadScript();
      } else {
        initializeAds();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-7585955822109216" data-ad-slot={adSlot} data-ad-format="auto" data-full-width-responsive="true" />;
};

const AdComponent = ({ type = "default" }) => {
  return <BrowserOnly fallback={<div style={{ minHeight: "200px" }} />}>{() => <AdComponentInner type={type} />}</BrowserOnly>;
};

export default AdComponent;
