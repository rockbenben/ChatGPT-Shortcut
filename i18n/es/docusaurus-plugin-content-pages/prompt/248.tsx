import React from "react";
import PromptPage from "@site/src/pages/_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";
import prompt from "@site/src/data/cards/248_es.json";

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;