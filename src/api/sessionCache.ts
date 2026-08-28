/**
 * 在线版这里清的是 /myspace 与用户资料的会话级缓存（配合 ETag 条件请求）。
 * 离线版数据直接读 localStorage，没有中间缓存层，这两个入口保留为空操作 ——
 * 删掉它们就要改 AuthContext 与账户页的调用点，两条线的组件会因此分叉。
 */
export function clearUserProfileCache(): void {}
export function clearMySpaceCache(): void {}
