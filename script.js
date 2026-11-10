const BOARD_ROWS = 6;
const WORD_LENGTH = 5;

const WORDS = [
  'SERRA', 'SARAR', 'AREIA', 'AVISO', 'BEIJO', 'BOLSA', 'CAMPO', 'CHUVA',
  'BRISA', 'CABRA', 'CALMA', 'CANTO', 'CARRO', 'CASCO', 'CEDRO', 'CHAVE',
  'CLARO', 'CLIMA', 'COBRA', 'CORAL', 'CORES', 'CORPO', 'CRAVO', 'CULPA',
  'CURVA', 'DEDOS', 'DENTE', 'DORES', 'FALHA', 'FALSO', 'FAROL', 'FELIZ',
  'FERRO', 'FILHO', 'FLORA', 'FOLHA', 'FORTE', 'FRUTA', 'GATOS', 'GOLPE',
  'GRAVE', 'HOMEM', 'IDEAL', 'JOGAR', 'JOVEM', 'JURAR', 'LARGO', 'LAVAR',
  'LEGAL', 'LIMPO', 'LINDO', 'LIVRO', 'LUGAR', 'MACIO', 'MANSO', 'MARCA',
  'MARTE', 'MATAR', 'MEDIR', 'MENOS', 'MESMO', 'MOLHO', 'MONTE', 'MORAL',
  'MUNDO', 'NATAL', 'NOITE', 'NORTE', 'NUVEM', 'OLHAR', 'ONTEM', 'PADRE',
  'PAGAR', 'PALCO', 'PARAR', 'PARTE', 'PASSO', 'PEDRA', 'PEIXE', 'PERDA',
  'PERTO', 'PESCA', 'PISTA', 'PLANO', 'PLENO', 'POBRE', 'PODER', 'PODEM',
  'POLVO', 'PONTE', 'PORCO', 'PORTA', 'POSSE', 'PRETO', 'PROSA', 'QUASE',
  'RASTO', 'REAIS', 'REGRA', 'RELVA', 'RISCO', 'RIVAL', 'ROCHA', 'RODAR',
  'ROSAS', 'ROSTO', 'SABER', 'SABOR', 'SABRE', 'SALTO', 'SEARA', 'SEGUE',
  'SEIVA', 'SENHA', 'SERVE', 'SINAL', 'SONHO', 'SOPRO', 'TANGO', 'TANTO',
  'TARDE', 'TAXAS', 'TEMPO', 'TERRA', 'TIGRE', 'TINTA', 'TIRAR', 'TOMAR',
  'TORRE', 'TOTAL', 'TRAMA', 'TRATO', 'TREVO', 'TROCA', 'TURMA', 'VAGAS',
  'VALOR', 'VAPOR', 'VELHO', 'VENDA', 'VENTO', 'VERDE', 'VERBO', 'VIGOR',
  'VINHO', 'VISTA', 'VITAL', 'VOLTA', 'ZEBRA',
];

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['BACKSPACE', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'],
];

const KEY_STATE_PRIORITY = {
  absent: 1,
  present: 2,
  correct: 3,
};

const boardElement = document.querySelector('#board');
const keyboardElement = document.querySelector('#keyboard');
const messageElement = document.querySelector('#game-message');
const newGameButton = document.querySelector('#new-game');

let secretWord = '';
let currentRow = 0;
let currentGuess = '';
let gameIsOver = false;

/**
 * Score exact matches first, then use remaining answer letters for misplaced matches.
 * @param {string} guess Five-letter guess in uppercase.
 * @param {string} answer Five-letter answer in uppercase.
 * @returns {Array<'correct' | 'present' | 'absent'>} One state for each letter.
 */
function evaluateGuess(guess, answer) {
  const states = Array(WORD_LENGTH).fill('absent');
  const remainingLetters = new Map();

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    if (guess[index] === answer[index]) {
      states[index] = 'correct';
      continue;
    }

    const remainingCount = remainingLetters.get(answer[index]) ?? 0;
    remainingLetters.set(answer[index], remainingCount + 1);
  }

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    if (states[index] === 'correct') {
      continue;
    }

    const remainingCount = remainingLetters.get(guess[index]) ?? 0;

    if (remainingCount > 0) {
      states[index] = 'present';
      remainingLetters.set(guess[index], remainingCount - 1);
    }
  }

  return states;
}

function renderBoard() {
  const fragment = document.createDocumentFragment();

  for (let rowIndex = 0; rowIndex < BOARD_ROWS; rowIndex += 1) {
    const row = document.createElement('div');
    row.className = 'guess-row';
    row.dataset.row = String(rowIndex);
    row.setAttribute('role', 'row');

    for (let letterIndex = 0; letterIndex < WORD_LENGTH; letterIndex += 1) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.state = 'empty';
      tile.setAttribute('role', 'gridcell');
      tile.setAttribute('aria-label', `Tentativa ${rowIndex + 1}, letra ${letterIndex + 1}`);
      row.append(tile);
    }

    fragment.append(row);
  }

  boardElement.append(fragment);
}

function createKey(key) {
  const button = document.createElement('button');
  const isAction = key === 'BACKSPACE' || key === 'ENTER';
  const label = key === 'BACKSPACE' ? 'Apagar letra' : key === 'ENTER' ? 'Enviar' : key;

  button.className = isAction ? 'key key--action' : 'key';
  button.dataset.key = key;
  button.type = 'button';
  button.textContent = key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? 'Enviar' : key;
  button.setAttribute('aria-label', label);

  return button;
}

