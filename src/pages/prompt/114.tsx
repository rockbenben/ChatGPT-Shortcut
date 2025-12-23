import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/114_zh.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="zh" />;
}
