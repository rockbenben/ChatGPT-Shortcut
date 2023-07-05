import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "取名字",
    "prompt": "请为我们的孩子取一个名字，孩子将于 2023 年 6 月底出生，父亲姓李，母亲姓侯。我们希望名字寓意美好前程、品性良善、富有智慧。请从诗经和楚辞中选取灵感，为孩子起 10 个合适的名字。",
    "description": "请为我们的孩子取一个名字，孩子将于 2023 年 6 月底出生，父亲姓李，母亲姓侯。我们希望名字寓意美好前程、品性良善、富有智慧。请从诗经和楚辞中选取灵感，为孩子起 10 个合适的名字。",
    "remark": "为孩子取一个富有美好含义的名字，从古代经典中获取灵感。"
  },
  "en": {
    "title": "Take name",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "remark": "Select a name for your child that carries a meaningful and beautiful significance, drawing inspiration from classical literature."
  },
  "ja": {
    "title": "ネーミング",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Janpanese. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "2023 年 6 月末に李という父と侯という母との間に生まれる子供の名前を教えてください。名前は、良い未来、良い性格、知恵を意味するものを希望します。歌集と朱子学をイメージして、ふさわしい名前を 10 個選んでください。",
    "remark": "美しい意味を持つ名前をお子さんにつけて、古代の古典からインスピレーションを得てください。"
  },
  "ko": {
    "title": "이름 지정",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Korean. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "2023 년 6 월 말에 리라는 아버지와 후라는 어머니 사이에서 태어날 아이의 이름을 지어주세요. 좋은 미래, 좋은 성품, 지혜를 의미하는 이름이 되었으면 합니다. 아가서와 춘추에서 영감을 얻은 적절한 이름 10 개를 골라주세요.",
    "remark": "자녀에게 아름다운 의미를 담은 이름을 지어주고 고대 고전에서 영감을 얻으세요."
  },
  "website": null,
  "tags": [
    "personal",
    "tool"
  ],
  "id": 242,
  "weight": 1731
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
