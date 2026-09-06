#!/usr/bin/env bash
# Deploys web/ (+ GUIDE.md + research/) to the gh-pages branch without GitHub Actions.
set -euo pipefail
cd "$(dirname "$0")/.."
./scripts/build.sh >/dev/null
TMP=$(mktemp -d)
cp -r web/. "$TMP"/
cp GUIDE.md "$TMP"/GUIDE.md
cp -r research "$TMP"/research
touch "$TMP"/.nojekyll
REMOTE=$(git remote get-url origin)
( cd "$TMP" && git init -q && git checkout -q -b gh-pages && git add -A \
  && git -c user.name="$(git -C "$OLDPWD" config user.name)" -c user.email="$(git -C "$OLDPWD" config user.email)" commit -qm "deploy $(date -u +%FT%TZ)" \
  && git push -q -f "$REMOTE" gh-pages )
rm -rf "$TMP"
echo "deployed to gh-pages"
