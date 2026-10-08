/* 3편 · 연구소와 포켓몬 센터 — every line, the map and the people as in the old cartridge; on the walk engine, with 단어 마을's own
   art (src/village.js) and kit (src/kit.js). Story: 오박사 gives you 메지, who follows you (FOLLOW). Battle the rival → 메지 gets
   hurt → heal at the center. state.stage: 0 no dog · 1 메지 follows · 2 메지 hurt after the battle · 3 healed */
CHAPTERS.push({id:'c3',n:'3편',title:'연구소와 포켓몬 센터',place:'박사 · 연구 · 따르다 · 지키다 · 상대 · 기술 · 공격 · 상태 · 회복 · 들다 · 물다',words:11,save:'daneo-maul-v3',color:'#3FA86B',
 start:{zone:'village',x:10,y:9,dir:'down'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),  // old saves carry over
 make:()=>{
const P=KIT.person;
const WORDS=['박사','연구','따르다','지키다','상대','기술','공격','상태','회복','들다','물다'];
const DICT={
 '박사':{k:'공부를 아주 많이 해서 연구하는 사람.',e:'doctor (PhD)',ex:'공부를 아주 많이 했어요. 그리고 연구해요. 그런 사람은 박사예요.'},
 '연구':{k:'새로운 것을 알려고 깊이 공부하는 것.',e:'research',ex:'새로운 것을 찾으려고 깊이 공부해요. 그건 연구예요.'},
 '따르다':{k:'말이나 뒤를 쫓아 해요.',e:'to follow',ex:'강아지가 주인 뒤에서 걸어요. 강아지가 주인을 따라가요.'},
 '지키다':{k:'다치지 않게 막아요.',e:'to keep, guard',ex:'저는 센터를 안전하게 해요. 센터를 지켜요.'},
 '상대':{k:'같이 싸우거나 이야기하는 사람.',e:'opponent',ex:'배틀에서 나하고 싸우는 사람은 상대예요.'},
 '기술':{k:'무엇을 잘 만들거나 하는 힘·방법.',e:'skill, move',ex:'"몸통박치기", "물기"… 포켓몬이 싸울 때 쓰는 이건 다 기술이에요.'},
 '공격':{k:'먼저 치거나 쏘는 것.',e:'attack',ex:'메지가 꼬렛을 물어요! 메지가 공격해요.'},
 '상태':{k:'지금 어떤지의 모습.',e:'condition',ex:'메지가 많이 아파요. 메지 상태가 안 좋아요.'},
 '회복':{k:'다시 건강해지는 것.',e:'recovery',ex:'아픈 포켓몬이 다시 건강해져요. 그건 회복이에요.'},
 '들다':{k:'손에 잡고 있어요. · 안에 있어요',e:'to lift; to like',ex:'무거운 가방이 있어요. 손으로 위로 들어요.'},
 '물다':{k:'이로 꽉 잡아요.',e:'to bite',ex:'뽀삐가 이로 공을 잡아요. 공을 물어요.'},
};
const CONFUSE={};
/* the scripted people's questions (their story visits and review share them) */
const PROF=[
 {w:'박사',ask:'공부를 아주 많이 했어요. 그리고 연구해요. 그런 사람은 ___예요.',opts:[['박사',1],['상대',0,'상대는 같이 싸우는 사람이에요. 공부 많이 하고 연구해요 → "박사".'],['관중',0,'관중은 보는 사람이에요. 공부 많이 하고 연구해요 → "박사".']]},
 {w:'박사',ask:'대학교에서 가르치는 사람은 누구예요?',opts:[['교수',1],['박사',0,'박사는 공부를 많이 한 사람이에요. 대학교에서 가르치면 "교수". 둘 다인 사람도 있어요!'],['선생님',0,'초등학교, 중학교, 고등학교는 "선생님". 대학교는 "교수"예요.']]},
 {w:'박사',ask:'박사는 과학만 있어요?',opts:[['아니요, 역사 박사, 음악 박사도 있어요.',1],['네, 과학만 있어요.',0,'아니에요! 역사 박사, 음악 박사도 있어요.']]},
 {w:'연구',ask:'새로운 것을 찾으려고 깊이 공부해요. 그건 ___예요.',opts:[['연구',1],['공격',0,'공격은 싸울 때 해요! 깊이 공부해요 → "연구".'],['회복',0,'회복은 다시 건강해지는 거예요. 깊이 공부해요 → "연구".']]},
 {w:'연구',ask:'박사님은 연구소에서 뭐 해요?',opts:[['포켓몬을 연구해요.',1],['포켓몬을 물어요.',0,'😄 박사님은 안 물어요! 연구소에서는 "연구해요".']]},
];
const RIVAL=[
 {w:'상대',ask:'배틀에서 나하고 싸우는 사람은 ___예요.',opts:[['상대',1],['상태',0,'소리가 비슷해요! 상태는 지금 건강, 기분이에요. 싸우는 사람 → "상대".'],['심판',0,'심판은 규칙을 지키게 하는 사람이에요. 싸우는 사람 → "상대".']]},
 {w:'기술',ask:'"몸통박치기", "물기"… 포켓몬이 싸울 때 쓰는 이건 다 ___이에요.',opts:[['기술',1],['규칙',0,'규칙은 따라야 하는 거예요. 싸울 때 쓰는 방법 → "기술".'],['연구',0,'연구는 박사님이 해요! 싸울 때 쓰는 방법 → "기술".']]},
 {w:'기술',ask:'요리를 아주 잘해요. 요리 ___이 좋아요.',opts:[['기술',1],['공격',0,'요리로 공격해요? 😄 하는 방법이 좋아요 → "기술".']]},
 {w:'공격',ask:'메지가 꼬렛을 물어요! 메지가 ___해요.',opts:[['공격',1],['회복',0,'회복은 다시 건강해지는 거예요. 상대를 때려요 → "공격".'],['연구',0,'싸울 때는 연구 안 해요! 상대를 때려요 → "공격".']]},
 {w:'공격',ask:'"공격"의 반대는 뭐예요?',opts:[['방어',1],['기술',0,'기술은 하는 방법이에요. 공격 ↔ "방어".']]},
];
const NURSE=[
 {w:'상태',ask:'메지가 많이 아파요. 메지 ___가 안 좋아요.',opts:[['상태',1],['상대',0,'소리가 비슷해요! 상대는 싸우는 사람이에요. 지금 건강 → "상태".']]},
 {w:'상태',ask:'"상태"는 뭐예요?',opts:[['지금 어때요? 건강이나 기분이에요.',1],['같이 싸우는 사람이에요.',0,'그건 "상대"예요! 상태는 지금 건강, 기분이에요.']]},
 {w:'회복',ask:'아픈 포켓몬이 다시 건강해져요. 그건 ___이에요.',opts:[['회복',1],['공격',0,'공격은 상대를 때려요. 다시 건강해져요 → "회복".'],['연구',0,'연구는 깊이 공부해요. 다시 건강해져요 → "회복".']]},
 {w:'회복',gram:1,ask:'감기에 걸렸어요. 빨리 ___ 돼요.',opts:[['나아야',1],['나야',0,'낫다 → 나아요 → "나아야 돼요". ㅅ이 빠져요!'],['물어야',0,'😄 물다는 이로 잡아요. 감기는 "나아야 돼요".']]},
];
/* every question, by who asks it, so review can reuse them. gram:1 = it tests something else (낫다, 짖다):
   asked in the conversation as before, but review asks the word's own questions */
const Q={
 prof:PROF,
 aide:[
  {w:'따르다',ask:'강아지가 주인 뒤에서 걸어요. 강아지가 주인을 ___.',opts:[['따라가요',1],['지켜요',0,'지키다는 안전하게 해요. 뒤에서 걸어요 → "따라가요".'],['물어요',0,'😄 주인을 물면 안 돼요! 뒤에서 걸어요 → "따라가요".']]},
  {w:'따르다',ask:'게임에 규칙이 있어요. 규칙을 ___.',opts:[['따라요',1],['연구해요',0,'규칙은 연구하지 않아요. 규칙을 "따라요".'],['물어요',0,'😄 규칙은 물 수 없어요! 규칙을 "따라요".']]},
  {w:'따르다',ask:'따르다 → 따라요. 그럼 "제가 메지를 ___가요."',opts:[['따라',1],['따르',0,'"따르다"에서 ㅡ가 빠져요. 따르다 → 따라 → "따라가요"!']]},
  {w:'따르다',ask:'아기 오리들이 엄마 오리 뒤에서 걸어요. 엄마를 ___.',opts:[['따라가요',1],['지어요',0,'"짓다"는 집을 만들어요. 뒤에서 걸어요 → "따라가요".']]}],
 guard:[
  {w:'지키다',ask:'저는 센터를 안전하게 해요. 센터를 ___.',opts:[['지켜요',1],['따라요',0,'따르다는 뒤에 가요. 안전하게 해요 → "지켜요".'],['회복해요',0,'회복은 다시 건강해지는 거예요. 안전하게 해요 → "지켜요".']]},
  {w:'지키다',ask:'친구랑 약속했어요. 약속을 꼭 ___.',opts:[['지켜요',1],['들어요',0,'약속은 "지켜요"! 지키다는 약속, 규칙, 시간에 써요.'],['따라가요',0,'약속은 따라가지 않아요. 약속을 "지켜요".']]},
  {w:'지키다',ask:'심판은 어떤 사람이에요? 규칙을 ___ 사람이에요.',opts:[['지키게 하는',1],['물어보는',0,'심판은 묻는 사람이 아니에요. 규칙을 "지키게 하는" 사람이에요.']]},
  {w:'지키다',ask:'"규칙을 따라요"하고 "규칙을 지켜요", 뜻이 비슷해요?',opts:[['네, 비슷해요.',1],['아니요, 반대예요.',0,'반대 아니에요! 둘 다 규칙대로 해요. 비슷해요.']]}],
 rival:RIVAL,
 nurse:NURSE,
 mover:[
  {w:'들다',ask:'무거운 가방이 있어요. 손으로 위로 ___.',opts:[['들어요',1],['물어요',0,'😄 이로 잡으면 "물어요". 손으로 위로 → "들어요".'],['지켜요',0,'지키다는 안전하게 해요. 손으로 위로 → "들어요".']]},
  {w:'들다',ask:'이 게임이 좋아요. 이 게임이 마음에 ___.',opts:[['들어요',1],['따라요',0,'"마음에 들어요"는 "좋아요"라는 뜻이에요. 들다!']]},
  {w:'들다',ask:'집을 짓는 데 돈이 많이 ___.',opts:[['들어요',1],['물어요',0,'돈은 물지 않아요! 😄 돈이 필요해요 → "돈이 들어요".']]},
  {w:'들다',ask:'"들다"는 뜻이 하나예요?',opts:[['아니요, 뜻이 많아요.',1],['네, 하나예요.',0,'아니에요! 가방을 들어요, 마음에 들어요, 돈이 들어요… 많아요.']]}],
 owner:[
  {w:'물다',ask:'뽀삐가 이로 공을 잡아요. 공을 ___.',opts:[['물어요',1],['만져요',0,'"만지다"는 손으로 해요. 이로 잡아요 → "물어요".'],['들어요',0,'손으로 위로 → 들어요. 이로 잡아요 → "물어요".']]},
  {w:'물다',ask:'여름 밤에 모기가 사람을 ___.',opts:[['물어요',1],['지어요',0,'😄 모기는 집을 안 지어요! 모기가 "물어요".']]},
  {w:'물다',gram:1,ask:'뽀삐가 "멍멍!" 해요. 뽀삐가 ___.',opts:[['짖어요',1],['지어요',0,'"지어요"는 집을 만들어요. 멍멍! → "짖어요". 소리는 비슷해요!'],['물어요',0,'물다는 이로 잡아요. 멍멍! → "짖어요".']]},
  {w:'물다',ask:'뽀삐가 뼈를 ___ 달려요.',opts:[['물고',1],['물어고',0,'"-고"는 그냥 붙여요. 물다 → "물고".']]}],
};
const NPC={
 prof:{name:'오박사',zone:'village',x:6,y:4,dir:'down',look:P({hair:'#9A9AA3',skin:'#F1C9A5',shirt:'#F4F4F4',pants:'#6B4A2B'}),badge:['박사','연구'],
  after:'메지는 잘 지내요? 연구 결과가 기대돼요. 📓',
  talk:()=>[],
  script:()=>state.stage>=1?null:[
   {say:'어서 와요! 여기는 오박사 연구소예요. 🔬'},
   {say:'저는 포켓몬을 연구해요. 사람들은 저를 "박사님"이라고 불러요.'},
   PROF[0],PROF[1],PROF[3],
   {say:'좋아요! 제 연구를 도와주세요. 이 강아지를 데려가요.',award:['박사','연구'],set:()=>{state.stage=1}},
   {say:'이름은 메지예요. 🐶 메지가 당신을 따라갈 거예요!'},
   {say:'배틀 필드에 라이벌이 기다려요. 같이 가 보세요!'}]},
 aide:{name:'조수',zone:'village',x:3,y:6,dir:'right',look:P({hair:'#2B1E1A',skin:'#F3D0B0',shirt:'#8CCBF5',pants:'#3A3F55',long:1}),badge:['따르다'],
  after:'오리 새끼들은 엄마를 따라가요. 🦆',
  talk:()=>[{say:'안녕하세요! 저는 박사님 조수예요.'},...Q.aide,
   {say:'잘했어요! 사람도 따르고, 규칙도 따라요.',award:['따르다']}]},
 guard:{name:'경비원',zone:'village',x:16,y:8,dir:'down',look:P({hair:'#1E1E24',skin:'#E3B48C',shirt:'#3D5A80',pants:'#2E3548',cap:'#2E3548'}),badge:['지키다'],
  after:'오늘도 센터를 지켜요. 이상 없어요! 💂',
  talk:()=>[{say:'저는 포켓몬 센터 경비원이에요. 💂'},...Q.guard,
   {say:'좋아요! 센터는 제가 지킬게요.',award:['지키다']}]},
 rival:{name:'라이벌',zone:'village',x:20,y:15,dir:'left',still:1,fixed:1,look:P({hair:'#C0582E',skin:'#F1C9A5',shirt:'#4F7BD6',pants:'#2E3548',cap:'#2E3548'}),badge:['상대','기술','공격'],
  after:'다음엔 제 공격을 견딜 수 있을까요? 😤',
  status:()=>state.stage===0?'wait':undefined,
  talk:()=>[],
  script:()=>{
   if(state.stage===0)return [{say:'포켓몬 없어요? 그럼 배틀 못 해요.'},{say:'먼저 오박사 연구소에 가 보세요!'}];
   if(state.stage>=2)return null;
   return [
    {say:'왔어요? 오늘 제가 당신의 상대예요! 😤'},
    RIVAL[0],
    {say:'가라, 꼬렛! … 메지도 나와요! 🐶'},
    RIVAL[1],RIVAL[3],RIVAL[4],
    {say:'으악! 제가 졌어요… 꼬렛이 쓰러졌어요.'},
    {say:'그런데 메지도 많이 맞았어요. 메지 상태가 안 좋아 보여요…',award:['상대','기술','공격'],set:()=>{state.stage=2}},
    {say:'포켓몬 센터에 가서 회복하세요!'}];
  }},
 nurse:{name:'간호사',zone:'village',x:18,y:4,dir:'down',still:1,fixed:1,look:P({hair:'#E07A9B',skin:'#F3D0B0',shirt:'#FFFFFF',pants:'#F4C2D0',long:1}),badge:['상태','회복'],
  after:'메지 상태가 아주 좋아요! 또 오세요. 💗',
  status:()=>state.stage<2?'wait':undefined,
  talk:()=>[],
  script:()=>{
   if(state.stage<2)return [{say:'포켓몬 센터에 어서 오세요! 💗'},{say:state.stage===0?'포켓몬이 없네요. 오박사님한테 가 보세요.':'메지 상태가 아주 좋아요! 다치면 오세요.'}];
   if(state.stage>=3)return null;
   return [
    {say:'어머, 메지가 많이 다쳤네요.'},
    NURSE[0],NURSE[1],
    {say:'메지를 기계에 넣을게요. 띠리링~ ♪'},
    NURSE[2],NURSE[3],
    {say:'메지가 다 회복했어요! 메지 상태가 아주 좋아요. 🐶✨',award:['상태','회복'],set:()=>{state.stage=3}}];
  }},
 mover:{name:'인부',zone:'village',x:6,y:15,dir:'down',look:P({hair:'#5A3A22',skin:'#D9A47A',shirt:'#E9A23B',pants:'#3A3A48',cap:'#F2C94C'}),badge:['들다'],
  after:'이 집 마음에 들어요? 거의 다 지었어요!',
  talk:()=>[{say:'휴… 이 벽돌 너무 무거워요.'},...Q.mover,
   {say:'고마워요! 이제 벽돌을 들 수 있어요. 💪',award:['들다']}]},
 /* no badge: 짓다 isn't a 3편 word, so his questions test no word (no w), as before */
 builder:{name:'목수',zone:'village',x:4,y:13,dir:'down',look:P({hair:'#3B2A22',skin:'#E8B98F',shirt:'#B5654A',pants:'#3A3A48'}),
  talk:()=>[
   {say:'저는 목수예요. 집을 지어요. 🔨'},
   {ask:'집을 만들어요. 집을 ___.',opts:[['지어요',1],['짖어요',0,'😄 짖다는 강아지가 "멍멍!" 해요. 집은 "지어요".']]},
   {ask:'"짓다"는 집에만 써요?',opts:[['아니요, 밥도, 이름도 지어요.',1],['네, 집에만 써요.',0,'아니에요! 밥을 지어요, 이름을 지어요, 노래도 지어요.']]},
   {say:'맞아요! 강아지 이름도 지어요. "메지" 좋은 이름이에요!'}]},
 owner:{name:'뽀삐 주인',zone:'village',x:8,y:11,dir:'right',look:P({hair:'#E0C070',skin:'#F1C9A5',shirt:'#E07A5F',pants:'#3D5A80',long:1}),badge:['물다'],
  after:'뽀삐가 공을 물고 달려요! 🐩',
  talk:()=>[{say:'안녕하세요! 이 강아지는 뽀삐예요. 🐩'},...Q.owner,
   {say:'정답! 걱정 마세요. 뽀삐는 사람을 안 물어요. 😊',award:['물다']}]},
 poppy:{name:'뽀삐',zone:'village',x:9,y:11,dir:'left',still:1,fixed:1,look:KIT.dog({fur:'#F4F4F4',ear:'#D8C8B4'}),
  talk:()=>[{say:'멍멍! 🐩 (뽀삐가 짖어요.)'}]},
 fan1:{name:'관중',zone:'village',x:22,y:12,dir:'down',still:1,fixed:1,look:P({hair:'#2F2F38',skin:'#DDAE85',shirt:'#5B8BD9',pants:'#333'}),
  talk:()=>[{say:'와! 배틀이다! 저는 관중이에요. 앉아서 구경해요.'}]},
 fan2:{name:'관중',zone:'village',x:23,y:12,dir:'down',still:1,fixed:1,look:P({hair:'#E0C070',skin:'#F3D0B0',shirt:'#D9544B',pants:'#333'}),
  talk:()=>[{say:'라이벌의 공격이 세요. 그래도 메지가 견딜 수 있을 거예요!'}]},
};
/* 메지 walks one step behind the player once the professor hands her over */
const FOLLOW=KIT.follower({
 name:'메지',look:{fur:'#E2B776',ear:'#9C6B3A'},
 when:()=>state.stage>=1,
 hurt:()=>state.stage===2,
 talk:()=>state.stage===2
  ?[{say:'끼잉… 🐶 (메지 상태가 안 좋아요.)'},{say:'빨리 포켓몬 센터에 가요!'}]
  :state.stage===3
  ?[{say:'멍멍! 🐶 메지가 다 회복했어요!'},{say:'메지가 짖으면서 꼬리를 흔들어요. 기분이 좋아요.'}]
  :[{say:'멍멍! 🐶 (메지가 꼬리를 흔들어요.)'},{say:'메지가 당신을 잘 따라요!'}],
});
const sign=t=>KIT.sign('표지판',t);
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  /* map legend: character → tile drawing; walk = can step on it */
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},
   'L':{tile:'labWall'},'P':{tile:'centerWall'},'=':{tile:'wood',walk:1},'q':{tile:'floor',walk:1},'_':{tile:'sand',walk:1},
   'k':{tile:'shelf'},'e':{tile:'desk'},'c':{tile:'counter',over:1},'h':{tile:'healer'},'B':{tile:'field',walk:1},
   'f':{tile:'frame'},'#':{tile:'bricks'},'~':{tile:'pond'},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTTTT",
"T........................T",
"T.LLLLLLLLL...PPPPPPPPP..T",
"T.Lkkk=kkkL...PqqqhqqqP..T",
"T.L=e===e=L...PqqqqqqqP..T",
"T.L=======L...PqcccccqP..T",
"T.L=======L...PqqqqqqqP..T",
"T.LLLL=LLLL...PPPPqPPPP..T",
"T...p.,...p.......,.p....T",
"T.**..,,,,,,,,,,,,,,,,,..T",
"T.....,....~~~~.....,....T",
"T.....,....~~~~.....,....T",
"T.....,..........p..,....T",
"T.______....BBBBBBBBBBBB.T",
"T._ff_#_....BBBBBBBBBBBB.T",
"T._ff___....BBBBBBBBBBBB.T",
"T.______....BBBBBBBBBBBB.T",
"T...........BBBBBBBBBBBB.T",
"T........................T",
"TTTTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['prof','aide','guard','rival','nurse','mover','builder','owner','poppy','fan1','fan2'],
  spots:{'10,8':sign('단어 마을 3편 · 메지와 같이 배지 열한 개를 모아요!'),'4,8':sign('오박사 연구소 · 포켓몬 연구 중! 🔬'),
   '20,8':sign('포켓몬 센터 · 아픈 포켓몬을 회복해요. 💗'),'17,12':sign('배틀 필드 · 상대를 이기면 배지!')},
  /* a line for every tile of a kind: a list is picked by the faced tile's position (as the old sayAt did) */
  things:{
   T:VILLAGE.TREES,
   L:['하얀 건물이에요. 창문 안에 컴퓨터가 많아요. 💻','안에서 삐삐 기계 소리가 나요.','큰 건물이에요. 문은 아래쪽에 있어요.'],
   P:['포켓몬 센터 벽이에요. 빨간 지붕이 예뻐요. ❤️','센터 문은 아래쪽에 있어요.','안에서 띠리링 소리가 나요. 🎵'],
   h:['포켓몬이 아프면 이 기계에 넣어요. 불이 반짝반짝해요. ✨'],
   k:'연구 책이 많아요. 📚 「포켓몬의 비밀」, 「강아지는 왜 짖을까?」…',
   e:'박사님 책상이에요. 연구 노트가 있어요. 📓',
   c:'포켓몬 센터 카운터예요.',
   f:'목수 아저씨가 집을 짓고 있어요. 🔨',
   '#':'벽돌이 무거워요. 혼자 들 수 있어요? 💪',
   '~':['연못이에요. 잉어킹이 튀어요! 퐁당퐁당 🐟','물속에 꼬부기가 있어요? …아니에요, 그냥 돌이에요. 🐢'],
  }},
};
const INTRO=['단어 마을 3편! 오늘은 포켓몬 연구소예요. 🔬','오박사님이 기다려요. 연구소에 가 보세요.','! 가 있는 사람한테 배지가 있어요. 한 번에 다 맞히면 ★ 예요.'].map(say=>({say}));
const DONE=['축하해요! 배지 열한 개를 다 모았어요! 🎉','박사, 연구, 따르다, 지키다, 상대, 기술, 공격, 상태, 회복, 들다, 물다!','? 가 있는 사람한테 다시 말해 보세요. 한 번에 맞히면 ★ 예요.'];
const PERFECT=['★ 열한 개! 모든 단어가 완벽해요!','메지도 기뻐서 짖어요. 멍멍! 🐶'];
const TIPS=['<b>상대</b>: 같이 싸우는 사람 · <b>상태</b>: 지금 건강, 기분','사람을 <b>따라가요</b> · 규칙을 <b>따라요</b> · 규칙을 <b>지켜요</b>','<b>박사</b>: 공부 많이, 연구 · <b>교수</b>: 대학교에서 가르쳐요','가방을 <b>들어요</b> · 마음에 <b>들어요</b> · 돈이 <b>들어요</b>','이로 잡아요 → <b>물다</b> · 손으로 → <b>만지다</b>','집을 <b>지어요</b> · 강아지가 <b>짖어요</b>','낫다 → <b>나아요</b> · 눕다 → <b>누워요</b>'];
/* the 목표 line, by story stage (late while 메지 is hurt) */
const quest=()=>{
 if(state.stage===0)return {text:'🔬 오박사 연구소에 가 보세요.'};
 if(state.stage===1)return {text:'🐶 메지가 따라와요! 배틀 필드에서 라이벌이 기다려요.'};
 if(state.stage===2)return {late:true,text:'💊 메지 상태가 안 좋아요! 포켓몬 센터에서 회복해요.'};
 return null;
};
const questText=()=>{const v=quest();return v?v.text:''};
const questLate=()=>{const v=quest();return !!(v&&v.late)};
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW,INTRO,DONE,TIPS,SOURCES:null,questText,questLate,onStep:null,afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES:VILLAGE.TILES};
}});
