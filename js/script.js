'use strict';

let products = {
  items: [
    { name: 'Jam',
      brand: 'St.Dalfout',
      taste: 'pineapple',
      sizeG: 284,
      price: 9.99,
      amountAvailable: 0,
      description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    },
    { name: 'Jam',
      brand: 'St.Dalfout',
      taste: 'pineapple',
      sizeG: 284,
      price: 9.99,
      amountAvailable: 2,
      description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    },
    { name: 'Jam',
      brand: 'St.Dalfout',
      taste: 'pineapple',
      sizeG: 284,
      price: 12.99,
      amountAvailable: 10,
      description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    }
  ],
  showItems: function() {
    let elem = document.querySelector('.container');
    for (let i in this.items)
      this.showItem(elem, this.items[i], i);
  },
  showItem: function(elem, item, i) {
    let node, shelf, p, p1;

    node = document.createElement('div');
    node.className = 'one-third column';
    shelf = document.createElement('div');
    shelf.className = 'shelfItem';

    p = document.createElement('img');
    p.className = 'item_thumb';
    p.setAttribute('src', item.image);
    shelf.appendChild(p);

    p = document.createElement('h5');
    p.className = 'item_name';
    p.innerHTML = item.name + ' ' + item.brand + ' ' + item.taste + ', ' + item.sizeG + 'g';
    shelf.appendChild(p);

    p = document.createElement('p');
    p.className = 'item_description';
    p.innerHTML = item.description;
    shelf.appendChild(p);

    p = document.createElement('div');
    p.className = 'shelfDescribe';
      p1 = document.createElement('span');
      p1.className = 'item_price';
      p1.innerHTML = '\$' + item.price;
      p.appendChild(p1);

      p1 = document.createElement('a');
      p1.setAttribute('href', '#');
      p1.setAttribute('data', i);
      p1.className = 'item_add button';
      p1.innerHTML = 'Add to Cart';
      p.appendChild(p1);
    shelf.appendChild(p);

    p = document.createElement('span');
    if (item.amountAvailable === 0) {
      p.className = 'notavlb';
      p.innerHTML = 'not available';
    } else {
      p.className = 'avlb';
      p.innerHTML = 'available';
      if (item.amountAvailable <= 3)
        p.innerHTML = 'last ' + item.amountAvailable + ' available';
    }
    shelf.appendChild(p);

    node.appendChild(shelf);
    elem.appendChild(node);
  }
}


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
let basket = {
  total: 0,
  shopList: []
}

let view = {
  // name, price, qty (+-), subtotal, remove button
  addToBasket: function() {
    let obj = {},
        i = event.target.getAttribute('data'),
        item = products.items[i];

    obj.name = item.name + ' ' + item.brand + ' ' + item.taste + ', '
               + item.sizeG + 'g';
    obj.price = item.price;
    obj.qty = 1;
    obj.subtotal = item.price;
    basket.total += item.price;
    basket.shopList.push(obj);
    console.log(basket.shopList);
  },
  openBasket: function() {
    if (basket.total === 0)
      return;
    // showBasket
    document.querySelector('main').setAttribute('class', ' hidden');
    let tmp = document.querySelector('.basket');
    tmp.removeAttribute('class');
    tmp.setAttribute('class', 'basket');
    crumbs.addCrumb('cart');
  },
  closeBasket: function() {
    document.querySelector('main').removeAttribute('class', ' hidden');
    document.querySelector('.basket').setAttribute('class', 'basket hidden');
    crumbs.removeCrumb();
  }
}


let init = () => {
  products.showItems();

  document.querySelectorAll('.item_add')
          .forEach(item => item.addEventListener('click', view.addToBasket));
  // console.log(document.querySelectorAll('.item_add'));
  document.querySelector('.header-basket').onclick = view.openBasket;
  document.querySelector('.continue').onclick = view.closeBasket;


}

window.onload = init;
