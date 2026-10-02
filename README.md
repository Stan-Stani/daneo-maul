# 단어 마을

A tiny Pokémon-style Korean vocabulary village: walk around, talk to people, answer in Korean, earn badges.
Three cartridges: 1편 경기장과 도장 · 2편 도서관과 카페 · 3편 연구소와 포켓몬 센터 — each keeps its own save.

**Play:** https://stan-stani.github.io/daneo-maul/ (built for phones; arrow keys + Z/X on a keyboard)

- Starts at 1편 (then remembers the last cartridge); finishing one opens the menu on the next.
- 대화 button: scroll back through every line (words tappable there too).
- Tap any Korean word in a dialogue line for a simple Korean definition; English is behind the **?** button
  (in the badge sheet too).
- Sister games with the same dictionary: [성실호](https://github.com/Stan-Stani/seongsilho) · [형제](https://github.com/Stan-Stani/hyeongje)

## Files
- `src/daneo-maul.html` — the game (cartridges are `CARTRIDGES.push({...})` blocks; the engine is the last script).
- `lexicon/extract.py` — maps every word in the game's dialogue to its dictionary form(s) with the Kiwi analyzer → `src/lexicon-map.json`.
- `lexicon/defs.json` — learner definitions shared with 성실호 and 형제.
- `build.py` — writes `index.html` = the game + the dictionary. `node tests/play.mjs` taps words in headless Chrome.

See `PORTING.md` for adding a cartridge or porting the tap-a-word feature to another copy of the game.
