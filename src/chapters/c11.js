/* 11편 · 요리 대회 — built from the user's Anki notes (Stan-Stani/korean-vocab vocab.db, synced 2026-10-06): words learned in
   February 2025 and not seen since (고르다, 부추, 마늘, 자두, 새콤하다, 달콤하다, 끓이다) plus new cards (굽다, 배부르다).
   Story: the village cooking contest. Sign up, choose the ingredients at the market, cook a 부추전 and a 된장찌개, serve the judge.
   state.stage: 0 start · 1 signed up (shopping) · 3 cooked · 4 judged. */
CHAPTERS.push({id:'c11',n:'11편',title:'요리 대회',color:'#E07A5F',save:'daneo-maul-v11',words:9,
 place:'고르다 · 부추 · 마늘 · 자두 · 새콤하다 · 달콤하다 · 끓이다 · 굽다 · 배부르다',
 start:{zone:'village',x:11,y:12,dir:'up'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),
 make:()=>{
const P=KIT.person,go=n=>()=>{state.stage=n};
const SHOPS=['veg','fruit'],shopped=()=>SHOPS.filter(k=>NPC[k].badge.every(has)).length;
const WORDS=['고르다','부추','마늘','자두','새콤하다','달콤하다','끓이다','굽다','배부르다'];
const DICT={
 '고르다':{k:'여러 개 중에서 하나를 뽑아요. 골라요, 골랐어요.',e:'to choose, pick',ex:'시장에 가서 신선한 재료를 골라 오세요.'},
 '부추':{k:'가늘고 긴 초록색 채소. 부추전을 만들어요.',e:'garlic chives',ex:'부추전에는 부추가 필요해요.'},
 '전':{k:'채소나 고기를 넣고 프라이팬에 구운 한국 음식. 부추전은 전이에요.',e:'jeon (a Korean savory pancake)'},  /* in this 편 전 is always the food, never 전 (before) */
 '마늘':{k:'냄새가 강한 하얀 채소. 음식에 조금씩 넣어요.',e:'garlic',ex:'찌개에 마늘을 조금 넣으세요.'},
 '자두':{k:'빨갛고 작은 여름 과일. 복숭아보다 작아요.',e:'plum',ex:'자두는 새콤달콤해요.'},
 '새콤하다':{k:'맛이 조금 시어서 기분이 좋아요.',e:'(pleasantly) sour, tangy',ex:'자두를 먹어 보세요. 맛이 새콤해요.'},
 '달콤하다':{k:'맛이 달고 좋아요.',e:'sweet',ex:'설탕을 넣으면 달콤한 맛이 돼요.'},
 '끓이다':{k:'물이나 국을 아주 뜨겁게 해요. 끓여요.',e:'to boil (something)',ex:'냄비에 물을 넣고 끓여요.'},
 '굽다':{k:'불이나 프라이팬에서 익혀요. 구워요, 구웠어요.',e:'to grill, bake, fry (a pancake)',ex:'부추전은 프라이팬에서 구워요.'},
 '배부르다':{k:'많이 먹어서 배가 가득해요. 배불러요.',e:'to be full (after eating)',ex:'너무 많이 먹었어요. 배불러요.'},
};
const CONFUSE={};
const Q={
 host:[
  {w:'고르다',ask:'시장에 가서 신선한 재료를 ___ 오세요.',opts:[['골라',1],['고라',0,'"고르다"는 "골라"가 돼요. 르 → ㄹ라.'],['걸어',0,'걷다는 발로 가요. 여러 개 중에서 하나를 뽑으면 "고르다" → "골라".']]},
  {w:'고르다',ask:'빨간 사과하고 초록 사과 중에서 하나를 ___ 보세요.',opts:[['골라',1],['골러',0,'르 동사예요: 골라요, 골라 보세요.']]}],
 veg:[
  {w:'부추',ask:'부추전을 만들어요? 그럼 이 가늘고 긴 초록색 채소, ___가 필요해요.',opts:[['부추',1],['배추',0,'배추는 김치를 만드는 큰 채소예요. 가늘고 긴 것은 "부추".'],['고추',0,'고추는 매운 채소예요! 부추전에는 "부추".']]},
  {w:'마늘',ask:'찌개에는 하얀 ___을 조금 넣으세요. 냄새가 강해요.',opts:[['마늘',1],['마음',0,'😄 마음은 넣을 수 없어요! 냄새가 강한 하얀 채소는 "마늘".'],['바늘',0,'바늘은 바느질할 때 써요! 먹는 건 "마늘".']]}],
 fruit:[
  {w:'자두',ask:'빨갛고 작은 과일이에요. 복숭아보다 작아요. 이건 ___예요.',opts:[['자두',1],['두부',0,'두부는 콩으로 만들어요! 과일은 "자두".'],['자도',0,'"자도"는 없어요. 빨갛고 작은 과일은 "자두".']]},
  {w:'새콤하다',ask:'한 개 먹어 보세요. 맛이 어때요? 조금 시어요. 아주 ___.',opts:[['새콤해요',1],['시끄러워요',0,'시끄럽다는 소리가 커요. 맛이 조금 시면 "새콤해요".'],['차가워요',0,'차갑다는 온도예요. 맛이 조금 시면 "새콤해요".']]},
  {w:'달콤하다',ask:'설탕을 조금 넣으면 ___ 맛이 돼요.',opts:[['달콤한',1],['매운',0,'설탕은 맵지 않아요! 단맛은 "달콤한".'],['짠',0,'짠맛은 소금이에요. 설탕 맛은 "달콤한".']]}],
 cook:[
  {w:'끓이다',ask:'냄비에 물을 넣고 ___. 그리고 마늘을 넣어요.',opts:[['끓여요',1],['꿇어요',0,'꿇다는 무릎을 꿇어요! 물을 아주 뜨겁게 하면 "끓여요".'],['구워요',0,'"구워요"는 프라이팬에서 익혀요. 물은 "끓여요".']]},
  {w:'굽다',ask:'부추전은 프라이팬에서 ___.',opts:[['구워요',1],['굽어요',0,'"굽다"는 ㅂ이 ㅜ로 바뀌어요: 구워요.'],['끓여요',0,'전은 물에 넣지 않아요! 프라이팬에서는 "구워요".']]}],
 judge:[
  {w:'배부르다',ask:'너무 많이 먹었어요. 이제 ___.',opts:[['배불러요',1],['배부러요',0,'"배부르다"는 "배불러요"가 돼요. 르 → ㄹ러.'],['배고파요',0,'배고프면 더 먹고 싶어요! 많이 먹었으면 "배불러요".']]}],
};
const NPC={
 host:{name:'진행자',zone:'village',x:14,y:7,dir:'down',look:P({hair:'#1E1E24',skin:'#E8B98F',shirt:'#D9544B',pants:'#2E3548',cap:'#F4F4F4'}),badge:['고르다'],
  status:()=>state.stage===1&&shopped()===2?'wait':undefined,
  get after(){return state.stage>=4?'오늘의 요리왕! 축하해요! 🏆':state.stage>=3?'심사위원이 기다려요!':shopped()===2?'재료 다 샀어요? 요리 선생님한테 가세요.':`시장에서 재료를 골라 오세요. 지금 ${shopped()}곳 갔어요.`},
  talk:()=>[{say:'단어 마을 요리 대회에 온 걸 환영해요! 📣'},{say:'오늘 요리는 부추전하고 된장찌개예요.'},Q.host[0],Q.host[1],
   {say:'좋아요! 채소 가게하고 과일 가게에 가 보세요.',award:['고르다'],set:go(1)}]},
 veg:{name:'채소 가게 아저씨',zone:'village',x:3,y:4,dir:'down',look:P({hair:'#3B2A22',skin:'#D9A47A',shirt:'#3FA86B',pants:'#4A4F6A',cap:'#3FA86B'}),badge:['부추','마늘'],
  after:'오늘 채소는 다 신선해요. 또 와요!',
  script:()=>state.stage<1?[{say:'채소 사요? 요리 대회에 나가면 할인해 줄게요. 🥬'}]:null,
  talk:()=>[{say:'어서 오세요! 오늘 채소가 아주 신선해요. 🥬'},Q.veg[0],Q.veg[1],
   {say:'여기 있어요. 부추 한 단, 마늘 한 봉지!',award:['부추','마늘']}]},
 fruit:{name:'과일 가게 아주머니',zone:'village',x:9,y:4,dir:'down',look:P({hair:'#7A3E22',skin:'#F3D0B0',shirt:'#F2C94C',pants:'#3D5A80',long:1}),badge:['자두','새콤하다','달콤하다'],
  after:'자두 화채, 맛있게 만들어요!',
  script:()=>state.stage<1?[{say:'자두 사 가세요! 지금이 제철이에요.'}]:null,
  talk:()=>[{say:'자두 사 가세요! 지금이 제철이에요.'},Q.fruit[0],Q.fruit[1],Q.fruit[2],
   {say:'새콤달콤! 자두 화채도 만들어 보세요.',award:['자두','새콤하다','달콤하다']}]},
 bread:{name:'빵집 아저씨',zone:'village',x:15,y:4,dir:'down',look:P({hair:'#9A9AA3',skin:'#F1C9A5',shirt:'#F4F4F4',pants:'#6B4A2B',cap:'#F4F4F4'}),
  talk:()=>[{say:'빵은 아침마다 오븐에서 구워요. 🍞'},{say:'냄새가 고소하죠? 대회 끝나고 하나 먹어 봐요.'}]},
 cook:{name:'요리 선생님',zone:'village',x:13,y:8,dir:'left',look:P({hair:'#2B2B2B',skin:'#E6B892',shirt:'#F4F4F4',pants:'#2E3548',cap:'#F4F4F4'}),badge:['끓이다','굽다'],
  after:'다음에는 김치찌개도 끓여 봐요!',
  script:()=>state.stage<1?[{say:'요리 대회에 나가려면 먼저 진행자한테 신청하세요.'}]
   :shopped()<2?[{say:'먼저 시장에서 재료를 사 오세요. 채소 가게하고 과일 가게요.'}]:null,
  talk:()=>[{say:'재료 다 샀어요? 좋아요! 이제 요리해요. 🍳'},Q.cook[0],{say:'보글보글… 된장찌개가 잘 끓어요.'},Q.cook[1],
   {say:'지글지글… 냄새가 좋아요! 이제 심사위원한테 가져가세요.',award:['끓이다','굽다'],set:go(3)}]},
 judge:{name:'심사위원',zone:'village',x:18,y:7,dir:'down',still:1,fixed:1,look:P({hair:'#C8C8D0',skin:'#E3B48C',shirt:'#2E3548',pants:'#2E3548'}),badge:['배부르다'],
  after:'아직도 배불러요. 하하.',
  script:()=>state.stage<3?[{say:'요리 대회 심사위원이에요.'},{say:'음식을 가져오면 맛을 볼게요.'}]:null,
  talk:()=>[{say:'와, 부추전하고 된장찌개! 자두 화채도 있네요.'},{say:'음… 맛있어요. 부추전이 바삭해요.'},Q.judge[0],
   {say:'우승! 🏆 오늘의 요리왕이에요!',award:['배부르다'],set:go(4)}]},
 kid:{name:'지후',zone:'village',x:3,y:13,dir:'right',look:P({hair:'#4A2E22',skin:'#F3D0B0',shirt:'#5B8BD9',pants:'#3A3A48'}),
  talk:()=>state.stage>=4?[{say:'우와, 요리왕이다! 저도 배워 보고 싶어요.'}]
   :[{say:'심심해요… 대회는 언제 끝나요?'},{say:'엄마는 아직 재료를 고르고 있어요.'}]},
 grandpa:{name:'할아버지',zone:'village',x:9,y:14,dir:'left',look:P({hair:'#E0E0E6',skin:'#E6B892',shirt:'#8E7CC3',pants:'#4A4F6A'}),
  talk:()=>[{say:'요즘 마늘이 많이 비싸졌어요.'},{say:'옛날에는 집에서 다 길렀어요.'}]},
};
const sign=t=>KIT.sign('표지판',t);
/* the cooking stations: a pot that steams and a pan with a 부추전, drawn the way 단어 마을 draws everything */
const T=VILLAGE.TILES,r=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
const burner=(X,Y)=>{r(X+1,Y+8,14,7,'#7B8497');r(X+1,Y+8,14,2,'#9AA3B5');r(X+3,Y+15,2,1,'#3A3A48');r(X+11,Y+15,2,1,'#3A3A48')};
const TILES={...T,
 potStove:(X,Y,x,y,t)=>{T.grass(X,Y,x,y);burner(X,Y);r(X+3,Y+3,10,6,'#3A3A48');r(X+4,Y+4,8,4,'#5A626B');r(X+2,Y+4,1,2,'#3A3A48');r(X+13,Y+4,1,2,'#3A3A48');
  const o=Math.floor(t/350)%3;r(X+5+o*2,Y+1-(o%2),1,2,'#F4F4F4');r(X+9-o,Y+(o%2),1,2,'#E8ECF2')},
 panStove:(X,Y,x,y)=>{T.grass(X,Y,x,y);burner(X,Y);r(X+2,Y+5,12,3,'#1B1E2B');r(X+13,Y+6,3,1,'#6B4A2B');r(X+4,Y+5,8,2,'#D9A44A');r(X+5,Y+5,2,1,'#3FA86B');r(X+9,Y+6,2,1,'#3FA86B')},
};
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},
   't':{tile:'tent'},'o':{tile:'potStove'},'s':{tile:'panStove'},'a':{tile:'tableOut',over:1},'~':{tile:'pond'},'n':{tile:'bench'},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTT",
"T......................T",
"T.tttt..tttt..tttt.....T",
"T.tttt..tttt..tttt.....T",
"T......................T",
"T....,,,,,,,,,,,,,,....T",
"T....,..............p..T",
"T....,.................T",
"T....,...ooss....aa....T",
"T....,,,,,,,,,,,,,,,,..T",
"T....,....~~~~.........T",
"T....,....~~~~...*.....T",
"T....,,,,,,,,,,,,,,,,..T",
"T.***..................T",
"T.......n..............T",
"T.....*........*.......T",
"T..........*...........T",
"T......................T",
"TTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['host','veg','fruit','bread','cook','judge','kid','grandpa'],
  spots:{'20,6':sign('단어 마을 요리 대회 · 오늘 오후 두 시!')},
  things:{
   T:VILLAGE.TREES,
   t:(x,y)=>({steps:[{say:x<6?(y===2?'채소 가게 지붕이에요. 초록색 줄무늬예요.':'부추, 마늘, 배추가 쌓여 있어요. 🥬'):x<12?(y===2?'과일 가게 지붕이에요.':'자두하고 복숭아가 바구니에 가득해요.'):(y===2?'빵집 천막이에요. 고소한 냄새가 나요.':'갓 구운 빵이 줄줄이 있어요. 🍞')}]}),
   o:['냄비가 있어요. 찌개를 끓이는 곳이에요.','불이 켜져 있어요. 냄비에서 김이 나요.'],
   s:['프라이팬이 있어요. 전을 굽는 곳이에요.','프라이팬에 기름이 반짝여요.'],
   a:['심사위원 자리예요. 숟가락하고 젓가락이 놓여 있어요.'],
   '~':['연못이에요. 오리가 냄새를 맡고 와요. 🦆','물이 맑아요. 물고기가 놀고 있어요.'],
   n:['벤치예요. 할아버지가 대회를 구경해요.'],
  }},
};
const INTRO=['단어 마을 11편! 오늘은 요리 대회가 열려요. 🍳','시장에서 재료를 고르고, 맛있는 요리를 만들어요.','머리 위에 ! 가 있는 사람한테 말해 보세요. 배지 아홉 개를 모아요!'].map(say=>({say}));
const DONE=['축하해요! 배지 아홉 개를 다 모았어요! 🎉','고르다, 부추, 마늘, 자두, 새콤하다, 달콤하다, 끓이다, 굽다, 배부르다!','? 가 있는 사람한테 다시 말해 보세요. 복습하면 ★ 가 생겨요.'];
const PERFECT=['★ 아홉 개! 진짜 요리왕이에요! 👑','다음 대회도 기대할게요!'];
const TIPS=['르 동사: 고르다 → <b>골라요</b> · 배부르다 → <b>배불러요</b>','ㅂ 동사: 굽다 → <b>구워요</b>','물은 <b>끓여요</b> · 전은 <b>구워요</b>','맛: 조금 시면 <b>새콤해요</b> · 설탕 맛은 <b>달콤해요</b>'];
const quest=()=>state.stage===0?{text:'📣 진행자한테 대회를 신청해요.'}
 :state.stage===1?(shopped()<2?{text:`🛒 시장에서 재료를 골라요 ${shopped()}/2`}:{late:true,text:'🍳 요리 선생님한테 가요.'})
 :state.stage===3?{late:true,text:'🍽️ 심사위원한테 음식을 가져가요.'}:null;
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,
 questText:()=>{const v=quest();return v?v.text:''},questLate:()=>{const v=quest();return !!(v&&v.late)},
 afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES};
}});
