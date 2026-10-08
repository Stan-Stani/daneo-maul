/* 7편 · 한국 뉴스 — every line, the map and the people as in the old cartridge; on the walk engine, with 단어 마을's own art
   (src/village.js) and kit (src/kit.js). You're the reporter again, now at a Seoul station. Real news from Oct 2–3, 2026:
   Aichi-Nagoya Asian Games (men's recurve archery team gold, LoL team gold — both back-to-back), bank hacking (Shinhan, KB, Hana,
   BNK Busan; FSC emergency meeting, Hana promises compensation), and 한글날 (Oct 9 public holiday).
   Ending: stand on the ✕ in front of the camera and broadcast.
   state.stage: 0 start · 1 interviewing · 2 go to the ✕ · 3 broadcast done */
CHAPTERS.push({id:'c7',n:'7편',title:'한국 뉴스',place:'기자 · 취재하다 · 보도하다 · 금메달 · 결승 · 연패 · 개인정보 · 보상하다 · 해킹 · 유출되다 · 공휴일 · 기념하다',words:12,save:'daneo-maul-v7',color:'#3E7F78',
 start:{zone:'village',x:10,y:8,dir:'down'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),  // old saves carry over (state.stage stays where it was)
 make:()=>{
const P=KIT.person;
/* the five people to interview (the news sources the 배지 sheet links are NEWS below) */
const SOURCES=['archer','gamer','banker','expert','guide'];
const done=()=>SOURCES.filter(k=>NPC[k].badge.every(has)).length;
const go=n=>()=>{state.stage=n};
const WORDS=['기자','취재하다','보도하다','금메달','결승','연패','개인정보','보상하다','해킹','유출되다','공휴일','기념하다'];
const DICT={
 '기자':{k:'뉴스를 쓰는 사람.',e:'reporter',ex:'뉴스를 취재하는 사람은 기자예요.'},
 '취재하다':{k:'기자가 뉴스를 위해 사람을 만나고 알아봐요.',e:'to cover (news)',ex:'기자가 사람들을 만나서 이야기를 듣고 알아봐요. 기자가 취재해요.'},
 '보도하다':{k:'신문이나 방송으로 뉴스를 알려요. 報道.',e:'to report',ex:'카메라 앞이에요. 이제 뉴스를 보도할 시간이에요!'},
 '금메달':{k:'1등이 받는 메달.',e:'gold medal',ex:'지난 아시안게임에 이어서 또 금메달이에요!'},
 '결승':{k:'마지막 경기. 이기면 1등.',e:'final (match)',ex:'마지막 경기예요. 이기면 금메달이에요. 이 경기는 결승이에요.'},
 '연패':{k:'連霸 계속 이겨요. 또는 連敗 계속 져요!',e:'back-to-back wins / losses',ex:'지난 아시안게임에서도 금메달, 이번에도 금메달! 2연패예요.'},
 '개인정보':{k:'이름, 주소, 전화번호 같은 나에 대한 정보.',e:'personal info',ex:'이름, 주소, 전화번호, 이메일… 나에 대한 이런 정보는 개인정보예요.'},
 '보상하다':{k:'피해를 돈이나 다른 것으로 갚아요.',e:'to compensate',ex:'피해가 생기면 은행이 다 보상한다고 했어요.'},
 '해킹':{k:'몰래 다른 컴퓨터에 들어가는 것.',e:'hacking',ex:'나쁜 사람이 몰래 다른 컴퓨터에 들어가요. 그건 해킹이에요.'},
 '유출되다':{k:'정보나 물이 밖으로 새어 나가요.',e:'to be leaked',ex:'정보가 밖으로 새어 나갔어요. 개인정보가 유출됐어요.'},
 '공휴일':{k:'나라가 정한 쉬는 날.',e:'public holiday',ex:'학교도 회사도 쉬어요. 나라에서 정한 쉬는 날이에요. 그건 공휴일이에요.'},
 '기념하다':{k:'중요한 일을 잊지 않고 특별하게 보내요.',e:'to commemorate',ex:'중요한 날을 잊지 않으려고 특별하게 보내요. 그날을 기념해요.'},
};
const CONFUSE={};
/* every question, by who asks it, so review can reuse them. The 편집장's are all of his: 기자, 취재하다 in his office, 보도하다 at
   the camera (onStep), so he reviews 보도하다 after the broadcast. gram:1 = it asks about the news story (인도, 3 대 0, 파고 은행,
   10월 9일) or another word (피해): asked in the conversation as before, but review asks the word's own questions */
const Q={
 editor:[
  {w:'기자',ask:'파고에서도 했어요! 뉴스를 취재하는 사람은 ___예요.',opts:[['기자',1],['앵커',0,'앵커는 방송에서 뉴스를 읽어요. 밖에서 취재해요 → "기자".'],['관중',0,'관중은 경기를 보는 사람이에요. 뉴스를 취재해요 → "기자".']]},
  {w:'취재하다',ask:'기자가 사람들을 만나서 이야기를 듣고 알아봐요. 기자가 ___.',opts:[['취재해요',1],['보상해요',0,'보상은 피해를 돈으로 갚아요. 뉴스를 알아봐요 → "취재해요".'],['유출돼요',0,'유출은 정보가 밖으로 새요. 뉴스를 알아봐요 → "취재해요".']]},
  {w:'취재하다',ask:'"취재"하고 "보도", 뭐가 먼저예요?',opts:[['취재가 먼저, 보도는 나중',1],['보도가 먼저, 취재는 나중',0,'먼저 알아봐요(취재). 그다음 뉴스로 알려요(보도).']]},
  {w:'보도하다',ask:'카메라 앞이에요. 이제 뉴스를 ___ 시간이에요!',opts:[['보도할',1],['취재할',0,'취재는 벌써 했어요! 이제 뉴스로 알려요 → "보도할".'],['유출할',0,'😄 뉴스는 유출 안 해요! 알려요 → "보도할".']]},
  {w:'보도하다',ask:'"보도"는 뜻이 두 개였어요. 뉴스 말고 하나 더는?',opts:[['사람이 걷는 길',1],['사람이 타는 차',0,'보도(步道)는 사람이 걷는 길이에요. 파고 뉴스에서 배웠어요!']]}],
 archer:[
  {w:'금메달',ask:'1등은 금메달. 2등은 ___이에요.',opts:[['은메달',1],['동메달',0,'동메달은 3등이에요. 1등 금, 2등 "은", 3등 동!']]},
  {w:'금메달',ask:'"금빛 활"은 무슨 뜻이에요?',opts:[['금메달을 딴 활 솜씨',1],['금으로 만든 활',0,'진짜 금이 아니에요! 금메달처럼 빛나는 활 솜씨예요.']]},
  {w:'결승',ask:'마지막 경기예요. 이기면 금메달이에요. 이 경기는 ___이에요.',opts:[['결승',1],['결석',0,'결석은 학교에 안 가요! 마지막 경기 → "결승".'],['준결승',0,'준결승은 결승 바로 전이에요. 마지막 경기 → "결승".']]},
  {w:'결승',gram:1,ask:'한국 남자 양궁 대표팀은 결승에서 누구를 이겼어요?',opts:[['인도',1],['대만',0,'대만은 LoL 결승 상대예요. 양궁은 "인도"를 이겼어요.']]}],
 gamer:[
  {w:'연패',ask:'지난 아시안게임에서도 금메달, 이번에도 금메달! 2___예요.',opts:[['연패',1],['결승',0,'결승은 마지막 경기예요. 두 번 연속 우승 → "2연패".']]},
  {w:'연패',ask:'조심! "연패"는 뜻이 두 개예요. "3연패 했어요. 너무 슬퍼요." 무슨 뜻이에요?',opts:[['세 번 연속 졌어요.',1],['세 번 연속 이겼어요.',0,'슬퍼요 → 졌어요! 連敗는 계속 져요. 連霸는 계속 이겨요. 글로 보면 똑같아요! 😄']]},
  {w:'연패',gram:1,ask:'LoL 대표팀은 결승에서 대만을 몇 대 몇으로 이겼어요?',opts:[['3 대 0',1],['3 대 2',0,'한 세트도 안 졌어요! "3 대 0"이에요.']]}],
 banker:[
  {w:'개인정보',ask:'이름, 주소, 전화번호, 이메일… 나에 대한 이런 정보는 ___예요.',opts:[['개인정보',1],['신분증',0,'신분증은 카드예요. 나에 대한 정보 → "개인정보".'],['일자리',0,'일자리는 일하는 곳이에요. 나에 대한 정보 → "개인정보".']]},
  {w:'개인정보',ask:'"개인"은 무슨 뜻이에요?',opts:[['한 사람',1],['많은 사람',0,'개인(個人)은 한 사람이에요. 반대는 "단체".']]},
  {w:'보상하다',ask:'은행 잘못으로 손님이 돈을 잃었어요. 은행이 그 돈을 다 ___.',opts:[['보상해요',1],['보도해요',0,'보도는 기자가 뉴스로 알려요. 피해를 돈으로 갚아요 → "보상해요".'],['저장해요',0,'저장은 남겨 둬요. 피해를 돈으로 갚아요 → "보상해요".']]},
  {w:'보상하다',gram:1,ask:'"피해"는 무슨 뜻이에요?',opts:[['나쁜 일로 손해를 봤어요.',1],['좋은 선물을 받았어요.',0,'피해는 나쁜 거예요! 해킹 피해, 비 피해… 손해를 봤어요.']]}],
 expert:[
  {w:'해킹',ask:'나쁜 사람이 몰래 다른 컴퓨터에 들어가요. 그건 ___이에요.',opts:[['해킹',1],['저장',0,'저장은 파일을 남겨요. 몰래 들어가요 → "해킹".'],['취재',0,'취재는 기자가 해요! 몰래 들어가요 → "해킹".']]},
  {w:'해킹',gram:1,ask:'이번 해킹 뉴스에 나온 은행이 아닌 곳은?',opts:[['파고 은행',1],['하나은행',0,'하나은행도 해킹 피해가 있었어요. 신한, 국민, 하나, 부산은행이에요.']]},
  {w:'유출되다',ask:'정보가 밖으로 새어 나갔어요. 개인정보가 ___.',opts:[['유출됐어요',1],['보상됐어요',0,'보상은 피해를 갚아요. 밖으로 새어 나갔어요 → "유출됐어요".'],['개선됐어요',0,'개선은 좋아져요. 😅 밖으로 새어 나갔어요 → "유출됐어요".']]},
  {w:'유출되다',ask:'해커가 정보를 밖으로 빼냈어요. 해커가 정보를 ___. (내가 했어요)',opts:[['유출했어요',1],['유출됐어요',0,'"되다"는 혼자 그렇게 됐어요. 해커가 했어요 → "유출했어요". 개선하다/개선되다랑 같아요!']]}],
 guide:[
  {w:'공휴일',ask:'학교도 회사도 쉬어요. 나라에서 정한 쉬는 날이에요. 그건 ___이에요.',opts:[['공휴일',1],['주말',0,'주말은 토요일, 일요일이에요. 나라가 정한 쉬는 날 → "공휴일".'],['생일',0,'생일은 태어난 날이에요. 나라가 정한 쉬는 날 → "공휴일".']]},
  {w:'공휴일',gram:1,ask:'한글날은 언제예요?',opts:[['10월 9일',1],['10월 3일',0,'10월 3일은 개천절이에요. 이것도 공휴일이에요! 한글날은 "10월 9일".']]},
  {w:'기념하다',ask:'중요한 날을 잊지 않으려고 특별하게 보내요. 그날을 ___.',opts:[['기념해요',1],['보상해요',0,'보상은 피해를 갚아요. 중요한 날을 특별하게 → "기념해요".']]},
  {w:'기념하다',ask:'한글날에는 무엇을 기념해요?',opts:[['세종대왕이 한글을 만든 것',1],['한국 축구가 이긴 것',0,'한글날은 한글을 기념해요. 세종대왕이 1443년에 만들었어요.']]},
  {w:'기념하다',ask:'여행에서 산 작은 물건은 "___품"이에요.',opts:[['기념',1],['공휴',0,'여행을 기억하는 물건 → "기념품". 공휴일은 쉬는 날이에요.']]}],
};
const NPC={
 editor:{name:'편집장',zone:'village',x:4,y:3,dir:'down',still:1,fixed:1,look:P({hair:'#2B1E1A',skin:'#F3D0B0',shirt:'#3E7F78',pants:'#2E3548',long:1}),badge:['기자','취재하다','보도하다'],  // 보도하다 is earned at the camera; the 편집장 reviews it afterwards
  after:'좋은 뉴스 고마워요. 다음 취재도 부탁해요! 📰',
  status:()=>(state.stage===1&&done()<SOURCES.length)||state.stage===2?'wait':undefined,
  script:()=>{
   if(state.stage===0)return [
    {say:'어서 와요! 서울 방송국이에요. 📺'},
    {say:'파고 뉴스, 잘 봤어요! 우리 방송국에서도 기자를 해 주세요.'},
    Q.editor[0],Q.editor[1],Q.editor[2],
    {say:'좋아요! 기자증을 받으세요. 🪪',award:['기자','취재하다'],set:go(1)},
    {say:'이번 주 한국 뉴스가 많아요. 아시안게임, 은행 해킹, 한글날!'},
    {say:'다섯 명을 취재해 오세요. 광장, 은행, 박물관에 가 보세요.'}];
   if(state.stage===1&&done()<SOURCES.length)return [{say:`아직 취재 중이에요? 지금 ${done()}명 했어요. 다섯 명 다 만나 보세요!`}];
   if(state.stage===1)return [
    {say:'다 취재했어요? 수고했어요!'},
    {say:'이제 보도할 시간이에요. 카메라 앞 ✕ 표시에 서세요! 🎥',set:go(2)}];
   if(state.stage===2)return [{say:'카메라 앞 ✕ 표시에 서세요! 방송 시작해요. 🎥'}];
   return null;
  },
  talk:()=>[]},
 anchor:{name:'앵커',zone:'village',x:7,y:3,dir:'down',look:P({hair:'#1E1E24',skin:'#F1C9A5',shirt:'#D9544B',pants:'#2E3548'}),
  talk:()=>[{say:'저는 앵커예요. 파고에서 온 기자님이죠? 반가워요! 🎙️'},{say:'기자가 취재하고, 앵커가 보도해요. 오늘은 기자님이 직접 보도해요!'}]},
 archer:{name:'양궁 팬',zone:'village',x:5,y:15,dir:'up',look:P({hair:'#2A2F4A',skin:'#F1C9A5',shirt:'#F2C94C',pants:'#2E3548',cap:'#D9544B'}),badge:['금메달','결승'],
  after:'한국 양궁 최고! 🏹🥇',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'와! 아시안게임 봐요! 🏹 (화면만 봐요.)'}]:null,
  talk:()=>[
   {say:'기자님! 방금 봤어요? 양궁이에요! 🏹'},
   {say:'아이치·나고야 아시안게임, 남자 양궁 단체전이에요.'},
   Q.archer[2],Q.archer[3],
   {say:'김우진, 이우석, 김제덕 선수! 흔들림이 없었어요.'},
   Q.archer[0],Q.archer[1],
   {say:'지난 아시안게임에 이어서 또 금메달이에요!',award:['금메달','결승']}]},
 gamer:{name:'e스포츠 팬',zone:'village',x:7,y:16,dir:'up',look:P({hair:'#C0582E',skin:'#F3D0B0',shirt:'#8E7CC3',pants:'#3A3F55',long:1}),badge:['연패'],
  after:'다음 아시안게임은 3연패! 🎮',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'쉿! 지금 LoL 결승이에요! 🎮'}]:null,
  talk:()=>[
   {say:'기자님, 리그 오브 레전드 결승 봤어요? 🎮'},
   {say:'한국 대표팀이 대만을 이겼어요! 한 세트도 안 졌어요.'},
   Q.gamer[2],Q.gamer[0],Q.gamer[1],
   {say:'우리 대표팀은 좋은 연패예요! 계속 이겨요. 😄',award:['연패']}]},
 fan:{name:'관중',zone:'village',x:4,y:14,dir:'up',still:1,fixed:1,look:P({hair:'#1F1F1F',skin:'#DDAE85',shirt:'#5B8BD9',pants:'#333'}),
  talk:()=>[{say:'대한민국! 짝짝짝 짝짝! 👏'},{say:'오늘 금메달이 두 개예요!'}]},
 banker:{name:'은행원',zone:'village',x:17,y:7,dir:'down',look:P({hair:'#3B2A22',skin:'#F3D0B0',shirt:'#2E3548',pants:'#2E3548',long:1}),badge:['개인정보','보상하다'],
  after:'고객님 정보는 저희가 꼭 지킬게요. 🔒',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'죄송해요. 지금 바빠요. 🏦'}]:null,
  talk:()=>[
   {say:'기자님, 안녕하세요. 은행원이에요. 요즘 정말 바빠요. 🏦'},
   {say:'여러 은행이 해킹을 당했어요. 손님 정보가 밖으로 나갔어요.'},
   Q.banker[0],Q.banker[1],
   {say:'하나은행은 손님 89명 정보가 나갔어요. 이름, 주소, 전화번호…'},
   {say:'그래도 인터넷 뱅킹하고 모바일 뱅킹은 따로 있어서 괜찮다고 했어요.'},
   Q.banker[3],Q.banker[2],
   {say:'피해가 생기면 은행이 다 보상한다고 했어요.',award:['개인정보','보상하다']}]},
 grandma:{name:'할머니',zone:'village',x:21,y:7,dir:'down',still:1,fixed:1,look:P({hair:'#E8E8EE',skin:'#F1C9A5',shirt:'#B5654A',pants:'#5A3A22',long:1}),
  talk:()=>[{say:'아이고, 내 개인정보도 유출됐을까? 걱정돼요…'},{say:'모르는 전화나 문자는 조심해야 돼요!'}]},
 expert:{name:'보안 전문가',zone:'village',x:13,y:9,dir:'down',look:P({hair:'#1E1E24',skin:'#E8B98F',shirt:'#3FA86B',pants:'#2E3548',cap:'#2E3548'}),badge:['해킹','유출되다'],
  after:'비밀번호는 자주 바꾸세요! 🔐',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'보안 이야기요? 기자님한테만 말할 거예요. 🔐'}]:null,
  talk:()=>[
   {say:'저는 보안 전문가예요. 컴퓨터를 지켜요. 🔐'},
   Q.expert[0],Q.expert[1],
   {say:'신한은행은 2만 5천 명이 넘어요. 국민은행도 피해가 있었어요.'},
   {say:'요즘은 AI로 하는 해킹도 있다고 해요.'},
   Q.expert[2],Q.expert[3],
   {say:'금융위원회가 긴급 회의를 했어요. 모든 시스템을 점검해요.',award:['해킹','유출되다']}]},
 guide:{name:'해설사',zone:'village',x:20,y:15,dir:'down',look:P({hair:'#5A3A22',skin:'#F1C9A5',shirt:'#F6A5B8',pants:'#3A3A48',long:1}),badge:['공휴일','기념하다'],
  after:'한글날에 박물관에 놀러 오세요! 📜',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'한글 박물관에 어서 오세요! 📜'}]:null,
  talk:()=>[
   {say:'기자님, 한글 박물관에 어서 오세요! 📜'},
   {say:'다음 주 금요일, 10월 9일은 한글날이에요.'},
   Q.guide[0],Q.guide[1],
   {say:'세종대왕이 한글을 만들었어요. 그래서 한글날에 그걸 기억해요.'},
   Q.guide[2],Q.guide[3],Q.guide[4],
   {say:'공휴일에 박물관은 문을 열어요. 사람이 많을 거예요!',award:['공휴일','기념하다']}]},
};
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},
   'N':{tile:'stationWall'},'=':{tile:'wood',walk:1},'e':{tile:'desk',over:1},'m':{tile:'tvcam'},'x':{tile:'mark',walk:1},
   'K':{tile:'bankWall'},'V':{tile:'bigScreen'},'M':{tile:'museumWall'},'Q':{tile:'statue'},'_':{tile:'sand',walk:1},
   '~':{tile:'pond'},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTTTT",
