// Trial port check: does the walk-engine build draw exactly what the old game drew? Renders the same views of a cartridge in both
// (same player square and facing, every NPC facing its start direction, same animation clock), reads the game canvas pixel for pixel
// and reports every pixel that differs. Usage, from the repo root: node tools/pixelcheck.mjs [c1] [out-dir]
// One headless Chrome (this machine allows two playtest browsers at once; this counts as one).
import {spawn,execFileSync} from 'node:child_process';import fs from 'node:fs';import path from 'node:path';
const ch=process.argv[2]||'c1';const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const out=path.resolve(process.argv[3]||path.join(root,'tests/shots/pixel-'+ch));fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
const tmp=fs.mkdtempSync('/tmp/pixel-');
execFileSync('python3',[path.join(root,'tools/build_legacy.py'),'--out',path.join(tmp,'old.html')]);
execFileSync('python3',[path.join(root,'build.py'),'--out',path.join(tmp,'new.html')]);
const reap=()=>{try{execFileSync('pkill',['-9','-f',`user-data-dir=${tmp}/prof`])}catch(e){}};
process.on('exit',()=>{reap();try{fs.rmSync(tmp,{recursive:true,force:true})}catch(e){}});
const port=9200+Math.floor(Math.random()*90);
spawn('flatpak',['run',`--filesystem=${tmp}`,'com.google.Chrome','--headless=new','--mute-audio','--disable-gpu','--hide-scrollbars',`--remote-debugging-port=${port}`,
 '--window-size=420,860',`--user-data-dir=${tmp}/prof`,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<60&&!ws;i++){try{const l=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();const pg=l.find(t=>t.type==='page');if(pg)ws=pg.webSocketDebuggerUrl}catch(e){}if(!ws)await sleep(500)}
if(!ws){console.error('chrome did not start');process.exit(2)}
const sock=new WebSocket(ws);let id=0;const pend={};
sock.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&pend[m.id]){pend[m.id](m.result);delete pend[m.id]}};
const send=(method,params={})=>new Promise(r=>{const i=++id;pend[i]=r;sock.send(JSON.stringify({id:i,method,params}))});
const js=async e=>{const r=await send('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails).slice(0,400));return r.result.value};
await new Promise(r=>sock.onopen=r);await send('Page.enable');await send('Emulation.setDeviceMetricsOverride',{width:400,height:820,deviceScaleFactor:1,mobile:true});
/* views: the player's square, chosen to show every part of the map and not to stand right above anyone (the engine hides that marker) */
const VIEWS={c1:[[8,9,'down'],[3,3,'right'],[11,3,'down'],[16,7,'up'],[21,5,'left'],[6,17,'up'],[13,15,'right'],[20,12,'down'],[22,17,'left'],[12,1,'down']]}[ch]||[[0,0,'down']];
const T=12345;  // the animation clock (ponds, markers) for every frame
const grab=async(page,setup)=>{
 await send('Page.navigate',{url:`file://${tmp}/${page}.html?ch=${ch}`});await sleep(1800);
 await js(`try{localStorage.clear()}catch(e){};1`);await send('Page.reload');await sleep(1800);
 await js(setup);const shots=[];
 for(const [x,y,d] of VIEWS){
  const v=await js(`(()=>{player.x=${x};player.y=${y};player.dir='${d}';player.moving=false;NPCS.forEach(n=>{n.dir=n.home;n.turnAt=1e15});
   render(${T});const c=document.getElementById('cv');return {png:c.toDataURL(),px:Array.from(c.getContext('2d').getImageData(0,0,c.width,c.height).data)}})()`);
  shots.push(v)}
 return shots};
const old=await grab('old',`(()=>{if(typeof boot==='function'&&(!C||C.id!=='${ch}'))boot('${ch}');if(dlg){dlg=null;document.getElementById('dlg').hidden=true}
 const m=document.getElementById('cartPanel');if(m)m.hidden=true;return 1})()`);
const nu=await grab('new',`(()=>{if(CH.id!=='${ch}')boot('${ch}');if(dlg){dlg=null;document.getElementById('dlg').hidden=true}camT=null;camF=null;talkCy=null;talkExtra=0;return 1})()`);
let bad=0;
VIEWS.forEach(([x,y,d],i)=>{
 const a=old[i].px,b=nu[i].px;let n=0,box=null;
 for(let p=0;p<a.length;p+=4)if(a[p]!==b[p]||a[p+1]!==b[p+1]||a[p+2]!==b[p+2]||a[p+3]!==b[p+3]){n++;const X=(p/4)%176,Y=Math.floor(p/4/176);box=box?[Math.min(box[0],X),Math.min(box[1],Y),Math.max(box[2],X),Math.max(box[3],Y)]:[X,Y,X,Y]}
 const tag=`${String(i).padStart(2,'0')}-${x}_${y}`;
 for(const [k,s] of [['old',old[i]],['new',nu[i]]])fs.writeFileSync(path.join(out,`${tag}-${k}.png`),Buffer.from(s.png.split(',')[1],'base64'));
 console.log(`${tag} ${d}: ${n?`${n} pixels differ, box ${box.join(',')}`:'identical'}`);if(n)bad++});
sock.close();reap();
console.log(bad?`${bad}/${VIEWS.length} views differ → ${out}`:`all ${VIEWS.length} views identical`);process.exit(bad?1:0);
