import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PromptCard from "@site/src/components/PromptCard";
import type { PromptCardProps } from "@site/src/components/PromptCard/types";

/**
 * MySpace 里可拖拽排序的卡片：useSortable 在这一层调用，再把产物经 `sortable` prop 交给卡片。
 * 卡片（FavoriteCard / UserCard）自己不 import @dnd-kit —— 它们被首页搜索结果、社区列表共用，
 * 静态 import 会把 ~20 KB gz 的 dnd-kit 塞进每个渲染卡片的页面，而拖拽只存在于这里的
 * SortableContext 内。本文件只在懒加载的 MySpace chunk 里。
 */
export default function SortableCard({ sortableId, ...props }: Omit<PromptCardProps, "sortable"> & { sortableId: string | number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sortableId });
  const sortable = {
    setNodeRef,
    attributes,
    listeners,
    style: { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 },
  };
  return <PromptCard {...props} sortable={sortable} />;
}
