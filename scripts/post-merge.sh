#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter @workspace/db push

# Auto-push to GitHub after every Replit checkpoint
echo "[post-merge] Syncing to GitHub..."
node /home/runner/workspace/scripts/push-to-github.mjs
