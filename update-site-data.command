#!/bin/bash
# Trunklii: CMSからExportしたsite-data.jsを取り込んでGitHubに反映するスクリプト
# Finder で .command ファイルをダブルクリックして実行
# site-data.js が無くても、他に変更があれば全部 push する

set -e

REPO="/Users/kawashimadsk/Documents/01.Trunklii/99.HP/Trunklii"
DOWNLOADS="$REPO"

cd "$REPO"

echo "═══════════════════════════════════════════════"
echo "  Trunklii — CMS 反映スクリプト"
echo "═══════════════════════════════════════════════"
echo ""

# ─── 1. Downloads から最新のsite-data.jsを探す(任意) ───
LATEST=$(find "$DOWNLOADS" -maxdepth 1 -name "site-data*.js" -type f -not -name "*.applied" -newer "$REPO/site-data.js" -print0 2>/dev/null | xargs -0 ls -t 2>/dev/null | head -n1)

if [ -n "$LATEST" ] && [ "$LATEST" != "$REPO/site-data.js" ]; then
  cp "$LATEST" "$REPO/site-data.js"
  echo "✓ ダウンロード版を取り込み: $(basename "$LATEST")"
  echo ""
  # base64画像を実ファイルに抽出
  if command -v python3 >/dev/null 2>&1 && [ -f "$REPO/extract-images.py" ]; then
    echo "→ 埋め込み画像を実ファイルに抽出中..."
    python3 "$REPO/extract-images.py" | sed 's/^/    /'
    echo ""
  fi
  # 適用済みファイルは改名(次回の混乱を防止)
  if [ "$LATEST" != "$REPO/site-data.js" ]; then
    mv "$LATEST" "$LATEST.applied"
    echo "✓ ダウンロード元を '.applied' に改名"
    echo ""
  fi
else
  echo "ℹ️  ダウンロード版の site-data.js は見つかりませんでした(既存ファイルのみ確認)"
  echo ""
fi

# ─── 2. 全変更を確認 ───
echo "═══════════════════════════════════════════════"
echo "  変更されているファイル"
echo "═══════════════════════════════════════════════"
git status --short
echo ""

# 変更ゼロなら終了
if git diff --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "ℹ️  変更はありません(同期済み)"
  echo ""
  read -p "Enterキーで閉じます..."
  exit 0
fi

# ─── 3. リモートの最新を取り込み ───
echo "→ origin/main の最新を取り込み中..."
if ! git pull --rebase origin main 2>&1 | sed 's/^/    /'; then
  echo ""
  echo "❌ pull に失敗しました。手動で確認してください。"
  read -p "Enterキーで閉じます..."
  exit 1
fi
echo ""

# ─── 4. すべての変更をステージング(.DS_Store等はgitignoreで除外済み) ───
git add -A

# ステージング後の状態を表示
STAGED_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
echo "→ ${STAGED_COUNT} 件のファイルをステージング:"
git diff --cached --name-only | sed 's/^/    /'
echo ""

if [ "$STAGED_COUNT" = "0" ]; then
  echo "ℹ️  ステージングする変更がありません"
  read -p "Enterキーで閉じます..."
  exit 0
fi

# ─── 5. Commit ───
TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
# site-data.js が変更されたかでメッセージを切り替え
if git diff --cached --name-only | grep -q "^site-data.js$"; then
  COMMIT_MSG="CMS: site-data.js + ${STAGED_COUNT}件のファイル更新 ($TIMESTAMP)"
else
  COMMIT_MSG="更新: ${STAGED_COUNT}件のファイル ($TIMESTAMP)"
fi

git commit -m "$COMMIT_MSG"
echo "✓ コミット完了: $COMMIT_MSG"
echo ""

# ─── 6. Push ───
echo "→ GitHub に push 中..."
if ! git push origin main 2>&1 | sed 's/^/    /'; then
  echo ""
  echo "❌ push に失敗しました。"
  echo "   ネットワーク・認証を確認してから再実行してください。"
  read -p "Enterキーで閉じます..."
  exit 1
fi
echo ""

echo "═══════════════════════════════════════════════"
echo "  ✅ 完了!  1〜2分後に GitHub Pages に反映されます"
echo "  https://trunklii.github.io/Trunklii/"
echo "═══════════════════════════════════════════════"
echo ""
read -p "Enterキーで閉じます..."
