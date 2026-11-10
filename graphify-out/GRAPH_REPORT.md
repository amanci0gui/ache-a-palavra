# Graph Report - ling-prog2  (2026-11-09)

## Corpus Check
- 3 files · ~2,696 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 36 nodes · 51 edges · 6 communities (5 shown, 1 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- script.js
- Design: Termo local
- Review Focus
- submitGuess
- handleKeyboardAction
- createKey

## God Nodes (most connected - your core abstractions)
1. `submitGuess()` - 7 edges
2. `Design: Termo local` - 6 edges
3. `removeLetter()` - 5 edges
4. `handleKeyboardAction()` - 5 edges
5. `Task 2: Implement dictionary, feedback, and game flow` - 5 edges
6. `addLetter()` - 4 edges
7. `handlePhysicalKey()` - 4 edges
8. `Review Focus` - 4 edges
9. `evaluateGuess()` - 3 edges
10. `showMessage()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Task 2: Implement dictionary, feedback, and game flow` --references--> `removeLetter()`  [INFERRED]
  docs/superpowers/plans/2026-11-09-termo-local.md → script.js
- `Task 2: Implement dictionary, feedback, and game flow` --references--> `evaluateGuess()`  [INFERRED]
  docs/superpowers/plans/2026-11-09-termo-local.md → script.js
- `Task 2: Implement dictionary, feedback, and game flow` --references--> `submitGuess()`  [INFERRED]
  docs/superpowers/plans/2026-11-09-termo-local.md → script.js
- `Task 2: Implement dictionary, feedback, and game flow` --references--> `startGame()`  [INFERRED]
  docs/superpowers/plans/2026-11-09-termo-local.md → script.js

## Import Cycles
- None detected.

## Communities (6 total, 1 thin omitted)

### Community 0 - "script.js"
Cohesion: 0.22
Nodes (7): boardElement, KEY_STATE_PRIORITY, KEYBOARD_ROWS, keyboardElement, messageElement, newGameButton, WORDS

### Community 1 - "Design: Termo local"
Cohesion: 0.29
Nodes (6): Abordagem escolhida, Comportamento e decisões de implementação, Design: Termo local, Intenção, Objetivos e limites, Verificação / critérios de aceitação

### Community 2 - "Review Focus"
Cohesion: 0.33
Nodes (5): Global Constraints, Review Focus, Task 1: Create the static game shell, Task 3: Apply the custom responsive visual design, Termo local Implementation Plan

### Community 3 - "submitGuess"
Cohesion: 0.47
Nodes (6): Task 2: Implement dictionary, feedback, and game flow, evaluateGuess(), showMessage(), startGame(), submitGuess(), updateKeyboardFeedback()

### Community 4 - "handleKeyboardAction"
Cohesion: 0.47
Nodes (6): addLetter(), handleKeyboardAction(), handlePhysicalKey(), handleVirtualKey(), removeLetter(), renderCurrentGuess()

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Task 2: Implement dictionary, feedback, and game flow` connect `submitGuess` to `Review Focus`, `handleKeyboardAction`?**
  _High betweenness centrality (0.225) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Task 2: Implement dictionary, feedback, and game flow` (e.g. with `evaluateGuess()` and `removeLetter()`) actually correct?**
  _`Task 2: Implement dictionary, feedback, and game flow` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Why does `Review Focus` connect `Review Focus` to `submitGuess`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._