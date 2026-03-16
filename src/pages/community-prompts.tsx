import { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function CommunityPromptsRedirect() {
  const { i18n } = useDocusaurusContext();
  useEffect(() => {
    const prefix = i18n.currentLocale === "zh-Hans" ? "" : `/${i18n.currentLocale}`;
    window.location.replace(`https://www.aishort.top${prefix}/community-prompts`);
  }, []);
  return null;
}
