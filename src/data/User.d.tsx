export type User = {
  title: string;
  description: string;
  desc_cn: string;
  remark: string;
  title_en: string;
  desc_en: string;
  remark_en: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string | null;
  source: string | null;
  tags: TagType[];
  id: number;
};

export type TagType =
  // DO NOT USE THIS TAG: we choose sites to add to favorites
  | "favorite"
  | "mind"
  | "write"
  | "article"
  | "text"
  | "seo"
  | "comments"
  | "code"
  | "ai"
  | "life"
  | "living"
  | "interesting"
  | "speech"
  | "social"
  | "philosophy"
  | "pedagogy"
  | "academic"
  | "interpreter"
  | "games"
  | "tool"
  | "language"
  | "company"
  | "doctor"
  | "finance"
  | "music"
  | "professional"
  | "contribute"
  | "personal";

export type Tag = {
  label: string;
  description: string;
  color: string;
};
