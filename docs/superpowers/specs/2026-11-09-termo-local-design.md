# Design: Termo local

**Data:** 2026-11-09

## Intenção

Trocar o quiz atual por um jogo de adivinhar uma palavra portuguesa de cinco letras, direto no navegador e sem servidor.

## Objetivos e limites

- Exibir seis tentativas, cada uma com cinco letras.
- Sortear a resposta e validar palpites a partir de uma única lista de palavras válidas.
- Marcar letras corretas na posição certa em verde, presentes em outra posição em amarelo e ausentes em cinza.
- Aceitar entrada pelo teclado físico e por teclado virtual, incluindo apagar e enviar.
- Separar a implementação em `index.html`, `style.css` e `script.js`.
- Não adicionar Node, dependências, servidor, API, contas, estatísticas ou modo diário.
- Criar identidade visual própria; não reproduzir o layout ou as cores do Termo.

## Abordagem escolhida

1. **Uma lista para resposta e palpites — escolhida:** simples, local e corresponde diretamente ao pedido. Cada palavra válida também pode ser sorteada.
2. **Listas separadas para respostas e palpites — não escolhida:** permitiria um conjunto maior de palpites, mas adicionaria dados e manutenção sem necessidade neste jogo pequeno.

## Comportamento e decisões de implementação

- `script.js` terá uma lista curada de palavras comuns de cinco letras, sem acentos, usada tanto para validar quanto para sortear a resposta.
- Palpite incompleto ou fora da lista mostra uma mensagem e não consome tentativa.
- A avaliação marcará letras verdes primeiro; em seguida, distribuirá amarelos respeitando a quantidade de letras ainda disponível na resposta. Letras repetidas excedentes ficam cinza.
- Vitória ou sexta tentativa encerram a rodada; em derrota, revelar a resposta. Um botão permite iniciar outra rodada.
- Teclado físico e virtual usarão o mesmo fluxo de entrada. O teclado virtual refletirá a melhor dica conhecida para cada letra.
- Chamada visual: fundo claro areia, texto azul-marinho e acentos verde, âmbar e cinza. A grade terá espaçamento e acabamento próprios, sem copiar o Termo.

## Verificação / critérios de aceitação

- `index.html` abre diretamente no Chromium, sem Node, servidor ou dependências externas.
- Grade tem seis linhas e cinco casas; apenas palavras da lista são aceitas.
- Testar teclas físicas e virtuais, apagar, enviar, palpite inválido e letras repetidas.
- Confirmar vitória, derrota na sexta tentativa, revelação da resposta, bloqueio após o fim e reinício.
- Conferir layout responsivo e ausência de erros no console.
