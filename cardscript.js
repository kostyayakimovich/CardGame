let start = document.querySelector(".button-start");
let radio = document.getElementsByName("radioCards");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerCards;
let countTime = 0;
let endTime = true;
let gameOver = document.querySelector(".gameover");
let score = 0;
let countWin = 0;
let countCards;
let startTime;
const cardBox = [
  { name: "sb", src: "img/sb.jpg" },
  { name: "sq", src: "img/sq.jpg" },
  { name: "patrik", src: "img/patrik.jpg" },
  { name: "krabs", src: "img/krabs.jpg" },
  { name: "sandy", src: "img/sandy.jpg" },
  { name: "plankton", src: "img/plankton.jpg" },
  { name: "larry", src: "img/larry.jpg" },
  { name: "puff", src: "img/puff.jpg" },
  { name: "garryCard", src: "img/garryCard.jpg" },
  { name: "heroes", src: "img/heroes.jpg" },
  { name: "krabsburger", src: "img/krabsburger.jpg" },
  { name: "parentsSB", src: "img/parentsSB.jpg" },
  { name: "perl", src: "img/perl.jpg" },
  { name: "police", src: "img/police.jpg" },
  { name: "flyHolland", src: "img/flyHolland.jpg" },
  { name: "caren", src: "img/caren.jpg" }
];
start.addEventListener("click", changeRadio);
function changeRadio() {
  for (let index = 0; index < radio.length; index++) {
    if (radio[index].checked) {
      countCards = Number(radio[index].value);
    }
  }
  start.disabled = true;

  countCards === 16 ? (countTime = 160) : (countTime = 80);
  function paintCards(index) {
    let div = document.createElement("div");
    div.className = "card";
    let img1 = document.createElement("img");
    img1.className = "front-face";
    let img2 = document.createElement("img");
    img2.className = "back-face";
    img1.setAttribute("src", cardBox[index].src);
    img2.setAttribute("src", "img/garry.jpg");
    div.setAttribute("data-name", cardBox[index].name);
    div.setAttribute("id", "card");
    div.appendChild(img1);
    div.appendChild(img2);
    cardContainer.append(div);
    let div2 = div.cloneNode(true);
    div.after(div2);
  }
  function getRandom(max) {
    const data = [];
    return function randomNumber() {
      const number = Math.floor(Math.random() * Math.floor(max));
      if (data.length >= max) {
        return;
      }
      if (data.includes(number)) {
        return randomNumber();
      }
      data.push(number);
      return number;
    };
  }

  function buildCard(value) {
    let getRandomNumber = getRandom(16);
    let box = [];
    for (let i = 0; i < value; i++) {
      let result = getRandomNumber();
      box.push(result);
    }
    return box;
  }

  const arrayWithRandomNumbers = buildCard(countCards);
  arrayWithRandomNumbers.forEach(number => {
    return paintCards(number);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.addEventListener("click", flipCard));

  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * (countCards * 2));
    card.style.order = randomPos;
  });

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
    if (countWin === countCards) {
      gameOver.textContent = "ПОБЕДА";
      gameOver.style.visibility = "visible";
      cardContainer.style.visibility = "hidden";
      countTime = "У вас еще осталось:  " + countTime + " секунд";
      score = "Ваш счет: " + score;
      document.getElementById("scoreInfo").innerHTML = score;
      document.getElementById("timeInfo").innerHTML = countTime;
      clearInterval(startTime);

      getTheBestResult();
    }
  }
  function getTheBestResult() {
    let lastResult = localStorage.getItem("res");
    score > lastResult ? newBestResult() : oldBestResult();
  }
  function newBestResult() {
    localStorage.setItem("res", score);
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
  startTime = setInterval(timer, 1000);
  function timer() {
    countTime--;
    document.getElementById("timeGame").innerHTML = countTime;
    if (countTime <= 0) {
      gameOver.style.visibility = "visible";
      cardContainer.style.visibility = "hidden";
      document.getElementById("timeInfo").innerHTML = "время закончилось";
      scoreInfo.style.visibility = "hidden";
      clearInterval(startTime);
    }
  }
}
