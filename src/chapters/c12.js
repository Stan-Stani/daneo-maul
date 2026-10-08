/* 12편 · 강가 대청소 — built from the user's Anki cards reviewed in the last two weeks (korean-vocab vocab.db, synced
   2026-10-06) that are still new or on short intervals and use patterns that are hard at TOPIK 3: 강가에는 … 쓰레기가 쌓여 있어요,
   사진은 … 걸려 있어요, 나가기 전에, 소금을 쓰는 것 대신에, 사람이 아니라 눈사람, 친구한테서 들었어요, 스무 번 넘게, 훨씬 높아요.
   Story: the village cleans the riverbank. Help the three volunteers, then tell the 이장님 it's done.
   state.stage: 0 start · 1 cleaning · 2 done. */
CHAPTERS.push({id:'c12',n:'12편',title:'강가 대청소',color:'#4F7BD6',save:'daneo-maul-v12',words:9,
 place:'강가 · 쌓이다 · 걸리다 · 넘게 · 훨씬 · 대신에 · -기 전에 · -이/가 아니라 · 한테서',
 start:{zone:'village',x:11,y:9,dir:'up'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),
 make:()=>{
const P=KIT.person,go=n=>()=>{state.stage=n};
const HELP=['mina','grandma','junwoo'],helped=()=>HELP.filter(k=>NPC[k].badge.every(has)).length;
const WORDS=['강가','쌓이다','걸리다','넘게','훨씬','대신에','-기 전에','-이/가 아니라','한테서'];
const DICT={
 '강가':{k:'강 옆의 땅. 강물 바로 옆이에요.',e:'riverbank, riverside',ex:'강가에 쓰레기가 많이 쌓여 있어요.'},
 '쌓이다':{k:'물건이 위에 계속 모여서 높아져요. 쌓여 있어요.',e:'to pile up (be piled)',ex:'도시에서 내려온 쓰레기가 강가에 쌓여 있어요.'},
 '걸리다':{k:'벽이나 줄에 매달려 있어요. 걸려 있어요. (또: 시간이 걸려요)',e:'to hang, be hung (also: to take time)',ex:'현수막이 나무 사이에 걸려 있어요.'},
 '넘게':{k:'어떤 수보다 더 많이. 스무 개 넘게 = 스무 개보다 더.',e:'more than, over (a number)',ex:'쓰레기 봉투가 스무 개 넘게 나왔어요.'},
 '훨씬':{k:'비교해서 아주 많이. 보다 훨씬 커요.',e:'much (more), far',ex:'작년보다 강가가 훨씬 깨끗해졌어요.'},
 '대신에':{k:'그것을 안 하고 다른 것으로 바꿔서.',e:'instead of',ex:'비닐봉지 대신에 장바구니를 써요.'},
 '-기 전에':{k:'어떤 일을 하기 앞서. 먼저 하는 일을 말해요.',e:'before (doing)',ex:'청소하기 전에 장갑을 끼세요.'},
 '-이/가 아니라':{k:'A가 아니고 B예요. 사람이 아니라 허수아비예요.',e:'not A but B',ex:'저건 사람이 아니라 허수아비예요.'},
 '한테서':{k:'어떤 사람에게서. 누구한테서 받거나 들어요.',e:'from (a person)',ex:'그 얘기는 이장님한테서 들었어요.'},
};
const CONFUSE={};
const Q={
 mayor:[
  {w:'강가',ask:'강 바로 옆의 땅을 ___라고 해요.',opts:[['강가',1],['강당',0,'강당은 학교에서 모이는 큰 방이에요. 강 옆은 "강가".'],['바닷가',0,'바닷가는 바다 옆이에요. 강 옆은 "강가".']]},
  {w:'걸리다',ask:'저기 보세요. 현수막이 나무 사이에 ___ 있어요.',opts:[['걸려',1],['걸어',0,'"걸어 있어요"는 없어요. 현수막이 그 상태면 "걸려 있어요".'],['걸고',0,'"걸고 있어요"는 누가 지금 거는 중이에요. 이미 걸린 상태는 "걸려 있어요".']]},
  {w:'훨씬',ask:'작년보다 강가가 ___ 깨끗해졌어요!',opts:[['훨씬',1],['제일',0,'"제일"은 모두 중에서 1등이에요. 둘을 비교하면 "훨씬".'],['조금도',0,'"조금도"는 "안"하고 같이 써요. 비교해서 아주 많이 다르면 "훨씬".']]},
  {w:'훨씬',ask:'쓰레기 봉투가 작년보다 ___ 적어요. 다들 쓰레기를 안 버렸어요.',opts:[['훨씬',1],['처음',0,'"처음"은 시작이에요. 비교해서 아주 많이 다르면 "훨씬".']]}],
 mina:[
  {w:'쌓이다',ask:'도시에서 내려온 쓰레기가 강가에 많이 ___ 있어요.',opts:[['쌓여',1],['쌓아',0,'"쌓아 있어요"는 없어요. 사람이 하면 "쌓다", 그 상태는 "쌓여 있어요".'],['싸여',0,'싸이다는 종이 같은 것으로 덮여요. 높이 모여 있으면 "쌓여".']]},
  {w:'넘게',ask:'벌써 쓰레기 봉투가 스무 개 ___ 나왔어요. 스물두 개예요!',opts:[['넘게',1],['안에',0,'"안에"는 시간이나 장소예요. 스무 개보다 많으면 "넘게".'],['까지',0,'"까지"는 끝이에요. 스무 개보다 많으면 "넘게".']]}],
 grandma:[
  {w:'-기 전에',ask:'청소하___ 장갑을 끼세요. 손이 다쳐요.',opts:[['기 전에',1],['고 나서',0,'"-고 나서"는 청소가 끝난 다음이에요. 장갑이 먼저예요: "청소하기 전에".'],['기 후에',0,'"-기 후에"는 없어요. 다음은 "-ㄴ 후에", 먼저는 "-기 전에".']]},
  {w:'대신에',ask:'비닐봉지 ___ 이 장바구니를 써요. 강이 깨끗해져요.',opts:[['대신에',1],['때문에',0,'"때문에"는 이유예요. 비닐봉지를 안 쓰고 다른 것을 쓰면 "대신에".'],['처럼',0,'"처럼"은 같아요. 바꿔서 쓰면 "대신에".']]}],
 junwoo:[
  {w:'-이/가 아니라',ask:'저기 서 있는 건 사람___ 허수아비예요!',opts:[['이 아니라',1],['처럼',0,'"처럼"은 비슷해 보일 때예요. 사람이 아니고 허수아비면 "사람이 아니라".'],['보다',0,'"보다"는 비교예요. 사람이 아니고 다른 것이면 "이 아니라".']]},
  {w:'한테서',ask:'수박 파티 얘기는 이장님___ 들었어요.',opts:[['한테서',1],['한테',0,'"한테"는 받는 사람이에요. 얘기가 이장님한테서 나왔으면 "한테서".'],['에서',0,'"에서"는 장소예요. 사람한테서 들으면 "한테서".']]}],
};
const NPC={
 mayor:{name:'이장님',zone:'village',x:10,y:7,dir:'down',look:P({hair:'#9A9AA3',skin:'#E3B48C',shirt:'#3E7F4A',pants:'#3A3A48',cap:'#F2C94C'}),badge:['강가','걸리다','훨씬'],
  status:()=>state.stage===1&&helped()<3?'wait':undefined,
  get after(){return state.stage>=2?'수박 많이 먹어요! 다음 달에도 함께 해요. 🍉':'곧 끝나요. 힘내요!'},
  script:()=>{
   if(state.stage===0)return [{say:'어서 와요! 오늘은 강가 대청소 날이에요. 🧹'},{say:'봄비 때문에 도시에서 쓰레기가 많이 내려왔어요.'},Q.mayor[0],Q.mayor[1],
    {say:'자원봉사자가 세 명 있어요. 가서 도와주세요.',award:['강가','걸리다'],set:go(1)}];
   if(state.stage===1&&helped()<3)return [{say:`지금 ${helped()}명 도와줬어요. 세 명 다 도와주세요!`}];
   if(state.stage===1)return [{say:'다 했어요? 와, 정말 수고했어요!'},Q.mayor[2],Q.mayor[3],
    {say:'자, 이제 수박 먹어요! 🍉',award:['훨씬'],set:go(2)}];
   return null}},
 mina:{name:'미나',zone:'village',x:5,y:5,dir:'up',look:P({hair:'#3B2A22',skin:'#F3D0B0',shirt:'#F2C94C',pants:'#3D5A80',long:1}),badge:['쌓이다','넘게'],
  after:'봉투가 정말 많이 나왔어요. 그래도 기분 좋아요!',
  script:()=>state.stage<1?[{say:'청소하러 왔어요? 먼저 이장님한테 가 보세요. 현수막 앞에 있어요.'}]:null,
  talk:()=>[{say:'와 줘서 고마워요! 저는 미나예요. 🧤'},{say:'여기 좀 보세요.'},Q.mina[0],{say:'페트병이 정말 많아요. 같이 주워요!'},Q.mina[1],
   {say:'우리 반 친구들한테도 자랑해야겠어요!',award:['쌓이다','넘게']}]},
 grandma:{name:'옆집 할머니',zone:'village',x:20,y:13,dir:'right',look:P({hair:'#C8C8D0',skin:'#E6B892',shirt:'#8E7CC3',pants:'#4A4F6A'}),badge:['-기 전에','대신에'],
  after:'장바구니 잘 써요. 강이 고마워할 거예요.',
  script:()=>state.stage<1?[{say:'이장님이 벌써 오셨어요. 저기 현수막 앞에요.'}]:null,
  talk:()=>[{say:'아이고, 젊은 사람이 왔네. 고마워요.'},{say:'자, 이 장갑 받아요.'},Q.grandma[0],{say:'그리고 이것도 가져가요.'},Q.grandma[1],
   {say:'우리가 쓰레기를 줄이면, 강도 웃어요. 허허.',award:['-기 전에','대신에']}]},
 junwoo:{name:'준우',zone:'village',x:5,y:10,dir:'right',look:P({hair:'#1E1E24',skin:'#E8B98F',shirt:'#D9544B',pants:'#2E3548'}),badge:['-이/가 아니라','한테서'],
  after:'이따가 수박 파티에서 봐요!',
  script:()=>state.stage<1?[{say:'청소하러 왔어요? 이장님은 현수막 앞에 있어요.'}]:null,
  talk:()=>[{say:'으악! 저기 누가 서 있어요!'},{say:'…아, 잠깐만요.'},Q.junwoo[0],{say:'제가 아까 무서워서 도망갔어요. 하하.'},{say:'청소 다 하면 수박 파티가 있대요.'},Q.junwoo[1],
   {say:'빨리 끝내고 수박 먹어요! 🍉',award:['-이/가 아니라','한테서']}]},
 student:{name:'대학생 봉사자',zone:'village',x:16,y:5,dir:'left',look:P({hair:'#4A2E22',skin:'#F1C9A5',shirt:'#5B8BD9',pants:'#3A3A48',cap:'#5B8BD9'}),
  talk:()=>state.stage>=2?[{say:'강이 진짜 맑아졌어요. 사진 찍어야겠다! 📸'}]:[{say:'우리 함께 하니까 곧 끝나겠어요!'},{say:'저는 친구한테서 이 봉사 얘기를 들었어요.'}]},
};
const sign=t=>KIT.sign('표지판',t);
/* the riverbank: trash piles (tied up in neat bags once it's clean), the cleanup banner on two posts, a scarecrow in the field */
const T=VILLAGE.TILES,r=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
const TILES={...T,
 trashPile:(X,Y,x,y)=>{T.sand(X,Y,x,y);
  if(state.stage>=2){[[2,6],[8,5]].forEach(([a,b])=>{r(X+a,Y+b,6,8,'#3A3E48');r(X+a,Y+b,6,2,'#5A626B');r(X+a+2,Y+b-1,2,2,'#3A3E48')});return}  // tied bags, ready to go
  r(X+2,Y+8,7,6,'#9AA3B5');r(X+3,Y+9,5,4,'#C9CDD4');r(X+9,Y+6,4,8,'#3FA86B');r(X+10,Y+7,2,3,'#8FD3A0');r(X+6,Y+4,5,4,'#D9544B');r(X+7,Y+5,3,1,'#F4F4F4');r(X+1,Y+13,14,2,'#7B8497')},
 banner:(X,Y,x,y)=>{T.grass(X,Y,x,y);const left=at(x-1,y)!==at(x,y);
  r(left?X+2:X+12,Y+2,2,14,'#6B4A2B');r(left?X+4:X,Y+3,left?12:12,8,'#F4F4F4');r(left?X+4:X,Y+3,left?12:12,2,'#4F7BD6');r(left?X+6:X+2,Y+6,8,1,'#2E3548');r(left?X+6:X+2,Y+8,6,1,'#2E3548')},
 scarecrow:(X,Y,x,y)=>{T.dirt(X,Y,x,y);r(X+7,Y+4,2,12,'#6B4A2B');r(X+2,Y+7,12,2,'#6B4A2B');r(X+4,Y+6,8,6,'#D9544B');r(X+5,Y+1,6,5,'#F2D58A');r(X+3,Y+1,10,2,'#C9A04A');r(X+6,Y+3,1,1,'#2E3548');r(X+9,Y+3,1,1,'#2E3548')},
};
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},'_':{tile:'sand',walk:1},'~':{tile:'pond'},
   'X':{tile:'trashPile'},'W':{tile:'banner'},'S':{tile:'scarecrow'},'d':{tile:'dirt',walk:1},'y':{tile:'sapling'},'a':{tile:'tableOut'},'n':{tile:'bench'},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTT",
"T~~~~~~~~~~~~~~~~~~~~~~T",
"T~~~~~~~~~~~~~~~~~~~~~~T",
"T~~~~~~~~~~~~~~~~~~~~~~T",
"T__X___X____X_____X____T",
"T______________________T",
"T..,,,,,,,,,,,,,,,,,,..T",
"T..,....WW..........p..T",
"T..,...................T",
"T..,..ddddd......*.....T",
"T..,..dSdyd............T",
"T..,..ddddd....a.......T",
"T..,,,,,,,,,,,,,,,,,,..T",
"T....................n.T",
"T..*.......*...........T",
"T......................T",
"T.....*.........*......T",
"T......................T",
"TTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['mayor','mina','grandma','junwoo','student'],
  spots:{'20,7':sign('강가 대청소 · 오늘 오전 열 시 · 장갑은 이장님한테서'),'15,11':'분실물 탁자예요. 장갑 한 짝이 놓여 있어요.'},
  things:{
   T:VILLAGE.TREES,
   '~':(x,y)=>({steps:[{say:state.stage>=2?['강물이 맑아졌어요. 오리가 돌아왔어요. 🦆','물속에 물고기가 보여요. 깨끗해요!'][(x+y)%2]:['강물이 조금 탁해요. 비닐봉지가 떠 있어요.','강물에 페트병이 둥둥 떠 있어요.'][(x+y)%2]}]}),
   X:(x,y)=>({steps:[{say:state.stage>=2?'쓰레기를 봉투에 다 담았어요. 트럭이 곧 가져가요.':['쓰레기가 높이 쌓여 있어요. 냄새가 나요.','페트병, 캔, 비닐봉지가 섞여 있어요.'][(x+y)%2]}]}),
   W:['현수막이 걸려 있어요: "강가 대청소의 날"','현수막 밑에 "쓰레기는 집으로!"라고 써 있어요.'],
   S:['허수아비예요. 멀리서 보면 진짜 사람 같아요. 😅'],
   y:['작은 묘목이에요. 봉사자들이 심었어요. 🌱'],
   a:['분실물 탁자예요. 장갑 한 짝이 놓여 있어요.'],
   n:['벤치예요. 할머니가 장바구니를 놓아두셨어요.'],
  }},
};
const INTRO=['단어 마을 12편! 오늘은 강가 대청소 날이에요. 🧹','강가에 쓰레기가 많아요. 마을 사람들이 함께 청소해요.','머리 위에 ! 가 있는 사람을 도와주세요. 배지 아홉 개를 모아요!'].map(say=>({say}));
const DONE=['축하해요! 배지 아홉 개를 다 모았어요! 🎉','강가, 쌓이다, 걸리다, 넘게, 훨씬, 대신에, -기 전에, -이/가 아니라, 한테서!','? 가 있는 사람한테 다시 말해 보세요. 복습하면 ★ 가 생겨요.'];
const PERFECT=['★ 아홉 개! 강가가 반짝반짝해요! ✨','이장님이 수박을 하나 더 주셨어요. 🍉'];
const TIPS=['쓰레기가 <b>쌓여</b> 있어요 · 현수막이 <b>걸려</b> 있어요 (그 상태예요)','청소하<b>기 전에</b> 장갑 · 비닐봉지 <b>대신에</b> 장바구니','사람<b>이 아니라</b> 허수아비 · 이장님<b>한테서</b> 들었어요','스무 개 <b>넘게</b> · 작년보다 <b>훨씬</b> 깨끗해요'];
const quest=()=>state.stage===0?{text:'📣 현수막 앞 이장님한테 가 보세요.'}
 :state.stage===1?(helped()<3?{text:`🧹 강가 청소를 도와요 ${helped()}/3`}:{late:true,text:'📣 이장님한테 다시 가요.'}):null;
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,
 questText:()=>{const v=quest();return v?v.text:''},questLate:()=>{const v=quest();return !!(v&&v.late)},
 afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES};
}});
