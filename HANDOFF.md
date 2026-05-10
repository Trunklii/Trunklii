# Trunklii Website — 引き継ぎメモ

> 最終更新: 2026-05-10
> プロジェクト: Studio et. / Maison nr. の親ブランド「Trunklii」公式サイト構築

---

## 🎯 プロジェクト概要

### ブランド構造
- **Trunklii** = 親ブランド（東京の写真スタジオ運営）
- **Studio et.** = 既存スタジオ（Instagram約1300フォロワー、稼働中）
- **Maison nr.** = 姉妹スタジオ（Coming Soon、準備中）

### サイト構造（決定済み）
```
trunklii.com           → 親ブランドLP（スプリット画面 et./nr.）
et.trunklii.com        → Studio et.（メインサイト）
nr.trunklii.com        → Maison nr.（同一テンプレート、JS path-detect）
```

### デザイン方針
**Maison Kitsuné寄り** のミニマル・上品なデザイン
- フォント: Jost (sans) + Cormorant Garamond italic (display) + Noto Serif JP (serif)
- カラー: ベージュ系（#f8f6f2）背景＋黒(#111010)＋アクセント色
- アクセント: et. = #b8935a（ゴールド）/ nr. = #7a9e95（モスグリーン）

---

## 📁 ファイル構成

```
trunklii/
├── index.html              ← LP（スプリット画面）
├── site-data.js            ← 全コンテンツデータ（CMSの編集対象）
├── cms.html                ← 統合CMS（両スタジオ管理）
├── assets/                 ← SVGロゴ
│   ├── et-square.svg
│   ├── et-wide.svg
│   ├── nr-square.svg
│   ├── nr-wide.svg
│   └── trunklii-wide.svg
├── et/
│   ├── index.html          ← Studio et.のサイト
│   └── *.jpg (20枚)        ← 写真素材
└── nr/
    ├── index.html          ← Maison nr.のサイト（et/と同一ファイル）
    └── *.jpg (20枚)
```

**重要**: et/index.html と nr/index.html は**完全に同じファイル**。
JS内の `STUDIO_KEY = location.pathname.includes('/nr/') ? 'nr' : 'et'` で動的に切り替え。
変更時は両方に同期必須（`cp et/index.html nr/index.html`）。

---

## 🛠 技術スタック

- **静的HTML/CSS/JS**（フレームワーク不使用）
- **GitHub Pages**でホスティング
- **GitHub Desktop**でデプロイ（commit→push）
- データはJS変数 `window.SITE_DATA` で管理（site-data.js）
- 画像はBase64 dataURL でも通常のファイルパスでもOK（CMSアップロード時は自動的にBase64化）

---

## 📋 実装済み機能

### サイト機能
- [x] LP（trunklii.com）スプリット画面、ホバーエフェクト
- [x] スタジオサイト（et./nr.共通テンプレート）
- [x] ヒーロースライドショー（自動切替・ドット操作）
- [x] ブランドタブナビ（et./nr.切替、アクティブ表示）
- [x] PCメインナビ：13項目フロート＋ドロップダウン
- [x] スマホハンバーガーメニュー：et./nr.切替＋TOP＋全メニュー
- [x] スクロール時もナビ常時表示
- [x] サイト内検索（全セクション横断、カテゴリグルーピング）
- [x] Q&Aポップアップbot（右下フローティング、よくある質問5件提示）
- [x] フォト lightbox（キーボード操作対応）
- [x] ギャラリーカテゴリフィルター
- [x] Coming Soon表示モード（nr.用）
- [x] スタジオごとのアクセントカラー動的切替

### セクション構成（順序）
1. About
2. Gallery（フィルター付き：753 / Newborn / Birthday / Family / Maternity）
3. Kimono
4. Costume
5. Plans
6. Goods
7. Calendar（埋め込みURL設定可）
8. Reservation（フォームURL埋め込み可）
9. Cancel Policy（料金表）
10. Q&A（アコーディオン）
11. Flow（撮影までの流れ：5ステップ）
12. Recruit（NEWバッジ・アクセントカラー）
13. （CTA：予約する）

