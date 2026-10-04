// Checks 6편: collecting every badge does NOT end the cartridge while the 졸업장 is still waiting; after the principal's
// graduation the celebration plays and only then the menu offers 7편.
window.__play=async function(){
 const LOG=[],ERR=[];window.__log=LOG;window.__err=ERR;addEventListener('error',e=>ERR.push('onerror: '+e.message));
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const shot=async n=>{window.__shotDone=false;console.log('SHOT:'+n);const t=Date.now();while(!window.__shotDone&&Date.now()-t<8000)await wait(30)};
 const check=(c,m)=>{if(!c)ERR.push('ASSERT: '+m);LOG.push((c?'ok  ':'FAIL ')+m)};
 const finish=async()=>{let n=0;while(dlg&&n++<60){if(typing&&!typing.finished)typing.fin();if($('choices')&&!$('choices').hidden&&dlg.cur&&dlg.cur.opts){confirmSel()}else advance();await wait(40)}};
 try{
  boot('c6');await wait(300);await finish();await wait(700);await finish();
  check(C.id==='c6','6편 is running');
  // every badge, via a conversation (the last one awarded inside a dialog, like a teacher)
  while(state.badges.length<C.words.length-1)state.badges.push(C.words[state.badges.length][0]);
  openDialog('테스트',[{say:'마지막 단어',award:[C.words[C.words.length-1][0]]}]);await finish();await wait(1200);await finish();await wait(900);
  check(state.badges.length===C.words.length,'all '+C.words.length+' badges collected');
  check($('cartPanel').hidden,'the menu does NOT offer 7편 before graduating');
  check(!state.celebrated,'no celebration yet');LOG.push('quest: '+$('quest').textContent);
  check($('quest').textContent.includes('교장'),'the objective says to go to the principal');await shot('before-graduation');
  // the principal hands over the 졸업장
  Object.assign(player,{x:12,y:9,dir:'up',moving:false,t:0});interact();await wait(100);check(!!dlg,'talking to the principal');
  await finish();await wait(800);await finish();await wait(1000);
  check(state.graduated,'graduated');check(state.celebrated,'celebrated after graduating');
  check(!$('cartPanel').hidden&&menuSel===CARTRIDGES.findIndex(c=>c.id==='c7'),'then the menu opens with 7편 selected');
  LOG.push('menu title: '+$('cartTitle').textContent);await shot('offer-next');
 }catch(e){ERR.push('check: '+e.message+' '+e.stack)}
 window.__done=true;console.log('DONE');
};