function renderKeyboard() {
  const fragment = document.createDocumentFragment();

  for (const [rowIndex, keys] of KEYBOARD_ROWS.entries()) {
    const row = document.createElement('div');
    row.className = `keyboard-row keyboard-row--${rowIndex + 1}`;

    for (const key of keys) {
      row.append(createKey(key));
    }

    fragment.append(row);
  }

  keyboardElement.append(fragment);
}

function showMessage(message) {
  messageElement.textContent = message;
}

function renderCurrentGuess() {
  const row = boardElement.querySelector(`[data-row="${currentRow}"]`);

  if (!row) {
    return;
  }

  const tiles = row.querySelectorAll('.tile');

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    const letter = currentGuess[index] ?? '';
    const tile = tiles[index];

    tile.textContent = letter;
    tile.setAttribute(
      'aria-label',
      letter ? `Tentativa ${currentRow + 1}, letra ${letter}` : `Tentativa ${currentRow + 1}, letra ${index + 1}`,
    );
  }
}

function addLetter(letter) {
  if (gameIsOver || currentGuess.length >= WORD_LENGTH) {
    return;
  }

  const normalizedLetter = letter.toUpperCase();

  if (!/^[A-Z]$/.test(normalizedLetter)) {
    return;
  }

  currentGuess += normalizedLetter;
  renderCurrentGuess();
}

function removeLetter() {
  if (gameIsOver || currentGuess.length === 0) {
    return;
  }

  currentGuess = currentGuess.slice(0, -1);
  renderCurrentGuess();
}

function updateKeyboardFeedback(guess, states) {
  for (let index = 0; index < WORD_LENGTH; index += 1) {
    const letter = guess[index];
    const key = keyboardElement.querySelector(`[data-key="${letter}"]`);
    const previousState = key?.dataset.state ?? '';
    const nextState = states[index];

    if ((KEY_STATE_PRIORITY[nextState] ?? 0) > (KEY_STATE_PRIORITY[previousState] ?? 0)) {
      key.dataset.state = nextState;
    }
  }
}

function submitGuess() {
  if (gameIsOver) {
    return;
  }

  if (currentGuess.length !== WORD_LENGTH) {
    showMessage('Complete as cinco letras antes de enviar.');
    return;
  }

  if (!WORDS.includes(currentGuess)) {
    showMessage('Essa palavra não está na lista. Tente outra.');
    return;
  }

  const guess = currentGuess;
  const states = evaluateGuess(guess, secretWord);
  const row = boardElement.querySelector(`[data-row="${currentRow}"]`);
  const tiles = row.querySelectorAll('.tile');

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    const tile = tiles[index];
    const state = states[index];

    tile.dataset.state = state;
    tile.setAttribute('aria-label', `${guess[index]}, ${state === 'correct' ? 'posição correta' : state === 'present' ? 'em outra posição' : 'ausente'}`);
  }

  updateKeyboardFeedback(guess, states);

  if (guess === secretWord) {
    gameIsOver = true;
    showMessage(`Você acertou em ${currentRow + 1} ${currentRow === 0 ? 'tentativa' : 'tentativas'}!`);
    return;
  }

  if (currentRow === BOARD_ROWS - 1) {
    gameIsOver = true;
    showMessage(`Fim de jogo. A palavra era ${secretWord}.`);
    return;
  }

  currentRow += 1;
  currentGuess = '';
  boardElement.dataset.activeRow = String(currentRow);
  showMessage('Ainda não. Tente a próxima palavra.');
}

function startGame() {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  currentRow = 0;
  currentGuess = '';
  gameIsOver = false;
  boardElement.dataset.activeRow = '0';

  for (const [tileIndex, tile] of boardElement.querySelectorAll('.tile').entries()) {
    tile.textContent = '';
    tile.dataset.state = 'empty';
    tile.setAttribute(
      'aria-label',
      `Tentativa ${Math.floor(tileIndex / WORD_LENGTH) + 1}, letra ${(tileIndex % WORD_LENGTH) + 1}`,
    );
  }

  for (const key of keyboardElement.querySelectorAll('[data-key]')) {
    delete key.dataset.state;
  }

  showMessage('Nova palavra sorteada. Faça seu primeiro palpite.');
}

function handleKeyboardAction(key) {
  if (key === 'BACKSPACE') {
    removeLetter();
    return;
  }

  if (key === 'ENTER') {
    submitGuess();
    return;
  }

  addLetter(key);
}

function handlePhysicalKey(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }

  if (event.key === 'Enter') {
    const target = event.target;
    const isNavigationControl = target instanceof HTMLElement && target.closest('#new-game, .brand');

    if (isNavigationControl) {
      return;
    }

    event.preventDefault();
    submitGuess();
    return;
  }

  if (event.key === 'Backspace') {
    event.preventDefault();
    removeLetter();
    return;
  }

  const letter = event.key.toUpperCase();

  if (/^[A-Z]$/.test(letter)) {
    event.preventDefault();
    addLetter(letter);
  }
}

function handleVirtualKey(event) {
  const button = event.target?.closest?.('button[data-key]');
  const key = button?.dataset?.key ?? '';

  if (key) {
    handleKeyboardAction(key);
  }
}

renderBoard();
renderKeyboard();
keyboardElement.addEventListener('click', handleVirtualKey);
document.addEventListener('keydown', handlePhysicalKey);
newGameButton?.addEventListener('click', startGame);
startGame();
