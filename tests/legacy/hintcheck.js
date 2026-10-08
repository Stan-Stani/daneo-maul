window.__play=async function(){
 const LOG=[],ERR=[];window.__log=LOG;window.__err=ERR;addEventListener('error',e=>ERR.push('onerror: '+e.message));
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const shot=async n=>{window.__shotDone=false;console.log('SHOT:'+n);const t=Date.now();while(!window.__shotDone&&Date.now()-t<8000)await wait(30)};
 const check=(c,m)=>{if(!c)ERR.push('ASSERT: '+m);LOG.push((c?'ok  ':'FAIL ')+m)};
 try{
  await wait(600);if(typing&&!typing.finished)typing.fin();await wait(100);
  check(!!document.querySelector('.taptip'),'first dialogue line shows the tap hint: '+(document.querySelector('.w.hint')||{}).textContent);await shot('hint');
  document.querySelector('.w.hint').click();await wait(100);check(!document.querySelector('.taptip')&&!$('gloss').hidden,'tapping removes the hint and opens the definition');check($('gloss').querySelector('.q.pulse'),'the ? pulses the first time');await shot('after-tap');
  $('gloss').querySelector('.q').click();await wait(80);check(!$('gloss').querySelector('.q.pulse'),'? stops pulsing once used');
  hideGloss();advance();await wait(50);if(typing&&!typing.finished)typing.fin();await wait(80);check(!document.querySelector('.taptip'),'no hint on later lines');
 }catch(e){ERR.push('check: '+e.message)}
 window.__done=true;console.log('DONE');
};
