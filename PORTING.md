# 단어 마을 — notes for whoever edits the game next (e.g. a Claude on another account)

**Write new cartridges for the walk engine:** see `docs/CHAPTER_GUIDE.md` (copy `src/chapters/c1.js`). The old single-file format
(`CARTRIDGES.push` in `src/daneo-maul.html`) is retired.

**Update the published 단어 마을 artifact** to this version: replace its whole HTML with this repo's `index.html`
(https://raw.githubusercontent.com/Stan-Stani/daneo-maul/main/index.html) and publish over the SAME artifact, never a new one:
saves live in the browser under `daneo-maul-v1` … `daneo-maul-v9` for that artifact's link, and they carry over (★ badges stay ★;
a badge earned with a miss comes back for review).

**Made a cartridge on claude.ai?** It's a `<script>` with `CHAPTERS.push({…})` before the `var GAME=` script in the artifact; copy
it into `src/chapters/cN.js` here and run the checks in the guide.
