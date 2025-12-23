import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/232_hi.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="hi" />;
}
