import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/22_zh-Hans.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="zh-Hans" />;
}
