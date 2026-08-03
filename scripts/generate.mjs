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
 *   - main (the dual-theme branch): has genCommunitySnapshot, but no genAntdCss
 *     and no genPromptPages. It does not "lack" genAntdCss, it **does not need**
 *     it — main relies on antd's default runtime CSS injection (no zeroRuntime /
 *     cssVar), so customCss carries no antd.dark.css; and its prompt page shells
 *     are tracked in git, so nothing has to be generated.
 *   - offline (the enterprise intranet build): scripts/ only holds buildPhased
 *     and i18nLocales — none of the three.
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
const inProcess = [
  { file: "genAntdCss.mjs", label: "antd-css" },
  { file: "genPromptPages.mjs", label: "prompt-pages" },
];

for (const { file, label } of inProcess) {
  if (!exists(file)) {
    console.log(`[generate] skip ${label} — scripts/${file} not on this branch`);
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

// genCommunitySnapshot runs in a child process: it is a self-executing script
// with network retries/timeouts, so isolating it keeps a failure there from
// taking down the generation steps that already succeeded.
const SNAPSHOT = "genCommunitySnapshot.mjs";
if (!exists(SNAPSHOT)) {
  console.log(`[generate] skip snapshot — scripts/${SNAPSHOT} not on this branch`);
} else {
  const r = spawnSync(process.execPath, [path.join(here, SNAPSHOT), ...(prod ? [] : ["--ensure-only"])], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
