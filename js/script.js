'use strict';

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
    for (let i = 0; i < basket.shopList.length; ++i) {
      list = basket.shopList[i];
      list.subtotal = list.price * list.qty;
      basket.total += list.subtotal;
    }
  }
}


let view = {
  addToBasket: function() {
    let obj = {},
        code = +event.target.getAttribute('code'),
        item;

    console.log(code, products.items.length);

    for (let i = 0; i < products.items.length; ++i) {
      if (products.items[i].code === code) {
        item = products.items[i];
        break;
      }
    }

    for (let j = 0; j < basket.shopList.length; ++j) {
      let list = basket.shopList[j];
      if (item.code === list.code) {
        if (list.qty < list.amount) {
          list.qty += 1;
          document.querySelector('.front-cart').innerHTML = '(' + actions.countTotal() + ')';
          basket.showBasket();
        }
        return;
      }
    }
    obj.code = item.code;
    obj.amount = item.amountAvailable;
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
    let tmp = document.querySelector('.basket');
    tmp.removeAttribute('class');
    tmp.setAttribute('class', 'basket');
    crumbs.addCrumb('cart');
  },
  closeBasket: function() {
    document.querySelector('.basket').setAttribute('class', 'basket hidden');
    crumbs.removeCrumb();
  },
  decreaseAmount: function() {
    let code = event.target.getAttribute('code');
    code = Number(code);
    for (let i in basket.shopList) {
      if (basket.shopList[i].code === code) {
        if (basket.shopList[i].qty === 1) {
          basket.shopList.splice(i, 1);
        } else
          basket.shopList[i].qty -= 1;
        break;
      }
    }
    basket.showBasket();
  },
  increaseAmount: function() {
    let code = event.target.getAttribute('code');
    code = Number(code);
    for (let i in basket.shopList) {
      if (basket.shopList[i].code === code) {
        if (basket.shopList[i].qty < basket.shopList[i].amount)
          basket.shopList[i].qty += 1;
        break;
      }
    }
    basket.showBasket();
  },
  removeFromCart: function() {
    let code = event.target.getAttribute('code');
    code = Number(code);
    for (let i in basket.shopList) {
      if (basket.shopList[i].code === code) {
        basket.shopList.splice(i, 1);
        break;
      }
    }
    basket.showBasket();
  },
  sort: function() {
    let select = event.target;

    if (select.selectedIndex === 1 && !products.sortCheap) {
      products.sortCheap = true;
      products.sortExpen = false;
      products.items.sort((a, b) => (a.price > b.price) ? 1 : -1);
    }
    else if (select.selectedIndex === 2 && !products.sortExpen) {
      products.sortCheap = false;
      products.sortExpen = true;
      products.items.sort((a, b) => (a.price < b.price) ? 1 : -1);
    }
    products.showItems();
    document.querySelectorAll('.item_add')
          .forEach(item => item.addEventListener('click', view.addToBasket));
  },
  filters: function() {
    let arr = [],
        boxes = document.querySelectorAll('.check-brand');
    for (let i = 0; i < boxes.length; ++i)
      if (boxes[i].checked) {
        arr.push(boxes[i].getAttribute('value'));
      }

    if (arr.length !== 0)
      products.showFilteredItems(arr);
    else
      products.showItems();

    document.querySelectorAll('.item_add')
            .forEach(item => item.addEventListener('click', view.addToBasket));
  }
}


let init = () => {
  products.showItems();

  document.querySelector('.sort-select').onchange = view.sort;
  document.querySelectorAll('.item_add')
          .forEach(item => item.addEventListener('click', view.addToBasket));
  document.querySelectorAll('.check-brand')
          .forEach(item => item.addEventListener('change', view.filters));
  document.querySelector('.header-basket').onclick = view.openBasket;
  document.querySelector('.continue').onclick = view.closeBasket;
}

window.onload = init;
