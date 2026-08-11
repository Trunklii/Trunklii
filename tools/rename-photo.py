#!/usr/bin/env python3
"""
写真ファイル名を SEO/MEO 命名規則に沿ってリネームするツール。

命名規則:  【被写体】-【属性】-【店舗+地域】-【連番】.jpg
  例) shichigosan-girl-family-studio-et-hashima-01.jpg
      kimono-3yo-girl-studio-et-hashima-03.jpg
      omairi-kimono-7yo-girl-studio-et-hashima-02.jpg

使い方:
  # 1) 追加した写真に規則どおりの名前を付ける(site-data.js も更新)
  python3 tools/rename-photo.py --studio et --category 753girl --family path/to/new1.jpg path/to/new2.jpg
  python3 tools/rename-photo.py --studio et --kimono 3y-girl path/to/kimono1.jpg

  # 2) すでにサイトにある画像を規則に沿って一括リネーム(参照も全て追従)
  python3 tools/rename-photo.py --normalize-all

  # 3) 命名だけ確認(ファイルは動かさない)
  python3 tools/rename-photo.py --studio et --category omiyamairi --dry-run new.jpg
"""
import argparse, json, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(REPO, 'site-data.js')

STUDIO_SLUG = {'et': 'studio-et-hashima', 'nr': 'maison-nr-kasugai'}

# ギャラリー: タグ → 主題スラッグ(上から優先)
GALLERY_PRIMARY = [
    ('omiyamairi', 'omiyamairi-newborn'), ('100days', '100days-celebration'),
    ('halfbd', 'half-birthday'), ('halfseijin', 'half-coming-of-age'),
    ('seijin', 'coming-of-age'), ('furisode', 'furisode-kimono'),
    ('maternity', 'maternity'), ('school', 'school-entrance'),
    ('753', 'shichigosan'), ('birthday', 'birthday'), ('event', 'event'),
    ('other', 'photo'),
]
GALLERY_SUB = {'753girl': 'girl', '753boy': 'boy', 'family': 'family'}

# 着物: カテゴリ → スラッグ
KIMONO_SLUG = {
    '3y-girl': 'kimono-3yo-girl', '7y-girl': 'kimono-7yo-girl', '10y-girl': 'kimono-10yo-girl',
    'omairi': 'kimono-omiyamairi', '3y-boy': 'kimono-3yo-boy', '5y-boy': 'kimono-5yo-boy',
    '10y-boy': 'kimono-10yo-boy',
    'mairi-3g': 'omairi-kimono-3yo-girl', 'mairi-7g': 'omairi-kimono-7yo-girl',
    'mairi-3b': 'omairi-kimono-3yo-boy', 'mairi-5b': 'omairi-kimono-5yo-boy',
}


def load_data():
    s = open(DATA, encoding='utf-8').read()
    m = re.search(r'window\.SITE_DATA\s*=\s*', s)
    head, body = s[:m.end()], s[m.end():].rstrip()
    tail = ';' if body.endswith(';') else ''
    if tail:
        body = body[:-1]
    return head, json.loads(body), tail


def save_data(head, data, tail):
    out = head + json.dumps(data, ensure_ascii=False, indent=2) + tail + '\n'
    json.loads(re.split(r'window\.SITE_DATA\s*=\s*', out)[1].rstrip().rstrip(';'))  # 妥当性チェック
    open(DATA, 'w', encoding='utf-8').write(out)


def gallery_base(tags, studio):
    main = 'photo'
    for t, slug in GALLERY_PRIMARY:
        if t in tags:
            main = slug
            break
    extra = [GALLERY_SUB[t] for t in ('753girl', '753boy', 'family') if t in tags]
    return '-'.join([main] + extra + [STUDIO_SLUG[studio]])


def next_free(dirpath, base, ext):
    n = 1
    while True:
        cand = f'{base}-{n:02d}{ext}'
        if not os.path.exists(os.path.join(dirpath, cand)):
            return cand
        n += 1


