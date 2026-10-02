// Opens a line of dialogue, taps a word, shows English, and checks every cartridge boots. Screenshots via the runner.
window.__play=async function(){
 const LOG=[],ERR=[];window.__log=LOG;window.__err=ERR;addEventListener('error',e=>ERR.push('onerror: '+e.message));
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const shot=async n=>{window.__shotDone=false;console.log('SHOT:'+n);const t=Date.now();while(!window.__shotDone&&Date.now()-t<8000)await wait(30)};
 try{
  if(dlg)closeDialog();await wait(200);
  for(const c of CARTRIDGES){boot(c.id);await wait(150);if(dlg)closeDialog();LOG.push('booted '+c.id+' '+c.title)}
  openDialog('민수',[{say:'저는 상대가 너무 강해서 오늘 시합에서 졌어요.'}]);if(typing&&!typing.finished)typing.fin();await wait(100);
  const ws=[...document.querySelectorAll('#txt .w')];LOG.push('words: '+ws.map(w=>w.textContent).join(' '));
  for(const w of ws){w.click();await wait(60);LOG.push(w.textContent+' → '+($('gloss').hidden?'(none)':$('gloss').textContent))}
  ws[1].click();await wait(80);await shot('tap-ko');$('gloss').querySelector('.q').click();await wait(80);await shot('tap-en');
  $('gloss').click();closeDialog();$('badgeBtn').click();await wait(150);await shot('badges');$('enToggle').click();await wait(80);await shot('badges-en');
 }catch(e){ERR.push('check: '+e.message)}
 window.__done=true;console.log('DONE');
};
