# Writing a 단어 마을 chapter (편) on the walk engine

단어 마을 runs on the shared walk engine (https://github.com/Stan-Stani/walk-engine, also used by 성실호, 형제 and 방과 후) and
keeps its own look: the tiles, villagers, dogs and the ! ? ★ markers are drawn by `src/village.js`. A chapter (편, a "cartridge")
is one village map with its people, words and story, in one file: `src/chapters/cN.js`. Copy `src/chapters/c1.js`, the reference.

## The learner
Rusty intermediate Korean (about TOPIK 3) on a phone. Dialogue is Korean only, in short 해요체 sentences; English appears only in
`DICT[w].e` (behind the ? button). Every wrong option explains the right form gently in Korean.

## Shape of a chapter
```js
CHAPTERS.push({id:'c10',n:'10편',title:'…',color:'#…',save:'daneo-maul-v10',   // save: a new key, never reuse or change one
 words:9,place:'단어 · 단어 · …',start:{zone:'village',x,y,dir:'down'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),          // the chapter's own state with its defaults (stage, book…), and old saves
 make:()=>{
  const WORDS=['…'];                                         // the badge words, in order
  const DICT={'…':{k:'easy Korean definition',e:'English',ex:'예문 from the chapter'}};
  const Q={npcId:[{w:'word',ask:'… ___ …',opts:[['right',1],['wrong',0,'why, in Korean']]}]};  // every question, by who asks it
  const NPC={npcId:{name,zone:'village',x,y,dir,look:KIT.person({hair,skin,shirt,pants}),badge:['word'],
    after:'line once their words are yours',talk:()=>[{say:'…'},Q.npcId[0],{say:'…',award:['word']}]}};
  const ZONES={village:{name:'단어 마을',reg:'단어 마을',outdoor:true,legend:{…},map:[…],npcs:[…],spots:{…},things:{…}}};
  return {WORDS,DICT,CONFUSE:{},Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,
   questText:()=>'',afterTalk:KIT.ending({perfect:PERFECT}),TILES:VILLAGE.TILES};
 }});
```
- **Map**: an array of equal rows; `legend` maps each character to a tile from `VILLAGE.TILES` (`{tile:'grass',walk:1}`). Every
  non-walkable tile needs a line: `things:{T:VILLAGE.TREES,H:['line','line']}` (one picked by position) or `spots:{'x,y':'line'}`
  for one tile; signs are `spots:{'x,y':KIT.sign('표지판','text')}`. `node tests/coverage.mjs cN` must say 100%.
- **People**: `talk()` returns the conversation; `script()` (return steps or null) overrides it for story moments; `after` is what
  they say once you have their words; `status()` can return 'wait' (…) or 'todo' (!) for story gates. `still:1,fixed:1` = they
  never turn. Dogs: `look:KIT.dog({fur,ear})`. A dog that follows you: `FOLLOW:KIT.follower({name,look,when,talk,hurt})`.
- **Steps**: `{say}`, `{who:'name',say}`, `{ask,opts,w}` (a quiz), `{build:[tiles],w}` (word order), `award:['word']`, `set:()=>…`
  (change the story), `choose:[[label,fn]]`, plus everything in the walk-engine README.
- **Story state**: keep it in `state.stage` (or other top-level fields declared in `KIT.migrate({…})`), or flags in `state.f`.
  `questText()` is the goal line (`''` for none); `questLate()` makes it red. `onStep()` runs after every step (start a scene when
  the player stands on a square: `if(player.x===7&&player.y===4)openDialog('감독',[…])`).
- **Review and ★**: a badge word comes back as a ? over its teacher when it's due (spaced repetition, five memory levels); level 3
  is its ★. Review asks the word's own questions from `Q` (by `w`); a question that tests something else gets `gram:1`.
- **Ending**: `afterTalk:KIT.ending({quest,perfect:PERFECT})` plays `DONE` and offers the next chapter once every badge is in and
  `quest()` has nothing left; `PERFECT` plays when every word reaches ★. `TIPS` (grammar tips, may use `<b>`) and `SOURCES`
  (`[[title,url,site]]`, for news chapters) show in the 배지 sheet.

## Checks
```
python3 build.py && node tests/validate.mjs       # must print ok
python3 lexicon/extract.py .                      # tap-a-word: add missing words to lexicon/defs.json
node tests/coverage.mjs cN                        # 100% of object tiles say something
node tests/play.mjs cN                            # plays tests/walk/cN.js in headless Chrome; must end ERRORS: none
```
Write `tests/walk/cN.js` (copy `c1.js`): the order a player follows, with checks that the story moves.

## Making a chapter on claude.ai (no repo)
Open the published 단어 마을 artifact, add one `<script>` holding the `CHAPTERS.push({…})` right before the script that starts
`var GAME=`, and republish the same artifact (saves live with its link). Later, copy that script into `src/chapters/cN.js`
here and run the checks.
