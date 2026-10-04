// Checks the START menu: the header only has the title and badges; START opens 대화 · 사전 · 카트리지 · 소리 (+ 뉴스 출처 in the
// news cartridges, with working article links); B closes it; a menu item closes the menu and opens its panel.
window.__play=async function(){
 const LOG=[],ERR=[];window.__log=LOG;window.__err=ERR;addEventListener('error',e=>ERR.push('onerror: '+e.message));
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const shot=async n=>{window.__shotDone=false;console.log('SHOT:'+n);const t=Date.now();while(!window.__shotDone&&Date.now()-t<8000)await wait(30)};
 const check=(c,m)=>{if(!c)ERR.push('ASSERT: '+m);LOG.push((c?'ok  ':'FAIL ')+m)};
 const clear=async()=>{let n=0;while(dlg&&n++<40){if(typing&&!typing.finished)typing.fin();advance();await wait(30)}};
 try{
  await clear();
  check(document.querySelectorAll('header button').length===1,'header has only the badge button');await shot('header');
  $('startBtn').click();await wait(150);check(!$('startPanel').hidden,'START opens the menu');
  const items=[...$('startPanel').querySelectorAll('.mi')].filter(b=>!b.hidden).map(b=>b.textContent.trim());
  check(items.length===5,'1편 menu: '+items.join(' | '));check($('srcBtn').hidden,'no 뉴스 출처 in 1편');await shot('menu');
  cancel();check($('startPanel').hidden,'B closes the menu');
  $('startBtn').click();await wait(80);$('tapBtn').click();await wait(150);check($('startPanel').hidden&&!$('tapPanel').hidden,'사전 closes the menu and opens 찾아본 말');cancel();
  $('startBtn').click();await wait(80);$('cartMi').click();await wait(150);check(!$('cartPanel').hidden,'카트리지 바꾸기 opens the cartridge menu');cancel();
  $('startBtn').click();await wait(80);const was=soundOn;$('sndBtn').click();await wait(60);check(soundOn!==was&&!$('startPanel').hidden,'소리 toggles and the menu stays open');$('sndBtn').click();cancel();
  history.replaceState(null,'','?편=3');check(linkedCart()==='c3','?편=3 picks 3편');history.replaceState(null,'',location.pathname+'#5편');check(linkedCart()==='c5','#5편 picks 5편');
  history.replaceState(null,'','?cart=c9');check(linkedCart()===null,'an unknown cartridge is ignored');history.replaceState(null,'',location.pathname);
  for(const [id,n] of [['c5',6],['c7',4]]){
   boot(id);await wait(300);await clear();await wait(600);await clear();
   $('startBtn').click();await wait(120);check(!$('srcBtn').hidden,C.n+' has 뉴스 출처');$('srcBtn').click();await wait(150);
   const links=[...$('srcList').querySelectorAll('a')];check(links.length===n&&links.every(a=>/^https:\/\//.test(a.href)&&a.target==='_blank'),C.n+': '+links.length+' article links open in a new tab');
   LOG.push(links.map(a=>a.textContent).join(' | '));await shot('sources-'+id);cancel();check($('srcPanel').hidden,'B closes 뉴스 출처');
  }
 }catch(e){ERR.push('check: '+e.message+' '+e.stack)}
 window.__done=true;console.log('DONE');
};
