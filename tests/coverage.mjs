// Usage: node tests/coverage.mjs → per cartridge, how many non-walkable tiles say something when you face them and press A
// (a sign, a spot or a things entry), plus the tile kinds that are still silent. Exits 1 if any tile is silent.
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const html=fs.readFileSync(path.join(root,'src/daneo-maul.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ctx={console,window:{},document:{getElementById:()=>({})}};vm.createContext(ctx);
// The CARTRIDGES script (with its shared helpers) and every cartridge; the engine isn't needed.
for(const s of scripts)if(s.includes('const CARTRIDGES=')||s.includes('CARTRIDGES.push('))vm.runInContext(s,ctx);
const carts=vm.runInContext('CARTRIDGES',ctx);
let bad=0;
for(const c of carts){
 const L=c.legend||{},M=c.map||[];let tot=0,cov=0;const silent={},empty=[];
 M.forEach((row,y)=>[...row].forEach((ch,x)=>{
  const l=L[ch];if(!l||l.walk)return;tot++;const k=x+','+y;
  if((c.signs||{})[k]||(c.spots||{})[k]){cov++;return}
  const th=(c.things||{})[ch];
  if(!th){const t=ch+'('+l.tile+')';silent[t]=(silent[t]||0)+1;return}
  ctx.state=structuredClone(c.fresh||{});            // some lines depend on the story so far; ask with a fresh save
  ctx.has=w=>(ctx.state.badges||[]).includes(w);      // the engine's badge check
  let steps;try{steps=typeof th==='function'?th(x,y):th}catch(e){empty.push(ch+'@'+k+' ('+e.message+')');return} // the engine passes the faced tile
  if(Array.isArray(steps)&&steps.length&&steps.every(s=>s&&(s.say||s.ask)))cov++;else empty.push(ch+'@'+k);
 }));
 const ok=cov===tot;if(!ok)bad++;
 console.log(`${ok?'✓':'✗'} ${c.n} ${c.title}: ${cov}/${tot}`+(Object.keys(silent).length?' · silent '+JSON.stringify(silent):'')+(empty.length?' · says nothing at '+empty.slice(0,5).join(' '):''));
}
process.exit(bad?1:0);
