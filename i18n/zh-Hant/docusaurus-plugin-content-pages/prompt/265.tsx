import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/265_zh-Hant.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="zh-Hant" />;
}
