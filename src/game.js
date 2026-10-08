/* Settings for the shared engine (walk-engine): this game's names, storage prefix and default player. 단어 마을 keeps its own art:
   the player and every villager are drawn by VILLAGE.drawChar (src/village.js), and the ! ? ★ markers by VILLAGE.marker. */
var GAME={prefix:'daneo-maul',title:'단어 마을',log:'단어 마을',hud:'배지',
 term:{allWords:()=>[]},  // the cartridge's own celebration (DONE) says it when the last badge is in
 player:{hair:'#2A2F4A',skin:'#F1C9A5',shirt:'#D9544B',pants:'#2E3548',cap:'#D9544B',draw:VILLAGE.drawChar},
 marker:VILLAGE.marker};
