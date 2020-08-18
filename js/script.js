'use strict';


// <div class="qty">quantity</div><input type="text" value="1" class="item_Quantity">
// <div data-location="/checkout/" class="button">Buy</div>

let crumbs = {
  addCrumb: function(str) {
    let node = document.querySelector('.crumbs');
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerHTML = str;

    li.appendChild(a);
    node.appendChild(li);
  },
  removeCrumb: function() {
    let node = document.querySelector('.crumbs');
    node.removeChild(node.lastElementChild);
  }
}

let actions = {
  countTotal: function() {
    let total = 0;
    for (let i in basket.shopList) {
      total += basket.shopList[i].qty;
    }
    return total;
  },
  recountBasket: function() {
    let list;

    basket.total = 0;
    for (let i in basket.shopList) {
      list = basket.shopList[i];
      list.subtotal = list.price * list.qty;
      basket.total += list.subtotal;
    }
  }
}


let view = {
  addToBasket: function() {
    let obj = {},
        i = event.target.getAttribute('data'),
        item = products.items[i];

    for (let j = 0; basket.shopList[j]; ++j) {
      let list = basket.shopList[j];
      if (item.code === list.code) {
        list.qty += 1;
        document.querySelector('.front-cart').innerHTML = '(' + actions.countTotal() + ')';
        basket.showBasket();
        return;
      }
    }

    obj.code = item.code;
    obj.name = item.name + ' ' + item.brand + ' ' + item.taste + ', '
               + item.sizeG + 'g';
    obj.price = item.price;
    obj.qty = 1;
    obj.subtotal = item.price;
    basket.shopList.push(obj);
    document.querySelector('.front-cart').innerHTML = '(' + actions.countTotal() + ')';
    basket.showBasket();
  },
  openBasket: function() {
    if (basket.total === 0)
      return;
    document.querySelector('main').setAttribute('class', ' hidden');
    let tmp = document.querySelector('.basket');
    tmp.removeAttribute('class');
    tmp.setAttribute('class', 'basket');
    crumbs.addCrumb('cart');
  },
  closeBasket: function() {
    let tmp = document.querySelector('main');
    tmp.removeAttribute('class', ' hidden');
    tmp.setAttribute('class', 'page');
    document.querySelector('.basket').setAttribute('class', 'basket hidden');
    crumbs.removeCrumb();

    const myNode = document.querySelector('.cart-items');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  },
  decreaseAmount: function() {
    let code = event.target.getAttribute('code');
    code = Number(code);
    for (let i in basket.shopList) {
      if (basket.shopList[i].code === code) {
        basket.shopList[i].qty -= 1;
        // if (basket.shopList[i].qty)
          // delete
        event.target.innerHTML = basket.shopList[i].qty;
      }
    }
  },
  decreaseAmount: function() {
    let code = event.target.getAttribute('code');
    code = Number(code);
    for (let i in basket.shopList) {
      if (basket.shopList[i].code === code) {
        basket.shopList[i].qty += 1;
        // if (basket.shopList[i].qty)
          // delete
        event.target.innerHTML = basket.shopList[i].qty;
      }
    }
  },
}

// let increaseAmount = () => {

// }
// let deleteAmount = () => {

// }

let init = () => {
  products.showItems();
  basket.showBasket();

  document.querySelectorAll('.item_add')
          .forEach(item => item.addEventListener('click', view.addToBasket));
  document.querySelector('.header-basket').onclick = view.openBasket;
  document.querySelector('.continue').onclick = view.closeBasket;

  if (document.querySelector('.cart-button-decrease'))
    document.querySelector('.cart-button-decrease').onclick = view.decreaseAmount;
  if (document.querySelector('.cart-button-increase'))
    document.querySelector('.cart-button-increase').onclick = view.increaseAmount;
}

window.onload = init;
