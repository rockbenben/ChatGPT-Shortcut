/**
 * 离线版的数据底座 —— 所有持久化都落在 localStorage，没有任何网络请求。
 *
 * 为什么保留 src/api 这个模块边界而不是改调用方：在线版的组件全部 `import … from "@site/src/api"`，
 * 把实现换掉、接口形状不动，两条线的组件代码就能保持一致，以后同步只是普通合并。
 * 反过来若逐个改调用方的 import，每次同步都要重新处理一遍冲突。
 *
 * 四个 key 与旧离线版**完全一致**，不能改名 —— 改了等于让现有用户的收藏、自建提示词、
 * 排序和标签全部凭空消失，而且没有任何报错。
 */
const KEY = {
  favorites: "local_favorites", // number[]：收藏的精选卡片 id
  prompts: "local_user_prompts", // 自建提示词对象数组
  order: "local_myspace_order", // MySpace 手工排序
  tags: "local_custom_tags", // 自定义标签：{ definitions, itemTags }
  // 本地昵称。它比上面四个晚出现，不属于「与旧离线版一致」的约定，但同样归 clearAll 管：
  // 按钮写的是 Delete all local data，留下用户起的名字就不叫 all（换手/交还设备时也是条尾巴）。
  displayName: "local_display_name",
  // 本浏览器的实例标识，写进导出文件，用来判断「这份文件是不是我自己导出的」。见 getInstanceId。
  instanceId: "local_instance_id",
} as const;

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

/** localStorage 在无痕模式/禁用站点数据时会抛异常，读写一律吞掉，退化成「这次没存上」而不是整页崩 */
function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 配额满或被禁用：静默失败，UI 已经乐观更新过 */
  }
}

export interface LocalPrompt {
  id: number;
  title: string;
  description: string;
  remark?: string;
  notes?: string;
  share?: boolean;
  updatedAt?: string;
  createdAt?: string;
  copyCount?: number;
}

export interface CustomTagDefinition {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface CustomTagStore {
  definitions: CustomTagDefinition[];
  itemTags: Record<string, string[]>;
}

export const loadFavorites = (): number[] => readJson<number[]>(KEY.favorites, []);
export const saveFavorites = (ids: number[]): void => writeJson(KEY.favorites, ids);

export const loadPrompts = (): LocalPrompt[] => readJson<LocalPrompt[]>(KEY.prompts, []);
export const savePrompts = (list: LocalPrompt[]): void => writeJson(KEY.prompts, list);

/**
 * 旧离线版遗留格式的读侧归一化。两处形状对不上，不处理的话老用户升级后是**静默丢数据**：
 *
 *  - itemTags 的键：旧版用 MySpace 的复合 id（`favorite_card_2`、`prompt_prompt_<id>`），
 *    本版用纯数字 id。不转换 → 标签定义还在，但每一条「条目→标签」的关联全部消失。
 *  - order 里提示词的 source：旧版写 "prompt"，本版按 "userprompt" 查。
 *    不转换 → 收藏的次序还在，自建提示词全被甩到列表末尾。
 *
 * 放在读侧而不是写一次性迁移：靠形状判断、天然幂等，不需要版本号，也没有「迁移跑没跑过」
 * 这种需要维护的状态；转换后的值随下一次正常写盘自然落成新格式。
 */
const LEGACY_COMPOSITE_KEY = /^(?:favorite|prompt)_[a-z]+_(-?\d+)$/;

function normalizeItemTags(raw: Record<string, string[]>): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(raw || {})) {
    const m = LEGACY_COMPOSITE_KEY.exec(k);
    const key = m ? m[1] : k;
    // 取并集而非覆盖：旧版提示词 id 是 Date.now()、与卡片 id 不可能撞，
    // 所以这里实际不会合并到一起；真撞上时并集也不丢任何一边的标签。
    out[key] = out[key] ? [...new Set([...out[key], ...v])] : v;
  }
  return out;
}

export const loadOrder = (): Array<{ id: number; type: string; source: string }> =>
  readJson<Array<{ id: number; type: string; source: string }>>(KEY.order, []).map((o) => (o?.source === "prompt" ? { ...o, source: "userprompt" } : o));
export const saveOrder = (order: Array<{ id: number; type: string; source: string }>): void => writeJson(KEY.order, order);

export const loadTags = (): CustomTagStore => {
  const raw = readJson<CustomTagStore>(KEY.tags, { definitions: [], itemTags: {} });
  return { definitions: raw.definitions ?? [], itemTags: normalizeItemTags(raw.itemTags) };
};
export const saveTags = (tags: CustomTagStore): void => writeJson(KEY.tags, tags);

