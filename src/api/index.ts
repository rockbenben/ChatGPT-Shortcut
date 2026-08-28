/**
 * API 模块的桶导出 —— 离线版。
 *
 * 与在线版保持同一个模块边界与同名导出，组件层因此完全不用区分两条线。
 * 差别只在实现：这里全部落 localStorage，没有任何网络请求，
 * 认证相关的一整块（登录/注册/改密/OAuth）在离线版不存在，也就不再导出。
 */

// 卡片数据（静态 JSON，两条线共用）
export { fetchCardsByIds, fetchNextCards, searchCardsLocally, SUPPORTED_LANGUAGES } from "./homepage";

// 本地用户资料（离线版没有账号，仅一个显示名）
export { getUserAllInfo, updateUsername } from "./user";

// 会话缓存占位
export { clearUserProfileCache, clearMySpaceCache } from "./sessionCache";

// 提示词
export { getPrompts, submitPrompt, updatePrompt, deletePrompt, getCommPrompts, voteOnUserPrompt, updateCopyCount } from "./prompts";

// 收藏
export { patchFavorites, getFavoritesSnapshot } from "./favorites";
export type { FavoriteDeltaOps, FavoriteFieldOps, FavoriteDeltaResponse, MySpaceShape } from "./favorites";

// MySpace
export { getMySpace, getMySpaceSync, updateMySpaceOrder, updateCustomTags } from "./myspace";

// 本地存储原语（离线版专属，供账户页的导入导出与清除数据直接操作）
export { loadFavorites, saveFavorites, loadPrompts, savePrompts, loadOrder, loadTags, saveTags, clearAll, nextLocalPromptId, getInstanceId } from "./localStore";
export type { LocalPrompt, CustomTagDefinition, CustomTagStore } from "./localStore";
