/* 단어 마을's cartridges, exactly as written for the old engine (src/cartridges/cN.js, copied from src/daneo-maul.html by
   tools/village.py), running on the shared walk engine: CARTRIDGES.push(cartridge) turns each one into a walk-engine chapter.
   A cartridge keeps its own format (npcs, talk, pool, signs, spots, things, quest, onStep, follower, fresh, sources, tips); what
   the old engine did around it (signs, the cartridge's celebration, the all-★ celebration, the late book) is done here. */

/* Saves used to be stored under the misspelled 'danemaul-…' keys; copy them once to 'daneo-maul-…' (as the old engine did). */
try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('danemaul-')){const nk='daneo-maul-'+k.slice(9);if(localStorage.getItem(nk)===null)localStorage.setItem(nk,localStorage.getItem(k))}}}catch(e){}

const sayAt=VILLAGE.sayAt,TREES=VILLAGE.TREES;  // what cartridges use for their object lines
var CARTRIDGES={push(old){CHAPTERS.push(fromCartridge(old))}};

function fromCartridge(old){
 const words=old.words.map(w=>w[0]);
 return {id:old.id,n:old.n,title:old.title,color:old.color,save:old.save,words:words.length,place:words.join(' · '),
  start:{zone:'village',...old.start},introWho:'안내',
  /* every load: the cartridge's own state (stage, book, steps…) where the save has none. Once, for a save from the old engine:
     a ★ badge (no miss) becomes memory level 3, the engine's ★; a ✓ badge is level 0 and due now (its ? shows up). */
  migrate:st=>{const F=st.f||(st.f={});st.lv=st.lv||{};
   const fr=old.fresh||{};for(const k in fr)if(st[k]===undefined)st[k]=JSON.parse(JSON.stringify(fr[k]));
   if(F.ported)return;F.ported=1;
   const b=st.badges||[],pf=st.perfect||[];
   b.forEach(w=>{if(!st.lv[w])st.lv[w]=pf.includes(w)?{b:3,due:now()+GAP[3]}:{b:0,due:now()}});
   if(st.celebrated){F.allWords=1;F.done=1}
   if(st.celebratedPerfect)F.allStar=1},
  make:()=>makeCartridge(old,words)};
}

function makeCartridge(old,words){
 const eng=Object.fromEntries(old.words),lex=((typeof window!=='undefined'&&window.LEX)||{defs:{}}).defs;
 const stem=w=>w.endsWith('다')&&w.length>1?w.slice(0,-1):w;
 const right=q=>(q.opts||[]).filter(o=>o[1]).map(o=>o[0]);
 /* the old engine: an NPC's questions test its badge words. The walk engine wants each question's word: the one it names, else the
    only badge, else the badge its right answer or question contains */
 const wOf=(q,n)=>q.w||(n.badge.length===1?n.badge[0]:n.badge.find(b=>[q.ask,...right(q)].some(t=>String(t).includes(stem(b))))||n.badge[0]);
 const tag=(s,n)=>s&&s.ask&&n.badge?{...s,w:wOf(s,n)}:s;
 const Q={},NPC={};
 for(const n of old.npcs){
  const talk=Array.isArray(n.talk)?n.talk.map(s=>tag(s,n)):null;
  if(n.badge){const pool=(n.pool||talk||[]).filter(s=>s&&s.ask).map(s=>tag(s,n));if(pool.length)Q[n.id]=pool}
  const o=Object.defineProperties({},Object.getOwnPropertyDescriptors(n));  // a fresh copy each boot, getters kept
  o.zone='village';
  if(n.still)o.fixed=1;  // the old engine's still villagers never turned to face you
  o.talk=talk?()=>talk:typeof n.talk==='function'?()=>(n.talk()||[]).map(s=>tag(s,n)):()=>[];
  o.look=!n.look?null:n.kind==='dog'?{...n.look,draw:VILLAGE.drawDog}:{...n.look,draw:VILLAGE.drawChar};
  NPC[n.id]=o;
 }
 /* the 일지 card: the learner definition (lexicon) or the English, and an example from the cartridge itself */
 const lines=old.npcs.flatMap(n=>[...(Array.isArray(n.talk)?n.talk:[]),...[].concat(n.after||[]).map(say=>({say}))]).filter(s=>s&&typeof s.say==='string');
 const example=w=>{
  for(const q of Object.values(Q).flat())if(q.w===w&&q.ask.includes('___')&&right(q)[0])return q.ask.replace('___',right(q)[0]);
  const s=lines.find(s=>s.say.includes(stem(w)));if(s)return s.say;
  const q=Object.values(Q).flat().find(q=>q.w===w);return q?`${q.ask} → ${right(q)[0]}`:'';  // a question and its answer
 };
 const DICT={};for(const w of words)DICT[w]={k:(lex[w]&&lex[w].k)||'…',e:eng[w],ex:example(w)};  // never English as the Korean line (build.py keeps every badge word's definition)
 const spots={};
 for(const [k,[t,l]] of Object.entries(old.signs||{}))spots[k]={steps:[{who:t,say:l}]};
 Object.assign(spots,old.spots||{});
 /* a cartridge's object lines are whole conversations (sayAt gives one step; 2편's bench reads the book in three), played whole */
 const things={};for(const [c,th] of Object.entries(old.things||{}))things[c]=typeof th==='function'?(x,y)=>({steps:th(x,y)}):{steps:[].concat(th).map(s=>typeof s==='string'?{say:s}:s)};
 const F=old.follower;
 /* the old engine drew the dog one pixel lower than people, and sadder while it's hurt */
 const FOLLOW=F?{name:F.name,when:F.when,talk:F.talk,look:{...F.look,draw:(L,X,Y,d,s)=>VILLAGE.drawDog(L,X,Y+1,d,s,!!(F.hurt&&F.hurt()))}}:null;
 const quest=()=>(old.quest&&old.quest())||null;
 return {WORDS:words,DICT,CONFUSE:{},Q,ITEMS:{},NPC,FOLLOW,TILES:VILLAGE.TILES,
  ZONES:{village:{name:'단어 마을',reg:'단어 마을',outdoor:true,legend:old.legend,map:old.map,npcs:old.npcs.map(n=>n.id),spots,things}},
  INTRO:(old.intro||[]).map(say=>({say})),DONE:old.done||[],TIPS:old.tips||[],SOURCES:old.sources||null,
  questText:()=>{const v=quest();return v?v.text:''},
  questLate:()=>{const v=quest();return !!(v&&v.late)},
  onStep:old.onStep||null,
  /* after every conversation, as the old engine did: every badge in and no task left → the cartridge's celebration, then the next
     cartridge; every word ★ (memory level 3) → the cartridge's perfect lines */
  afterTalk(){
   if(!state.f.done&&words.every(has)&&!quest()){state.f.done=1;state.f.allWords=1;save();finish();return}
   if(old.perfect&&!state.f.allStar&&words.every(w=>lv(w).b>=3)){state.f.allStar=1;save();setTimeout(()=>{if(!dlg)openDialog('단어 마을',says(old.perfect))},500)}
  }};
}
