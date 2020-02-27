/*********************************************
 * Developed by: Gourab Sarkar
 * Version: 0.1
 * Copyright: Gourab Sarkar 2020
 * License: GNU GPL v3
 *******************************************/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var playerScores, roundScore, activePlayer, gameConcluded;

function changePlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.getElementById("current-0").textContent = roundScore;
  document.getElementById("current-1").textContent = roundScore;
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function newGame() {
  playerScores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameConcluded = false;

  // hide dice before dice is rolled by user
  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

newGame();

// what happens when the dice is rolled?
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (!gameConcluded) {
    // get the value of the dice roll
    var dice = Math.floor(Math.random() * 6) + 1;

    // dice is rolled; show the dice
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "assets/dice-" + dice + ".png";

    // Update the Round Score if the rolled dice is not a 1.
    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      changePlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (!gameConcluded) {
    playerScores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      playerScores[activePlayer];

    if (playerScores[activePlayer] >= 20) {
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".dice").style.display = "none";
      document.getElementById("name-" + activePlayer).textContent = "WINNER!";
      gameConcluded = true;
    } else {
      changePlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", newGame);
