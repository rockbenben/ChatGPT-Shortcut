/**
 * 构建前生成物的唯一编排入口。prestart / predev / pretypecheck / prebuild / predeploy
 * 全部只写一句 `node scripts/generate.mjs [--prod]`。
 *
 * 为什么要有这一层：
 *   - 生成器清单原先在 5 个 pre* 钩子里各抄一遍，加一个生成器要改 5 处。
 *     本轮已经踩过两次（先加 genPromptPages、再加 genAntdCss），是典型的漂移温床。
 *   - 原先每个钩子串起 3 次 `node`，即使全部命中快路径也要白付约 537ms 的进程启动
 *     （实测整条链稳态 530ms）。改为同一进程内顺序调用后只启动一次。
 *
 * **各步骤按文件存在与否自动跳过**，不用静态 import。静态 import 会让本文件一旦被
 * cherry-pick 到别的分支就直接崩在模块解析阶段，而各分支的生成器集合确实不同：
 *
 *   - main（双主题分支）：有 genCommunitySnapshot，无 genAntdCss / genPromptPages。
 *     它不是「缺」genAntdCss 而是**不需要**——main 走 antd 默认 runtime CSS 注入
 *     （不设 zeroRuntime/cssVar），customCss 里没有 antd.dark.css；
 *     且它的 prompt 薄壳是入库的，无需生成。
 *   - offline（企业内网离线版）：scripts/ 下只有 buildPhased 与 i18nLocales，三个都没有。
 *
 * 缺步骤只打一行日志跳过，存在的照常跑——同一份文件在各分支通用，不必各留一版。
 *
 * --prod：社区快照抓真实数据（构建/部署用）。
 *   缺省走 --ensure-only：文件不存在时只写空 stub、不发网络请求，
 *   让 fresh clone 的 dev / typecheck 不依赖后端可用性。
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const prod = process.argv.includes("--prod");
const here = path.dirname(fileURLToPath(import.meta.url));
const exists = (file) => fs.existsSync(path.join(here, file));

// 同进程内跑：纯本地计算，省掉每个一次的 node 启动（约 179ms）
const inProcess = [
  { file: "genAntdCss.mjs", label: "antd-css" },
  { file: "genPromptPages.mjs", label: "prompt-pages" },
];

for (const { file, label } of inProcess) {
  if (!exists(file)) {
    console.log(`[generate] skip ${label} — scripts/${file} 不在本分支`);
    continue;
  }
  try {
    const mod = await import(pathToFileURL(path.join(here, file)).href);
    await mod.run();
  } catch (e) {
    console.error(`[generate] ${e.message}`);
    process.exit(1);
  }
}

// genCommunitySnapshot 走子进程：它是自执行脚本且带网络重试/超时，
// 单独进程能保证它的失败不会牵连已经完成的生成步骤。
const SNAPSHOT = "genCommunitySnapshot.mjs";
if (!exists(SNAPSHOT)) {
  console.log(`[generate] skip snapshot — scripts/${SNAPSHOT} 不在本分支`);
} else {
  const r = spawnSync(process.execPath, [path.join(here, SNAPSHOT), ...(prod ? [] : ["--ensure-only"])], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
