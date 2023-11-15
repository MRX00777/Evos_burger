"use strict";

var product = {
  plainBurger: {
    name: 'Гамбургер простой',
    price: 10000,
    kcall: 500,
    amount: 0,

    get Summ() {
      return this.price * this.amount;
    },

    get Kcall() {
      return this.kcall * this.amount;
    }

  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    price: 20500,
    kcall: 700,
    amount: 0,

    get Summ() {
      return this.price * this.amount;
    },

    get Kcall() {
      return this.kcall * this.amount;
    }

  },
  freshCombo: {
    name: 'FRESH COMBO',
    price: 31900,
    kcall: 1000,
    amount: 0,

    get Summ() {
      return this.price * this.amount;
    },

    get Kcall() {
      return this.kcall * this.amount;
    }

  }
};
var extraProduct = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    price: 1000,
    kcall: 200
  },
  lettuce: {
    name: 'Салатный лист',
    price: 2000,
    kcall: 10
  },
  cheese: {
    name: ' Сыр',
    price: 3000,
    kcall: 200
  }
};
var BPOM = document.querySelectorAll('.main__product-btn'),
    checkExtraProd = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    // кнопка Заказать
receipt = document.querySelector('.receipt'),
    receiptOut = receipt.querySelector('.receipt__window-out'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    receiptBtn = receipt.querySelector('.receipt__window-btn');

for (var i = 0; i < BPOM.length; i++) {
  BPOM[i].addEventListener('click', function () {
    plusOrMinus(this);
  });
}

function plusOrMinus(POM) {
  var parent = POM.closest('.main__product'),
      parentID = parent.getAttribute('id'),
      out = parent.querySelector('.main__product-num'),
      price = parent.querySelector('.main__product-price span'),
      kcall = parent.querySelector('.main__product-kcall span'),
      POMType = POM.getAttribute('data-symbol');
  if (POMType == '+' && product[parentID].amount < 10) product[parentID].amount++;else if (POMType == '-' && product[parentID].amount > 0) product[parentID].amount--;
  out.innerHTML = product[parentID].amount;
  price.innerHTML = product[parentID].Summ;
  kcall.innerHTML = product[parentID].Kcall;
}

for (var _i = 0; _i < checkExtraProd.length; _i++) {
  checkExtraProd[_i].addEventListener('click', function () {
    addExtraProd(this);
  });
}

function addExtraProd(EP) {
  var parent = EP.closest('.main__product'),
      parentID = parent.getAttribute('id'),
      price = parent.querySelector('.main__product-price span'),
      kcall = parent.querySelector('.main__product-kcall span'),
      EPType = EP.getAttribute('data-extra');
  product[parentID][EPType] = EP.checked;

  if (product[parentID][EPType] == true) {
    product[parentID].kcall += extraProduct[EPType].kcall;
    product[parentID].price += extraProduct[EPType].price;
  } else {
    product[parentID].kcall -= extraProduct[EPType].kcall;
    product[parentID].price -= extraProduct[EPType].price;
  }

  price.innerHTML = product[parentID].Summ;
  kcall.innerHTML = product[parentID].Kcall;
}
/* Секундомер при открытий сайта */

/* 
const headerTimer = document.querySelector('.header__timer-extra');
let counter = 0;
let timerId;
let timerInterval = 300;

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM полностью загружен и разобран");
    timerId = setInterval(function() {
        counter++;
        if (counter > 50 && counter < 90) {
            timerInterval = 500;
            clearInterval(timerId);
            timerId = setInterval(updateCounter, timerInterval);
        } else if (counter >= 90) {
            timerInterval = 2000;
            clearInterval(timerId);
            timerId = setInterval(updateCounterTwo, timerInterval);
        }

        if (counter > 100) {
            counter = 100;
        }
        headerTimer.innerHTML = counter;
    }, timerInterval);
});

function updateCounter() {
    counter++;
    if (counter > 100) {
        counter = 100;
    }
    headerTimer.innerHTML = counter;
}

function updateCounterTwo() {
    counter++;
    if (counter > 100) {
        counter = 100;
    }
    headerTimer.innerHTML = counter;
}
 */


addCart.addEventListener('click', function () {
  var arrayProduct = [],
      totalName = '',
      totalPrice = 0,
      totalKcall = 0;

  for (var key in product) {
    var po = product[key];

    if (po.amount > 0) {
      arrayProduct.push(po);
      po.name += " : ".concat(po.amount, " \u0448\u0442\u0443\u043A");

      for (var infokey in po) {
        if (po[infokey] === true) {
          po.name += '\n' + extraProduct[infokey].name;
        }
      }
    }

    po.price = po.Summ;
    po.kcall = po.Kcall;
  }

  for (var _i2 = 0; _i2 < arrayProduct.length; _i2++) {
    var el = arrayProduct[_i2];
    totalPrice += el.price;
    totalKcall += el.kcall;
    totalName += '\n' + el.name + '\n';
  }

  receiptOut.innerHTML = "<h2> \u0412\u044B \u043A\u0443\u043F\u0438\u043B\u0438: </h2> \n ".concat(totalName, "  \n \u041A\u0430\u043B\u043E\u0440\u0438\u0439\u043D\u043E\u0441\u0442\u044C - ").concat(totalKcall, " \n <h3> \u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430 - ").concat(totalPrice, " \u0441\u0443\u043C </h3>");
  receipt.style.display = 'flex';
  setTimeout(function () {
    receipt.style.opacity = '1';
  }, 100);
  setTimeout(function () {
    receiptWindow.style.top = '0';
  }, 200);
  var outNum = document.querySelectorAll('.main__product-num');

  for (var _i3 = 0; _i3 < outNum.length; _i3++) {
    outNum[_i3].innerHTML = 0;
  }

  var outPrice = document.querySelectorAll('.main__product-price span');

  for (var _i4 = 0; _i4 < outNum.length; _i4++) {
    outPrice[_i4].innerHTML = 0;
  }

  var outKcall = document.querySelectorAll('.main__product-kcall span');

  for (var _i5 = 0; _i5 < outNum.length; _i5++) {
    outKcall[_i5].innerHTML = 0;
  }

  document.body.style.overflow = 'hidden';
});
receiptBtn.addEventListener('click', function () {
  alert('Спасибо за покупку!');
});
receiptBtn.addEventListener('click', function () {
  location.reload();
});