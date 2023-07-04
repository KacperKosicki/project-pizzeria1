import {settings, select, classNames, templates} from '../settings.js';
import { utils } from '../utils.js';
import CartProduct from './CartProduct.js';

class Cart {
  constructor(element) {
    const thisCart = this;

    thisCart.products = [];

    thisCart.getElements(element);
    thisCart.initActions();

  }

  getElements(element) {
    const thisCart = this;

    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);

    thisCart.dom.deliveryFee = document.querySelector(select.cart.deliveryFee);
    thisCart.dom.subtotalPrice = document.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = document.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = document.querySelector(select.cart.totalNumber);
    this.dom.phone = this.dom.wrapper.querySelector(select.cart.phone);
    this.dom.address = this.dom.wrapper.querySelector(select.cart.address);

    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);

  }

  initActions() {
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function(){
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });

    thisCart.dom.productList.addEventListener('remove', function (event) {
      thisCart.remove(event.detail.cartProduct);
    });

    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;

    const payload = {
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: thisCart.totalPrice,
      subtotalPrice: thisCart.subtotalPrice,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.deliveryFee,
      products: []
    };

    for(let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
    
  add(menuProduct) {
    const thisCart = this;

    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);

    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    thisCart.update();
  }

  update() {
    const thisCart = this;
    
    const deliveryFee = settings.cart.defaultDeliveryFee;
    let totalNumber = 0;
    let subtotalPrice = 0;
    
    for (const product of thisCart.products) {
      totalNumber += product.amount;
      subtotalPrice += product.price;
    }
    
    thisCart.totalPrice = subtotalPrice + deliveryFee;
    
    if (thisCart.products.length === 0) {
      thisCart.totalPrice = 0;
    }
    
    thisCart.dom.deliveryFee.textContent = deliveryFee;
    thisCart.dom.subtotalPrice.textContent = subtotalPrice;
    for (const totalPriceElement of thisCart.dom.totalPrice) {
      totalPriceElement.textContent = thisCart.totalPrice;
    }
    thisCart.dom.totalNumber.textContent = totalNumber;
  }

  remove(cartProduct) {
    const thisCart = this;
    
    const productIndex = thisCart.products.indexOf(cartProduct);
    if (productIndex !== -1) {
      thisCart.products.splice(productIndex, 1);
    }
    
    cartProduct.dom.wrapper.remove();
    thisCart.update();
  }
}

export default Cart;