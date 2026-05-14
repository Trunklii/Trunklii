# Midcentury Tonality Migration Log

ブランチ: `feat/midcentury-tonality`
開始日: 2026-05-14

---

## 方針

`nr/` 配下のメイン6ファイル（`index` / `plans` / `plan-detail` / `calendar` / `reservation` / `cancel-policy`）の `<style>` ブロックを直接編集してミッドセンチュリーモダンを適用する。共通CSS化は行わない。

et/ と nr/ は当面別系統で扱う（nr/ 確定後に et/ への横展開を検討）。

---

## 事前調査メモ（参考・将来の共通化判断に使える素材）

### 既存 `assets/common.css` (386行) の退避

クラシック・エディトリアル風の包括的シートで、どのHTMLからも参照されていなかった孤立ファイル。`assets/common.legacy.css` にリネームして退避（`git mv` で履歴保持）。中身要約は `common.legacy.css` 冒頭コメント参照。

### 13ファイル間の `<style>` 比較で判明した構造

et/ と nr/ の同名ページペア6組はすべて byte-identical（プロジェクトルール「et/ と nr/ は同一ファイル」遵守）。

このリポジトリには事実上 **3つの異なるデザインシステム** が混在している：

| グループ | ファイル | 特徴 |
|---|---|---|
| **G1: ルート** | `index.html` | ブランド選択ページ。背景 ink、独自変数 (`--et` / `--nr`) |
| **G2: トップページ** | `et/index.html`（=nr/index.html） | フル装備TOP。透過nav・モーション変数・大型ヒーロー・**白bgフッター** |
| **G3: サブページ群** | `plans` / `plan-detail` / `calendar` / `reservation` / `cancel-policy` の5ページ | 共通ベース＋ページ固有。`.nav-top` 64px・**暗bgフッター**・統一料金区分UI |

→ G2 と G3 で同名セレクタを別定義で持っている箇所が多数。
将来「共通CSSにまとめる」場合は、まずどちらを正にするか決める必要がある。

### 同名セレクタで定義が異なるもの: 22個

複数ファイルに登場するセレクタ45個のうち、22個が定義不一致。
真に byte-identical な共有セレクタは **23個**（共通CSS化の出発点として利用可能）。

| # | セレクタ | バリエーション数 | 主な差 |
|---:|---|---:|---|
| 1 | `:root` | 5 | 変数定義そのものが揃っていない |
| 2 | `body` | 4 | |
| 3 | `.nav` | 3 | G2 vs G3 |
| 4 | `.nav-top` | 2 | 80px(G2) vs 64px(G3) |
| 5 | `.nav-logo` | 2 | G1 vs G2 |
| 6 | `.sec-head` | 2 | margin-bottom差 (plan-detail のみ別値) |
| 7 | `.btn-line` | 3 | G2 内でも3バリエーション |
| 8 | `.more-cta` | 2 | margin-top 2.5rem vs 3rem |
| 9 | `.plans-grid` | 2 | minmax 210px(G2) vs 260px(G3) |
| 10 | `.plan-card` | 2 | レイアウト方針差 |
| 11 | `.plan-tag` | 2 | top位置差 |
| 12 | `.plan-desc` | 2 | font-size .78rem vs .8rem |
| 13 | `.cal-note` | 2 | 完全に別物（アクセントイタリック vs 本文セリフ） |
| 14 | `.lb-close` | 2 | G2 vs G3(plan-detail) |
| 15 | `footer` | 2 | **白bg(G2) vs 暗bg(G3)** — 視覚的に最大の差 |
| 16 | `.footer-logo` | 2 | sans grey vs display italic white |
| 17 | `.footer-links` | 2 | gap差 |
| 18 | `.footer-links a` | 2 | mid vs white |
| 19 | `.footer-links a:hover` | 2 | ink vs white |
| 20 | `.footer-copy` | 2 | letter-spacing/font-size差 |
| 21 | `@media(max-width:560px)` | 5 | 各ファイルで別サブセレクタ定義 |
| 22 | `@media(max-width:700px)` | 4 | 同上 |

---

## デザイントークン（nr/ ミッドセンチュリーモダン版）

