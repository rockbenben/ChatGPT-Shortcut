import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/134_zh-Hant.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="zh-Hant" />;
}
