import React, { useEffect } from "react";

const AdComponent = ({ type = "default" }) => {
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
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7585955822109216";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      script.onload = initializeAds;
    };

    if (!window.adsbygoogle || !window.adsbygoogle.loaded) {
      loadScript();
    } else {
      initializeAds();
    }
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-7585955822109216" data-ad-slot={adSlot} data-ad-format="auto" data-full-width-responsive="true"></ins>;
};

export default AdComponent;
