/* ===== 本当に見えているかを判定する ===================================
   display だけ見ると、閉じた引き出し（transform で画面外へ逃がしたもの）や
   opacity:0、他の要素に覆われたものを「見えている」と誤判定する。

   使う前に必ず2つ守る。守らないと、自信たっぷりに間違った答えが返る。
   (1) ブラウザの窓に幅と高さがあること。innerWidth が 0 だと全部の寸法が
       でたらめになる（実際に閉じた引き出しを「見えている」と誤判定した）。
       → 判定器が先に止めるようにしてある。
   (2) スクロールして出てくる要素（Trunklii の .reveal）は、先に画面へ
       入れてから測ること。入れないと opacity:0 のまま「見えていない」と出る。
       → scrollFirst:true を渡すと、判定器が自分でスクロールして待つ。
   ===================================================================== */

function isVisible(el, opt) {
  const o = Object.assign({ needInViewport: false, minOpacity: 0.05 }, opt || {});

  if (document.visibilityState !== 'visible') {
    throw new Error('ブラウザの画面が隠れています（visibilityState=' + document.visibilityState + '）。フェードインが途中で止まり opacity=0 のまま「見えていない」と誤判定するので、画面を表に出してからやり直してください。');
  }
  if (!innerWidth || !innerHeight) {
    throw new Error('ブラウザの窓が 0×0 です（ペインが閉じている等）。寸法が測れないので判定しません。窓に大きさを与えてからやり直してください。');
  }
  if (!el || !el.isConnected) return { ok: false, why: 'DOMに無い' };

  // 1) 祖先をたどる: display / visibility / hidden / inert / opacity の積
  let n = el, opacity = 1;
  while (n && n.nodeType === 1) {
    const s = getComputedStyle(n);
    if (s.display === 'none')             return { ok: false, why: 'display:none', at: path(n) };
    if (s.visibility !== 'visible')       return { ok: false, why: 'visibility:' + s.visibility, at: path(n) };
    if (n.hidden)                         return { ok: false, why: 'hidden属性', at: path(n) };
    if (n.inert)                          return { ok: false, why: 'inert', at: path(n) };
    if (s.contentVisibility === 'hidden') return { ok: false, why: 'content-visibility:hidden', at: path(n) };
    opacity *= parseFloat(s.opacity) || 0;
    if (opacity < o.minOpacity) {
      const rv = n.classList.contains('reveal');
      return { ok: false, why: 'opacity=' + opacity.toFixed(3) + (rv ? '（.reveal。scrollFirst:true で測り直す）' : ''), at: path(n) };
    }
    n = n.parentElement;
  }

  // 2) 面積があるか
  const r = el.getBoundingClientRect();
  if (r.width < 1 || r.height < 1) {
    return { ok: false, why: '面積0 (' + Math.round(r.width) + '×' + Math.round(r.height) + ')' };
  }

  // 3) 文書の外へ逃がされていないか（閉じた引き出しは transform: -1440px 等）
  const dw = document.documentElement.scrollWidth, dh = document.documentElement.scrollHeight;
  const ax = r.left + scrollX, ay = r.top + scrollY;
  if (ax + r.width <= 0 || ay + r.height <= 0 || ax >= dw || ay >= dh) {
    return { ok: false, why: '文書の外に置かれている（x=' + Math.round(ax) + '）', rect: { x: Math.round(ax), y: Math.round(ay), w: Math.round(r.width), h: Math.round(r.height) } };
  }

  // 4) 何かに覆われていないか（中心点にその要素自身が居るか）
  const inView = r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  if (inView) {
    const cx = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1);
    const cy = Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 1);
    const top = document.elementFromPoint(cx, cy);
    if (top && top !== el && !el.contains(top) && !top.contains(el)) {
      return { ok: false, why: '他の要素に覆われている', by: path(top) };
    }
  } else if (o.needInViewport) {
    return { ok: false, why: '画面の外（スクロールすれば見える）' };
  }

  return { ok: true, rect: { x: Math.round(ax), y: Math.round(ay), w: Math.round(r.width), h: Math.round(r.height) }, opacity: +opacity.toFixed(3), inView };
}

function path(el) {
  const p = [];
  for (let n = el; n && n.nodeType === 1 && p.length < 4; n = n.parentElement) {
    p.unshift(n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') +
      (n.classList.length ? '.' + [...n.classList].slice(0, 2).join('.') : ''));
  }
  return p.join(' > ');
}

/* まとめて見る。scrollFirst:true なら1つずつ画面へ入れてから測る（.reveal 用） */
async function visibleAll(selector, opt) {
  const o = opt || {};
  const els = [...document.querySelectorAll(selector)];
  const rows = [];
  for (const el of els) {
    if (o.scrollFirst) { el.scrollIntoView({ block: 'center' }); await new Promise((r) => setTimeout(r, 400)); }
    let v; try { v = isVisible(el, o); } catch (e) { return String(e.message); }
    rows.push({
      文言: (el.innerText || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 30),
      場所: path(el),
      見えている: v.ok,
      理由: v.ok ? '' : v.why + (v.at ? ' @ ' + v.at : '') + (v.by ? ' ← ' + v.by : ''),
      大きさ: v.rect ? v.rect.w + '×' + v.rect.h : '',
    });
  }
  return rows;
}

/* 使い方
   console.table(await visibleAll('a[href*="studio-et.stores.jp"]'));
   console.table(await visibleAll('#plans, #about, #calendar', { scrollFirst: true }));
   isVisible(document.querySelector('#about'));
*/
