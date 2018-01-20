import Card from './card';
import { randomCardImageId } from './card_images';
import { shuffle, ensureClass, removeClass } from './utils';

export default class Board {
  constructor(rootElement) {
    this.$restartButton = rootElement.querySelector('.btn-restart');
    this.$restartButton.addEventListener('click', e => {
      e.preventDefault();
      this.restartGame();
    }, false);

    this.$deckSize = rootElement.querySelector('.deck-size');
    this.$tries = rootElement.querySelector('.tries');
    this.$score = rootElement.querySelector('.score');
    this.$cardsContainer = rootElement.querySelector('.cards');

    this.$gameCompleted = rootElement.querySelector('.game-completed');
    this.$yourScore = this.$gameCompleted.querySelector('span');

    this.$score = rootElement.querySelector(".score span");
    this.$tries = rootElement.querySelector(".tries span");
  }

  restartGame() {
    removeClass(this.$deckSize, 'error')

    let deckSizeVal = this.$deckSize.value.trim();

    if (deckSizeVal === '' || isNaN(deckSizeVal)) {
      ensureClass(this.$deckSize, 'error');
      return;
    }

    let deckSize = parseInt(deckSizeVal);

    if (deckSize < 6 || deckSize > 20) {
      ensureClass(this.$deckSize, 'error');
      return;
    }

    this.initGameWith(deckSize);
  }

  initGameWith(deckSize) {
    this.currentDeckSize = deckSize;
    this.lowestNumberOfTries = 0;
    this.currentCards = [];
    this.flippedCards = [];
    this.matches = 0;

    this.resetTries();

    const $cardsContainer = this.$cardsContainer;

    while ($cardsContainer.firstChild) {
      $cardsContainer.removeChild($cardsContainer.firstChild);
    }

    for (let i = 0; i < deckSize; i++) {
      let randomId = randomCardImageId();
      let firstOfPair = new Card(randomId);
      let secondOfPair = new Card(randomId);

      firstOfPair.onclick = secondOfPair.onclick = this.handleFlip.bind(this);

      this.currentCards.push(firstOfPair, secondOfPair);
    }

    shuffle(this.currentCards);

    for (var card of this.currentCards) {
      $cardsContainer.appendChild(card.$root);
    }

    ensureClass(this.$gameCompleted, 'hidden');
  }

  handleFlip(card) {
    if (!this.flippedCards.includes(card)) {
      card.flip();
      this.flippedCards.push(card);
    }

    if (this.flippedCards.length == 2) {
      if (this.flippedCards[0].sameAs(this.flippedCards[1])) {
        this.flippedCards.forEach(card => card.solve());
        this.matches++;
      } else {
        this.flippedCards.forEach(card => card.unflip());
      }
      this.flippedCards = [];

      this.increaseTries();

      if (this.matches === this.currentDeckSize) {
        this.gameCompleted();
      }
    }
  }

  resetTries() {
      this.currentTries = 0;
      this.$tries.innerHTML = this.currentTries + "";
  }

  increaseTries() {
      this.currentTries++;
      this.$tries.innerHTML = this.currentTries + "";
  }

  updateScore(score) {
      this.$score.innerHTML = this.lowestNumberOfTries + "";
  }

  gameCompleted() {
      if (this.lowestNumberOfTries === 0 || this.currentTries < this.lowestNumberOfTries) {
        this.lowestNumberOfTries = this.currentTries;
        this.updateScore(this.lowestNumberOfTries);
      }

      removeClass(this.$gameCompleted, 'hidden');
      this.$yourScore.innerHTML = this.currentTries + "";
  }

}
