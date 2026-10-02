// Checks: first visit boots 1편; finishing a cartridge offers the next one; star explanations appear only once.
window.__play=async function(){
 const LOG=[],ERR=[];window.__log=LOG;window.__err=ERR;addEventListener('error',e=>ERR.push('onerror: '+e.message));
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const shot=async n=>{window.__shotDone=false;console.log('SHOT:'+n);const t=Date.now();while(!window.__shotDone&&Date.now()-t<8000)await wait(30)};
 const check=(c,m)=>{if(!c)ERR.push('ASSERT: '+m);LOG.push((c?'ok  ':'FAIL ')+m)};
 try{
  check(C===CARTRIDGES[0],'first visit boots '+C.n);
  if(dlg)closeDialog();await wait(100);await shot('header');
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
