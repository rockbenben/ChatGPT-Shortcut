import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/184_pt.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="pt" />;
}