PNG ワイヤフレームから抽出した値。承認後に適用。

### カラー

| 用途 | hex |
|---|---|
| 背景クリーム | `#F3EBDD` |
| インク（濃ウォルナット） | `#1F1410` |
| ウォルナット（濃いセクション背景） | `#3D2817` |
| ラスト（テラコッタ） | `#C8553D` |
| オリーブ | `#6B7548` |
| クリームカード | `#E8DCC4` |
| ミッドグレージュ（サブテキスト） | `#8B7E6F` |
| ボーダー | `rgba(31,20,16,.12)` |

### タイポグラフィ

| 用途 | フォント |
|---|---|
| 大見出し（ローマン） | Cormorant Garamond 400 |
| 大見出し（italic） | Cormorant Garamond italic 400/500 |
| 太いラベル・短いCTA | Archivo Black |
| 本文・小UI | Inter 300/400/500 |

---

## ページ別作業ログ

### nr/index.html

#### 2026-05-14 — Phase 1 (土台)
- フォント読み込み: Jost を除去し Archivo Black + Inter を追加 (Cormorant Garamond / Noto Serif JP は維持)
- `:root` を書き換え: `--ink #1F1410` / `--bg #F3EBDD` / `--mid #8B7E6F` / `--accent #C8553D`(rust)
- 新規変数追加: `--walnut #3D2817` / `--olive #6B7548` / `--cream #E8DCC4` / `--footer #1A0F08` / `--label`(Archivo Black)
- `--sans` を Jost → Inter に
- 変数経由でサイト全体のトーンが mid-century パレットに切り替わる

