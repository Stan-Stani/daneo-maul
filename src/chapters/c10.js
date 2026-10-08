/* 10편 · 이사하는 날 — built from the Anki cards still answered 다시/어려움 (Doc of 2026-10-08): their words are in 1편–9편
   already, so this one teaches the grammar in those sentences: 들어가 있어요 / 놀고 있어요 (-아/어 있다 ↔ -고 있다),
   잠갔어요 / 잠겨 있어요, 비싸지고 있어 (-아/어지다), 대체할 수 없어요 (-(으)ㄹ 수 없다), 작성해 주실래요?, 보다 더.
   Story: a family moves into the village. Help the movers, find the key the kids hid, open the locked door, and fill in the form
   at the 주민센터. state.stage: 0 start · 1 helped the movers · 2 boxes carried, key lost · 3 key found · 4 door open · 5 form done. */
CHAPTERS.push({id:'c10',n:'10편',title:'이사하는 날',color:'#4F9D8F',save:'daneo-maul-v10',words:9,
 place:'이사하다 · 짐 · 옮기다 · -(으)ㄹ 수 없다 · -아/어 있다 · 잠기다 · -아/어 주실래요? · -아/어지다 · 보다 더',
 start:{zone:'village',x:11,y:12,dir:'up'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),
 make:()=>{
const P=KIT.person,go=n=>()=>{state.stage=n};
const WORDS=['이사하다','짐','옮기다','-(으)ㄹ 수 없다','-아/어 있다','잠기다','-아/어 주실래요?','-아/어지다','보다 더'];
const DICT={
 '이사하다':{k:'사는 집을 바꿔요. 짐을 새 집으로 가져가요.',e:'to move (house)',ex:'오늘 이 마을로 새 가족이 이사해요.'},
 '짐':{k:'가지고 가는 물건들. 이사할 때는 "이삿짐".',e:'luggage, belongings',ex:'트럭에 이삿짐이 정말 많아요!'},
 '옮기다':{k:'물건을 다른 곳으로 가져가요.',e:'to move, carry (something)',ex:'박스를 같이 집 안으로 옮겨요.'},
 '-(으)ㄹ 수 없다':{k:'못 해요. 힘이나 상황 때문에 안 돼요.',e:'cannot (be unable to)',ex:'너무 무거워서 혼자 들 수 없어요.'},
 '-아/어 있다':{k:'어떤 일이 끝나고 그 상태가 계속돼요. 예: 열려 있어요.',e:'be (in a state): -아/어 있다',ex:'열쇠가 박스 안에 들어 있어요.'},
 '잠기다':{k:'문이 열리지 않게 돼 있어요. (사람이 하면 "잠그다")',e:'to be locked',ex:'열쇠가 없어서 문이 잠겨 있었어요.'},
 '-아/어 주실래요?':{k:'아주 공손하게 부탁해요. 예: 써 주실래요?',e:'would you (please) …?',ex:'여기에 새 주소를 써 주실래요?'},
 '-아/어지다':{k:'점점 그렇게 변해요. 예: 비싸지다, 추워지다.',e:'to become, get (more) …',ex:'요즘 집값이 계속 비싸지고 있어요.'},
 '보다 더':{k:'두 개를 비교해요. 이것이 저것보다 더 커요.',e:'more … than',ex:'새 집은 전 집보다 더 넓어요.'},
};
const CONFUSE={};
const Q={
 mover:[
  {w:'이사하다',ask:'새 집에 짐을 가지고 가서 살아요. 이걸 뭐라고 해요?',opts:[['이사해요',1],['여행해요',0,'여행은 놀러 갔다가 다시 와요. 사는 집을 바꾸면 "이사해요".'],['이용해요',0,'이용하다는 무엇을 써요. 사는 집을 바꾸면 "이사해요".']]},
  {w:'짐',ask:'트럭에 박스, 의자, 침대… 이삿___이 정말 많아요!',opts:[['짐',1],['집',0,'집은 사는 곳이에요. 옮기는 물건들은 "짐"이에요. 이삿짐!'],['잠',0,'잠은 자는 거예요! 😄 옮기는 물건들은 "짐".']]}],
 mom:[
  {w:'-(으)ㄹ 수 없다',ask:'너무 무거워요. 저 혼자서는 들 ___.',opts:[['수 없어요',1],['수 있어요',0,'무거우면 못 들어요. 못 하면 "-ㄹ 수 없어요".'],['줄 알아요',0,'"-ㄹ 줄 알아요"는 방법을 알아요. 힘 때문에 못 하면 "들 수 없어요".']]},
  {w:'옮기다',ask:'이 박스를 같이 집 앞으로 ___ 줄 수 있어요?',opts:[['옮겨',1],['올려',0,'올리다는 위로 놓아요. 다른 곳으로 가져가면 "옮기다" → "옮겨".'],['옮아',0,'"옮기다"는 "옮겨"가 돼요. 옮겨 줄 수 있어요?']]}],
 subin:[
  {w:'-아/어 있다',ask:'봐요! 열쇠가 박스 안에 ___.',opts:[['들어 있어요',1],['들어가고 있어요',0,'"-고 있어요"는 지금 하는 중이에요. 열쇠는 벌써 안에 있어요. 그 상태는 "들어 있어요".'],['들고 있어요',0,'들고 있으면 손에 있어요. 박스 안에 있으면 "들어 있어요".']]},
  {w:'-아/어 있다',gram:1,ask:'민재는 지금 나무 주위에서 ___.',opts:[['놀고 있어요',1],['놀아 있어요',0,'"-아 있어요"는 끝난 다음의 상태예요. 지금 하는 중이면 "놀고 있어요".']]},
  {w:'-아/어 있다',ask:'박스 뚜껑이 ___. 그래서 안이 보여요.',opts:[['열려 있어요',1],['열고 있어요',0,'"열고 있어요"는 누가 지금 여는 중이에요. 이미 열린 상태면 "열려 있어요".']]}],
 dad:[
  {w:'잠기다',ask:'열쇠가 없어서 아까는 문이 ___ 있었어요.',opts:[['잠겨',1],['잠가',0,'"잠가"는 사람이 잠그는 거예요. 문이 그 상태면 "잠겨 있어요".'],['열려',0,'열려 있으면 들어갈 수 있었어요! 못 들어갔으니까 "잠겨".']]},
  {w:'잠기다',gram:1,ask:'제가 아침에 문을 ___. 그래서 문이 잠겼어요.',opts:[['잠갔어요',1],['잠겼어요',0,'"잠기다"는 문이 하는 말이에요. 사람이 하면 "문을 잠갔어요".']]}],
 staff:[
  {w:'-아/어 주실래요?',ask:'여기에 새 주소를 써 ___?',opts:[['주실래요',1],['드릴래요',0,'"드리다"는 내가 해 드릴 때예요. 부탁할 때는 "써 주실래요?"'],['버릴래요',0,'버리다는 필요 없어서 놓아요! 😄 부탁할 때는 "써 주실래요?"']]},
  {w:'-아/어 주실래요?',who:'나',ask:'펜이 없어요. 펜 좀 ___?',opts:[['빌려주실래요',1],['빌리실래요',0,'"빌리다"는 내가 가져가요. 상대가 주면 "빌려주다" → "빌려주실래요?"']]}],
 realtor:[
  {w:'-아/어지다',ask:'그래서 집값이 계속 ___ 있어요.',opts:[['비싸지고',1],['비싸고',0,'"비싸고 있어요"는 안 써요. 점점 변하면 "-아/어지다": 비싸지고 있어요.'],['비싸게',0,'"비싸게 있어요"는 없어요. 변하는 중이면 "비싸지고 있어요".']]},
  {w:'-아/어지다',ask:'날씨도 이제 많이 ___. 겨울이 와요.',opts:[['추워졌어요',1],['추웠어요',0,'"추웠어요"는 그때 추웠어요. 변했으면 "추워졌어요".']]},
  {w:'보다 더',ask:'수빈네 새 집은 전 집___ 더 넓어요.',opts:[['보다',1],['처럼',0,'"처럼"은 같아요. 비교할 때는 "보다".'],['부터',0,'"부터"는 시작이에요. 비교할 때는 "보다 더".']]}],
};
const NPC={
 mover:{name:'이삿짐 아저씨',zone:'village',x:5,y:9,dir:'down',look:P({hair:'#2B2B2B',skin:'#D9A47A',shirt:'#4F7BD6',pants:'#2E3548',cap:'#4F7BD6'}),badge:['이사하다','짐'],
  after:'짐은 다 내렸어요. 이사는 힘들어요! 💦',
  talk:()=>[{say:'안녕하세요! 이삿짐 센터예요. 🚚'},{say:'오늘 이 마을로 새 가족이 와요.'},Q.mover[0],Q.mover[1],
   {say:'도와줘서 고마워요! 박스는 수빈 엄마한테 물어보세요.',award:['이사하다','짐'],set:go(1)}]},
 mom:{name:'수빈 엄마',zone:'village',x:5,y:10,dir:'left',look:P({hair:'#4A2E22',skin:'#F3D0B0',shirt:'#E07A5F',pants:'#3D5A80',long:1}),badge:['옮기다','-(으)ㄹ 수 없다'],
  get after(){return state.stage>=5?'다 끝났어요! 이따가 떡 가져갈게요. 🍡':state.stage>=4?'문이 열렸어요! 주민센터 일도 부탁해요.':'열쇠는 찾았어요? 아이들은 사과나무 쪽에 있어요.'},
  script:()=>state.stage<1?[{say:'아, 이삿짐 아저씨 먼저 만나 보세요. 저쪽 트럭에 있어요.'}]:null,
  talk:()=>[{say:'안녕하세요! 오늘 이사 왔어요. 수빈 엄마예요.'},{say:'이 박스 좀 보세요. 책이 가득해요.'},Q.mom[0],Q.mom[1],
   {say:'하나, 둘, 셋! 영차! 고마워요.'},
   {say:'어머, 그런데 열쇠가 없어요! 문이 잠겼어요.'},
   {say:'수빈이가 열쇠를 가지고 놀았어요. 아이들은 사과나무 쪽에 있어요.',award:['옮기다','-(으)ㄹ 수 없다'],set:go(2)}]},
 minjae:{name:'민재',zone:'village',x:20,y:11,dir:'left',look:P({hair:'#1E1E24',skin:'#E8B98F',shirt:'#3FA86B',pants:'#2E3548'}),
  talk:()=>state.stage>=3?[{say:'수빈이가 열쇠를 숨겼어요. 히히. 🤫'}]
   :[{say:'우리는 나무 주위에서 놀고 있어요! 🍎'},{say:'수빈이한테 비밀 박스가 있어요. 쉿!'}]},
 subin:{name:'수빈',zone:'village',x:18,y:11,dir:'right',look:P({hair:'#7A3E22',skin:'#F3D0B0',shirt:'#F2C94C',pants:'#8E7CC3',long:1}),badge:['-아/어 있다'],
  get after(){return state.stage>=4?'새 집 좋아요! 내 방이 전 집보다 더 커요.':'아빠한테 열쇠 줬어요?'},
  script:()=>state.stage<2?[{say:'안녕하세요! 저는 수빈이에요. 오늘 이사 왔어요.'},{say:'지금 민재랑 놀고 있어요. 나중에 와요!'}]:null,
  talk:()=>[{say:'열쇠요? 음… 제 비밀 박스에 있어요!'},Q.subin[2],Q.subin[0],Q.subin[1],
   {say:'열쇠 여기 있어요. 엄마한테는 비밀이에요! 히히.',award:['-아/어 있다'],set:go(3)}]},
 dad:{name:'수빈 아빠',zone:'village',x:6,y:6,dir:'down',look:P({hair:'#2A2F4A',skin:'#E6B892',shirt:'#5B8BD9',pants:'#3A3A48'}),badge:['잠기다'],
  pos:()=>state.stage>=4?[6,4]:[6,6],  // in the doorway until the door opens, then inside
  get after(){return state.stage>=5?'이제 우리 집 같아요. 고마워요!':'주민센터는 길 건너 회색 건물이에요.'},
  script:()=>state.stage<3?[{say:'어휴, 문이 잠겨서 못 들어가요.'},{say:'열쇠는 어디 있을까요…'}]:null,
  talk:()=>[{say:'열쇠를 찾았어요? 아이고, 고마워요!'},Q.dad[0],Q.dad[1],
   {say:'찰칵! 문이 열렸어요. 🚪',award:['잠기다'],set:go(4)},
   {say:'그런데 주민센터에 새 주소를 신고해야 돼요.'},
   {say:'저는 짐을 옮겨야 해요. 대신 가 주실래요?'}]},
 staff:{name:'주민센터 직원',zone:'village',x:17,y:3,dir:'down',still:1,fixed:1,look:P({hair:'#3B2A22',skin:'#F1C9A5',shirt:'#9AA3B5',pants:'#2E3548',long:1}),badge:['-아/어 주실래요?'],
  after:'이사 축하해요. 좋은 동네예요!',
  script:()=>state.stage<4?[{say:'주민센터예요. 이사 오셨어요?'},{say:'주소는 가족분이 오셔서 신고해요.'}]:null,
  talk:()=>[{say:'어서 오세요. 수빈네 가족 대신 오셨어요?'},{say:'여기 신청서가 있어요. 📝'},Q.staff[0],Q.staff[1],
   {say:'네, 여기 있어요. 다 됐어요! 이사 축하해요. 🎉',award:['-아/어 주실래요?'],set:go(5)}]},
 realtor:{name:'부동산 아저씨',zone:'village',x:4,y:14,dir:'down',still:1,fixed:1,look:P({hair:'#9A9AA3',skin:'#E3B48C',shirt:'#6B4A2B',pants:'#3A3A48'}),badge:['-아/어지다','보다 더'],
  after:'집값이 또 비싸졌어요. 아이고.',
  talk:()=>[{say:'어서 오세요. 집 구하세요? 🏠'},{say:'요즘 이 마을이 인기가 많아요. 사람들이 계속 이사 와요.'},...Q.realtor,
   {say:'좋은 동네예요. 자주 놀러 와요!',award:['-아/어지다','보다 더']}]},
 grandma:{name:'옆집 할머니',zone:'village',x:21,y:13,dir:'left',look:P({hair:'#C8C8D0',skin:'#E6B892',shirt:'#8E7CC3',pants:'#4A4F6A'}),
  talk:()=>state.stage>=5?[{say:'이사 다 끝났어요? 수빈 엄마가 떡을 가져왔어요! 🍡'},{say:'새 이웃이 생겨서 기분이 좋아요.'}]
   :[{say:'새 이웃이 왔어요? 반가워요.'},{say:'옛날에는 이사 오면 이웃한테 떡을 돌렸어요. 🍡'},{say:'요즘은 그런 집이 적어요. 조금 아쉬워요.'}]},
};
const sign=t=>KIT.sign('표지판',t);
/* a moving truck (cab + back) and cardboard boxes, drawn the way 단어 마을 draws everything */
const T=VILLAGE.TILES,r=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
const box=(X,Y)=>{r(X+2,Y+4,12,11,'#C89B5E');r(X+2,Y+4,12,2,'#DDB57A');r(X+2,Y+14,12,1,'#A87A45');r(X+7,Y+4,2,11,'#E8D3A0');r(X+3,Y+8,3,1,'#A87A45')};
const TILES={...T,
 moveBox:(X,Y,x,y)=>{T.grass(X,Y,x,y);box(X,Y)},
 boxIn:(X,Y,x,y)=>{T.wood(X,Y,x,y);box(X,Y)},
 truckBack:(X,Y,x,y)=>{T.path(X,Y,x,y);r(X,Y+1,16,12,'#F4F4F4');r(X,Y+1,16,1,'#D5DCE3');r(X,Y+6,16,2,'#4F7BD6');r(X,Y+12,16,1,'#9AA3B5');r(X+3,Y+12,4,4,'#1B1E2B');r(X+4,Y+13,2,2,'#9AA3B5')},
 truckCab:(X,Y,x,y)=>{T.path(X,Y,x,y);r(X,Y+4,13,9,'#4F7BD6');r(X+5,Y+5,7,4,'#BFE3F5');r(X+12,Y+8,2,3,'#F2C94C');r(X,Y+12,13,1,'#3A5FAF');r(X+7,Y+12,4,4,'#1B1E2B');r(X+8,Y+13,2,2,'#9AA3B5')},
};
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},'A':{tile:'appleTree'},
   'H':{tile:'brick'},'=':{tile:'wood',walk:1},'b':{tile:'bed'},'Y':{tile:'boxIn'},'X':{tile:'moveBox'},'U':{tile:'truckBack'},'Q':{tile:'truckCab'},
   'K':{tile:'bankWall'},'f':{tile:'floor',walk:1},'c':{tile:'counter',over:1},'S':{tile:'shopWall'},'d':{tile:'desk',over:1},
   '~':{tile:'pond'},'n':{tile:'bench'},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTT",
"T......................T",
"T.HHHHHHHH....KKKKKKK..T",
"T.H==Y=b=H....KfffffK..T",
"T.H=Y====H....KfcccfK..T",
"T.H======H....KfffffK..T",
"T.HHHH=HHH....KKKfKKK..T",
"T.....,..........,.....T",
"T.....,..........,..p..T",
"T..UQ.,,,,,,,,,,,,,,,..T",
"T..XX.,....~~~~........T",
"T.....,....~~~~....A...T",
"T.....,,,,,,,,,,,,,,,..T",
"T.SSSSS.......*.....n..T",
"T.S===S.......*........T",
"T.S=d=S................T",
"T.SS=SS..*.............T",
"T......................T",
"TTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['mover','mom','minjae','subin','dad','staff','realtor','grandma'],
  spots:{'20,8':sign('수빈네 새 집 · 주민센터 · 부동산'),'5,3':'박스가 열려 있어요. 안에 접시가 들어 있어요.'},
  things:{
   T:VILLAGE.TREES,
   A:['사과나무예요. 아이들이 주위에서 놀아요. 🍎','사과가 빨갛게 익어 있어요.'],
   H:['수빈네 새 집이에요. 빨간 벽돌 집이에요.','창문이 깨끗해요. 새 커튼이 걸려 있어요.','벽에 "이사 축하" 풍선이 붙어 있어요. 🎈'],
   Y:['박스에 "부엌"이라고 써 있어요.','박스가 많아요. 다 옮기려면 하루가 걸려요.'],
   X:['아주 무거운 박스예요. "책"이라고 써 있어요. 📚','박스 위에 "조심! 그릇"이라고 써 있어요.'],
   U:['트럭 뒤에 짐이 가득해요.','"행복 이삿짐 센터" 트럭이에요. 🚚'],
   Q:['트럭 운전석이에요. 아무도 없어요.'],
   K:['주민센터예요. 회색 건물이에요. 🏢','주민센터 창문에 "전입 신고는 여기서" 종이가 붙어 있어요.'],
   c:['주민센터 창구예요. 신청서가 쌓여 있어요. 📝'],
   S:['부동산이에요. 창문에 집 사진이 붙어 있어요. 🏠','"월세 · 전세 · 매매" 종이가 붙어 있어요.'],
   d:['부동산 책상이에요. 지도가 펼쳐져 있어요.'],
   b:['새 침대예요. 아직 비닐이 붙어 있어요.'],
   '~':['연못이에요. 오리가 새 이웃을 구경해요. 🦆','물이 맑아요. 물고기가 놀고 있어요.'],
   n:['벤치예요. 할머니가 자주 앉아 있어요.'],
  }},
};
const INTRO=['단어 마을 10편! 오늘은 이사하는 날이에요. 🚚','새 가족이 마을에 와요. 짐이 아주 많아요!','머리 위에 ! 가 있는 사람을 도와주세요. 배지 아홉 개를 모아요!'].map(say=>({say}));
const DONE=['축하해요! 배지 아홉 개를 다 모았어요! 🎉','이사하다, 짐, 옮기다, -(으)ㄹ 수 없다, -아/어 있다, 잠기다, -아/어 주실래요?, -아/어지다, 보다 더!','? 가 있는 사람한테 다시 말해 보세요. 복습하면 ★ 가 생겨요.'];
const PERFECT=['★ 아홉 개! 이사 박사예요! 🏠','수빈네 가족이 떡을 보냈어요. 고맙대요! 🍡'];
const TIPS=['박스 안에 책이 <b>들어 있어요</b> (상태) ↔ 아이들이 <b>놀고 있어요</b> (하는 중)','문이 <b>잠겼어요</b> (문이) ↔ 문을 <b>잠갔어요</b> (내가)','집값이 <b>비싸지고</b> 있어요: <b>-아/어지다</b> = 점점 변해요','새 집이 전 집<b>보다 더</b> 넓어요 · 부탁: 써 <b>주실래요</b>?'];
const quest=()=>state.stage===0?{text:'🚚 이삿짐 트럭에 가 보세요.'}
 :state.stage===1?{text:'📦 수빈 엄마를 도와요.'}
 :state.stage===2?{text:'🔑 사과나무 쪽 아이들한테서 열쇠를 찾아요.'}
 :state.stage===3?{text:'🚪 수빈 아빠한테 열쇠를 줘요.'}
 :state.stage===4?{late:true,text:'🏢 주민센터에서 새 주소를 신고해요.'}:null;
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,
 questText:()=>{const v=quest();return v?v.text:''},questLate:()=>{const v=quest();return !!(v&&v.late)},
 afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES};
}});
