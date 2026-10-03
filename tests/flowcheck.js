// Checks: first visit boots 1편; facing an object and pressing A opens its blurb; finishing a cartridge offers the next one; star explanations appear only once.
window.__play=async function(){
 const LOG=[],ERR=[];window.__log=LOG;window.__err=ERR;addEventListener('error',e=>ERR.push('onerror: '+e.message));
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const shot=async n=>{window.__shotDone=false;console.log('SHOT:'+n);const t=Date.now();while(!window.__shotDone&&Date.now()-t<8000)await wait(30)};
 const check=(c,m)=>{if(!c)ERR.push('ASSERT: '+m);LOG.push((c?'ok  ':'FAIL ')+m)};
 try{
  check(C===CARTRIDGES[0],'first visit boots '+C.n);
  if(dlg)closeDialog();await wait(100);await shot('header');
  // inspecting objects: face a tile, press A, a blurb opens (trees next to each other say different things)
  const inspect=async(x,y,dir)=>{Object.assign(player,{x,y,dir,moving:false,t:0});interact();await wait(50);
   if(typing&&!typing.finished)typing.fin();await wait(50);if(!dlg)return null;
   const t=$('txt').cloneNode(true);t.querySelectorAll('.taptip').forEach(e=>e.remove());return t.textContent};  // minus the one-time 눌러 보세요 tip
  const tree1=await inspect(1,9,'left');closeDialog();const tree2=await inspect(1,10,'left');closeDialog();
  check(tree1===C.things.T(0,9)[0].say&&tree2===C.things.T(0,10)[0].say,'facing a tree and pressing A opens its blurb: '+tree1);
  check(tree1!==tree2,'neighbouring trees say different things');
  const stands=await inspect(12,7,'right');
  check(stands===C.things.S(13,7)[0].say,'facing the stands opens their blurb: '+stands);
  await shot('inspect');closeDialog();Object.assign(player,{x:state.x,y:state.y,dir:state.dir});
  // award two words in two conversations: the ★ note should appear only the first time
  const run=async()=>{openDialog('테스트',[{say:'하나'},{say:'둘',award:[C.words[state.badges.length][0]]}]);let n=0;
   const texts=[];while(dlg&&n++<20){if(typing&&!typing.finished)typing.fin();texts.push($('txt').textContent);advance();await wait(30)}return texts};
  const t1=await run();check(t1.some(x=>x.includes('별이에요')),'first ★ award explains the star');
  const t2=await run();check(!t2.some(x=>x.includes('별이에요')),'second ★ award does not explain again');
  // finish the cartridge: award the rest, then the celebration dialog, then the menu offers 2편
  while(state.badges.length<C.words.length-1)state.badges.push(C.words[state.badges.length][0]);
  await run();let n=0;await wait(700);while(dlg&&n++<30){if(typing&&!typing.finished)typing.fin();advance();await wait(40)}
  await wait(900);check(!$('cartPanel').hidden&&menuSel===1,'after the last badge the menu opens with 2편 selected');
  LOG.push('menu title: '+$('cartTitle').textContent);await shot('offer-next');
 }catch(e){ERR.push('check: '+e.message)}
 window.__done=true;console.log('DONE');
};
