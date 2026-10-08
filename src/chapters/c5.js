/* 5편 · 파고 뉴스 — every line, the map and the people as in the old cartridge; on the walk engine, with 단어 마을's own art
   (src/village.js) and kit (src/kit.js). Story: you are the TV station's new reporter. Interview six people about this week's real
   Fargo news (Oct 6 2026 special election, Carol Widman's Candy changing hands, new south Fargo Chick-fil-A opening Oct 8, library
   "Northern Focus 2026" photo exhibit, police street-racing crackdown), then go back and broadcast.
   state.stage: 0 start · 1 reporter (interviewing) · 2 stand on the ✕ in front of the camera · 3 broadcast done */
CHAPTERS.push({id:'c5',n:'5편',title:'파고 뉴스',place:'기자 · 보도하다 · 선거 · 투표하다 · 찬성하다 · 은퇴하다 · 물려받다 · 개업하다 · 일자리 · 전시회 · 무료 · 단속하다',words:12,save:'daneo-maul-v5',color:'#D9544B',
 start:{zone:'village',x:10,y:8,dir:'down'},introWho:'안내',
 migrate:KIT.migrate({stage:0}),  // old saves carry over
 make:()=>{
const P=KIT.person;
/* the six people to interview, and how many of them you have (all their badges) */
const SOURCES=['official','voterA','candy','chicken','librarian','police'];
const done=()=>SOURCES.filter(k=>NPC[k].badge.every(has)).length;
const go=n=>()=>{state.stage=n};
/* the news behind it (listed in the 배지 sheet) */
const NEWS=[['10월 6일 파고 특별 선거: 시 정부를 바꿀까요?','https://fargond.gov/city-government/departments/auditors/licensing-department/elections/2026-city-of-fargo-special-election','City of Fargo'],
 ['파고 시민들이 시 정부 개편을 투표로 정해요','https://www.valleynewslive.com/2026/09/21/fargo-voters-decide-whether-overhaul-city-government/','Valley News Live'],
 ['캐럴 위드먼 은퇴, 조카가 사탕 가게를 물려받아요','https://www.kvrr.com/news/local/carol-widman-retires-nephew-takes-over-fargos-family-candy-business/article_58db83a7-929c-46a8-87b8-8bb91848899b.html','KVRR'],
 ['남쪽 파고 새 칙필레, 10월 8일 개업 · 소 옷 이벤트','https://www.valleynewslive.com/2026/10/01/new-fargo-chick-fil-a-hosting-opening-day-moove-in-party/','Valley News Live'],
 ['도서관 사진 전시회 「노던 포커스 2026」','https://fargond.gov/city-government/departments/library/teens/northern-narratives-northern-focus','Fargo Public Library'],
 ['파고 경찰, 도로 경주 단속을 늘려요','https://kfgo.com/2026/09/21/fargo-police-ramp-up-enforcement-against-street-racing-and-dangerous-driving/','KFGO']];
const WORDS=['기자','보도하다','선거','투표하다','찬성하다','은퇴하다','물려받다','개업하다','일자리','전시회','무료','단속하다'];
const DICT={
 '기자':{k:'뉴스를 쓰는 사람.',e:'reporter',ex:'뉴스를 취재하고 기사를 쓰는 사람은 기자예요.'},
 '보도하다':{k:'신문이나 방송으로 뉴스를 알려요. 報道.',e:'to report (news)',ex:'뉴스로 사람들한테 소식을 알려요. 뉴스를 보도해요.'},
 '선거':{k:'투표로 사람을 뽑는 일.',e:'election',ex:'사람들이 대표를 뽑거나 중요한 일을 정해요. 그건 선거예요.'},
 '투표하다':{k:'선거에서 표를 내요.',e:'to vote',ex:'종이에 찬성이나 반대를 표시해서 넣어요. 사람들이 투표해요.'},
 '찬성하다':{k:'어떤 생각이 좋다고 해요. 반대: 반대하다.',e:'to be in favor',ex:'어떤 생각이 좋아서 "네, 그렇게 해요!" 해요. 그 생각에 찬성해요.'},
 '은퇴하다':{k:'나이가 들어서 일을 그만두고 쉬어요.',e:'to retire',ex:'오래 일했어요. 이제 일을 그만두고 쉬어요. 은퇴해요.'},
 '물려받다':{k:'윗사람이 주는 것을 받아서 이어 가요.',e:'to take over, inherit',ex:'고모의 가게를 이제 제가 받아서 해요. 가게를 물려받아요.'},
 '개업하다':{k:'가게나 회사를 새로 열어요.',e:'to open (a business)',ex:'새 가게가 처음으로 문을 열어요. 가게가 개업해요.'},
 '일자리':{k:'일할 수 있는 자리. 직장.',e:'job',ex:'이 가게에서 사람 100명쯤 일해요. 일자리가 100개쯤 생겨요.'},
 '전시회':{k:'그림이나 사진을 걸어 놓고 보여 주는 행사.',e:'exhibition',ex:'사진이나 그림을 걸어 놓아요. 사람들이 보러 와요. 그건 전시회예요.'},
 '무료':{k:'돈을 안 내요. 반대: 유료.',e:'free (no cost)',ex:'돈을 안 내도 돼요. 그건 무료예요.'},
 '단속하다':{k:'나쁜 일을 못 하게 막아요.',e:'to crack down',ex:'경찰이 규칙을 안 지키는 사람을 찾아서 막아요. 경찰이 단속해요.'},
};
const CONFUSE={};
/* every question, by who asks it, so review can reuse them (the talks and the broadcast ask these same objects).
   gram:1 = it tests something else (다르다, 번호판): asked in the conversation as before, but review asks the word's own questions */
const Q={
 editor:[
  {w:'기자',ask:'뉴스를 취재하고 기사를 쓰는 사람은 ___예요.',opts:[['기자',1],['관중',0,'관중은 보는 사람이에요. 뉴스를 쓰는 사람 → "기자".'],['관장',0,'관장은 체육관 대장이에요. 뉴스를 쓰는 사람 → "기자".']]},
  {w:'기자',ask:'기자는 어떤 질문을 많이 해요?',opts:[['누가, 언제, 어디서, 무엇을, 왜, 어떻게?',1],['배고파요? 졸려요?',0,'😄 그건 친구 질문이에요. 기자는 "누가, 언제, 어디서, 무엇을, 왜, 어떻게?"']]},
  {w:'보도하다',ask:'뉴스로 사람들한테 소식을 알려요. 뉴스를 ___.',opts:[['보도해요',1],['단속해요',0,'단속은 경찰이 해요. 뉴스로 알려요 → "보도해요".'],['은퇴해요',0,'은퇴는 일을 그만둬요. 뉴스로 알려요 → "보도해요".']]},
  {w:'보도하다',ask:'"보도"는 뜻이 두 개예요. 뉴스(報道), 그리고 사람이 걷는 길(步道). "보도로 걸어요"는?',opts:[['길로 걸어요.',1],['뉴스로 걸어요.',0,'😄 뉴스 위로는 못 걸어요! 걷는 "보도"는 사람이 다니는 길이에요.']]}],
 official:[
  {w:'선거',ask:'사람들이 대표를 뽑거나 중요한 일을 정해요. 그건 ___예요.',opts:[['선거',1],['시합',0,'시합은 운동으로 겨뤄요. 대표를 뽑아요 → "선거".'],['전시회',0,'전시회는 그림이나 사진을 봐요. 대표를 뽑아요 → "선거".']]},
  {w:'투표하다',ask:'종이에 찬성이나 반대를 표시해서 넣어요. 사람들이 ___.',opts:[['투표해요',1],['보도해요',0,'보도는 뉴스로 알려요. 종이에 표시해서 넣어요 → "투표해요".'],['개업해요',0,'개업은 가게를 새로 열어요. 종이에 표시해서 넣어요 → "투표해요".']]},
  {w:'투표하다',ask:'투표는 어디서 해요?',opts:[['파고돔, 시민 센터, 교회 한 곳',1],['사탕 가게',0,'😄 사탕 가게에서는 초콜릿을 사요. 투표는 파고돔, 시민 센터, 교회 한 곳이에요.']]},
  {w:'선거',ask:'선거 날 투표 시간은 언제예요?',opts:[['아침 7시부터 저녁 7시까지',1],['밤 12시부터 아침 7시까지',0,'밤에는 다 자요! 아침 7시부터 저녁 7시까지예요.']]}],
 voterA:[
  {w:'찬성하다',ask:'어떤 생각이 좋아서 "네, 그렇게 해요!" 해요. 그 생각에 ___.',opts:[['찬성해요',1],['반대해요',0,'반대는 "아니요!"예요. "네!" → "찬성해요".']]},
  {w:'찬성하다',ask:'"찬성"의 반대말은 뭐예요?',opts:[['반대',1],['무료',0,'무료는 돈을 안 내요. 찬성 ↔ "반대".']]},
  {w:'찬성하다',gram:1,ask:'저는 찬성해요. 저 사람은 반대해요. 우리 생각이 ___.',opts:[['달라요',1],['같아요',0,'찬성 하나, 반대 하나. 생각이 "달라요".']]}],
 candy:[
  {w:'은퇴하다',ask:'오래 일했어요. 이제 일을 그만두고 쉬어요. ___.',opts:[['은퇴해요',1],['개업해요',0,'개업은 가게를 새로 열어요. 일을 그만둬요 → "은퇴해요".'],['투표해요',0,'투표는 선거에서 해요. 일을 그만둬요 → "은퇴해요".']]},
  {w:'물려받다',ask:'고모의 가게를 이제 제가 받아서 해요. 가게를 ___.',opts:[['물려받아요',1],['빌려요',0,'빌리면 다시 돌려줘야 돼요! 계속 제 가게 → "물려받아요".']]},
  {w:'물려받다',ask:'"물려받다"의 반대말은 뭐예요?',opts:[['물려주다',1],['돌려주다',0,'돌려주다는 빌린 걸 다시 줘요. 물려받다 ↔ "물려주다".']]},
  {w:'물려받다',ask:'이 가게의 "치퍼"는 뭐예요?',opts:[['초콜릿을 입힌 감자칩',1],['초콜릿 아이스크림',0,'아이스크림이 아니에요! 감자칩에 초콜릿을 하나씩 입혀요.']]}],
 chicken:[
  {w:'개업하다',ask:'새 가게가 처음으로 문을 열어요. 가게가 ___.',opts:[['개업해요',1],['은퇴해요',0,'은퇴는 사람이 일을 그만둬요. 새 가게가 문을 열어요 → "개업해요".'],['반납해요',0,'반납은 도서관에 책을 돌려줘요. 새 가게가 문을 열어요 → "개업해요".']]},
  {w:'개업하다',ask:'이 가게는 언제 개업해요?',opts:[['10월 8일 목요일 아침',1],['10월 6일 화요일',0,'10월 6일은 선거 날이에요! 개업은 10월 8일 목요일이에요.']]},
  {w:'일자리',ask:'이 가게에서 사람 100명쯤 일해요. ___가 100개쯤 생겨요.',opts:[['일자리',1],['전시회',0,'전시회는 사진이나 그림을 봐요. 일하는 자리 → "일자리".'],['선거',0,'선거는 대표를 뽑아요. 일하는 자리 → "일자리".']]},
  {w:'일자리',ask:'"일자리를 찾아요"는 무슨 뜻이에요?',opts:[['일할 곳을 찾아요.',1],['앉을 의자를 찾아요.',0,'"자리"는 의자 뜻도 있어요. 그런데 "일자리"는 일할 곳이에요.']]}],
 librarian:[
  {w:'전시회',ask:'사진이나 그림을 걸어 놓아요. 사람들이 보러 와요. 그건 ___예요.',opts:[['전시회',1],['선거',0,'선거는 대표를 뽑아요. 사진을 걸어 놓아요 → "전시회".'],['일자리',0,'일자리는 일하는 곳이에요. 사진을 걸어 놓아요 → "전시회".']]},
  {w:'전시회',ask:'사진 전시회는 언제까지예요?',opts:[['10월 31일까지',1],['10월 6일까지',0,'10월 6일은 선거 날이에요. 전시회는 10월 31일까지예요.']]},
  {w:'무료',ask:'돈을 안 내도 돼요. 그건 ___예요.',opts:[['무료',1],['유료',0,'유료는 돈을 내요. 돈을 안 내요 → "무료".'],['일자리',0,'일자리는 돈을 받는 일이에요! 돈을 안 내요 → "무료".']]},
  {w:'무료',ask:'"무료"의 반대말은 뭐예요?',opts:[['유료',1],['찬성',0,'찬성 ↔ 반대. 무료 ↔ "유료".']]}],
 police:[
  {w:'단속하다',ask:'경찰이 규칙을 안 지키는 사람을 찾아서 막아요. 경찰이 ___.',opts:[['단속해요',1],['보도해요',0,'보도는 기자가 해요. 규칙을 안 지키는 사람을 막아요 → "단속해요".'],['은퇴해요',0,'은퇴는 일을 그만둬요. 막아요 → "단속해요".']]},
  {w:'단속하다',ask:'"과속 단속"은 무슨 뜻이에요?',opts:[['너무 빨리 달리는 차를 단속해요.',1],['너무 천천히 걷는 사람을 단속해요.',0,'과속은 "너무 빠른 속도"예요. 빨리 달리는 차를 단속해요.']]},
  {w:'단속하다',gram:1,ask:'경찰은 번호판을 읽는 카메라도 써요. 번호판은 어디에 있어요?',opts:[['차 앞하고 뒤',1],['사람 머리 위',0,'😄 번호판은 차에 있어요. 차 앞하고 뒤!']]}],
};
const EDIT=Q.editor;
const NPC={
 editor:{name:'편집장',zone:'village',x:4,y:3,dir:'down',still:1,fixed:1,look:P({hair:'#6B6B70',skin:'#F1C9A5',shirt:'#3D5A80',pants:'#2E3548'}),badge:['기자','보도하다'],
  after:'좋은 기사 고마워요. 다음 뉴스도 부탁해요! 📰',
  status:()=>(state.stage===1&&done()<SOURCES.length)||state.stage===2?'wait':undefined,
  talk:()=>[],
  script:()=>{
   if(state.stage===0)return [
    {say:'어서 와요! 여기는 파고 방송국이에요. 📺'},
    {say:'오늘부터 당신은 우리 방송국 기자예요!'},
    EDIT[0],EDIT[1],
    {say:'좋아요! 기자증을 받으세요. 🪪',award:['기자'],set:go(1)},
    {say:'이번 주 파고 뉴스가 많아요. 마을 사람들을 취재해 오세요!'},
    {say:'선거 관리원, 주민, 사탕 가게, 치킨 가게, 도서관, 경찰. 여섯 명이에요.'}];
   if(state.stage===1&&done()<SOURCES.length)return [{say:`아직 취재 중이에요? 지금 ${done()}명 했어요. 여섯 명 다 만나 보세요!`}];
   if(state.stage===1)return [
    {say:'다 취재했어요? 수고했어요!'},
    {say:'이제 뉴스를 보도할 시간이에요. 카메라 앞 ✕ 표시에 서세요! 🎥',set:go(2)}];
   if(state.stage===2)return [{say:'카메라 앞 ✕ 표시에 서세요! 방송 시작해요. 🎥'}];
   return null;
  }},
 anchor:{name:'앵커',zone:'village',x:7,y:3,dir:'down',look:P({hair:'#2B1E1A',skin:'#F3D0B0',shirt:'#D9544B',pants:'#2E3548',long:1}),
  talk:()=>[{say:'저는 앵커예요. 카메라 앞에서 뉴스를 읽어요. 🎙️'},{say:'기자가 취재하고, 저는 보도해요. 우리는 한 팀이에요!'}]},
 official:{name:'선거 관리원',zone:'village',x:18,y:7,dir:'down',look:P({hair:'#1E1E24',skin:'#E3B48C',shirt:'#5B8BD9',pants:'#2E3548'}),badge:['선거','투표하다'],
  after:'10월 6일에 투표하세요! 신분증 꼭 가져오세요. 🗳️',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>{
   if(state.stage===0)return [{say:'안녕하세요! 기자예요? 아니에요? 그럼 방송국에 먼저 가 보세요.'}];
   return null;
  },
  talk:()=>[
   {say:'안녕하세요, 기자님! 저는 선거 관리원이에요. 🗳️'},
   {say:'10월 6일 화요일에 파고에서 특별 선거가 있어요.'},
   Q.official[0],
   {say:'이번 선거는 시 정부를 바꿀지 정해요.'},
   {say:'지금은 위원 다섯 명이 시를 이끌어요. 바뀌면 여섯 구에서 의원을 한 명씩 뽑아요. 시장은 시민 모두가 뽑아요.'},
   Q.official[1],Q.official[2],Q.official[3],
   {say:'투표하려면 파고에 30일 넘게 살았어야 돼요. 신분증도 가져와요!',award:['선거','투표하다']}]},
 voterA:{name:'주민',zone:'village',x:15,y:9,dir:'down',look:P({hair:'#3B2A22',skin:'#D9A47A',shirt:'#3FA86B',pants:'#3A3F55'}),badge:['찬성하다'],
  after:'기자님, 양쪽 이야기를 다 들어 주세요! 🙂',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'선거 이야기요? 기자님한테만 말할 거예요. 😄'}]:null,
  talk:()=>[
   {say:'안녕하세요! 저는 정부를 바꾸는 것에 찬성해요.'},
   {say:'구마다 의원이 있으면 시민 목소리가 시청에 더 가까워져요.'},
   ...Q.voterA,
   {say:'옆 사람은 반대해요. 그 이야기도 들어 보세요. 기자는 중립적이어야 돼요!',award:['찬성하다']}]},
 voterB:{name:'주민',zone:'village',x:17,y:9,dir:'down',look:P({hair:'#E0C070',skin:'#F1C9A5',shirt:'#8E7CC3',pants:'#3A3F55',long:1}),
  talk:()=>[
   {say:'저는 반대해요. 의원들이 자기 구만 생각할까 봐 걱정돼요.'},
   {say:'그리고 특별 선거는 돈이 많이 들어요. 10만 달러가 넘어요.'},
   {say:'찬성도 있고 반대도 있어요. 결정은 시민들이 투표로 해요.'}]},
 candy:{name:'사탕 가게 사장',zone:'village',x:4,y:15,dir:'down',look:P({hair:'#5A3A22',skin:'#F1C9A5',shirt:'#F6A5B8',pants:'#3A3A48'}),badge:['은퇴하다','물려받다'],
  after:'치퍼 하나 드실래요? 맛은 그대로예요! 🍫',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'어서 오세요! 초콜릿 냄새 좋죠? 🍫'}]:null,
  talk:()=>[
   {say:'안녕하세요, 기자님! 여기는 캐럴 위드먼 사탕 가게예요. 🍫'},
   {say:'저는 션이에요. 캐럴 고모의 조카예요.'},
   {say:'고모하고 고모부가 34년 동안 이 가게를 했어요.'},
   ...Q.candy,
   {say:'레시피는 거의 그대로예요. 걱정하지 마세요! 😊',award:['은퇴하다','물려받다']}]},
 chicken:{name:'점장',zone:'village',x:12,y:15,dir:'down',look:P({hair:'#2A2F4A',skin:'#F1C9A5',shirt:'#D9544B',pants:'#2E3548',cap:'#D9544B'}),badge:['개업하다','일자리'],
  after:'개업하는 날 소 옷 입고 오세요! 🐄',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'아직 준비 중이에요. 곧 문을 열어요! 🐔'}]:null,
  talk:()=>[
   {say:'안녕하세요, 기자님! 저는 새 칙필레 점장이에요. 🐔'},
   {say:'남쪽 파고, 55번가에 새 가게를 열어요.'},
   ...Q.chicken,
   {say:'개업하는 날 소 옷을 입고 오면 음식 하나가 무료예요! 🐄',award:['개업하다','일자리']}]},
 cow:{name:'손님',zone:'village',x:14,y:15,dir:'left',still:1,fixed:1,look:P({hair:'#1F1F1F',skin:'#F3D0B0',shirt:'stripe',pants:'#F4F4F4'}),
  talk:()=>[{say:'저는 벌써 소 옷을 샀어요. 음메~ 🐄'},{say:'10월 8일 아침에 제일 먼저 올 거예요!'}]},
 librarian:{name:'사서',zone:'village',x:20,y:15,dir:'down',look:P({hair:'#3B2A22',skin:'#F3D0B0',shirt:'#5BB5A8',pants:'#3A3F55',long:1}),badge:['전시회','무료'],
  after:'사진 전시회 꼭 보러 오세요! 📷',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'도서관에 어서 오세요! 📚'}]:null,
  talk:()=>[
   {say:'안녕하세요, 기자님! 도서관에 어서 오세요. 📚'},
   {say:'지금 시내 중앙 도서관에서 사진 전시회를 해요. 이름은 "노던 포커스 2026"이에요.'},
   ...Q.librarian,
   {say:'9살 이하 어린이는 어른하고 같이 와야 돼요.',award:['전시회','무료']}]},
 police:{name:'경찰관',zone:'village',x:21,y:10,dir:'left',look:P({hair:'#1E1E24',skin:'#E8B98F',shirt:'#2E3548',pants:'#2E3548',cap:'#2E3548'}),badge:['단속하다'],
  after:'천천히, 안전하게 운전하세요! 🚓',
  status:()=>state.stage===0?'wait':undefined,
  script:()=>state.stage===0?[{say:'안녕하세요. 파고 경찰이에요. 🚓'}]:null,
  talk:()=>[
   {say:'안녕하세요, 기자님. 파고 경찰이에요. 🚓'},
   {say:'요즘 길에서 차로 경주하는 사람들이 있어요. 아주 위험해요.'},
   ...Q.police,
   {say:'천천히, 안전하게 운전하세요!',award:['단속하다']}]},
};
const sign=t=>KIT.sign('표지판',t);
const ZONES={
 village:{name:'단어 마을',reg:'단어 마을',outdoor:true,
  /* map legend: character → tile drawing; walk = can step on it */
  legend:{'.':{tile:'grass',walk:1},',':{tile:'path',walk:1},'*':{tile:'flowers',walk:1},'T':{tile:'tree'},
   'N':{tile:'stationWall'},'=':{tile:'wood',walk:1},'e':{tile:'desk',over:1},'m':{tile:'tvcam'},'x':{tile:'mark',walk:1},
   'O':{tile:'domeWall'},'v':{tile:'domeDoor'},'C':{tile:'candyWall'},'K':{tile:'chickenWall'},'L':{tile:'libWall'},
   '~':{tile:'pond'},'p':{tile:'sign'}},
  map:[
"TTTTTTTTTTTTTTTTTTTTTTTTTT",
"T........................T",
"T.NNNNNNNN....OOOOOOOOO..T",
"T.N======N....OOOOOOOOO..T",
"T.N=e=mx=N....OOOOOOOOO..T",
"T.N======N....OOOOOOOOO..T",
"T.NNN=NNNN....OOOOvOOOO..T",
"T....,.p...p....p........T",
"T....,,,,,,,,,,,,,,,,,,..T",
"T........~~~~~...........T",
"T..**....~~~~~.......**..T",
"T....,,,,,,,,,,,,,,,,,,..T",
"T.CCCCC...KKKKKK..LLLLLL.T",
"T.CCCCC...KKKKKK..LLLLLL.T",
"T.CCCCC...KKKKKK..LLLLLL.T",
"T........................T",
"T..**................**..T",
"T........................T",
"T........................T",
"TTTTTTTTTTTTTTTTTTTTTTTTTT"],
  npcs:['editor','anchor','official','voterA','voterB','candy','chicken','cow','librarian','police'],
  spots:{'11,7':sign('단어 마을 5편 · 파고 뉴스! 배지 열두 개를 모아요.'),'7,7':sign('파고 방송국 · 오늘의 파고 뉴스 📺'),
   '16,7':sign('파고돔 · 10월 6일 특별 선거 투표소 🗳️')},
  /* a line for every tile of a kind: a list is picked by the faced tile's position (as the old sayAt did) */
  things:{
   T:VILLAGE.TREES,
   e:'편집장 책상이에요. 오늘 뉴스 원고가 있어요. 📝',
   m:()=>({steps:[{say:state.stage===2?'카메라 앞 ✕ 표시에 서세요! 🎥':'방송 카메라예요. 🎥 뉴스를 보도할 때 써요.'}]}),
   N:'파고 방송국이에요. 📺',
   O:'파고돔이에요. 10월 6일에 여기서 투표해요. 🗳️',
   v:'파고돔 문이에요. 선거 날 아침 7시에 열어요.',
   C:'캐럴 위드먼 사탕 가게예요. 🍫 초콜릿 냄새가 나요!',
   K:'새 치킨 가게예요. 10월 8일에 개업해요! 🐔',
   L:'도서관이에요. 사진 전시회를 해요. 📷',
   '~':['연못이에요. 레드강은 아니에요. 😄','레드강보다 아주 작아요. 봄에 홍수 걱정은 없어요! 🌊'],
   '*':'꽃 위에 벌레가 많아요. 🐞 가을이 오니까 벌레들도 바빠요.',
  }},
};
const INTRO=['단어 마을 5편! 오늘은 진짜 파고 뉴스예요. 📰','당신은 파고 방송국의 새 기자예요. 먼저 방송국에 가 보세요.','! 가 있는 사람한테 배지가 있어요. 한 번에 다 맞히면 ★ 예요.'].map(say=>({say}));
const DONE=['축하해요! 배지 열두 개를 다 모았어요! 🎉','기자, 보도하다, 선거, 투표하다, 찬성하다, 은퇴하다, 물려받다, 개업하다, 일자리, 전시회, 무료, 단속하다!','? 가 있는 사람한테 다시 말해 보세요. 한 번에 맞히면 ★ 예요.'];
const PERFECT=['★ 열두 개! 모든 단어가 완벽해요!','지금까지 파고 뉴스였습니다. 감사합니다! 📺'];
const TIPS=['<b>기자</b>가 취재해요 → 뉴스로 <b>보도해요</b>','<b>찬성</b> ↔ <b>반대</b> · <b>무료</b> ↔ <b>유료</b>','<b>개업하다</b>: 가게를 새로 열어요 · <b>은퇴하다</b>: 일을 그만둬요','<b>물려받다</b> ↔ <b>물려주다</b> · 빌리다 ↔ 돌려주다','<b>보도</b>(報道): 뉴스 · <b>보도</b>(步道): 걷는 길','선거에서 <b>투표해요</b> · 경찰이 과속을 <b>단속해요</b>'];
/* the 목표 line, by story stage (late once the interviews are done, until the broadcast) */
const quest=()=>{
 if(state.stage===0)return {text:'📺 파고 방송국에 가서 편집장을 만나요.'};
 if(state.stage===1){const n=done();return n<SOURCES.length?{text:`🎤 마을 사람들을 취재해요! ${n}/${SOURCES.length}`}:{late:true,text:'📺 취재 끝! 방송국에 가서 편집장한테 말해요.'}}
 if(state.stage===2)return {late:true,text:'🎥 카메라 앞 ✕ 표시에 서세요. 방송 시작!'};
 return null;
};
const questText=()=>{const v=quest();return v?v.text:''};
const questLate=()=>{const v=quest();return !!(v&&v.late)};
/* the broadcast starts when you step onto the ✕ in front of the camera */
const onStep=()=>{
 if(state.stage!==2||player.x!==7||player.y!==4)return;
 held=null;player.dir='left';
 openDialog('감독',[
  {say:'기자님, 준비됐어요? 카메라를 보세요! 🎥'},
  EDIT[2],EDIT[3],
  {say:'좋아요! 셋, 둘, 하나… 큐! 🔴',award:['보도하다']},
  {who:'당신',say:'안녕하십니까, 파고 뉴스입니다. 이번 주 소식을 전해 드립니다.'},
  {who:'당신',say:'10월 6일, 파고에서 특별 선거가 있습니다. 시 정부를 바꿀지 투표합니다.'},
  {who:'당신',say:'캐럴 위드먼 사탕 가게는 조카가 물려받았습니다. 치퍼 맛은 그대로입니다.'},
  {who:'당신',say:'10월 8일, 남쪽 파고에 새 치킨 가게가 개업합니다. 일자리가 100개쯤 생깁니다.'},
  {who:'당신',say:'지금까지 파고 뉴스였습니다. 감사합니다!',set:go(3)},
  {who:'편집장',say:'완벽해요! 진짜 기자 같아요. 👏'}]);
};
return {WORDS,DICT,CONFUSE,Q,ITEMS:{},ZONES,NPC,FOLLOW:null,INTRO,DONE,TIPS,SOURCES:NEWS,questText,questLate,onStep,afterTalk:KIT.ending({quest,perfect:PERFECT}),TILES:VILLAGE.TILES};
}});
