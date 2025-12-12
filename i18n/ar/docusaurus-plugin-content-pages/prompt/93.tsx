import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/93_ar.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="ar" />;
}
