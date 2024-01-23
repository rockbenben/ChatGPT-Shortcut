import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

function PromptDetail() {
  return (
    <AuthProvider>
      <PromptPage promptId={110} />
    </AuthProvider>
  );
}

export default PromptDetail;
