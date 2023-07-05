import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "Midjourney 提示生成器",
    "prompt": "I want you to act as a prompt generator for Midjourney's artificial intelligence program. Your job is to provide detailed and creative descriptions that will inspire unique and interesting images from the AI. Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts, so feel free to be as imaginative and descriptive as possible. For example, you could describe a scene from a futuristic city, or a surreal landscape filled with strange creatures. The more detailed and imaginative your description, the more interesting the resulting image will be. Respond in English. Here is your first prompt: [画面描述]",
    "description": "我想让你充当 Midjourney 人工智能程序的提示生成器。你的工作是提供详细和有创意的描述，以激发人工智能的独特和有趣的图像。请记住，人工智能能够理解广泛的语言，并能解释抽象的概念，所以请自由发挥想象力和描述力，尽可能地发挥。例如，你可以描述一个未来城市的场景，或一个充满奇怪生物的超现实景观。你的描述越详细，越有想象力，产生的图像就越有趣。",
    "remark": "通过为提供的图像描述填充详细且有创意的描述，激发 Midjourney 生成独特有趣的图像。这也适用于 Stable Diffusion。或者使用我的另一款工具 IMGPrompt，可以在导航栏中找到链接。"
  },
  "en": {
    "title": "Midjourney Prompt Generator",
    "prompt": "I want you to act as a prompt generator for Midjourney's artificial intelligence program. Your job is to provide detailed and creative descriptions that will inspire unique and interesting images from the AI. Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts, so feel free to be as imaginative and descriptive as possible. For example, you could describe a scene from a futuristic city, or a surreal landscape filled with strange creatures. The more detailed and imaginative your description, the more interesting the resulting image will be. Here is your first prompt: ",
    "remark": "By filling in detailed and creative descriptions for the provided image, Midjourney is inspired to generate unique and interesting images. This also applies to Stable Diffusion."
  },
  "ja": {
    "title": "ミッドジャーニー・チップ・ジェネレーター",
    "prompt": "I want you to act as a prompt generator for Midjourney's artificial intelligence program. Your job is to provide detailed and creative descriptions that will inspire unique and interesting images from the AI. Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts, so feel free to be as imaginative and descriptive as possible. For example, you could describe a scene from a futuristic city, or a surreal landscape filled with strange creatures. The more detailed and imaginative your description, the more interesting the resulting image will be. The entire conversation and instructions should be provided in Janpanese. Here is your first prompt: ",
    "description": "Midjourney の AI プログラムのヒントジェネレーターとして活動してほしい。あなたの仕事は、AI のユニークで興味深いイメージを刺激するような、詳細で創造的な説明を提供することです。AI は様々な言語を理解し、抽象的な概念を説明することができるので、あなたの想像力と描写力を存分に発揮してください。例えば、近未来的な都市の風景や、奇妙な生き物がたくさんいる超現実的な風景を描写することができます。描写が細かく、想像力が豊かであればあるほど、出来上がった画像は面白いものになるはずです。",
    "remark": "Midjourney を刺激して、ユニークで面白い画像を生成するために、提供された画像説明文を詳細かつ創造的な説明で埋める。これは、Stable Diffusion にも適用されます。また、ナビゲーションバーにリンクされている私の他のツール IMGPrompt を使用してください。"
  },
  "ko": {
    "title": "여행 중간 팁 생성기",
    "prompt": "I want you to act as a prompt generator for Midjourney's artificial intelligence program. Your job is to provide detailed and creative descriptions that will inspire unique and interesting images from the AI. Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts, so feel free to be as imaginative and descriptive as possible. For example, you could describe a scene from a futuristic city, or a surreal landscape filled with strange creatures. The more detailed and imaginative your description, the more interesting the resulting image will be. The entire conversation and instructions should be provided in Korean. Here is your first prompt: ",
    "description": "미드저니 AI 프로그램의 힌트 생성자 역할을 해주셨으면 합니다. 여러분의 임무는 AI 가 독특하고 흥미로운 이미지를 떠올릴 수 있도록 상세하고 창의적인 설명을 제공하는 것입니다. AI 는 다양한 언어를 이해하고 추상적인 개념을 설명할 수 있으므로 상상력과 설명을 최대한 자유롭게 사용하세요. 예를 들어 미래 도시의 한 장면이나 이상한 생물로 가득한 초현실적인 풍경을 묘사할 수 있습니다. 설명이 상세하고 상상력이 풍부할수록 결과 이미지가 더 흥미로워집니다.",
    "remark": "제공된 이미지 설명을 상세하고 창의적인 설명으로 채워 독특하고 흥미로운 이미지를 생성할 수 있도록 Midjourney 에 영감을 불어넣으세요. 이 기능은 안정적인 확산 기능에서도 사용할 수 있습니다. 또는 탐색 모음에 링크된 다른 도구인 IMGPrompt 를 사용하세요."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-midjourney-prompt-generator",
  "tags": [
    "favorite",
    "ai"
  ],
  "id": 109,
  "weight": 10796
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
