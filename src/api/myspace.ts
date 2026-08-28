/**
 * MySpace 的离线实现 —— 形状与在线版 /myspace 完全一致，数据来自 localStorage。
 * 组件层（AuthContext、MySpace 及其 myspace/* 模块）因此一行都不用改。
 */
import { buildItems, loadTags, saveTags, saveOrder, type CustomTagDefinition } from "./localStore";

/**
 * 在线版这里是带 ETag 条件请求的 GET /myspace。离线版没有网络，直接从四个 key 拼出同形数据。
 *
 * favoriteId 固定为 1：在线版它是服务端 favorite 记录的主键，离线没有对应概念，
 * 但调用方（useFavorite 的 delta reconcile）会读它，给 null 会让那条链路误判成「还没初始化」。
 */
export function getMySpaceSync() {
  return {
    favoriteId: 1,
    items: buildItems(),
    customTags: loadTags().definitions,
  };
}

/** 与在线版同签名的异步入口；离线版没有 IO，直接包一层同步实现 */
export async function getMySpace() {
  return getMySpaceSync();
}

/** 拖拽排序：整份覆盖，与在线版语义一致（服务端也不做增量合并） */
export async function updateMySpaceOrder(order: Array<{ id: number; type: string; source: string }>) {
  saveOrder(order);
  return { success: true };
}

/**
 * 自定义标签：definitions（标签本身）与 itemTags（条目→标签 id 列表）一起整份覆盖。
 * 两者必须同写：只写 definitions 会留下指向已删标签的 itemTags，MySpace 侧筛选出空结果。
 */
export async function updateCustomTags(customTags: { definitions: CustomTagDefinition[]; itemTags: Record<string, string[]> }) {
  saveTags({ definitions: customTags.definitions ?? [], itemTags: customTags.itemTags ?? {} });
  return { success: true };
}
