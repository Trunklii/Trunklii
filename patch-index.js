// patch-index.js
// et/index.html と nr/index.html の </body> 直前に以下を追加してください:
// <script src="../patch-index.js"></script>

(function () {
  'use strict';

  function applyPatch() {
    const STUDIO_KEY = location.pathname.includes('/nr/') ? 'nr' : 'et';
    const d = window.SITE_DATA && window.SITE_DATA.studios[STUDIO_KEY];

    /* ── 1. 壊れたリンクを修正 ── */
    const fixes = { 'plans/': 'plans.html', 'calendar/': 'calendar.html', 'reservation/': 'reservation.html', 'cancel-policy/': 'cancel-policy.html' };
    document.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (fixes[h]) a.setAttribute('href', fixes[h]);
    });

    /* ── 2. Calendar: 料金区分プレビュー ── */
    var calBody = document.getElementById('calendar-body');
    if (calBody && !document.getElementById('_cal_tiers')) {
      var tierDiv = document.createElement('div');
      tierDiv.id = '_cal_tiers';
      tierDiv.style.cssText = 'display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;margin:0 auto 1.5rem';
      tierDiv.innerHTML =
        [['#f0c8a0', 'A', '¥6,600', '平日'],
         ['#b8cfe8', 'B', '¥8,800', '土曜'],
         ['#f4b0bc', 'C', '¥9,900', '日曜・祝日']].map(function (t) {
          return '<div style="display:flex;align-items:center;gap:.6rem">'
            + '<span style="display:inline-block;width:20px;height:7px;border-radius:2px;background:' + t[0] + '"></span>'
            + '<span style="font-family:Jost,sans-serif;font-size:.75rem;letter-spacing:.06em">'
            + t[1] + '&nbsp;&nbsp;' + t[2] + ' / ' + t[3] + '</span></div>';
        }).join('');
      calBody.parentNode.insertBefore(tierDiv, calBody.nextSibling);
    }
    var calBtn = document.getElementById('calendar-more-btn');
    if (calBtn) calBtn.textContent = 'カレンダーを見る →';

    /* ── 3. Reservation: 予約ボタン2つ追加 ── */
    var resBody = document.getElementById('reservation-body');
    if (resBody && !document.getElementById('_res_btns')) {
      var bookUrl = (d && d.bookingUrl) || '#';
      var accent = (d && d.accentColor) || '#b8935a';
      var btnRow = document.createElement('div');
      btnRow.id = '_res_btns';
      btnRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:.8rem;max-width:560px;margin:0 auto 2rem';
      btnRow.innerHTML =
        '<a href="' + bookUrl + '" style="display:flex;align-items:center;justify-content:center;text-align:center;font-family:Jost,sans-serif;font-weight:400;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;background:' + accent + ';color:#fff;text-decoration:none;padding:1rem .8rem;line-height:1.4">撮影のご予約はこちら</a>'
        + '<a href="plans.html" style="display:flex;align-items:center;justify-content:center;text-align:center;font-family:Jost,sans-serif;font-weight:400;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;border:1px solid #111010;color:#111010;text-decoration:none;padding:1rem .8rem;background:#fff;line-height:1.4">撮影プラン・料金はこちら</a>';
      resBody.parentNode.insertBefore(btnRow, resBody.nextSibling);
    }
    var resBtn = document.getElementById('reservation-more-btn');
    if (resBtn) resBtn.textContent = '予約の詳細を見る →';

    /* ── 4. Cancel Policy: キャンセル料金テーブル ── */
    var cancelBody = document.getElementById('cancel-body');
    if (cancelBody && d && d.cancelPolicy && d.cancelPolicy.items && !document.getElementById('_cp_table')) {
      function feeStyle(fee) {
        if (fee === '無料') return 'color:#4a9e6a;font-weight:500';
        if (fee.indexOf('100') !== -1) return 'color:#c0382e;font-weight:500';
        return 'font-weight:400';
      }
      var tableWrap = document.createElement('div');
      tableWrap.id = '_cp_table';
      tableWrap.style.cssText = 'max-width:600px;margin:0 auto 2rem';
      tableWrap.innerHTML = '<table style="width:100%;border-collapse:collapse;font-family:Jost,sans-serif;font-size:.82rem">'
        + d.cancelPolicy.items.map(function (it) {
          return '<tr>'
            + '<td style="border-bottom:1px solid rgba(17,16,16,.1);padding:.75rem 1rem;font-family:\'Noto Serif JP\',serif;font-weight:300;font-size:.85rem">' + it.when + '</td>'
            + '<td style="border-bottom:1px solid rgba(17,16,16,.1);padding:.75rem 1rem;text-align:right;' + feeStyle(it.fee) + '">' + it.fee + '</td>'
            + '</tr>';
        }).join('')
        + '</table>';
      cancelBody.parentNode.insertBefore(tableWrap, cancelBody.nextSibling);
    }
    var cancelBtn = document.getElementById('cancel-more-btn');
    if (cancelBtn) cancelBtn.textContent = 'キャンセルポリシーを確認 →';
  }

  /* init() 完了を待ってから適用 */
  if (document.body.classList.contains('is-ready')) {
    applyPatch();
  } else {
    var obs = new MutationObserver(function (_, observer) {
      if (document.body.classList.contains('is-ready')) {
        observer.disconnect();
        applyPatch();
      }
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setTimeout(applyPatch, 1600); // フォールバック
  }
})();