#### 2026-05-14 — Phase 2 (セクション塗り分け)
- インライン `<section>` 8箇所の bg を更新:
  - `#gallery` → walnut / `#kimono` → rust / `#costume` → olive / `#calendar` → walnut
  - `#goods` / `#reservation` / `#qa` / `#recruit` → cream (旧 #f0eee9 ストライプ廃止)
- SECTIONS末尾に暗色背景セクション用の文字色オーバーライド追加
  (sec-num/sec-title/sec-rule、ギャラリーフィルター、カレンダーコピー、コスチュームアイテム)

#### 2026-05-14 — Phase 3 (footer + nav-book CTA)
- `.nav-book`: bg `var(--ink)` → `var(--accent)` (rust)、hover を `var(--walnut)` に
- `footer`: bg `#fff` → `var(--footer)` (#1A0F08)、border-top 撤去、padding 拡張
- `.footer-logo` / `.footer-links a` / `.footer-copy`: cream系の文字色に反転

#### 2026-05-14 — レビュー反映
- `.btn-line` がウォルナット背景で同化 → `#gallery` / `#calendar` 内のbtn-lineをクリーム色に上書き
- Reservation以降5セクションが平坦 → `#cancel-policy` と `#flow` を `var(--cream)` に変更し、bg/cream の交互パターンに
- カレンダー日付が `#calendar{color:--cream}` を継承し白セル上でクリーム化して不可視 → `.cal-top-day` を ink に戻し、`.sun-col` / `.sat-col` / `.holiday` を再宣言。dow/year/月境界もウォルナット向けに微調整

#### 2026-05-14 — パレット拡張・section bg muted 化
- 写真(フラワーブーケ系統)と競合する濃度を避けるため、section bg 専用の muted トーンを新設:
  - `--sec-walnut #4A3D33` / `--sec-rust #9B6B5C` / `--sec-olive #7A8470`
- 4 section の inline bg を新変数に差し替え (gallery/calendar=sec-walnut, kimono=sec-rust, costume=sec-olive)
- 既存の `--walnut` / `--accent` / `--olive` はそのまま (accent 用途 24+5+1 箇所は bold を維持)
- accent パレットに 5色追加: `--accent-teal #7F9E96` / `--accent-wine #7E3F4E` (柄色) / `--accent-indigo #3D5A6E` (藍) / `--accent-mustard #C19440` (山吹) / `--accent-orange #E07A3F`
- 新 accent は変数定義のみ・未使用。今後のスポット適用ポイントを指示待ち

#### 2026-05-14 — accent スポット適用 (γ + δ)
- γ: `.qa-q-mark` の色を `var(--accent)` → `var(--accent-wine)` に (Q&Aの "Q." マーカーを柄色に)
- δ: `.item-price` の色を `var(--accent)` → `var(--accent-orange)` に (goods/costume の価格表記をフレッシュなオレンジに)
- δ補足: `#costume .item-price` の cream override も orange に揃え、sage 背景上で価格がポップに映えるよう統一

#### 2026-05-14 — 残り accent 配置 (indigo / mustard / teal)
- indigo (藍): `.flow-num` 背景 (ink→indigo)、`.flow-step::after` (rust→indigo) → 工程セクションを建築的・冷静に
- mustard (山吹): `.flow-note` color/border/bg (stale gold rgba を mustard rgba に置換)、`.pos-type` color (rust→mustard) → "手書きメモ" 風小ラベル
- teal: `.coming-banner` color (rust→teal)、border (stale gold rgba→teal rgba) → 未公開告知のパティーナ感
- 旧 stale rgba(184,147,90,*) 値は全て新カラーに対応した rgba に置換

#### 2026-05-14 — Plans/Goods 切り返し
- `#goods` の inline bg を `var(--bg)` → `var(--cream)` に変更
- Plans (明クリーム、料金カードが主役) と Goods (やや濃いクリーム、カタログ調) の視覚分離

#### 2026-05-14 — nr の未公開解除 + kimono/costume/goods ダミー写真
- `site-data.js` の `studios.nr.comingSoon: true → false`
  - CTA ボタンが Instagram → 予約URL に切り替わる、Q&Aボット文言も coming-soon用から通常用へ
- `studios.nr.kimono.items`: 空 → 15点 (5カテゴリ×3) のダミーを追加 (et と同じ画像群を再利用)、body も placeholder 文言に
- `studios.nr.costume.items`: 空 → 3点 (Dress A/B/C)、body も更新
- `studios.nr.goods.items`: 空 → 3点 (アルバム/フォトフレーム/データUSB)、body も更新
- 画像は `nr/` フォルダに既に存在するファイル名を使用 (imgPath() 経由で `nr/<file>.jpg` に解決)
- HTML 構造は無変更

#### 2026-05-14 — kim-cat タイトル統合 + カード色調和 (nr 限定)
- `patch-index.js`: `STUDIO_KEY === 'nr'` のときのみ `.kim-cat-title` を `Studio Kimono — <c.sub>` に統合、`.kim-cat-sub` div を出力しない (firstOpt span のみヘッダ内に残る)。et/ は従来通り
- `nr/index.html` の kim-cat CSS を rust 系統に調和: `.kim-cat` bg `#efe9da → #C49989` / `.kim-cat-main` / `.kim-cat-sub-img` bg `#d8cfb8 → #B08574`
- 新背景上で可読性を担保するため `.kim-cat-title` color `#6e5a3a → #3A2A1F`、`.kim-cat-opt` color `#a08e6c → #5A4030`、ヘッダ罫線 `rgba(102,86,55,.25) → rgba(58,42,31,.3)`

#### 2026-05-14 — kimono/costume の本文可読性 + タイトル簡素化
- `.section-body-text` が default `var(--mid)` で kimono/costume の暗色背景に埋もれていた → `#kimono .section-body-text, #costume .section-body-text{color:rgba(255,255,255,.85)}` を追加
- `patch-index.js` の nr 分岐タイトルを `Studio Kimono — <c.sub>` → `<c.sub>` のみに (5カテゴリすべて簡素化)

#### 2026-05-14 — et/ にもタイトル簡素化を反映 (JS のみ)
- `patch-index.js` の STUDIO_KEY 条件分岐を撤去し、et/ と nr/ で共通の出力に統一: `.kim-cat-title` の中身は `c.sub` のみ、`.kim-cat-sub` div は出力しない
- et/ の見た目（背景・カード色）は無変更。タイトル文字列だけ「Studio Kimono」を撤去し、カテゴリ名（例: `3 Year Old Girl`）のみを表示

#### 積み残し (Phase 4 以降で判断)
- Calendar の tier 色 (`#f0c8a0`/`#b8cfe8`/`#f4b0bc`) が walnut 背景上で浮く
- Plans 料金カード差別化 (Standard=rust / Maison=olive)
- Kimono の `.kim-cat` カード背景 `#efe9da` がラスト背景上で薄い

---

## デプロイインフラ

### GitHub Actions プレビュー (2026-05-14)

`.github/workflows/deploy.yml` を追加。GitHub Pages の Source を「Deploy from a branch」から「**GitHub Actions**」に切替えて運用する前提:

- `main` push → サイト全体 (root) を再ビルド・公開
- `feat/**` push → そのブランチのプレビューが `/preview/<branch-slug>/` に出現
- `feat/**` 削除 → 対応プレビューが次の deploy で自動消滅 (workflow が `git fetch --prune` してから現存ブランチのみ再構築する)
- 全プレビュー HTML に `<meta name="robots" content="noindex,nofollow"/>` を自動挿入 (検索エンジン除外)

プレビュー共有URL例: `https://trunklii.github.io/Trunklii/preview/feat-midcentury-tonality/nr/`

---

## ページ別作業ログ (続き)

### nr/index.html

#### 2026-05-14 — 全12セクション暗色化 (about → recruit を6色 × 2ローテーション)
- info zone を含む全12セクション (about / gallery / kimono / costume / plans / goods / calendar / reservation / cancel-policy / qa / flow / recruit) を暗色背景に
- ローテーション (1巡目 about→goods, 2巡目 calendar→recruit):
  - about / calendar → warmblack
  - gallery / reservation → nightwine
  - kimono / cancel-policy → darkbrown
  - costume / qa → ash
  - plans / flow → bordeaux
  - goods / recruit → oak
- 暗色背景上のテキストは cream → **白/グレー系**に統一 (`#fff` / `rgba(255,255,255,...)` 系)。`:is()` で12セクションを一括上書き
- カード類は全て **白** に: `.kim-cat` `#E8DCC4 → #fff`、`.kim-cat-main` / `.kim-cat-sub-img` `#D5C5A5 → #F5F5F5`。plan-card / cal-block / res-block / pos-card は元々 `#fff` で維持
- 各セクション固有の text/border/bg を新たに暗色対応 override 追加:
  - cancel-policy: table の罫線・th・td・1列目を白系に
  - qa: list/item罫線、.qa-q / .qa-toggle / .qa-a の文字を白系に
  - flow: ステップ罫線・コネクタ・.flow-title / .flow-desc を白系に
  - recruit: .recruit-copy 白透過、.pos-list 罫線白系
- `.btn-line` 暗色 hover を12セクション全部で「bg白・文字ink」反転に統一

#### 2026-05-14 — 6色 deep ローテーション v2 (showcase sections all dark) [旧]
- `:root` に6変数追加:
  - `--sec-warmblack #1F130A` / `--sec-nightwine #1C0909` / `--sec-darkbrown #291A13`
  - `--sec-ash #2E2223` / `--sec-bordeaux #301C1C` / `--sec-oak #381B00`
- 6 showcase section の inline bg を新変数に差し替え:
  - gallery→warmblack / kimono→nightwine / costume→darkbrown / **plans→ash** / **goods→bordeaux** / calendar→oak
  - plans と goods が新たに暗色化（料金カード・商品グリッドが浮き上がる "ショーウィンドウ" 演出）
- Dark-section text override を6セクション共通ルールに統合:
  - `#gallery, #kimono, #costume, #plans, #goods, #calendar{color:var(--cream)}` 系
  - 旧 `#kimono, #costume{color:#fff}` の白文字を cream に降ろし、palette と統一
- `.kim-cat` カードを暗背景上で光らせるため cream に変更:
  - `.kim-cat` bg `#C49989 → #E8DCC4` (var(--cream)相当)
  - `.kim-cat-main` / `.kim-cat-sub-img` placeholder `#B08574 → #D5C5A5`
- `#costume .item-name/desc` overrides を `#goods` も含むセレクタに統合 (item-price は orange のまま)
- info zone (about/reservation/cancel-policy/qa/flow/recruit) は cream 系のまま据置 (リズム保持)
