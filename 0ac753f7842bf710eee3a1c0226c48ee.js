// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
module.exports="7a9b91e258a27a8a1d114cb7904ce58c.png";
},{}],14:[function(require,module,exports) {
module.exports="5ed69661be97edeb78da4a78154013e2.png";
},{}],15:[function(require,module,exports) {
module.exports="e2021f60df9d3d5693f02d74063750e5.png";
},{}],16:[function(require,module,exports) {
module.exports="e38f7245ec72ac4ffef42d69dece5054.png";
},{}],17:[function(require,module,exports) {
module.exports="5d50419460e8e8442b11b9369ee5240e.png";
},{}],18:[function(require,module,exports) {
module.exports="25c971a958fa00341c38bad404ff1d34.png";
},{}],19:[function(require,module,exports) {
module.exports="715152ad99b1281843d7e6a13412737b.png";
},{}],20:[function(require,module,exports) {
module.exports="eb21cd436e25e6552b71c84db251a320.png";
},{}],21:[function(require,module,exports) {
module.exports="781236724013bf53e4f1938f2f1158b9.png";
},{}],22:[function(require,module,exports) {
module.exports="9ac5cedeca52c63ae82177358658bd03.png";
},{}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CARD_IMAGES = undefined;
exports.randomCardImageId = randomCardImageId;
exports.cardImageUrl = cardImageUrl;

var _angular = require("../assets/angular.png");

var _angular2 = _interopRequireDefault(_angular);

var _d = require("../assets/d3.png");

var _d2 = _interopRequireDefault(_d);

var _jenkins = require("../assets/jenkins.png");

var _jenkins2 = _interopRequireDefault(_jenkins);

var _postcss = require("../assets/postcss.png");

var _postcss2 = _interopRequireDefault(_postcss);

var _react = require("../assets/react.png");

var _react2 = _interopRequireDefault(_react);

var _redux = require("../assets/redux.png");

var _redux2 = _interopRequireDefault(_redux);

var _sass = require("../assets/sass.png");

var _sass2 = _interopRequireDefault(_sass);

var _supercharge = require("../assets/supercharge.png");

var _supercharge2 = _interopRequireDefault(_supercharge);

var _ts = require("../assets/ts.png");

var _ts2 = _interopRequireDefault(_ts);

var _webpack = require("../assets/webpack.png");

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CARD_IMAGES = exports.CARD_IMAGES = [_angular2.default, _d2.default, _jenkins2.default, _postcss2.default, _react2.default, _redux2.default, _sass2.default, _supercharge2.default, _ts2.default, _webpack2.default];

function randomCardImageId() {
  return Math.random() * CARD_IMAGES.length | 0;
}

function cardImageUrl(id) {
  return CARD_IMAGES[id];
}
},{"../assets/angular.png":13,"../assets/d3.png":14,"../assets/jenkins.png":15,"../assets/postcss.png":16,"../assets/react.png":17,"../assets/redux.png":18,"../assets/sass.png":19,"../assets/supercharge.png":20,"../assets/ts.png":21,"../assets/webpack.png":22}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffle = shuffle;
exports.ensureClass = ensureClass;
exports.removeClass = removeClass;
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function ensureClass(elem, clazz) {
  if (!elem.classList.contains(clazz)) {
    elem.classList.add(clazz);
  }
}

function removeClass(elem, clazz) {
  elem.classList.remove(clazz);
}
},{}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card_images = require("./card_images");

var _utils = require("./utils");

class Card {

  constructor(id) {
    this.id = id;

    this._assembleRoot();

    this.$root.addEventListener('click', e => {
      this.onclick && this.onclick.call(this, this);
    }, false);
  }

  _assembleRoot() {
    const randomImage = (0, _card_images.cardImageUrl)(this.id);

    this.$root = document.createElement('div');
    this.$root.className = 'game-card fade-in';

    this.$flipper = document.createElement('div');
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
    (0, _utils.ensureClass)(this.$root, 'solved');
  }

  flip() {
    (0, _utils.removeClass)(this.$root, 'flipped');
  }

  unflip() {
    (0, _utils.ensureClass)(this.$root, 'flipped');
  }

  sameAs(otherCard) {
    return otherCard.hasOwnProperty('id') && this.id === otherCard.id;
  }

}
exports.default = Card;
},{"./card_images":11,"./utils":12}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require("./card");

var _card2 = _interopRequireDefault(_card);

var _card_images = require("./card_images");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Board {
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
    (0, _utils.removeClass)(this.$deckSize, 'error');

    let deckSizeVal = this.$deckSize.value.trim();

    if (deckSizeVal === '' || isNaN(deckSizeVal)) {
      (0, _utils.ensureClass)(this.$deckSize, 'error');
      return;
    }

    let deckSize = parseInt(deckSizeVal);

    if (deckSize < 6 || deckSize > 20) {
      (0, _utils.ensureClass)(this.$deckSize, 'error');
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
      let randomId = (0, _card_images.randomCardImageId)();
      let firstOfPair = new _card2.default(randomId);
      let secondOfPair = new _card2.default(randomId);

      firstOfPair.onclick = secondOfPair.onclick = this.handleFlip.bind(this);

      this.currentCards.push(firstOfPair, secondOfPair);
    }

    (0, _utils.shuffle)(this.currentCards);

    for (var card of this.currentCards) {
      $cardsContainer.appendChild(card.$root);
    }

    (0, _utils.ensureClass)(this.$gameCompleted, 'hidden');

    this.cardTimeout && clearTimeout(this.cardTimeout);
  }

  handleFlip(card) {
    if (this.cardTimeout) {
      return;
    }

    if (!this.flippedCards.includes(card)) {
      card.flip();
      this.flippedCards.push(card);
    }

    if (this.flippedCards.length == 2) {
      if (this.flippedCards[0].sameAs(this.flippedCards[1])) {
        this.cardTimeout = setTimeout(() => {
          this.flippedCards.forEach(card => card.solve());
          this.flippedCards = [];
          this.cardTimeout = null;
        }, 1000);
        this.matches++;
      } else {
        this.cardTimeout = setTimeout(() => {
          this.flippedCards.forEach(card => card.unflip());
          this.flippedCards = [];
          this.cardTimeout = null;
        }, 1000);
      }

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

    (0, _utils.removeClass)(this.$gameCompleted, 'hidden');
    (0, _utils.ensureClass)(this.$gameCompleted, 'fade-in');
    this.$yourScore.innerHTML = this.currentTries + "";
  }

}
exports.default = Board;
},{"./card":10,"./card_images":11,"./utils":12}],7:[function(require,module,exports) {
"use strict";

var _board = require("./board");

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gameBoard = new _board2.default(document.querySelector("#board"));
},{"./board":9}]},{},[7])