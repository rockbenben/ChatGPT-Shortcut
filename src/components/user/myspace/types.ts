// 自定义标签类型
export interface CustomTag {
  id: string;
  name: string;
  color: string;
  order: number;
}

export type FilterType = "all" | "prompt" | "favorite";
