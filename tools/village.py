#!/usr/bin/env python3
"""Trial port: copy 단어 마을's own art (tile library, villagers, dog, ! ? ★ markers) out of src/daneo-maul.html into src/village.js,
verbatim, so the walk-engine build draws exactly what the old game drew. Run after changing any of that code in daneo-maul.html."""
import pathlib
root=pathlib.Path(__file__).resolve().parent.parent
L=(root/'src/daneo-maul.html').read_text(encoding='utf-8').split('\n')
def find(prefix,start=0):
    for i in range(start,len(L)):
        if L[i].startswith(prefix):return i
    raise SystemExit('not found: '+prefix)
eng=find('/* ---------- canvas + tile library')
a=find('function grass(',eng);b=find('function tile(',a)
tiles='\n'.join(L[a:b]).rstrip()
c=find('function drawChar(',b);d=find('/* follower',c)
chars='\n'.join(L[c:d]).rstrip()
old='function drawChar(c,X,Y,dir,step){\n  const L=c.look,'
assert old in chars,'drawChar changed shape'
chars=chars.replace(old,'function drawChar(L,X,Y,dir,step){\n  const ')
m=find('function marker(',d);m2=find('function status(',m)
marker='\n'.join(L[m:m2]).rstrip()
say=L[find('const sayAt=')]+'\n'+L[find('const TREES=')]
out=f'''/* 단어 마을's own art, kept exactly as it was drawn before the move to the shared walk engine: the tile library, the villagers,
   the dog and the ! ? ★ markers. GENERATED from src/daneo-maul.html by tools/village.py during the trial port; don't edit here.
   Tiles use the engine's r, g and hash; `at` here answers 'T' (a tree) off the map, as the old engine did, so edge tiles look the same. */
var VILLAGE=(()=>{{
const at=(x,y)=>(x<0||y<0||x>=MW||y>=MH)?'T':MAP[y][x];
const front=(x,y)=>at(x,y+1)!==at(x,y); // bottom edge of a building wall
const walkable=(x,y)=>!!(Z.legend[at(x,y)]||{{}}).walk;
{tiles}

/* people: drawChar(look, …) is the old drawChar(c, …) with c.look passed in directly (the engine calls look.draw(look,X,Y,dir,step)) */
{chars}
{marker}
{say}
return {{TILES,drawChar,drawDog,marker,sayAt,TREES}};
}})();
'''
(root/'src/village.js').write_text(out,encoding='utf-8')
print('wrote src/village.js')

# --cartridges: (re)import the cartridges themselves, one file each, verbatim (each was its own <script> in the old page) into
# src/cartridges/cN.js. On the walk-port branch those files are the source (7편's 편집장 also reviews 보도하다), so this overwrites
# them: use it only to bring in cartridges edited in src/daneo-maul.html, then re-apply such changes.
import re,sys
if '--cartridges' not in sys.argv:sys.exit(0)
src=(root/'src/daneo-maul.html').read_text(encoding='utf-8')
outdir=root/'src/cartridges';outdir.mkdir(exist_ok=True)
for f in outdir.glob('c*.js'):f.unlink()
n=0
for m in re.finditer(r'<script>\n(.*?)</script>',src,re.S):
    body=m.group(1)
    if 'CARTRIDGES.push(' not in body or 'canvas + tile library' in body:continue
    cid=re.search(r"CARTRIDGES\.push\(\{\s*id:'(c\d+)'",body).group(1)
    (outdir/f'{cid}.js').write_text('/* GENERATED from src/daneo-maul.html by tools/village.py (trial port): this cartridge, verbatim. */\n'+body,encoding='utf-8')
    n+=1
print('wrote',n,'cartridges to src/cartridges/')
