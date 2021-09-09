const endScreen = document.getElementById("looser&winner");
const endScreenTitle = document.querySelector(".end__screen--title");
const endScreenScore = document.querySelector(".end__screen--score");
const endScreenImg = document.querySelector(".end__screen--img");
const canvas = document.getElementById("canvas");
const welcomeViewContainer = document.querySelector(".welcome__view--container");
const btnStartGame = document.getElementById("startGame");
const title1 = document.getElementById("title1");
const gameBoard = document.getElementById("gameBoard");
const form = document.getElementById("form");
const leaderBoard = document.getElementById("leader__board--ul");
const playAudioWelcome = document.getElementById("playMusic");
const ctx = canvas.getContext("2d");
const text = document.getElementById("playStop");
const img = playAudioWelcome.getElementsByTagName("img")[0];
const welcomeAudio = generateAudioTags("./audio/welcome.mp3");
const looserAudio = generateAudioTags("./audio/lose.mp3");
const winnerAudio = generateAudioTags("./audio/winner.mp3");
const clickAudio = generateAudioTags("./audio/click.mp3");
const correctAudio = generateAudioTags("./audio/correct.mp3");

let gameInterval;
let board;
let timer;
// ./images/bonk.webp

//Display time elements
const minDecElement = document.getElementById("minDec");
const minUniElement = document.getElementById("minUni");
const secDecElement = document.getElementById("secDec");
const secUniElement = document.getElementById("secUni");

function generateAudioTags(source) {
  let audio = document.createElement("audio");
  audio.load();
  audio.volume = 0.3;
  audio.src = source;
  return audio;
}

const game = {
  setWelcomeView: function () {
    endScreen.style.display = "none";
    welcomeViewContainer.style.display = "flex";
    gameBoard.style.display = "none";
    title1.style.display = "block";
  },

  startGame: function () {
    welcomeViewContainer.style.display = "none";
    gameBoard.style.display = "flex";
    board = new Board();
    board.generateCards();
    timer = new Timer();
    timer.start();
    title1.style.display = "none";
  },

  setLooserView: function (score) {
    welcomeAudio.pause();
    welcomeAudio.currentTime = 0;
    looserAudio.play();
    text.innerText = "Play Music";
    let img = playAudioWelcome.getElementsByTagName("img")[0];
    img.style.width = "80px";
    img.src = "./images/play.png";
    endScreenTitle.innerText = "Game Over";
    endScreenScore.innerText = `Puntuacion: ${Math.floor(score)}`;
    endScreenImg.src = "./images/bonk.webp";
    endScreen.style.display = "flex";
  },

  setWinnerView: function (score) {
    winnerAudio.play();
    welcomeAudio.pause();
    welcomeAudio.currentTime = 0;
    text.innerText = "Play Music";
    let img = playAudioWelcome.getElementsByTagName("img")[0];
    img.style.width = "80px";
    img.src = "./images/play.png";
    endScreenTitle.innerText = "Winner!!";
    endScreenScore.innerText = `Puntuacion: ${Math.floor(score)}`;
    endScreenImg.src = "./images/winner.gif";
    endScreen.style.display = "flex";
  },

  updateGame: function () {
    if (!board) return;
    board.drawCards();
    board.checkIfLoose();
    board.checkIfWin();
  },
};

class Timer {
  constructor() {
    this.currentTime = 15;
    this.timerInterval;
  }

  start() {
    if (this.timerInterval) return;
    this.timerInterval = setInterval(() => {
      this.removeTime();
      this.printTime();
    }, 1000);
  }

  stop() {
    clearInterval(this.timerInterval);
    this.currentTime = 15;
  }

  addTime(timeToAdd) {
    this.currentTime += timeToAdd;
  }

  removeTime() {
    this.currentTime--;
  }

  //TODO Agregar formateo de tiempo y retornarlo formateado 00:00 MM:SS

  getMinutes() {
    return Math.floor(this.currentTime / 60);
  }

