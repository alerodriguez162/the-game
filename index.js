const endScreen = document.getElementById("looser&winner");
const endScreenTitle = document.querySelector(".end__screen--title");
const endScreenScore = document.querySelector(".end__screen--score");
const endScreenImg = document.querySelector(".end__screen--img");
const canvas = document.getElementById("canvas");
const infoList = document.querySelector(".info");
const btnStartGame = document.getElementById("startGame");
const ctx = canvas.getContext("2d");
// ./images/bonk.webp
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
  constructor(type) {
    this.type = type;
    this.width = 50;
    this.height = 50;
    this.img = new Image()
  }
  fruits() {
    switch(this.type) {
      case "apple":
        this.img.src = '/images/cards/manzana.jpg'
      break;
      case "almond":
        this.img.src = '/images/cards/almendra.jpg'
      break;
      case "coffee":
        this.img.src = '/images/cards/cafe.jpg'
      break;
      case "donut":
        this.img.src = '/images/cards/dona.jpg'
      break;
      case "cookie":
        this.img.src = '/images/cards/galletas.jpg'
      break;
      case "burger":
        this.img.src = '/images/cards/hamburguesa.jpg'
      break;
      case "ice":
        this.img.src = '/images/cards/helado.jpg'
      break;
      case "jocho":
        this.img.src = '/images/cards/hotdog.jpg'
      break;
      case "muffin":
        this.img.src = '/images/cards/helado.jpg'
      break;
      case "ice":
        this.img.src = '/images/cards/helado.jpg'
      break;
      case "pizza":
        this.img.src = '/images/cards/pizza.jpg'
      break;
      case "cheese":
        this.img.src = '/images/cards/ques.jpg'
      break;
      case "ramen":
        this.img.src = '/images/cards/ramen.jpg'
      break;
      case "taco":
        this.img.src = '/images/cards/taco.jpg'
      break;
      case "avocado":
        this.img.src = '/images/aguacate.png'
      break;
      case "burrito":
        this.img.src = '/images/burrito.jfif'
      break;
      case "fries":
        this.img.src = '/images/fries.jfif'
      break;
      case "sushi":
        this.img.src = '/images/sushi.jfif'
      break;
      case "potato":
        this.img.src = '/images/potato.jpg'
      break;
    }

    
  }
  drawCards(){
  ctx.drawImage(this.img, 0, 0, this.width, this.height)
    
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
