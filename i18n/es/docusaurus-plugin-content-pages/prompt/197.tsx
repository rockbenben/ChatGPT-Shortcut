import React from "react";
import PromptPage from "@site/src/pages/_components/PromptPage";
import prompt from "@site/src/data/cards/197_es.json";

const cachedPrompt = prompt;

function PromptDetail() {
  return <PromptPage prompt={cachedPrompt} />;
}

export default React.memo(PromptDetail);

