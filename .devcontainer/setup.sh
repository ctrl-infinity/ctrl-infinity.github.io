#!/usr/bin/env bash
set -euo pipefail

npm install

# Antigravity CLI (agy) — Google's agentic coding CLI.
curl -fsSL https://antigravity.google/cli/install.sh | bash
