import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/86_ko.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="ko" />;
}