"T........................T",
"T.NNNNNNNN.....KKKKKKKK..T",
"T.N======N.....KKKKKKKK..T",
"T.N=e=mx=N.....KKKKKKKK..T",
"T.N======N.....KKKKKKKK..T",
"T.NNN=NNNN.....KKKKKKKK..T",
"T....,.p...p.....,.p.....T",
"T....,,,,,,,,,,,,,,,,,,..T",
"T........~~~~............T",
"T..**....~~~~........**..T",
"T....,,,,,,,,,,,,,,,,,,..T",
"T..VVVVVV.......MMMMMMM..T",
"T..VVVVVV.......MMMMMMM..T",
"T..______.......MMMMMMM..T",
"T..______.........Q......T",
"T..______................T",
"T........................T",
"T........................T",
"TTTTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['editor','anchor','archer','gamer','fan','banker','grandma','expert','guide'],
  spots:{'11,7':KIT.sign('표지판','단어 마을 7편 · 한국 뉴스! 배지 열두 개를 모아요.'),
   '7,7':KIT.sign('표지판','서울 방송국 · 오늘의 한국 뉴스 📺'),
   '19,7':KIT.sign('표지판','은행 · 오늘은 보안 점검 중이에요. 🔒')},
  /* a line for every tile of a kind, picked by the faced tile's position (the old sayAt picked the same way) */
  things:{
   T:VILLAGE.TREES,
   e:'편집장 책상이에요. 오늘 뉴스 원고가 있어요. 📝',
   m:(x,y)=>({steps:[{say:state.stage===2?'카메라 앞 ✕ 표시에 서세요! 🎥':'방송 카메라예요. 🎥'}]}),
   N:['서울 방송국이에요. 📺','방송국 벽이에요. 안에서 "큐!" 소리가 나요.'],
   K:['은행이에요. 🏦 문 앞에 "보안 점검 중" 종이가 있어요.','은행 벽이에요. 경비원이 많아요. 🔒','창문 안에서 직원들이 바빠요.'],
   /* the old sayAt itself (the same line for the same tile): as a plain list, validate would reject "LoL" as English */
   V:VILLAGE.sayAt('큰 화면이에요! 아시안게임 경기가 나와요. 📺🏹','화면에 "금메달!" 글자가 나와요. 🥇','LoL 결승이에요! 관중들이 소리 질러요. 🎮'),
   M:['한글 박물관이에요. 📜','박물관 벽에 "ㄱ ㄴ ㄷ ㄹ" 이 있어요.','안에 옛날 책이 많아요.'],
   Q:'세종대왕 동상이에요. 한글을 만든 왕이에요. 👑',
   '~':['연못이에요. 한강은 아니에요. 😄','연못에 휴대폰이 빠졌어요! 개인정보는 안전해요… 아마도. 📱💦'],
  }},
};
const INTRO=['단어 마을 7편! 이번엔 한국 뉴스예요. 🇰🇷📰','당신은 다시 기자예요. 이번엔 서울 방송국이에요!','먼저 방송국에 가서 편집장을 만나요.'].map(say=>({say}));
const DONE=['축하해요! 배지 열두 개를 다 모았어요! 🎉','기자, 취재하다, 보도하다, 금메달, 결승, 연패, 개인정보, 보상하다, 해킹, 유출되다, 공휴일, 기념하다!','? 가 있는 사람한테 다시 말해 보세요. 한 번에 맞히면 ★ 예요.'];
const PERFECT=['★ 열두 개! 모든 단어가 완벽해요!','한국 뉴스 기자로 금메달이에요! 🥇'];
const TIPS=['<b>취재</b>(알아봐요) → <b>보도</b>(알려요)','금메달 1등 · 은메달 2등 · 동메달 3등 · <b>결승</b> = 마지막 경기','<b>연패</b> 두 개! 連霸 계속 이겨요 · 連敗 계속 져요','<b>유출되다</b>: 정보가 새어 나가요 · 해커가 <b>유출하다</b>','<b>보상하다</b>: 피해를 돈으로 갚아요','<b>공휴일</b>: 나라가 정한 쉬는 날 · 한글날 10월 9일','<b>기념하다</b> · 기념일 · 기념품'];
/* the news behind the chapter, listed on the 배지 sheet: [title, link, outlet] */
const NEWS=[['남자 양궁 단체전, 인도를 이기고 금메달','https://imnews.imbc.com/news/2026/sports/article/6855438_36946.html','MBC 뉴스'],
 ['리그 오브 레전드, 대만 3-0 · 아시안게임 2연패','https://www.newspim.com/news/view/20261002001017','뉴스핌'],
 ['신한·국민·하나·부산은행 해킹으로 정보 유출','https://www.seoul.co.kr/news/economy/finance/2026/10/02/20261002500271','서울신문'],
 ['한글날 (10월 9일)','https://ko.wikipedia.org/wiki/%ED%95%9C%EA%B8%80%EB%82%A0','위키백과']];
