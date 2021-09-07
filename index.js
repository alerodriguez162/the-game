const endScreen = document.getElementById("looser&winner");
const endScreenTitle = document.querySelector(".end__screen--title");
const endScreenScore = document.querySelector(".end__screen--score");
const endScreenImg = document.querySelector(".end__screen--img");
const canvas = document.getElementById("canvas");
const infoList = document.querySelector(".info");
const btnStartGame = document.getElementById("startGame");
const timer = new Timer()
const ctx = canvas.getContext("2d");
// ./images/bonk.webp

//Display time elements
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');


function printTime() {
  printMilliseconds();
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
    this.timerInterval = setInterval(removeTime, 1000);
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
  constructor(cards) {
    this.cards = cards;
    this.looser = false;
    this.winner = false;
  }
  //! Estara actualizando los Tablero completo
  drawCards() {}

  shuffleCards() {}

  start() {
    shuffleCards();
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
    this.y = y
    this.x = x
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
  drawCards() {
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
  }
}

let newBoard = new Board([apple]);

window.onload = () => {
  document.getElementById("home__btn").onclick = () => {
    game.setWelcomeView();
  };
  btnStartGame.onclick = () => {
    game.startGame();
    apple.drawCards();
   
  };
  function startGame() {
    // if (gameInterval) return;
    // gameInterval = setInterval(updateGame, 1000 / 60);
    let apple = new Card("apple");
    let burrito = new Card("burrito");
    let potato = new Card("potato");
    let sushi = new Card("sushi");
    let fries = new Card("fries");
    let avocado = new Card("acovado");
    let ramen = new Card("ramen");
    let pizza = new Card("pizza");
    let cheese = new Card("cheese");
    let ice = new Card("ice");
    let muffin = new Card("muffin");
    let jocho = new Card("jocho")
    let burger = new Card("burger");
    let cookie = new Card("cookie");
    let donut = new Card("donut");
    let coffee = new Card("coffee")
    let almond = new Card("almond")
    let taco = new Card("taco")
  
  
  }
};
