'use strict';

let products = {
  items: [
    { code: 1,name: 'Jam',brand: 'St.Dalfout',taste: 'pineapple',sizeG: 284,
      price: 9.99,amountAvailable: 0,description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    },
    { code: 2,name: 'Jam',brand: 'St.Dalfout',taste: 'pineapple',sizeG: 284,
      price: 9.99,amountAvailable: 2,description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    },
    { code: 3,name: 'Jam',brand: 'St.Dalfout',taste: 'pineapple',sizeG: 284,
      price: 12.99,amountAvailable: 10,description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    },
    { code: 4,name: 'Jam',brand: 'St.Dalfout',taste: 'pineapple',sizeG: 284,
      price: 12.99,amountAvailable: 10,description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    },
    { code: 5,name: 'Jam',brand: 'St.Dalfout',taste: 'pineapple',sizeG: 284,
      price: 12.99,amountAvailable: 10,description: 'Very tasty jam.',
      image: '/images/products/pineapple.jpg'
    },
    { code: 6,name: 'Jam',brand: 'St.Dalfout',taste: 'pineapple',sizeG: 284,
      price: 12.99,amountAvailable: 10,description: 'Very tasty jam.',
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

      if (item.amountAvailable !== 0) {
        p1 = document.createElement('a');
        p1.setAttribute('href', '#');
        p1.setAttribute('data', i);
        p1.className = 'item_add button';
        p1.innerHTML = 'Add to Cart';
        p.appendChild(p1);
      }
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

let basket = {
  total: 0,
  shopList: [],
  showBasket: function() {
    let elem = document.querySelector('.cart-items');

    actions.recountBasket();

    if (elem.firstChild)
      while (elem.firstChild)
        elem.removeChild(elem.lastChild);

    for (let i in this.shopList) {
      this.showBasketItem(elem, this.shopList[i], i);
    }
    document.querySelector('.cart-numTotal').innerHTML = '\$' + this.total;
  },
  // name, price, qty (+-), subtotal, remove button
  showBasketItem: function(elem, shopList, i) {
    let node, p, p1, p2;

    node = document.createElement('div');
    node.setAttribute('id', `item${i}`);
    node.className = 'cart-item';

    p1 = document.createElement('div');

      p = document.createElement('h5');
      p.className = 'cart-name';
      p.innerHTML = shopList.name;
      p1.appendChild(p);

      p = document.createElement('div');
      p.className = 'cart-qty';

        p2 = document.createElement('a');
        p2.setAttribute('href', '#');
        p2.className = 'cart-button-decrease';
        p2.innerHTML = '-';
        p.appendChild(p2);

        p2 = document.createElement('span');
        p2.setAttribute('code', shopList.code);
        p2.className = 'item-qty';
        p2.innerHTML = shopList.qty;
        p.appendChild(p2);

        p2 = document.createElement('a');
        p2.setAttribute('href', '#');
        p2.className = 'cart-button-increase';
        p2.innerHTML = '+';
        p.appendChild(p2);

        p2 = document.createElement('a');
        p2.setAttribute('href', '#');
        p2.setAttribute('itemInBasket', i);
        p2.className = 'cart-remove';
        p2.innerHTML = '+';
        p.appendChild(p2);

      p1.append(p);
    node.append(p1);

    p1 = document.createElement('span');
    p1.className = 'cart-subtotal';
    p1.innerHTML = shopList.subtotal;
    p.appendChild(p1);
    node.append(p1);

    elem.appendChild(node);
  }
}
