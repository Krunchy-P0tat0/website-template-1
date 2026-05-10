#!/bin/bash
# Auto-push to GitHub C-C-clone via the GitHub REST API
# Called automatically by Replit's post-merge hook after every checkpoint

set -e

if [ -z "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
  echo "[push-to-github] ERROR: GITHUB_PERSONAL_ACCESS_TOKEN secret is not set."
  exit 1
fi

echo "[push-to-github] Starting push to Krunchy-P0tat0/C-C-clone..."
node /home/runner/workspace/scripts/push-to-github.mjs