def add_photos(args):
    head, data, tail = load_data()
    st = data['studios'][args.studio]
    sub = 'g' if args.category else ''          # ギャラリーは et/g/ 配下
    dest_dir = os.path.join(REPO, args.studio, sub) if sub else os.path.join(REPO, args.studio)
    os.makedirs(dest_dir, exist_ok=True)

    if args.kimono:
        base = f'{KIMONO_SLUG.get(args.kimono, "kimono")}-{STUDIO_SLUG[args.studio]}'
    else:
        tags = [args.category] + (['family'] if args.family else [])
        base = gallery_base(tags, args.studio)

    added = []
    for src in args.files:
        if not os.path.exists(src):
            print(f'  [skip] not found: {src}', file=sys.stderr)
            continue
        ext = os.path.splitext(src)[1].lower() or '.jpg'
        name = next_free(dest_dir, base, ext)
        rel = f'{sub}/{name}' if sub else name
        if args.dry_run:
            print(f'  {os.path.basename(src)}  ->  {args.studio}/{rel}')
            continue
        shutil.copy(src, os.path.join(dest_dir, name))
        if args.kimono:
            jp = {'3y-girl': '三歳女の子', '7y-girl': '七歳女の子', '10y-girl': '十歳女の子',
                  'omairi': 'お宮参り', '3y-boy': '三歳男の子', '5y-boy': '五歳男の子',
                  '10y-boy': '十歳男の子', 'mairi-3g': 'お詣り 三歳女の子',
                  'mairi-7g': 'お詣り 七歳女の子', 'mairi-3b': 'お詣り 三歳男の子',
                  'mairi-5b': 'お詣り 五歳男の子'}.get(args.kimono, '着物')
            items = st['kimono']['items']
            cnt = sum(1 for i in items if i['category'] == args.kimono) + 1
            items.append({'file': rel, 'name': f'{jp} {cnt:02d}', 'desc': '', 'category': args.kimono})
        else:
            tags = [args.category] + (['family'] if args.family else [])
            if args.category in ('753girl', '753boy'):
                tags.append('753')
            st.setdefault('gallery', []).insert(0, {'file': rel, 'caption': args.caption or '', 'tags': tags})
        added.append(rel)
        print(f'  added: {args.studio}/{rel}')
    if not args.dry_run and added:
        save_data(head, data, tail)
        print(f'site-data.js を更新しました({len(added)}件)')


def normalize_all(args):
    """既存の全画像を命名規則に正規化。site-data.js と HTML/sitemap の参照も追従。"""
    head, data, tail = load_data()
    assigned, used = {}, {}

    def take(studio, old, base):
        if (studio, old) in assigned:
            return assigned[(studio, old)]
        ext = os.path.splitext(old)[1].lower() or '.jpg'
        sub = os.path.dirname(old)
        used.setdefault(studio, set())
        n = 1
        while True:
            cand = f'{base}-{n:02d}{ext}'
            if cand not in used[studio]:
                break
            n += 1
        used[studio].add(cand)
        new = os.path.join(sub, cand) if sub else cand
        assigned[(studio, old)] = new
        return new

    for studio in ('et', 'nr'):
        st = data['studios'].get(studio)
        if not st:
            continue
        for it in st.get('gallery', []):
            tags = it.get('tags') or ([it['category']] if it.get('category') else ['other'])
            it['file'] = take(studio, it['file'], gallery_base(tags, studio))
        for fld, label in (('heroImages', 'hero-pc'), ('heroImagesSp', 'hero-sp')):
            for h in st.get(fld, []):
                if h.get('file'):
                    h['file'] = take(studio, h['file'], f'{STUDIO_SLUG[studio]}-{label}')
        for it in st.get('kimono', {}).get('items', []):
            it['file'] = take(studio, it['file'],
                              f'{KIMONO_SLUG.get(it.get("category"), "kimono")}-{STUDIO_SLUG[studio]}')
        for sec, pre in (('costume', 'costume-dress'), ('goods', 'goods')):
            node = st.get(sec)
            if isinstance(node, dict):
                for it in node.get('items', []):
                    if it.get('file'):
                        it['file'] = take(studio, it['file'], f'{pre}-{STUDIO_SLUG[studio]}')
        ab = st.get('about', {})
        if ab.get('image'):
            ab['image'] = take(studio, ab['image'], f'about-{STUDIO_SLUG[studio]}')
        for pl in st.get('plans', []):
            key = re.sub(r'[^a-z0-9]+', '-', str(pl.get('key', 'plan')).lower())
            det = pl.get('detail') or {}
            if det.get('heroImage'):
                det['heroImage'] = take(studio, det['heroImage'], f'plan-{key}-{STUDIO_SLUG[studio]}')
            for v in pl.get('variants', []):
                g = v.get('gallery') or []
                v['gallery'] = [take(studio, f, f'plan-{key}-gallery-{STUDIO_SLUG[studio]}')
                                if isinstance(f, str) and not f.startswith(('http', 'data:')) else f
                                for f in g]

    # 実ファイル移動
    name_map, moved = {}, 0
    for (studio, old), new in assigned.items():
        if old == new:
            continue
        src, dst = os.path.join(REPO, studio, old), os.path.join(REPO, studio, new)
        if os.path.exists(src) and not os.path.exists(dst):
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if args.dry_run:
                print(f'  {studio}/{old} -> {studio}/{new}')
            else:
                shutil.move(src, dst)
            moved += 1
        name_map[os.path.basename(old)] = os.path.basename(new)

    if args.dry_run:
        print(f'(dry-run) {moved} 件がリネーム対象')
        return

    save_data(head, data, tail)
    # HTML / sitemap 等の参照も追従
    keys = sorted(name_map, key=len, reverse=True)
    changed = 0
    for root, dirs, files in os.walk(REPO):
        if '/.git' in root or '/tools' in root:
            continue
        for f in files:
            if not f.endswith(('.html', '.js', '.xml', '.txt', '.json')) or f == 'site-data.js':
                continue
            p = os.path.join(root, f)
            try:
                txt = open(p, encoding='utf-8').read()
            except Exception:
                continue
            orig = txt
            for k in keys:
                if k in txt:
                    txt = txt.replace(k, name_map[k])
            if txt != orig:
                open(p, 'w', encoding='utf-8').write(txt)
                changed += 1
    print(f'リネーム {moved} 件 / 参照更新 {changed} ファイル')
    verify()


