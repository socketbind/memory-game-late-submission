import { cardImageUrl } from './card_images';
import { ensureClass, removeClass } from './utils';

export default class Card {

  constructor(id) {
    this.id = id;

    this._assembleRoot();

    this.$root.addEventListener('click', e => {
      this.onclick && this.onclick.call(this, this);
    }, false);
  }

  _assembleRoot() {
    const randomImage = cardImageUrl(this.id);

    this.$root = document.createElement('div');
    this.$root.className = 'game-card fade-in';

    this.$flipper = document.createElement('div')
    this.$flipper.className = 'flipper';
    this.$root.appendChild(this.$flipper);

    this.$front = document.createElement('div');
    this.$front.className = 'front';
    this.$flipper.appendChild(this.$front);

    this.$back = document.createElement('div');
    this.$back.className = 'back';
    this.$flipper.appendChild(this.$back);

    this.$front.style.background = `url(${randomImage}) no-repeat center center`;
    this.unflip();
  }

  solve() {
    ensureClass(this.$root, 'solved');
  }

  flip() {
    removeClass(this.$root, 'flipped');
  }

  unflip() {
    ensureClass(this.$root, 'flipped');
  }

  sameAs(otherCard) {
    return otherCard.hasOwnProperty('id') && this.id === otherCard.id;
  }

}
