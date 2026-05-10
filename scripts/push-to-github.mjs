#!/usr/bin/env node
/**
 * Push current project state to GitHub via the REST API (Git Data API).
 * Only pushes files tracked in the HEAD git commit — respects .gitignore.
 *
 * Usage: node scripts/push-to-github.mjs
 */

import { readFileSync, statSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const OWNER = "Krunchy-P0tat0";
const REPO = "C-C-clone";
const BRANCH = "main";
const ROOT = process.cwd();

// Additional files to skip even if git-tracked (large artifacts)
const SKIP_FILES = new Set(["zipFile.zip", "pnpm-lock.yaml"]);

if (!TOKEN) {
  console.error("ERROR: GITHUB_PERSONAL_ACCESS_TOKEN is not set.");
  process.exit(1);
}

const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function api(method, path, body) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: HEADERS,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GitHub API ${method} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  return JSON.parse(text);
}

/** Get only files tracked in the current HEAD commit */
function getTrackedFiles() {
  const output = execSync("git ls-tree -r HEAD --name-only", { cwd: ROOT }).toString();
  return output
    .trim()
    .split("\n")
    .filter((f) => f && !SKIP_FILES.has(f.split("/").pop()));
}

/** Create a blob for a file; returns the blob SHA */
async function createBlob(filePath) {
  const content = readFileSync(filePath);
  const b64 = content.toString("base64");
  const blob = await api("POST", "/git/blobs", { content: b64, encoding: "base64" });
  return blob.sha;
}

/** Bootstrap an empty repo with a single initial commit via Contents API */
async function bootstrapEmptyRepo() {
  console.log("  Bootstrapping empty repo with initial commit...");
  const content = Buffer.from("# C-C-clone\n\nAurelia & Co. — Luxury Event Planning\n").toString("base64");
  const result = await api("PUT", "/contents/README.md", {
    message: "chore: initialize repository",
    content,
  });
  return result.commit.sha;
}

async function main() {
  console.log(`\nPushing to https://github.com/${OWNER}/${REPO} (${BRANCH})\n`);

  // 1. Get git-tracked files only
  const files = getTrackedFiles();
  console.log(`Found ${files.length} git-tracked files to push.\n`);

  // 2. Check if remote branch exists
  let parentSha = null;
  try {
    const refData = await api("GET", `/git/ref/heads/${BRANCH}`);
    parentSha = refData.object.sha;
    console.log(`Remote HEAD: ${parentSha}`);
  } catch {
    console.log("Remote branch is empty — will bootstrap.");
    parentSha = await bootstrapEmptyRepo();
    console.log(`  Bootstrap commit: ${parentSha}`);
  }

  // 3. Create blobs for each tracked file
  const treeItems = [];
  let i = 0;
  for (const rel of files) {
    i++;
    const pct = Math.round((i / files.length) * 100);
    const full = join(ROOT, rel);
    let size = 0;
    try { size = statSync(full).size; } catch { /* skip */ }

    if (size > 50 * 1024 * 1024) {
      console.log(`  [${pct}%] skip: ${rel} (> 50 MB)`);
      continue;
    }

    process.stdout.write(`  [${pct}%] ${rel} ... `);
    try {
      const sha = await createBlob(full);
      treeItems.push({ path: rel, mode: "100644", type: "blob", sha });
      console.log("✓");
    } catch (err) {
      console.log(`✗ (${err.message.slice(0, 80)})`);
    }
  }

  // 4. Get parent commit's tree for delta
  const parentCommit = await api("GET", `/git/commits/${parentSha}`);

  // 5. Create the new tree
  console.log("\nCreating tree...");
  const tree = await api("POST", "/git/trees", {
    base_tree: parentCommit.tree.sha,
    tree: treeItems,
  });
  console.log(`Tree SHA: ${tree.sha}`);

  // 6. Get commit message
  let message;
  try {
    message = execSync("git log -1 --pretty=%B", { cwd: ROOT }).toString().trim() || "Sync from Replit";
  } catch {
    message = "Sync from Replit";
  }

  // 7. Create commit
  console.log("Creating commit...");
  const commit = await api("POST", "/git/commits", {
    message,
    tree: tree.sha,
    parents: [parentSha],
    author: {
      name: "Replit Agent",
      email: "agent@replit.com",
      date: new Date().toISOString(),
    },
  });
  console.log(`Commit SHA: ${commit.sha}`);

  // 8. Update the branch ref
  console.log(`Updating refs/heads/${BRANCH}...`);
  await api("PATCH", `/git/refs/heads/${BRANCH}`, { sha: commit.sha, force: true });

  console.log(`\n✓ Done! https://github.com/${OWNER}/${REPO}/tree/${BRANCH}\n`);
}

main().catch((err) => {
  console.error("\n✗ Push failed:", err.message);
  process.exit(1);
});
