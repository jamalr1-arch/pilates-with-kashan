#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-pilates-with-kashan}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"

if ! command -v git >/dev/null 2>&1; then
  echo "Git is required. Install Xcode Command Line Tools:"
  echo "  xcode-select --install"
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install from https://cli.github.com/"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Log in to GitHub first:"
  echo "  gh auth login"
  exit 1
fi

if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit: Pilates With Kashan website"
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
else
  git branch -M main
  git push -u origin main
fi

echo ""
echo "Done. Enable GitHub Pages:"
echo "  Repo → Settings → Pages → Source: GitHub Actions"
echo "  Live URL: https://$(gh api user -q .login).github.io/${REPO_NAME}/"
