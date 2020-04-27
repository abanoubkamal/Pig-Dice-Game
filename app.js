let scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = `dice-${dice1}.png`;
    document.getElementById("dice-2").src = `dice-${dice2}.png`;

    // 3. Update the round score if the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    // Check if the player won the game
    let winValue = document.getElementById("winValue").value;
    let winningScore;
    if (winValue) {
      winningScore = winValue;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
      displayNone();
      document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
      document.querySelector(`.player-${activePlayer}-panel`).classList.add("active");
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  displayNone();
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function displayNone() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}
//reset our player to zero);
document.querySelector(".btn-new").addEventListener("click", init);

// We call this function as soon as we load our app
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  displayNone();

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
