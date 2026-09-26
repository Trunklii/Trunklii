# Aharoni CLM Book の輪郭を内側に offset して細い派生版を作る（GPL v2 の改変）
# 使い方: /usr/bin/python3 make-thin-font.py AharoniCLM-Book.otf AharoniCLM-BookThin.ttf 8
# （fontTools と pyclipper が要る。最後の数字＝片側を削る量。単位は 1/1090 em。2026-09-26 は 8＝縦線 74→58）
import sys, pyclipper
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen
from fontTools.pens.ttGlyphPen import TTGlyphPen
src, dst, delta = sys.argv[1], sys.argv[2], float(sys.argv[3])
S = 64.0  # 精度用の拡大
class Flat(BasePen):
    def __init__(s, gs): super().__init__(gs); s.cs=[]; s.cur=None
    def _moveTo(s,p): s.cur=[p]; s.cs.append(s.cur)
    def _lineTo(s,p): s.cur.append(p)
    def _curveToOne(s,a,b,c):
        p0=s.cur[-1]; n=16
        for i in range(1,n+1):
            t=i/n; u=1-t
            s.cur.append((u**3*p0[0]+3*u*u*t*a[0]+3*u*t*t*b[0]+t**3*c[0], u**3*p0[1]+3*u*u*t*a[1]+3*u*t*t*b[1]+t**3*c[1]))
    def _qCurveToOne(s,a,b):
        p0=s.cur[-1]; n=12
        for i in range(1,n+1):
            t=i/n; u=1-t
            s.cur.append((u*u*p0[0]+2*u*t*a[0]+t*t*b[0], u*u*p0[1]+2*u*t*a[1]+t*t*b[1]))
    def _closePath(s): pass
    def _endPath(s): pass

from fontTools.fontBuilder import FontBuilder
t = TTFont(src); gs = t.getGlyphSet(); order = t.getGlyphOrder()
glyphs = {}; metrics = {}
for name in order:
    pen = Flat(gs); gs[name].draw(pen)
    polys = [[(round(x*S), round(y*S)) for x,y in c] for c in pen.cs if len(c) >= 3]
    tp = TTGlyphPen(None)
    if polys:
        pc = pyclipper.Pyclipper(); pc.AddPaths(polys, pyclipper.PT_SUBJECT, True)
        uni = pc.Execute(pyclipper.CT_UNION, pyclipper.PFT_NONZERO, pyclipper.PFT_NONZERO)
        po = pyclipper.PyclipperOffset(miter_limit=3.0, arc_tolerance=0.25*S)
        po.AddPaths(uni, pyclipper.JT_MITER, pyclipper.ET_CLOSEDPOLYGON)
        out = pyclipper.CleanPolygons(po.Execute(-delta*S), 0.3*S)
        for c in out:
            if len(c) < 3: continue
            c = list(reversed(c))  # TrueType は外側が時計回り
            tp.moveTo((round(c[0][0]/S), round(c[0][1]/S)))
            for x,y in c[1:]: tp.lineTo((round(x/S), round(y/S)))
            tp.closePath()
    g = tp.glyph(); glyphs[name] = g
    xs = [pt[0] for pt in g.coordinates] if g.numberOfContours else []
    metrics[name] = (t['hmtx'][name][0], min(xs) if xs else 0)
fb = FontBuilder(t['head'].unitsPerEm, isTTF=True)
fb.setupGlyphOrder(order); fb.setupCharacterMap(t.getBestCmap())
fb.setupGlyf(glyphs); fb.setupHorizontalMetrics(metrics)
h=t['hhea']; fb.setupHorizontalHeader(ascent=h.ascent, descent=h.descent, lineGap=h.lineGap)
o=t['OS/2']
fb.setupOS2(sTypoAscender=o.sTypoAscender, sTypoDescender=o.sTypoDescender, sTypoLineGap=o.sTypoLineGap,
            usWinAscent=o.usWinAscent, usWinDescent=o.usWinDescent, usWeightClass=300, fsType=0,
            sxHeight=getattr(o,'sxHeight',0), sCapHeight=getattr(o,'sCapHeight',0))
fb.setupNameTable({'familyName':'Aharoni CLM Thin (modified)','styleName':'Regular',
   'uniqueFontIdentifier':'AharoniCLM-BookThin-modified','fullName':'Aharoni CLM Thin (modified)',
   'psName':'AharoniCLM-BookThin','version':'Version 0.140 modified 2026-09-26 (outline inset %s units)'%delta,
   'copyright':'Based on Aharoni CLM (Culmus 0.140), GNU GPL v2. Outlines inset by Trunklii 2026-09-26.',
   'licenseDescription':'GNU General Public License v2 (see Culmus-GNU-GPL.txt)'})
fb.setupPost()
for tag in ('GPOS','GSUB','GDEF','kern'):
    if tag in t: fb.font[tag] = t[tag]
fb.save(dst); print('saved', dst, len(order))