  getSeconds() {
    let minutes = this.getMinutes();
    return this.currentTime - minutes * 60;
  }

  computeTwoDigitNumber(value) {
    // ... your code goes here
    if (value < 10) value = `0${value}`;
    return `${value}`;
  }

  printTime() {
    this.printSeconds();
    this.printMinutes();
  }

  printMinutes() {
    let minutes = this.computeTwoDigitNumber(this.getMinutes());
    let splitMinutes = minutes.split("");
    minDecElement.innerHTML = splitMinutes[0];
    minUniElement.innerHTML = splitMinutes[1];
  }

  printSeconds() {
    let seconds = this.computeTwoDigitNumber(this.getSeconds());
    let splitSeconds = seconds.split("");
    secDecElement.innerHTML = splitSeconds[0];
    secUniElement.innerHTML = splitSeconds[1];
  }
}

class Board {
  constructor() {
    this.cards = [
      "apple",
      "burrito",
      "potato",
      "sushi",
      "fries",
      "avocado",
      "ramen",
      "pizza",
      "cheese",
      "ice",
      "muffin",
      "jocho",
      "burger",
      "cookie",
      "donut",
      "coffee",
      "almond",
      "taco",
      "apple",
      "burrito",
      "potato",
      "sushi",
      "fries",
      "avocado",
      "ramen",
      "pizza",
      "cheese",
      "ice",
      "muffin",
      "jocho",
      "burger",
      "cookie",
      "donut",
      "coffee",
      "almond",
      "taco",
    ];
    this.looser = false;
    this.winner = false;
    this.cardsClass = [];
    this.firstCard;
    this.secondCard;
    this.score = 0;
  }

  generateCards() {
    this.cardsClass = [];
    this.shuffleCards();
    let positionX = 5;
    let positionY = 5;
    let cardSize = 120;
    let separation = 5;
    for (let index = 0; index < this.cards.length; index++) {
      let card = new Card(this.cards[index], positionX, positionY);
      this.cardsClass.push(card);
      positionX += cardSize + separation;
      if (positionX >= 1125) {
        positionX = 5;
        positionY += cardSize + separation;
      }
    }
  }

  drawCards() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.cardsClass.forEach((card) => {
      if (card) card.drawCard();
    });
  }

  shuffleCards() {
    // this.cards = this.cards.sort((a, b) => {
    //   if (!a || !b) return 0;

    //   return 0.5 - Math.random();
    // });
    // console.log(this.cards);
    let currentIndex = this.cards.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
    }
  }

  //TODO Ver la forma de seleccionar cartas
  selectFirstCard(selectedCard, index) {
    this.firstCard = {
      selectedCard: selectedCard,
      index: index,
    };
  }

  selectSecondCard(selectedCard, index) {
    this.secondCard = {
      selectedCard: selectedCard,
      index: index,
    };
  }

  linkCard() {
    if (this.firstCard.selectedCard.type === this.secondCard.selectedCard.type) {
      correctAudio.play();
      this.cardsClass.splice(this.firstCard.index, 1, null);
      this.cardsClass.splice(this.secondCard.index, 1, null);
      this.cards = this.cards.filter((card) => {
        return card !== this.firstCard.selectedCard.type;
      });
      // let indexes = this.getAllIndexes(
      //   this.cards,
      //   this.firstCard.selectedCard.type
      // );
      // this.cards.splice(indexes[0], 1, null);
      // this.cards.splice(indexes[1], 1, null);
      timer.currentTime++;
      this.score += timer.currentTime * 0.5 * 5;
    } else {
      this.cardsClass[this.firstCard.index].selected = false;
      this.cardsClass[this.secondCard.index].selected = false;
    }
    this.firstCard = null;
    this.secondCard = null;
  }

  // getAllIndexes(arr, val) {
  //   var indexes = [],
  //     i = -1;
  //   while ((i = arr.indexOf(val, i + 1)) != -1) {
  //     indexes.push(i);
  //   }
  //   return indexes;
  // }

  checkIfWin() {
    //agregar pantalla inicio cuando no hayan fichas
    if (this.cards.length == 0 && !this.winner) {
      this.winner = true;
      game.setWinnerView(this.score);
      timer.stop();
    }
  }

  checkIfLoose() {
    if (timer.currentTime === 0 && !this.looser) {
      this.looser = true;
      game.setLooserView(this.score);
      timer.stop();
    }
  }
}

