import React from "react";
import PromptPage from "@site/src/pages/_components/PromptPage";
import prompt from "@site/src/data/cards/192_hi.json";

const cachedPrompt = prompt;

function PromptDetail() {
  return <PromptPage prompt={cachedPrompt} />;
}

export default React.memo(PromptDetail);

