import React, { useEffect, useState } from "react";

const AdComponent = ({ type = "default" }) => {
  const [isMounted, setIsMounted] = useState(false);
  const adSlot = type === "transverse" ? "3744254915" : "7438073448";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    try {
      // 确保 adsbygoogle 数组存在
      window.adsbygoogle = window.adsbygoogle || [];
      // 推送一个空对象，触发 AdSense 寻找未填充的 <ins> 标签
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense push failed", error);
    }
  }, [isMounted]);

  // 服务端渲染或未挂载时，返回占位符，防止 Hydration Error
  if (!isMounted) {
    return <div style={{ minHeight: "200px", width: "100%" }} />;
  }

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-7585955822109216" data-ad-slot={adSlot} data-ad-format="auto" data-full-width-responsive="true" />;
};

export default AdComponent;
