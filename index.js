const endScreen = document.getElementById("looser&winner");
const endScreenTitle = document.querySelector(".end__screen--title");
const endScreenScore = document.querySelector(".end__screen--score");
const endScreenImg = document.querySelector(".end__screen--img");
const canvas = document.getElementById("canvas");
const infoList = document.querySelector(".info");
const btnStartGame = document.getElementById("startGame");

const ctx = canvas.getContext("2d");
// ./images/bonk.webp

//Display time elements
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');


function printTime() {
  printSeconds();
  printMinutes();
}

function printMinutes() {

  let minutes = chronometer.computeTwoDigitNumber(chronometer.getMinutes());
  let splitMinutes = minutes.split('');
  minDecElement.innerHTML = splitMinutes[0];
  minUniElement.innerHTML = splitMinutes[1];
}

function printSeconds() {

  let seconds = chronometer.computeTwoDigitNumber(chronometer.getSeconds());
  let splitSeconds = seconds.split('');
  secDecElement.innerHTML = splitSeconds[0];
  secUniElement.innerHTML = splitSeconds[1];
}


const game = {
  board: null,
  timer: null,
  setWelcomeView: function () {
    endScreen.style.display = "none";
    infoList.style.display = "block";
    btnStartGame.style.display = "block";
    canvas.style.display = "none";
  },

  startGame: function () {
    infoList.style.display = "none";
    btnStartGame.style.display = "none";
    canvas.style.display = "block";
    this.board = new Board();
    this.board.drawCards();
    this.timer = new Timer()
    console.log(this.timer.start())
  },

  setLooserView: function (score) {
    endScreenTitle.innerText = "Game Over";
    endScreenScore.innerText = "Puntuacion: 9000";
    endScreenImg.src = "./images/bonk.webp";
    endScreen.style.display = "flex";
  },

  setWinnerView: function (score) {
    endScreenTitle.innerText = "Winner!!";
    endScreenScore.innerText = "Puntuacion: 9000";
    endScreenImg.src = "./images/winner.gif";
    endScreen.style.display = "flex";
  },
};

class Timer {
  constructor() {
    this.currentTime = 120;
    this.timerInterval;
  }

  start() {
    if (this.timerInterval) return;
    this.timerInterval = setInterval(this.removeTime, 1000);
  }

  stop() {
    clearInterval(this.timerInterval);
  }

  addTime(timeToAdd) {
    this.currentTime += timeToAdd;
  }

  removeTime() {
    this.currentTime--;
  }

  //TODO Agregar formateo de tiempo y retornarlo formateado 00:00 MM:SS

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
    ];
    this.looser = false;
    this.winner = false;
  }
  //! Estara actualizando los Tablero completo
  drawCards() {
    let positionX = 0;
    let positionY = 0;
    let cardSize = 100;
    let separation = 5;
    for (let index = 0; index < this.cards.length * 2; index++) {
      let card = new Card(this.cards[index], positionX, positionY);
      card.drawCard();
      positionX += cardSize += separation;

      console.log(positionX);
    }
  }

  shuffleCards() {
    this.drawCards();
  }

  start() {
    this.shuffleCards();
  }
  //TODO Ver la forma de seleccionar cartas
  selectFirstCard() {}

  selectSecondCard() {}

  linkCard() {}

  checkIfWin() {}

  checkIfLoose() {}
}

class Card {
  //TODO Seleccion de cartas
  constructor(type, x, y) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.width = 100;
    this.height = 100;
    this.img = new Image();
    this.img.src = this.fruits();
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
        return "/images/aguacate.png";
      case "burrito":
        return "/images/burrito.jfif";
      case "fries":
        return "/images/fries.jfif";
      case "sushi":
        return "/images/sushi.jfif";
      case "potato":
        return "/images/potato.jpg";
    }
  }
  drawCard() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

window.onload = () => {
  document.getElementById("home__btn").onclick = () => {
    game.setWelcomeView();
  };

  btnStartGame.onclick = () => {
    game.startGame();
  };

  function startGame() {
    if (gameInterval) return;
    gameInterval = setInterval(updateGame, 1000 / 60);
  }
};