### ヘッダーアイコン（PC・スマホ共通）
正方形枠線で統一：
- 🔍 検索（オーバーレイ式モーダル）
- 📍 Access（Googleマップへ外部リンク）
- 📷 Instagram（外部リンク）

### CMS機能（cms.html）
全セクション編集可能：
- Global Settings（ブランド名・Copyright）
- Basic Info（基本情報・各種URL・アクセントカラー・Coming Soonトグル）
- Hero Images（3枚スライド、画像アップロード）
- About（見出し・本文・画像）
- Gallery（画像複数アップロード・カテゴリ・キャプション）
- Kimono / Costume（画像・名前・説明）
- Plans（プラン・価格・タグ・並び替え）
- Goods（商品・価格・説明）
- Calendar（埋め込みURL）
- Reservation（フォームURL）
- Cancel Policy（料金表 時期×料金）
- Q&A（質問・回答・並び替え／ボットには上から5件表示）
- Flow（ステップ・補足・並び替え）
- Recruit（ポジション・問い合わせメール）
- CTA / Booking（見出し・サブテキスト）
- Export → site-data.js ダウンロード

CMS で編集 → Export でダウンロード → site-data.js 上書き → GitHub push でサイト更新

---

## 🔑 重要な設定値

### et.（Studio et.）
- Instagram: `https://www.instagram.com/studio_et._`
- ハンドル: `@studio_et._`
- マップURL: `https://share.google/THZQdcV3rf6L3IJEN`
- 予約URL: `https://et.trunklii.com/reservation`
- アクセント: `#b8935a`

### nr.（Maison nr.）
- Instagram: `https://www.instagram.com/maison_nr._`
- ハンドル: `@maison_nr._`
- マップURL: `https://maps.app.goo.gl/itQNLUzV7xRpjfze6`
- 予約URL: `https://nr.trunklii.com/reservation`
- アクセント: `#7a9e95`
- Coming Soon: true

---

## 🚀 GitHub / デプロイ状況

### 完了済み
- [x] GitHubアカウント作成
- [x] Gitインストール（Xcode Command Line Tools経由）
- [x] GitHub Desktop インストール・サインイン
- [x] リポジトリ `studio-et` 作成
- [x] GitHub Pages 有効化（`https://ユーザー名.github.io/studio-et/` で公開中）

### 未完了（ユーザー次のタスク）
- [ ] **カスタムドメイン設定**（Google Domains側）
  - et.trunklii.com → GitHub Pages
  - nr.trunklii.com → GitHub Pages
  - trunklii.com → GitHub Pages
  - 手順：DNS で CNAME レコードを追加 + GitHub Pages 設定でカスタムドメイン入力
- [ ] リポジトリ名を `trunklii` に変更検討（現在 `studio-et`）

### バックアップ戦略
- GitHub（プライマリ）
- Google Drive 月次コピー（推奨）

### ローカル作業ディレクトリ
`/Users/kawashimadsk/Documents/01.Trunklii/99.HP/Trunklii/`

---

## 🔄 更新ワークフロー（確立済み）

```
チャットで「ここを変えて」依頼
   ↓
Claude が更新ファイル生成（ZIP）
   ↓
ユーザーがダウンロード・解凍
   ↓
GitHub Desktop フォルダにファイルコピー（既存を上書き）
   ↓
GitHub Desktop: Commit → Push（2クリック）
   ↓
サイト自動更新（約30秒）
```

### CMSでコンテンツのみ変更する場合
```
cms.html を開く
   ↓
編集
   ↓
Export → site-data.js ダウンロード
   ↓
既存の site-data.js を上書き
   ↓
GitHub Desktop で push
```

---

## 📝 ユーザー情報

