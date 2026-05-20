import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface Props {
  isDarkMode: boolean;
  onEmojiSelect: (emoji: any) => void;
}

// 单独 chunk 包 @emoji-mart/data (大表情数据集) + @emoji-mart/react (Picker)；
// 仅用户点 😀 才被 Comments.tsx 通过 React.lazy 触发下载。
const EmojiPickerLazy: React.FC<Props> = ({ isDarkMode, onEmojiSelect }) => {
  return <Picker data={data} theme={isDarkMode ? "dark" : "light"} onEmojiSelect={onEmojiSelect} />;
};

export default EmojiPickerLazy;
