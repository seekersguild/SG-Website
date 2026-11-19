// Prints Markdown release notes for a tag, built from the conventional commits
// (feat:, fix:, perf:, ...) since the previous tag. No dependencies.
//
//   node scripts/release-notes.mjs v0.2.0     notes for that tag
//   node scripts/release-notes.mjs HEAD       preview what the next release would say
import { spawnSync } from "node:child_process";

const target = process.argv[2] || "HEAD";
const repo = process.env.GITHUB_REPOSITORY || "seekersguild/SG-Website";
const base = `https://github.com/${repo}`;

function git(...args) {
  const r = spawnSync("git", args, { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : null;
}

// The newest tag before this one; none means this is the first release.
const previous = git("describe", "--tags", "--abbrev=0", "--match", "v*", `${target}^`);
const range = previous ? `${previous}..${target}` : target;

const SEP = "\x1f";
const END = "\x1e";
const log = git("log", "--no-merges", `--format=%H${SEP}%s${SEP}%b${END}`, range) ?? "";

const GROUPS = [
  ["breaking", "Breaking changes"],
  ["feat", "Features"],
  ["fix", "Fixes"],
  ["perf", "Performance"],
  ["refactor", "Refactoring"],
  ["docs", "Documentation"],
  ["other", "Other changes"],
];
const buckets = Object.fromEntries(GROUPS.map(([key]) => [key, []]));

for (const entry of log.split(END)) {
  const [hash, subject, body = ""] = entry.trim().split(SEP);
  if (!hash || !subject) continue;
  const m = subject.match(/^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/);
  const type = m?.[1].toLowerCase();
  if (type === "chore" && m[2] === "release") continue; // the version-bump commit itself
  const text = m ? (m[2] ? `**${m[2]}:** ${m[4]}` : m[4]) : subject;
  const line = `- ${text} ([${hash.slice(0, 7)}](${base}/commit/${hash}))`;
  const breaking = m?.[3] || /^BREAKING CHANGE:/m.test(body);
  const key = breaking ? "breaking" : type && buckets[type] ? type : "other";
  buckets[key].push(line);
}

const out = [];
for (const [key, title] of GROUPS) {
  if (buckets[key].length) out.push(`## ${title}`, "", ...buckets[key], "");
}
if (!out.length) out.push("No changes since the previous release.", "");
out.push(previous ? `**Full changelog:** ${base}/compare/${previous}...${target}` : `**First release.**`);
console.log(out.join("\n"));
