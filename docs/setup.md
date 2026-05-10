# Trunklii — 環境構築メモ

## ツール構成
- GitHub → コード管理・バックアップ
- Webflow → ノーコード制作・CMS（構築中）
- Claude → コード生成・AI支援

## サイト構成
- 1サイト・マルチブランド構成
- Studio et. / Maison nr. を1サイトで管理

## Webflowアカウント
- プラン：無料（クライアント受注時にFreelancerへ移行）
- サイト：自社サイト / _SANDBOX

## 現状のファイル構成
- index.html　　トップページ
- cms.html　　　カスタムCMS管理画面
- site-data.js　全データ（JSON）
- et/　　　　　 Studio et. ページ群
- nr/　　　　　 Maison nr. ページ群
- assets/　　　 画像等

## 移行方針
- 現行：GitHub Pages（反映が遅い）
- 移行先：Webflow Hosting（Publishで即時反映）
- 時期：ページ構成確定後

## 進行状況
- [x] Webflowアカウント作成
- [x] GitHubリポジトリ整理
- [ ] ページ構成確定
- [ ] Webflow CMS設計
- [ ] データ移行
- [ ] Webflow Hosting切り替え

# 引き継ぎメモ

---

## 【引き継ぎメモ】Trunklii — 開発環境構築
**更新日：2025年5月10日**

---

### プロジェクト概要
- **サービスA**：受注Web制作
- **サービスB**：CMS運用支援（月次）
- **サービスC**：保守・改善提案

---

### ツール構成
| ツール | 用途 | 状態 |
|---|---|---|
| GitHub | コード管理・バックアップ | ✅ 整備完了 |
| Webflow | ノーコード制作・CMS | 🔄 アカウント作成済・構築中 |
| Claude | コード生成・AI支援 | ⬜ 未設定 |

---

### サイト構成方針
- **現行**：HTML/CSS/JS + カスタムCMS（`cms.html` + `site-data.js`）→ GitHub Pages
- **移行先**：Webflow Hosting（1サイト・マルチブランド構成）
- **理由**：GitHub push後の反映遅延を解消 → Publishボタンで即時反映

---

### Webflow構成
```
Workspace
├── 自社サイト（構築中）
└── _SANDBOX（検証用）
```
- プラン：無料（クライアント受注時にFreelancerへ移行）
- 構成：1サイトでStudio et. / Maison nr. を管理

---

### GitHubリポジトリ構成
```
Trunklii/
├── et/            Studio et. ページ群
├── nr/            Maison nr. ページ群
├── assets/        画像等
├── index.html     トップページ
├── cms.html       カスタムCMS管理画面
├── site-data.js   全データ（JSON）
├── docs/
│   └── setup.md   環境構築メモ
└── README.md
```

---

### Webflow CMS設計方針（未着手）
```
Collections（予定）
├── Studios          ← et. / nr. のマスター
├── Gallery Items
├── Kimono Items
├── Costume Items
├── Plans
├── Goods
├── Flow Steps
├── Q&A
├── Recruit Positions
└── Cancel Policy
```
※ページ構成確定後に着手

---

### 進行状況
- [x] Webflowアカウント作成
- [x] Webflowサイト作成（自社・SANDBOX）
- [x] GitHubリポジトリ整理
- [x] docs/setup.md 作成・push
- [ ] ページ構成の確定
- [ ] Webflow Designer基本操作
- [ ] Webflow CMS設計・構築
- [ ] データ移行（site-data.js → Webflow CMS）
- [ ] Webflow Hosting切り替え（ドメイン設定）
- [ ] Claude APIワークフロー設定

---

### 次のステップ候補
1. **ページ構成を整理する**（手戻りを減らす・推奨）
2. **Webflow Designer基本操作**（感覚を掴む）
3. **Claude APIワークフロー設定**（AI支援環境を整える）

---

このメモを `docs/setup.md` に追記しておくことをおすすめします。次回はここから再開できます。
