# 写真ファイル名の命名規則(SEO/MEO)

画像ファイル名は Google 画像検索の理解対象になるため、内容と地域が伝わる名前を付ける。
**Instagram の ID(例 `18124988209786766.jpg`)やカメラ連番のまま公開しない。**

## 規則

```
【被写体】-【属性】-【店舗+地域】-【連番2桁】.jpg
```

| 例 | 意味 |
|---|---|
| `shichigosan-girl-family-studio-et-hashima-01.jpg` | 七五三・女の子・家族撮影・羽島 |
| `half-birthday-studio-et-hashima-03.jpg` | ハーフバースデー・羽島 |
| `kimono-3yo-girl-studio-et-hashima-05.jpg` | 三歳女の子の着物・羽島 |
| `omairi-kimono-7yo-girl-studio-et-hashima-02.jpg` | お詣り着物・七歳女の子・羽島 |
| `studio-et-hashima-hero-sp-04.jpg` | ヒーロー画像(スマホ用)4枚目 |

### 店舗スラッグ(地域キーワードを必ず含める)
- Studio et. → `studio-et-hashima`
- Maison nr. → `maison-nr-kasugai`

### 被写体スラッグ(ギャラリー)
`shichigosan` / `omiyamairi-newborn` / `100days-celebration` / `birthday` /
`half-birthday` / `half-coming-of-age` / `school-entrance` / `maternity` /
`coming-of-age` / `furisode-kimono` / `event` / `photo`(その他)

属性として `girl` / `boy` / `family` を主題の直後に付ける。

### 着物スラッグ
`kimono-{3yo|5yo|7yo|10yo}-{girl|boy}` / `kimono-omiyamairi`
お詣り着物は先頭に `omairi-` を付ける。

## ツール

```bash
# 新しい写真を規則どおりの名前で追加(site-data.js も自動更新)
python3 tools/rename-photo.py --studio et --category 753girl --family new1.jpg new2.jpg
python3 tools/rename-photo.py --studio et --kimono 3y-girl kimono1.jpg

# 既存画像を一括で規則に正規化(HTML/sitemap の参照も追従)
python3 tools/rename-photo.py --normalize-all

# 命名だけ確認(変更しない)
python3 tools/rename-photo.py --normalize-all --dry-run

# 参照切れチェック
python3 tools/rename-photo.py --verify
```

## 注意

- 複数箇所から同じ画像を参照している場合(プランのヒーローとギャラリー等)、
  リネームは**1つの新名に統一**され、全参照が追従する。
- alt 属性は `galleryAlt()` が自動生成する(例:「七五三の記念写真（女の子）｜Studio et. 岐阜県羽島市のフォトスタジオ No.12」)。
  ファイル名と併せて画像SEOの両輪になる。
- 公開後に大量リネームするとインデックス済み画像URLが 404 になる。
  **追加時点で正しい名前を付ける**のが原則。
