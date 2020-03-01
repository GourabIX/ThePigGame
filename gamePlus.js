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

PLUS MODE: 

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var playerScores, roundScore, activePlayer, gameConcluded, dice, lastDice, winningScore;

function changePlayer() {
  hideDices();

  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.getElementById("current-0").textContent = roundScore;
  document.getElementById("current-1").textContent = roundScore;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function newGame() {
  playerScores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameConcluded = false;
  dice = 0;
  lastDice1 = 0;
  lastDice2 = 0;
  winningScore = 100;

  checkWinningScore();
  hideDices();

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
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (!gameConcluded) {
    // get the value of the dice roll
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    if ((lastDice1 === 6 && dice === 6) || (lastDice2 === 6 && dice2 === 6)) {
      playerScores[activePlayer] = 0;
      lastDice1 = 0;
      lastDice2 = 0;
      changePlayer();
    } else {
      lastDice1 = dice1;
      lastDice2 = dice2;
    }

    // dice is rolled; show the dice
    showDices();
    document.getElementById("dice-1").src = "assets/dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "assets/dice-" + dice2 + ".png";

    // Update the Round Score if the rolled dice is not a 1.
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      changePlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!gameConcluded) {
    checkWinningScore();

    playerScores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      playerScores[activePlayer];

    if (playerScores[activePlayer] >= winningScore) {
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      hideDices();
      document.getElementById("name-" + activePlayer).textContent = "WINNER!";
      gameConcluded = true;
    } else {
      changePlayer();
    }
  }
});

function checkWinningScore() {
  var input = document.querySelector(".final-score").value;
  if (input) winningScore = input;
}

function hideDices() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

function showDices() {
  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-2").style.display = "block";
}

document.querySelector(".btn-new").addEventListener("click", newGame);
