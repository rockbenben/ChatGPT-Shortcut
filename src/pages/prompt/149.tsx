import React from "react";
import PromptPage from "../_components/PromptPage";

const prompts = require('@site/src/data/prompt.json');
const prompt = prompts.find(p => p.id === 149);

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
