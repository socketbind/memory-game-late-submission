import { cardImageUrl } from './card_images';
import { ensureClass, removeClass } from './utils';

export default class Card {

  constructor(id) {
    this.id = id;
    const randomImage = cardImageUrl(this.id);

    this.$root = document.createElement('div');
    this.$root.className = 'card';
    this.$root.style.background = `url(${randomImage}) no-repeat center center`;
    this.unflip();

    this.$root.addEventListener('click', e => {
      this.onclick && this.onclick.call(this, this);
    }, false);
  }

  solve() {
    ensureClass(this.$root, 'solved');
  }

  flip() {
    removeClass(this.$root, 'covered');
  }

  unflip() {
    ensureClass(this.$root, 'covered');
  }

  sameAs(otherCard) {
    return otherCard.hasOwnProperty('id') && this.id === otherCard.id;
  }

}
