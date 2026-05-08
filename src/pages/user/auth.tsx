import { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// offline 分支：OAuth callback 是联网登录功能，跳转到 online 站
export default function AuthCallbackRedirect() {
  const { i18n } = useDocusaurusContext();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefix = i18n.currentLocale === "zh-Hans" ? "" : `/${i18n.currentLocale}`;
    window.location.replace(`https://www.aishort.top${prefix}/user/auth${window.location.search}${window.location.hash}`);
  }, []);
  return null;
}
