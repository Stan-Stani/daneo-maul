// Do saves made by the old engine load in the walk-engine build? The old game's own code writes the saves (boot a cartridge, set
// its state, save()), plus one under the old misspelled 'danemaul-' key and the old last-cartridge key; then the new build opens on
// the same browser storage and every carried-over field is checked. Usage, from the repo root: node tools/savecheck.mjs
// One headless Chrome (counts as one of the machine's two playtest browsers).
import {spawn,execFileSync} from 'node:child_process';import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const tmp=fs.mkdtempSync('/tmp/savecheck-');
execFileSync('python3',[path.join(root,'tools/build_legacy.py'),'--out',path.join(tmp,'old.html')]);
execFileSync('python3',[path.join(root,'build.py'),'--out',path.join(tmp,'new.html')]);
const reap=()=>{try{execFileSync('pkill',['-9','-f',`user-data-dir=${tmp}/prof`])}catch(e){}};
process.on('exit',()=>{reap();try{fs.rmSync(tmp,{recursive:true,force:true})}catch(e){}});
const port=9100+Math.floor(Math.random()*90);
spawn('flatpak',['run',`--filesystem=${tmp}`,'com.google.Chrome','--headless=new','--mute-audio','--disable-gpu',`--remote-debugging-port=${port}`,
 `--user-data-dir=${tmp}/prof`,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<60&&!ws;i++){try{const l=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();const pg=l.find(t=>t.type==='page');if(pg)ws=pg.webSocketDebuggerUrl}catch(e){}if(!ws)await sleep(500)}
if(!ws){console.error('chrome did not start');process.exit(2)}
const sock=new WebSocket(ws);let id=0;const pend={};
sock.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&pend[m.id]){pend[m.id](m.result);delete pend[m.id]}};
const send=(method,params={})=>new Promise(r=>{const i=++id;pend[i]=r;sock.send(JSON.stringify({id:i,method,params}))});
const js=async e=>{const r=await send('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails).slice(0,500));return r.result.value};
await new Promise(r=>sock.onopen=r);await send('Page.enable');
const open=async page=>{await send('Page.navigate',{url:`file://${tmp}/${page}.html`});await sleep(2000)};

/* 1. the old game writes its saves */
await open('old');await js(`localStorage.clear();1`);await open('old');
await js(`(()=>{const mk=(id,f)=>{boot(id);if(dlg){dlg=null;document.getElementById('dlg').hidden=true}f(state);save()};
 mk('c1',s=>{s.badges=['눕다','떨어지다','놓다'];s.perfect=['떨어지다','놓다'];Object.assign(s,{x:11,y:9,dir:'up',seenIntro:true})});
 mk('c2',s=>{s.badges=['빌리다'];s.perfect=['빌리다'];Object.assign(s,{book:'have',steps:57,late:false,seenIntro:true})});
 mk('c3',s=>{s.badges=['박사','연구'];s.perfect=[];Object.assign(s,{stage:2,seenIntro:true})});
 mk('c6',s=>{s.badges=C.words.map(w=>w[0]);s.perfect=s.badges.slice(0,3);Object.assign(s,{graduated:true,celebrated:true,seenIntro:true})});
 localStorage.setItem('daneo-maul-cart','c3');
 localStorage.removeItem('daneo-maul-v4');localStorage.setItem('danemaul-v4',JSON.stringify({badges:['배지'],perfect:['배지'],seenIntro:true,x:3,y:9,dir:'down',stage:1}));
 return Object.keys(localStorage).sort().join(' ')})()`).then(k=>console.log('old saves:',k));

/* 2. the new build reads them */
await open('new');
const errs=[];const ok=(c,m)=>{if(!c)errs.push(m);console.log((c?'ok   ':'FAIL ')+m)};
ok(await js(`CH.id`)==='c3','opens on the last cartridge played in the old game (daneo-maul-cart → c3)');
const S=id=>js(`(()=>{if(CH.id!=='${id}')boot('${id}');if(dlg){dlg=null;document.getElementById('dlg').hidden=true}
 return {b:state.badges,lv:state.lv,f:state.f,x:state.x,y:state.y,dir:state.dir,stage:state.stage,book:state.book,steps:state.steps,late:state.late,graduated:state.graduated,hud:document.getElementById('logBtn').textContent,q:C.questText()}})()`);
let s=await S('c1');
ok(s.b.join()==='눕다,떨어지다,놓다','c1 badges kept');
ok(s.lv['떨어지다'].b===3&&s.lv['놓다'].b===3,'c1 ★ badges → memory level 3 (★)');
ok(s.lv['눕다'].b===0,'c1 ✓ badge → level 0, due now (its ? shows)');
ok(s.x===11&&s.y===9&&s.dir==='up','c1 position kept');
ok(s.hud==='배지 3/9 ★2','c1 HUD: '+s.hud);
ok(await js(`status(C.NPC.minsu)`)==='review','c1 민수 shows ? (눕다 due)');
s=await S('c2');
ok(s.book==='have'&&s.steps===57&&s.late===false,'c2 library book state kept (have, 57 steps)');
ok(/\d/.test(s.q),'c2 목표 shows the book countdown: '+s.q);
s=await S('c3');
ok(s.stage===2,'c3 stage 2 kept (the hurt dog)');
ok(await js(`!!(C.FOLLOW&&C.FOLLOW.when())`),'c3 메지 follows');
s=await S('c4');
ok(s.b.join()==='배지'&&s.stage===1,"c4 save under the old misspelled 'danemaul-v4' key carried over");
s=await S('c6');
ok(s.f.done===1&&s.graduated===true,'c6 finished and graduated: stays finished');
ok(await js(`(()=>{save();const p=JSON.parse(localStorage.getItem('daneo-maul-v6'));return p.f&&p.f.ported===1&&Array.isArray(p.badges)&&p.badges.length===12&&p.lv&&p.lv[p.badges[0]].b===3})()`),'c6 written back in the new format at its next save (f.ported, levels), badges intact');  // the engine saves on the next step or answer, not on load (migrate runs on every load, so that's safe)
sock.close();reap();
console.log(errs.length?`${errs.length} FAILED`:'all checks passed');process.exit(errs.length?1:0);
