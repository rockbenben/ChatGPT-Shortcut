import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/246_fr.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="fr" />;
}
