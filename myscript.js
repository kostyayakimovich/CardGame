const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerCards;
let countTime = 180;
let endTime = true;
let gameOver = document.getElementById("gameover");
let score = 0;
let countWin = 0;

cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkCards();
}
function checkCards() {
  let isCheck = firstCard.dataset.name === secondCard.dataset.name;
  isCheck ? disableCards() : noFlipCards();
  score++;
  document.getElementById("scoreGame").innerHTML = score;
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  countWin++;
  if (countWin === 16) {
    secondCard.removeEventListener("click", flipCard);
    gameOver.textContent = "ПОБЕДА";
    gameOver.style.visibility = "visible";
    cardContainer.style.visibility = "hidden";
    countTime = "У вас еще осталось:  " + countTime + " секунды";
    score = "Ваш счет: " + score;
  }
}
function noFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
(function randomCard() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 32);
    card.style.order = randomPos;
  });
})();

let timer = function() {
  document.getElementById("timeGame").innerHTML = countTime;
  if (countTime > 0) {
    countTime--;
  } else if (countTime <= 0) {
    gameOver.style.visibility = "visible";
    cardContainer.style.visibility = "hidden";
    countTime = 0;
  }
};
setInterval(timer, 1000);
timer();
function win() {
  console.log("hi");
}
