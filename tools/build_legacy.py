#!/usr/bin/env python3
"""Build index.html: src/daneo-maul.html + the tap-a-word dictionary (lexicon/) injected before the game scripts."""
import json,pathlib
root=pathlib.Path(__file__).resolve().parent.parent
html=(root/'src/daneo-maul.html').read_text(encoding='utf-8')
lexmap=json.loads((root/'src/lexicon-map.json').read_text(encoding='utf-8'))
alldefs=json.loads((root/'lexicon/defs.json').read_text(encoding='utf-8'))
used={l for ls in lexmap.values() for l in ls}
lex={'map':{k:v for k,v in lexmap.items() if any(alldefs.get(l) for l in v)},'defs':{l:d for l,d in alldefs.items() if d}}  # all definitions: new cartridges get stem/prefix matches without a rebuild
tag='<script>\n/* Tap-a-word dictionary: word as written → dictionary forms + learner definitions (lexicon/). */\nwindow.LEX='+json.dumps(lex,ensure_ascii=False,separators=(',',':'))+';\n</script>\n'
i=html.index('<script>')
import sys
out=pathlib.Path(sys.argv[sys.argv.index('--out')+1]) if '--out' in sys.argv else root/'index.html'
out.write_text(html[:i]+tag+html[i:],encoding='utf-8')
print('built index.html ·',len(lex['defs']),'definitions')
