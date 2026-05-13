#!/usr/bin/env python3
"""
site-data.js に埋め込まれた base64 画像を実ファイルに抽出する。

- "data:image/...;base64,..." → "img-XXXX.jpg"(ファイル名のみ)に置換
- 画像本体は et/ または nr/ フォルダに保存(SHA256ハッシュをファイル名に)
- 同一画像は重複保存しない
- site-data.js のサイズと差分を大幅に削減
"""

import json
import re
import hashlib
import base64
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent
SITE_DATA = REPO / "site-data.js"

if not SITE_DATA.exists():
    print(f"❌ site-data.js が見つかりません: {SITE_DATA}", file=sys.stderr)
    sys.exit(1)

src = SITE_DATA.read_text(encoding="utf-8")

# "window.SITE_DATA = { ... };" から JSON 部分を抽出
match = re.search(r"window\.SITE_DATA\s*=\s*(\{.*\})\s*;?\s*$", src, re.DOTALL)
if not match:
    print("❌ site-data.js の形式を解析できません", file=sys.stderr)
    sys.exit(1)

try:
    data = json.loads(match.group(1))
except json.JSONDecodeError as e:
    print(f"❌ JSON 解析に失敗: {e}", file=sys.stderr)
    sys.exit(1)

stats = {"saved": 0, "reused": 0, "bytes_reduced": 0}


def b64_to_file(b64_str: str, studio_key: str) -> str:
    """data:image/...;base64,... を実ファイルに保存し、ファイル名(拡張子付き)を返す"""
    m = re.match(r"data:image/([\w+]+);base64,(.+)$", b64_str, re.DOTALL)
    if not m:
        return b64_str

    fmt = m.group(1).lower()
    if fmt == "jpeg":
        ext = "jpg"
    elif fmt == "svg+xml":
        ext = "svg"
    else:
        ext = fmt

    try:
        img_bytes = base64.b64decode(m.group(2))
    except Exception:
        return b64_str

    sha = hashlib.sha256(img_bytes).hexdigest()[:10]
    filename = f"img-{sha}.{ext}"
    out_path = REPO / studio_key / filename

    if not out_path.exists():
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_bytes(img_bytes)
        stats["saved"] += 1
    else:
        stats["reused"] += 1

    stats["bytes_reduced"] += len(b64_str) - len(filename)
    return filename


def is_data_url(v) -> bool:
    return isinstance(v, str) and v.startswith("data:image/")


# 画像が入りうるキー名(参考)
IMG_KEY_HINTS = {"file", "heroImage", "image", "thumbnail", "src"}


def walk(obj, studio_key: str):
    """データ構造を再帰的に走査して base64 を抽出"""
    if isinstance(obj, dict):
        for k in list(obj.keys()):
            v = obj[k]
            if is_data_url(v):
                obj[k] = b64_to_file(v, studio_key)
            elif isinstance(v, (dict, list)):
                walk(v, studio_key)
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            if is_data_url(item):
                obj[i] = b64_to_file(item, studio_key)
            elif isinstance(item, (dict, list)):
                walk(item, studio_key)


studios = data.get("studios", {})
for key in studios:
    walk(studios[key], key)

# 出力(JSON.stringify(D, null, 2) と同じ整形)
out = (
    "// Trunklii — Site Data\n"
    "// CMSで編集してエクスポートし、このファイルを上書きするだけでサイトに反映されます\n"
    "window.SITE_DATA = "
    + json.dumps(data, indent=2, ensure_ascii=False)
    + ";\n"
)
SITE_DATA.write_text(out, encoding="utf-8")

print(f"✓ 新規保存: {stats['saved']} 枚")
print(f"✓ 既存使い回し: {stats['reused']} 枚")
kb = stats["bytes_reduced"] // 1024
print(f"✓ site-data.js を約 {kb} KB 削減")
