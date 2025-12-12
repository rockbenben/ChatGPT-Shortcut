import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/57_de.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="de" />;
}
