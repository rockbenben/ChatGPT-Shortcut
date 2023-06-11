import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "取名字",
  "description": "请为我们的孩子取一个名字，孩子将于 2023 年 6 月底出生，父亲姓李，母亲姓侯。我们希望名字寓意美好前程、品性良善、富有智慧。请从诗经和楚辞中选取灵感，为孩子起 10 个合适的名字。",
  "desc_cn": "请为我们的孩子取一个名字，孩子将于 2023 年 6 月底出生，父亲姓李，母亲姓侯。我们希望名字寓意美好前程、品性良善、富有智慧。请从诗经和楚辞中选取灵感，为孩子起 10 个合适的名字。",
  "remark": "为孩子取一个富有美好含义的名字，从古代经典中获取灵感。",
  "title_en": "Take name",
  "desc_en": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
  "remark_en": "Select a name for your child that carries a meaningful and beautiful significance, drawing inspiration from classical literature.",
  "website": null,
  "tags": [
    "personal",
    "tool"
  ],
  "id": 242,
  "weight": 1144
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
