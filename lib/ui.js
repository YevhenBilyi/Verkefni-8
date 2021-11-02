// TODO hér þarf að sækja viðeigandi föll sem nota þarf
import { playAsText, resultAsText } from "./rock-paper-scissors.js";
/**
 * Býr til takka fyrir umferðir, festir `onClick` við og bætir
 * við `.rounds__buttons`.
 *
 * @param {number} max Hámark umferða
 * @param {function} onClick Fall sem keyra skal þegar ýtt er á takka
 */
export function createButtons(max, onClick) {
  // TODO útfæra
  const rounds = document.querySelector('.rounds__buttons');
  // let btn = document.createElement("button");
  // btn.innerHTML = "Click Me";
  for(let i = 1; i<=max;i++){
    if(i%2==1){
      let btn = document.createElement("button");
      btn.innerHTML = ""+i;
      btn.classList.add('button');
      btn.value = i;
      btn.onclick=function(){
        onClick(i);
      };
      rounds.appendChild(btn);
      // btn.addEventListener("click",onClick(btn.value));
    }
  }
  
  


}

export function show(part) {
  // TODO klára að útfæra fyrir allar stöður

  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start = document.querySelector('.start');
  const rounds = document.querySelector('.rounds');
  const play = document.querySelector('.play');
  const result = document.querySelector('.result');


  // Felum allt
  start.classList.add('hidden');
  rounds.classList.add('hidden');
  play.classList.add('hidden');
  result.classList.add('hidden');

  // og sýnum það sem beðið er um
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
    case 'play':
      play.classList.remove('hidden');
      break;
    case 'result':
      result.classList.remove('hidden');
      break;
    default:
      console.warn(`${part} óþekkt`);
  }

  // Halló debugger! Við getum sett þetta lykilorð til að láta debugger stoppa
  // þar sem við viljum í flæði forritanna okkar
  debugger;
}

/**
 * @typedef {Object} Results
 * @property {string} player Það sem spilari spilaði
 * @property {string} computer Það sem tölva spilaði
 * @property {number} result Útkoma úr leik, `-1`, `0`, eða `1`
 * @property {number} currentRound Núverandi umferð
 * @property {number} totalRounds Heildarfjöldi umferð
 * @property {number} playerWins Sigrar spilara í umferð
 * @property {number} computerWins Sigrar tölvu í umferð
 */

/**
 * Updates all values of the screen position within `.results` before showing.
 * @param {Results} r Gildi fyrir skjá
 */
export function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
  // TODO útfæra
console.log(player, computer, result, currentRound, totalRounds, playerWins, computerWins )
  const resultPlayer = document.querySelector('.result__player');
  const resultComputer = document.querySelector('.result__computer');
  const resultResult = document.querySelector('.result__result');
  const resultStatus = document.querySelector('.result__status');
  const currentRoundDiv = document.querySelector('.result__currentRound');
  const totalRoundsDiv = document.querySelector('.result__totalRounds');

  resultPlayer.textContent = playAsText(player);
  resultComputer.textContent = playAsText(computer);
  resultResult.textContent=resultAsText(result.toString());
  resultStatus.textContent='Staðan er '+playerWins.toString()+'--'+computerWins.toString();
  currentRoundDiv.textContent=currentRound -1;
  totalRoundsDiv.textContent=totalRounds+1;


}
export function updateStatus({ totalGames, playerGameWins, computerGameWins, playerWins, computerWins}){
  const gamesPlayed = document.querySelector('.games__played');
  const gamesWins = document.querySelector('.games__wins');
  const gamesLoses = document.querySelector('.games__losses');
  const gamesWinRatio = document.querySelector('.games__winratio');
  const gamesLoseRatio = document.querySelector('.games__lossratio');

  gamesPlayed.textContent=totalGames;
  gamesWins.textContent=playerGameWins;
  gamesLoses.textContent=computerGameWins;
  gamesWinRatio.textContent=Math.round(playerGameWins/(totalGames)*100);
  gamesLoseRatio.textContent=Math.round(computerGameWins/(totalGames)*100);

  var node = document.createElement("li");                 // Create a <li> node
  if(playerWins>computerWins){
    var textnode = document.createTextNode("Þú vannst "+playerWins+ "-"+ computerWins);   
  }
  else{
    var textnode = document.createTextNode("Tölva vann "+playerWins+"-"+ computerWins); 
  }
        // Create a text node
  node.appendChild(textnode);                              // Append the text to <li>
  document.querySelector(".games__list").appendChild(node);
}
