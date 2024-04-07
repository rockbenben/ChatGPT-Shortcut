import { useEffect, useRef } from "react";

const AdComponent = () => {
  const adElementRef = useRef(null); // 用于引用广告位的容器

  useEffect(() => {
    // 检查脚本是否已加载
    const scriptId = "adsbygoogle-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }

    // 创建并添加广告位元素
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", "ca-pub-7585955822109216");
    ins.setAttribute("data-ad-slot", "7438073448");
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");

    adElementRef.current.appendChild(ins);

    (window.adsbygoogle = window.adsbygoogle || []).push({});

    // 清理函数
    return () => {
      while (adElementRef.current.firstChild) {
        adElementRef.current.removeChild(adElementRef.current.firstChild);
      }
    };
  }, []);

  // 返回一个广告位的容器，而不是 null
  return <div ref={adElementRef}></div>;
};

export default AdComponent;
