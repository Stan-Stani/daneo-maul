/* 8편 · 가을 축제 — every line, the map and the people as in the old cartridge; on the walk engine, with 단어 마을's own art
   (src/village.js) and kit (src/kit.js). Built from the player's 찾아본 말 list (Oct 4: 잉어, 손해, 따다, 흔들리다, 튀다, 점검…) and the
   Oct 5 practice chat (대회/트로피를 받다, 기분/기본, 따다/보다, 흔들리다/힘들다, 바꾸다/바뀌다, 발음/발/사투리, 점검/전공,
   홍수 + -는데, 아직, 첫눈, 기대하다/기다리다).
   Story: autumn festival. Help five people, then win the archery 대회 on the ✕ and receive the trophy.
   state.stage: 0 start · 1 helping · 2 go to the ✕ · 3 trophy done */
CHAPTERS.push({id:'c8',n:'8편',title:'가을 축제',place:'기분 · 따다 · 흔들리다 · 손해 · 잉어 · 튀다 · 바뀌다 · 점검하다 · 발음 · 홍수 · 첫눈 · 기대하다 · 대회 · 받다',words:14,save:'daneo-maul-v8',color:'#D97B2B',
 start:{zone:'village',x:12,y:13,dir:'up'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),  // old saves carry over (state.stage stays where it was)
 make:()=>{
const P=KIT.person;
/* the five people to help */
const SOURCES=['farmer','kid','tech','mc','grandpa'];
const done=()=>SOURCES.filter(k=>NPC[k].badge.every(has)).length;
const go=n=>()=>{state.stage=n};
const WORDS=['기분','따다','흔들리다','손해','잉어','튀다','바뀌다','점검하다','발음','홍수','첫눈','기대하다','대회','받다'];
const DICT={
 '기분':{k:'지금 마음 상태.',e:'mood, feeling',ex:'트로피를 받았어요! 기분이 좋아요!'},
 '따다':{k:'나무에서 열매를 떼요.',e:'to pick',ex:'나무에서 사과를 따요.'},
 '흔들리다':{k:'이리저리 움직여져요.',e:'to sway, shake',ex:'바람이 많이 불어요. 나뭇가지가 흔들려요.'},
 '손해':{k:'돈이나 물건을 잃는 것.',e:'loss',ex:'사과가 다 떨어졌어요. 팔 수 없어요. 돈을 잃었어요. 이건 손해예요.'},
 '잉어':{k:"물고기예요. 잉어킹의 '잉어'.",e:'carp',ex:'연못이에요. 잉어가 퐁당퐁당 뛰어요.'},
 '튀다':{k:'작은 것이 날아 퍼져요.',e:'to splash',ex:'잉어가 뛰었어요. 퐁당! 물이 내 옷에 튀었어요.'},
 '바뀌다':{k:'다른 것이 돼요.',e:'to be changed',ex:'잉어킹이 강해졌어요. 잉어킹이 갸라도스로 바뀌었어요.'},
 '점검하다':{k:'잘 되는지 하나씩 봐요.',e:'to inspect',ex:'공연 전이에요. 마이크가 잘 되는지 하나씩 봐요. 마이크를 점검해요.'},
 '발음':{k:'말할 때 입에서 나오는 소리.',e:'pronunciation',ex:'"따"하고 "봐"는 입에서 나오는 소리가 달라요. 발음이 달라요.'},
 '홍수':{k:'비가 많이 와서 물이 넘쳐요.',e:'flood',ex:'비가 아주 많이 와요. 강물이 넘쳐요. 그건 홍수예요.'},
 '첫눈':{k:'그해 처음 오는 눈.',e:'first snow',ex:'11월에 첫눈이 올 거예요.'},
 '기대하다':{k:'좋은 일을 바라고 기다려요.',e:'to look forward to',ex:'좋은 일을 바라고 기다려요. 내일 축제를 기대해요.'},
 '대회':{k:'누가 제일 잘하는지 겨루는 모임.',e:'competition',ex:'여러 사람이 누가 제일 잘하는지 겨뤄요. 이건 양궁 대회예요.'},
 '받다':{k:'주는 것을 가져요.',e:'to receive',ex:'1등이에요! 트로피를 받았어요.'},
};
const CONFUSE={};
/* every question, by who asks it, so review can reuse them. The 심판's are asked at the ✕ (onStep). gram:1 = it tests something
   else (-는데, 아직): asked in the conversation as before, but review asks the word's own questions */
const Q={
 host:[
  {w:'기분',ask:'축제 날이에요! 오늘 ___이 어때요?',opts:[['기분',1],['기본',0,'기본은 제일 처음, 제일 쉬운 것이에요. 지금 마음 → "기분".'],['기억',0,'기억은 옛날 일을 안 잊어요. 지금 마음 → "기분".']]},
  {w:'기분',ask:'"기분"하고 "기본", 어떤 게 마음이에요?',opts:[['기분',1],['기본',0,'기본은 제일 쉬운 것, 처음 것이에요. 마음 → "기분".']]},
  {w:'기분',ask:'선물을 받았어요! 기분이 ___.',opts:[['좋아요',1],['아파요',0,'아파요는 몸이에요. 선물을 받으면 기분이 "좋아요"! 😄']]}],
 farmer:[
  {w:'흔들리다',ask:'바람이 많이 불어요. 나뭇가지가 ___.',opts:[['흔들려요',1],['힘들어요',0,'힘들다는 어렵고 피곤해요. 소리가 비슷해요! 나무가 움직여요 → "흔들려요".'],['흔들어요',0,'흔들다는 누가 해요. 바람 때문에 나무가 → "흔들려요".']]},
  {w:'흔들리다',ask:'"흔들리다"하고 "힘들다", 나무한테 쓰는 말은?',opts:[['흔들리다',1],['힘들다',0,'나무는 피곤하지 않아요! 😄 이리저리 움직여요 → "흔들리다".']]},
  {w:'손해',ask:'사과가 다 떨어졌어요. 팔 수 없어요. 돈을 잃었어요. 이건 ___예요.',opts:[['손해',1],['손님',0,'손님은 가게에 오는 사람이에요. 돈을 잃었어요 → "손해".'],['홍수',0,'홍수는 물이 넘쳐요. 돈을 잃었어요 → "손해".']]},
  {w:'손해',ask:'손해를 ___.',opts:[['봤어요',1],['땄어요',0,'사과는 따요! 손해는 "봐요". 손해를 봤어요.']]},
  {w:'따다',ask:'나무에서 사과를 ___.',opts:[['따요',1],['봐요',0,'보다는 눈으로 봐요. 👀 나무에서 떼요 → "따요".'],['걸어요',0,'걷다는 발로 가요. 🚶 나무에서 떼요 → "따요".']]},
  {w:'따다',ask:'어제는 바빠서 사과를 많이 안 ___.',opts:[['땄어요',1],['봤어요',0,'ㄸ! 강한 소리예요. 따다 → "땄어요".']]},
  {w:'따다',ask:'"따다"는 사과 말고 또 어디에 써요?',opts:[['금메달을 따요',1],['기분을 따요',0,'기분은 따지 않아요. 한국 뉴스에서 봤어요: 금메달도 "따요"!']]}],
 kid:[
  {w:'잉어',ask:'연못에 큰 물고기가 있어요. 잉어킹의 그 물고기예요. ___예요!',opts:[['잉어',1],['연어',0,'연어는 바다에서 강으로 와요. 잉어킹 → "잉어".'],['오징어',0,'오징어는 다리가 많아요! 🦑 잉어킹 → "잉어".']]},
  {w:'잉어',ask:'잉어는 어디에 살아요?',opts:[['연못이나 강',1],['나무 위',0,'😄 잉어는 물고기예요! 물에 살아요.']]},
  {w:'튀다',ask:'잉어가 뛰었어요. 퐁당! 물이 내 옷에 ___.',opts:[['튀었어요',1],['뛰었어요',0,'뛰다는 잉어가 해요! 물방울은 날아 퍼져요 → "튀었어요".'],['바뀌었어요',0,'옷이 다른 옷이 됐어요? 😄 물방울이 날아왔어요 → "튀었어요".']]},
  {w:'튀다',ask:'"튀다"하고 "뛰다", 소리가 비슷해요. 물방울은?',opts:[['튀어요',1],['뛰어요',0,'뛰다는 다리로 빨리 가요. 물방울은 → "튀어요".']]},
  {w:'바뀌다',ask:'잉어킹이 강해졌어요. 잉어킹이 갸라도스로 ___.',opts:[['바뀌었어요',1],['바꿨어요',0,'바꾸다는 누가 해요. 잉어킹이 그렇게 됐어요 → "바뀌었어요".']]},
  {w:'바뀌다',ask:'우리 형이 잉어킹을 갸라도스로 ___. (형이 했어요)',opts:[['바꿨어요',1],['바뀌었어요',0,'형이 했어요 → "바꿨어요". 개선하다, 개선되다랑 같아요!']]}],
 tech:[
  {w:'점검하다',ask:'공연 전이에요. 마이크가 잘 되는지 하나씩 봐요. 마이크를 ___.',opts:[['점검해요',1],['전공해요',0,'전공은 대학교에서 공부하는 것이에요. 잘 되는지 봐요 → "점검해요".'],['수리해요',0,'수리는 고장 난 걸 고쳐요. 아직 안 고장 났어요! → "점검해요".']]},
  {w:'점검하다',ask:'"점검"하고 "전공", 소리가 비슷해요. 대학교에서 공부하는 것은?',opts:[['전공',1],['점검',0,'점검은 잘 되는지 하나씩 봐요. 대학교 공부 → "전공".']]},
  {w:'점검하다',ask:'개발자도 점검해요! 개발자는 뭘 점검해요?',opts:[['코드',1],['사과',0,'😄 사과는 과수원 주인이 봐요. 개발자는 → "코드".']]}],
 mc:[
  {w:'발음',ask:'"따"하고 "봐"는 입에서 나오는 소리가 달라요. ___이 달라요.',opts:[['발음',1],['발',0,'발은 걸을 때 써요! 🦶 소리 → "발음".'],['사투리',0,'사투리는 지역 말이에요. 소리 → "발음".']]},
  {w:'발음',ask:'"제 발음이 조금 나빠요." 뭐가 나빠요?',opts:[['말하는 소리',1],['걷는 발',0,'😄 발이 아니에요! 말하는 소리예요.']]},
  {w:'발음',ask:'"발음"은 어떻게 읽어요? 바 + ___',opts:[['름',1],['람',0,'ㄹ이 뒤로 가요. 바 + "름" → 발음!']]},
  {w:'발음',ask:'부산 사람은 서울 사람하고 말이 조금 달라요. 지역 말은 ___예요.',opts:[['사투리',1],['발음',0,'발음은 말하는 소리예요. 지역 말 → "사투리".']]}],
 grandpa:[
  {w:'홍수',ask:'비가 아주 많이 와요. 강물이 넘쳐요. 그건 ___예요.',opts:[['홍수',1],['첫눈',0,'첫눈은 그해 처음 오는 눈이에요. 물이 넘쳐요 → "홍수".'],['연못',0,'연못은 물이 고인 작은 못이에요. 물이 넘쳐요 → "홍수".']]},
  {w:'홍수',gram:1,ask:'비가 많이 ___ 홍수가 없었어요.',opts:[['왔는데',1],['와서',0,'"와서"는 이유예요: 비가 와서 홍수가 났어요. 반대 이야기 → "왔는데".']]},
  {w:'첫눈',ask:'그해 처음 오는 눈은 ___이에요.',opts:[['첫눈',1],['눈물',0,'눈물은 울 때 나와요. 😢 처음 오는 눈 → "첫눈".']]},
  {w:'첫눈',gram:1,ask:'10월이에요. 눈이 ___ 안 왔어요.',opts:[['아직',1],['벌써',0,'벌써는 생각보다 빨라요. 안 왔어요 → "아직".']]},
  {w:'기대하다',ask:'좋은 일을 바라고 기다려요. 내일 축제를 ___.',opts:[['기대해요',1],['기억해요',0,'기억은 옛날 일을 안 잊어요. 앞으로 좋은 일 → "기대해요".']]},
  {w:'기대하다',ask:'버스가 안 와요. 정류장에서 버스를 ___.',opts:[['기다려요',1],['기대해요',0,'버스는 그냥 기다려요. 😄 좋은 일, 설레는 마음 → "기대해요".']]}],
 ref:[
  {w:'대회',ask:'여러 사람이 누가 제일 잘하는지 겨뤄요. 이건 양궁 ___예요.',opts:[['대회',1],['대학',0,'대학은 학교예요. 누가 잘하는지 겨뤄요 → "대회".'],['축제',0,'축제는 즐겁게 노는 날이에요. 누가 이기는지 → "대회".']]},
  {w:'받다',ask:'1등이에요! 트로피를 ___.',opts:[['받았어요',1],['이겼어요',0,'이기다는 경기에 써요. 대회를 이겼어요. 트로피는 → "받았어요".']]},
  {w:'받다',ask:'"이기다"는 어디에 써요?',opts:[['경기, 대회',1],['트로피, 메달',0,'트로피, 메달은 받아요. 경기, 대회는 이겨요!']]}],
};
const NPC={
 host:{name:'진행자',zone:'village',x:12,y:12,dir:'down',still:1,fixed:1,look:P({hair:'#3B2A22',skin:'#F3D0B0',shirt:'#D97B2B',pants:'#2E3548',cap:'#F2C94C'}),badge:['기분'],
  after:'축제 재미있어요? 🍂',
  status:()=>(state.stage===1&&done()<SOURCES.length)||state.stage===2?'wait':undefined,
  script:()=>{
   if(state.stage===0)return [
    {say:'어서 와요! 단어 마을 가을 축제예요! 🍂🎪'},
    Q.host[0],Q.host[1],
    {say:'좋아요! 축제 배지를 받으세요.',award:['기분'],set:go(1)},
    {say:'그런데 오늘 축제에 문제가 많아요. 😅'},
    {say:'과수원, 연못, 무대에 가 보세요. 다섯 명을 도와주세요!'},
    {say:'다 도와주면, 양궁 대회에 나갈 수 있어요. 🏹'}];
   if(state.stage===1&&done()<SOURCES.length)return [{say:`지금 ${done()}명 도와줬어요. 다섯 명 다 도와주세요!`}];
   if(state.stage===1)return [
    {say:'다 도와줬어요? 고마워요! 😊'},
    Q.host[2],
    {say:'이제 양궁 대회 시간이에요! 양궁장 ✕ 표시에 서세요. 🎯',set:go(2)}];
   if(state.stage===2)return [{say:'양궁장 ✕ 표시에 서세요! 대회가 곧 시작해요. 🏹'}];
   return null;
  },
  talk:()=>[]},
 farmer:{name:'과수원 주인',zone:'village',x:5,y:7,dir:'down',look:P({hair:'#5A3A22',skin:'#E8B98F',shirt:'#3FA86B',pants:'#5A3A22',cap:'#D9544B'}),badge:['따다','흔들리다','손해'],
  after:'사과 주스 맛있게 드세요! 🍎',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'아이고, 큰일이에요… 🍎'}]:null,
  talk:()=>[
   {say:'어서 와요. 저는 과수원 주인이에요. 🍎'},
   {say:'어젯밤에 바람이 아주 많이 불었어요.'},
   Q.farmer[0],Q.farmer[1],
   {say:'사과가 많이 떨어졌어요. 땅에 있는 사과는 팔 수 없어요.'},
   Q.farmer[2],Q.farmer[3],
   {say:'그래도 나무에 사과가 아직 있어요. 같이 따요!'},
   Q.farmer[4],Q.farmer[5],Q.farmer[6],
   {say:'와, 사과를 많이 땄어요! 사과 주스를 만들 수 있어요! 🧃',award:['따다','흔들리다','손해']}]},
 kid:{name:'아이',zone:'village',x:5,y:13,dir:'up',look:P({hair:'#2A2F4A',skin:'#F1C9A5',shirt:'#5B8BD9',pants:'#3A3F55',cap:'#F2C94C'}),badge:['잉어','튀다','바뀌다'],
  after:'잉어킹 최고! 🐟',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'쉿! 물고기 보고 있어요. 🐟'}]:null,
  talk:()=>[
   {say:'안녕하세요! 연못 좀 봐요! 🐟'},
   Q.kid[0],Q.kid[1],
   {say:'저는 잉어킹을 좋아해요. 조금 약해요. 근데 강한 포켓몬으로 바뀌어요!'},
   Q.kid[4],Q.kid[5],
   {who:'…',say:'퐁당! 잉어가 높이 뛰었어요! 💦'},
   Q.kid[2],Q.kid[3],
   {say:'옷이 다 젖었어요. 😆 그래도 재미있어요!',award:['잉어','튀다','바뀌다']}]},
 tech:{name:'음향 기사',zone:'village',x:17,y:2,dir:'down',look:P({hair:'#1E1E24',skin:'#DDAE85',shirt:'#2E3548',pants:'#2E3548',cap:'#2E3548'}),badge:['점검하다'],
  after:'소리 좋아요! 🔊',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'지금 바빠요. 공연 준비 중이에요. 🔊'}]:null,
  talk:()=>[
   {say:'저는 음향 기사예요. 무대 소리를 만들어요. 🔊'},
   {say:'저녁에 공연이 있어요. 그 전에 다 봐야 돼요.'},
   Q.tech[0],Q.tech[1],
   {say:'스피커 하나, 스피커 둘… 마이크… 다 괜찮아요!'},
   Q.tech[2],
   {say:'점검 끝! 하나, 둘, 셋! 소리 좋아요! 🎤',award:['점검하다']}]},
 mc:{name:'사회자',zone:'village',x:21,y:3,dir:'down',look:P({hair:'#C0582E',skin:'#F3D0B0',shirt:'#F6A5B8',pants:'#3A3A48',long:1}),badge:['발음'],
  after:'발음 연습, 매일 조금씩 해요! 🗣️',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'따, 따, 따… 아, 연습 중이에요! 🎤'}]:null,
  talk:()=>[
   {say:'안녕하세요! 저는 사회자예요. 오늘 무대에서 말해요. 🎤'},
   {say:'그래서 아침부터 연습해요. 따, 따, 따! 봐, 봐, 봐!'},
   Q.mc[0],Q.mc[1],Q.mc[2],
   {say:'저는 부산에서 왔어요. 그래서 말이 조금 달라요.'},
   Q.mc[3],
   {say:'"안녕하세요, 여러분! 단어 마을 가을 축제입니다!" 어때요? 😊',award:['발음']}]},
 grandpa:{name:'할아버지',zone:'village',x:2,y:11,dir:'right',still:1,fixed:1,look:P({hair:'#E8E8EE',skin:'#F1C9A5',shirt:'#8E7CC3',pants:'#5A3A22'}),badge:['홍수','첫눈','기대하다'],
  after:'첫눈 오면 같이 봐요. ❄️',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'허허, 날씨 좋다… ☀️'}]:null,
  talk:()=>[
   {say:'허허, 어서 와요. 나는 날씨를 잘 알아요. ☀️'},
   {say:'지난주에 비가 정말 많이 왔어요. 연못이 넘칠 뻔했어요.'},
   Q.grandpa[0],Q.grandpa[1],
   {say:'이제 가을이에요. 곧 추워질 거예요. ❄️'},
   Q.grandpa[2],Q.grandpa[3],
   {say:'11월에 첫눈이 올 거예요. 나는 첫눈이 좋아요!'},
   Q.grandpa[4],Q.grandpa[5],
   {say:'모든 계절이 좋아요. 그래도 첫눈은 특별해요. 😊',award:['홍수','첫눈','기대하다']}]},
 ref:{name:'심판',zone:'village',x:3,y:15,dir:'right',still:1,fixed:1,look:P({hair:'#1F1F1F',skin:'#E8B98F',shirt:'stripe',pants:'#1F1F1F'}),badge:['대회','받다'],
  after:'트로피 축하해요! 🏆',
  status:()=>state.stage<2?'wait':undefined,
  script:()=>{
   if(state.stage<2)return [{say:'양궁 대회는 이따가 시작해요! 🏹'},{say:'먼저 축제 사람들을 도와주세요.'}];
   if(state.stage===2)return [{say:'선수님! 왼쪽 ✕ 표시에 서세요. 과녁을 보고 쏴요! 🎯'}];
   return null;
  },
  talk:()=>[]},
 seller:{name:'호떡 아저씨',zone:'village',x:20,y:12,dir:'down',still:1,fixed:1,look:P({hair:'#2B1E1A',skin:'#DDAE85',shirt:'#F4F4F4',pants:'#5A3A22'}),
  talk:()=>[{say:'호떡 사세요! 따뜻하고 달아요. 🥞'},{say:'과수원 사과 주스도 있어요. 축제에서만 팔아요!'}]},
 fan:{name:'관중',zone:'village',x:9,y:18,dir:'up',look:P({hair:'#5A3A22',skin:'#F1C9A5',shirt:'#F2C94C',pants:'#333',long:1}),
  talk:()=>[{say:'양궁 대회 기대돼요! 🏹'},{say:'어렸을 때 양궁 해 봤어요? 저는 한 번도 안 해 봤어요.'}]},
};
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},
   'A':{tile:'appleTree'},'a':{tile:'fallen',walk:1},'W':{tile:'wood',walk:1},'S':{tile:'speaker'},'H':{tile:'tent'},
   '~':{tile:'pond'},'b':{tile:'bench'},'_':{tile:'sand',walk:1},'O':{tile:'target'},'x':{tile:'mark',walk:1},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTTTT",
