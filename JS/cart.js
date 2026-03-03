const cartContainer = document.querySelector('#cart-container');
const totalPriceElement = document.querySelector('#total-price');


function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const image = document.createElement('img');
        image.src = item.image;
        image.classList.add('cart-img');

        const title = document.createElement('h3');
        title.textContent = item.title;
        title.classList.add('cart-title');

        const price = document.createElement('p');
        price.textContent = `$${item.price}`;
        price.classList.add('cart-price');

        const quantityWrapper = document.createElement('div');
        quantityWrapper.classList.add('cart-quantity');

        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.classList.add('cart-quantity-button');
        decreaseBtn.addEventListener('click', () => {
            decreaseQuantity(index);
        });
        
        const quantity = document.createElement('span');
        quantity.textContent = item.quantity;
        quantity.classList.add('number');
        
        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.classList.add('cart-quantity-button');
        increaseBtn.addEventListener('click', () => {
            increaseQuantity(index);
        });
        
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fa-solid fa-trash cart-remove"></i>'
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        quantityWrapper.appendChild(decreaseBtn);
        quantityWrapper.appendChild(quantity);
        quantityWrapper.appendChild(increaseBtn);

        cartItem.appendChild(title);
        cartItem.appendChild(image);
        cartItem.appendChild(price);
        cartItem.appendChild(quantityWrapper);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);

        total += item.price * item.quantity;
        
    });
    totalPriceElement.textContent = `Total: $${total}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

    updateCartCount(-1);
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(1);
}

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

function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItemCount = totalItems;
    updateCartCount(0);
}

loadCartCount();
displayCart();



const form = document.querySelector('.cart-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const successBox = document.querySelector('.success');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (nameValue === '') {
        alert('Name field cannot be empty!');
    } 
    if (emailValue === '') {
        alert('Email field cannot be empty!');
    } else {
        successBox.classList.add('active');
    }
});