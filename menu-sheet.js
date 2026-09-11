// 紙の料金表（studios.<store>.menuSheets）を、紙と同じレイアウトで描く共通モジュール。
// plans.html（2枚まとめて）と plan-detail.html（1枚だけ）の両方から使う。
// ここに1本化していないと、片方だけ直してもう片方がずれる。
//
// 見た目の出どころは紙の資料「七五三 撮影メニュー SHICHI-GO-SAN・2026」:
//   ・料金は白いカードを間隔をあけて並べる（罫線の格子ではない）
//   ・撮影料金は横一列の1枚のカード。赤い小さなラベルを中央に置く
//   ・「＋」でプランに繋ぐ
//   ・プランは写真つきカード。名前 → 英字（赤）→ 大きな金額 → 土日祝の加算 → 含まれるもの
//   ・オプションは白いカードに、点線のリーダーで名前と金額を左右に並べる
//   ・ハイシーズンの加算は最下部に赤字で1行
//
// CSS もこのファイルが持つ（HTML 側に置くと2ページで二重管理になる）。
// 金額は必ず site-data.js から取る。HTML に直書きしないこと。
(function (global) {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var yen = function (n) { return '¥' + Number(n).toLocaleString('ja-JP'); };

  var CSS = [
    '.mn-sheet{max-width:1080px;margin:0 auto;scroll-margin-top:88px}',
    '.mn-sheet + .mn-sheet{margin-top:5rem;padding-top:4rem;border-top:1px solid var(--border)}',
    '.mn-eyebrow{font-family:var(--sans);font-weight:300;font-size:.62rem;letter-spacing:.3em;color:var(--accent-text);text-align:center;margin:0 0 .9rem}',
    '.mn-title{font-family:var(--serif);font-weight:300;font-size:clamp(1.35rem,4vw,2.1rem);letter-spacing:.22em;text-align:center;margin:0}',
    '.mn-rule{width:64px;height:1px;background:var(--accent);margin:1.4rem auto 2.2rem}',
    '.mn-lead{font-family:var(--serif);font-weight:300;font-size:.82rem;line-height:1.95;color:var(--mid);text-align:center;max-width:640px;margin:0 auto 2.2rem}',
    '.mn-lead b{font-weight:400;color:var(--ink)}',
    /* ── ① 撮影料金：横一列の1枚のカード ── */
    '.mn-feebox{background:#fff;border-radius:3px;box-shadow:0 1px 3px rgba(31,20,16,.06);padding:1.6rem 1.4rem 1.5rem}',
    '.mn-feebox-t{font-family:var(--serif);font-weight:400;font-size:.82rem;letter-spacing:.24em;color:var(--accent-text);text-align:center;margin-bottom:1rem}',
    '.mn-fee{display:flex;flex-wrap:wrap;justify-content:center;gap:.8rem 3.2rem}',
    '.mn-fee-i{display:flex;align-items:baseline;gap:.7rem}',
    '.mn-fee-i span{font-family:var(--serif);font-weight:300;font-size:.86rem;color:var(--ink)}',
    '.mn-fee-i b{font-family:var(--display);font-style:normal;font-weight:400;font-size:1.3rem;white-space:nowrap;font-variant-numeric:lining-nums}',
    '.mn-plus{text-align:center;font-family:var(--sans);font-weight:300;font-size:1.15rem;color:var(--accent);margin:1.5rem 0}',
    /* プランとオプションは、極細の罫線で囲って区切りを作る。
       囲みの見出しは「753撮影料金」と同じ字づかい（.mn-feebox-t と同じ） */
    '.mn-group{border:1px solid var(--border);padding:1.5rem 1.4rem 1.6rem;margin-top:0}',
    '.mn-group + .mn-group{margin-top:1.6rem}',
    '.mn-group-t{font-family:var(--serif);font-weight:400;font-size:.82rem;letter-spacing:.24em;color:var(--accent-text);text-align:center;margin-bottom:1.2rem}',
    '.mn-group-t small{display:block;font-family:var(--serif);font-weight:300;font-size:.7rem;letter-spacing:.08em;color:var(--mid);margin-top:.35rem}',
    /* 撮影料金＋オプションの2段組（isDuo のとき）。狭い画面では今までどおり縦に積む */
    '@media(min-width:860px){.mn-duo{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.6rem;align-items:stretch}',
    '.mn-duo>.mn-group{min-width:0}',
    '.mn-duo>.mn-group + .mn-group{margin-top:0}}',
    /* ── ② プラン ── */
    '.mn-plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.4rem;align-items:start}',
    '.mn-plans.one{grid-template-columns:minmax(0,380px);justify-content:center}',
    '.mn-plan{background:#fff;border-radius:3px;box-shadow:0 1px 3px rgba(31,20,16,.06);overflow:hidden;display:flex;flex-direction:column}',
    '.mn-plan-img{aspect-ratio:16/10;background-size:cover;background-position:center}',
    '.mn-plan-b{padding:1.5rem 1.4rem 1.6rem}',
    '.mn-plan-n{font-family:var(--serif);font-weight:300;font-size:1.05rem;letter-spacing:.06em;color:var(--ink)}',
    '.mn-plan-en{font-family:var(--sans);font-weight:300;font-size:.58rem;letter-spacing:.16em;color:var(--accent-text);margin:.3rem 0 1rem}',
    '.mn-plan-p{font-family:var(--display);font-style:normal;font-weight:300;font-size:2.1rem;line-height:1;color:var(--ink);font-variant-numeric:lining-nums}',
    '.mn-plan-p em{font-style:normal;font-family:var(--sans);font-weight:300;font-size:.58rem;color:var(--mid);margin-left:.4rem}',
    '.mn-plan-add{font-family:var(--serif);font-weight:300;font-size:.78rem;color:var(--mid);margin-top:.6rem}',
    '.mn-plan-add b{font-weight:400;color:var(--accent-text);margin-left:.3em}',
    '.mn-plan-l{list-style:none;padding:1.1rem 0 0;margin:1.1rem 0 0;border-top:1px solid var(--border);font-family:var(--serif);font-weight:300;font-size:.8rem;line-height:2;color:var(--ink)}',
    '.mn-plan-l li{position:relative;padding-left:1rem}',
    '.mn-plan-l li::before{content:"";position:absolute;left:0;top:.85em;width:5px;height:5px;border-radius:50%;background:var(--accent)}',
    '.mn-plan-note{font-family:var(--serif);font-weight:300;font-size:.7rem;line-height:1.8;color:var(--mid);margin-top:.5rem;padding-left:1rem}',
    /* ── ③ オプション ── */
    '.mn-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.4rem;align-items:start}',
    /* grid の 1fr は min-content より小さくならないので、名前が長いと列が広がって囲みからはみ出す。
       minmax(0,1fr) と min-width:0 で縮めるようにし、名前は折り返す（省略記号で切らない） */
    '.mn-og{min-width:0}',
    /* 紙は左の列に「生花髪飾りオプション」と「OPTION」を積み、残り2つを右の2列に置いている。4群のときだけその並びを再現する */
    '@media(min-width:860px){.mn-opts.g4{grid-template-columns:repeat(3,1fr)}',
    '.mn-opts.g4>:nth-child(1){grid-column:1;grid-row:1}',
    '.mn-opts.g4>:nth-child(2){grid-column:1;grid-row:2}',
    '.mn-opts.g4>:nth-child(3){grid-column:2;grid-row:1/span 2}',
    '.mn-opts.g4>:nth-child(4){grid-column:3;grid-row:1/span 2}}',
    '@media(min-width:860px){.mn-opts.g4{grid-template-columns:repeat(3,minmax(0,1fr))}}',
    '.mn-og{background:#fff;border-radius:3px;box-shadow:0 1px 3px rgba(31,20,16,.06);padding:1.5rem 1.4rem 1.4rem}',
    '.mn-og-t{font-family:var(--serif);font-weight:400;font-size:.88rem;letter-spacing:.22em;color:var(--accent-text);text-align:center}',
    '.mn-og-t small{display:block;font-family:var(--sans);font-weight:300;font-size:.6rem;letter-spacing:.2em;color:var(--mid);margin-top:.35rem}',
    '.mn-og dl{margin:1rem 0 0;font-family:var(--serif);font-weight:300;font-size:.82rem}',
    '.mn-row{display:flex;align-items:baseline;gap:.5rem;padding:.6rem 0;border-top:1px solid var(--border);flex-wrap:nowrap}',
    '.mn-row .n{color:var(--ink);min-width:0;line-height:1.7}',
    '.mn-row .dots{flex:1;border-bottom:1px dotted var(--line-strong,rgba(31,20,16,.26));transform:translateY(-.25em);min-width:1rem}',
    '.mn-row .p{font-family:var(--display);font-style:normal;font-weight:400;font-size:.95rem;white-space:nowrap;font-variant-numeric:lining-nums}',
    '.mn-og .mn-sub{font-family:var(--serif);font-weight:300;font-size:.7rem;line-height:1.8;color:var(--mid);padding:0 0 .5rem}',
    '.mn-og .mn-head{font-family:var(--serif);font-weight:400;font-size:.8rem;color:var(--accent-text);padding:.9rem 0 .1rem}',
    '.mn-og .mn-note{font-family:var(--serif);font-weight:300;font-size:.7rem;line-height:1.85;color:var(--mid);margin:.8rem 0 0;padding-top:.7rem;border-top:1px solid var(--border)}',
    /* ── 最下部 ── */
    '.mn-foot{font-family:var(--serif);font-weight:400;font-size:.95rem;letter-spacing:.06em;color:var(--accent-text);text-align:center;margin:2.6rem 0 1rem}',
    '.mn-notes{list-style:none;padding:0;margin:0;font-family:var(--serif);font-weight:300;font-size:.74rem;line-height:1.95;color:var(--mid);text-align:center;max-width:760px;margin-left:auto;margin-right:auto}',
    '@media(max-width:600px){',
    '.mn-fee{gap:.5rem 1.4rem}',
    '.mn-fee-i{width:100%;justify-content:space-between}',
    '.mn-plans,.mn-opts{grid-template-columns:1fr;gap:1rem}',
    '.mn-group{padding:1.2rem .9rem 1.3rem}',
    '.mn-notes{text-align:left}',
    '}',
  ].join('\n');

  var cssDone = false;
  function injectCss() {
    if (cssDone || document.getElementById('mn-sheet-css')) { cssDone = true; return; }
    var el = document.createElement('style');
    el.id = 'mn-sheet-css';
    el.textContent = CSS;
    document.head.appendChild(el);
    cssDone = true;
  }

  function feeBox(step) {
    var items = (step.items || []).map(function (f) {
      return '<div class="mn-fee-i"><span>' + esc(f.label) + '</span><b>' + yen(f.price) + '</b></div>';
    }).join('');
    return '<div class="mn-feebox">'
      + (step.label ? '<div class="mn-feebox-t">' + esc(step.label) + '</div>' : '')
      + '<div class="mn-fee">' + items + '</div></div>';
  }

  function groupBox(step, inner) {
    var sub = step.sub ? '<small>' + esc(step.sub) + '</small>' : '';
    return '<div class="mn-group">'
      + (step.title ? '<div class="mn-group-t">' + esc(step.title) + sub + '</div>' : '')
      + inner + '</div>';
  }

  function planCards(step, sur) {
    var items = step.items || [];
    var add = (sur && sur.weekend)
      ? '<div class="mn-plan-add">' + esc(sur.weekendLabel || '') + '<b>' + esc(sur.weekend) + '</b></div>'
      : '';
    return '<div class="mn-plans' + (items.length === 1 ? ' one' : '') + '">' + items.map(function (p) {
      return '<div class="mn-plan">'
        + (p.image ? '<div class="mn-plan-img" style="background-image:url(\'' + esc(p.image) + '\')" role="img" aria-label="' + esc(p.name) + '"></div>' : '')
        + '<div class="mn-plan-b">'
        + '<div class="mn-plan-n">' + esc(p.name) + '</div>'
        + (p.en ? '<div class="mn-plan-en">' + esc(p.en) + '</div>' : '')
        + '<div class="mn-plan-p">' + yen(p.price) + '<em>税込</em></div>'
        + add
        + '<ul class="mn-plan-l">' + (p.includes || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
        + (p.note ? '<div class="mn-plan-note">（' + esc(p.note) + '）</div>' : '')
        + '</div></div>';
    }).join('') + '</div>';
  }

  function optionGroups(step) {
    var items = step.items || [];
    return '<div class="mn-opts' + (items.length === 4 ? ' g4' : '') + '">' + items.map(function (g) {
      var rows = (g.rows || []).map(function (r) {
        if (r.head) return '<div class="mn-head">' + esc(r.head) + '</div>';
        return '<div class="mn-row"><span class="n">' + esc(r.name) + '</span>'
          + '<span class="dots"></span><span class="p">' + esc(r.price) + '</span></div>'
          + (r.sub ? '<div class="mn-sub">（' + esc(r.sub) + '）</div>' : '');
      }).join('');
      return '<div class="mn-og">'
        + '<div class="mn-og-t">' + esc(g.title) + (g.en ? '<small>' + esc(g.en) + '</small>' : '') + '</div>'
        + '<dl>' + rows + '</dl>'
        + (g.note ? '<p class="mn-note">' + esc(g.note) + '</p>' : '')
        + '</div>';
    }).join('') + '</div>';
  }

  /* 撮影料金のカードが1枚だけ（Birthday）のときは、撮影料金とオプションを横に並べる。
     縦に積むと、1枚のカードの左右と、行数の少ないオプションの右側が大きく空くため */
  function isDuo(steps) {
    return steps.length === 2
      && steps[0].type === 'plans' && (steps[0].items || []).length === 1
      && steps[1].type === 'optionGroups';
  }

  // host: 描画先の要素 / sheets: 描く menuSheets の配列（1枚でも複数でも）
  function renderSheets(host, sheets) {
    if (!host) return;
    injectCss();
    sheets = sheets || [];
    if (sheets.length === 0) {
      host.innerHTML = '<p class="mn-lead">料金表は準備中です。</p>';
      return;
    }
    host.innerHTML = sheets.map(function (sh) {
      var sur = sh.surcharge || {};
      var steps = sh.steps || [];
      var body = steps.map(function (st, i) {
        if (st.type === 'fees') return feeBox(st) + '<div class="mn-plus">＋</div>';
        if (st.type === 'plans') return groupBox(st, planCards(st, sur));
        if (st.type === 'optionGroups') return groupBox(st, optionGroups(st));
        return '';
      }).join('');
      if (isDuo(steps)) body = '<div class="mn-duo">' + body + '</div>';
      var notes = (sh.notes || []).slice();
      notes.push('表示価格はすべて税込です。');
      return '<section class="mn-sheet" id="mn-' + esc(sh.key) + '">'
        + (sh.eyebrow ? '<p class="mn-eyebrow">' + esc(sh.eyebrow) + '</p>' : '')
        + '<h2 class="mn-title">' + esc(sh.title) + '</h2>'
        + '<div class="mn-rule"></div>'
        + (sh.lead ? '<p class="mn-lead">' + sh.lead + '</p>' : '')
        + body
        + (sur.footer ? '<div class="mn-foot">' + esc(sur.footer) + '</div>' : '')
        + '<ul class="mn-notes">' + notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>'
        + '</section>';
    }).join('');

    /* 料金表は JS で描くので、ページを開いた時点では #mn-753 などの要素がまだ無い。
       ブラウザの自動スクロールはその時点で1度きり走って空振りするため、
       描き終えたあとに自分でアンカーまで送る。 */
    scrollToHash();
  }

  function scrollToHash() {
    var id = (location.hash || '').replace(/^#/, '');
    if (!id) return;
    var el = document.getElementById(decodeURIComponent(id));
    if (!el) return;
    // どの要素がスクロールしているか（body か html か）はページによって違うので、
    // 自前で座標を計算せず scrollIntoView に任せる。
    // 追従ヘッダーのぶんの余白は CSS の scroll-margin-top が持つ。
    el.scrollIntoView({ block: 'start' });
  }

  global.MenuSheet = {
    render: renderSheets,
    // studio から key で1枚だけ取り出す（plan-detail.html 用）
    sheetFor: function (studio, key) {
      return ((studio && studio.menuSheets) || []).filter(function (s) { return s.key === key; });
    },
  };
})(window);