class Card {
  //TODO Seleccion de cartas
  constructor(type, x, y) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.width = 120;
    this.height = 120;
    this.img = new Image();
    this.img.src = this.fruits();
    this.selected = false;
  }
  fruits() {
    switch (this.type) {
      case "apple":
        return "/images/cards/manzana.jpg";
      case "almond":
        return "/images/cards/almendra.jpg";
      case "coffee":
        return "/images/cards/cafe.jpg";
      case "donut":
        return "/images/cards/dona.jpg";
      case "cookie":
        return "/images/cards/galletas.jpg";
      case "burger":
        return "/images/cards/hamburguesa.jpg";
      case "ice":
        return "/images/cards/helado.jpg";
      case "jocho":
        return "/images/cards/hotdog.jpg";
      case "muffin":
        return "/images/cards/muffin.jpg";
      case "pizza":
        return "/images/cards/pizza.jpg";
      case "cheese":
        return "/images/cards/ques.jpg";
      case "ramen":
        return "/images/cards/ramen.jpg";
      case "taco":
        return "/images/cards/taco.jpg";
      case "avocado":
        return "/images/cards/aguacate.png";
      case "burrito":
        return "/images/cards/burrito.jfif";
      case "fries":
        return "/images/cards/fries.jfif";
      case "sushi":
        return "/images/cards/sushi.jfif";
      case "potato":
        return "/images/cards/potato.jpg";
      default:
        return null;
    }
  }
  drawCard() {
    if (this.selected) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.height, this.width);
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

window.onload = () => {
  playAudioWelcome.onclick = () => {
    if (text.innerText === "Play Music") {
      text.innerText = "Stop Music";
      img.src = "./images/pause.png";
      img.style.width = "53px";
      welcomeAudio.play();
    } else {
      text.innerText = "Play Music";
      img.style.width = "80px";
      img.src = "./images/play.png";
      welcomeAudio.pause();
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let contents = leaderBoard.querySelectorAll("li");

    let list = [];
    list.push({
      name: e.target.elements.name.value,
      score: board.score,
    });
    for (var i = 0; i < contents.length; i++) {
      let splitLi = contents[i].innerText.split(":");
      list.push({
        name: splitLi[0].trim(),
        score: splitLi[1].trim(),
      });
    }
    leaderBoard.innerHTML = null;
    list.sort((a, b) => b.score - a.score);
    list.forEach((item) => {
      leaderBoard.innerHTML += `<li>${item.name}: ${item.score}</li>`;
    });
    form.reset();
    game.setWelcomeView();
  });

  document.getElementById("Shuffle").onclick = () => {
    board.generateCards();
  };
  btnStartGame.onclick = () => {
    game.startGame();

    updateGame();
  };
};

function updateGame() {
  if (gameInterval) return;
  gameInterval = setInterval(game.updateGame, 1000 / 60);
}

canvas.addEventListener(
  "click",
  function (event) {
    let x = event.pageX - canvas.offsetLeft;
    let y = event.pageY - canvas.offsetTop;
    // Collision detection between clicked offset and element.
    board.cardsClass.forEach((card, i) => {
      if (card && y > card.y && y < card.y + card.height && x > card.x && x < card.x + card.width) {
        if (!board.firstCard && !card.selected) {
          card.selected = true;
          board.selectFirstCard(card, i);
        } else if (!board.secondCard && !card.selected) {
          card.selected = true;
          board.selectSecondCard(card, i);
          board.linkCard();
        } else {
          board.firstCard = null;
          card.selected = false;
        }
        clickAudio.play();
      }
    });
  },
  false
);
