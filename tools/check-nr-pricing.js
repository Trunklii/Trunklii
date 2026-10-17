#!/usr/bin/env node
/**
 * nr. の料金が食い違っていないかを機械的に確かめる。
 *
 *   node tools/check-nr-pricing.js
 *
 * 同じ金額が複数の場所にあるので、ずれるとお客様に違う値段が出る。
 * ここで見るのは site-data.js の中の2か所:
 *   studios.nr.menuSheets   … 紙の料金表（撮影料金・プラン単価）。plans.html はここから描く
 *   studios.nr.plans[].variants … 組み合わせの合計。TOPカードと plan-detail.html が使う
 * 合計が「撮影料金 ＋ プラン」になっていなければ、どちらかが古い。
 *
 * 予約システム（Portal の booking_menus）とも同じ金額を持っているが、
 * そちらは DB なのでここからは読めない。料金を変えたときは両方直すこと。
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'site-data.js');
const src = fs.readFileSync(file, 'utf8');
const i = src.indexOf('window.SITE_DATA =');
const data = JSON.parse(src.slice(i + 'window.SITE_DATA ='.length).trim().replace(/;\s*$/, ''));
const nr = data.studios.nr;

const yen = (s) => {
  const m = String(s == null ? '' : s).match(/[\d,]+/g);
  return m ? parseInt(m.join('').replace(/,/g, ''), 10) : NaN;
};

const problems = [];
const ok = [];

// ── 1) 753: variants の合計が「撮影料金 ＋ プラン」になっているか ──
const sheet = (nr.menuSheets || []).find((s) => s.key === '753');
const plan753 = (nr.plans || []).find((p) => p.key === '753');
if (!sheet || !plan753) {
  problems.push('753 の menuSheets か plans が無い');
} else {
  const fees = (sheet.steps.find((s) => s.type === 'fees') || {}).items || [];
  const tiers = (sheet.steps.find((s) => s.type === 'plans') || {}).items || [];
  const expected = new Map();
  for (const t of tiers) for (const f of fees) {
    expected.set(t.name.replace(/\s/g, '') + '|' + f.label.replace(/\s/g, ''), t.price + f.price);
  }
  if (plan753.variants.length !== expected.size) {
    problems.push(`753 の組み合わせ数が違う: variants ${plan753.variants.length} 件 / 料金表からは ${expected.size} 通り`);
  }
  // label は「生花髪飾り／3・5歳 男の子」。「／」で割って、プラン名と年齢をそれぞれ突き合わせる。
  // 前方一致で拾うと「生花髪飾り ＋ 空間装飾」が「生花髪飾り」に食われるので、必ず分割して比べる。
  const norm = (x) => String(x).replace(/\s/g, '').replace('3歳・5歳', '3・5歳');
  for (const v of plan753.variants) {
    const [tierName, feeLabel] = String(v.label).split('／').map(norm);
    const key = [...expected.keys()].find((k) => {
      const [tn, fl] = k.split('|');
      return norm(tn) === tierName && norm(fl) === feeLabel;
    });
    if (!key) { problems.push(`753 「${v.label}」が料金表の組み合わせに無い`); continue; }
    const want = expected.get(key);
    if (yen(v.price) !== want) problems.push(`753 「${v.label}」= ${v.price} だが、料金表では ¥${want.toLocaleString()}`);
    else ok.push(`753 ${v.label} = ${v.price}`);
  }
}

// ── 2) Birthday: variants の金額が料金表と一致しているか ──
const bdSheet = (nr.menuSheets || []).find((s) => s.key === 'birthday');
const bdPlan = (nr.plans || []).find((p) => p.key === 'birthday');
if (!bdSheet || !bdPlan) {
  problems.push('birthday の menuSheets か plans が無い');
} else {
  const base = ((bdSheet.steps.find((s) => s.type === 'plans') || {}).items || [])[0];
  const v = bdPlan.variants[0];
  if (!base || !v) problems.push('birthday の金額が読めない');
  else if (yen(v.price) !== base.price) problems.push(`Birthday = ${v.price} だが、料金表では ¥${base.price.toLocaleString()}`);
  else ok.push(`Birthday = ${v.price}`);
}

// ── 3) plans.html に金額が直書きされていないか ──
const plansHtml = fs.readFileSync(path.join(__dirname, '..', 'nr', 'plans.html'), 'utf8');
const body = plansHtml.slice(plansHtml.indexOf('<body'));
const hard = [...body.matchAll(/¥[\d,]{3,}/g)].map((m) => m[0]);
if (hard.length) problems.push(`nr/plans.html に金額の直書きが ${hard.length} 件: ${[...new Set(hard)].join(', ')}`);
else ok.push('nr/plans.html に金額の直書きなし');

// ── 4) llms.txt にも同じ金額が書いてあるか ──
// llms.txt は AI検索エンジンが読む。ここがずれると、AIが古い料金を答える。
const llms = fs.readFileSync(path.join(__dirname, '..', 'llms.txt'), 'utf8');
if (sheet) {
  const want = [];
  for (const st of sheet.steps) {
    if (st.type === 'fees' || st.type === 'plans') for (const it of st.items) want.push(it.price);
  }
  const bdBase = bdSheet && ((bdSheet.steps.find((s) => s.type === 'plans') || {}).items || [])[0];
  if (bdBase) want.push(bdBase.price);
  const omSh = (nr.menuSheets || []).find((s) => s.key === 'omiyamairi');
  const omB = omSh && ((omSh.steps.find((s) => s.type === 'plans') || {}).items || [])[0];
  if (omB) want.push(omB.price);
  const missing = want.filter((n) => !llms.includes('¥' + Number(n).toLocaleString('ja-JP')));
  if (missing.length) problems.push(`llms.txt に無い金額: ${missing.map((n) => '¥' + n.toLocaleString()).join(', ')}`);
  else ok.push('llms.txt に nr. の金額がすべて載っている');
}
if (/Birthday[^\n]*未発表/.test(llms)) problems.push('llms.txt に「Birthday は未発表」の記載が残っている');

// ── 5) プラン構成：七五三・お宮参り・Baby & Kids は並ぶ 3 つの料金表（お宮参りは Baby & Kids の中ではない。2026-10-17 川島さん）──
const keys = (nr.plans || []).map((p) => p.key).join(' / ');
if (keys !== '753 / omiyamairi / birthday / comingsoon') problems.push(`nr.plans の構成が想定と違う: ${keys}`);
else ok.push('nr.plans = 753 / omiyamairi / birthday / comingsoon');
const sheetKeys = (nr.menuSheets || []).map((s) => s.key).join(' / ');
if (sheetKeys !== '753 / omiyamairi / birthday') problems.push(`nr.menuSheets の構成が想定と違う: ${sheetKeys}`);
else ok.push('nr.menuSheets = 753 / omiyamairi / birthday');
const omSheet = (nr.menuSheets || []).find((s) => s.key === 'omiyamairi');
const omPlan = (nr.plans || []).find((p) => p.key === 'omiyamairi');
const omBase = omSheet && ((omSheet.steps.find((s) => s.type === 'plans') || {}).items || [])[0];
if (!omPlan || !omBase || !omPlan.variants[0]) problems.push('お宮参りの plans か料金表が無い');
else if (yen(omPlan.variants[0].price) !== omBase.price) problems.push(`お宮参り = ${omPlan.variants[0].price} だが、料金表では ¥${omBase.price.toLocaleString()}`);
else ok.push(`お宮参り = ${omPlan.variants[0].price}`);
// Baby & Kids の料金表とカードに、お宮参りが残っていないか
const bdItems = bdSheet ? ((bdSheet.steps.find((s) => s.type === 'plans') || {}).items || []) : [];
if (bdItems.some((it) => /お宮参り|OMIYAMAIRI/i.test(it.name + it.en)) || /OMIYAMAIRI/i.test(bdSheet && bdSheet.eyebrow)) problems.push('Baby & Kids の料金表にお宮参りが残っている');
if (bdPlan && (bdPlan.variants.some((v) => /お宮参り/.test(v.label)) || /お宮参り/.test(bdPlan.desc + (bdPlan.detail || {}).longDescription))) problems.push('Baby & Kids のカード（plans）にお宮参りが残っている');
if (bdPlan && bdPlan.variants.length !== bdItems.length) problems.push(`Baby & Kids の組み合わせ ${bdPlan.variants.length} 件 / 料金表 ${bdItems.length} 件`);
// sheetKey（TOP のカードの行き先の料金表）を使うときは、実在する料金表を指しているか
for (const p of nr.plans || []) {
  if (p.sheetKey && !(nr.menuSheets || []).some((s) => s.key === p.sheetKey)) problems.push(`${p.key} の sheetKey「${p.sheetKey}」の料金表が無い`);
}

console.log(ok.map((s) => '  OK  ' + s).join('\n'));
if (problems.length) {
  console.error('\n食い違いが ' + problems.length + ' 件あります:');
  problems.forEach((p) => console.error('  NG  ' + p));
  process.exit(1);
}
console.log('\n食い違いはありません。');
