import PromptPage from "@site/src/pages/_components/PromptPage";
import prompt from "@site/src/data/cards/50_bn.json";

export default function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}
