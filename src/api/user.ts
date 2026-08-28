/**
 * 本地用户资料 —— 离线版没有账号体系，但账户页仍需要一个显示名。
 * 读写走 localStore：那边的 KEY 表是唯一真源，也是「清除数据」清理范围的依据，
 * 在这里另抄一份 key 字面量迟早对不上（清了数据、名字还留着）。
 */
import { loadDisplayName, saveDisplayName } from "./localStore";

const DEFAULT_NAME = "本地用户";

/** 形状对齐在线版 GET /users/me?populate=*：调用方读的是 data.data.username */
export async function getUserAllInfo() {
  return { data: { username: loadDisplayName() || DEFAULT_NAME, email: "", id: 0 } };
}

export async function updateUsername(username: string) {
  saveDisplayName(username);
  return { success: true };
}
