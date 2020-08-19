'use strict';

let products = {
  items: [
    { code: 14,name: 'Jam',brand: 'J\'ELITE',taste: 'orange rum',sizeG: 220,
      price: 8.99,amountAvailable: 1,description: 'Ukrainian candied.',
      image: 'https://i.postimg.cc/dtpZxL0L/14.png'
    },
    { code: 15,name: 'Jam',brand: 'J\'ELITE',taste: 'strawberry basil tomato',sizeG: 220,
      price: 8.99,amountAvailable: 2,description: 'Ukrainian candied.',
      image: 'https://i.postimg.cc/wjNR8gtF/15.png'
    },
    { code: 1,name: 'Jam',brand: 'St.Dalfout',taste: 'blueberry',sizeG: 284,
      price: 9.99,amountAvailable: 0,description: 'Very tasty jam.',
      image: 'https://i.postimg.cc/13SBjCXg/1.jpg'
    },
    { code: 2,name: 'Jam',brand: 'St.Dalfout',taste: 'fig',sizeG: 284,
      price: 9.99,amountAvailable: 2,description: 'Very tasty jam.',
      image: 'https://i.postimg.cc/4Ndp0DbF/2.jpg'
    },
    { code: 3,name: 'Jam',brand: 'St.Dalfout',taste: 'raspberry',sizeG: 284,
      price: 9.99,amountAvailable: 10,description: 'Very tasty jam.',
      image: 'https://i.postimg.cc/J42jCpp7/3.jpg'
    },
    { code: 4,name: 'Jam',brand: 'St.Dalfout',taste: 'orange',sizeG: 170,
      price: 6.99,amountAvailable: 10,description: 'Very tasty jam.',
      image: 'https://i.postimg.cc/kgRKJWHQ/4.jpg'
    },
    { code: 5,name: 'Jam',brand: 'St.Dalfout',taste: 'pineapple',sizeG: 284,
      price: 9.99,amountAvailable: 10,description: 'Very tasty jam.',
      image: 'https://i.postimg.cc/6QsRyysD/5.jpg'
    },
    { code: 6,name: 'Jam',brand: 'Chantaine',taste: 'cranberry',sizeG: 325,
      price: 11.99,amountAvailable: 10,description: 'Natural jam, made in France.',
      image: 'https://i.postimg.cc/9fG9TCCz/6.jpg'
    },
    { code: 7,name: 'Jam',brand: 'Chantaine',taste: 'pineapple',sizeG: 325,
      price: 11.99,amountAvailable: 10,description: 'Natural jam, made in France.',
      image: 'https://i.postimg.cc/TwfDJF30/7.jpg'
    },
    { code: 8,name: 'Jam',brand: 'Chantaine',taste: 'cherry',sizeG: 325,
      price: 11.99,amountAvailable: 10,description: 'Natural jam, made in France.',
      image: 'https://i.postimg.cc/NMDrJDyc/8.jpg'
    },
    { code: 9,name: 'Jam Chyawanprash',brand: 'Dabur',taste: 'mango',sizeG: 500,
      price: 20.99,amountAvailable: 0,description: 'Product of India for your health.',
      image: 'https://i.postimg.cc/nrL96m7Q/9.jpg'
    },
    { code: 10,name: 'Jam Chyawanprash',brand: 'Dabur',taste: 'classic',sizeG: 500,
      price: 20.99,amountAvailable: 1,description: 'Product of India for your health.',
      image: 'https://i.postimg.cc/XN2C92SK/10.jpg'
    },
    { code: 11,name: 'Jam',brand: 'Bionerica',taste: 'sea buckthorn',sizeG: 200,
      price: 2.99,amountAvailable: 10,description: 'Natural jam, made in Ukraine.',
      image: 'https://i.postimg.cc/KvRgfnx6/11.png'
    },
    { code: 12,name: 'Jam Chyawanprash',brand: 'Triuga',taste: 'sugar free',sizeG: 500,
      price: 21.99,amountAvailable: 3,description: 'Indian jam, for your health.',
      image: 'https://i.postimg.cc/hv3QgGbZ/12.jpg'
    },
    { code: 13,name: 'Jam',brand: 'Bionerica',taste: 'cranberry',sizeG: 200,
      price: 2.99,amountAvailable: 2,description: 'Natural jam, made in Ukraine.',
      image: 'https://i.postimg.cc/KYykmwBb/13.png'
    }
  ],
  sortCheap: false,
  sortExpen: false,
  showFilteredItems: function(arr) {
    let elem = document.querySelector('.container');

    if (elem.firstChild)
      while (elem.firstChild)
        elem.removeChild(elem.lastChild);

    for (let i in this.items) {
      for (let j = 0; j < arr.length; ++j) {
        if (this.items[i].brand === arr[j]) {
          this.showItem(elem, this.items[i]);
          break;
        }
      }
    }
  },
  showItems: function() {
    let elem = document.querySelector('.container');

    if (elem.firstChild)
      while (elem.firstChild)
        elem.removeChild(elem.lastChild);

    for (let i in this.items)
      this.showItem(elem, this.items[i]);
  },
  showItem: function(elem, item) {
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

      p1 = document.createElement('input');
      p1.setAttribute('code', item.code);
      p1.setAttribute('value', 'Add to Cart');
      if (item.amountAvailable !== 0) {
        p1.setAttribute('type', 'button');
        p1.className = 'item_add button';
      }
      else
        p1.className = 'button-empty';
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
    document.querySelector('.cart-numTotal').innerHTML = '\$' + this.total.toFixed(2);
  },
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
        p2.setAttribute('code', shopList.code);
        p2.setAttribute('onclick', 'view.decreaseAmount()');
        p2.className = 'cart-button-decrease';
        p2.innerHTML = '-';
        p.appendChild(p2);

        p2 = document.createElement('span');
        p2.className = 'item-qty';
        p2.innerHTML = shopList.qty;
        p.appendChild(p2);

        p2 = document.createElement('a');
        p2.setAttribute('href', '#');
        p2.setAttribute('code', shopList.code);
        p2.setAttribute('onclick', 'view.increaseAmount()');
        p2.className = 'cart-button-increase';
        p2.innerHTML = '+';
        p.appendChild(p2);

        p2 = document.createElement('a');
        p2.setAttribute('href', '#');
        p2.setAttribute('code', shopList.code);
        p2.setAttribute('onclick', 'view.removeFromCart()');
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
