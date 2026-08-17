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

  /* ── 大安(日本の六曜)。繁忙期のみ強調: 1/10/11/12月 ── */
  var TAIAN = {
    '2026-01-01':1,'2026-01-07':1,'2026-01-13':1,'2026-01-24':1,'2026-01-30':1,
    '2026-10-02':1,'2026-10-08':1,'2026-10-13':1,'2026-10-19':1,'2026-10-25':1,'2026-10-31':1,
    '2026-11-06':1,'2026-11-10':1,'2026-11-16':1,'2026-11-22':1,'2026-11-28':1,
    '2026-12-04':1,'2026-12-09':1,'2026-12-15':1,'2026-12-21':1,'2026-12-27':1
  };

  var CAT_JP = {};   // 着物カテゴリ key -> 日本語タグ名
  /* ── 年末年始休業(色分けなし) ── */
  var CLOSED = {
    '2026-12-28':1,'2026-12-29':1,'2026-12-30':1,'2026-12-31':1,
    '2027-01-01':1,'2027-01-02':1,'2027-01-03':1,'2027-01-04':1
  };
  function pad(n){ return ('0'+n).slice(-2); }
  function dKey(y,m,d){ return y+'-'+pad(m+1)+'-'+pad(d); }
  /* 旧HPの料金カレンダー(site-data の priceMap)を正とし、記載のない日は休業=色なし */
  function priceMapFor(y,m){
    var key = location.pathname.indexOf('/nr/') !== -1 ? 'nr' : 'et';
    var st = window.SITE_DATA && window.SITE_DATA.studios && window.SITE_DATA.studios[key];
    var pm = st && st.calendar && st.calendar.priceMap;
    if(!pm) return null;
    return pm[y + '-' + pad(m+1)] || null;
  }
  function getTier(y,m,d){
    var month = priceMapFor(y,m);
    if(month){
      var tiers = ['a','b','c'];
      for(var i=0;i<3;i++){
        var t = tiers[i];
        if(month[t] && month[t].indexOf(d) !== -1) return t;
      }
      return '';   // 掲載なし=定休日・休業
    }
    var dow = new Date(y,m,d).getDay();
    var k = dKey(y,m,d);
    if(dow === 0 || JP_HOLIDAYS[k] || TAIAN[k]) return 'c';
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
        var cls = (CLOSED[k] || !tier) ? 'cal-top-day closed' : 'cal-top-day tier-' + tier;
        if(dow===0) cls += ' sun-col';
        if(dow===6) cls += ' sat-col';
        if(JP_HOLIDAYS[k] && dow!==0) cls += ' holiday';
        if(k === todayKey) cls += ' today';
        var taian = TAIAN[k] ? '<span class="cal-top-taian">大安</span>' : '';
        cells += '<div class="'+cls+'">'+d+taian+'</div>';
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
    // スタジオ撮影着物(既存カテゴリを流用=現行写真を自動表示)＋お詣り着物(新カテゴリ・後日データはめ込み)
    var GROUPS = [
      { key:'studio', label:'スタジオ撮影着物', en:'Studio Kimono' },
      { key:'mairi',  label:'お詣り着物',       en:'Omairi Kimono' }
    ];
    // 表示順(指定): 女の子(3→7→10) → 男の子(3→5→10) → お宮参り。3列表示で女は1行目・男は2行目に並ぶ
    var CATS = [
      { key:'3y-girl',  sub:'3 Year Old Girl',  jp:'三歳女の子', group:'studio', gender:'girl' },
      { key:'7y-girl',  sub:'7 Year Old Girl',  jp:'七歳女の子', group:'studio', gender:'girl' },
      { key:'10y-girl', sub:'10 Year Old Girl', jp:'十歳女の子', group:'studio', gender:'girl' },
      { key:'omairi',   sub:'Omiyamairi',       jp:'お宮参り',   group:'studio', gender:'' },
      { key:'3y-boy',   sub:'3 Year Old Boy',   jp:'三歳男の子', group:'studio', gender:'boy' },
      { key:'5y-boy',   sub:'5 Year Old Boy',   jp:'五歳男の子', group:'studio', gender:'boy' },
      { key:'10y-boy',  sub:'10 Year Old Boy',  jp:'十歳男の子', group:'studio', gender:'boy' },
      { key:'mairi-3g', sub:'3 Year Old Girl',  jp:'三歳女の子', group:'mairi', gender:'girl' },
      { key:'mairi-7g', sub:'7 Year Old Girl',  jp:'七歳女の子', group:'mairi', gender:'girl' },
      { key:'mairi-3b', sub:'3 Year Old Boy',   jp:'三歳男の子', group:'mairi', gender:'boy' },
      { key:'mairi-5b', sub:'5 Year Old Boy',   jp:'五歳男の子', group:'mairi', gender:'boy' }
    ];
    CATS.forEach(function(c){ if(!CAT_JP[c.key]) CAT_JP[c.key] = c.jp; });   // メニュー(key)→タグ(日本語)の対応
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

    // カテゴリ絞り込みバー(スマホのみ表示・CSS制御)。ALL=全カテゴリ(現状どおり)
    var bar = document.getElementById('kim-filter');
    if(!bar){
      bar = document.createElement('div');
      bar.className = 'kim-filter';
      bar.id = 'kim-filter';
      container.parentNode.insertBefore(bar, container);
    }
    // 複数選択の注釈(バー直後に1つだけ)
    var kimNote = document.getElementById('kim-filter-note');
    if(!kimNote){
      kimNote = document.createElement('p');
      kimNote.className = 'filter-note';
      kimNote.id = 'kim-filter-note';
      kimNote.textContent = '※ タグは複数選択できます（ALLで解除）';
      bar.parentNode.insertBefore(kimNote, bar.nextSibling);
    }
    // カードのタイトル別タグ(三歳女の子/七歳女の子…)。同名カードはスタジオ/お詣り両方を絞り込む
    var seenT = {}, tags = [];
    CATS.forEach(function(c){ if(seenT[c.jp]) return; seenT[c.jp] = true; tags.push(c.jp); });
    bar.innerHTML = '<button class="kim-filter-btn active" type="button" data-title="all" onclick="kimFilter(this)">ALL</button>'
      + tags.map(function(t){
          return '<button class="kim-filter-btn" type="button" data-title="' + t + '" onclick="kimFilter(this)">' + t + '</button>';
        }).join('');

    // TOP(#kimono-grid)は写真1枚のミニカード2列。data-full="1"(kimono.html)はカルーセル付きフル表示
    var isFull = container.getAttribute('data-full') === '1';
    container.className = isFull ? 'kim-cats' : 'kim-mini-grid';
    function fullCardHtml(c){
      // 一覧表示: 1着=1枚のフラットなグリッド(PC4列 / SP2列)
      var items = byCat[c.key] || [];
      if(items.length === 0){
        return '<div class="kim-item kim-cat kim-item-empty" data-cat="' + c.key + '" data-group="' + c.group + '" data-title="' + c.jp + '">'
          + '<div class="kim-item-img is-empty"><span>Coming Soon</span></div>'
        + '</div>';
      }
      return items.map(function(it, i){
        var f = it.file || '';
        var nm = it.name || (c.jp + ' ' + ('0' + (i+1)).slice(-2));
        return '<figure class="kim-item kim-cat" data-cat="' + c.key + '" data-group="' + c.group + '" data-title="' + c.jp + '"'
          + ' data-src="' + encodeURIComponent(f) + '" data-name="' + nm + '" onclick="kimZoom(this)" tabindex="0" role="button" aria-label="' + nm + ' を拡大">'
          + '<div class="kim-item-img" style="background-image:url(\'' + f + '\')"></div>'
        + '</figure>';
      }).join('');
    }
    function miniCardHtml(c){
      var items = byCat[c.key] || [];
      var has = items.length > 0;
      var f = has ? (items[0].file || '') : '';
      var img = has
        ? '<div class="kim-mini-img" style="background-image:url(\'' + f + '\')"></div>'
        : '<div class="kim-mini-img is-empty"><span>Coming Soon</span></div>';
      var count = has ? '<span class="kim-mini-count">' + items.length + '</span>' : '';
      return '<a class="kim-cat kim-mini" href="kimono.html#' + c.key + '"'
        + ' data-cat="' + c.key + '" data-group="' + c.group + '" data-gender="' + (c.gender||'') + '" data-title="' + c.jp + '">'
        + img
        + '<div class="kim-mini-cap"><span class="kim-mini-en">' + c.sub + '</span><span class="kim-mini-jp">' + c.jp + '</span>' + count + '</div>'
      + '</a>';
    }
    container.innerHTML = GROUPS.map(function(g){
      var inCats = CATS.filter(function(c){ return c.group === g.key; });
      // 一覧はカテゴリごとのサブセクション(見出しは上部に追従)
      var cards = isFull
        ? inCats.map(function(c){
            return '<section class="kim-sub" data-title="' + c.jp + '" data-cat="' + c.key + '">'
              + '<div class="kim-sub-head"><span class="kim-sub-jp">' + c.jp + '</span><span class="kim-sub-en">' + c.sub + '</span></div>'
              + '<div class="kim-list">' + fullCardHtml(c) + '</div>'
            + '</section>';
          }).join('')
        : inCats.map(miniCardHtml).join('');
      return '<div class="kim-group" data-group="' + g.key + '">'
        + '<div class="kim-group-head"><span class="kim-group-en">' + g.en + '</span><h3 class="kim-group-jp">' + g.label + '</h3></div>'
        + (isFull ? cards : '<div class="kim-group-cards">' + cards + '</div>')
      + '</div>';
    }).join('');
    // 一覧ページへの導線(TOPのみ・1つだけ)
    var more = document.getElementById('kim-more');
    if(!isFull && !more){
      more = document.createElement('div');
      more.id = 'kim-more';
      more.className = 'kim-more';
      more.innerHTML = '<a class="btn-line" href="kimono.html">着物一覧を見る <span aria-hidden="true">→</span></a>';
      container.parentNode.insertBefore(more, container.nextSibling);
    }
  }

  /* Costume(カジュアル衣装の物撮り)。Kimono と同じ構造・クラスで描画する。
     TOP(#costume-grid) はカテゴリのミニカード、costume.html(data-full="1") は一覧＋絞り込み。 */
  function renderCostumeCats(studio){
    var container = document.getElementById('costume-grid');
    if(!container) return;
    var items = (studio && studio.costume && Array.isArray(studio.costume.items)) ? studio.costume.items : [];
    // category を持たない(旧データ=衣装カード)の場合は既存の描画に任せる
    if(!items.length || !items.some(function(it){ return it.category; })) return;

    var GROUPS = [
      { key:'girl', label:'女の子', en:'Girls' },
      { key:'boy',  label:'男の子', en:'Boys'  }
    ];
    var CATS = [
      { key:'baby-girl', sub:'Baby',        jp:'ベビー', group:'girl' },
      { key:'1y-girl',   sub:'1 Year Old',  jp:'1歳',    group:'girl' },
      { key:'2y6y-girl', sub:'2-6 Years',   jp:'2〜6歳', group:'girl' },
      { key:'3y8y-girl', sub:'3-8 Years',   jp:'3〜8歳', group:'girl' },
      { key:'baby-boy',  sub:'Baby',        jp:'ベビー', group:'boy'  },
      { key:'1y-boy',    sub:'1 Year Old',  jp:'1歳',    group:'boy'  },
      { key:'2y6y-boy',  sub:'2-6 Years',   jp:'2〜6歳', group:'boy'  },
      { key:'3y7y-boy',  sub:'3-7 Years',   jp:'3〜7歳', group:'boy'  }
    ];
    var byCat = {};
    CATS.forEach(function(c){ byCat[c.key] = []; });
    items.forEach(function(it){
      var k = it.category || 'other';
      if(!byCat[k]) byCat[k] = [];
      byCat[k].push(it);
    });

    var isFull = container.getAttribute('data-full') === '1';
    container.className = isFull ? 'kim-cats' : 'kim-mini-grid';

    if(isFull){
      var bar = document.getElementById('cos-filter');
      if(!bar){
        bar = document.createElement('div');
        bar.className = 'kim-filter';
        bar.id = 'cos-filter';
        container.parentNode.insertBefore(bar, container);
      }
      var note = document.getElementById('cos-filter-note');
      if(!note){
        note = document.createElement('p');
        note.className = 'filter-note';
        note.id = 'cos-filter-note';
        note.textContent = '※ タグは複数選択できます（ALLで解除）';
        bar.parentNode.insertBefore(note, bar.nextSibling);
      }
      var seen = {}, tags = [];
      CATS.forEach(function(c){ if(seen[c.jp]) return; seen[c.jp] = true; tags.push(c.jp); });
      bar.innerHTML = '<button class="kim-filter-btn active" type="button" data-title="all" onclick="cosFilter(this)">ALL</button>'
        + tags.map(function(t){
            return '<button class="kim-filter-btn" type="button" data-title="' + t + '" onclick="cosFilter(this)">' + t + '</button>';
          }).join('');
    }

    function fullCardHtml(c){
      var list = byCat[c.key] || [];
      if(list.length === 0){
        return '<div class="kim-item kim-cat kim-item-empty" data-cat="' + c.key + '" data-group="' + c.group + '" data-title="' + c.jp + '">'
          + '<div class="kim-item-img is-empty"><span>Coming Soon</span></div>'
        + '</div>';
      }
      return list.map(function(it, i){
        var f = it.file || '';
        var nm = it.name || (c.jp + ' ' + ('0' + (i+1)).slice(-2));
        return '<figure class="kim-item kim-cat" data-cat="' + c.key + '" data-group="' + c.group + '" data-title="' + c.jp + '"'
          + ' data-src="' + encodeURIComponent(f) + '" data-name="' + nm + '" onclick="kimZoom(this)" tabindex="0" role="button" aria-label="' + nm + ' を拡大">'
          + '<div class="kim-item-img" style="background-image:url(\'' + f + '\')"></div>'
        + '</figure>';
      }).join('');
    }
    function miniCardHtml(c){
      var list = byCat[c.key] || [];
      var has = list.length > 0;
      var f = has ? (list[0].file || '') : '';
      var img = has
        ? '<div class="kim-mini-img" style="background-image:url(\'' + f + '\')"></div>'
        : '<div class="kim-mini-img is-empty"><span>Coming Soon</span></div>';
      var count = has ? '<span class="kim-mini-count">' + list.length + '</span>' : '';
      return '<a class="kim-cat kim-mini" href="costume.html#' + c.key + '"'
        + ' data-cat="' + c.key + '" data-group="' + c.group + '" data-title="' + c.jp + '">'
        + img
        + '<div class="kim-mini-cap"><span class="kim-mini-en">' + c.sub + '</span><span class="kim-mini-jp">' + c.jp + '</span>' + count + '</div>'
      + '</a>';
    }
    container.innerHTML = GROUPS.map(function(g){
      var inCats = CATS.filter(function(c){ return c.group === g.key; });
      var cards = isFull
        ? inCats.map(function(c){
            return '<section class="kim-sub" data-title="' + c.jp + '" data-cat="' + c.key + '">'
              + '<div class="kim-sub-head"><span class="kim-sub-jp">' + c.jp + '</span><span class="kim-sub-en">' + c.sub + '</span></div>'
              + '<div class="kim-list">' + fullCardHtml(c) + '</div>'
            + '</section>';
          }).join('')
        : inCats.map(miniCardHtml).join('');
      return '<div class="kim-group" data-group="' + g.key + '">'
        + '<div class="kim-group-head"><span class="kim-group-en">' + g.en + '</span><h3 class="kim-group-jp">' + g.label + '</h3></div>'
        + (isFull ? cards : '<div class="kim-group-cards">' + cards + '</div>')
      + '</div>';
    }).join('');

    var more = document.getElementById('cos-more');
    if(!isFull && !more){
      more = document.createElement('div');
      more.id = 'cos-more';
      more.className = 'kim-more';
      more.innerHTML = '<a class="btn-line" href="costume.html">衣装一覧を見る <span aria-hidden="true">→</span></a>';
      container.parentNode.insertBefore(more, container.nextSibling);
    }
  }

  /* Costume のカテゴリ絞り込み(cos-filter のボタンから呼ばれる) */
  window.cosFilter = function(btn){
    var bar = btn.parentNode;
    var isAll = btn.getAttribute('data-title') === 'all';
    var allBtn = bar.querySelector('.kim-filter-btn[data-title="all"]');
    if(isAll){
      Array.prototype.forEach.call(bar.querySelectorAll('.kim-filter-btn'), function(b){ b.classList.remove('active'); });
      if(allBtn) allBtn.classList.add('active');
    } else {
      btn.classList.toggle('active');
      if(allBtn) allBtn.classList.remove('active');
      if(!bar.querySelector('.kim-filter-btn.active') && allBtn) allBtn.classList.add('active');
    }
    var sel = Array.prototype.slice.call(bar.querySelectorAll('.kim-filter-btn.active'))
      .map(function(b){ return b.getAttribute('data-title'); })
      .filter(function(t){ return t && t !== 'all'; });
    Array.prototype.forEach.call(document.querySelectorAll('#costume-grid .kim-cat'), function(card){
      var show = sel.length === 0 || sel.indexOf(card.getAttribute('data-title')) !== -1;
      card.style.display = show ? '' : 'none';
    });
    Array.prototype.forEach.call(document.querySelectorAll('#costume-grid .kim-sub'), function(sub){
      var visible = Array.prototype.slice.call(sub.querySelectorAll('.kim-cat')).some(function(c){ return c.style.display !== 'none'; });
      sub.style.display = visible ? '' : 'none';
    });
    Array.prototype.forEach.call(document.querySelectorAll('#costume-grid .kim-group'), function(gEl){
      var visible = Array.prototype.slice.call(gEl.querySelectorAll('.kim-cat')).some(function(c){ return c.style.display !== 'none'; });
      gEl.style.display = visible ? '' : 'none';
    });
  };

  /* カテゴリ絞り込み(kim-filter のボタンから呼ばれる) */
  window.kimFilter = function(btn){
    var bar = btn.parentNode;
    var isAll = (btn.getAttribute('data-title') === 'all') || (btn.getAttribute('data-cat') === 'all');
    var allBtn = bar.querySelector('.kim-filter-btn[data-title="all"]') || bar.querySelector('.kim-filter-btn[data-cat="all"]');
    if(isAll){
      Array.prototype.forEach.call(bar.querySelectorAll('.kim-filter-btn'), function(b){ b.classList.remove('active'); });
      if(allBtn) allBtn.classList.add('active');
    } else {
      btn.classList.toggle('active');            // ALL以外は複数選択(トグル)
      if(allBtn) allBtn.classList.remove('active');
      if(!bar.querySelector('.kim-filter-btn.active') && allBtn) allBtn.classList.add('active');
    }
    var sel = Array.prototype.slice.call(bar.querySelectorAll('.kim-filter-btn.active'))
      .map(function(b){ return b.getAttribute('data-title'); })
      .filter(function(t){ return t && t !== 'all'; });
    Array.prototype.forEach.call(document.querySelectorAll('#kimono-grid .kim-cat'), function(card){
      var show = sel.length === 0 || sel.indexOf(card.getAttribute('data-title')) !== -1;
      card.style.display = show ? '' : 'none';
    });
    // サブセクション(カテゴリ見出し)は、中に表示中カードがあれば表示
    Array.prototype.forEach.call(document.querySelectorAll('#kimono-grid .kim-sub'), function(sub){
      var visible = Array.prototype.slice.call(sub.querySelectorAll('.kim-cat')).some(function(c){ return c.style.display !== 'none'; });
      sub.style.display = visible ? '' : 'none';
    });
    // グループ見出しは、そのグループに表示中カードが1枚でもあれば表示
    Array.prototype.forEach.call(document.querySelectorAll('#kimono-grid .kim-group'), function(gEl){
      var visible = Array.prototype.slice.call(gEl.querySelectorAll('.kim-cat')).some(function(c){ return c.style.display !== 'none'; });
      gEl.style.display = visible ? '' : 'none';
    });
    if(typeof window.syncKimFloat === 'function') window.syncKimFloat();   // フロートパネルの選択状態も合わせる
    scrollToKimonoTop();
  };

  /* タグは複数選択するので基本スクロールしない。
     絞り込み結果が画面より上に外れて何も見えない時だけ、カード先頭へ戻す */
  function scrollToKimonoTop(){
    var grid = document.getElementById('kimono-grid');
    if(!grid) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var rect = grid.getBoundingClientRect();
    if(rect.bottom > vh * 0.25) return;      // まだ見えているので動かさない
    var y = grid.getBoundingClientRect().top + window.scrollY - 72;   // 固定ヘッダー分オフセット
    var bar = document.getElementById('kim-filter');
    if(bar){
      var minY = bar.getBoundingClientRect().bottom + window.scrollY - 50;  // フィルタ列を画面上端付近に保つ
      y = Math.max(y, minY);
    }
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  /* ヘッダー/サイドメニューからの絞り込み。
     直接カードを操作するとタグバー・フロートメニューの表示と食い違うため、必ずタグバー経由で行う。
     メニューは「その1件を見る」操作なので、既存の選択は解除してから適用する(単一選択) */
  window.kimFilterCat = function(key){
    var bar = document.getElementById('kim-filter');
    if(!bar) return;
    var allBtn = bar.querySelector('.kim-filter-btn[data-title="all"]');
    Array.prototype.forEach.call(bar.querySelectorAll('.kim-filter-btn'), function(b){ b.classList.remove('active'); });
    if(key === 'all'){ if(allBtn) window.kimFilter(allBtn); return; }
    var jp = CAT_JP[key];
    var target = jp ? bar.querySelector('.kim-filter-btn[data-title="' + jp + '"]') : null;
    if(target) window.kimFilter(target);          // 解除済みなので active になる
    else if(allBtn) window.kimFilter(allBtn);     // 対応タグが無ければ全表示
  };

  /* 一覧の写真を拡大表示(前後送り付き) */
  function kimZoomList(){
    return Array.prototype.slice.call(document.querySelectorAll('#kimono-grid .kim-item[data-src], #costume-grid .kim-item[data-src]'))
      .filter(function(el){ return el.style.display !== 'none' && el.offsetParent !== null; });
  }
  function kimZoomShow(list, idx){
    var ov = document.getElementById('kim-zoom');
    if(!ov || !list.length) return;
    idx = (idx + list.length) % list.length;
    ov.dataset.idx = String(idx);
    var el = list[idx];
    var img = ov.querySelector('img');
    img.src = decodeURIComponent(el.getAttribute('data-src') || '');
    img.alt = el.getAttribute('data-name') || '';
    var nav = ov.querySelector('.kim-zoom-count');
    if(nav) nav.textContent = (idx + 1) + ' / ' + list.length;
  }
  window.kimZoomStep = function(dir){
    var ov = document.getElementById('kim-zoom');
    if(!ov) return;
    var list = kimZoomList();
    kimZoomShow(list, parseInt(ov.dataset.idx || '0', 10) + dir);
  };
  window.kimZoom = function(el){
    if(!el.getAttribute('data-src')) return;
    var ov = document.getElementById('kim-zoom');
    if(!ov){
      ov = document.createElement('div');
      ov.id = 'kim-zoom';
      ov.className = 'kim-zoom';
      ov.innerHTML =
          '<button class="kim-zoom-close" type="button" aria-label="閉じる">✕</button>'
        + '<button class="kim-zoom-nav kim-zoom-prev" type="button" aria-label="前の着物"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 6-6 6 6 6"/></svg></button>'
        + '<img alt="">'
        + '<button class="kim-zoom-nav kim-zoom-next" type="button" aria-label="次の着物"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9.5 6 6 6-6 6"/></svg></button>'
        + '<span class="kim-zoom-count"></span>';
      ov.addEventListener('click', function(e){
        var prev = e.target.closest && e.target.closest('.kim-zoom-prev');
        var next = e.target.closest && e.target.closest('.kim-zoom-next');
        if(prev){ window.kimZoomStep(-1); return; }
        if(next){ window.kimZoomStep(1); return; }
        if(e.target === ov || (e.target.closest && e.target.closest('.kim-zoom-close'))) ov.classList.remove('is-open');
      });
      document.addEventListener('keydown', function(e){
        if(!ov.classList.contains('is-open')) return;
        if(e.key === 'Escape') ov.classList.remove('is-open');
        else if(e.key === 'ArrowLeft') window.kimZoomStep(-1);
        else if(e.key === 'ArrowRight') window.kimZoomStep(1);
      });
      document.body.appendChild(ov);
    }
    var list = kimZoomList();
    kimZoomShow(list, list.indexOf(el));
    ov.classList.add('is-open');
  };

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
    var phone = (studio && (studio.tel || studio.phone)) || '050-1751-2601';

    // CMSにブロックがあれば動的描画。なければ既存HTMLのフォールバックを使う
    if(blocks && blocks.length > 0){
      grid.innerHTML = blocks.map(function(b){
        var bookHref = b.bookingUrl || bookUrlFallback;
        var notes = (b.notes||[]).map(function(n){
          if(n && typeof n === 'object'){
            var sub = n.sub ? '<span class="res-note-sub">' + n.sub + '</span>' : '';
            var link = (n.link && n.link.href) ? '<span class="res-note-sub"><a href="' + n.link.href + '" class="res-note-link">' + (n.link.label||n.link.href) + '</a></span>' : '';
            return '<li><span>' + (n.text||'') + sub + link + '</span></li>';
          }
          return '<li>' + n + '</li>';
        }).join('');
        // 撮影予約ブロックは et./nr. の予約する›展開メニューに(お詣り日等は専用リンクのまま)
        var isSatsuei = (b.title||'').indexOf('撮影予約') !== -1;
        var ET_BOOK='https://studio-et.stores.jp/reserve/hashima/733693';
        var NR_BOOK='https://www.instagram.com/maison_nr._/';
        var pairHtml = '<a class="bb-btn bb-et" href="'+ET_BOOK+'" target="_blank" rel="noopener"><span class="bb-logo" role="img" aria-label="Studio et." style="aspect-ratio:672/445;-webkit-mask:url(../assets/et-logo.png) center/contain no-repeat;mask:url(../assets/et-logo.png) center/contain no-repeat"></span><span class="bb-cta">予約する<span aria-hidden="true">→</span></span></a>'
          + '<a class="bb-btn bb-nr" href="'+NR_BOOK+'" target="_blank" rel="noopener"><span class="bb-logo" role="img" aria-label="Maison nr." style="aspect-ratio:1600/821;-webkit-mask:url(../assets/nr-logo.png) center/contain no-repeat;mask:url(../assets/nr-logo.png) center/contain no-repeat"></span><span class="bb-cta">予約する<span aria-hidden="true">→</span></span></a>';
        var bookBtn = isSatsuei
          ? '<div class="hdr-book-wrap"><button class="hdr-book-toggle" type="button" onclick="toggleHdrBook(event)" aria-haspopup="true" aria-expanded="false">予約する<span class="hdr-book-chev" aria-hidden="true">›</span></button><div class="hdr-book-menu" hidden>'+pairHtml+'</div></div>'
          : '<a href="' + bookHref + '" class="btn-line filled">' + (b.bookingLabel||'ご予約はこちら') + '</a>';
        return '<div class="res-top-block">'
          + '<div class="res-top-head">'
            + '<span class="res-top-mark">' + (b.mark||'') + '</span>'
            + '<h3 class="res-top-title">' + (b.title||'') + '</h3>'
          + '</div>'
          + '<div class="res-top-btns">'
            + bookBtn
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
    renderCostumeCats(studio);
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
