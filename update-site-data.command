#!/bin/bash
# Trunklii: CMSからExportしたsite-data.jsを取り込んでGitHubに反映するスクリプト
# Finder で .command ファイルをダブルクリックして実行

set -e

REPO="/Users/kawashimadsk/Documents/01.Trunklii/99.HP/Trunklii"
DOWNLOADS="$HOME/Downloads"

cd "$REPO"

echo "═══════════════════════════════════════════════"
echo "  Trunklii — CMS 反映スクリプト"
echo "═══════════════════════════════════════════════"
echo ""

# ─── 1. Downloads から最新のsite-data.jsを探す ───
LATEST=$(find "$DOWNLOADS" -maxdepth 1 -name "site-data*.js" -type f -print0 2>/dev/null | xargs -0 ls -t 2>/dev/null | head -n1)

if [ -z "$LATEST" ]; then
  echo "❌ ~/Downloads に site-data.js が見つかりません"
  echo ""
  echo "   先にCMSで Export → ダウンロード してから再実行してください。"
  echo ""
  read -p "Enterキーで閉じます..."
  exit 1
fi

echo "✓ 見つかった: $LATEST"
echo ""

# ─── 2. リポジトリの site-data.js を上書き ───
cp "$LATEST" "$REPO/site-data.js"
echo "✓ リポジトリの site-data.js を更新"
echo ""

# ─── 3. 変更があるか確認 ───
if git diff --quiet site-data.js; then
  echo "ℹ️  変更はありません(同じ内容でした)"
  echo ""
  read -p "Enterキーで閉じます..."
  exit 0
fi

# ─── 4. 念のため最新を取り込む ───
echo "→ origin/main の最新を取り込み中..."
git pull --rebase origin main 2>&1 | sed 's/^/    /'
echo ""

# ─── 5. Commit ───
TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
COMMIT_MSG="CMS: site-data.js を更新 ($TIMESTAMP)"

git add site-data.js
git commit -m "$COMMIT_MSG"
echo "✓ コミット完了"
echo ""

# ─── 6. Push ───
echo "→ GitHub に push 中..."
git push origin main 2>&1 | sed 's/^/    /'
echo ""

# ─── 7. ダウンロードしたファイルを片付ける ───
mv "$LATEST" "$LATEST.applied"
echo "✓ ダウンロードしたファイルを '.applied' に改名(重複防止)"
echo ""

echo "═══════════════════════════════════════════════"
echo "  ✅ 完了!  1〜2分後に GitHub Pages に反映されます"
echo "  https://trunklii.github.io/Trunklii/"
echo "═══════════════════════════════════════════════"
echo ""
read -p "Enterキーで閉じます..."