def verify():
    _, data, _ = load_data()
    miss = []

    def chk(studio, f):
        if isinstance(f, str) and re.search(r'\.(jpg|jpeg|png|webp)$', f, re.I) \
                and not f.startswith(('http', 'data:')) \
                and not os.path.exists(os.path.join(REPO, studio, f)):
            miss.append(f'{studio}/{f}')

    for studio in ('et', 'nr'):
        st = data['studios'].get(studio) or {}
        for it in st.get('gallery', []):
            chk(studio, it.get('file'))
        for fld in ('heroImages', 'heroImagesSp'):
            for h in st.get(fld, []):
                chk(studio, h.get('file'))
        for it in st.get('kimono', {}).get('items', []):
            chk(studio, it.get('file'))
        for sec in ('costume', 'goods'):
            node = st.get(sec)
            if isinstance(node, dict):
                for it in node.get('items', []):
                    chk(studio, it.get('file'))
        chk(studio, st.get('about', {}).get('image'))
        for pl in st.get('plans', []):
            chk(studio, (pl.get('detail') or {}).get('heroImage'))
            for v in pl.get('variants', []):
                for g in (v.get('gallery') or []):
                    chk(studio, g)
    print('参照切れ:', len(miss), miss[:5] if miss else '')
    return not miss


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description='写真ファイル名をSEO命名規則に揃える')
    ap.add_argument('files', nargs='*', help='追加する画像ファイル')
    ap.add_argument('--studio', choices=['et', 'nr'], default='et')
    ap.add_argument('--category', help='ギャラリー用タグ: 753girl/753boy/omiyamairi/100days/halfbd/birthday/halfseijin/school/maternity/seijin/furisode/other')
    ap.add_argument('--kimono', choices=list(KIMONO_SLUG), help='着物カテゴリ')
    ap.add_argument('--family', action='store_true', help='家族・きょうだい撮影を含む')
    ap.add_argument('--caption', help='ギャラリーのキャプション')
    ap.add_argument('--normalize-all', action='store_true', help='既存画像を一括で命名規則に正規化')
    ap.add_argument('--verify', action='store_true', help='参照切れチェックのみ')
    ap.add_argument('--dry-run', action='store_true', help='実際には変更しない')
    a = ap.parse_args()

    if a.verify:
        sys.exit(0 if verify() else 1)
    if a.normalize_all:
        normalize_all(a)
    elif a.files and (a.category or a.kimono):
        add_photos(a)
    else:
        ap.print_help()
