// Trial port check: does the walk-engine build draw exactly what the old game drew? Renders the same views of a cartridge in both
// (same player square and facing, every NPC facing its start direction, same animation clock), reads the game canvas pixel for pixel
// and reports every pixel that differs. Usage, from the repo root: node tools/pixelcheck.mjs [c1,c2,… | all] [out-dir]
// One headless Chrome (this machine allows two playtest browsers at once; this counts as one).
import {spawn,execFileSync} from 'node:child_process';import fs from 'node:fs';import path from 'node:path';
const want=process.argv[2]||'all';const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const out=path.resolve(process.argv[3]||path.join(root,'tests/shots/pixel'));fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
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
const T=12345;  // the animation clock (ponds, markers) for every frame
/* views: walkable squares on a grid over the whole map, never on or right above a person (the engine hides that marker) */
const viewsFor=`(()=>{const M=MAP,np=new Set(NPCS.map(n=>n.x+','+n.y)),out=[];
 for(let y=2;y<MH-1;y+=4)for(let x=2;x<MW-1;x+=5){let best=null;
  for(let dy=0;dy<3&&!best;dy++)for(let dx=0;dx<4&&!best;dx++){const X=x+dx,Y=y+dy;if(X>=MW||Y>=MH)continue;
   const L=(typeof Z!=='undefined'&&Z?Z.legend:C.legend)[M[Y][X]];if(L&&L.walk&&!np.has(X+','+Y)&&!np.has(X+','+(Y+1)))best=[X,Y,'down']}
  if(best)out.push(best)}return out})()`;
const frame=(x,y,d)=>`(()=>{player.x=${x};player.y=${y};player.dir='${d}';player.moving=false;NPCS.forEach(n=>{n.dir=n.home;n.turnAt=1e15});
 if(typeof talkCy!=='undefined'){if(dlg){dlg=null;document.getElementById('dlg').hidden=true}camT=null;camF=null;talkCy=null;talkExtra=0}
 render(${T});const c=document.getElementById('cv');return {png:c.toDataURL(),px:Array.from(c.getContext('2d').getImageData(0,0,c.width,c.height).data)}})()`;
const load=async page=>{await send('Page.navigate',{url:`file://${tmp}/${page}.html`});await sleep(1800);await js(`try{localStorage.clear()}catch(e){};1`);await send('Page.reload');await sleep(1800)};
await load('new');const ids=await js(`CHAPTERS.map(c=>c.id)`);const list=want==='all'?ids:want.split(',');
const views={},nu={},old={};
for(const id of list){await js(`(()=>{if(CH.id!=='${id}')boot('${id}');if(dlg){dlg=null;document.getElementById('dlg').hidden=true}return 1})()`);await sleep(150);
 views[id]=await js(viewsFor);nu[id]=[];for(const [x,y,d] of views[id])nu[id].push(await js(frame(x,y,d)))}
await load('old');
for(const id of list){await js(`(()=>{if(!C||C.id!=='${id}')boot('${id}');if(dlg){dlg=null;document.getElementById('dlg').hidden=true}const m=document.getElementById('cartPanel');if(m)m.hidden=true;return 1})()`);await sleep(150);
 old[id]=[];for(const [x,y,d] of views[id])old[id].push(await js(frame(x,y,d)))}
let bad=0,total=0;
for(const id of list){let diff=[];
 views[id].forEach(([x,y,d],i)=>{total++;const a=old[id][i].px,b=nu[id][i].px;let n=0,box=null;
  for(let p=0;p<a.length;p+=4)if(a[p]!==b[p]||a[p+1]!==b[p+1]||a[p+2]!==b[p+2]||a[p+3]!==b[p+3]){n++;const X=(p/4)%176,Y=Math.floor(p/4/176);box=box?[Math.min(box[0],X),Math.min(box[1],Y),Math.max(box[2],X),Math.max(box[3],Y)]:[X,Y,X,Y]}
  if(n){bad++;const tag=`${id}-${x}_${y}`;diff.push(`${x},${y}: ${n}px box ${box.join(',')}`);
   for(const [k,s] of [['old',old[id][i]],['new',nu[id][i]]])fs.writeFileSync(path.join(out,`${tag}-${k}.png`),Buffer.from(s.png.split(',')[1],'base64'))}});
 console.log(`${id}: ${views[id].length} views, ${diff.length?diff.length+' differ — '+diff.join(' | '):'all identical'}`)}
sock.close();reap();
console.log(bad?`${bad}/${total} views differ → ${out}`:`all ${total} views identical`);process.exit(bad?1:0);
