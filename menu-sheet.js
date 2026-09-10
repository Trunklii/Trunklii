// 紙の料金表（studios.<store>.menuSheets）を描く共通モジュール。
// plans.html（2枚まとめて）と plan-detail.html（1枚だけ）の両方から使う。
// ここに1本化していないと、片方だけ直してもう片方がずれる。今日それが実際に起きている。
// 金額は必ず site-data.js から取る。HTML に直書きしないこと。
(function (global) {
  'use strict';
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  /* ── 紙の料金表（studios.nr.menuSheets）を描く ──
     金額はすべてここで site-data.js から取る。HTMLに直書きしないこと。
     メニューごとに1ブロックで、加算の注記もブロックの中に閉じる。
     ページ全体に掛かる注記を作ると、七五三のハイシーズン加算が
     Birthday にも掛かって読めてしまう。 */
  const yenNum = (n) => '¥' + Number(n).toLocaleString('ja-JP');

  function mnFees(items){
    return '<div class="mn-fee">' + items.map((f) =>
      '<div class="mn-fee-i"><span>' + esc(f.label) + '</span><b>' + yenNum(f.price) + '</b></div>'
    ).join('') + '</div>';
  }
  function mnPlans(items){
    const cls = items.length === 1 ? 'mn-plans one' : 'mn-plans';
    return '<div class="' + cls + '">' + items.map((p) =>
      '<div class="mn-plan">'
      + (p.image ? '<div class="mn-plan-img" style="background-image:url(\'' + esc(p.image) + '\')" role="img" aria-label="' + esc(p.name) + '"></div>' : '')
      + '<div class="mn-plan-n">' + esc(p.name) + '</div>'
      + (p.en ? '<div class="mn-plan-en">' + esc(p.en) + '</div>' : '')
      + '<div class="mn-plan-p">' + yenNum(p.price) + '<em>税込</em></div>'
      + '<ul class="mn-plan-l">' + (p.includes || []).map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>'
      + (p.note ? '<div class="mn-plan-note">（' + esc(p.note) + '）</div>' : '')
      + '</div>'
    ).join('') + '</div>';
  }
  function mnOptionGroups(items){
    return '<div class="mn-opts">' + items.map((g) => {
      const rows = (g.rows || []).map((r) => {
        if (r.head) return '<dd class="sub">' + esc(r.head) + '</dd>';
        return '<dt>' + esc(r.name) + '</dt><dd>' + esc(r.price) + '</dd>'
          + (r.sub ? '<dd class="sub">' + esc(r.sub) + '</dd>' : '');
      }).join('');
      return '<div class="mn-og">'
        + '<div class="mn-og-t">' + esc(g.title) + (g.en ? '<small>' + esc(g.en) + '</small>' : '') + '</div>'
        + '<dl>' + rows + '</dl>'
        + (g.note ? '<p>' + esc(g.note) + '</p>' : '')
        + '</div>';
    }).join('') + '</div>';
  }

  // host: 描画先の要素 / sheets: 描く menuSheets の配列（1枚でも複数でも）
  function renderSheets(host, sheets){
    if(!host) return;
    sheets = sheets || [];
    if(sheets.length === 0){
      host.innerHTML = '<p class="mn-lead">料金表は準備中です。</p>';
      return;
    }
    host.innerHTML = sheets.map((sh) => {
      const steps = (sh.steps || []).map((st) => {
        const head = '<div class="mn-step"><span class="mn-no">' + esc(st.no) + '</span>'
          + '<span class="mn-tag ' + (st.req ? 'req">必須' : 'opt">任意') + '</span>'
          + '<h3>' + esc(st.title) + (st.sub ? '<small>' + esc(st.sub) + '</small>' : '') + '</h3></div>';
        let body = '';
        if(st.type === 'fees') body = mnFees(st.items || []);
        else if(st.type === 'plans') body = mnPlans(st.items || []);
        else if(st.type === 'optionGroups') body = mnOptionGroups(st.items || []);
        return head + body;
      });
      // ① と ② のあいだの ＋（3ステップ構成のときだけ出す）
      const joined = steps.length >= 3
        ? steps[0] + '<div class="mn-plus">＋</div>' + steps.slice(1).join('')
        : steps.join('');
      const add = sh.surcharge
        ? '<div class="mn-add">' + sh.surcharge.text
          + (sh.surcharge.note ? '<small>' + esc(sh.surcharge.note) + '</small>' : '') + '</div>'
        : '';
      const ex = (sh.examples || []).length
        ? '<div class="mn-ex">' + sh.examples.map((e) =>
            '<div class="mn-ex-i"><b>' + e.title + '</b>' + esc(e.body) + '<i>' + esc(e.total) + '</i></div>'
          ).join('') + '</div>'
        : '';
      const notes = (sh.notes || []).length
        ? '<ul class="mn-notes">' + sh.notes.map((n) => '<li>' + n + '</li>').join('')
          + '<li>表示価格はすべて税込です。</li></ul>'
        : '';
      // ②（プラン）のあとに加算と計算例を置く。オプションはそのあと
      const parts = joined.split('<div class="mn-step"><span class="mn-no">' + esc((sh.steps[sh.steps.length-1]||{}).no));
      const beforeOpt = parts[0];
      const optPart = parts.length > 1
        ? '<div class="mn-step"><span class="mn-no">' + esc(sh.steps[sh.steps.length-1].no) + parts.slice(1).join('')
        : '';
      return '<section class="mn-sheet">'
        + '<p class="mn-eyebrow">' + esc(sh.eyebrow) + '</p>'
        + '<h2 class="mn-title">' + esc(sh.title) + '</h2>'
        + '<p class="mn-lead">' + sh.lead + '<br/>表示価格はすべて税込です。</p>'
        + beforeOpt + add + ex + optPart + notes
        + '</section>';
    }).join('');
  }

  global.MenuSheet = {
    render: renderSheets,
    // studio から key で1枚だけ取り出す（plan-detail.html 用）
    sheetFor: function (studio, key) {
      return ((studio && studio.menuSheets) || []).filter(function (s) { return s.key === key; });
    },
  };
})(window);
