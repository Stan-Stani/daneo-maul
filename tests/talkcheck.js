window.__play=async function(){
 const LOG=[],ERR=[];window.__log=LOG;window.__err=ERR;addEventListener('error',e=>ERR.push('onerror: '+e.message));
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const shot=async n=>{window.__shotDone=false;console.log('SHOT:'+n);const t=Date.now();while(!window.__shotDone&&Date.now()-t<8000)await wait(30)};
 const check=(c,m)=>{if(!c)ERR.push('ASSERT: '+m);LOG.push((c?'ok  ':'FAIL ')+m)};
 try{
  let n=0;while(dlg&&n++<20){if(typing&&!typing.finished)typing.fin();advance();await wait(40)}
  openDialog('민수',[{say:'저는 상대가 너무 강해서 오늘 시합에서 졌어요.'},{say:'다음에는 꼭 이길 거예요.'}]);n=0;while(dlg&&n++<10){if(typing&&!typing.finished)typing.fin();advance();await wait(40)}
  $('talkBtn').click();await wait(200);const k=$('talkList').querySelectorAll('.tl').length;check(!$('talkPanel').hidden&&k>=4,'log lists '+k+' lines');await shot('talk');
  $('talkList').querySelector('.w').click();await wait(120);check(!$('gloss').hidden,'tapping a word in the log opens the dictionary');await shot('talk-tap');
  cancel();cancel();check($('talkPanel').hidden,'B closes the popup, then the log');
  location.reload;loadTalk();check(talk.length===k,'the log is saved with the cartridge');
 }catch(e){ERR.push('check: '+e.message)}
 window.__done=true;console.log('DONE');
};
