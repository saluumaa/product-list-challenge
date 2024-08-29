// let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
// [
//     {
//         productId: '1',
//         name: 'Waffle with Berries',
//         quantity: 4,
//         price: 4.90,
//     },
//     {
//         productId: '2',
//         name: 'Chocolate Cake',
//         quantity: 2,
//         price: 3.50,
//     },
// ];

// function saveCart() {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }



// fetch('./data.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         let productElements = '';
//         data.forEach(product => {
//             productElements += `
//             <section class="dessert" data-product-id=${product.id}>
//               <div class="dessert-image">
//                 <img src=${product.image.mobile} alt="Waffle with Berries" class="mobile-img">
//                 <img src=${product.image.tablet} alt="Waffle with Berries" class="tablet-img">
//                 <img src=${product.image.desktop} alt="Waffle with Berries" class="desktop-img">

//                 <button class="add-to-cart" data-product-id="${product.id}">
//                   <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart">
//                        Add to Cart
//                 </button>
//                   <div class="cart-quantity" data-product-id="${product.id}" style="display:none;">
//                    <img src="./assets/images/icon-decrement-quantity.svg" class="decrement-quantity" alt="icon-decrement-quantity">
//                     <p>0</p>
//                   <img src="./assets/images/icon-increment-quantity.svg" class="increment-quantity" alt="Add Item">
//                   </div>
//               </div>
//               <div class="dessert-info">
//                 <h2>${product.name}</h2>
//                 <h3>${product.category}</h3>
//                 <p>$${product.price}</p>
//               </div>
//               </section>
//             `;
//         });

//         document.querySelector('.dessert-wrapper').innerHTML = productElements;

//         document.querySelectorAll('.add-to-cart').forEach(button => {
//             button.addEventListener('click', (event) => {
//                 let productId = button.dataset.productId;
//                 console.log("Button Product ID:", productId);

//                 let productData = data.find(product => {
//                     console.log("Checking Product ID:", product.id, "against", productId);
//                     return product.id == productId;
//                 });

//                 console.log("Found Product Data:", productData);

//                 if (!productData) {
//                     console.error(`No product data found for product ID: ${productId}`);
//                     return;
//                 }
//                 console.log('Product added to cart:', productData);

//                 button.style.display = 'none';

//                 const cartQuantityElement = document.querySelector(`.cart-quantity[data-product-id="${productId}"]`);
//                 if (cartQuantityElement) {
//                     cartQuantityElement.style.display = 'flex';
//                 } else {
//                     console.error(`No cart-quantity element found for product ID: ${productId}`);
//                 }

//                 addProductToCart(productId, cartQuantityElement, productData);
//                 saveCart();
//                 renderCart();

//             });
//         });
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });


// function addProductToCart(productId, cartQuantityElement, productData) {
//     let existingProduct = cart.find(cartItem => cartItem.productId === productId);
//     if (existingProduct) {
//         existingProduct.quantity++;
//     } else {
//         cart.push({
//             productId: productId,
//             name: productData.name,
//             quantity: 1,
//             price: productData.price,
//             image: productData.image,
//         });
//     }


//     cartQuantityElement.querySelector('p').textContent = cart.find(cartItem => cartItem.productId === productId).quantity;

//     cartQuantityElement.querySelector('.increment-quantity').addEventListener('click', () => {
//         incrementQuantity(productId, cartQuantityElement);
//     });

//     cartQuantityElement.querySelector('.decrement-quantity').addEventListener('click', () => {
//         decrementQuantity(productId, cartQuantityElement);
//     });

//     saveCart();

//     renderCart();
// }

// function incrementQuantity(productId, cartQuantityElement) {
//     let cartItem = cart.find(item => item.productId === productId);
//     if (cartItem) {
//         cartItem.quantity++;
//         cartQuantityElement.querySelector('p').textContent = cartItem.quantity;
//         saveCart();
//         renderCart();
//     }
// }

// function decrementQuantity(productId, cartQuantityElement) {
//     let cartItem = cart.find(item => item.productId === productId);
//     if (cartItem && cartItem.quantity > 1) {
//         cartItem.quantity--;
//         cartQuantityElement.querySelector('p').textContent = cartItem.quantity;
//     } else if (cartItem && cartItem.quantity === 1) {
//         cart = cart.filter(item => item.productId !== productId);
//         cartQuantityElement.style.display = 'none';
//         document.querySelector(`.add-to-cart[data-product-id="${productId}"]`).style.display = 'block';
//     }
//     saveCart();
//     renderCart();
// }

// function renderCart() {
//     let totalPrice = 0;
//     let cartQuantity = 0;
//     let cartElements = '';

//     // console.log('Cart:', productData);

//     cart.forEach(cartItem => {
//         totalPrice += cartItem.quantity * cartItem.price;
//         cartQuantity += cartItem.quantity;

//         cartElements += `
//         <section class="cart-item">
//             <p class="item-name">${cartItem.name}</p>
//             <div class="unit-price-wrap">
//                 <div class="unit-price">
//                     <p class="unit">${cartItem.quantity}x</p>
//                     <p class="per-unit-price">@ $${cartItem.price}</p>
//                     <p class="total-price">$${(cartItem.quantity * cartItem.price).toFixed(2)}</p>
//                 </div>
//                 <button class="remove-item" data-product-id="${cartItem.productId}">
//                     <img class="remove-item" src="./assets/images/icon-remove-item.svg" alt="Remove Item">
//                 </button>
//             </div>
//         </section>
//         <hr>
             
