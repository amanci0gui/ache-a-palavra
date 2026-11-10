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
  'BANCO', 'BARCO', 'BRAVO', 'BURRO', 'CAIXA', 'CARTA', 'CASAS', 'CERTO',
  'CINCO', 'COISA', 'COMER', 'CONTA', 'DEVER', 'DRAMA', 'DURAR', 'ENTRE',
  'ERROS', 'ESTAR', 'FAZER', 'FESTA', 'FICAR', 'FINAL', 'FUNDO', 'GANHO',
  'GERAL', 'GOSTO', 'GRATO', 'GUIAR', 'HORAS', 'HOTEL', 'JANTA', 'JARRO',
  'LAGOS', 'LEITE', 'LENTO', 'LIVRE', 'LOUCO', 'LUZES', 'MADRE', 'MAGRO',
  'MALHA', 'MARES', 'MASSA', 'MENTE', 'MISTO', 'MOEDA', 'MOTOR', 'MUITO',
  'NAVIO', 'NOIVA', 'OBRAS', 'OLHOS', 'OMBRO', 'ORDEM', 'OUVIR', 'PALMA',
  'PAPEL', 'PEITO', 'PENAS', 'PERNA', 'PESAR', 'PLUMA', 'PONTO', 'PRAIA',
  'PRATO', 'PRAZO', 'PULSO', 'QUEDA', 'RAIVA', 'RAMOS', 'REINO', 'RENDA',
  'RIMAS', 'ROUPA', 'SALAS', 'SALVO', 'SENSO', 'SETOR', 'SOBRE', 'SOLAR',
  'SORTE', 'SUAVE', 'TECLA', 'TELHA', 'TERMO', 'TRIGO', 'TROPA', 'VALES',
  'VELAS', 'VERSO', 'VIDRO', 'VOTOS',
  'ABREU', 'ABRIL', 'ABRIR', 'ABUSO', 'ACASO', 'ACHAR', 'ACIDO', 'ACIMA', 'ADEUS', 'ADOBE', 'AEREO', 'AFETO',
  'AFORA', 'AGORA', 'AGUAS', 'AGUIA', 'AINDA', 'AJUDA', 'ALBUM', 'ALEMA', 'ALGUM', 'ALIAS', 'ALTAR', 'ALTOS',
  'ALUNO', 'AMADA', 'AMADO', 'AMAPA', 'AMARO', 'AMBOS', 'AMIGA', 'AMIGO', 'AMPLO', 'ANAIS', 'ANDAR', 'ANEXO',
  'ANGRA', 'ANIME', 'ANIMO', 'ANTES', 'ANUAL', 'AONDE', 'APELO', 'APOIO', 'ARABE', 'ARENA', 'AROMA', 'ARROZ',
  'ARTES', 'ASSIM', 'ASTRO', 'ATACA', 'ATIVA', 'ATIVO', 'ATLAS', 'ATRAS', 'ATRIZ', 'ATUAL', 'ATUAR', 'AUDIO',
  'AUTOR', 'AUTOS', 'AVEIA', 'AVIAO', 'BACIA', 'BAILE', 'BAIXA', 'BAIXO', 'BALAO', 'BANCA', 'BANDA', 'BANDO',
  'BANHO', 'BARAO', 'BARBA', 'BARRA', 'BARRO', 'BASTA', 'BATER', 'BATOM', 'BAURU', 'BEBER', 'BEIJA', 'BEIRA',
  'BENTO', 'BERCO', 'BESTA', 'BICHO', 'BISPO', 'BLOCO', 'BLUES', 'BLUSA', 'BOCAS', 'BOLAS', 'BOLHA', 'BOLSO',
  'BOMBA', 'BONUS', 'BORDA', 'BORDO', 'BOTAO', 'BOTAR', 'BRACO', 'BRAGA', 'BRAVA', 'BREVE', 'BRIGA', 'BRUNO',
  'BRUTA', 'BRUTO', 'BRUXA', 'BUCAL', 'BUNDA', 'BUSCA', 'CACAU', 'CACHE', 'CAIDO', 'CALAR', 'CALCA', 'CALDA',
  'CALDO', 'CALMO', 'CALOR', 'CANAL', 'CANTA', 'CAPAZ', 'CAPUT', 'CARGA', 'CARGO', 'CARNE', 'CASAL', 'CASAR',
  'CASCA', 'CAUDA', 'CAUSA', 'CEARA', 'CEDER', 'CELSO', 'CELTA', 'CENSO', 'CENTO', 'CERCA', 'CERTA', 'CESAR',
  'CESTA', 'CETIM', 'CHAMA', 'CHAMO', 'CHAPA', 'CHATA', 'CHATO', 'CHEFE', 'CHEGA', 'CHEIA', 'CHEIO', 'CHICO',
  'CHILE', 'CHINA', 'CHORA', 'CHORO', 'CHUTE', 'CICLO', 'CIFRA', 'CINTO', 'CINZA', 'CIRCO', 'CISCO', 'CITAR',
  'CIVEL', 'CIVIL', 'CLARA', 'CLIPE', 'CLUBE', 'COBRE', 'COFRE', 'COLAR', 'COLOR', 'COMBO', 'COMUM', 'CONDE',
  'CONTO', 'COPIA', 'COPOS', 'CORDA', 'CORNO', 'COROA', 'CORRA', 'CORRE', 'CORSA', 'CORTA', 'CORTE', 'COSTA',
  'COTAS', 'COURO', 'COUTO', 'COUVE', 'CREME', 'CRIAR', 'CRIME', 'CRISE', 'CRUEL', 'CULTO', 'CUNHA', 'CUPOM',
  'CURAR', 'CURSO', 'CURTA', 'CURTO', 'CUSTA', 'CUSTO', 'DADOS', 'DANCA', 'DAQUI', 'DEIXA', 'DELAS', 'DELTA',
  'DESDE', 'DESSA', 'DESSE', 'DESTA', 'DESTE', 'DETER', 'DEUSA', 'DIABO', 'DIANA', 'DIETA', 'DIGNO', 'DIOGO',
  'DISCO', 'DISSO', 'DISTO', 'DIZER', 'DOBRO', 'DOIDA', 'DOIDO', 'DOLAR', 'DROGA', 'DUELO', 'DUPLA', 'DUPLO',
  'DUQUE', 'DUZIA', 'EGITO', 'ELITE', 'ENFIM', 'ENTAO', 'ENVIO', 'EPOCA', 'ERRAR', 'ERVAS', 'ESQUI', 'ESSES',
  'ESTOU', 'ETAPA', 'ETICA', 'ETICO', 'EXAME', 'EXATO', 'EXITO', 'EXPOR', 'EXTRA', 'FACIL', 'FACTO', 'FAIXA',
  'FALAR', 'FALSA', 'FALTA', 'FARAO', 'FATAL', 'FATIA', 'FATOR', 'FAUNA', 'FAVOR', 'FEBRE', 'FECHA', 'FECHO',
  'FEIRA', 'FEITA', 'FEITO', 'FEMEA', 'FEZES', 'FIBRA', 'FICHA', 'FIEIS', 'FILHA', 'FILME', 'FIQUE', 'FIRMA',
  'FIRME', 'FIXAR', 'FLUXO', 'FOCAR', 'FOGAO', 'FOGOS', 'FOLGA', 'FOLIA', 'FONTE', 'FORCA', 'FORMA', 'FORNO',
  'FORRO', 'FORUM', 'FRACA', 'FRACO', 'FRASE', 'FREIO', 'FRETE', 'FROTA', 'FRUTO', 'FUGIR', 'FUMAR', 'FUNDA',
  'FURIA', 'FURTO', 'FUSAO', 'FUSCA', 'GARRA', 'GASES', 'GASTO', 'GENIO', 'GENTE', 'GERAR', 'GERIR', 'GESSO',
  'GESTO', 'GLOBO', 'GOIAS', 'GOLFE', 'GORDA', 'GORDO', 'GOZAR', 'GRACA', 'GRADE', 'GRAMA', 'GRANA', 'GREGA',
  'GREGO', 'GREVE', 'GRIPE', 'GRITA', 'GRITO', 'GRUPO', 'GUINE', 'HAVER', 'HELIO', 'HENRY', 'HEROI', 'HONRA',
  'HORTA', 'HUMOR', 'IBOPE', 'ICONE', 'IDADE', 'IDEIA', 'IDOLO', 'IDOSO', 'IGUAL', 'IMPOR', 'INDIA', 'INDIO',
  'INFRA', 'INVES', 'IRMAO', 'JAPAO', 'JEITO', 'JEJUM', 'JEOVA', 'JESUS', 'JOANA', 'JOGUE', 'JOIAS', 'JUDAS',
  'JUDEU', 'JUIZA', 'JUIZO', 'JULHO', 'JULIO', 'JUNHO', 'JUNTA', 'JUNTO', 'JUSTA', 'JUSTO', 'LAGOA', 'LANCA',
  'LANCE', 'LAPIS', 'LARGA', 'LASER', 'LATIM', 'LAUDO', 'LAURO', 'LAZER', 'LEITO', 'LENDA', 'LENHA', 'LENTE',
  'LEQUE', 'LESAO', 'LESTE', 'LETRA', 'LEVAR', 'LEVES', 'LICAO', 'LIDAR', 'LIDER', 'LIGAR', 'LIGHT', 'LILAS',
  'LIMAO', 'LIMPA', 'LINDA', 'LINHA', 'LISTA', 'LITRO', 'LOCAL', 'LOGIN', 'LOIRA', 'LONGA', 'LONGE', 'LONGO',
  'LOUCA', 'LUCIO', 'LUCRO', 'LUTAR', 'LUVAS', 'LUZIA', 'MACAU', 'MACHO', 'MAGIA', 'MAGRA', 'MAIOR', 'MAJOR',
  'MALTA', 'MAMAE', 'MANDA', 'MANDO', 'MANGA', 'MANHA', 'MANIA', 'MANTA', 'MANTO', 'MARCO', 'MARIA', 'MARTA',
  'MAURO', 'MEDIA', 'MEDIO', 'MEIAS', 'MENOR', 'MERDA', 'MESMA', 'METAL', 'METER', 'METRO', 'MEXER', 'MICRO',
  'MIDIA', 'MILAO', 'MILHA', 'MILHO', 'MINHA', 'MIRIM', 'MISSA', 'MODEM', 'MOLDE', 'MORAR', 'MORRO', 'MORTE',
  'MORTO', 'MOTEL', 'MOURA', 'MOUSE', 'MOVEL', 'MOVER', 'MUDAR', 'MULTA', 'MULTI', 'MURAL', 'MUSEU', 'NACAO',
  'NADAR', 'NARIZ', 'NAVAL', 'NEGAR', 'NEGRA', 'NEGRO', 'NESSA', 'NESSE', 'NESTA', 'NESTE', 'NETOS', 'NICHO',
  'NINHO', 'NINJA', 'NISSO', 'NISTO', 'NIVEL', 'NOBEL', 'NOBRE', 'NOCAO', 'NOIVO', 'NORMA', 'NOSSA', 'NOSSO',
  'NOTAR', 'NOVOS', 'NUNCA', 'NUNES', 'OBTER', 'OBVIO', 'OESTE', 'OPALA', 'OPCAO', 'OPERA', 'OPTAR', 'ORGAO',
  'OSSOS', 'OTICA', 'OTIMO', 'OUTRO', 'PACTO', 'PALHA', 'PALIO', 'PAPAI', 'PARTO', 'PASSA', 'PASSE', 'PASTA',
  'PATIO', 'PATOS', 'PAUSA', 'PAUTA', 'PEDAL', 'PEDIR', 'PEGAR', 'PENAL', 'PENHA', 'PENIS', 'PENSO', 'PERCA',
  'PIADA', 'PIANO', 'PIAUI', 'PILAR', 'PILHA', 'PINTO', 'PIRES', 'PIZZA', 'PLACA', 'PLANA', 'POEMA', 'POETA',
  'PONTA', 'POREM', 'PORNO', 'PORRA', 'PORTE', 'PORTO', 'POSTA', 'POSTE', 'POSTO', 'POUCA', 'POUCO', 'POUSO',
  'PRACA', 'PRADO', 'PRAGA', 'PRATA', 'PRECO', 'PRESA', 'PRESO', 'PRETA', 'PRIMA', 'PRIME', 'PRIMO', 'PROVA',
  'PULAR', 'PUNHO', 'PUXAR', 'QUEEN', 'RACAO', 'RADAR', 'RADIO', 'RAPAZ', 'RAZAO', 'RECEM', 'REDOR', 'RENAL',
  'RESTO', 'REVER', 'REZAR', 'RIGOR', 'RITMO', 'ROLAR', 'RONDA', 'ROQUE', 'ROUBO', 'RUBRO', 'RUIDO', 'RURAL',
  'RUSSO', 'SABAO', 'SABIA', 'SABIO', 'SAFRA', 'SAIAS', 'SAIDA', 'SAIDO', 'SAIRA', 'SALAO', 'SALDO', 'SALMO',
  'SALSA', 'SALVA', 'SALVE', 'SAMBA', 'SANTA', 'SANTO', 'SAUDE', 'SAUNA', 'SECAO', 'SECAR', 'SECOS', 'SEIOS',
  'SELVA', 'SENAO', 'SERAO', 'SERIE', 'SERIO', 'SERVO', 'SEXTA', 'SEXTO', 'SHORT', 'SIENA', 'SIGLA', 'SIGNO',
  'SILVA', 'SIMAO', 'SIRIA', 'SITIO', 'SKATE', 'SLIDE', 'SOBRA', 'SOCIO', 'SODIO', 'SOFRE', 'SOGRA', 'SOLDA',
  'SOLTA', 'SOLTO', 'SOMAR', 'SONDA', 'SOUSA', 'SPRAY', 'STAFF', 'STAND', 'SUBIR', 'SUICA', 'SUITE', 'SUPER',
  'SUSHI', 'SUSTO', 'SUTIL', 'TAMPA', 'TCHAU', 'TEMER', 'TEMOR', 'TENDA', 'TENIS', 'TENTA', 'TENTE', 'TENTO',
  'TERCA', 'TERCO', 'TEREM', 'TERNO', 'TESAO', 'TESTA', 'TESTE', 'TEXTO', 'TIMAO', 'TINHA', 'TINTO', 'TOCAR',
  'TODOS', 'TOQUE', 'TORNA', 'TORNO', 'TORTA', 'TOURO', 'TRACO', 'TRAGO', 'TRANS', 'TRAVA', 'TREZE', 'TRIBO',
  'TROCO', 'TRONO', 'TUMOR', 'TUNEL', 'TURBO', 'TURNE', 'TURNO', 'ULTRA', 'UNHAS', 'UNIAO', 'UNICO', 'UNIDO',
  'URINA', 'USADO', 'USINA', 'UTERO', 'VACUO', 'VADIA', 'VALER', 'VALEU', 'VALIA', 'VARIA', 'VASCO', 'VASTO',
  'VAZIA', 'VAZIO', 'VELHA', 'VERAO', 'VERBA', 'VERSA', 'VESTE', 'VETOR', 'VICIO', 'VIDEO', 'VILAO', 'VINDA',
  'VINDO', 'VINHA', 'VINIL', 'VINTE', 'VIOLA', 'VIRAR', 'VIRUS', 'VISAO', 'VISTO', 'VIUVA', 'VIVER', 'VOCAL',
  'VOLEI', 'VOLTE', 'VOLTO', 'VOLVO', 'VOSSO', 'VOTAR', 'WEBER', 'ZUMBI',
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
    const isBrandLink = target instanceof HTMLElement && target.closest('.brand');

    if (isBrandLink) {
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