"T........................T",
"T.A.A.A.A.......SWWWWWS..T",
"T..a...a........WWWWWWW..T",
"T.A.A.A.A.......WWWWWWW..T",
"T....a...a..,..p.,,,,,...T",
"T.A.A.A.A...,..*...,....*T",
"T..a........,p.....,.....T",
"T,,,,,,,,,,,,,,,,,,,,,,,,T",
"T...........,............T",
"T..~~~~~.*HHHHH...HHHHH..T",
"Tb.~~~~~..HHHHH...HHHHH..T",
"T..~~~~~....,...........*T",
"T,,,,,,,,,,,,,,,,,,,,,,,,T",
"T..,......p.,............T",
"T....________________O...T",
"T..,x________________O...T",
"T..,.________________O...T",
"T.............*.......*..T",
"TTTTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['host','farmer','kid','tech','mc','grandpa','ref','seller','fan'],
  spots:{'13,7':KIT.sign('표지판','단어 마을 가을 축제! 🍂 배지 열네 개를 모아요.'),
   '15,5':KIT.sign('표지판','무대 · 오늘 저녁 공연! 🎤'),
   '10,14':KIT.sign('표지판','양궁장 · 오늘 양궁 대회가 있어요. 🏹')},
  /* a line for every tile of a kind, picked by the faced tile's position (the old sayAt picked the same way) */
  things:{
   T:VILLAGE.TREES,
   A:['사과나무예요. 빨간 사과가 많아요. 🍎','바람에 가지가 흔들려요. 🍃','사과가 높이 있어요. 따기 어려워요!'],
   a:['땅에 사과가 떨어졌어요. 😢','어젯밤 바람 때문에 떨어졌어요.'],
   S:['큰 스피커예요. 🔊','스피커에서 "하나, 둘, 셋!" 소리가 나요.'],
   H:['축제 텐트예요. 🎪','텐트에서 맛있는 냄새가 나요.','텐트 위 깃발이 바람에 흔들려요.'],
   O:['과녁이에요. 가운데가 10점이에요. 🎯','과녁에 화살 자국이 많아요.'],
   b:'벤치예요. 할아버지가 자주 앉아요.',
   '~':['연못이에요. 잉어가 퐁당퐁당 뛰어요. 🐟','레드 리버는 아니에요. 😄','빨간 잉어가 보여요. 잉어킹은 아니에요… 아마도.','잉어가 뛰어서 물이 튀어요! 💦'],
  }},
};
const INTRO=['단어 마을 8편! 오늘은 가을 축제예요. 🍂🎪','바람이 불고, 날씨가 좋아요.','먼저 안내 텐트에 가서 진행자를 만나요.'].map(say=>({say}));
const DONE=['축하해요! 배지 열네 개를 다 모았어요! 🎉','기분, 따다, 흔들리다, 손해, 잉어, 튀다, 바뀌다, 점검하다, 발음, 홍수, 첫눈, 기대하다, 대회, 받다!','? 가 있는 사람한테 다시 말해 보세요. 한 번에 맞히면 ★ 예요.'];
const PERFECT=['★ 열네 개! 모든 단어가 완벽해요!','가을 축제 1등이에요! 🏆'];
const TIPS=['<b>기분</b>(마음) · 기본(처음, 쉬운 것)','사과를 <b>따요</b> 🍎 · 눈으로 봐요 👀 · 손해를 봐요','나무가 <b>흔들려요</b> · 일이 힘들어요','물이 <b>튀어요</b> · 잉어가 뛰어요','형이 바꿨어요 · 잉어킹이 <b>바뀌었어요</b>','마이크를 <b>점검해요</b> · 대학교 전공','<b>발음</b> = 바름 · 발 🦶 · 사투리','비가 왔는데 <b>홍수</b>가 없었어요','<b>첫눈</b>을 <b>기대해요</b> · 버스를 기다려요','<b>대회</b>를 이겨요 · 트로피를 <b>받아요</b>'];
/* the task left, if any */
const quest=()=>{
 if(state.stage===0)return {text:'🎪 안내 텐트에 가서 진행자를 만나요.'};
 if(state.stage===1){const n=done();return n<SOURCES.length?{text:`🍂 축제 사람들을 도와요! ${n}/${SOURCES.length}`}:{late:true,text:'🏹 다 도와줬어요! 진행자한테 말해요.'}}
 if(state.stage===2)return {late:true,text:'🎯 양궁장 ✕ 표시에 서세요. 대회 시작!'};
 return null;
};
const questText=()=>{const v=quest();return v?v.text:''};
const questLate=()=>{const v=quest();return !!(v&&v.late)};
/* the archery 대회: stepping on the ✕ at stage 2 */
const onStep=()=>{
 if(state.stage!==2||player.x!==4||player.y!==16)return;
 held=null;player.dir='right';
 openDialog('심판',[
  {say:'선수님, 준비됐어요? 과녁을 보세요! 🎯'},
  Q.ref[0],
  {say:'첫 번째 화살… 슝! 🏹'},
  {who:'관중',say:'10점이에요! 와아!'},
  {say:'두 번째 화살… 슝! 🏹'},
  {who:'관중',say:'바람이 불어요! 화살이 조금 흔들려요… 9점!'},
  {say:'마지막 화살… 슝! 🏹'},
  {who:'관중',say:'10점! 가운데예요! 🎯'},
  {say:'당신이 대회를 이겼어요! 1등이에요! 🏆'},
  Q.ref[1],Q.ref[2],
  {say:'자, 트로피예요! 축하해요! 🏆',award:['대회','받다'],set:go(3)},
  {who:'당신',say:'트로피를 받았어요! 기분이 좋아요!'},
  {who:'진행자',say:'단어 마을 가을 축제, 양궁 대회 1등! 정말 멋져요! 👏'}]);
};
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,SOURCES:null,questText,questLate,onStep,afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES:VILLAGE.TILES};
}});