//         `;
//     });

//     cartElements += `
//     <section class="cart-item order-total">
//         <div class="order-name">
//             <p>Order Total</p>
//         </div>
//         <div class="total-price">
//             <p>$${totalPrice.toFixed(2)}</p>
//         </div>
//     </section>
//     <div class="confirm-order">
//         <div class="delivery-type">
//             <p class="type">
//                 <img src="./assets/images/favicon-32x32.png" alt="icon-delivery">
//                 This is a carbon-neutral delivery
//             </p>
//         </div>
//         <button class="confirm">Confirm Order</button> 
//     </div>
//     `;


//     document.querySelector('.cart').innerHTML = cartElements;
//     document.querySelector('.cart').style.display = cart.length > 0 ? 'flex' : 'none';

//     document.querySelectorAll('.remove-item').forEach(remButton => {
//         remButton.addEventListener('click', () => {
//             removeProductFromCart(remButton.dataset.productId);
//             renderCart();
//         });
//     });

//     document.querySelector('.confirm').addEventListener('click', () => {
//         confirmOrder();
//     });
// }

// function removeProductFromCart(productId) {
//     cart = cart.filter(cartItem => cartItem.productId !== productId);
//     saveCart();
//     renderCart();
// }

// function confirmOrder() {
//     let totalPrice = 0;
//     let cartElements = '';

//     cart.forEach(cartItem => {
//         totalPrice += cartItem.quantity * cartItem.price;

//         cartElements += `
//             <div class="items-wrapper">
//                 <img src="${cartItem.thumbnail}" class="thumbnail-img" alt="${cartItem.name}">
//                 <div class="item-name-units-wrap">
//                     <p class="item-name">${cartItem.name}</p>
//                     <div class="unit-price-wrap">
//                         <div class="unit-price">
//                             <p class="unit">${cartItem.quantity} x</p>
//                             <p class="per-unit-price">@ $${cartItem.price.toFixed(2)}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="total-price">
//                     <p>$${(cartItem.quantity * cartItem.price).toFixed(2)}</p>
//                 </div>
//             </div>
//             <hr>
//         `;
//     });

//     // Generate the confirmation HTML
//     let confirmationHtml = `
//         <div class="order-confirmation">
//             <img src="./assets/images/icon-order-confirmed.svg" alt="Order Confirmed">
//             <h1>Order Confirmed</h1>
//             <p>Order confirmed! Your dessert will be delivered soon.</p>
//         </div>
//         <section class="confirm-order-items">
//             <div class="items-total-wrapper">
//                 ${cartElements}
//             </div>
//             <div class="total-order-container">
//                 <div class="order-name">
//                     <p>Order Total</p>
//                 </div>
//                 <div class="total-price">
//                     <p>$${totalPrice.toFixed(2)}</p>
//                 </div>
//             </div>
//             <button class="new-order">Start New Order</button>
//         </section>
//     `;

//     document.querySelector('.confirmed-order').style.display = 'flex';
//     document.querySelector('.confirmed-order').innerHTML = confirmationHtml;
    

//     cart = [];
//     saveCart();

//     document.querySelector('.new-order').addEventListener('click', () => {
//         document.querySelector('.confirmed-order').style.display = 'none' // Clear confirmation
//         document.querySelector('.cart').style.display = 'none'; 
//         document.querySelectorAll('.add-to-cart').forEach(button => button.style.display = 'block');
//         document.querySelectorAll('.cart-quantity').forEach(quantity => quantity.style.display = 'none');
//     });
// }


// renderCart();



import { cart, saveCart, addProductToCart, renderCart } from './cart.js';

fetch('./data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let productElements = '';
        data.forEach(product => {
            productElements += `
            <section class="dessert" data-product-id=${product.id}>
              <div class="dessert-image">
                <img src=${product.image.mobile} alt="${product.name}" class="mobile-img">
                <img src=${product.image.tablet} alt="${product.name}" class="tablet-img">
                <img src=${product.image.desktop} alt="${product.name}" class="desktop-img">

                <button class="add-to-cart" data-product-id="${product.id}">
                  <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart">
                       Add to Cart
                </button>
                  <div class="cart-quantity" data-product-id="${product.id}" style="display:none;">
                   <img src="./assets/images/icon-decrement-quantity.svg" class="decrement-quantity" alt="icon-decrement-quantity">
                    <p>0</p>
                  <img src="./assets/images/icon-increment-quantity.svg" class="increment-quantity" alt="Add Item">
                  </div>
              </div>
              <div class="dessert-info">
                <h2>${product.name}</h2>
                <h3>${product.category}</h3>
                <p>$${product.price}</p>
              </div>
              </section>
            `;
        });

        document.querySelector('.dessert-wrapper').innerHTML = productElements;

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                let productId = button.dataset.productId;
                console.log("Button Product ID:", productId);

                let productData = data.find(product => product.id == productId);

                if (!productData) {
                    console.error(`No product data found for product ID: ${productId}`);
                    return;
                }

                button.style.display = 'none';

                const cartQuantityElement = document.querySelector(`.cart-quantity[data-product-id="${productId}"]`);
                if (cartQuantityElement) {
                    cartQuantityElement.style.display = 'flex';
                } else {
                    console.error(`No cart-quantity element found for product ID: ${productId}`);
                }

                addProductToCart(productId, cartQuantityElement, productData);
            });
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

renderCart();
