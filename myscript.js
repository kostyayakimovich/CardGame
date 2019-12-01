const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerCards;
let countTime = 3;
let endTime = true;
let gameOver = document.getElementById('gameover');
let winCards = document.querySelectorAll('.flip');

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
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
}
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}
function noFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
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

//document.body.ElementChild.style.visibility = 'hidden';

function timer() {
  document.getElementById('timeGame').innerHTML = countTime;
  if (countTime >= 0) {
    countTime--;
  }

  if (countTime < 0) {
    // win();
    gameOver.style.visibility = 'visible';
    countTime = 0;
    // noFlipCards();

    // firstCard.classList.remove('flip');
    // secondCard.classList.remove('flip');
    // resetBoard();
    //win();
  }
}

timer();
setInterval(timer, 1000);
function win() {
  console.log(winCards);
  clearTimeout(timer);
}
