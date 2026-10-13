#!/usr/bin/env python3
"""Assemble index.html from src/ on the shared walk engine: shell + dictionary + chapter registry + 단어 마을's art + the cartridge
kit + the chapters (src/chapters/cN.js) + game settings + engine.
(The old single-file game is src/daneo-maul.html, built by tools/build_legacy.py, until every cartridge is ported.)"""
import pathlib,re,sys,json
root=pathlib.Path(__file__).parent
shell=(root/'src/shell.html').read_text(encoding='utf-8')
chs=sorted((root/'src/chapters').glob('c*.js'),key=lambda p:int(re.search(r'\d+',p.stem).group()))
if '--chapters' in sys.argv: # publish only finished chapters: --chapters c1,c3
    keep=sys.argv[sys.argv.index('--chapters')+1].split(',');chs=[p for p in chs if p.stem in keep]
lexmap=json.loads((root/'src/lexicon-map.json').read_text(encoding='utf-8')) if (root/'src/lexicon-map.json').exists() else {}
defs_p=root/'lexicon/defs.json'
alldefs=json.loads(defs_p.read_text(encoding='utf-8')) if defs_p.exists() else {}
used={l for ls in lexmap.values() for l in ls}
used|={m for p in (root/'src/chapters').glob('c*.js') for s in re.findall(r"const WORDS=\[(.*?)\];",p.read_text(encoding='utf-8'),re.S) for m in re.findall(r"'([^']+)'",s)}  # native chapters' badge words
lex={'map':{k:v for k,v in lexmap.items() if any(l in alldefs and alldefs[l] for l in v)},'defs':{l:d for l,d in alldefs.items() if l in used and d}}
parts=['<script>\n/* Tap-a-word dictionary: word as written → dictionary forms, and learner definitions (lexicon/). */\nwindow.LEX='+json.dumps(lex,ensure_ascii=False,separators=(',',':'))+';\n</script>',
 '<script>\n/* Chapters register themselves here; each keeps its own save. */\nconst CHAPTERS=[];\n</script>']
parts.append(f'<script>\n{(root/"src/village.js").read_text(encoding="utf-8")}</script>')  # 단어 마을's own tiles, people and markers
parts.append(f'<script>\n{(root/"src/kit.js").read_text(encoding="utf-8")}</script>')  # 단어 마을's chapter kit
parts+=[f'<script>\n{p.read_text(encoding="utf-8")}</script>' for p in chs]
parts.append(f'<script>\n{(root/"src/game.js").read_text(encoding="utf-8")}</script>')  # this game's settings for the shared engine
parts.append(f'<script>\n{(root/"src/engine.js").read_text(encoding="utf-8")}</script>')
out=pathlib.Path(sys.argv[sys.argv.index('--out')+1]) if '--out' in sys.argv else root/'index.html'
# The version: a hash of everything built, and when that version first appeared. version.json keeps the time, so a rebuild with
# no change keeps it (and index.html stays the same); the engine shows it in START, puts it in reports, and an open game reads
# version.json to update itself. A build elsewhere (--out: the playtests) only reads it.
import hashlib,datetime,json
ver=hashlib.sha256(shell.replace('<!--SCRIPTS-->','\n'.join(parts)).encode('utf-8')).hexdigest()[:8]
vp=root/'version.json'
try: old=json.loads(vp.read_text(encoding='utf-8'))
except Exception: old={}
stamp={'v':ver,'t':old['t'] if old.get('v')==ver and old.get('t') else datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')}
if '--out' not in sys.argv and old!=stamp: vp.write_text(json.dumps(stamp)+'\n',encoding='utf-8')
parts.insert(len(parts)-1,'<script>\n/* This build (version.json): v = a hash of the game, t = when this version first appeared. */\nglobalThis.BUILD='+json.dumps(stamp)+';\n</script>')  # just before the engine
out.write_text(shell.replace('<!--SCRIPTS-->','\n'.join(parts)),encoding='utf-8')
print('built',out.name,'with',len(chs),'chapter(s)')
