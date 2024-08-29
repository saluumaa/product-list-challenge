export let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addProductToCart(productId, cartQuantityElement, productData) {
    let existingProduct = cart.find(cartItem => cartItem.productId === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            productId: productId,
            name: productData.name,
            quantity: 1,
            price: productData.price,
            image: productData.image.thumbnail,
        });
    }

    cartQuantityElement.querySelector('p').textContent = cart.find(cartItem => cartItem.productId === productId).quantity;

    cartQuantityElement.querySelector('.increment-quantity').addEventListener('click', () => {
        incrementQuantity(productId, cartQuantityElement);
    });

    cartQuantityElement.querySelector('.decrement-quantity').addEventListener('click', () => {
        decrementQuantity(productId, cartQuantityElement);
    });

    saveCart();
    renderCart();
}

function incrementQuantity(productId, cartQuantityElement) {
    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity++;
        cartQuantityElement.querySelector('p').textContent = cartItem.quantity;
        saveCart();
        renderCart();
    }
}

function decrementQuantity(productId, cartQuantityElement) {
    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        cartQuantityElement.querySelector('p').textContent = cartItem.quantity;
    } else if (cartItem && cartItem.quantity === 1) {
        cart = cart.filter(item => item.productId !== productId);
        cartQuantityElement.style.display = 'none';
        document.querySelector(`.add-to-cart[data-product-id="${productId}"]`).style.display = 'block';
    }
    saveCart();
    renderCart();
}

export function renderCart() {
    let totalPrice = 0;
    let cartElements = '';

    cart.forEach(cartItem => {
        totalPrice += cartItem.quantity * cartItem.price;

        cartElements += `
        <section class="cart-item">
            <p class="item-name">${cartItem.name}</p>
            <div class="unit-price-wrap">
                <div class="unit-price">
                    <p class="unit">${cartItem.quantity}x</p>
                    <p class="per-unit-price">@ $${cartItem.price}</p>
                    <p class="total-price">$${(cartItem.quantity * cartItem.price).toFixed(2)}</p>
                </div>
                <button class="remove-item" data-product-id="${cartItem.productId}">
                    <img class="remove-item" src="./assets/images/icon-remove-item.svg" alt="Remove Item">
                </button>
            </div>
        </section>
        <hr>`;
    });

    cartElements += `
    <section class="cart-item order-total">
        <div class="order-name">
            <p>Order Total</p>
        </div>
        <div class="total-price">
            <p>$${totalPrice.toFixed(2)}</p>
        </div>
    </section>
    <div class="confirm-order">
        <div class="delivery-type">
            <p class="type">
                <img src="./assets/images/favicon-32x32.png" alt="icon-delivery">
                This is a carbon-neutral delivery
            </p>
        </div>
        <button class="confirm">Confirm Order</button> 
    </div>`;

    document.querySelector('.cart').innerHTML = cartElements;
    document.querySelector('.cart').style.display = cart.length > 0 ? 'flex' : 'none';
    document.querySelector('.empty-cart').style.display = cart.length > 0 ? 'none' : 'flex';

    document.querySelectorAll('.remove-item').forEach(remButton => {
        remButton.addEventListener('click', () => {
            removeProductFromCart(remButton.dataset.productId);
            renderCart();
        });
    });

    document.querySelector('.confirm').addEventListener('click', () => {
        confirmOrder();
    });
}

function removeProductFromCart(productId) {
    cart.forEach(item => {
        if (item.productId === productId) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(item => item.productId !== productId);
            }
        }
    });
   
    saveCart();
    renderCart();
}

function confirmOrder() {
    let totalPrice = 0;
    let cartElements = '';

    cart.forEach(cartItem => {
        totalPrice += cartItem.quantity * cartItem.price;

        cartElements += `
            <div class="items-wrapper">
                <img src="${cartItem.image}" class="thumbnail-img" alt="${cartItem.name}">
                <div class="item-name-units-wrap">
                    <p class="item-name">${cartItem.name}</p>
                    <div class="unit-price-wrap">
                        <div class="unit-price">
                            <p class="unit">${cartItem.quantity} x</p>
                            <p class="per-unit-price">@ $${cartItem.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div class="total-price">
                    <p>$${(cartItem.quantity * cartItem.price).toFixed(2)}</p>
                </div>
            </div>
            <hr>`;
    });

    let confirmationHtml = `
        <div class="order-confirmation">
            <img src="./assets/images/icon-order-confirmed.svg" alt="Order Confirmed">
            <h1>Order Confirmed</h1>
            <p>Your dessert will be delivered soon.</p>
        </div>
        <section class="confirm-order-items">
            <div class="items-total-wrapper">
                ${cartElements}
            </div>
            <div class="total-order-container">
                <div class="order-name">
                    <p>Order Total</p>
                </div>
                <div class="total-price">
                    <p>$${totalPrice.toFixed(2)}</p>
                </div>
            </div>
            <button class="new-order">Start New Order</button>
        </section>`;

    document.querySelector('.confirmed-order').style.display = 'flex';
    document.querySelector('.confirmed-order').innerHTML = confirmationHtml;

    cart = [];
    saveCart();

    document.querySelector('.new-order').addEventListener('click', () => {
        document.querySelector('.confirmed-order').style.display = 'none';
        document.querySelector('.cart').style.display = 'none';
        document.querySelector('.empty-cart').style.display = 'flex';
        document.querySelectorAll('.add-to-cart').forEach(button => button.style.display = 'block');
        document.querySelectorAll('.cart-quantity').forEach(quantity => quantity.style.display = 'none');
    });
}
