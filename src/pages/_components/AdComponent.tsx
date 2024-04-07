import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", "ca-pub-7585955822109216");
    ins.setAttribute("data-ad-slot", "7438073448");
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");

    document.body.appendChild(ins);

    script.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(ins);
    };
  }, []);

  return null; // 或者返回一个占位符
};

export default AdComponent;
