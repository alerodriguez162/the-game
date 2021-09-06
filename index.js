const endScreen = document.getElementById("looser&winner");
const endScreenTitle = document.querySelector(".end__screen--title");
const endScreenScore = document.querySelector(".end__screen--score");
const endScreenImg = document.querySelector(".end__screen--img");
const canvas = document.getElementById("canvas");
// ./images/bonk.webp
const game = {
  setWelcomeView: function () {
    endScreen.style.display = "none";
  },

  startGame: function () {
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


  }
  function fruits() {
    switch(this.type)
  }

}

window.onload = () => {
  game.setLooserView();
  document.getElementById("home__btn").onclick = () => {
    game.setWelcomeView();
  };

  function startGame() {
    if (gameInterval) return;
    gameInterval = setInterval(updateGame, 1000 / 60);
  }
};
