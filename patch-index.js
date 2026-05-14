// patch-index.js — TOP page dynamic content
// et/index.html と nr/index.html の </body> 直前で読み込まれます

(function () {
  'use strict';

  /* ── Japanese public holidays (2025-2026) ── */
  var JP_HOLIDAYS = {
    '2025-01-01':1,'2025-01-13':1,'2025-02-11':1,'2025-02-23':1,'2025-02-24':1,
    '2025-03-20':1,'2025-04-29':1,'2025-05-03':1,'2025-05-04':1,'2025-05-05':1,
    '2025-05-06':1,'2025-07-21':1,'2025-08-11':1,'2025-09-15':1,'2025-09-23':1,
    '2025-10-13':1,'2025-11-03':1,'2025-11-23':1,'2025-11-24':1,
    '2026-01-01':1,'2026-01-12':1,'2026-02-11':1,'2026-02-23':1,'2026-03-20':1,
    '2026-04-29':1,'2026-05-03':1,'2026-05-04':1,'2026-05-05':1,'2026-05-06':1,
    '2026-07-20':1,'2026-08-11':1,'2026-09-21':1,'2026-09-22':1,'2026-09-23':1,
    '2026-10-12':1,'2026-11-03':1,'2026-11-23':1
  };

  function pad(n){ return ('0'+n).slice(-2); }
  function dKey(y,m,d){ return y+'-'+pad(m+1)+'-'+pad(d); }
  function getTier(y,m,d){
    var dow = new Date(y,m,d).getDay();
    var k = dKey(y,m,d);
    if(dow === 0 || JP_HOLIDAYS[k]) return 'c';
    if(dow === 6) return 'b';
    return 'a';
  }

  /* ── Update tier legend from CMS data (if exists) ── */
  function renderCalTierLegend(studio){
    var container = document.querySelector('.cal-top-tiers');
    if(!container) return;
    var tiers = studio && studio.calendar && Array.isArray(studio.calendar.tiers) ? studio.calendar.tiers : null;
    if(!tiers || tiers.length === 0) return; // keep static HTML default
    container.innerHTML = tiers.map(function(t){
      return '<div class="cal-top-tier">'
        + '<span class="cal-top-dot" style="background:' + (t.color||'#ccc') + '"></span>'
        + '<span class="cal-top-lbl">' + (t.label||'') + '</span>'
        + '<span class="cal-top-price">' + (t.price||'') + '</span>'
        + '<span class="cal-top-days">' + (t.days||'') + '</span>'
      + '</div>';
    }).join('');
  }

  /* ── Render 2-month preview into #cal-top-months ── */
  function renderCalTop(){
    var container = document.getElementById('cal-top-months');
    if(!container) return;
    var MONTHS_JA = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    var now = new Date();
    var y = now.getFullYear(), m = now.getMonth();
    var todayKey = dKey(now.getFullYear(), now.getMonth(), now.getDate());
    var html = '';
    for(var i=0; i<2; i++){
      var firstDow = new Date(y,m,1).getDay();
      var startCol = firstDow === 0 ? 6 : firstDow - 1;
      var dim = new Date(y, m+1, 0).getDate();
      var cells = '';
      for(var s=0; s<startCol; s++) cells += '<div class="cal-top-day empty"></div>';
      for(var d=1; d<=dim; d++){
        var dow = new Date(y,m,d).getDay();
        var k = dKey(y,m,d);
        var tier = getTier(y,m,d);
        var cls = 'cal-top-day tier-' + tier;
        if(dow===0) cls += ' sun-col';
        if(dow===6) cls += ' sat-col';
        if(JP_HOLIDAYS[k] && dow!==0) cls += ' holiday';
        if(k === todayKey) cls += ' today';
        cells += '<div class="'+cls+'">'+d+'</div>';
      }
      html += '<div class="cal-top-month">'
        + '<div class="cal-top-month-hd"><span class="cal-top-month-name">'+MONTHS_JA[m]+'</span><span class="cal-top-month-year">'+y+'</span></div>'
        + '<div class="cal-top-grid">'
        + '<div class="cal-top-dow">月</div><div class="cal-top-dow">火</div><div class="cal-top-dow">水</div><div class="cal-top-dow">木</div><div class="cal-top-dow">金</div><div class="cal-top-dow sat">土</div><div class="cal-top-dow sun">日</div>'
        + cells + '</div></div>';
      m++; if(m>11){ m=0; y++; }
    }
    container.innerHTML = html;
  }

  /* ── Render Kimono category carousels (CMS データ参照) ── */
  function renderKimonoCats(studio){
    var container = document.getElementById('kimono-grid');
    if(!container) return;
    var CATS = [
      { key:'3y-girl',  sub:'3 Year Old Girl',  jp:'三歳 女の子' },
      { key:'3y-boy',   sub:'3 Year Old Boy',   jp:'三歳 男の子' },
      { key:'5y-boy',   sub:'5 Year Old Boy',   jp:'五歳 男の子' },
      { key:'7y-girl',  sub:'7 Year Old Girl',  jp:'七歳 女の子' },
      { key:'10y-girl', sub:'10 Year Old Girl', jp:'十歳 女の子' }
    ];
    // STUDIO_KEY を判定
    var STUDIO_KEY = location.pathname.indexOf('/nr/') !== -1 ? 'nr' : 'et';
    // CMS のアイテムをカテゴリ別にグルーピング
    var allItems = (studio && studio.kimono && Array.isArray(studio.kimono.items)) ? studio.kimono.items : [];
    var byCat = {};
    CATS.forEach(function(c){ byCat[c.key] = []; });
    byCat.other = [];
    allItems.forEach(function(item){
      var k = item.category || 'other';
      if(!byCat[k]) byCat[k] = [];
      byCat[k].push(item);
    });

    container.className = 'kim-cats';
    container.innerHTML = CATS.map(function(c, i){
      var items = byCat[c.key] || [];
      var hasItems = items.length > 0;
      // 画像 path 解決(et/index.html 内なので相対パスはファイル名のみ)
      function imgPath(item){
        var f = item.file || '';
        if(!f) return '';
        if(f.indexOf('data:')===0 || f.indexOf('http')===0) return f;
        return f;
      }
      var firstOpt = hasItems && items[0].optionPrice ? '<span class="kim-cat-opt">Option ' + items[0].optionPrice + '</span>' : '';
      var mainHtml = hasItems
        ? '<div class="kim-cat-main" style="background-image:url(\'' + imgPath(items[0]) + '\');background-size:cover;background-position:center"></div>'
        : '<div class="kim-cat-main"><span>'+c.jp+'</span></div>';
      var sub1 = items.length > 1
        ? '<div class="kim-cat-sub-img" style="background-image:url(\'' + imgPath(items[1]) + '\');background-size:cover;background-position:center"></div>'
        : '<div class="kim-cat-sub-img"><span>—</span></div>';
      var sub2 = items.length > 2
        ? '<div class="kim-cat-sub-img" style="background-image:url(\'' + imgPath(items[2]) + '\');background-size:cover;background-position:center"></div>'
        : '<div class="kim-cat-sub-img"><span>—</span></div>';
      // データ属性に全アイテムのファイル名を入れてカルーセル制御
      var dataAttr = hasItems
        ? ' data-items="' + items.map(function(it){ return encodeURIComponent(imgPath(it)); }).join(',') + '" data-idx="0"'
        : '';
      var showArrows = items.length > 1;
      return '<div class="kim-cat"' + dataAttr + '>'
        + '<div class="kim-cat-head">'
          + '<div class="kim-cat-title">'+c.sub+'</div>'
          + firstOpt
        + '</div>'
        + '<div class="kim-cat-carousel">'
          + (showArrows ? '<button class="kim-arrow kim-arrow-prev" type="button" aria-label="前へ" onclick="kimCarousel(this,-1)">‹</button>' : '')
          + mainHtml + sub1 + sub2
          + (showArrows ? '<button class="kim-arrow kim-arrow-next" type="button" aria-label="次へ" onclick="kimCarousel(this,1)">›</button>' : '')
        + '</div>'
      + '</div>';
    }).join('');
  }

  /* カルーセル制御(arrow ボタンから呼ばれる) */
  window.kimCarousel = function(btn, dir){
    var card = btn.closest('.kim-cat');
    if(!card) return;
    var items = (card.getAttribute('data-items')||'').split(',').filter(Boolean).map(decodeURIComponent);
    if(items.length < 2) return;
    var idx = parseInt(card.getAttribute('data-idx')||'0', 10);
    idx = (idx + dir + items.length) % items.length;
    card.setAttribute('data-idx', String(idx));
    var carousel = card.querySelector('.kim-cat-carousel');
    if(!carousel) return;
    var main = carousel.querySelector('.kim-cat-main');
    var subs = carousel.querySelectorAll('.kim-cat-sub-img');
    function set(el, src){
      if(!el) return;
      if(src){
        el.style.backgroundImage = "url('"+src+"')";
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.innerHTML = '';
      }
    }
    set(main, items[idx]);
    set(subs[0], items[(idx+1) % items.length]);
    set(subs[1], items[(idx+2) % items.length]);
  };

  /* ── Reservation: ブロックを動的に描画(CMSデータ参照) ── */
  function renderReservationBlocks(studio){
    var grid = document.querySelector('.res-top-grid');
    if(!grid) return;
    var blocks = studio && studio.reservation && Array.isArray(studio.reservation.blocks) ? studio.reservation.blocks : null;
    var bookUrlFallback = (studio && studio.bookingUrl) || '#';
    var phone = (studio && studio.phone) || '050-1751-2601';

    // CMSにブロックがあれば動的描画。なければ既存HTMLのフォールバックを使う
    if(blocks && blocks.length > 0){
      grid.innerHTML = blocks.map(function(b){
        var bookHref = b.bookingUrl || bookUrlFallback;
        var notes = (b.notes||[]).map(function(n){ return '<li>' + n + '</li>'; }).join('');
        return '<div class="res-top-block">'
          + '<div class="res-top-head">'
            + '<span class="res-top-mark">' + (b.mark||'') + '</span>'
            + '<h3 class="res-top-title">' + (b.title||'') + '</h3>'
          + '</div>'
          + '<div class="res-top-btns">'
            + '<a href="' + bookHref + '" class="btn-line filled">' + (b.bookingLabel||'ご予約はこちら') + '</a>'
            + '<a href="' + (b.plansUrl||'plans.html') + '" class="btn-line">' + (b.plansLabel||'プラン・料金') + '</a>'
          + '</div>'
          + (notes ? '<ul class="res-top-notes">' + notes + '</ul>' : '')
        + '</div>';
      }).join('');
    } else {
      // フォールバック: 既存の固定HTMLのURL/電話を埋める
      var b1 = document.getElementById('res-top-book-1');
      var b2 = document.getElementById('res-top-book-2');
      if(b1) b1.href = bookUrlFallback;
      if(b2) b2.href = bookUrlFallback;
      var tel = document.getElementById('res-top-tel');
      if(tel) tel.textContent = phone;
    }
  }

  function applyPatch() {
    var STUDIO_KEY = location.pathname.indexOf('/nr/') !== -1 ? 'nr' : 'et';
    var studio = window.SITE_DATA && window.SITE_DATA.studios && window.SITE_DATA.studios[STUDIO_KEY];

    /* 旧リンク → .html リダイレクト（保険） */
    var fixes = { 'plans/': 'plans.html', 'calendar/': 'calendar.html', 'reservation/': 'reservation.html', 'cancel-policy/': 'cancel-policy.html' };
    document.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (fixes[h]) a.setAttribute('href', fixes[h]);
    });

    renderCalTierLegend(studio);
    renderCalTop();
    renderKimonoCats(studio);
    renderReservationBlocks(studio);
  }

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
    setTimeout(applyPatch, 1600);
  }
})();
