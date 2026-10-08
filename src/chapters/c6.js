/* 6편 · 복습 학교 — every line, the map and the people as in the old cartridge; on the walk engine, with 단어 마을's own art
   (src/village.js) and kit (src/kit.js). Review of words and slips from recent practice chats (이자, 엔, 받다/맞다, 나아야, 고쳐야,
   예를 들면, 첫 번째, 견디다/참다, 어울리다, 개선되다/개선하다, 저장하다, 어른/성인).
   Seven teachers each check a word or two; the principal hands over the 졸업장 once all are done (state.graduated). */
CHAPTERS.push({id:'c6',n:'6편',title:'복습 학교',place:'처음이자 · -엔 · 받다 · 낫다 · 고치다 · 개선되다 · 저장하다 · 첫 번째 · 어울리다 · 견디다 · 예를 들다 · 어른',words:12,save:'daneo-maul-v6',color:'#E9A23B',
 start:{zone:'village',x:12,y:9,dir:'down'},introWho:'안내',
 migrate:KIT.migrate(),  // old saves carry over (state.graduated stays where it was)
 make:()=>{
const P=KIT.person;
const TEACH=['korean','nurse','shop','pc','art','pe','social'];
const done=()=>TEACH.filter(k=>NPC[k].badge.every(has)).length;
const WORDS=['처음이자','-엔','받다','낫다','고치다','개선되다','저장하다','첫 번째','어울리다','견디다','예를 들다','어른'];
const DICT={
 '처음이자':{k:'처음이면서 동시에… 예: 처음이자 마지막 시합.',e:'first and also',ex:'이건 처음이자 마지막 기회예요.'},
 '-엔':{k:'"-에는"을 짧게 한 말. 예: 주말엔 쉬어요.',e:'= 에는',ex:'주말엔 빨래해요.'},
 '받다':{k:'주는 것을 가져요.',e:'to receive, catch',ex:'정답을 말하면 배지를 받을 수 있어요.'},
 '낫다':{k:'병이나 상처가 좋아져요.',e:'to get better',ex:'감기에 걸렸어요. 빨리 나아야 돼요.'},
 '고치다':{k:'망가진 것을 다시 좋게 해요.',e:'to fix',ex:'의자가 고장 났어요. 의자를 고쳐야 돼요.'},
 '개선되다':{k:'전보다 더 좋아져요.',e:'to get better (by itself)',ex:'제가 매일 연습해요. 그래서 제 실력이 개선됐어요.'},
 '저장하다':{k:'나중에 쓰려고 남겨 둬요. 파일, 음식을 저장해요.',e:'to save, store',ex:'게임을 끄기 전에 꼭 저장해요. 안 하면 다 없어져요!'},
 '첫 번째':{k:'1번. 처음.',e:'the first',ex:'첫 번째 파일도, 두 번째 파일도 저장했어요.'},
 '어울리다':{k:'서로 잘 맞아서 보기 좋아요.',e:'to go well together',ex:'빨강하고 파랑이 잘 맞아요. 두 색이 잘 어울려요.'},
 '견디다':{k:'힘든 것을 참아요.',e:'to endure',ex:'파고의 겨울은 길고 추워요. 그래도 겨울을 견뎌요.'},
 '예를 들다':{k:'설명할 때 예를 말해요. 예를 들면…',e:'to give an example',ex:'예를 들면, 사과하고 귤은 과일이에요.'},
 '어른':{k:'다 자란 사람.',e:'grown-up',ex:'이 학교 선생님들은 다 어른이에요!'},
};
const CONFUSE={};
/* every question, by who asks it, so review can reuse them. gram:1 = it tests something else (색 이름, 조합): asked in the
   conversation as before, but review asks the word's own questions */
const Q={
 korean:[
  {w:'처음이자',ask:'오늘이 처음이에요. 그리고 마지막이에요. 처음___ 마지막 기회예요!',opts:[['이자',1],['이고',0,'"이고" 다음에는 "마지막인 기회"가 돼야 돼요. 명사 앞에 바로 → "처음이자 마지막 기회".'],['하고',0,'"하고"는 두 개를 같이 말해요. 한 기회가 처음이고 마지막 → "이자".']]},
  {w:'처음이자',ask:'"그는 선생님이자 작가예요." 이 사람은 몇 명이에요?',opts:[['한 명이에요.',1],['두 명이에요.',0,'"이자"는 한 사람이 두 가지예요. 선생님이고, 또 작가예요. 한 명!']]},
  {w:'-엔',ask:'"다음엔 제가 빌려줄게요." "다음엔"은 뭐예요?',opts:[['다음에는',1],['다음에서',0,'"엔"은 "에 + 는"이에요. 다음에는 → "다음엔".']]},
  {w:'-엔',ask:'"주말___ 빨래해요." (주말에는)',opts:[['엔',1],['은',0,'"주말은"도 말이 돼요. 그런데 "주말에는"을 짧게 하면 "주말엔"이에요.']]}],
 nurse:[
  {w:'낫다',ask:'감기에 걸렸어요. 빨리 ___ 돼요.',opts:[['나아야',1],['나야',0,'낫다 → 나아요 → "나아야 돼요". ㅅ이 빠지지만 아가 남아요!'],['낫어야',0,'낫다는 ㅅ이 빠져요. 낫어야 ✗ → "나아야".']]},
  {w:'낫다',ask:'어제 아팠어요. 오늘은 다 ___.',opts:[['나았어요',1],['낫았어요',0,'ㅅ이 빠져요. 나아요 → "나았어요".']]},
  {w:'견디다',ask:'화가 났어요. 하지만 잠깐 화를 ___.',opts:[['참았어요',1],['견뎠어요',0,'잠깐, 하고 싶은 걸 안 해요 → "참다". 견디다는 오래, 힘든 걸 버텨요.']]},
  {w:'견디다',ask:'파고의 겨울은 길고 추워요. 그래도 겨울을 ___.',opts:[['견뎌요',1],['참아요',0,'오래, 힘든 걸 버텨요 → "견뎌요". 추위를 견뎌요!']]}],
 pc:[
  {w:'저장하다',ask:'게임을 끄기 전에 꼭 ___. 안 하면 다 없어져요!',opts:[['저장해요',1],['개선해요',0,'개선은 더 좋게 해요. 나중에 다시 쓰려고 남겨요 → "저장해요".']]},
  {w:'저장하다',ask:'"저장"은 컴퓨터에만 써요?',opts:[['아니요, 음식이나 물건도 저장해요.',1],['네, 컴퓨터에만 써요.',0,'아니에요! 김치를 냉장고에 저장해요. 물건도 저장해요.']]},
  {w:'첫 번째',ask:'1번, 2번, 3번 문장 중에서 1번 문장은?',opts:[['첫 번째 문장',1],['일 번째 문장',0,'1은 "첫" 이에요. 첫 번째, 두 번째, 세 번째!'],['하나 번째 문장',0,'"하나" 대신 "첫"이에요. 첫 번째!']]},
  {w:'첫 번째',ask:'2번 문장은?',opts:[['두 번째 문장',1],['둘 번째 문장',0,'"둘" 대신 "두"예요. 두 번째!']]}],
 shop:[
  {w:'고치다',ask:'의자가 고장 났어요. 의자를 ___ 돼요.',opts:[['고쳐야',1],['고치해야',0,'"고치다"는 "하다"가 없어요. 고치 + 어야 → "고쳐야".'],['고치어야',0,'고치 + 어야 = 고쳐야. 짧게 해요!']]},
  {w:'고치다',ask:'어제 의자를 ___.',opts:[['고쳤어요',1],['고치했어요',0,'"하다"가 아니에요. 고치 + 었어요 → "고쳤어요".']]},
  {w:'개선되다',ask:'제가 매일 연습해요. 그래서 제 실력이 ___.',opts:[['개선됐어요',1],['개선했어요',0,'실력이 혼자 좋아졌어요 → "개선됐어요". 제가 무엇을 좋게 하면 → "개선했어요".']]},
  {w:'개선되다',ask:'제가 게임을 더 좋게 만들었어요. 제가 게임을 ___.',opts:[['개선했어요',1],['개선됐어요',0,'제가 했어요 → "개선했어요". 게임이 좋아졌어요 → "게임이 개선됐어요".']]}],
 art:[
  {w:'어울리다',gram:1,ask:'"빨간 하고 파란"은 조금 이상해요. 색 이름은?',opts:[['빨강하고 파랑',1],['빨갛하고 파랗',0,'색 이름은 "빨강, 파랑, 노랑"이에요. 아니면 "빨간색, 파란색"!']]},
  {w:'어울리다',ask:'빨강하고 파랑이 잘 맞아요. 두 색이 잘 ___.',opts:[['어울려요',1],['조합해요',0,'"조합하다"는 섞어요. 잘 맞아요 → "어울려요".'],['고쳐요',0,'고치다는 고장 난 걸 다시 되게 해요. 잘 맞아요 → "어울려요".']]},
  {w:'어울리다',gram:1,ask:'"좋은 조합이에요"는 무슨 뜻이에요?',opts:[['같이 있으면 좋아요.',1],['고장 났어요.',0,'조합은 같이 섞은 거예요. "좋은 조합" = 같이 있으면 좋아요.']]},
  {w:'어울리다',ask:'이 모자가 당신한테 잘 ___!',opts:[['어울려요',1],['맞아요',0,'"맞아요"는 크기가 딱 좋아요. 보기에 좋아요 → "어울려요".']]}],
 pe:[
  {w:'받다',ask:'공이 날아와요. 손으로 잡아요. 공을 ___.',opts:[['받아요',1],['맞아요',0,'"공에 맞아요"는 공이 몸에 와서 부딪혀요. 아파요! 손으로 잡아요 → "받아요".']]},
  {w:'받다',ask:'앗! 공이 머리에 왔어요. 머리에 공을 ___.',opts:[['맞았어요',1],['받았어요',0,'머리로 잡지 않았어요. 부딪혔어요 → "맞았어요". 😵']]},
  {w:'받다',ask:'정답을 말하면 배지를 ___ 수 있어요.',opts:[['받을',1],['맞을',0,'배지는 "받아요"! 정답이 "맞아요". 받다하고 맞다는 달라요.']]},
  {w:'받다',ask:'"정답이에요!" = 정답이 ___.',opts:[['맞아요',1],['받아요',0,'정답이면 "맞아요"! 배지는 "받아요".']]}],
 social:[
  {w:'예를 들다',ask:'다른 예를 말해 주세요. 예를 ___ 주세요.',opts:[['들어',1],['드러',0,'들다 → 들어요. 예를 "들어" 주세요.']]},
  {w:'예를 들다',ask:'"예를 ___, 사과하고 귤은 과일이에요."',opts:[['들면',1],['드르면',0,'들다 → 들면. "예를 들면"!'],['들으면',0,'"들으면"은 "듣다"예요 (소리를 들어요). 예 → "들면".']]},
  {w:'어른',ask:'다 큰 사람이에요. 보통 말할 때 ___이라고 해요.',opts:[['어른',1],['청소년',0,'청소년은 10대예요. 다 큰 사람 → "어른".']]},
  {w:'어른',ask:'영화관 표: "___ 15,000원, 청소년 12,000원". 공식적인 말은?',opts:[['성인',1],['어린이',0,'어린이는 아이예요. 표나 서류에는 "성인"을 많이 써요.']]},
  {w:'어른',ask:'할머니한테 인사해요. "___께 인사해야 돼요."',opts:[['어른',1],['성인',0,'존경하는 느낌 → "어른". 성인은 법이나 서류에 써요.']]}],
};
const NPC={
 korean:{name:'국어 선생님',zone:'village',x:5,y:4,dir:'down',look:P({hair:'#2B1E1A',skin:'#F3D0B0',shirt:'#8E7CC3',pants:'#3A3F55',long:1}),badge:['처음이자','-엔'],
  after:'다음엔 더 어려운 문법을 해요! 📖',
  talk:()=>[{say:'안녕하세요! 국어 선생님이에요. 오늘은 문법 복습이에요. 📖'},...Q.korean,
   {say:'좋아요! "이자"하고 "엔", 이제 잘 알아요.',award:['처음이자','-엔']}]},
 student:{name:'학생',zone:'village',x:8,y:5,dir:'up',still:1,fixed:1,look:P({hair:'#3B2A22',skin:'#F1C9A5',shirt:'#4F7BD6',pants:'#3A3F55'}),
  talk:()=>[{say:'쉿! 수업 중이에요. 🤫'},{say:'오늘은 처음이자 마지막 시험이에요… 떨려요.'}]},
 nurse:{name:'보건 선생님',zone:'village',x:17,y:5,dir:'down',look:P({hair:'#E07A9B',skin:'#F3D0B0',shirt:'#FFFFFF',pants:'#F4C2D0',long:1}),badge:['낫다','견디다'],
  after:'아프면 참지 말고 보건실에 오세요. 💊',
  talk:()=>[{say:'보건실이에요. 어디 아파요? 💊'},...Q.nurse,
   {say:'잘했어요! 아프면 참지 마세요. 꼭 오세요!',award:['낫다','견디다']}]},
 pc:{name:'컴퓨터 선생님',zone:'village',x:21,y:4,dir:'down',look:P({hair:'#2A2F4A',skin:'#F1C9A5',shirt:'#3FA86B',pants:'#2E3548'}),badge:['저장하다','첫 번째'],
  after:'파일은 자주 저장하세요! 💾',
  talk:()=>[{say:'컴퓨터실이에요. 💻'},...Q.pc,
   {say:'정답! 첫 번째 파일도, 두 번째 파일도 저장했어요. 💾',award:['저장하다','첫 번째']}]},
 shop:{name:'기술 선생님',zone:'village',x:3,y:12,dir:'right',look:P({hair:'#5A3A22',skin:'#D9A47A',shirt:'#B5654A',pants:'#3A3A48',cap:'#F2C94C'}),badge:['고치다','개선되다'],
  after:'고장 나면 버리지 말고 고쳐요! 🔧',
  talk:()=>[{say:'기술 선생님이에요. 이 의자가 고장 났어요. 🔧'},...Q.shop,
   {say:'좋아요! 의자도 고치고, 실력도 개선됐어요!',award:['고치다','개선되다']}]},
 art:{name:'미술 선생님',zone:'village',x:4,y:14,dir:'left',look:P({hair:'#C0582E',skin:'#F3D0B0',shirt:'#F2C94C',pants:'#3A3F55',long:1}),badge:['어울리다'],
  after:'색을 조합하는 건 재미있어요! 🎨',
  talk:()=>[{say:'미술 선생님이에요. 그림 그려요! 🎨'},...Q.art,
   {say:'멋져요! 색이 아주 잘 어울려요.',award:['어울리다']}]},
 pe:{name:'체육 선생님',zone:'village',x:19,y:14,dir:'down',look:P({hair:'#1E1E24',skin:'#E3B48C',shirt:'#D9544B',pants:'#2E3548',cap:'#2E3548'}),badge:['받다'],
  after:'공을 잘 받아요! 다음엔 시합해요. ⚽',
  talk:()=>[{say:'체육 선생님이에요! 공 던질게요. 받아요! ⚽'},...Q.pe,
   {say:'완벽해요! 배지를 받았어요! 🏅',award:['받다']}]},
 social:{name:'사회 선생님',zone:'village',x:7,y:16,dir:'left',look:P({hair:'#9A9AA3',skin:'#F1C9A5',shirt:'#5B8BD9',pants:'#3A3A48'}),badge:['어른','예를 들다'],
  after:'예를 들면… 이 학교 선생님들은 다 어른이에요! 😄',
  talk:()=>[{say:'사회 선생님이에요. 오늘은 사람에 대해서 공부해요.'},...Q.social,
   {say:'잘했어요! 예를 들면, 저도 어른이에요. 😊',award:['어른','예를 들다']}]},
 principal:{name:'교장 선생님',zone:'village',x:12,y:8,dir:'down',look:P({hair:'#E8E8EE',skin:'#F1C9A5',shirt:'#2E3548',pants:'#2E3548',belt:'#F2C94C'}),badge:[],
  status:()=>done()<TEACH.length?'wait':state.graduated?undefined:'todo',
  script:()=>{
   if(done()<TEACH.length)return [{say:`어서 와요! 저는 교장이에요. 선생님 ${TEACH.length-done()}명을 더 만나 보세요. 🏫`}];
   if(!state.graduated)return [
    {say:'선생님들을 다 만났어요? 대단해요!'},
    {say:'오늘 복습한 문장을 한 번 더 말해 볼까요?'},
    {who:'당신',say:'이건 처음이자 마지막 기회예요. 다음엔 더 잘할 거예요!'},
    {who:'당신',say:'감기는 다 나았어요. 고장 난 의자도 고쳤어요.'},
    {who:'당신',say:'예를 들면, 정답이 맞으면 배지를 받아요!'},
    {say:'완벽해요! 졸업장을 받으세요. 🎓',set:()=>{state.graduated=true}},
    {say:'한국어 실력이 많이 개선됐어요. 축하해요! 🎉'}];
   return [{say:'졸업 축하해요! 다음엔 더 어려운 단어를 공부해요. 🎓'}];
  },
  talk:()=>[]},
};
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},
   'Z':{tile:'schoolWall'},'=':{tile:'wood',walk:1},'q':{tile:'floor',walk:1},'k':{tile:'board'},'e':{tile:'desk'},
   'b':{tile:'bed'},'l':{tile:'laptopTable'},'w':{tile:'workbench'},'i':{tile:'easel'},'F':{tile:'field',walk:1},
   'n':{tile:'bench'},'~':{tile:'pond'},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTTTT",
"T........................T",
"T.ZZZZZZZZZZ..ZZZZZZZZZZ.T",
"T.Zkkkk====Z..Zqqb=qlllZ.T",
"T.Z========Z..Zqqqb=qqqZ.T",
"T.Z=e=e=e==Z..Zqqqq=qqqZ.T",
"T.Z========Z..Zqqqq=qqqZ.T",
"T.ZZZZ=ZZZZZ..ZZZZZZqZZZ.T",
"T.....,.p.....p.....,....T",
"T.....,,,,,,,,,,,,,,,....T",
"T..**.,...~~~......,.....T",
"T.....,...~~~......,.....T",
"T.w...,,,,,,,,,,,,,,,....T",
"T.........,....FFFFFFFFF.T",
"T..i......,....FFFFFFFFF.T",
"T.........,....FFFFFFFFF.T",
"T..T..n...,....FFFFFFFFF.T",
"T.........,..............T",
"T........................T",
"TTTTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['korean','student','nurse','pc','shop','art','pe','social','principal'],
  spots:{'8,8':KIT.sign('표지판','교실 · 국어 수업 중 📖'),'14,8':KIT.sign('표지판','보건실하고 컴퓨터실이에요. 💊💻')},
  /* a line for every tile of a kind, picked by the faced tile's position (the old sayAt picked the same way) */
  things:{
   T:VILLAGE.TREES,
   Z:['학교 벽이에요. 안에서 "다시 말해 주세요!" 소리가 나요. 🏫','큰 시계가 있어요. 공부 시간이에요! 🕘','창문 안에 학생들이 공부해요. ✏️'],
   k:'칠판이에요. "처음이자 마지막 기회" 라고 써 있어요. ✏️',
   e:'책상이에요. 공책에 "예를 들면" 이라고 써 있어요. 📒',
   b:'보건실 침대예요. 아프면 여기에 누워요. 🛏️',
   l:'컴퓨터예요. 화면에 "저장할까요? 네 / 아니요" 가 있어요. 💾',
   w:'작업대예요. 고장 난 의자가 있어요. 🔧',
   i:'그림이에요. 빨강하고 파랑으로 그렸어요. 잘 어울려요! 🎨',
   n:'벤치예요. 앉아서 쉬어요.',
   '~':['연못이에요. 공이 빠졌어요! 체육 선생님이 "받아요!" 했는데… ⚽💦','오리가 줄을 서요. 첫 번째 오리, 두 번째 오리, 세 번째 오리… 🦆🦆🦆'],
  }},
};
const INTRO=['단어 마을 6편! 오늘은 복습 학교예요. 🏫','최근에 배운 단어를 다시 연습해요. 틀렸던 것도 있어요!','선생님 일곱 명을 만나 보세요. 다 만나면 교장 선생님한테 가요.'].map(say=>({say}));
const DONE=['축하해요! 배지 열두 개를 다 모았어요! 🎉','처음이자, -엔, 받다, 낫다, 고치다, 개선되다, 저장하다, 첫 번째, 어울리다, 견디다, 예를 들다, 어른!','? 가 있는 선생님한테 다시 말해 보세요. 한 번에 맞히면 ★ 예요.'];
const PERFECT=['★ 열두 개! 모든 단어가 완벽해요!','한국어 실력이 많이 개선됐어요. 👏'];
const TIPS=['<b>처음이자</b> 마지막 기회 = 처음<b>이고</b> 마지막<b>인</b> 기회','다음<b>엔</b> = 다음<b>에는</b> · 주말<b>엔</b> = 주말<b>에는</b>','배지를 <b>받아요</b> · 정답이 <b>맞아요</b> · 공에 <b>맞아요</b>','낫다 → <b>나아요</b>, <b>나아야</b> 돼요 · 고치다 → <b>고쳐요</b>, <b>고쳐야</b> 돼요','내가 <b>개선해요</b> · 실력이 <b>개선돼요</b>','<b>예를 들면</b> (드르면 ✗) · <b>첫 번째</b> (1번째 ✗)','<b>참다</b>: 잠깐, 하고 싶은 걸 안 해요 · <b>견디다</b>: 오래, 힘든 걸 버텨요','<b>어른</b>: 말할 때 · <b>성인</b>: 서류, 법'];
/* the task left, if any: the seven teachers, then the 교장's 졸업장 */
const quest=()=>{
 const n=done();
 if(n<TEACH.length)return {text:`🏫 선생님들을 만나요! ${n}/${TEACH.length}`};
 if(!state.graduated)return {late:true,text:'🎓 교장 선생님한테 가서 졸업장을 받아요!'};
 return null;
};
const questText=()=>{const v=quest();return v?v.text:''};
const questLate=()=>{const v=quest();return !!(v&&v.late)};
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,SOURCES:null,questText,questLate,onStep:null,afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES:VILLAGE.TILES};
}});
