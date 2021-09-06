const game = {
  setWelcomeView: function () {},

  startGame: function () {},

  setLooserView: function () {},

  setWinnerView: function () {},
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
}

class Card {
  //TODO Seleccion de cartas
  constructor(type, width, height) {
    this.type = type;
    this.width = width;
    this.height = height;
  }
}