/**
 * 本浏览器的实例标识，首次用到时生成并固化。
 *
 * 用途只有一个：导入时判断「这份文件是不是本机导出的」。自建提示词的 id 是本机发的负时间戳，
 * 在**自己的**备份里它确实唯一标识一条提示词，可以按 id 原地更新 —— 这才是真正的备份恢复
 * （改过内容也能还原，两条同名的也不会互相吞）。但换成别人的文件，同一个 id 在本机指向的是
 * 完全不同的东西，按 id 更新就是覆盖别人…不，是覆盖**自己**的数据。
 *
 * 负时间戳已经让跨机撞号极不可能，但「极不可能」+「撞上就静默覆盖」仍是不能接受的组合；
 * 有确定信号可用时就不该靠概率。文件里没有 instanceId（旧版导出、手工拼的）一律按外来文件
 * 处理 —— 只新建、不覆盖，是安全的那一边。
 */
export function getInstanceId(): string {
  if (!isBrowser()) return "";
  try {
    let id = localStorage.getItem(KEY.instanceId);
    if (!id) {
      id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(KEY.instanceId, id);
    }
    return id;
  } catch {
    // 无痕模式：拿不到也存不下。返回空串，导入侧会把任何文件都当外来文件（保守但安全）。
    return "";
  }
}

/** 本地昵称：与四个数据 key 同一套读写，避免 user.ts 再抄一份 key 字面量 */
export const loadDisplayName = (): string => {
  if (!isBrowser()) return "";
  try {
    return localStorage.getItem(KEY.displayName) || "";
  } catch {
    return "";
  }
};
export const saveDisplayName = (name: string): void => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(KEY.displayName, name);
  } catch {
    /* 同上 */
  }
};

/** 清空全部离线数据（账户页的「清除数据」用） */
export function clearAll(): void {
  if (!isBrowser()) return;
  for (const k of Object.values(KEY)) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* 同上 */
    }
  }
}

/**
 * 自建提示词的 id：负的时间戳。两个约束缺一不可。
 *
 * **为什么是负数**：精选卡片的 id 来自 src/data（正整数），社区提示词也是正整数。离线版
 * 没有服务端发号，若自建提示词也用正数，迟早和某张精选卡片撞号 —— 撞上之后 MySpace 里
 * 两条目会被当成同一个（items 用 id+source 定位，但收藏推导 deriveLoves 只看 id），
 * 表现为收藏一张卡片导致自建提示词消失。负数区间与两者天然不相交。
 *
 * **为什么是时间戳而不是 min-1 的顺序号**：顺序号在单机内没问题，但每个浏览器都从 -1 开始，
 * 两个人的第一条提示词都叫 -1 —— 而导出文件里带着 id，一旦跨用户传递（部署文档推荐的
 * 「一人导出、其他成员导入」），这个 id 就是错的身份。导入侧现在按标题去重、永不覆盖，
 * 已经堵死了数据丢失；但排序表 myspaceOrder 仍以 id 定位，A 的 -1 在 B 这里指向 B 自己的
 * 条目，会让名次错位。负时间戳让跨机撞号基本不可能，从源头消掉这层歧义。
 *
 * **为什么还要 while 去重**：submitPrompt 的「读列表 → 算 id → 写回」中间没有 await，
 * 对事件循环是原子的，所以导入时并发建多条不会互相覆盖 —— 但它们会落在同一毫秒里拿到
 * 同一个 -Date.now()。撞上就往下顺延，保证本机列表内唯一。
 */
export function nextLocalPromptId(list: LocalPrompt[]): number {
  const used = new Set(list.map((p) => p.id));
  let id = -Date.now();
  while (used.has(id)) id -= 1;
  return id;
}

/**
 * 把四个 key 拼成在线版 /myspace 的 items 形状。
 *
 * 顺序按 local_myspace_order 还原：排序里有的先出、且保持其相对次序，
 * 排序里没有的（新增但还没拖过）接在后面。这样新增条目不会因为不在排序表里而消失。
 */
export function buildItems(): Array<{ id: number; type: "favorite" | "prompt"; source: "card" | "userprompt"; updatedAt?: string; share?: boolean; tags?: string[] }> {
  const favorites = loadFavorites();
  const prompts = loadPrompts();
  const { itemTags } = loadTags();

  const items = [
    ...favorites.map((id) => ({ id, type: "favorite" as const, source: "card" as const })),
    ...prompts.map((p) => ({
      id: p.id,
      type: "prompt" as const,
      source: "userprompt" as const,
      updatedAt: p.updatedAt,
      share: p.share ?? false,
    })),
  ].map((item) => {
    const tags = itemTags[String(item.id)];
    return tags?.length ? { ...item, tags } : item;
  });

  const order = loadOrder();
  if (!order.length) return items;

  const rank = new Map(order.map((o, i) => [`${o.source}:${o.id}`, i]));
  const keyOf = (it: { id: number; source: string }) => `${it.source}:${it.id}`;
  return [...items].sort((a, b) => {
    const ra = rank.has(keyOf(a)) ? rank.get(keyOf(a))! : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(keyOf(b)) ? rank.get(keyOf(b))! : Number.MAX_SAFE_INTEGER;
    return ra - rb;
  });
}