- **ユーザー**: kawashimadsk
- **使用OS**: macOS（macOS 26 betaを使用、Xcode CLT経由でGitインストール）
- **スキルレベル**: GitHub・コマンドライン初心者 → 段階的に習熟中
- **対応の傾向**: 視覚的なリファレンス（画像）でデザイン指示することが多い
- **連絡言語**: 日本語

---

## ⚠️ 既知の注意点・引っかかりポイント

### 1. ファイル配置ミスが起きやすい
過去にZIP解凍時、`/mnt/user-data/outputs/` のフルパスフォルダがそのまま展開されてしまう事故あり。
解凍後は **`trunklii/` フォルダの中身**を作業フォルダに置く必要がある。

### 2. et/ と nr/ の同期忘れ
2つのindex.htmlは同じ内容にする必要がある。修正時は必ず `cp` で同期。

### 3. SVGロゴはfetch()で読み込み
ローカルでファイルを開く（file://）と CORS でロゴが読み込めない場合がある。
GitHub Pages 上では問題なし。ローカル確認時はLive Serverなど推奨。

### 4. 画像Base64化でファイルサイズ増
CMSで画像アップロードするとBase64でsite-data.jsに埋め込まれる。
画像が増えるとsite-data.jsが巨大化するので、本番では `et/*.jpg` のような通常パスでの参照を推奨。

### 5. リポジトリ名とサブドメイン
現在 `studio-et` リポジトリ名のまま。trunklii構成に合わせるなら `trunklii` にリネーム推奨。

---

## 💬 これまでの主なやり取り

### Phase 1: 初期構築
- 既存のGoogleサイト（et.trunklii.com）を置き換える形で構築
- 親ブランド + 2スタジオの3サイト構成を決定
- Maison Kitsuné風デザインに統一

### Phase 2: ナビ・デザイン改善
- PCナビをフロート＋ドロップダウンに
- スマホハンバーガーメニュー実装
- スクロール時もナビ表示

### Phase 3: コンテンツ拡充
- Flowセクション追加（撮影までの流れ）
- アクセス・Instagramリンク修正
- ロゴSVG生成

### Phase 4: 機能拡張
- 新ページ追加：Calendar / Reservation / Cancel Policy / Goods / Q&A
- サイト内検索実装
- Q&Aポップアップbot実装
- ヘッダーアイコン四角枠で統一

### Phase 5: ハンバーガーメニュー調整
- TOP/et./nr.の3タブ → et./nr.の2タブ＋メニュー内にTOP追加
- タブをイタリックセリフ体（Maison Kitsuné風）に変更

---

## 🎁 次セッション向けクイックスタート

1. `/mnt/user-data/outputs/trunklii/` の現状ファイル群を確認
2. ユーザーの依頼内容に応じて：
   - **コンテンツ変更** → site-data.js を編集
   - **デザイン変更** → et/index.html のCSS/HTMLを編集 → nr/index.htmlにコピー
   - **CMS機能追加** → cms.html を編集
   - **新機能追加** → 必要に応じてsite-data.js + et/index.html + cms.html の3点同期
3. ZIP化して `trunklii-vX.zip` として `present_files` で渡す
4. ユーザーは GitHub Desktop で push して反映

### 最新ZIPバージョン
最終バージョン: `trunklii-v3-1.zip`（ハンバーガーメニュー2タブ構成）

---

## 📌 残タスク / 未対応事項

- [ ] 独自ドメイン（trunklii.com / et.trunklii.com / nr.trunklii.com）設定
- [ ] 既存のGoogleサイトからの本番切り替えタイミング決定
- [ ] 実際のスタジオ住所・電話番号の本番データ入力
- [ ] Instagram連携の本番化（現在はリンクのみ）
- [ ] 予約システム連携（STORES予約 / Squarespace等の検討）
- [ ] Google Calendar 埋め込みURL取得・設定
- [ ] OGP画像・favicon設定
- [ ] アクセス解析（Google Analytics）設置
- [ ] サイトマップ・robots.txt
- [ ] スマホ実機での最終チェック