/* the task left, if any */
const quest=()=>{
 if(state.stage===0)return {text:'📺 서울 방송국에 가서 편집장을 만나요.'};
 if(state.stage===1){const n=done();return n<SOURCES.length?{text:`🎤 한국 뉴스를 취재해요! ${n}/${SOURCES.length}`}:{late:true,text:'📺 취재 끝! 방송국에 가서 편집장한테 말해요.'}}
 if(state.stage===2)return {late:true,text:'🎥 카메라 앞 ✕ 표시에 서세요. 방송 시작!'};
 return null;
};
const questText=()=>{const v=quest();return v?v.text:''};
const questLate=()=>{const v=quest();return !!(v&&v.late)};
/* the broadcast: stepping on the ✕ in front of the camera at stage 2 */
const onStep=()=>{
 if(state.stage!==2||player.x!==7||player.y!==4)return;
 held=null;player.dir='left';
 openDialog('감독',[
  {say:'기자님, 준비됐어요? 카메라를 보세요! 🎥'},
  Q.editor[3],Q.editor[4],
  {say:'좋아요! 셋, 둘, 하나… 큐! 🔴',award:['보도하다']},
  {who:'당신',say:'안녕하십니까, 한국 뉴스입니다.'},
  {who:'당신',say:'아이치·나고야 아시안게임에서 한국 남자 양궁 대표팀이 결승에서 인도를 이기고 금메달을 땄습니다.'},
  {who:'당신',say:'리그 오브 레전드 대표팀도 대만을 3 대 0으로 이기고 2연패를 했습니다.'},
  {who:'당신',say:'한편, 신한, 국민, 하나, 부산은행이 해킹을 당해 개인정보가 유출됐습니다. 은행은 피해를 보상하겠다고 했습니다.'},
  {who:'당신',say:'다음 주 10월 9일은 한글날입니다. 공휴일입니다. 지금까지 한국 뉴스였습니다!',set:go(3)},
  {who:'편집장',say:'완벽해요! 서울에서도 최고의 기자예요. 👏'}]);
};
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,SOURCES:NEWS,questText,questLate,onStep,afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES:VILLAGE.TILES};
}});
