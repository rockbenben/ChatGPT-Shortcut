import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    // AdSense 脚本加载
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // 脚本加载后初始化广告
    script.onload = () => {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    };

    return () => {
      // 组件卸载时移除脚本，避免重复添加
      document.head.removeChild(script);
    };
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-7585955822109216" data-ad-slot="7438073448" data-ad-format="auto" data-full-width-responsive="true"></ins>;
};

export default AdComponent;
