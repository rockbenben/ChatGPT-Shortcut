import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/30_th.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} currentLanguage="th" />;
}
