const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.myCart');
const cartClose = document.querySelector('#cart-close');
cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));


const addCartButtons = document.querySelectorAll('.shop-button')
addCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const gameContainer = event.target.closest('.game-container');
        addToCart(gameContainer)
    });
});

const cartContent = document.querySelector('.cart-content');
const addToCart = gameContainer => {
    const gameImgSrc = gameContainer.querySelector('img').src;
    const gameTitle = gameContainer.querySelector('.game-title').textContent;
    const gamePrice = gameContainer.querySelector('.price').textContent;

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.innerHTML = 
        `<img src=${gameImgSrc} class="cart-img">
        <div class="cart-detail">
        <p class="cart-product-title">${gameTitle}<p>
         <span class="cart-price">${gamePrice}</span>
        <div class="cart-quantity">
        <button id="decrement">-</button>
        <span class="number">1</span>
        <button id="increment">+</button>
        </div>
        </div>
        <i class="fa-solid fa-trash-can cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);
    localStorage.setItem('shoppingCart', JSON.stringify(gameContainer));

    cartBox.querySelector('.cart-remove').addEventListener('click', () => {
        cartBox.remove();

        updateCartCount(-1)
    });

    cartBox.querySelector('.cart-quantity').addEventListener('click', event => {
        const numberElement = cartBox.querySelector('.number');
        const decrementButton = cartBox.querySelector('#decrement');
        let quantity = numberElement.textContent;

        if (event.target.id === 'decrement' && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = '#999';
            }
        } else if (event.target.id === 'increment') {
            quantity++;
            decrementButton.style.color = '#333';
        }
        numberElement.textContent = quantity;

    });
    updateCartCount(1);

};

    const updateTotalPrice = () => {
        const totalPriceElement = document.querySelector('.total-price');
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        let total = 0;
        cartBoxes.forEach(cartBox => {
            const priceElement = cartBox.querySelector('.cart-price');
            const quantityElement = cartBox.querySelector('.number');
            const price = priceElement.textContent.replace('$', '');
            const quantity = quantityElement.textContent;
            total += price * quantity;
        });
        totalPriceElement.textContent = `$${total}`;            
    };

    updateTotalPrice();

  

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector('.cart-count');
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = 'visible';
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = 'hidden';
        cartItemCountBadge.textContent = '';      
    }
};

const form = document.querySelector('.cart-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('card-number');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const cardNumberValue = cardNumberInput.value.trim();

    if (nameValue === '') {
        alert('Name field cannot be empty!');
    } else {
        console.log('Name:', nameValue);
    }
    if (emailValue === '') {
        alert('Email field cannot be empty!');
    } else {
        console.log('Email:', emailValue);
    }
    if (cardNumberValue === '') {
        alert('Card number cannot be empty!');
    } else {
        console.log('Card-number:', cardNumberValue);
    }
});






