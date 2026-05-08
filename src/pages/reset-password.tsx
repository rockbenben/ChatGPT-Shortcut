import { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// offline 分支：密码重置是联网功能，跳转到 online 站
export default function ResetPasswordRedirect() {
  const { i18n } = useDocusaurusContext();
  useEffect(() => {
    const prefix = i18n.currentLocale === "zh-Hans" ? "" : `/${i18n.currentLocale}`;
    const search = typeof window !== "undefined" ? window.location.search : "";
    window.location.replace(`https://www.aishort.top${prefix}/reset-password${search}`);
  }, []);
  return null;
}
