import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "创业技术律师",
  "description": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
  "desc_cn": "我将要求你准备一份 1 页的设计合作伙伴协议草案，该协议由一家拥有知识产权的科技初创公司与该初创公司技术的潜在客户签订，该客户为该初创公司正在解决的问题空间提供数据和领域专长。你将写下大约 1-4 页的拟议设计合作伙伴协议，其中将涵盖知识产权、保密性、商业权利、提供的数据、数据的使用等所有重要方面。",
  "remark": "根据要求输出协议和合同草案。",
  "title_en": "startup tech lawyer",
  "desc_en": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
  "remark_en": "Output protocol and contract draft according to requirements.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-tech-lawyer",
  "tags": [
    "professional"
  ],
  "id": 172,
  "weight": 266
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
