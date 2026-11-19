// Runs before `npm run release:*` bumps the version: refuse to cut a release from
// anywhere but a clean, type-checked main. Plain Node so it works in any shell.
import { spawnSync } from "node:child_process";

const run = (cmd, args) => spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32" });
const fail = (msg) => {
  console.error(`\nRelease stopped: ${msg}\n`);
  process.exit(1);
};

const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim();
if (branch !== "main") fail(`you are on "${branch}". Merge into main, check out main, then release.`);

if (run("git", ["status", "--porcelain"]).stdout.trim()) fail("there are uncommitted changes. Commit or stash them first.");

run("git", ["fetch", "origin", "main", "--quiet"]);
const behind = run("git", ["rev-list", "--count", "HEAD..origin/main"]).stdout.trim();
if (behind && behind !== "0") fail(`main is ${behind} commit(s) behind origin/main. Pull first.`);

if (run("npm", ["run", "lint", "--silent"]).status !== 0) fail("the type check failed (npm run lint).");

console.log("Release checks passed.");
