# Termo local Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Replace the quiz with a local, Portuguese five-letter word game with six attempts.

**Architecture:** Keep the app static and split it into `index.html`, `style.css`, and `script.js`. One curated list in `script.js` supplies both valid guesses and random answers; shared input handlers serve physical and virtual keyboards. Score exact letters first, then misplaced letters using remaining letter counts.

**Tech Stack:** HTML, CSS, vanilla JavaScript; Playwright Chromium for browser verification only. No Node runtime, package manifest, server, or dependency in the app.

**Spec:** `docs/superpowers/specs/2026-11-09-termo-local-design.md`

## Global Constraints

- Keep the game local and directly openable in Chromium.
- Use exactly six rows of five letters.
- Use one list for both guess validation and answer selection.
- Use green for exact matches, amber/yellow for misplaced matches, and gray for absent letters.
- Separate markup, styles, and behavior into `index.html`, `style.css`, and `script.js`.
- Do not add a Node runtime, project dependencies, a server, or a backend.
- Create a distinct light sand/navy visual identity; do not copy Termo's design.

## Review Focus

- Incomplete or out-of-list guesses must not consume an attempt; test that the active row stays unchanged.
- Duplicate letters must not receive excess yellow feedback; test `SERRA` against `SARAR` and assert states `correct, present, correct, absent, present`.
- Physical and virtual keys must update the same current guess; test typing, backspace, and Enter through both paths.
- Won/lost games must reject further input and restart cleanly; test a win, six wrong valid guesses, post-game input, and restart.
- Direct-file loading must work without network requests; test no console errors, no horizontal overflow, and square tiles at 375px.

---

### Task 1: Create the static game shell

**Files:**
- Modify: `index.html`
- Create: `style.css`
- Create: `script.js`
- Test: `/tmp/opencode/termo-local.check.cjs` (temporary Playwright harness; not part of the project)

**Interfaces:**
- `index.html` provides `#board`, `#keyboard`, `#game-message`, and `#new-game`.
- `script.js` renders six `.guess-row` elements with five `.tile` elements each and the virtual keyboard.
- Submitted tiles expose `data-state="correct|present|absent"`; `#board` exposes `data-active-row` for browser checks.

- [ ] **Step 1: Write a failing browser check**

  In the temporary harness, open `index.html` as a `file://` URL and assert the game title, six rows, five cells per row, keyboard controls, status region, and external `style.css`/`script.js` loading.

- [ ] **Step 2: Run the check and confirm it fails on the existing quiz**

  Run: `npx --yes --package=playwright -c 'NODE_PATH="$(dirname "$(dirname "$(command -v playwright)")")" node /tmp/opencode/termo-local.check.cjs'`

  Expected: FAIL because the quiz does not expose the Termo board or keyboard.

- [ ] **Step 3: Replace the quiz markup and inline assets**

  Keep `lang="pt-BR"`, add semantic game instructions, board, status live region and restart button, and link `style.css` plus deferred `script.js`. Remove the quiz, inline CSS, and inline JavaScript. Render the six-by-five board and virtual keyboard from `script.js`; add basic container layout but leave tile sizing and responsive rules for Task 3.

- [ ] **Step 4: Run the browser check**

  Run the same command.

  Expected: PASS; page loads directly, all rows/cells and controls exist, and assets load locally.

### Task 2: Implement dictionary, feedback, and game flow

**Files:**
- Modify: `script.js`
- Test: `/tmp/opencode/termo-local.check.cjs`

**Interfaces:**
- `WORDS`: uppercase five-letter Portuguese words without accents; the first word is `SERRA` and the list includes `SARAR`, `AREIA`, `AVISO`, `BEIJO`, `BOLSA`, `CAMPO`, and `CHUVA` for deterministic checks.
- `evaluateGuess(guess, answer)`: returns five states (`correct`, `present`, or `absent`) using exact matches first and remaining letter counts second.
- `addLetter(letter)`, `removeLetter()`, `submitGuess()`, and `startGame()` are shared by physical/virtual keyboard events and restart.

- [ ] **Step 1: Add failing browser checks for gameplay**

  Force `Math.random()` to return `0` before loading so `SERRA` is the answer. Assert incomplete and `ZZZZZ` guesses leave `data-active-row` unchanged; `SARAR` produces `correct, present, correct, absent, present`; both keyboard paths support letters/backspace/Enter, including interleaved virtual and physical input; a correct answer ends the game; six valid incorrect answers reveal the answer; input after the end is ignored; restart clears the board.

- [ ] **Step 2: Run the gameplay checks and confirm they fail**

  Run: `npx --yes --package=playwright -c 'NODE_PATH="$(dirname "$(dirname "$(command -v playwright)")")" node /tmp/opencode/termo-local.check.cjs'`

  Expected: FAIL because the game rules and input handlers are not implemented.

- [ ] **Step 3: Implement game state and rules in `script.js`**

  Add the single `WORDS` list, random answer selection, current row/guess state, membership and five-letter validation, two-pass `evaluateGuess`, status messages, keyboard-letter feedback, win/loss lockout, answer reveal, and restart. Invalid or incomplete entries do not advance the row. Bind keyboard and buttons to the shared input functions.

- [ ] **Step 4: Run the gameplay checks**

  Run the same command.

  Expected: PASS for invalid input, duplicate-letter scoring, both input methods, win, loss on attempt six, lockout, and restart.

### Task 3: Apply the custom responsive visual design

**Files:**
- Modify: `style.css`
- Modify: `script.js` (mixed-input Enter handling only)
- Test: `/tmp/opencode/termo-local.check.cjs`

**Interfaces:**
- Preserve the board, keyboard, and status IDs/classes from Task 1.
- Use a light sand background, navy text, and distinct green, amber, and gray feedback colors.

- [ ] **Step 1: Add failing responsive, desktop-fit, and console checks**

  In the temporary harness, check a 375px-wide viewport for no horizontal overflow, visible keyboard controls, readable five-cell rows, and tile width/height within 2px of each other. At 1280×900, require the full virtual keyboard to fit in the viewport without scrolling. Collect console errors while loading the page.

- [ ] **Step 2: Run checks and confirm the narrow-layout assertion fails**

  Run: `npx --yes --package=playwright -c 'NODE_PATH="$(dirname "$(dirname "$(command -v playwright)")")" node /tmp/opencode/termo-local.check.cjs'`

  Expected: FAIL because the basic two-column shell overflows at 375px; the square-tile assertion may already pass.

- [ ] **Step 3: Finish `style.css`**

  Apply the approved sand/navy palette, custom spacing and tile treatment, visible focus states, feedback colors, and responsive sizing for desktop and narrow screens. Ensure physical Enter submits even when a virtual-key button retains focus; preserve native Enter behavior on the restart button and links. Keep adequate contrast and do not imitate Termo's layout or colors.

- [ ] **Step 4: Run all browser checks at 375px and desktop size**

  Run the same command.

  Expected: PASS for gameplay, responsive layout, desktop keyboard visibility at 1280×900, local asset loading, and no browser console errors. No project test runner or dependency is added.
