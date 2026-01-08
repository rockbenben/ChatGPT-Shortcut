import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/253_ind.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="ind" />;
}
