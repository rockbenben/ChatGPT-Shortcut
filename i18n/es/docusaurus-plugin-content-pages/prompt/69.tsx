import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/69_es.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="es" />;
}
