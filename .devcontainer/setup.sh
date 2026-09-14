#!/usr/bin/env bash
set -euo pipefail

# Mounted volumes are created root-owned on first container start;
# fix ownership so the non-root "node" user can persist auth.
sudo chown -R node:node /home/node/.claude
sudo chown -R node:node /home/node/.gemini

sudo apt-get update

npm install

# Antigravity CLI (agy) — Google's agentic coding CLI.
curl -fsSL https://antigravity.google/cli/install.sh | bash