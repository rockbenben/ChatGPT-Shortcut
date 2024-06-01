import React, { useEffect } from "react";

const AdComponent = ({ type = "default" }) => {
  const adSlot = type === "transverse" ? "3744254915" : "7438073448";
  const adClient = "ca-pub-7585955822109216";

  useEffect(() => {
    const initializeAds = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense Initialization failed", error);
      }
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = initializeAds;
      document.head.appendChild(script);
    };

    if (!document.querySelector(`script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}"]`)) {
      loadScript();
    } else {
      initializeAds();
    }
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={adClient} data-ad-slot={adSlot} data-ad-format="auto" data-full-width-responsive="true"></ins>;
};

export default AdComponent;
