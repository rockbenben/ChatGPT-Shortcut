/**
 * The single orchestration entry for build-time generated artifacts. prestart /
 * predev / pretypecheck / prebuild / predeploy are all just one line:
 * `node scripts/generate.mjs [--prod]`.
 *
 * Why this layer exists:
 *   - The generator list used to be copied into all 5 pre* hooks, so adding one
 *     generator meant editing 5 places. We already stepped on that twice this
 *     round (genPromptPages first, then genAntdCss) — a textbook drift breeder.
 *   - Each hook used to chain 3 `node` invocations, so even when every step hit
 *     its fast path you still paid ~537ms of process startup (the whole chain
 *     measured 530ms steady-state). Calling them in sequence inside one process
 *     starts node once.
 *
 * **Every step is skipped based on whether its file exists**, instead of static
 * imports. A static import would make this file crash during module resolution
 * the moment it is cherry-picked to another branch — and the generator sets
 * really do differ per branch:
 *
 *   - speedup/data-retrieval (this branch, the deployed one): the full set. It is
 *     the only branch with genCommunityData（配 plugin-community-pages.js），
 *     即社区提示词全量静态化的数据侧。
 *   - main: has genAntdCss / genPromptPages / genCommunitySnapshot, but **not**
 *     genCommunityData —— 社区提示词详情继续走 ?id= 的 CSR 壳。
 *   - offline (the enterprise intranet build): no genCommunitySnapshot either —
 *     内网构建不联网，社区提示词整块不存在。
 *
 * A missing step logs one line and is skipped, the present ones run as usual, so
 * the same file works on every branch without a per-branch copy.
 *
 * --prod: the community snapshot fetches real data (for build / deploy).
 *   The default is --ensure-only: when the file is absent it only writes an empty
 *   stub and makes no network request, so dev / typecheck on a fresh clone do not
 *   depend on the backend being reachable.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const prod = process.argv.includes("--prod");
const here = path.dirname(fileURLToPath(import.meta.url));
const exists = (file) => fs.existsSync(path.join(here, file));

// Run in-process: pure local computation, saves one node startup each (~179ms)
async function local(file, label) {
  if (!exists(file)) {
    console.log(`[generate] skip ${label} — scripts/${file} not on this branch`);
    return;
  }
  try {
    const mod = await import(pathToFileURL(path.join(here, file)).href);
    await mod.run();
  } catch (e) {
    console.error(`[generate] ${e.message}`);
    process.exit(1);
  }
}

// Network steps run in a child process: they are self-executing scripts with
// retries/timeouts, so isolating them keeps a failure there from taking down the
// generation steps that already succeeded.
function remote(file, label) {
  if (!exists(file)) {
    console.log(`[generate] skip ${label} — scripts/${file} not on this branch`);
    return;
  }
  const r = spawnSync(process.execPath, [path.join(here, file), ...(prod ? [] : ["--ensure-only"])], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

await local("genAntdCss.mjs", "antd-css");
await local("genPromptPages.mjs", "prompt-pages");

remote("genCommunitySnapshot.mjs", "snapshot");

// 社区提示词全量静态化的数据侧：增量抓正文到 src/data/community/。
// 路由那一半在 plugin-community-pages.js 里（构建期直接 addRoute，不生成薄壳文件）。
remote("genCommunityData.mjs", "community-data");
// 选品必须在抓取之后：它读语料算出哪些 id 出静态页（EdgeOne 有 20000 文件上限）
await local("genCommunitySelection.mjs", "community-select");
