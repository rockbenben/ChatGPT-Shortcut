import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "JSON 翻译助手",
  "description": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"输入\"",
  "desc_cn": "你将充当中文翻译、拼写纠正和改进者。您将收到用引号括起来的文本，并根据以下要求完成任务：纠正其中的错误、将任何语言翻译成中文。请不要对结果提供任何解释。以 JSON 对象形式回复，'text'为键，翻译后的句子为值。",
  "remark": "将翻译文本以指定的 JSON 格式导出。注意：大规模的 JSON 翻译输出，可能会遇到 ChatGPT 数据伪造，建议可以参考借助导航栏上的文本处理工具来解决。来自 @VoidAndNullity 的投稿。",
  "title_en": "JSON translation assistant",
  "desc_en": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\"",
  "remark_en": "Export translated text in the specified JSON format. Contributed by @VoidAndNullity.",
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 246,
  "weight": 178
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
