import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/117_de.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="de" />;
}
