// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { show, updateResultScreen, createButtons, updateStatus } from './lib/ui.js';
import { checkGame, computerPlay} from './lib/rock-paper-scissors.js';

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;
let totalGames=0;

/** Númer umferðar í núverandi umferð */
let currentRound;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;
let playerGameWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;
let computerGameWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];
const nextRound = document.querySelector('button.nextRound');
const finishGame1 = document.querySelector('button.finishGame');

window.onload= ()=>show('start');
/**
Updates status after a player has played.
  * Checks if game is complete, updates screen status with `updateResultScreen`.
  * Displays either the `Next game` button if the game is over or the` Next round`
  * if you need to play more games.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
// Let's find out what computer was playing and check the status of the game
let computer = computerPlay();
let result = checkGame(player.toString(), computer);
if(result == 1) playerWins++;
else if(result == -1) computerWins++;
currentRound++;
   // Update the result window before we show, here you need to import a function

  updateResultScreen({
    player: player.toString(),
    computer:computer.toString(),
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });
  
// If we update the timer, if not a tie, we have to do it after we set the title
if(playerWins>(totalRounds/2)||computerWins>(totalRounds/2)){

  if(playerWins>totalRounds/2)playerGameWins++;
  else computerGameWins++;

  finishGame1.classList.remove('hidden');
  nextRound.classList.add('hidden');
}
else{
  nextRound.classList.remove('hidden');
  finishGame1.classList.add('hidden');
}
   // Decide which key to display

show('result');
   // Show the result screen
}

/**
 * A function that responds when the number of rounds is clicked
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
  // TODO útfæra
  totalRounds=e;
  currentRound=1;
  show('play');
  
}

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));

// Búum til takka
// createButtons(MAX_BEST_OF, round);
document
  .querySelector('.start button')
  .addEventListener('click', () => createButtons(MAX_BEST_OF, round));
// Event listeners fyrir skæri, blað, steinn takka
// TODO
document.querySelector('button.scissor')
        .addEventListener('click',() => playRound(1));
document.querySelector('button.paper')
        .addEventListener('click',() => playRound(2));
document.querySelector('button.rock')
        .addEventListener('click',() => playRound(3));

/**
  * Updates the status of all played games when a game ends.
  * Prepares so that you can play another game in the sequel.
  */
function finishGame() {
  // Add the latest game
totalGames++;

  // Update status
  updateStatus({

    totalGames,
    playerGameWins,
    computerGameWins,
    playerWins,
    computerWins
  });
  // Add a game to a list of played games

  // Reset parameters
playerWins=0;
computerWins=0;
  // Let's start a new game!
  show('rounds');
}

// Next round and end game keys
document.querySelector('button.finishGame').addEventListener('click', finishGame);
document.querySelector('button.nextRound').addEventListener('click', ()=>show('play'));
// TODO takki sem fer með í næstu umferð
