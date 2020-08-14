'use strict';

// let basket = false;

let openBasket = () => {
  document.querySelector('main').setAttribute('class', ' hidden');
  document.querySelector('.basket').removeAttribute('class', ' hidden');
}