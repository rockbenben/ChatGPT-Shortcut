import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/44_ar.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="ar" />;
}
