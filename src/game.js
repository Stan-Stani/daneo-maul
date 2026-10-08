/* Settings for the shared engine (walk-engine): this game's names, storage prefix and default player. 단어 마을 keeps its own art:
   the player and every villager are drawn by VILLAGE.drawChar (src/village.js), and the ! ? ★ markers by VILLAGE.marker. */
var GAME={prefix:'daneo-maul',title:'단어 마을',log:'단어 마을',hud:'배지',gotToast:'배지 획득',
 term:{allWords:()=>[]},  // each cartridge's own celebration (done) says it when the last badge is in
 player:{hair:'#2A2F4A',skin:'#F1C9A5',shirt:'#D9544B',pants:'#2E3548',cap:'#D9544B',draw:VILLAGE.drawChar},
 marker:VILLAGE.marker,
 /* a cartridge's tips and news sources go in the 배지 sheet */
 onBoot:(CH,C)=>{const $=id=>document.getElementById(id),esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  $('tips').innerHTML=(C.TIPS||[]).map(t=>`<li>${t}</li>`).join('');$('tipsH').hidden=!(C.TIPS||[]).length;  // tips are the cartridge's own markup (<b>)
  $('srcList').innerHTML=(C.SOURCES||[]).map(([t,u,site])=>`<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)}</a><small>${esc(site)}</small></li>`).join('');
  $('srcH').hidden=!(C.SOURCES||[]).length}};
/* links and habits from the old engine: ?편=5 opens 5편, and the last cartridge played (daneo-maul-cart) is where the game opens */
try{const q=new URLSearchParams(location.search),p=q.get('편');
 if(p&&!q.get('ch')){q.set('ch','c'+p.replace(/\D/g,''));q.delete('편');history.replaceState(null,'','?'+q)}
 const old=localStorage.getItem('daneo-maul-cart');if(old&&localStorage.getItem('daneo-maul-chapter')===null)localStorage.setItem('daneo-maul-chapter',old)}catch(e){}
