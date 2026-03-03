const gameUrl = 'https://v2.api.noroff.dev/gamehub';
const gameContainer = document.querySelector('#game-container')

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemBagde = document.querySelector('.cart-count');
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemBagde.style.visibility = 'visible';
        cartItemBagde.textContent = cartItemCount;
    } else {
        cartItemBagde.style.visibility = 'hidden';
        cartItemBagde.textContent = '';
    }
};

function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItemCount = totalItems;
    updateCartCount(0);
}

loadCartCount();


async function fetchGameDetail() {
try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`${gameUrl}/${id}`);
    if (!response.ok) {
    throw new Error(`Error! Status: ${response.status}`);
    }
    const result = await response.json();
    const details = result.data;

    const gameDiv = document.createElement('div');
    gameDiv.classList.add('game-page');

    const image = document.createElement('img');
    image.src = details.image.url;
    image.alt = details.image.alt;
    image.classList.add('game-image');

    const title = document.createElement('h2');
    title.textContent = details.title;
    title.classList.add('game-title')

    const genre = document.createElement('p');
    genre.textContent = details.genre;

    const price = document.createElement('p');
    price.textContent = '$' + details.price;
    price.classList.add('price');

    const description = document.createElement('p');
    description.textContent = details.description;
    description.classList.add('game-description');

    const shopButton = document.createElement('button');
    shopButton.textContent = 'Add to cart';
    shopButton.classList.add('shop-button');

    shopButton.addEventListener('click', () => {
        addToCart(details);
    })

    gameDiv.appendChild(title);
    gameDiv.appendChild(image);
    gameDiv.appendChild(genre);
    gameDiv.appendChild(price);
    gameDiv.appendChild(description);
    gameDiv.appendChild(shopButton);

    gameContainer.appendChild(gameDiv);
        
    } catch (error) {
    console.error('Failed to fetch games', error);
    gameContainer.innerHTML = '<p>Could not load the game. Please try again later</p> '
    }
};

fetchGameDetail();

function addToCart(game) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingGame = cart.find(item => item.id === game.id);
    if (existingGame) {
        existingGame.quantity += 1;
    } else {
        cart.push({
            id: game.id,
            title: game.title,
            price: game.price,
            image: game.image.url,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(1);

}


