# 단어 마을 — notes for whoever edits the game next (e.g. a Claude on another account)

**Update an existing 단어 마을 artifact** to this version: replace its whole HTML with
https://raw.githubusercontent.com/Stan-Stani/daneo-maul/main/index.html
(saves live in localStorage under `daneo-maul-v1/v2/v3` (old misspelled `danemaul-…` saves are copied over on first load), so progress carries over
only where the artifact keeps the same origin/link; publish over the SAME artifact, don't create a new one).

**Everything else in the current version** (replacing the HTML brings all of it):
- Starts on 1편 and remembers the last cartridge. Finishing a cartridge offers the next one (`openMenu(suggest)`), and the 편 button looks like a cartridge.
- The star and level rules are explained once; after that, only short toasts.
- A one-time tutorial: the first tappable word pulses with 눌러 보세요, and the ? pulses until it has been used once.
- 대화 log: every dialogue line, scrollable, with tappable words. It's saved per cartridge under `<save key>-talk` (`loadTalk`, `closeTalk`).
- **Characters keep 단어 마을's own simpler style.** The port didn't change how anything is drawn. Don't bring in 성실호's pixel-art sprite system.

**How tap-a-word works** (all in `src/daneo-maul.html`, search for "tap a word"):
- `wordsHTML(text)` wraps every Hangul run in `<span class="w">` once a line finishes typing (`typeText` → `fin`).
- Clicking a `.w` calls `showWord(word)` → `lexLookup(word)` → popup (`#gloss`) with the dictionary form + Korean
  definition; the **?** button reveals English. Tapping elsewhere in the text box still advances; B closes the popup.
- `window.LEX = {map:{word-as-written:[lemma…]}, defs:{lemma:{k:Korean, e:English}}}` is injected by `build.py`.
- Words not in `map` fall back to the longest known prefix (상대가 → 상대), so new cartridges work partly without a rebuild.
- Badge sheet: English (`.bd .m`) is hidden until the **?** next to 배지 is pressed.

**Adding a cartridge** (new 4편 etc.):
1. Add its `CARTRIDGES.push({...})` script block to `src/daneo-maul.html` (before the engine script), new `save` key.
2. `pip install kiwipiepy` then `python3 lexicon/extract.py .` — it lists words with no definition in `src/lexicon-missing.txt`
   (lemma, word, example sentence).
3. Add entries for those lemmas to `lexicon/defs.json`: `"lemma": {"k": "easy Korean, ≤30 chars", "e": "English"}`
   (null for analyzer noise). Keep definitions TOPIK-1–3 simple.
4. `python3 build.py` → `index.html`. Optionally `node tests/play.mjs` (needs headless Chrome) to check taps.
If you can't run Python, skip 2–3: the prefix fallback still covers many words, and the 성실호 dictionary is large.
