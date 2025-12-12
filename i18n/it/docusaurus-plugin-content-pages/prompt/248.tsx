import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/248_it.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="it" />;
}
